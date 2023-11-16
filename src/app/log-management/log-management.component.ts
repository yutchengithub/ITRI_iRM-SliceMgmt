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
  loginfo: UserLogsinfo[];        // faultMessages & FaultMessages -> logs & Logs @10/30 by yuchen
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
  loginfo: NELogsinfo[];             
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
  
  UserLogsList: UserLogsList = {} as UserLogsList; 
  NELogsList: NELogsList = {} as NELogsList;
  type: string = 'User_Logs';   // 預設選擇 "User Logs" @10/31 add  
  //type: string = 'NE_Logs';   // 預設選擇 "NE Logs"   @11/01 add 
  UserLogTypes: string[];       // @11/01 add 
  NELogTypes: string[];         // @11/01 add 


  // For click View Page
  userLogdetail: UserLogdetail = {} as UserLogdetail; // 用於儲存選擇的 User Log 的詳細訊息 @11/06 add
  neLogdetail: NELogdetail = {} as NELogdetail;       // 用於儲存選擇的 NE Log 的詳細訊息   @11/06 add

  /* 用於查找名為'userlogDetail'的 Component  <ng-template>，
     用於定義 User Log 詳細訊息的彈出視窗內容。 @11/03 add */
  @ViewChild('userlogDetail') userlogDetail: any;    

  /* 用於查找名為'nelogDetail'的 Component  (ng-template)，
     通常用於定義 NE Log 訊息的彈出視窗內容。 @11/03 add */
  @ViewChild('nelogDetail') nelogDetail: any;

  UserlogDetailRef!: MatDialogRef<any>;   // 用於記錄 User Log 詳細資訊的對照視窗，以便在需要時操作和控制 User Log 詳細資訊的彈出視窗。 @11/06 add 
  NElogDetailRef!: MatDialogRef<any>;     // 用於記錄 NE Log 詳細資訊的對照視窗，以便在需要時操作和控制 NE Log 詳細資訊的彈出視窗。     @11/06 add 
  

  searchForm!: FormGroup;
  afterSearchForm!: FormGroup;

  /* queryLogList 是用來保存對 HTTP 的訂閱請求引用。
     使用 '!' 後綴符號來告訴 TypeScript 此屬性將會被賦值，並且須確保在使用前其不會是 null 或 undefined。
     於各 Component 的生命週期中管理該訂閱，特別於銷毀 Component 時取消訂閱，以避免內存洩漏。 */
  queryLogList!: Subscription;

  // queryUserNetconfLog 同樣用於管理 HTTP 的訂閱請求，'!' 確保在使用前已賦值。
  queryUserNetconfLog!: Subscription;

  // 用於儲存 setTimeout 的返回值，可在需要時清除定時器，防止不必要的 callback 執行
  refreshTimeout!: any;
  
  show200Msg = false;
  show500Msg = false;


  // For page number
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  constructor(

    private http: HttpClient,
    public commonService: CommonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public languageService: LanguageService,
    private dialog: MatDialog

  ) {
    const nowTime = this.commonService.getNowTime();
    console.log("getNowTime: ", nowTime)

    this.searchForm = this.fb.group({
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)), 
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`)),
      'UserLogType': new FormControl('All'),
      'NELogType': new FormControl('All'),
    });

    this.createSearchForm();
    this.UserLogTypes = this.commonService.UserLogType; // @11/01 add by yuchen
    this.NELogTypes = this.commonService.NELogType;     // @11/01 add by yuchen
  }


  sessionId: string = ''; // 宣告 sessionId 屬於字串型態
  /**
   * 當 Component 初始化完成後執行的 Lifecycle Hook。
   * 主要用於設定 Component 的初始狀態，包括預設的 Log 類型、sessionId、以及設定路由參數相關的應對處理。
   */
  ngOnInit(): void {

    // 設定預設的 Log 類型，用於 Component 初次載入時顯示相應的 Log Lists
    this.type = 'User_Logs';
    // this.type = 'NE_Logs';
  
    // 從 commonService 中獲取當前 Session 的 ID，確保在進行 API 請求前 Session ID 已準備就緒。
    // 選擇於 ngOnInit() 中獲取是由於它提供了一個合適的時機點，來確保所有相依的服務都已初始化完畢，
    // 且如 sessionId 的值依賴於異步(非同步)操作或 Component 的輸入屬性，這可確保這些操作於獲取 sessionId 前完成。
    // 這樣做也有助於測試和管理 Component 的生命週期。
    this.sessionId = this.commonService.getSessionId();
  
    // 建立一個 subscribe 來監聽來自路由參數的變化，並更新 searchForm 的值
    this.route.params.subscribe((params) => {
      if (params['UserLogType'] && params['UserLogType'] !== 'All') {
        this.searchForm.controls['UserLogType'].setValue(params['UserLogType']);
      }
      if (params['NELogType'] && params['NELogType'] !== 'All') {
        this.searchForm.controls['NELogType'].setValue(params['NELogType']);
      }
    });
  
    // 建立 searchForm 的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。
    this.afterSearchForm = _.cloneDeep(this.searchForm);
  
    // 根據 Component 的類型 ( User Logs 或 NE Logs )，載入相應的 Log 資訊
    if (this.type === 'User_Logs') {
      this.getUserLogsInfo(); // 預設初始化時取得 User Logs 資訊
    } else {
      this.getNELogsInfo();   // 預設初始化時取得 NE Logs 資訊
    }
  }

  // 銷毀 Component 時的清理工作
  ngOnDestroy() {

    // 清除可能存在的定時器，以免造成內存洩漏或不必要的操作執行
    clearTimeout(this.refreshTimeout);

    // 如存在對 User Logs 的 API 請求訂閱，則取消訂閱以避免內存洩漏
    if (this.queryLogList) this.queryLogList.unsubscribe();
    
    // 如存在對 NE Logs 的 API 請求訂閱，同樣取消訂閱
    if (this.queryUserNetconfLog) this.queryUserNetconfLog.unsubscribe();
  }


  // Get User Logs @10/31 Add
  getUserLogsInfo() {

    console.log('getUserLogsInfo() - Start');

    // 使用 clearTimeout 函數清除掛在 refreshTimeout 上的定時器，
    // 以便取消之前設置的延遲執行操作(如有的話)，
    // 預防在 Component 或數據狀態改變後，之前的延時操作還在運行，從而導致可能的錯誤或重複請求。
    clearTimeout(this.refreshTimeout);

    // 是否於 local 測試
    if (this.commonService.isLocal) { 

      // local file test
      this.UserLogsList = this.commonService.UserLogsList;
      this.UserloginfoDeal();

    } else {

      // 建立 API 的完整 URL，結合基礎路徑和當前 Session 的 sessionId
      const apiEndpoint = `${this.commonService.restPath}/queryLogList/${this.sessionId}`;

      // 從 searchForm 中取得篩選條件
      const start = this.commonService.dealPostDate(this.searchForm.controls['from'].value);
      const end = this.commonService.dealPostDate(this.searchForm.controls['to'].value);
      const userLogType = this.searchForm.get('UserLogType')?.value;
      const keyword = this.searchForm.get('keyword')?.value || '';

      // 計算分頁的 offset，以便從正確的記錄開始獲取 Log
      const offset = (this.p - 1) * this.pageSize;

      // 設定每頁顯示的 Log 數量限制
      const limit = 10;

      // Cancel any existing subscriptions 取消之前的 API 訂閱
      if (this.queryLogList) this.queryLogList.unsubscribe();

      // 建立 HTTP 請求並指定預期的響應型態為 UserLogsList
      this.queryLogList = this.http.get<UserLogsList>(apiEndpoint, { 

        // 傳入查詢參數
        params: { 
          start: start,             // 起始時間
          end: end,                 // 結束時間
          userLogType: userLogType, // User Log 類型
          keyword: keyword,         // 關鍵字搜尋
          offset: offset,           // 分頁起點
          limit: limit              // 每頁限制數量
        }
      }).subscribe(
        res => { // 成功的 callback，res 的型態已由 TypeScript 推斷為 UserLogsList
          
          console.log('getUserLogsInfo:', res); // 在控制台打印響應數據
          this.UserLogsList = res;  // 將響應數據賦值給 UserLogsList
          this.UserloginfoDeal();   // 調用處理 User Log 訊息的函數
        },
        error => { // 錯誤的 callback
          console.error('Error fetching user logs:', error); // 在控制台顯示錯誤訊息
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

    // 清除之前設置的定時器以避免重複執行
    clearTimeout(this.refreshTimeout);

    if (this.commonService.isLocal) {

      // 本地測試，直接使用本地存儲的 NE Log 數據
      this.NELogsList = this.commonService.NELogsList;
      this.NEloginfoDeal();

    } else {

      // 從 searchForm 中獲取篩選條件
      const start = this.commonService.dealPostDate(this.searchForm.controls['from'].value);
      const end = this.commonService.dealPostDate(this.searchForm.controls['to'].value);
      const neLogType = this.searchForm.get('NELogType')?.value;
      const keyword = this.searchForm.get('keyword')?.value || '';

      // 計算分頁的 offset，以便從正確的記錄開始獲取 Log
      const offset = (this.p - 1) * this.pageSize;

      // 設定每頁顯示的 Log 數量限制
      const limit = 10;

      // 取消之前的任何 API 訂閱
      if (this.queryUserNetconfLog) this.queryUserNetconfLog.unsubscribe();

      // 建立 API 的完整 URL，結合基礎路徑和當前會話的 sessionId
      const apiUrl = `${this.commonService.restPath}/queryUserNetconfLog/${this.sessionId}`;

      // 發起 HTTP GET 請求並指定預期的響應類型為 NELogsList
      this.queryUserNetconfLog = this.http.get<NELogsList>(apiUrl, {
        params: {
          start: start,               // 起始時間
          end: end,                   // 結束時間
          neLogType: neLogType,       // NE Log 類型
          keyword: keyword,           // 關鍵字搜索
          offset: offset,             // 分頁起點
          limit: limit                // 每頁限制數量
        }
      }).subscribe(
        response => { // 成功的 callback
          
          console.log('getNELogsInfo:', response);
          this.NELogsList = response; // 直接賦值響應至 NELogsList
          this.NEloginfoDeal();       // 調用處理 NE Log 訊息的函數
        },
        error => { // 錯誤的 callback
          console.error('Error fetching NE logs:', error); // 顯示錯誤訊息
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
        
        console.log('page[${this.p}] ===> refresh.');
        this.getNELogsInfo();

      } else {
        console.log('page[${this.p}] ===> no refresh.');
      }
    }, 100); // timeout 100ms
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

    // 開啟 User Log 詳細資訊的視窗
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

  // 用於點擊對應 Button 時進行頁面切換
  pageChanged(page: number) {
    this.p = page;
    this.getUserLogsInfo(); // @10/31 faultxxx -> getUserLogsInfo
    this.getNELogsInfo();   // @11/01 Add getNELogsInfo
  }

  // 用於點擊至對應的 Button 時，進行頁面的切換
  changeType(e: MatButtonToggleChange) {

    this.p = 1;  // 將頁數重置為 1

    // 獲取當前日期或者一個預設的日期範圍
    const now = new Date(); // 建立一個新的 Date 物件，代表當前時間
    const defaultFromDate = new Date(now.getFullYear(), 0, 1); // 設定預設的起始日期為當年的 1 月 1 日
    const defaultToDate = new Date(); // 設定預設的結束日期為當前日期


    // 重置 searchForm 的條件，包括日期範圍 @11/13 Add by yuchen
    this.searchForm.reset({
      from: defaultFromDate, 
      to: defaultToDate,
      UserLogType: 'All',
      NELogType: 'All',
      keyword: ''
    });

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

      this.filtered_UserLogs = this.UserLogsList.loginfo.filter(log => {
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
          this.filtered_UserLogs  = data.loginfo; // 假定後端已經篩選了數據
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
    // 否則，顯示全部 UserLogsList.loginfo
    return this.isSearch_userLogs ? this.filtered_UserLogs : this.UserLogsList.loginfo;
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

      this.filtered_NELogs = this.NELogsList.loginfo.filter(log => {
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
          this.filtered_NELogs = data.loginfo; // 假定後端已經篩選了數據
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
    // 否則，顯示全部 NELogsList.loginfo
    return this.isSearch_neLogs ? this.filtered_NELogs : this.NELogsList.loginfo;
  }

/* ↑ For click "Search" ↑ */

  

  // @11/07 add by yuchen
  // 用於將指定 Log 匯出成 .csv 檔案  
  // ## 還需要更動成依據 Filters 的設定去進行匯出，如只匯出指定時間段的資料 (未完成)
  exportToCSV(dataType: string) {
    
    // 宣告一個變數來存儲要匯出的資料，結構可是 UserLogsinfo 矩陣或是 NELogsinfo 矩陣
    let dataToExport: UserLogsinfo[] | NELogsinfo[] = [];

    // 依據用戶選擇的 dataType 確定是使用 UserLogType 還是 NELogType
    // 從 searchForm 獲取用戶選擇的日誌類型，如無選擇則默認為 'All'
    const logType = dataType === 'UserLogs' ? this.searchForm.get('UserLogType')?.value || 'All' 
                                            : this.searchForm.get('NELogType')?.value || 'All';
    
    const formattedLogType = logType.replace(/\s+/g, '_'); // 將空白符號替換為下底線

    // 從 searchForm 獲取日期範圍並格式化
    const formattedFromDate = this.commonService.dealPostDate(this.searchForm.get('from')?.value).split(' ')[0]; // 取得日期部分(從)
    const formattedToDate = this.commonService.dealPostDate(this.searchForm.get('to')?.value).split(' ')[0];     // 取得日期部分(至)


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

    // 根據 dataType 、日期範圍和 log 類型設定下載的檔名  @11/14 changed by yuchen
    const fileName = `${dataType}_${formattedLogType}_${formattedFromDate}_to_${formattedToDate}.csv`;

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