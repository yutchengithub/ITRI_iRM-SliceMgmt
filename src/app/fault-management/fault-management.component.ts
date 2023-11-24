import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../shared/service/language.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import * as _ from 'lodash';

export interface FaultMessage {
  totalMessageNumber: number;
  faultMessages: FaultMessages[];
}

export interface FaultMessages {
  faultId: string;   // new add
  fieldName: string;   // modify by Charles (cloudName -> fieldName)
  bsName: string;   // add by Charles
  compname: string;   // add by Charles
  count: number;  // add by Charles  
  timestamp: string;
  status: string; // add by Charles
  eventtype: string; //modify by Charles (severity -> eventtype)
  probablecause: string; // modify by Charles (context -> probablecause)
  isCleared: boolean;
  processstatus: number; //modify by Charles (processStatus -> processstatus)
  processresult: string; //modify by Charles (processComment -> processresult)
  acknowledgeOwner: string;
  createtime: string; //add by Charles
  updatetime: string; //add by Charles
  eDesc: string; //add by Charles
}

export interface FmStatus {
  timestamp: string;
  cloudId: string;
  nfId: string;
  severity: string;
  context: string;
  isCleared: boolean;
  processStatus: number;
  __processStatus?: string;
  processComment: string;
  acknowledgeOwner: string;
}

export interface FmStatusRecord {
  timestamp: string;
  processStatus: number;
  processComment: string;
  acknowledgeOwner: string;
}

@Component({
  selector: 'app-fault-management',
  templateUrl: './fault-management.component.html',
  styleUrls: ['./fault-management.component.scss']
})
export class FaultManagementComponent implements OnInit, OnDestroy {
  sessionId: string = '';
  faultMessage: FaultMessage = {} as FaultMessage;
  selectedMsg: FaultMessages = {} as FaultMessages;
  modifyMsg: FaultMessages = {} as FaultMessages;
  modifySatus?: string;
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用
  searchForm!: FormGroup;
  severitys: string[];
  refreshTimeout!: any;
  queryFaultMessageScpt!: Subscription;
  @ViewChild('itemDetail') itemDetail: any;
  @ViewChild('statusModal') statusModal: any;
  statusModalRef!: MatDialogRef<any>;
  selectFaultId: string = '';
  fmStatus: FmStatus = {} as FmStatus;
  queryFMstatusScpt!: Subscription;
  type: string = '';
  queryFMstatusrecordScpt!: Subscription;
  orgFmStatusRecordList: FmStatusRecord[] = [];   // 原始FmStatusRecord資料
  fmStatusRecordList: FmStatusRecord[] = [];      // 呈現FmStatusRecord資料
  @ViewChild('modifyModal') modifyModal: any;
  modifyModalRef!: MatDialogRef<any>;
  queryFMProcessScpt!: Subscription;
  show200MsgTimeout!: any;
  show200Msg = false;
  show500Msg = false;
  record_p: number = 1;
  record_pageSize: number = 5;
  record_totalItems: number = 0;
  timeSort: '' | 'asc' | 'desc' = '';

  constructor(
    private http: HttpClient,
    public commonService: CommonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public languageService: LanguageService,
    private dialog: MatDialog,
  ) {
    const nowTime = this.commonService.getNowTime();
    // // console.log(nowTime)
    // // 格式驗證需要處理?

    this.searchForm = this.fb.group({
      'fieldName': new FormControl(''),
      'gnbName': new FormControl(''),
      'compName': new FormControl(''),
      'alarmName': new FormControl(''),
      'severity': new FormControl('All'),
      'ackOwner': new FormControl(''),
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)),   // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`))  // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
    });
    this.severitys = this.commonService.severitys;
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      if (params['fieldName'] !== 'All') {
        this.searchForm.controls['fieldName'].setValue(params['fieldName']);
      }
      if (params['nfName'] !== 'All') {
        this.searchForm.controls['nfName'].setValue(params['nfName']);
      }
    });
    this.getFaultMessage();
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
    if (this.queryFaultMessageScpt) this.queryFaultMessageScpt.unsubscribe();
    if (this.queryFMstatusScpt) this.queryFMstatusScpt.unsubscribe();
    if (this.queryFMstatusrecordScpt) this.queryFMstatusrecordScpt.unsubscribe();
    if (this.queryFMProcessScpt) this.queryFMProcessScpt.unsubscribe();
  }

  // 建立搜尋表單
  createSearchForm() {
    const nowTime = this.commonService.getNowTime();
    this.searchForm = this.fb.group({
      'fieldName': new FormControl(''),
      'gnbName': new FormControl(''),
      'compName': new FormControl(''),
      'alarmName': new FormControl(''),
      'severity': new FormControl('All'),
      'ackOwner': new FormControl(''),
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)),   // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`))  // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
    });
  }
  
  getFaultMessage() {
    console.log('getFaultMessage:');
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.faultMessage = this.commonService.faultMessage;
      this.faultMessageDeal();
    } else {
      const fieldName = this.searchForm.controls['fieldName'].value;
      const nfName = this.searchForm.controls['nfName'].value;
      const acknowledgeOwner = this.searchForm.controls['acknowledgeOwner'].value;
      const severity = this.searchForm.controls['severity'].value;
      const start = this.commonService.dealPostDate(this.searchForm.controls['from'].value);
      const end = this.commonService.dealPostDate(this.searchForm.controls['to'].value);
      const offset = (this.p - 1) * this.pageSize;
      const limit = 10;
      if (this.queryFaultMessageScpt) this.queryFaultMessageScpt.unsubscribe();
      this.queryFaultMessageScpt = this.commonService.queryFaultMessage(fieldName, nfName, acknowledgeOwner, severity, start, end, offset, limit).subscribe(
        res => {
          console.log('getFaultMessage:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.faultMessage = JSON.parse(str);
          this.faultMessage = res as FaultMessage;
          this.faultMessageDeal();
        }
      );
    }
  }

  faultMessageDeal() {
    // this.p = 1;
    this.totalItems = this.faultMessage.totalMessageNumber;
    this.nullList = new Array(this.totalItems);
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        console.log(`page[${this.p}] ===> refresh.`);
        // if (this.isSettingAdvanced) {
        //   this.getFMAdvanceSearch();
        // } else {
          this.getFaultMessage();
        // }

      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); //timeout 100ms
  }

  pageChanged(page: number) {
    this.p = page;
    this.getFaultMessage();
  }

  search() {
    // this.isSettingAdvanced = false;
    // this.p = 1;
    // this.getFaultMessage();
  }

  clear_search() {
    this.createSearchForm();
  }  

  openStatusModal(faultMessages: FaultMessages) {
    //if (faultMessages.processstatus === 1) {
    // this.fmStatus = {} as FmStatus;
    this.selectFaultId = faultMessages.faultId;
    this.type = 'add_situation';
    // this.show200Msg = false;
    // this.show500Msg = false;
    this.selectedMsg = faultMessages;

    this.getFMstatus().then((value) => {
      this.statusModalRef = this.dialog.open(this.statusModal, { id: 'statusModal' });
      this.statusModalRef.afterClosed().subscribe(() => {

      });
    });
    //}
  }

  getFMstatus(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.commonService.isLocal) {
        /* local file test */
        this.fmStatus = this.commonService.fmStatus;
        this.fMstatusDeal();
        resolve(true);
      } else {
        if (this.queryFMstatusScpt) this.queryFMstatusScpt.unsubscribe();
        this.queryFMstatusScpt = this.commonService.queryFMstatus(this.selectFaultId).subscribe(
          res => {
            console.log('getFMstatus:');
            console.log(res);
            this.fmStatus = res as FmStatus;
            this.fMstatusDeal();
            resolve(true);
          }
        );
      }
    });
  }

  openItemDetail(faultMessages: FaultMessages) {
    this.selectFaultId = faultMessages.faultId;
    // this.show200Msg = false;
    // this.show500Msg = false;
    this.selectedMsg = faultMessages;
    this.getFMstatus().then((value) => {
      this.statusModalRef = this.dialog.open(this.itemDetail, { id: 'itemDetail' });
      this.statusModalRef.afterClosed().subscribe(() => {

      });
    });  
  }

  fMstatusDeal() {
    this.modifySatus = 'RESOLVE';
  }

  changeType(e: MatButtonToggleChange) {
    console.log(this.type);
    if (this.type === 'add_situation') {
      this.getFMstatus();
    } else {
      this.getFMstatusrecord();
    }
  }

  getFMstatusrecord() {
    this.timeSort = '';
    return new Promise((resolve, reject) => {
      if (this.commonService.isLocal) {
        /* local file test */
        this.orgFmStatusRecordList = this.commonService.fmStatusRecordList;
        this.fMstatusrecordDeal();
        resolve(true);
      } else {
        if (this.queryFMstatusrecordScpt) this.queryFMstatusrecordScpt.unsubscribe();
        this.queryFMstatusrecordScpt = this.commonService.queryFMstatusrecord(this.selectFaultId).subscribe(
          res => {
            console.log('getFMstatusrecord:');
            console.log(res);
            this.orgFmStatusRecordList = res as FmStatusRecord[];
            this.fMstatusrecordDeal();
            resolve(true);
          }
        );
      }
    });
  }

  fMstatusrecordDeal() {
    this.fmStatusRecordList = _.cloneDeep(this.orgFmStatusRecordList);
    this.record_p = 1;
    this.record_totalItems = this.fmStatusRecordList.length;
  }

  recordPageChanged(page: number) {
    this.record_p = page;
  }

  doSortTime() {
    if (this.timeSort === '') {
      this.timeSort = 'asc';
    } else if (this.timeSort === 'asc') {
      this.timeSort = 'desc';
    } else {
      this.timeSort = '';
    }
    if (this.timeSort === '') {
      this.fmStatusRecordList = _.cloneDeep(this.orgFmStatusRecordList);
    } else {
      this.fmStatusRecordList = _.orderBy(this.orgFmStatusRecordList, ['timestamp'], [this.timeSort as any]);
    }
  }

  modify() {
    this.modifyModalRef = this.dialog.open(this.modifyModal, { id: 'modifyModal' });
    this.modifyModalRef.afterClosed().subscribe((result) => {
      // console.log(result);
      if (result === 'OK') {
        this.queryFMProcess().then((status) => {
          console.log(status);
          this.show200Msg = false;
          this.show500Msg = false;
          if (status === 200) {
            this.show200Msg = true;
            this.getFaultMessage();
            this.modifyMsg.processresult = "";
            //close message display after 1 sec
            this.show200MsgTimeout = window.setTimeout(() => this.show200Msg = false, 1 * 1000);
          } else {
            this.show500Msg = true;
          }
        });

      }
    });
  }

  queryFMProcess() {
    return new Promise((resolve, reject) => {
      if (this.commonService.isLocal) {
        /* local file test */
        // const num = Math.floor(Math.random() * 2); //回傳0或1
        // const status = (num === 0) ? 200 : 500;
        let status = 200;
        this.selectedMsg.processresult = this.modifyMsg.processresult;
        this.selectedMsg.processstatus = (this.modifySatus == 'PENDING') ? 1 : 0;
        resolve(status);
      } else {
        if (this.queryFMProcessScpt) this.queryFMProcessScpt.unsubscribe();
        const processStatus = (this.fmStatus.__processStatus === 'PENDING') ? 1 : 0;
        this.queryFMstatusrecordScpt = this.commonService.queryFMProcess(this.selectFaultId, processStatus, this.fmStatus.processComment, this.fmStatus.acknowledgeOwner).subscribe(
          (res: HttpResponse<any>) => {
            console.log('queryFMProcess:');
            console.log(res.status);
            resolve(res.status);
          }
        );
      }
    });
  }

}
