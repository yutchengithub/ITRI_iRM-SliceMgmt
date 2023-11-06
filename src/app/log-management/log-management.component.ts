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


export interface UserLogsList {   // FaultMessage -> LogList @10/30 by yuchen
  logNumber: number;              // totalMessageNumber -> logNumber @10/30 by yuchen
  UserLogsinfo: UserLogsinfo[];   // faultMessages & FaultMessages -> logs & Logs @10/30 by yuchen
}

export interface UserLogsinfo {   // FaultMessages -> loginfo @10/30 by yuchen
  userlogID: string; // add by yuchen @10/31
  userid: string;    // add by yuchen @10/30
  logtype: string;   // add by yuchen @10/30
  loglevel: number;  // add by yuchen @10/30
  logmsg: string;    // add by yuchen @10/30
  logtime: string;   // add by yuchen @10/30  
}

/// For click View User Log Detail Page @11/06 add by yuchen 
export interface UserLogdetail {
  userid: string;
  logtype: string;
  loglevel: number;
  logtime: string;
  logmsg: string;
}

// add by yuchen @10/30
export interface NELogsList { 
  logNumber: number;       
  NELogsinfo: NELogsinfo[];             
}

// add by yuchen @10/30
export interface NELogsinfo { 
  NElogID: string; // add by yuchen @10/31
  userid: string;    
  operation: string;   
  req_data: string;  
  resp_data: string;   
  logtime: string;    
}

// For click View NE Log Detail Page @11/06 add by yuchen 
export interface NELogdetail {
  userid: string;
  operation: string;
  req_data: string;
  resp_data: string;
  logtime: string;
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
  selector: 'app-log-management',                 // fault -> log @10/30 by yuchen
  templateUrl: './log-management.component.html', // fault -> log @10/30 by yuchen
  styleUrls: ['./log-management.component.scss']  // fault -> log @10/30 by yuchen
})

export class LogManagementComponent implements OnInit, OnDestroy { 
  sessionId: string = '';
  // ocloudList: OCloudList[] = [];
  //nfList: Nf[] = [];

  UserLogsList: UserLogsList = {} as UserLogsList;  // FaultMessage -> UserLogsList @10/30 by yuchen
  NELogsList: NELogsList = {} as NELogsList;        // add by yuchen @10/30
  type: string = 'User_Logs';   // 預設選擇 "User Logs" add by yuchen @10/31
  //type: string = 'NE_Logs';   // 預設選擇 "NE Logs" @11/01 add by yuchen
  UserLogTypes: string[];       // @11/01 add by yuchen
  NELogTypes: string[];         // @11/01 add by yuchen


  // For click View Page
  selectuserlogID: string ='';                        // 用於記錄選擇的 User Log 的 ID     @10/31 add by yuchen
  selectNElogID: string ='';                          // 用於記錄選擇的 NE Log 的 ID       @10/31 add by yuchen
  userLogdetail: UserLogdetail = {} as UserLogdetail; // 用於存儲選擇的 User Log 的詳細訊息 @11/06 add by yuchen
  neLogdetail: NELogdetail = {} as NELogdetail;       // 用於存儲選擇的 NE Log 的詳細訊息   @11/06 add by yuchen

  /* 用於查找名為'userlogDetail'的元件 <ng-template>，
     用於定義 User Log 日誌詳細訊息的彈出視窗內容。   @11/03 add by yuchen */
  @ViewChild('userlogDetail') userlogDetail: any;    

  /* 用於查找名為'nelogDetail'的元件 (ng-template)，
     通常用於定義 NE Log 詳細訊息的彈出視窗內容。  @11/03 add by yuchen */
  @ViewChild('nelogDetail') nelogDetail: any;

  UserlogDetailRef!: MatDialogRef<any>;   // 用於記錄 User Log 詳細資訊的對照視窗，以便在需要時操作和控制 User Log 詳細資訊的彈出視窗。 @11/06 add by yuchen
  NElogDetailRef!: MatDialogRef<any>;     // 用於記錄 NE Log 詳細資訊的對照視窗，以便在需要時操作和控制 NE Log 詳細資訊的彈出視窗。    @11/06 add by yuchen
  

  // For page number
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用


  searchForm!: FormGroup;
  severitys: string[];
  refreshTimeout!: any;
  queryFaultMessageScpt!: Subscription;
  @ViewChild('statusModal') statusModal: any;
  statusModalRef!: MatDialogRef<any>;
  //fmStatus: FmStatus = {} as FmStatus;
  queryFMstatusScpt!: Subscription;
  
  queryFMstatusrecordScpt!: Subscription;
  //orgFmStatusRecordList: FmStatusRecord[] = [];   // 原始FmStatusRecord資料
  //fmStatusRecordList: FmStatusRecord[] = [];      // 呈現FmStatusRecord資料
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
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  isSettingAdvanced = false;
  queryFMAdvanceSearchScpt!: Subscription;

  constructor(
    private http: HttpClient,
    public commonService: CommonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public languageService: LanguageService,
    private dialog: MatDialog,
  ) {
    const nowTime = this.commonService.getNowTime();
    // console.log(nowTime)
    // 格式驗證需要處理?

    this.searchForm = this.fb.group({
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)), 
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`)),
      //'fieldName': new FormControl(''),
      //'nfName': new FormControl(''),
      //'acknowledgeOwner': new FormControl(''),
      //'severity': new FormControl('All'),
      'UserLogType': new FormControl('All'),
      'NELogType': new FormControl('All'),
    });
    this.severitys = this.commonService.severitys;

    this.UserLogTypes = this.commonService.UserLogType; // @11/01 add by yuchen
    this.NELogTypes = this.commonService.NELogType;     // @11/01 add by yuchen

    this.createAdvancedForm();
  }

  ngOnInit(): void {

    this.type = 'User_Logs';  // 設定初始化預設值
    //this.type = 'NE_Logs';
    this.sessionId = this.commonService.getSessionId();

    /*this.route.params.subscribe((params) => {
      if (params['fieldName'] !== 'All') {
        this.searchForm.controls['fieldName'].setValue(params['fieldName']);
      }
      if (params['nfName'] !== 'All') {
        this.searchForm.controls['nfName'].setValue(params['nfName']);
      }
    });*/
    
    this.getUserloginfo(); // @10/31 faultxxx -> Userloginfo
    this.getNEloginfo();   // @11/01 Add NEloginfo
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
    if (this.queryFaultMessageScpt) this.queryFaultMessageScpt.unsubscribe();
    if (this.queryFMstatusScpt) this.queryFMstatusScpt.unsubscribe();
    if (this.queryFMstatusrecordScpt) this.queryFMstatusrecordScpt.unsubscribe();
    if (this.queryFMProcessScpt) this.queryFMProcessScpt.unsubscribe();
    if (this.queryFMAdvanceSearchScpt) this.queryFMAdvanceSearchScpt.unsubscribe();
  }

  
  // Get User Logs @10/31 Add
  getUserloginfo() {
    console.log('getUserloginfo() Start');
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) { // 是否在 local 測試
      // local file test
      this.UserLogsList = this.commonService.UserLogsList;
      this.UserloginfoDeal();
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
          console.log('getUserloginfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.UserLogsList = JSON.parse(str);
          this.UserLogsList = res as UserLogsList;
          this.getUserloginfo();
        }
      );
    }
  }

  UserloginfoDeal() {
    // this.p = 1;
    this.totalItems = this.UserLogsList.logNumber;
    this.nullList = new Array(this.totalItems);
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        console.log(`page[${this.p}] ===> refresh.`);
        if (this.isSettingAdvanced) {
          this.getFMAdvanceSearch();
        } else {
          this.getUserloginfo();
        }

      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); // timeout: 100 ms
  }


  // Get NE Logs @11/01 Add
  getNEloginfo() {
    console.log('getNEloginfo() Start');

    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      
      // local file test
      this.NELogsList = this.commonService.NELogsList;
      this.NEloginfoDeal();

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
          console.log('getNEloginfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.NELogsList = JSON.parse(str);
          this.NELogsList = res as NELogsList;
          this.getNEloginfo();
        }
      );
    }
  }

  NEloginfoDeal() {
    // this.p = 1;
    this.totalItems = this.NELogsList.logNumber;
    this.nullList = new Array(this.totalItems);
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        console.log(`page[${this.p}] ===> refresh.`);
        if (this.isSettingAdvanced) {
          this.getFMAdvanceSearch();
        } else {
          this.getNEloginfo();
        }

      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); //timeout 100ms
  }

  pageChanged(page: number) {
    this.p = page;
    this.getUserloginfo(); // @10/31 faultxxx -> Userloginfo
    this.getNEloginfo();   // @11/01 Add NEloginfo
  }


  /*openStatusModal(faultMessages: FaultMessages) {
    //if (faultMessages.processstatus === 1) {
    this.fmStatus = {} as FmStatus;
    this.selectFaultId = faultMessages.faultId;
    this.type = 'processing_status';
    this.show200Msg = false;
    this.show500Msg = false;
    this.getFMstatus().then((value) => {
      this.statusModalRef = this.dialog.open(this.statusModal, { id: 'statusModal' });
      this.statusModalRef.afterClosed().subscribe(() => {

      });
    });
    //}
  }*/
  

/* ↓ For click View ↓ */

  // Add by yuchen @11/06
  // 當使用者點擊「 View 」User Log 時
  openUserlogDetail(UserLogsinfo: UserLogsinfo) {

    // 複製 User Log 的詳細資訊以供顯示
    this.userLogdetail = {
      userid: UserLogsinfo.userid,
      logtype: UserLogsinfo.logtype,
      loglevel: UserLogsinfo.loglevel,
      logtime: UserLogsinfo.logtime,
      logmsg: UserLogsinfo.logmsg
    };

    // 記錄所選 User Log 的ID
    this.selectuserlogID = UserLogsinfo.userlogID;

    // 隱藏200訊息
    this.show200Msg = false;

    // 隱藏500訊息
    this.show500Msg = false;

    // 開啟用戶日誌詳細資訊的視窗
    this.UserlogDetailRef = this.dialog.open(this.userlogDetail, { id: 'userlogDetail' });

    // 監聽視窗關閉事件
    this.UserlogDetailRef.afterClosed().subscribe(() => {

    });
  }

  // Add by yuchen @11/06
  // 當使用者點擊「 View 」NE Log 時
  openNElogDetail(NELogsinfo: NELogsinfo) {

    // 複製 NE Log 的詳細資訊以供顯示
    this.neLogdetail = {
      userid: NELogsinfo.userid,
      operation: NELogsinfo.operation,
      req_data: NELogsinfo.req_data,
      resp_data: NELogsinfo.resp_data,
      logtime: NELogsinfo.logtime
    };

    // 記錄所選 NE Log 的 ID
    this.selectNElogID = NELogsinfo.NElogID;

    // 隱藏 200 訊息
    this.show200Msg = false;

    // 隱藏 500 訊息
    this.show500Msg = false;

    // 開啟 NE Log 詳細資訊的視窗
    this.NElogDetailRef = this.dialog.open(this.nelogDetail, { id: 'nelogDetail' });

    // 監聽視窗關閉事件
    this.NElogDetailRef.afterClosed().subscribe(() => {

    });
  }

/* ↑ For click View ↑ */


  search() {
    // this.isSettingAdvanced = false;
    // this.p = 1;
    // this.getFaultMessage();
  }

  
  changeType(e: MatButtonToggleChange) {
    console.log(this.type);
    if (this.type === 'User_Logs') 
      this.getUserloginfo();
    else if (e.value === 'NE_Logs')
      this.getNEloginfo();
    
  }

  // switchProcessStatus(): boolean {
  //   return this.fmStatus.isCleared;
  // }

  // changeProcessSwitch() {
  //   this.fmStatus.isCleared = !this.fmStatus.isCleared;
  // }


  /*
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
  }*/

  /*queryFMProcess() {
    return new Promise((resolve, reject) => {
      if (this.commonService.isLocal) {
        // local file test
        const num = Math.floor(Math.random() * 2); //回傳0或1
        const status = (num === 0) ? 200 : 500;
        resolve(status);
      } else {
        if (this.queryFMProcessScpt) this.queryFMProcessScpt.unsubscribe();
        const processStatus = (this.fmStatus.__processStatus === 'PENDING') ? 0 : 1;
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
*/
  createAdvancedForm() {
    this.advancedForm = this.fb.group({
      'globalId': new FormControl(''),
      'fieldName': new FormControl(''),
      'nfId': new FormControl(''),
      'nfName': new FormControl(''),
      'from': new FormControl(''),
      'to': new FormControl(''),
      'severity': new FormControl(''),
      'acknowledgeOwner': new FormControl('')
    });
  }

  openAdvancedModal() {
    const orgAdvancedForm = _.cloneDeep(this.advancedForm);
    this.advancedForm.controls['fieldName'].setValue(this.searchForm.controls['fieldName'].value);
    this.advancedForm.controls['nfName'].setValue(this.searchForm.controls['nfName'].value);
    this.advancedForm.controls['from'].setValue(this.searchForm.controls['from'].value);
    this.advancedForm.controls['to'].setValue(this.searchForm.controls['to'].value);
    this.advancedForm.controls['severity'].setValue(this.searchForm.controls['severity'].value);
    this.advancedModalRef = this.dialog.open(this.advancedModal, { id: 'faultAdvancedModal' });
    this.advancedModalRef.afterClosed().subscribe((result) => {
      if (result === 'OK') {
        this.isSettingAdvanced = true;
        this.searchForm.controls['fieldName'].setValue(this.advancedForm.controls['fieldName'].value);
        this.searchForm.controls['nfName'].setValue(this.advancedForm.controls['nfName'].value);
        this.searchForm.controls['from'].setValue(this.advancedForm.controls['from'].value);
        this.searchForm.controls['to'].setValue(this.advancedForm.controls['to'].value);
        this.searchForm.controls['severity'].setValue(this.advancedForm.controls['severity'].value);
        this.p = 1;
        this.getFMAdvanceSearch();
      } else {
        this.advancedForm = orgAdvancedForm;
      }
    });
  }

  getFMAdvanceSearch() {/*
    console.log('getFMAdvanceSearch:');
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      // local file test 
      this.faultMessage = this.commonService.fmAdvanceSearch;
      this.faultMessageDeal();
    } else {
      const globalId = this.advancedForm.controls['globalId'].value;
      const fieldName = this.advancedForm.controls['fieldName'].value;
      const nfId = this.advancedForm.controls['nfId'].value;
      const nfName = this.advancedForm.controls['nfName'].value;
      const acknowledgeOwner = this.advancedForm.controls['acknowledgeOwner'].value;
      const severity = this.advancedForm.controls['severity'].value;
      const start = this.commonService.dealPostDate(this.advancedForm.controls['from'].value);
      const end = this.commonService.dealPostDate(this.advancedForm.controls['to'].value);
      const offset = (this.p - 1) * this.pageSize;
      const limit = 10;
      if (this.queryFMAdvanceSearchScpt) this.queryFMAdvanceSearchScpt.unsubscribe();
      this.queryFMAdvanceSearchScpt = this.commonService.queryFMAdvanceSearch(globalId, fieldName, nfId, nfName, acknowledgeOwner, severity, start, end, offset, limit).subscribe(
        res => {
          console.log('getFMAdvanceSearch:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.faultMessage = JSON.parse(str);
          this.faultMessage = res as FaultMessage;
          this.faultMessageDeal();
        }
      );
    }*/
  }
}
