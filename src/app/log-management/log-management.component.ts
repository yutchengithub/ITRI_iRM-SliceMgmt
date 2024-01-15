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
//import * as CryptoJS from 'crypto-js'; @11/23 Add by yuchen 
import * as XLSX from 'xlsx';         // @11/23 Add by yuchen 
//import { saveAs } from 'file-saver';  // @11/23 Add by yuchen 


// @10/30 Add by yuchen
export interface UserLogsList {   
  logNumber: number; 
  loginfo: UserLogsinfo[];
}

// @10/30 Add by yuchen 
export interface UserLogsinfo { 
  userid: string;    
  logtype: string;
  loglevel: number;
  logmsg: string; 
  logtime: string;  
}

// For click View User Log Detail Page @11/06 Add by yuchen 
export interface UserLogdetail {
  userid: string;
  logtype: string;
  loglevel: number;
  logtime: string;
  logmsg: string;
}

// @10/30 Add by yuchen 
export interface NELogsList { 
  logNumber: number;       
  loginfo: NELogsinfo[];             
}

// @10/30 Add by yuchen 
export interface NELogsinfo { 
  userid: string;    
  operation: string;   
  req_data: string;  
  resp_data: string;   
  logtime: string;    
  comp_name: string;  // @11/22 Add by yuchen 
}

// For click View NE Log Detail Page @11/06 Add by yuchen 
export interface NELogdetail {
  userid: string;
  operation: string;
  req_data: string;
  resp_data: string;
  logtime: string;
  comp_name: string;  // @11/22 Add by yuchen 
}

// @10/30 changed by yuchen
@Component({
  selector: 'app-log-management',                 
  templateUrl: './log-management.component.html', 
  styleUrls: ['./log-management.component.scss']  
})

export class LogManagementComponent implements OnInit, OnDestroy { 
  
  UserLogsList: UserLogsList = {} as UserLogsList; 
  NELogsList: NELogsList = {} as NELogsList;
  type: string = 'User_Logs';   // 預設選擇 "User Logs" @10/31 Add  
  //type: string = 'NE_Logs';   // 預設選擇 "NE Logs"   @11/01 Add 
  UserLogTypes: string[];       // @11/01 Add 
  NELogTypes: string[];         // @11/01 Add 


  // For click View Page
  userLogdetail: UserLogdetail = {} as UserLogdetail; // 用於儲存選擇的 User Log 的詳細訊息 @11/06 Add
  neLogdetail: NELogdetail = {} as NELogdetail;       // 用於儲存選擇的 NE Log 的詳細訊息   @11/06 Add

  /* 用於查找名為'userlogDetail'的 Component  <ng-template>，
     用於定義 User Log 詳細訊息的彈出視窗內容。 @11/03 Add */
  @ViewChild('userlogDetail') userlogDetail: any;    

  /* 用於查找名為'nelogDetail'的 Component  (ng-template)，
     通常用於定義 NE Log 訊息的彈出視窗內容。 @11/03 Add */
  @ViewChild('nelogDetail') nelogDetail: any;

  UserlogDetailRef!: MatDialogRef<any>;   // 用於記錄 User Log 詳細資訊的對照視窗，以便在需要時操作和控制 User Log 詳細資訊的彈出視窗。 @11/06 Add 
  NElogDetailRef!: MatDialogRef<any>;     // 用於記錄 NE Log 詳細資訊的對照視窗，以便在需要時操作和控制 NE Log 詳細資訊的彈出視窗。     @11/06 Add 
  

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

    // @11/28 Updated - 調整為格式化當前時間往回推一個月的時間

    // 取得現在時間
    const nowTime = this.commonService.getNowTime();
    console.log("getNowTime: ", nowTime);
    
    // 創建一個新的 Date 物件，代表當前時間
    const currentDate = new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`);
    
    // 創建一個新的 Date 物件，並將月份往回設置一個月
    const oneMonthAgoDate = new Date(currentDate);
    oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
    
    // 確保月份和日期是兩位數的格式，如 "02" 代表 2 月
    const formattedMonth = ('0' + (oneMonthAgoDate.getMonth() + 1)).slice(-2);
    const formattedDay = ('0' + oneMonthAgoDate.getDate()).slice(-2);
    const formattedHour = ('0' + oneMonthAgoDate.getHours()).slice(-2);
    const formattedMinute = ('0' + oneMonthAgoDate.getMinutes()).slice(-2);
    
    // 使用這些格式化後的值來更新 searchForm 控件的值
    this.searchForm = this.fb.group({
      'UserID': new FormControl(''),
      'neName': new FormControl(''), // Only for NE Logs
      'from': new FormControl(`${oneMonthAgoDate.getFullYear()}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}`), 
      'to': new FormControl(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`),
      'UserLogType': new FormControl('All'), // Only for User Logs
      'NELogType': new FormControl('All'),   // Only for NE Logs
    });
    
    this.createSearchForm();
    this.UserLogTypes = this.commonService.UserLogType; // @11/01 Add by yuchen
    this.NELogTypes = this.commonService.NELogType;     // @11/01 Add by yuchen
  }


  sessionId: string = ''; // 宣告 sessionId 屬於字串型態
  /**
   * 當 Component 初始化完成後執行的 Lifecycle Hook。
   * 主要用於設定 Component 的初始狀態，包括預設的 Log 類型、sessionId、以及設定路由參數相關的應對處理。
   */
  ngOnInit(){

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
      //this.userLogsToDisplay;
      this.getUserLogsInfo(); // 預設初始化時取得 User Logs 資訊
      //this.totalItems = this.userLogsToDisplay.length;

      // 數據加載完畢後執行搜尋以更新視圖 @12/04 Add
      //this.search_UserLogs();
    } else {
      //this.neLogsToDisplay;
      this.getNELogsInfo();   // 預設初始化時取得 NE Logs 資訊
      //this.totalItems = this.neLogsToDisplay.length;
    }

    // 執行一次預設搜尋 @12/04 Add
    //this.search_UserLogs();
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

  
  // Get User Logs @12/06 Updated by yuchen
  UserLogs_getNum = 0; // 用於記錄取得 User Logs 資訊之次數
  getUserLogsInfo() {
    console.log('getUserLogsInfo() - Start');

    this.UserLogs_getNum++;
    console.log('UserLogs_getNum:', this.UserLogs_getNum);

    clearTimeout(this.refreshTimeout);

    if (this.commonService.isLocal) {

      // Local Test
      this.UserLogsList = this.commonService.UserLogsList;
      this.UserloginfoDeal();

      // 只有在第一頁時才執行搜尋 @12/06 Add
      if (this.p === 1) {   
        this.search_UserLogs(); 
      }
    } else {

        // 取消之前的 API 訂閱
        if (this.queryLogList) this.queryLogList.unsubscribe();

        // @11/30 Add by yuchen
        // 從 searchForm 中獲取篩選條件
        const params = {
          //userid: this.searchForm.get('UserID')?.value || '',     // 取得 userid，如不存在設為空字串
          //start: this.commonService.dealPostDate(this.searchForm.controls['from'].value), // 取得開始日期
          //end: this.commonService.dealPostDate(this.searchForm.controls['to'].value),     // 取得結束日期
          //logType: this.searchForm.get('UserLogType')?.value,    // 取得 User Log 類型
          //keyword: this.searchForm.get('keyword')?.value || '',  // 取得想搜尋的關鍵字
          offset: (this.p - 1) * this.pageSize,                  // 計算分頁的 offset
          limit: 10                                           // 設定顯示的 Log 數量限制
        };

        // @11/30 Add by yuchen
        // 使用 commonService 中的 queryLogList() 發起 HTTP GET 請求
        this.commonService.queryLogList(params).subscribe({
          next: (res) => {    // 成功的 callback
            console.log('getUserLogsInfo:', res);
            this.UserLogsList = res;  // 直接賦值響應至 UserLogsList
            this.UserloginfoDeal();   // 調用處理 User Log 訊息的函數

            // 只有在第一頁時才執行搜尋 @12/06 Add
            if (this.p === 1) {   
              this.search_UserLogs(); 
            }
          },
          error: (error) => {  // 錯誤的 callback
            console.error('Error fetching user logs:', error); // 顯示錯誤訊息
          },
          complete: () => {    // 完成的 callback
            console.log('User logs fetch completed');   // 顯示完成訊息
          }
        });
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
    }, 1000); // timeout: 100 ms
  }

  
  // Get NE Logs @12/06 Updated by yuchen
  NELogs_getNum = 0; // 用於記錄取得 NE Logs 資訊之次數
  getNELogsInfo() {
    console.log('getNELogsInfo() - Start');
    
    this.NELogs_getNum++;
    console.log('NELogs_getNum:', this.NELogs_getNum);

    // 清除之前設置的定時器以避免重複執行
    clearTimeout(this.refreshTimeout);

    if (this.commonService.isLocal) {

      // Local Test
      this.NELogsList = this.commonService.NELogsList;
      this.NEloginfoDeal();

      // 只有在第一頁時才執行搜尋 @12/06 Add
      if (this.p === 1) {   
        this.search_NELogs(); 
      }
    } else {

      // 取消之前的任何 API 訂閱
      if (this.queryUserNetconfLog) this.queryUserNetconfLog.unsubscribe();
   
      // @11/30 Add by yuchen
      // 從 searchForm 中獲取篩選條件
      const params = {
        userid: this.searchForm.get('UserID')?.value || '',     // 取得 userid，如不存在設為空字串
        nEname: this.searchForm.get('neName')?.value || '',     // 取得 nEname，如不存在設為空字串
        start: this.commonService.dealPostDate(this.searchForm.controls['from'].value),    // 取得開始日期
        end: this.commonService.dealPostDate(this.searchForm.controls['to'].value),        // 取得結束日期
        neLogType: this.searchForm.get('NELogType')?.value,     // 取得 NE Log 類型
        keyword: this.searchForm.get('keyword')?.value || '',   // 取得想搜尋的關鍵字
        offset: (this.p - 1) * this.pageSize,                   // 計算分頁的 offset，以便從正確的記錄開始獲取 Log
        limit: 10                                            // 設定顯示的 Log 數量限制
      };

      // @11/30 Add by yuchen
      // 使用 commonService 中的 queryUserNetconfLog() 發起 HTTP GET 請求 
      this.commonService.queryUserNetconfLog(params).subscribe({
        next: (response) => { // 成功的 callback
          console.log('getNELogsInfo:', response);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
          this.NELogsList = response; // 直接賦值響應至 NELogsList
          this.NEloginfoDeal();       // 調用處理 NE Log 訊息的函數

          // 只有在第一頁時才執行搜尋 @12/06 Add
          if (this.p === 1) {   
            this.search_NELogs(); 
          }
        },
        error: (error) => {   // 錯誤的 callback
          console.error('Error fetching NE logs:', error); // 顯示錯誤訊息
        },
        complete: () => {     // 完成的 callback
          console.log('NE logs fetch completed');          // 顯示完成訊息
        }
      });
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
    }, 1000); // timeout 100ms
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

    // 隱藏 200 訊息
    this.show200Msg = false;

    // 隱藏 500 訊息
    this.show500Msg = false;

    // 開啟 User Log 詳細資訊的視窗
    //this.UserlogDetailRef = this.dialog.open(this.userlogDetail, { id: 'userlogDetail' });

    // 開啟 User Log 詳細資訊的視窗
    this.UserlogDetailRef = this.dialog.open(this.userlogDetail, {
      id: 'userlogDetail',
      panelClass: 'custom-scroll' // 添加自定義滾動條類別
    });

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
      logtime: NELogsinfo.logtime,
      comp_name: NELogsinfo.comp_name  // @11/22 Add by yuchen 
    };

    // 隱藏 200 訊息
    this.show200Msg = false;

    // 隱藏 500 訊息
    this.show500Msg = false;

    // 開啟 NE Log 詳細資訊的視窗
    //this.NElogDetailRef = this.dialog.open(this.nelogDetail, { id: 'nelogDetail' });

    // 打開 NE Log 詳細資訊的視窗時
    this.NElogDetailRef = this.dialog.open(this.nelogDetail, {
      id: 'nelogDetail',
      panelClass: 'custom-scroll' // 添加自定義滾動條類別
    });

    // 監聽視窗關閉事件
    this.NElogDetailRef.afterClosed().subscribe(() => {

    });
  }

  /* ↑ For click "View" ↑ */


  // 建立搜尋表單 @11/28 Updated - 調整為顯示當前時間往回推一個月的時間
  createSearchForm() {
    const nowTime = this.commonService.getNowTime();

    // 創建當前時間的 Date 物件
    const now = new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`);

    // 創建往回推一個月的時間之 Date 物件
    const from = new Date(now);
    from.setMonth(from.getMonth() - 1);

    // 格式化日期時間以符合兩位數格式
    const paddedMonth = ('0' + (from.getMonth() + 1)).slice(-2);
    const paddedDay = ('0' + from.getDate()).slice(-2);
    const paddedHour = ('0' + from.getHours()).slice(-2);
    const paddedMinute = ('0' + from.getMinutes()).slice(-2);

    this.searchForm = this.fb.group({
      'UserID': new FormControl(''),  // 新增 userid 欄位 @11/20 Add by yuchen 
      'neName': new FormControl(''),  // 新增 neName 欄位 @11/22 Add by yuchen 
      'from': new FormControl(`${from.getFullYear()}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedMinute}`), 
      'to': new FormControl(`${now.getFullYear()}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`),
      'UserLogType': new FormControl('All'),  // User Logs 類型欄位
      'NELogType': new FormControl('All'),    // NE Logs 類型欄位
      'keyword': new FormControl('')          // 新增關鍵字欄位 @11/13 Add by yuchen 
    });
  }


  // 用於點擊對應之頁數 Button 時進行頁面切換
  pageChanged(page: number) {
    this.p = page;
    console.log(`Current log type:`, this.type+`, Page:`, this.p);

    // @12/06 add by yuchen
    // 如點擊頁數為 1 ，即刷新對應之 Logs 數據
    if(this.p === 1){

      if (this.type === 'User_Logs') { // 如為 User Logs 頁面
        this.getUserLogsInfo();

      } else if (this.type === 'NE_Logs') { // 如為 NE Logs 頁面
        this.getNELogsInfo();
      }
    }
  }

  // 用於點擊至對應的 Button 時，進行頁面的切換 
  // @11/28 Updated - 調整重置為顯示當前時間往回推一個月的時間
  changeType(e: MatButtonToggleChange) {

    this.p = 1;  // 將頁數重置為 1

    // 獲取當前日期
    const now = new Date(); // 建立一個新的 Date 物件，代表當前時間
  
    // 計算往回推一個月的日期
    const oneMonthAgo = new Date(now);
    oneMonthAgo.setMonth(now.getMonth() - 1);
  
    // 確保月份和日期是兩位數的格式
    const paddedMonth = ('0' + (oneMonthAgo.getMonth() + 1)).slice(-2);
    const paddedDay = ('0' + oneMonthAgo.getDate()).slice(-2);
    const paddedHour = ('0' + oneMonthAgo.getHours()).slice(-2);
    const paddedMinute = ('0' + oneMonthAgo.getMinutes()).slice(-2);
  
    // 重置 searchForm 的條件，包括日期範圍
    this.searchForm.reset({
      UserID: '',           // 新增 UserID 欄位
      neName: '',           // 新增 neName 欄位
      from: `${oneMonthAgo.getFullYear()}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedMinute}`, 
      to: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}`,
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
    console.log('頁面切換後，顯示的 Log 類型:', this.type+
    '\nLog type displayed after tab switch:', this.type);
  }

  // @11/21 Add by yuchen
  // 該函數接受一個 log 矩陣和單數形式的 log 名稱，根據矩陣長度返回單數或複數形式的文本。
  getTotalLogsText(logType: 'user' | 'ne'): string {
    
    let totalLogs: number;
    let logText: string;
  
    if (logType === 'user') {
      totalLogs = this.userLogsToDisplay.length;
      logText = totalLogs === 1 ? this.languageService.i18n['UserLog.single'] : this.languageService.i18n['UserLog.total'];
    } else {
      totalLogs = this.neLogsToDisplay.length;
      logText = totalLogs === 1 ? this.languageService.i18n['NElog.single'] : this.languageService.i18n['NElog.total'];
    }
  
    return `${this.languageService.i18n['Log.total']} ${totalLogs} ${logText}`;
  }
  

  /* ↓ For click "Search" ↓ */

  // For search User Logs @12/04 Updated by yuchen
  filtered_UserLogs: UserLogsinfo[] = [];
  isSearch_userLogs: boolean = false;
  search_UserLogs() {

    // UserLogsList 是否已加載 @12/04 Add
    if (!this.UserLogsList || !this.UserLogsList.loginfo) {
      console.error('UserLogsList.loginfo is not loaded yet.');
      return;
    }
  
    // 更新顯示的搜尋條件 @12/04 Add
    this.afterSearchForm = this.searchForm.value;

    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1

    const userid = this.searchForm.get('UserID')?.value || '';      // 獲取 userid ，如果不存在則為空字串  @11/20 Add by yuchen
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

    this.afterSearchForm = _.cloneDeep(this.searchForm); // @12/01 Add by yuchen

    // 如果是在 Local 環境測試
    if (this.commonService.isLocal) {

      this.filtered_UserLogs = this.UserLogsList.loginfo.filter(log => {

          const isUserIdMatch = !userid || log.userid.includes(userid); // 獲取 userid ，如不存在設為空字串  @11/20 Add by yuchen
          const logDate = new Date(log.logtime);
          const isAfterFrom = logDate >= new Date(formattedFrom);
          const isBeforeTo = logDate <= new Date(formattedTo);
          const isTypeMatch = userLogType === 'All' || log.logtype === userLogType;

          // 新增關鍵字篩選判斷  @11/13 Add by yuchen
          // 確認 log 中的請求資料或回應資料是否包含關鍵字，透過將字串轉換為小寫來實現不區分大小寫的比對  
          const isKeywordMatch = !keyword || log.logmsg.toLowerCase().includes(keyword.toLowerCase());

          // @11/20 Add isUserIdMatch
          return isUserIdMatch && isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch;
      });
      this.isSearch_userLogs = true;  // Local Search 完畢，設置標記為 true

      this.totalItems = this.filtered_UserLogs.length; // 確保更新 totalItems 以反映搜尋結果的數量

    } else {

      /* 於前端進行篩選 ( 與處理 local files 的作法相同 ) */
      this.filtered_UserLogs = this.UserLogsList.loginfo.filter(log => {

        const isUserIdMatch = !userid || log.userid.includes(userid); // 獲取 userid ，如不存在設為空字串  @11/20 Add by yuchen
        const logDate = new Date(log.logtime);
        const isAfterFrom = logDate >= new Date(formattedFrom);
        const isBeforeTo = logDate <= new Date(formattedTo);
        const isTypeMatch = userLogType === 'All' || log.logtype === userLogType;

        // 新增關鍵字篩選判斷  @11/13 Add by yuchen
        // 確認 log 中的請求資料或回應資料是否包含關鍵字，透過將字串轉換為小寫來實現不區分大小寫的比對  
        const isKeywordMatch = !keyword || log.logmsg.toLowerCase().includes(keyword.toLowerCase());

        // @11/20 Add isUserIdMatch
        return isUserIdMatch && isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch;
    });
    this.isSearch_userLogs = true;  // Search 完畢，設置標記為 true

    // 檢查搜尋狀態 @12/04 Add by yuchen
    console.log('Is search for User Logs active:', this.isSearch_userLogs);

    this.totalItems = this.filtered_UserLogs.length; // 確保更新 totalItems 以反映搜尋結果的數量

     // 檢查搜尋表單的值 @12/04 Add by yuchen
     console.log('Search criteria for User Logs:', this.afterSearchForm.value);

      /* 呼叫後端 API 先篩選的作法（目前會失敗）@11/29

          // 從表單中獲取查詢參數
          const userid = this.searchForm.get('UserID')?.value || '';      // 獲取 userid
          const from = this.searchForm.get('from')?.value;
          const to = this.searchForm.get('to')?.value;
          const userLogType = this.searchForm.get('UserLogType')?.value;
          const keyword = this.searchForm.get('keyword')?.value || '';

          // 格式化日期
          const formattedFrom = this.commonService.dealPostDate(from);
          const formattedTo = this.commonService.dealPostDate(to);

          // 構建 API 端點
          const apiEndpoint = `${this.commonService.restPath}/queryLogList/${this.sessionId}`;

          // 使用 HTTP 客戶端調用後端 API
          this.http.get<UserLogsList>(apiEndpoint, {
            params: {
              userid,                 // 使用者ID
              start: formattedFrom,   // 起始時間
              end: formattedTo,       // 結束時間
              logtype: userLogType,   // 日誌類型
              keyword,                // 關鍵字
            }
          }).subscribe({
            next: data => {
              this.UserLogsList = data;
              this.filtered_UserLogs = data.loginfo; // 假定後端已經篩選了數據
              this.totalItems = data.logNumber;      // 更新總條目數量以供分頁
              this.isSearch_userLogs = true;         // 伺服器 Search 完畢，設置標記為 true
            },
            error: error => {
              console.error('Error fetching filtered logs:', error);
            },
            complete: () => {
              console.log('Fetch complete');
            }
          });
      */
    }
  }

  // 用於顯示的 User Logs 數據  @11/27 Changed by yuchen
  get userLogsToDisplay(): UserLogsinfo[] {
    // 檢查 this.UserLogsList 是否存在，以及 this.UserLogsList.loginfo 是否為非空數組
    if (this.UserLogsList && Array.isArray(this.UserLogsList.loginfo)) {
      return this.isSearch_userLogs ? this.filtered_UserLogs : this.UserLogsList.loginfo;
    }
    return []; // 如果數據還沒有載入，則返回一個空數組
  }
  

  // 重置 NE Logs 搜尋  @11/24 Add by yuchen
  clear_search_UserLogs() {
    this.isSearch_userLogs = false;
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getUserLogsInfo();
  }  

  // For search NE Logs @12/04 Updated by yuchen
  filtered_NELogs: NELogsinfo[] = [];
  isSearch_neLogs: boolean = false;
  search_NELogs() {

    // NELogsList 是否已加載 @12/04 Add
    if (!this.NELogsList || !this.NELogsList.loginfo) {
      console.error('NELogsList.loginfo is not loaded yet.');
      return;
    }

    // 更新顯示的搜尋條件 @12/04 Add
    this.afterSearchForm = this.searchForm.value;

    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1

    const userid = this.searchForm.get('UserID')?.value || '';   // 獲取 userid ，如不存在設為空字串  @11/20 Add by yuchen
    const nEname = this.searchForm.get('neName')?.value || '';   // 獲取 nEname，如不存在設為空字串 @11/22 Add by yuchen
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

    this.afterSearchForm = _.cloneDeep(this.searchForm); // @12/04 Add by yuchen

    // 如果是在本地環境測試
    if (this.commonService.isLocal) {

      this.filtered_NELogs = this.NELogsList.loginfo.filter(log => {
        
          const isUserIdMatch = !userid || log.userid.includes(userid);    // 新增 userid 篩選判斷  @11/20 Add by yuchen  
          const isnEnameMatch = !nEname || log.comp_name.includes(nEname); // 新增 nEname 篩選判斷  @11/22 Add by yuchen       
          const logDate = new Date(log.logtime);
          const isAfterFrom = logDate >= new Date(formattedFrom);
          const isBeforeTo = logDate <= new Date(formattedTo);
          const isTypeMatch = neLogType === 'All' || log.operation === neLogType;

          // 確認 log 中的請求資料或回應資料是否包含關鍵字
          // 透過將字串轉換為小寫來實現不區分大小寫的比對  
          const isKeywordMatch = !keyword || 
                        log.req_data.toLowerCase().includes(keyword.toLowerCase()) || 
                        log.resp_data.toLowerCase().includes(keyword.toLowerCase());

          // @11/20 Add isUserIdMatch | @11/22 Add isnEnameMatch
          return isUserIdMatch && isnEnameMatch && isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch; 
      });
      this.isSearch_neLogs = true;  // 本地 Search 完畢，設置標記為 true

      this.totalItems = this.filtered_NELogs.length; // 確保更新 totalItems 以反映搜尋結果的數量

    } else {

      /* 於前端進行篩選 ( 與處理 local files 的作法相同 ) */
      this.filtered_NELogs = this.NELogsList.loginfo.filter(log => {
        
        const isUserIdMatch = !userid || log.userid.includes(userid);    // 新增 userid 篩選判斷  @11/20 Add by yuchen  
        const isnEnameMatch = !nEname || log.comp_name.includes(nEname); // 新增 nEname 篩選判斷  @11/22 Add by yuchen       
        const logDate = new Date(log.logtime);
        const isAfterFrom = logDate >= new Date(formattedFrom);
        const isBeforeTo = logDate <= new Date(formattedTo);
        const isTypeMatch = neLogType === 'All' || log.operation === neLogType;

        // 確認 log 中的請求資料或回應資料是否包含關鍵字
        // 透過將字串轉換為小寫來實現不區分大小寫的比對  
        const isKeywordMatch = !keyword || 
                      log.req_data.toLowerCase().includes(keyword.toLowerCase()) || 
                      log.resp_data.toLowerCase().includes(keyword.toLowerCase());

        // @11/20 Add isUserIdMatch | @11/22 Add isnEnameMatch
        return isUserIdMatch && isnEnameMatch && isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch; 
    });
    this.isSearch_neLogs = true;  // Search 完畢，標記設置為 true

    // 檢查搜尋狀態 @12/04 Add by yuchen
    console.log('Is search for NE Logs active:', this.isSearch_neLogs);

    this.totalItems = this.filtered_NELogs.length; // 確保更新 totalItems 以反映搜尋結果的數量

    // 檢查搜尋表單的值 @12/04 Add by yuchen
    console.log('Search criteria for NE Logs:', this.afterSearchForm.value);

    /* 呼叫後端 API 先篩選的作法（目前會失敗）@11/29
      // 從表單中獲取查詢參數
      const userid = this.searchForm.get('UserID')?.value || '';      
      const from = this.searchForm.get('from')?.value;
      const to = this.searchForm.get('to')?.value;
      const neLogType = this.searchForm.get('NELogType')?.value;
      const keyword = this.searchForm.get('keyword')?.value || '';    

      // 格式化日期
      const formattedFrom = this.commonService.dealPostDate(from);
      const formattedTo = this.commonService.dealPostDate(to);

      // 構建 API 端點
      const apiUrl = `${this.commonService.restPath}/queryUserNetconfLog/${this.sessionId}`;

      // 使用 HTTP 客戶端調用後端 API
      this.http.get<NELogsList>(apiUrl, {
        params: {
          userid,          // 用戶ID
          start: formattedFrom,   // 起始時間
          end: formattedTo,       // 結束時間
          neLogType,       // NE Log 類型
          keyword,         // 關鍵字
        }
      }).subscribe({
        next: data => {
          this.NELogsList = data;
          this.filtered_NELogs = data.loginfo; // 假設後端已經篩選了數據
          this.totalItems = data.logNumber;    // 更新總條目數量以供分頁
          this.isSearch_neLogs = true;         // 伺服器 Search 完畢，設置標記為 true
        },
        error: error => {
          console.error('Error fetching filtered logs:', error);
        }
      });
    */

    }
  }

  // 用於顯示的 NE Logs 數據  @11/27 Changed by yuchen
  get neLogsToDisplay(): NELogsinfo[] {
    // 確保 NELogsList 和 NELogsList.loginfo 存在
    if (this.NELogsList && Array.isArray(this.NELogsList.loginfo)) {
      return this.isSearch_neLogs ? this.filtered_NELogs : this.NELogsList.loginfo;
    }
    return []; // 如果數據還沒有載入，則返回一個空數組
  }


  // 重置 NE Logs 搜尋  @11/24 Add by yuchen
  clear_search_NELogs() {
    this.isSearch_neLogs = false;
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getNELogsInfo();
  }  

/* ↑ For click "Search" ↑ */

  // @11/24 not use
  // // 用於將指定 Log 匯出成 .csv 檔案  @11/07 Add by yuchen 
  // exportToCSV(dataType: string) {
    
  //   // 宣告一個變數來存儲要匯出的資料，結構可是 UserLogsinfo 矩陣或是 NELogsinfo 矩陣
  //   let dataToExport: UserLogsinfo[] | NELogsinfo[] = [];

  //   // 依據使用者選擇的 dataType 確定是使用 UserLogType 還是 NELogType
  //   // 從 searchForm 獲取使用者選擇的日誌類型，如無選擇則默認為 'All'
  //   const logType = dataType === 'UserLogs' ? this.searchForm.get('UserLogType')?.value || 'All' 
  //                                           : this.searchForm.get('NELogType')?.value || 'All';
    
  //   const formattedLogType = logType.replace(/\s+/g, '_'); // 將空白符號替換為下底線

  //   // 從 searchForm 獲取日期範圍並格式化
  //   const formattedFromDate = this.commonService.dealPostDate(this.searchForm.get('from')?.value).split(' ')[0]; // 取得日期部分(從)
  //   const formattedToDate = this.commonService.dealPostDate(this.searchForm.get('to')?.value).split(' ')[0];     // 取得日期部分(至)

  //   if (dataType === 'UserLogs') {

  //     // 為每條 User log 添加一個編號屬性 @11/22 Add 
  //     // 如 dataType 是 'UserLogs'，則將 userLogsToDisplay (即當下顯示於頁面上有的數據) 的資料設定為 dataToExport
  //     dataToExport = this.userLogsToDisplay.map((log, index) => ({
  //       "No.": (this.p - 1) * this.pageSize + index + 1, // 計算編號
  //       ...log
  //     }));
  //   } else if (dataType === 'NELogs') {

  //     // 為每條 NE log 添加一個編號屬性 @11/22 Add 
  //     // 如是 'NELogs'，則將 neLogsToDisplay (即當下顯示於頁面上有的數據) 的資料設定為 dataToExport
  //     dataToExport = this.neLogsToDisplay.map((log, index) => ({
  //       "No.": (this.p - 1) * this.pageSize + index + 1, // 計算編號
  //       ...log
  //     }));
  //   }
  
  //   // 將資料轉換成 CSV 格式
  //   const csvData = this.convertToCSV(dataToExport);
    
  //   // 創建一個 Blob，用於儲存 CSV 資料
  //   const blob = new Blob([csvData], { type: 'text/csv' });
    
  //   // 創建一個 URL 以便下載 CSV 檔案
  //   const url = window.URL.createObjectURL(blob); // 創建 URL 物件，以供下載或顯示資源
  //   const a = document.createElement('a');        // 創建一個新的超鏈結元素
  //   a.href = url;                                 // 設定超鏈結的 URL

  //   // 根據 dataType 、日期範圍和 log 類型設定下載的檔名  @11/14 changed by yuchen
  //   const fileName = `${dataType}_${formattedLogType}_${formattedFromDate}_to_${formattedToDate}.csv`;

  //   a.download = fileName;

  //   // 觸發點擊事件以下載檔案
  //   a.click();
  //   window.URL.revokeObjectURL(url); // 釋放 URL 物件，以回收資源和釋放記憶體
  // }
  

  // // @11/07 Add by yuchen 
  // // 用於將指定資料轉換成 .csv 格式 @11/23 updated
  // convertToCSV(data: any[]): string {

  //   // 定義 CSV 檔案中 UserLogs 每行數據的欄位順序
  //   const userLogFields = ['No.', 'userid', 'logtype', 'loglevel', 'logmsg', 'logtime'];

  //   // 定義 CSV 檔案中 NELogs 每行數據的欄位順序
  //   const neLogFields = ['No.', 'userid', 'comp_name', 'operation', 'req_data', 'resp_data', 'logtime'];
  
  //   // 選擇使用 UserLogs 或 NELogs 的欄位順序來創建標頭行
  //   const header = data.some(log => 'comp_name' in log) ? neLogFields.join(',') : userLogFields.join(',');
  
  //   // 根據定義的欄位順序創建每條數據的 CSV 行
  //   const rows = data.map(row => {
  //     // 選擇使用 UserLogs 或 NELogs 的欄位順序來映射每條數據的值
  //     const fields = 'comp_name' in row ? neLogFields : userLogFields;
  //     const values = fields.map(field => {
  //       const value = row[field];
  //       const stringValue = typeof value === 'string' ? value : String(value);
  //       const escapedStringValue = stringValue.replace(/"/g, '""');
  //       return `"${escapedStringValue}"`;
  //     });
  //     return values.join(',');
  //   });
  
  //   // 將標頭行和所有數據行結合成一個 CSV 格式的字符串
  //   return [header, ...rows].join('\n');
  // }


  // @11/29 Updated 
  //         --> Excel's cell content is limited to 32767 characters.
  //         --> Adjust date output format and add multiple output times.(YYYYMMDD_HHmm)
  exportToExcel(dataType: string) {
    
    // 宣告一個變數來存儲要匯出的資料，結構可是 UserLogsinfo 矩陣或是 NELogsinfo 矩陣
    let dataToExport: UserLogsinfo[] | NELogsinfo[] = [];

    // 依據使用者選擇的 dataType 確定是使用 UserLogType 還是 NELogType
    // 從 searchForm 獲取使用者選擇的日誌類型，如無選擇則默認為 'All'
    const logType = dataType === 'UserLogs' ? this.searchForm.get('UserLogType')?.value || 'All' 
                                            : this.searchForm.get('NELogType')?.value || 'All';
    
    const formattedLogType = logType.replace(/\s+/g, '_'); // 將空白符號替換為下底線
    
    // 從 searchForm 中獲取日期範圍
    const startDate = new Date(this.searchForm.get('from')?.value); // 取得日期部分(從)
    const endDate = new Date(this.searchForm.get('to')?.value);     // 取得日期部分(至)

    // 將日期轉換為 'YYYYMMDD_HHmm' 的格式
    const formattedStartDate = this.formatDateForFileName(startDate);
    const formattedEndDate = this.formatDateForFileName(endDate);

    // 定義欄位順序
    const fields = dataType === 'UserLogs' ? 
    ['No.', 'userid', 'logtype', 'loglevel', 'logmsg', 'logtime'] :
    ['No.', 'userid', 'comp_name', 'operation', 'req_data', 'resp_data', 'logtime'];

    // 如果是 User Logs，則添加相應的數據和編號
    if (dataType === 'UserLogs') {
      dataToExport = this.userLogsToDisplay.map((log, index) => ({
        "No.": (this.p - 1) * this.pageSize + index + 1,
        ...log
      }));
    } else if (dataType === 'NELogs') {
      // 如果是 NE Logs，則添加相應的數據和編號
      dataToExport = this.neLogsToDisplay.map((log, index) => ({
        "No.": (this.p - 1) * this.pageSize + index + 1,
        ...log
      }));
    }

      // 格式化數據以符合欄位順序
      const formattedData = dataToExport.map(row => {

      // 將 row 視為具有任意鍵的對象
      const record = row as Record<string, any>;

      // 檢查並處理過長的文本
      // ## Microsoft Excel 一個單元格的內容長度限制最多是 32767 個字符(非瀏覽器或前端技術的限制)。
      Object.keys(record).forEach(key => {
        if (record[key] && record[key].toString().length > 32767) {
          record[key] = record[key].toString().substring(0, 32767); // 截斷文本
        }
      });

      // 根據欄位順序格式化數據
      return fields.reduce((obj, field) => {
        obj[field] = record[field];
        return obj;
      }, {} as Record<string, any>);
    });

    // 創建工作表
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // 創建工作簿並添加工作表
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');

    // 生成 Excel 檔案並保存
    const fileName = `${dataType}_${formattedLogType}_${formattedStartDate}_to_${formattedEndDate}.xlsx`;
 
    XLSX.writeFile(workbook, fileName);
  }

  //  @11/29 Add by yuchen
  // 格式化日期時間至 'YYYYMMDD_HHmm' 該格式
  formatDateForFileName(date: Date): string {
    
    return date.getFullYear().toString() +
          (date.getMonth() + 1).toString().padStart(2, '0') +
          date.getDate().toString().padStart(2, '0') + '_' +
          date.getHours().toString().padStart(2, '0') +
          date.getMinutes().toString().padStart(2, '0');
  }

}
