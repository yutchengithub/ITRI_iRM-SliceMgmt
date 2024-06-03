import { Component, OnInit, OnDestroy, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { formatDate } from '@angular/common';
import * as _ from 'lodash';

// Services @2024/06/03 Add 
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService } from '../shared/service/spinner.service';

// import APIs of Fault Management @2024/06/03 Add 
import { apiForFaultMgmt } from '../shared/api/For_Fault_Mgmt';

// 引入儲存各個資訊所需的 interfaces 
import { FaultList } from '../shared/interfaces/Fault/For_queryCurrentAllFaultMessage';       // @2024/06/03 Add

// 引入所需 Local Files
import { localFaultList } from '../shared/local-files/Fault/For_queryCurrentAllFaultMessage'; // @2024/06/03 Add

export interface FmsgList {
  totalMessageNumber: number;
  faultMessages: FaultMessages[];
}

export interface FaultMessages {
  fieldName: string;    // modify by Charles (cloudName -> fieldName)
  bsName: string;       // add by Charles
  compname: string;     // add by Charles
  count: number;        // add by Charles  
  timestamp: string;
  status: string;        // add by Charles
  eventtype: string;     // modify by Charles (severity -> eventtype)
  probablecause: string; // modify by Charles (context -> probablecause)
  isCleared: boolean;
  processstatus: number; // modify by Charles (processStatus -> processstatus)
  processresult: string; // modify by Charles (processComment -> processresult)
  acknowledgeOwner: string;
  createtime: string; // add by Charles
  updatetime: string; // add by Charles
  eDesc: string;      // add by Charles
  histories: situRecord[];
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

export interface situRecord {
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
  refreshTimeout!: any;

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  pageChanged( page: number ) {
    this.p = page;
  }
  
  // @2024/06/03 Add
  // Show Spinner of Loading Title 
  showLoadingSpinner() {
    this.spinnerService.isLoading = true;
    this.spinnerService.show();
  }

  // @2024/06/03 Add
  // Show Spinner of Processing Title
  showProcessingSpinner() {
    this.spinnerService.isLoading = false;
    this.spinnerService.show();
  }
  
  // @2024/06/03 Add
  // Hide Spinner
  hideSpinner() {
    this.spinnerService.hide();
  }

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private   http: HttpClient,
    private     fb: FormBuilder,
    private  route: ActivatedRoute,
    private dialog: MatDialog,

    public     commonService: CommonService,
    public   languageService: LanguageService,
    public    spinnerService: SpinnerService,

    public  API_Fault: apiForFaultMgmt,           // @2024/06/03 Add for import API of Fault Management
    public  faultList_LocalFiles: localFaultList, // @2024/06/03 Add for import Fault List Local Files
  ) {
    this.severitys = this.commonService.severitys;
    this.statusTypes = this.commonService.statusTypes;
    this.situations = this.commonService.situations;
  }

  // @2024/06/03 Add
  faultList: FaultList = {} as FaultList;


  fmsgList: FmsgList = {} as FmsgList;
  selectedMsg: FaultMessages = {} as FaultMessages;
  modifyMsg: FaultMessages = {} as FaultMessages;
  modifySatus?: string;
  nullList: string[] = [];  // 給頁籤套件使用
  searchForm!: FormGroup;
  severitys: string[];
  statusTypes: string[];
  situations: string[];
  queryFaultMessageScpt!: Subscription;
  @ViewChild('itemDetail') itemDetail: any;
  @ViewChild('statusModal') statusModal: any;
  statusModalRef!: MatDialogRef<any>;
  selectFaultId: string = '';
  fmStatus: FmStatus = {} as FmStatus;
  queryFMstatusScpt!: Subscription;
  type: string = '';
  queryFMstatusrecordScpt!: Subscription;
  selectedHistories: situRecord[] = []; //situation history of selected message
  showHistories: situRecord[] = []; //situation history of selected message for display
  addSitu: situRecord = {} as situRecord;
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
  isSearch: boolean = false;
  filteredFmList: FaultMessages[] = [];

  ngOnInit(): void {
    this.createSearchForm();
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

  ngAfterViewInit() {
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
    // // // console.log(nowTime)
    // // // 格式驗證需要處理?

    this.searchForm = this.fb.group({
      'fieldName': new FormControl(''),
      'BSName': new FormControl(''),
      'compName': new FormControl(''),
      'alarmName': new FormControl(''),
      'severity': new FormControl('All'),
      'status': new FormControl('All'),
      'situation': new FormControl('All'),
      'ackOwner': new FormControl(''),
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)),   // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`))  // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
    });
    this.severitys = this.commonService.severitys;
    this.statusTypes = this.commonService.statusTypes;
  }
  
  getFaultMessage() {
    console.log('getFaultMessage:');
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.fmsgList = this.commonService.fmsgList;

      // 引入正確 local file @2024/06/03 Add 
      this.faultList = this.faultList_LocalFiles.faultList_local;

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
          this.fmsgList = JSON.parse(str);
          this.fmsgList = res as FmsgList;
          this.faultMessageDeal();
        }
      );
    }
  }

  get msgToDisplay(): FaultMessages[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    // 否則，顯示全部 this.fmsgList.faultMessages
    return this.isSearch ? this.filteredFmList : this.fmsgList.faultMessages;
  }

  faultMessageDeal() {
    //this.p = 1;
    this.totalItems = this.fmsgList.faultMessages.length;
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

  search() {
    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1
    const field_name = this.searchForm.get('fieldName')?.value || '';
    const BS_name = this.searchForm.get('BSName')?.value || '';
    const comp_name = this.searchForm.get('compName')?.value || '';
    const alarm_name = this.searchForm.get('alarmName')?.value || '';
    const severity_lv = this.searchForm.get('severity')?.value;
    const status_type = this.searchForm.get('status')?.value;
    const situ_type = this.searchForm.get('situation')?.value;
    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;
    const owner_name = this.searchForm.get('ackOwner')?.value || '';
    let situ_num = 0;

    if(situ_type === 'Pending')
        situ_num = 1;

    // 格式化日期為所需的格式
    const formattedFrom = this.commonService.dealPostDate(from);
    const formattedTo = this.commonService.dealPostDate(to);

    // 清除以前的搜尋結果
    this.filteredFmList = [];
    this.isSearch = false;

    if (this.commonService.isLocal) {
      /* local file test */
      this.filteredFmList = this.fmsgList.faultMessages.filter(msg => {
        const isFieldMatch = !field_name || msg.fieldName.includes(field_name);
        const isBSMatch = !BS_name || msg.bsName.includes(BS_name);
        const isCompMatch = !comp_name || msg.compname.includes(comp_name);
        const isAlarmMatch = !alarm_name || msg.probablecause.includes(alarm_name);
        const isSeverityMatch = severity_lv === 'All' || msg.eventtype === severity_lv;
        const isStatusMatch = status_type === 'All' || msg.status === status_type;
        const isSituMatch = situ_type === 'All' || msg.processstatus === situ_num;
        const msgDate = new Date(msg.timestamp);
        const isAfterFrom = msgDate >= new Date(formattedFrom);
        const isBeforeTo = msgDate <= new Date(formattedTo);
        const isOwnerMatch = !owner_name || msg.acknowledgeOwner.includes(owner_name);

        return isFieldMatch && isBSMatch && isCompMatch && isAlarmMatch && isSeverityMatch 
                && isStatusMatch && isSituMatch && isAfterFrom && isBeforeTo && isOwnerMatch;
      });
      this.isSearch = true; // Local Search 完畢，設置標記為 true
      this.totalItems = this.filteredFmList.length; // 確保更新 totalItems 以反映搜尋結果的數量
    } else {

    }
  }

  clear_search() {
    this.createSearchForm();
    this.isSearch = false;
  }  

  openItemDetail(faultMessages: FaultMessages) {
    // this.show200Msg = false;
    // this.show500Msg = false;
    this.selectedMsg = faultMessages;

    this.getFMstatus().then((value) => {
      this.statusModalRef = this.dialog.open(this.itemDetail, { id: 'itemDetail' });
      this.statusModalRef.afterClosed().subscribe(() => {

      });
    });  
  }

  openStatusModal(faultMessages: FaultMessages) {
    //if (faultMessages.processstatus === 1) {
    // this.fmStatus = {} as FmStatus;
    this.type = 'add_situation';
    // this.show200Msg = false;
    // this.show500Msg = false;
    this.selectedMsg = faultMessages;
    this.selectedHistories = this.selectedMsg.histories;

    this.getFMstatus().then((value) => {
      this.statusModalRef = this.dialog.open(this.statusModal, { id: 'statusModal' });
      this.statusModalRef.afterClosed().subscribe(() => {

      });
    });
    //}
  }

  changeType(e: MatButtonToggleChange) {
    console.log(this.type);
    if (this.type === 'add_situation') {
      this.getFMstatus();
    } else {
      this.getFMstatusrecord();
    }
  }

  /* Add Situation start */
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

  fMstatusDeal() {
    this.modifySatus = 'RESOLVE';
  }

  modify() {
    this.modifyModalRef = this.dialog.open(this.modifyModal, { id: 'modifyModal' });
    this.modifyModalRef.afterClosed().subscribe((result) => {
      // const current = new Date();
      // current.setHours(0);
      // current.setMinutes(0);
      // current.setSeconds(0);
      // console.log(result);
      if (result === 'OK') {
        this.queryFMProcess().then((status) => {
          console.log(status);
          this.show200Msg = false;
          this.show500Msg = false;
          if (status === 200) {
            this.show200Msg = true;
            this.selectedMsg.processresult = this.modifyMsg.processresult;
            this.selectedMsg.processstatus = (this.modifySatus == 'PENDING') ? 1 : 0;
            //Add new record to situation history
            this.addSitu.processStatus = this.selectedMsg.processstatus;
            this.addSitu.processComment = this.selectedMsg.processresult;
            this.addSitu.timestamp = formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss', this.locale);
            this.addSitu.acknowledgeOwner = "admin";
            this.selectedHistories.push(_.cloneDeep(this.addSitu));

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
        let status = 200; //Always success now        
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
  /* Add Situation End */

  /* Situation History Start */
  getFMstatusrecord() {
    this.timeSort = '';
    return new Promise((resolve, reject) => {
      if (this.commonService.isLocal) {
        /* local file test */
        this.showHistories = _.cloneDeep(this.selectedHistories);
        this.fMstatusrecordDeal();
        resolve(true);
      } else {
        if (this.queryFMstatusrecordScpt) this.queryFMstatusrecordScpt.unsubscribe();
        this.queryFMstatusrecordScpt = this.commonService.queryFMstatusrecord(this.selectFaultId).subscribe(
          res => {
            // console.log('getFMstatusrecord:');
            // console.log(res);
            // this.orgFmStatusRecordList = res as FmStatusRecord[];
            // this.fMstatusrecordDeal();
            // resolve(true);
          }
        );
      }
    });
  }

  fMstatusrecordDeal() {
    this.record_p = 1;
    this.record_totalItems = this.selectedHistories.length;
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
      this.showHistories = _.cloneDeep(this.selectedHistories);
    } else {
      this.showHistories = _.orderBy(this.selectedHistories, ['timestamp'], [this.timeSort as any]);
    }
  }
  /* Situation History End */
}
