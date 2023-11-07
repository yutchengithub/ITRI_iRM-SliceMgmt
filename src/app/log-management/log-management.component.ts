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

    //this.type = 'User_Logs';  // 設定初始化預設值
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
    
    this.getUserLogsInfo();   // 預設初始化時取得 User Logs 資訊 @10/31 add by yuchen
    //this.getNELogsInfo();   // 預設初始化時取得 NE Logs 資訊   @11/01 add by yuchen
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
  getUserLogsInfo() {
    console.log('getUserLogsInfo() - Start');
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
          console.log('getUserLogsInfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.UserLogsList = JSON.parse(str);
          this.UserLogsList = res as UserLogsList;
          this.getUserLogsInfo();
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
          this.getUserLogsInfo();
        }

      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); // timeout: 100 ms
  }


  // Get NE Logs @11/01 Add
  getNELogsInfo() {
    console.log('getNELogsInfo() - Start');

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
          console.log('getNELogsInfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.NELogsList = JSON.parse(str);
          this.NELogsList = res as NELogsList;
          this.getNELogsInfo();
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
          this.getNELogsInfo();
        }

      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); //timeout 100ms
  }

  pageChanged(page: number) {
    this.p = page;
    this.getUserLogsInfo(); // @10/31 faultxxx -> getUserLogsInfo
    this.getNELogsInfo();   // @11/01 Add getNELogsInfo
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
  

/* ↓ For click "View" ↓ */

  // Add by yuchen @11/06
  // 當使用者點擊 User Log 的 "View" 時
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
  // 當使用者點擊 NE Log 的 "View" 時
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

/* ↑ For click "View" ↑ */


  search() {
    // this.isSettingAdvanced = false;
    // this.p = 1;
    // this.getFaultMessage();
  }


  // 用於點擊對應的 Button 時切換頁面
  changeType(e: MatButtonToggleChange) {

    console.log(this.type);
    console.log(this.p);    // 用於測試點擊時的頁數     @11/07 Add by yuchen 
    this.p = 1;             // 預設點擊時，將頁數設為 1  @11/07 Add by yuchen 

    if (this.type === 'User_Logs') 
      this.getUserLogsInfo();
    else if (e.value === 'NE_Logs')
      this.getNELogsInfo();
  }

  
  // @1107 add by yuchen
  // 用於將指定 Log 匯出成 .csv 檔案  
  // ## 還需要更動成依據 Filters 的設定去進行匯出，如只匯出指定時間段的資料 (未完成)
  exportToCSV(dataType: string) {
    
    // 宣告一個變數來存儲要匯出的資料，結構可是 UserLogsinfo 矩陣或是 NELogsinfo 矩陣
    let dataToExport: UserLogsinfo[] | NELogsinfo[] = [];

    if (dataType === 'UserLogs') {

      // 如 dataType 是 'UserLogs'，則將 UserLogsinfo 資料設定為 dataToExport
      dataToExport = this.commonService.UserLogsList.UserLogsinfo;

    } else if (dataType === 'NELogs') {

      // 如是 'NELogs'，則將 NELogsinfo 資料設定為 dataToExport
      dataToExport = this.commonService.NELogsList.NELogsinfo;
    }

    // 將資料轉換成 CSV 格式
    const csvData = this.convertToCSV(dataToExport);
    
    // 創建一個 Blob，用於儲存 CSV 資料
    const blob = new Blob([csvData], { type: 'text/csv' });
    
    // 創建一個 URL 以便下載 CSV 檔案
    const url = window.URL.createObjectURL(blob); // 創建 URL 物件，以供下載或顯示資源
    const a = document.createElement('a');        // 創建一個新的超鏈結元素
    a.href = url;                                 // 設定超鏈結的 URL

    // 根據 dataType 設定下載的檔名  
    // ## 檔名還需依據 Filters 的設定去進行命名 (未完成)
    if (dataType === 'UserLogs')
      a.download = 'user_logs.csv';
    else if (dataType === 'NELogs')
      a.download = 'ne_logs.csv';

    // 觸發點擊事件以下載檔案
    a.click();
    window.URL.revokeObjectURL(url); // 釋放 URL 物件，以回收資源和釋放記憶體
  }

  // @1107 add by yuchen
  // 用於將指定資料轉換成 .csv 格式
  convertToCSV(data: any[]): string {

    // 創建 CSV 檔案的標頭行，以及資料行
    const header = Object.keys(data[0]).join(',');              // 創建標頭行，將資料物件的屬性名稱逗號分隔
    const rows = data.map(row => Object.values(row).join(',')); // 創建資料行，將每個資料物件的值逗號分隔

    // 返回完整的 CSV 字串，包括標頭行和資料行
    return header + '\n' + rows.join('\n');
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
