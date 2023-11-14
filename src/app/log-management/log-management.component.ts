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
import { ChangeDetectorRef } from '@angular/core'; // @11/09 Add by yuchen


export interface UserLogsList {   // FaultMessage -> LogList @10/30 by yuchen
  logNumber: number;              // totalMessageNumber -> logNumber @10/30 by yuchen
  UserLogsinfo: UserLogsinfo[];   // faultMessages & FaultMessages -> logs & Logs @10/30 by yuchen
}

export interface UserLogsinfo {   // FaultMessages -> loginfo @10/30 by yuchen
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


@Component({
  selector: 'app-log-management',                 // fault -> log @10/30 by yuchen
  templateUrl: './log-management.component.html', // fault -> log @10/30 by yuchen
  styleUrls: ['./log-management.component.scss']  // fault -> log @10/30 by yuchen
})

export class LogManagementComponent implements OnInit, OnDestroy { 
  sessionId: string = '';
  
  UserLogsList: UserLogsList = {} as UserLogsList;
  NELogsList: NELogsList = {} as NELogsList;        // add by yuchen @10/30
  type: string = 'User_Logs';   // 預設選擇 "User Logs" add by yuchen @10/31
  //type: string = 'NE_Logs';   // 預設選擇 "NE Logs" @11/01 add by yuchen
  UserLogTypes: string[];       // @11/01 add by yuchen
  NELogTypes: string[];         // @11/01 add by yuchen


  // For click View Page
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
  userLogs_totalItems: number = 0;
  nullList: string[] = [];  // 給頁籤套件使用


  searchForm!: FormGroup;
  afterSearchForm!: FormGroup;


  refreshTimeout!: any;
  queryFaultMessageScpt!: Subscription;
  @ViewChild('statusModal') statusModal: any;
  statusModalRef!: MatDialogRef<any>;
  queryFMstatusScpt!: Subscription;
  
  queryFMstatusrecordScpt!: Subscription;

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
    private cd: ChangeDetectorRef // @11/09 add by yuchen
  ) {
    const nowTime = this.commonService.getNowTime();
    // console.log(nowTime)
    // 格式驗證需要處理?

    this.searchForm = this.fb.group({
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)), 
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`)),
      'UserLogType': new FormControl('All'),
      'NELogType': new FormControl('All'),
    });



    this.createSearchForm();
    this.createAdvancedForm();
    this.UserLogTypes = this.commonService.UserLogType; // @11/01 add by yuchen
    this.NELogTypes = this.commonService.NELogType;     // @11/01 add by yuchen
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

    this.afterSearchForm = _.cloneDeep(this.searchForm);
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
        this.getUserLogsInfo();

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
        this.getNELogsInfo();
      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); //timeout 100ms
  }



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



  // 建立搜尋表單
  createSearchForm() {
    const nowTime = this.commonService.getNowTime();
    this.searchForm = this.fb.group({
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)), 
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`)),
      'UserLogType': new FormControl('All'),  // User Logs 類型欄位
      'NELogType': new FormControl('All'),    // NE Logs 類型欄位
      'keyword': new FormControl('')          // 新增關鍵字欄位 @11/13 Add by yuchen 
    });
}

  createAdvancedForm() {
    this.advancedForm = this.fb.group({
      'from': new FormControl(''),
      'to': new FormControl(''),
      'UserLogType': new FormControl(''),  // User Logs 類型欄位
      'NELogType': new FormControl(''),    // NE Logs 類型欄位
      'keyword': new FormControl('')       // 新增關鍵字欄位 @11/13 Add by yuchen
    });
  }

  
  pageChanged(page: number) {
    this.p = page;
    this.getUserLogsInfo(); // @10/31 faultxxx -> getUserLogsInfo
    this.getNELogsInfo();   // @11/01 Add getNELogsInfo
  }

  // 用於點擊至對應的 Button 時，進行頁面的切換
  changeType(e: MatButtonToggleChange) {

    this.p = 1;  // 將頁數重置為 1

    this.searchForm.reset({
      from: this.searchForm.get('from')?.value, 
      to: this.searchForm.get('to')?.value,
      UserLogType: 'All',
      NELogType: 'All',
      keyword: ''
    });  // 重置搜尋表單的條件 @11/13 Add by yuchen

    // 重置搜尋狀態標記  @11/13 Add by yuchen
    this.isSearch_userLogs = false;
    this.isSearch_neLogs = false;

    // 重置篩選後的 Log Lists @11/13 Add by yuchen
    this.filtered_UserLogs = [];
    this.filtered_NELogs = [];

    // 根據當前選擇的 Log 類型載入數據
    if (e.value === 'User_Logs') {

      this.type = 'User_Logs';
      this.getUserLogsInfo();  // 載入 User Logs 數據 ( 這將獲取未經篩選的 User Logs )

    } else if (e.value === 'NE_Logs') {

      this.type = 'NE_Logs';
      this.getNELogsInfo();    // 載入 NE Logs 數據 ( 這將獲取未經篩選的 NE Logs )
    }

    // 更新當前類型，以便知道哪個 Log 類型被選中
    // Set the log type to display after tab switch
    this.type = e.value;
    console.log('頁面切換後，顯示的 Log 類型:', this.type);
    console.log('Log type displayed after tab switch:', this.type);
  }



/* ↓ For click "Search" ↓ */


  // For search User Logs
  filtered_UserLogs: UserLogsinfo[] = [];
  isSearch_userLogs: boolean = false;
  search_UserLogs() {

    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1

    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;
    const userLogType = this.searchForm.get('UserLogType')?.value;
    const keyword = this.searchForm.get('keyword')?.value || '';    // 新增關鍵字篩選  @11/13 Add by yuchen

    // 格式化日期為所需的格式
    const formattedFrom = this.commonService.dealPostDate(from);
    const formattedTo = this.commonService.dealPostDate(to);

    // 清除以前的搜尋結果
    this.filtered_UserLogs = [];
    this.isSearch_userLogs = false;

    // 如果是在 Local 環境測試
    if (this.commonService.isLocal) {

      this.filtered_UserLogs = this.UserLogsList.UserLogsinfo.filter(log => {
        const logDate = new Date(log.logtime);
        const isAfterFrom = logDate >= new Date(formattedFrom);
        const isBeforeTo = logDate <= new Date(formattedTo);
        const isTypeMatch = userLogType === 'All' || log.logtype === userLogType;

        // 新增關鍵字篩選判斷  @11/13 Add by yuchen
        // 確認 log 中的請求資料或回應資料是否包含關鍵字，透過將字串轉換為小寫來實現不區分大小寫的比對  
        const isKeywordMatch = !keyword || log.logmsg.toLowerCase().includes(keyword.toLowerCase());


        return isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch;
      });
      this.isSearch_userLogs = true;  // Local Search 完畢，設置標記為 true

      this.totalItems = this.filtered_UserLogs.length; // 確保更新 totalItems 以反映搜尋結果的數量

    } else {

      // 假設您有一個從後端取得日誌的方法，這裡是使用 HTTP 客戶端調用 API 的偽代碼
      const queryParams = { from: formattedFrom, to: formattedTo, userLogType, keyword };
  
      this.http.get<UserLogsList>('/api/userlogs', { params: queryParams }).subscribe(
        data => {
          this.UserLogsList  = data;
          this.filtered_UserLogs  = data.UserLogsinfo; // 假定後端已經篩選了數據
          this.totalItems = data.logNumber; // 更新總條目數量以供分頁
          this.isSearch_userLogs  = true;   // 伺服器 Search 完畢，設置標記為 true
        },
        error => {
          console.error('Error fetching filtered logs:', error);
        }
      );
    }
  }

  get userlogsToDisplay(): UserLogsinfo[] {
    // 如 isSearch_userLogs 為 true，則表示已經進行了搜尋，應該顯示 filtered_UserLogs
    // 否則，顯示全部 UserLogsList.UserLogsinfo
    return this.isSearch_userLogs ? this.filtered_UserLogs : this.UserLogsList.UserLogsinfo;
  }
  


  // For search NE Logs  @11/13 Add by yuchen
  filtered_NELogs: NELogsinfo[] = [];
  isSearch_neLogs: boolean = false;
  search_NELogs() {

    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1

    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;
    const neLogType = this.searchForm.get('NELogType')?.value;
    const keyword = this.searchForm.get('keyword')?.value || ''; // 新增關鍵字篩選

    // 格式化日期為所需的格式
    const formattedFrom = this.commonService.dealPostDate(from);
    const formattedTo = this.commonService.dealPostDate(to);

    // 清除以前的搜尋結果
    this.filtered_NELogs = [];
    this.isSearch_neLogs = false;

    // 如果是在本地環境測試
    if (this.commonService.isLocal) {

      this.filtered_NELogs = this.NELogsList.NELogsinfo.filter(log => {
        const logDate = new Date(log.logtime);
        const isAfterFrom = logDate >= new Date(formattedFrom);
        const isBeforeTo = logDate <= new Date(formattedTo);
        const isTypeMatch = neLogType === 'All' || log.operation === neLogType;

        // 確認 log 中的請求資料或回應資料是否包含關鍵字
        // 透過將字串轉換為小寫來實現不區分大小寫的比對  
        const isKeywordMatch = !keyword || 
                       log.req_data.toLowerCase().includes(keyword.toLowerCase()) || 
                       log.resp_data.toLowerCase().includes(keyword.toLowerCase());


        return isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch;
      });
      this.isSearch_neLogs = true;  // 本地 Search 完畢，設置標記為 true

      this.totalItems = this.filtered_NELogs.length; // 確保更新 totalItems 以反映搜尋結果的數量

    } else {

      // 假設您有一個從後端取得日誌的方法，這裡是使用 HTTP 客戶端調用 API 的偽代碼
      const queryParams = { from: formattedFrom, to: formattedTo, neLogType, keyword };

      this.http.get<NELogsList>('/api/nElogs', { params: queryParams }).subscribe(
        data => {
          this.NELogsList = data;
          this.filtered_NELogs = data.NELogsinfo; // 假定後端已經篩選了數據
          this.totalItems = data.logNumber; // 更新總條目數量以供分頁
          this.isSearch_neLogs = true;  // 伺服器 Search 完畢，設置標記為 true
        },
        error => {
          console.error('Error fetching filtered logs:', error);
        }
      );
    }
  }

  // 用於顯示的 NE Logs 數據  @11/13 Add by yuchen
  get neLogsToDisplay(): NELogsinfo[] {
    // 如果 isSearch_neLogs 為 true，則表示已經進行了搜尋，應該顯示 filtered_NELogs
    // 否則，顯示全部 NELogsList.NELogsinfo
    return this.isSearch_neLogs ? this.filtered_NELogs : this.NELogsList.NELogsinfo;
  }


/* ↑ For click "Search" ↑ */

  
  // @11/07 add by yuchen
  // 用於將指定 Log 匯出成 .csv 檔案  
  // ## 還需要更動成依據 Filters 的設定去進行匯出，如只匯出指定時間段的資料 (未完成)
  exportToCSV(dataType: string) {
    
    // 宣告一個變數來存儲要匯出的資料，結構可是 UserLogsinfo 矩陣或是 NELogsinfo 矩陣
    let dataToExport: UserLogsinfo[] | NELogsinfo[] = [];

    // 從 searchForm 獲取日期範圍並格式化
    const from = this.commonService.dealPostDate(this.searchForm.get('from')?.value);
    const to = this.commonService.dealPostDate(this.searchForm.get('to')?.value);
    const formattedFromDate = from.split(' ')[0]; // 取得日期部分
    const formattedToDate = to.split(' ')[0];     // 取得日期部分


    if (dataType === 'UserLogs') {

      // 如 dataType 是 'UserLogs'，則將 userlogsToDisplay (即當下顯示於頁面上有的數據) 的資料設定為 dataToExport
      dataToExport = this.userlogsToDisplay;  // @11/14 調整為輸出即時顯示於頁面上的 User Logs

    } else if (dataType === 'NELogs') {

      // 如是 'NELogs'，則將 neLogsToDisplay (即當下顯示於頁面上有的數據) 的資料設定為 dataToExport
      dataToExport = this.neLogsToDisplay;    // @11/14 調整為輸出即時顯示於頁面上的 NE Logs
    }

  
    // 將資料轉換成 CSV 格式
    const csvData = this.convertToCSV(dataToExport);
    
    // 創建一個 Blob，用於儲存 CSV 資料
    const blob = new Blob([csvData], { type: 'text/csv' });
    
    // 創建一個 URL 以便下載 CSV 檔案
    const url = window.URL.createObjectURL(blob); // 創建 URL 物件，以供下載或顯示資源
    const a = document.createElement('a');        // 創建一個新的超鏈結元素
    a.href = url;                                 // 設定超鏈結的 URL

    // 根據 dataType 和日期範圍設定下載的檔名  
    // ## 檔名還需依據 Filters 的設定去進行命名 (未完成)
    const fileName = dataType === 'UserLogs' ? 
      `User_Logs_${formattedFromDate}_to_${formattedToDate}.csv` :
      `NE_Logs_${formattedFromDate}_to_${formattedToDate}.csv`;

    a.download = fileName;

    // 觸發點擊事件以下載檔案
    a.click();
    window.URL.revokeObjectURL(url); // 釋放 URL 物件，以回收資源和釋放記憶體
  }
  

  // @11/07 add by yuchen 
  // 用於將指定資料轉換成 .csv 格式 @11/13 updated
  convertToCSV(data: any[]): string {

    // 創建 CSV 檔的標頭行
    const header = Object.keys(data[0]).join(',');
  
    const rows = data.map(row => {
      return Object.values(row).map(value => {

        // 將 value 轉換為字符串，處理特殊字符與換行符號
        const stringValue = typeof value === 'string' ? value : String(value);

        // 雙引號內的雙引號需要被轉義（即替換為兩個雙引號）
        const escapedStringValue = stringValue.replace(/"/g, '""');

        // 如字串包含逗號、雙引號或換行符號，則需要將整個字串包在雙引號中
        return `"${escapedStringValue}"`;
      }).join(',');
    });
  
    // 將標頭行和所有數據行結合成一個 CSV 格式的字串
    return [header, ...rows].join('\n');
  }
  
}