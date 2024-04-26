import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import * as _ from 'lodash';
//import * as CryptoJS from 'crypto-js'; @11/23 Add by yuchen 
import * as XLSX from 'xlsx';         // @11/23 Add by yuchen 
//import { saveAs } from 'file-saver';  // @11/23 Add by yuchen 

// Services
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService } from '../shared/service/spinner.service';    // 用於控制顯示 Spinner @2024/04/17 Add

// For import APIs of Field Management @2024/03/14 Add 
import { apiForLogMgmt } from '../shared/api/For_Log_Mgmt';

// 引入儲存各個資訊所需的 interfaces @2024/03/14 Add 
import { UserLogsList, UserLogsInfo, UserLogDetail }  from '../shared/interfaces/Log/For_queryLogList';          
import { NELogsList, NELogsInfo, NELogDetail }        from '../shared/interfaces/Log/For_queryUserNetconfLog';  
import { NEList, NE }                                 from '../shared/interfaces/NE/For_queryBsComponentList';  

// For import local files @2024/03/14 Add 
import { localUserLogsList } from '../shared/local-files/Log/For_queryLogList';
import { localNELogsList }   from '../shared/local-files/Log/For_queryUserNetconfLog';
import { localNEList }       from '../shared/local-files/NE/For_queryBsComponentList';

// @2024/03/14 Add
// 用於儲存 NE 名稱與 id 的對應關係
export interface NEidNamePair {
  id: string;
  name: string;
}

// @2024/03/11 Add
// 用於儲存 User Logs 的篩選條件 
interface UserLogsParams {
  userid?: string;  // 可選
  start: string;
  end: string;
  keyword?: string; // 可選
  logtype?: string; // 可選
  offset: number;
  limit: number;
}

// @2024/03/12 Add
// 用於儲存下載 User Logs 的篩選條件 
interface downloadUserLogsParams {
  userid?: string;  // 可選
  start: string;
  end: string;
  keyword?: string; // 可選
  logtype?: string; // 可選
}

// @2024/03/11 Add
// 用於儲存 NE Logs 的篩選條件 
interface NELogsParams {
  userid?: string;    // 可選
  compid?: string;    // 可選 - 需透過呼叫 queryBsComponentList() API 取得，須先透過 comp_name 找到對應 id 再存入此
  start: string;
  end: string;
  operation?: string; // 可選
  keyword?: string;   // 可選
  offset: number;
  limit: number;
}

// @2024/03/12 Add
// 用於儲存下載 NE Logs 的篩選條件 
interface downloadNELogsParams {
  userid?: string;      // 可選
  compid?: string;      // 可選 - 需透過呼叫 queryBsComponentList() API 取得，須先透過 comp_name 找到對應 id 再存入此
  start: string;
  end: string;
  operation?: string;  // 可選
  keyword?: string;    // 可選
}

@Component({
  selector: 'app-log-management',                 
  templateUrl: './log-management.component.html', 
  styleUrls: ['./log-management.component.scss']  
})

export class LogManagementComponent implements OnInit, OnDestroy { 
  
  sessionId: string = ''; // 宣告 sessionId 屬於字串型態

  // 用於儲存 setTimeout 的返回值，
  // 可在需要時清除定時器，防止不必要的 callback 執行
  refreshTimeout!: any;

  UserLogTypes: string[] = ['GET', 'POST', 'DELETE'];             // @2024/03/10 Update
  NELogTypes:   string[] = ['get', 'get-config', 'edit-config'];  // @2024/03/10 Update
  
  show200Msg = false;
  show500Msg = false;

  // @2024/04/17 Add
  // Show spinner of Loading Title 
  showLoadingSpinner() {
    this.spinnerService.isLoading = true;
    this.spinnerService.show();
  }

  // @2024/04/17 Add
  // Show spinner of Processing Title
  showProcessingSpinner() {
    this.spinnerService.isLoading = false;
    this.spinnerService.show();
  }

  // Hide spinner @2024/04/17 Add
  hideSpinner() {
    this.spinnerService.hide();
  }


// ↓ For Page Init, Destroy ↓

  constructor(

    private http: HttpClient,
    public commonService: CommonService,
    public spinnerService: SpinnerService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public languageService: LanguageService,
    private dialog: MatDialog,

    public  API_Log: apiForLogMgmt, // API_Log 用於日誌管理相關的 API 請求

    public  userLogsList_LocalFiles: localUserLogsList,  // userLogsList_LocalFiles 用於從 Local 文件獲取 User Logs 列表數據
    public    neLogsList_LocalFiles: localNELogsList,    //   neLogsList_LocalFiles 用於從 Local 文件獲取 NE Logs 列表數據
    public        neList_LocalFiles: localNEList,        //       neList_LocalFiles 用於從 Local 文件獲取 NE 列表數據

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
      'from': new FormControl( `${oneMonthAgoDate.getFullYear()}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}` ), 
      'to': new FormControl( `${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}` ),
      'UserLogType': new FormControl( 'All' ), // Only for User Logs
      'NELogType': new FormControl( 'All' ),   // Only for NE Logs
    });

    this.createSearchForm(); // 初始化並創建篩選 Logs 用的 FormGroup
    this.getNEList();        // 於頁面載入最初期時先取得網元列表 @2024/04/24 Add
  }

  /**
   * 當 Component 初始化完成後執行的 Lifecycle Hook。
   * 主要用於設定 Component 的初始狀態，包括預設的 Log 類型、sessionId、以及設定路由參數相關的應對處理。
   */
  ngOnInit(){

    console.log("此時 userLogsToDisplay:", this.userLogsToDisplay);
    console.log("此時 neLogsToDisplay:", this.neLogsToDisplay);

    // 設定預設的 Log 類型，用於 Component 初次載入時顯示相應的 Log Lists
    this.type = 'User_Logs';
    // this.type = 'NE_Logs';

    // 從 commonService 中獲取當前 Session 的 ID，確保在進行 API 請求前 Session ID 已準備就緒。
    // 選擇於 ngOnInit() 中獲取是由於它提供了一個合適的時機點，來確保所有相依的服務都已初始化完畢，
    // 且如 sessionId 的值依賴於異步(非同步)操作或 Component 的輸入屬性，這可確保這些操作於獲取 sessionId 前完成。
    // 這樣做也有助於測試和管理 Component 的生命週期。
    this.sessionId = this.commonService.getSessionId();

    // 建立一個 subscribe 來監聽來自路由參數的變化，並更新 searchForm 的值
    this.route.params.subscribe( ( params ) => {
      if ( params['UserLogType'] && params['UserLogType'] !== 'All' ) {
        this.searchForm.controls['UserLogType'].setValue( params['UserLogType'] );
      }
      if ( params['NELogType'] && params['NELogType'] !== 'All' ) {
        this.searchForm.controls['NELogType'].setValue( params['NELogType'] );
      }
    } );

    // 建立 searchForm 的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。
    this.afterSearchForm = _.cloneDeep( this.searchForm );

    // 根據 Component 的類型 ( User Logs 或 NE Logs )，載入相應的 Log 資訊
    if ( this.type === 'User_Logs' ) {

      this.getUserLogsInfo(); // 預設初始化時取得 User Logs 資訊

    } else {

      this.getNELogsInfo();   // 預設初始化時取得 NE Logs 資訊
    }

    //this.getNEList();
    this.createSearchForm(); // 初始化並創建篩選 Logs 用的 FormGroup
  }

  ngAfterViewInit() {
    this.createSearchForm(); // 初始化並創建篩選 Logs 用的 FormGroup
  }

  // 銷毀 Component 時的清理工作
  ngOnDestroy() {

    // 清除可能存在的定時器，以免造成內存洩漏或不必要的操作執行
    clearTimeout( this.refreshTimeout );

    // 如存在對 User Logs 的 API 請求訂閱，則取消訂閱以避免內存洩漏
    if ( this.queryLogList ) this.queryLogList.unsubscribe();
    
    // 如存在對 NE Logs 的 API 請求訂閱，同樣取消訂閱
    if ( this.queryUserNetconfLog ) this.queryUserNetconfLog.unsubscribe();

    // @2024/04/24 Add
    // 如存在對 NE List 的 API 請求訂閱，同樣取消訂閱
    if ( this.queryBsComponentList ) this.queryBsComponentList.unsubscribe();
  }

// ↑ For Page Init, Destroy ↑


// ↓ For Page Control ↓ 

  type: string = 'User_Logs';   // 預設選擇 "User Logs" @10/31 Add  
  //type: string = 'NE_Logs';   // 預設選擇 "NE Logs"   @11/01 Add 

  // @2024/03/14 Update
  // 用於點擊至對應的 Button 時，進行頁面的切換 
  changeType( e: MatButtonToggleChange ) {

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

    // 重製搜尋用表單 @2024/03/14 Add
    this.searchForm.reset();
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep( this.searchForm );

    // 根據當前選擇的 Log 類型載入數據
    if ( e.value === 'User_Logs' ) {

      this.type = 'User_Logs';
      this.getUserLogsInfo();       // 取得 User Logs 數據 ( Local 模式下會獲取未經篩選的 User Logs )

    } else if ( e.value === 'NE_Logs' ) {

      this.type = 'NE_Logs';
      this.getNELogsInfo();    // 取得 NE Logs 數據 ( Local 模式下會獲取未經篩選的 NE Logs )
      //this.getNEList();        // 取得 NE List 數據，並將 NE 的 name 和 id 製成對應表 
    }

    // 更新當前類型，以便知道哪個 Log 類型被選中
    // Set the log type to display after tab switch
    this.type = e.value;
    console.log( '頁面切換後，顯示的 Log 類型:', this.type+
                  '\nLog type displayed after tab switch:', this.type );
  }

  // For page number
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalLogs: number = 0;    // 用於計算每次刷新的總 Log 筆數
  nullList: string[] = [];  // 給頁籤套件使用

  // @2024/03/13 Update
  // 用於點擊對應之頁數 Button 時進行頁面切換
  pageChanged( page: number ) {
    this.p = page;
    console.log( "Current log type:", this.type+", Page:", this.p );

    // @2024/03/13 Add
    // 如非 Local 模式，切換每頁時才呼叫 API 取得 log 資訊 
    if ( !this.commonService.isLocal ) {

      if ( this.type === 'User_Logs' ) {      // 如為 User Logs 頁面

        this.getUserLogsInfo();

      } else if ( this.type === 'NE_Logs' ) { // 如為 NE Logs 頁面
        
        this.getNELogsInfo();
      }
    }
  }

  // @2024/03/13 Update
  // 該函數接受一個 log 矩陣和單數形式的 log 名稱，根據矩陣長度返回單數或複數形式的文本。
  getTotalLogsText( logType: 'user' | 'ne' ): string {
    
    let totalLogsNum: number;
    let logText: string;
  
    if ( logType === 'user' ) {

      totalLogsNum = this.totalLogs;
      logText = totalLogsNum === 1 ? 
                  this.languageService.i18n['UserLog.single'] :
                   this.languageService.i18n['UserLog.total'];
    } else {

      totalLogsNum = this.totalLogs;
      logText = totalLogsNum === 1 ?
                  this.languageService.i18n['NElog.single'] :
                   this.languageService.i18n['NElog.total'];
    }
  
    return `${ this.languageService.i18n['Log.total'] } ${ totalLogsNum } ${ logText }`;
  }
  
// ↑ For Page Control ↑ 
  

// ↓ For Create FormGroup ↓

  searchForm!: FormGroup;      // 用於儲存篩選條件
  afterSearchForm!: FormGroup; // 用於儲存並顯示出篩選條件

  // 在類別內新增一個屬性，用於控制 UserID 欄位是否被禁用
  isUserIdDisabled: boolean = false; // @2024/04/24 Add

  // 建立搜尋表單 @2024/04/24 Updated
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

    
    // 從 CommonService 中獲取當前登錄的使用者 ID
    const currentUserId = this.commonService.getUserId();

    // 暫時關閉方便外包調整 @2024/04/25
    //this.searchForm.get('UserID')?.setValue( currentUserId ); // 自動設定 UserID
    //this.searchForm.get('UserID')?.disable(); // 禁用 UserID 欄位

    // 判斷使用者 ID 是否為 'admin'
    if ( currentUserId !== 'admin' ) {
      this.isUserIdDisabled = true;
      this.searchForm.get('UserID')?.setValue( currentUserId ); // 自動設定 UserID
      this.searchForm.get('UserID')?.disable(); // 禁用 UserID 欄位
    } else {
      this.isUserIdDisabled = false;

      // 暫時關閉方便外包調整 @2024/04/25
      this.searchForm.get('UserID')?.enable(); // 確保 UserID 欄位是啟用的
    }
  }

// ↑ For Create FormGroup ↑ 

// ↓ For Get Log Info ↓

  /* queryLogList 是用來保存對 HTTP 的訂閱請求引用。
     使用 '!' 後綴符號來告訴 TypeScript 此屬性將會被賦值，並且須確保在使用前其不會是 null 或 undefined。
     於各 Component 的生命週期中管理該訂閱，特別於銷毀 Component 時取消訂閱，以避免內存洩漏。 */
  queryLogList!: Subscription;
  
  // Get User Logs @2024/03/14 Update
  UserLogsList: UserLogsList = {} as UserLogsList; 
  UserLogs_getNum = 0;              // 用於記錄取得 User Logs 資訊之次數
  isGetUserLogsInfoLoading = false; // 用於表示加載 User Logs 的 flag，初始設置為 false @2024/03/10 Add for Progress Spinner
  
  // @2024/04/24 Update
  getUserLogsInfo() {
    console.log( 'getUserLogsInfo() - Start' );

    this.UserLogs_getNum++;
    console.log( 'UserLogs_getNum:', this.UserLogs_getNum );

    // @2024/03/11 Add
    // 每次呼叫都重置 UserLogsList
    //this.initUserLogsList();

    clearTimeout( this.refreshTimeout );

    this.isGetUserLogsInfoLoading = true; // 設置加載旗標為 true，表示開始加載
    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {
      // Local Test

      this.UserLogsList = this.userLogsList_LocalFiles.userLogsList_local;
      console.log( 'UserLogsList:', this.UserLogsList );

      this.totalLogs = this.UserLogsList.logNumber;
      //this.UserloginfoDeal();

      // @2024/04/05 Add
      // 處理 Local 模式下的 logtime 格式
      this.UserLogsList.loginfo.forEach( log => {
        log.logtime = this.commonService.formatTimeWithoutSecondsFraction( log.logtime );
      } );

      console.log( "In getUserLogsInfo() not click search ( Local mode ) - userLogsToDisplay:", this.userLogsToDisplay );

      // 設置加載旗標為 false，表示加載完成
      this.isGetUserLogsInfoLoading = false;
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

        // 取消之前的 API 訂閱
        if ( this.queryLogList ) this.queryLogList.unsubscribe();

        // 改只保留傳入日期的部分 @2024/03/10 Add
        const formattedDate = this.commonService.dealPostDate(this.searchForm.controls['from'].value);
        const start = formattedDate.split(' ')[0]; // 獲取日期部分,例如 '2024-03-10'
        
        const formattedEnd = this.commonService.dealPostDate(this.searchForm.controls['to'].value);  
        const end = formattedEnd.split(' ')[0];    // 獲取日期部分,例如 '2024-03-10'

        // @2024/03/11 Update
        // 從 searchForm 中獲取篩選條件
        const params: UserLogsParams = {
          //userid: this.searchForm.get('UserID')?.value || '',   // 取得 userid，如不存在設為空字串
          start,                                                  // 取得開始日期 - 目前後端無法篩選時分秒
          end,                                                    // 取得結束日期 - 目前後端無法篩選時分秒
          //keyword: this.searchForm.get('keyword')?.value || '', // 取得想搜尋的關鍵字
          offset: (this.p - 1) * this.pageSize,                   // 計算分頁的 offset
          limit: 10                                               // 設定每頁顯示的 Logs 數量限制
        };

        // @2024/04/24 Add
        // 從 CommonService 中獲取當前登錄的使用者 ID
        const currentUserId = this.commonService.getUserId();

        // @2024/04/24 Add
        if ( currentUserId !== 'admin' ) {
          // 確保使用者 ID 參數總是被設置為當前登錄的使用者 ID
          params.userid = currentUserId;
        } else {
          // 如果有在表單中輸入 UserID，則使用該值
          const formUserId = this.searchForm.get('UserID')?.value;
          if ( formUserId ) {
            params.userid = formUserId;
          }
        }

        // 獲取 userid 的控制元件
        // const userIdControl = this.searchForm.get('UserID');

        // // 判斷 keyword 控制元件是否存在且有值
        // if ( userIdControl && userIdControl.value !== '' ) {
        //   params.userid = userIdControl.value;
        // }

        // 獲取 UserLogType 的控制元件
        const userLogTypeControl = this.searchForm.get('UserLogType');

        // 判斷 UserLogType 控制元件是否存在且有值
        if ( userLogTypeControl && userLogTypeControl.value !== 'All' ) {
          params.logtype = userLogTypeControl.value;
        }

        // 獲取 keyword 的控制元件
        const keyWordControl = this.searchForm.get('keyword');

        // 判斷 keyword 控制元件是否存在且有值
        if ( keyWordControl && keyWordControl.value !== '' ) {
          params.keyword = keyWordControl.value;
        }

        // @2024/03/14 Update
        // 使用 API_Log 中的 queryLogList() 發起 HTTP GET 請求
        this.queryLogList = this.API_Log.queryLogList( params ).subscribe({
          next: ( res ) => {    // 成功的 callback

            if ( !this.isSearch_userLogs ) {
              // 如非點擊 Search 過
              console.log( 'In getUserLogsInfo() not click search - res:', res );    
  
              this.UserLogsList = res; // 賦值響應至 UserLogsList
              console.log( 'In getUserLogsInfo() not click search - UserLogsList:', this.UserLogsList );
  
              this.totalLogs = this.UserLogsList.logNumber;
              console.log( 'In getUserLogsInfo() not click search - Total User Logs Num:', this.totalLogs );
  
              // @2024/04/05 Add
              // 處理非 Local 模式下的 logtime 格式
              this.UserLogsList.loginfo.forEach( log => {
                log.logtime = this.commonService.formatTimeWithoutSecondsFraction( log.logtime );
              });

              console.log( "In getUserLogsInfo() not click search - userLogsToDisplay:", this.userLogsToDisplay );
  
            } else {
              // 如點擊 Search 過
              console.log( 'In getUserLogsInfo() click search - res:', res );  
  
              // 傳回的數據 res 已是篩選過的，故直接放入 filtered_UserLogs
              this.filtered_UserLogs = res.loginfo;
              this.totalLogs = res.logNumber;     // 更新記錄的 Log 總數     
              
              // @2024/04/05 Add
              // 處理非 Local 模式下的 logtime 格式 (篩選後的結果)
              this.filtered_UserLogs.forEach( log => {
                log.logtime = this.commonService.formatTimeWithoutSecondsFraction( log.logtime );
              });

              console.log( "In getUserLogsInfo() click search - userLogsToDisplay:", this.userLogsToDisplay );
            }
            // this.UserloginfoDeal();       // 調用處理 User Log 訊息的函數

            // 設置加載旗標為 false，表示加載完成
            this.isGetUserLogsInfoLoading = false;
            //this.hideSpinner();  // 完成後隱藏 spinner
          },
          error: ( error ) => {  // 錯誤的 callback
            console.error( 'Error fetching user logs:', error ); // 顯示錯誤訊息

            // 設置加載旗標為 false，表示加載出錯
            this.isGetUserLogsInfoLoading = false;
            this.hideSpinner();  // 完成後隱藏 spinner
          },
          complete: () => {    // 完成的 callback
            console.log( 'User logs fetch completed' );   // 顯示完成訊息
            this.hideSpinner();  // 完成後隱藏 spinner
          }
        });
        console.log( "SafeSubscriber of queryLogList:", this.queryLogList );
      }

    console.log( "getUserLogsInfo() - End" );
  }

  // 關閉第一頁刷新機制 @2024/03/11 Update
  UserloginfoDeal() {
    // this.p = 1;
    this.totalLogs = this.UserLogsList.logNumber;
    this.nullList = new Array(this.totalLogs);
    // this.refreshTimeout = window.setTimeout(() => {
    //   if (this.p === 1) {
    //     console.log(`page[${this.p}] ===> refresh.`);
    //     this.getUserLogsInfo();

    //   } else {
    //     console.log(`page[${this.p}] ===> no refresh.`);
    //   }
    // }, 1000); // timeout: 100 ms
  }

  // @2024/03/11 Add
  // 初始化 UserLogsList 用 
  initUserLogsList() {
    this.UserLogsList = {
      logNumber: 0, 
      loginfo: []
    } as UserLogsList;
  }


  // queryUserNetconfLog 同樣用於管理 HTTP 的訂閱請求，'!' 確保在使用前已賦值。
  queryUserNetconfLog!: Subscription;

  // Get NE Logs @2024/04/24 Update
  NELogsList: NELogsList = {} as NELogsList;
  NELogs_getNum = 0; // 用於記錄取得 NE Logs 資訊之次數
  isGetNELogsInfoLoading = false; // 用於表示加載 NE Logs 的 flag，初始設置為 false @2024/03/10 Add for Progress Spinner
  
  // Get NE Logs @2024/04/24 Update
  getNELogsInfo() {
    console.log( 'getNELogsInfo() - Start' );
    
    this.NELogs_getNum++;
    console.log( 'NELogs_getNum:', this.NELogs_getNum );

    // 清除之前設置的定時器以避免重複執行
    clearTimeout( this.refreshTimeout );

    this.isGetNELogsInfoLoading = true; // 設置加載旗標為 true，表示開始加載
    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {
      // Local Test

      this.NELogsList = this.neLogsList_LocalFiles.neLogsList_local;
      console.log( 'NELogsList:', this.NELogsList );

      this.totalLogs = this.NELogsList.logNumber;
      //this.NEloginfoDeal();

      // @2024/04/05 Add
      // 處理 Local 模式下的 logtime 格式
      this.NELogsList.loginfo.forEach(log => {
        log.logtime = this.commonService.formatTimeWithoutSecondsFraction(log.logtime);
      });

      console.log( "In getNELogsInfo() not click search ( Local mode ) - neLogsToDisplay:", this.neLogsToDisplay );

      // 設置加載旗標為 false，表示加載完成
      this.isGetNELogsInfoLoading = false;

      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      // 取消之前的任何 API 訂閱
      if ( this.queryUserNetconfLog ) this.queryUserNetconfLog.unsubscribe();

      // 改只保留傳入日期的部分 @2024/03/10 Add
      const formattedDate = this.commonService.dealPostDate( this.searchForm.controls['from'].value );
      const start = formattedDate.split(' ')[0]; // 獲取日期部分,例如 '2024-03-10'
      
      const formattedEnd = this.commonService.dealPostDate( this.searchForm.controls['to'].value );  
      const end = formattedEnd.split(' ')[0];    // 獲取日期部分,例如 '2024-03-10'

      // @2024/03/11 Update
      // 從 searchForm 中獲取篩選條件
      const params: NELogsParams = {
        //userid: this.searchForm.get('UserID')?.value || '',     // 取得 userid，如不存在設為空字串
        //compid: this.searchForm.get('neName')?.value || '',     // 取得 compid，如不存在設為空字串
        start,                                                    // 取得開始日期 - 目前後端無法篩選時分秒
        end,                                                      // 取得結束日期 - 目前後端無法篩選時分秒
        //keyword: this.searchForm.get('keyword')?.value || '',   // 取得想搜尋的關鍵字
              
        offset: ( this.p - 1 ) * this.pageSize,                     // 計算分頁的 offset
        limit: 10                                                 // 設定每頁顯示的 Logs 數量限制
      };

      // 獲取 userid 的控制元件
      // const userIdControl = this.searchForm.get( 'UserID' );

      // // 判斷 keyword 控制元件是否存在且有值
      // if ( userIdControl && userIdControl.value !== '' ) {
      //   params.userid = userIdControl.value;
      // }

      // @2024/04/24 Add
      // 從 CommonService 中獲取當前登錄的使用者 ID
      const currentUserId = this.commonService.getUserId();

      // @2024/04/24 Add
      if ( currentUserId !== 'admin' ) {
        // 確保使用者 ID 參數總是被設置為當前登錄的使用者 ID
        params.userid = currentUserId;
      } else {
        // 如果有在表單中輸入 UserID，則使用該值
        const formUserId = this.searchForm.get('UserID')?.value;
        if ( formUserId ) {
          params.userid = formUserId;
        }
      }

      // @2024/03/14 Add
      // 獲取 neName 的控制元件
      const neNameControl = this.searchForm.get( 'neName' );

      // @2024/03/14 Add
      // 判斷 neName 控制元件是否存在且有值
      if ( neNameControl && neNameControl.value !== '' ) {
        // 從 neidNamePairs 中查找與輸入的網元名稱相對應的 id
        const matchedPair = this.neidNamePairs.find( pair => pair.name === neNameControl.value );
        if ( matchedPair ) {
          params.compid = matchedPair.id;
        } else {
          console.warn( `No matching id found for the entered NE name: ${ neNameControl.value }` );
        }
      }

      // 獲取 NELogType 的控制元件
      const neLogTypeControl = this.searchForm.get( 'NELogType' );

      // 判斷 NELogType 控制元件是否存在且有值
      if ( neLogTypeControl && neLogTypeControl.value !== 'All' ) {
        params.operation = neLogTypeControl.value;
      }

      // 獲取 keyword 的控制元件
      const keyWordControl = this.searchForm.get( 'keyword' );

      // 判斷 keyword 控制元件是否存在且有值
      if ( keyWordControl && keyWordControl.value !== '' ) {
        params.keyword = keyWordControl.value;
      }

      // @2024/03/14 Update
      // 使用 API_Log 中的 queryUserNetconfLog() 發起 HTTP GET 請求 
      this.queryUserNetconfLog = this.API_Log.queryUserNetconfLog( params ).subscribe( {
        next: ( res ) => { // 成功的 callback

          if ( !this.isSearch_neLogs ) {
            // 如非點擊 Search 過
            console.log( 'In getNELogsInfo() not click search - res:', res );    

            this.NELogsList = res; // 賦值響應至 NELogsList
            console.log( 'In getNELogsInfo() not click search - NELogsList:', this.NELogsList );

            this.totalLogs = this.NELogsList.logNumber;
            console.log( 'In getNELogsInfo() not click search - Total NE Logs Num:', this.totalLogs );

            // @2024/04/05 Add
            // 處理非 Local 模式下的 logtime 格式
            this.NELogsList.loginfo.forEach(log => {
              log.logtime = this.commonService.formatTimeWithoutSecondsFraction(log.logtime);
            });

            console.log( "In getNELogsInfo() not click search - neLogsToDisplay:", this.neLogsToDisplay );

          } else {
            // 如點擊 Search 過
            console.log( 'In getNELogsInfo() click search - res:', res );  

            // 傳回的數據 res 已是篩選過的，故直接放入 filtered_NELogs
            this.filtered_NELogs = res.loginfo;
            this.totalLogs = res.logNumber;     // 更新記錄的 Log 總數     

            // @2024/04/05 Add
            // 處理非 Local 模式下的 logtime 格式 (篩選後的結果)
            this.filtered_NELogs.forEach(log => {
              log.logtime = this.commonService.formatTimeWithoutSecondsFraction(log.logtime);
            });

            console.log( "In getNELogsInfo() click search - neLogsToDisplay:", this.neLogsToDisplay );
          }
          // this.NEloginfoDeal();       // 調用處理 NE Log 訊息的函數

          // 設置加載旗標為 false，表示加載完成
          this.isGetNELogsInfoLoading = false;
          //this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {   // 錯誤的 callback
          console.error( 'Error fetching NE logs:', error ); // 顯示錯誤訊息

          // 設置加載旗標為 false，表示加載出錯
          this.isGetNELogsInfoLoading = false;
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        complete: () => {     // 完成的 callback
          console.log( 'NE logs fetch completed' ); // 顯示完成訊息
          this.hideSpinner();  // 完成後隱藏 spinner

          // @2024/04/24 Add
          //this.getNEList();    // 取得 NE List 數據，並將 NE 的 name 和 id 製成對應表
        }
      });

      console.log( "SafeSubscriber of queryUserNetconfLog:", this.queryUserNetconfLog );
    }

    console.log( "getNELogsInfo() - End" );
  }

  // 關閉第一頁刷新機制 @2024/03/11
  NEloginfoDeal() {
    // this.p = 1;
    this.totalLogs = this.NELogsList.logNumber;
    this.nullList = new Array( this.totalLogs );
    // this.refreshTimeout = window.setTimeout(() => {
    //   if (this.p === 1) {
        
    //     console.log(`page[${this.p}] ===> refresh.`);
    //     this.getNELogsInfo();

    //   } else {
    //     console.log(`page[${this.p}] ===> no refresh.`);
    //   }
    // }, 1000); // timeout 100ms
  }

  // @2024/03/12 Add
  // 初始化 NELogsList 用 
  initNELogsList() {
    this.NELogsList = {
      logNumber: 0, 
      loginfo: []
    } as NELogsList;
  }

  // @2024/04/24 Add
  // queryBsComponentList 同樣用於管理 HTTP 的訂閱請求，'!' 確保在使用前已賦值。
  queryBsComponentList!: Subscription;

  // @2024/03/14 Add
  // 定義 NEList 物件，並使用類型斷言將其初始化為空物件
  NEList: NEList = {} as NEList;

  // 定義 neidNamePairs 陣列，用於儲存網元 id 與 name 的對應關係
  neidNamePairs: NEidNamePair[] = []; // 存儲 id 和 name 的對應關係

  // @2024/04/24 Update
  // 用於取得 NE 列表資訊的函數
  getNEList() {
    console.log( 'getNEList() - Start' ); // 輸出開始取得 NE 列表的日誌

    // @2024/04/24 Add
    // 清除之前設置的定時器以避免重複執行
    clearTimeout( this.refreshTimeout );

    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {

      // 如果是本地模式
      // 從本地文件中獲取 NE 列表
      this.NEList = this.neList_LocalFiles.neList_local;

      // 處理獲取的 NE 列表,將 id 和 name 存儲到 neidNamePairs 中
      this.processNEList( this.NEList );

      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      // @2024/04/24 Add
      // 取消之前的任何 API 訂閱
      if ( this.queryBsComponentList ) this.queryBsComponentList.unsubscribe();

      // 如果非本地模式
      // 從後端 API 獲取 NE 列表
      this.queryBsComponentList = this.API_Log.queryBsComponentList().subscribe({
        next: ( res ) => {

          // 成功獲取 NE 列表
          this.NEList = res; // 將獲取到的 NE 列表賦值給 NEList 屬性
          this.processNEList( this.NEList ); // 處理獲取的 NE 列表

          //this.hideSpinner();  // 完成後隱藏 spinner

        },
        error: ( error ) => {

          // 獲取 NE 列表出錯
          console.error( 'Error fetching NE list:', error ); // 輸出錯誤日誌

          this.hideSpinner();  // 完成後隱藏 spinner
        },
        complete: () => {

          // 獲取 NE 列表完成
          console.log( 'NE list fetch completed' ); // 輸出完成日誌
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }

    console.log( 'getNEList() - End' ); // 輸出結束取得 NE 列表的日誌
  }

  // @2024/03/14 Add
  // 私有函數,用於處理獲取的 NE 列表,將每個網元的 id 與 name 存儲到 neidNamePairs 中
  private processNEList( neList: NEList ) {

    // 清空之前儲存的對應關係
    this.neidNamePairs = [];

    // 遍歷 NE 列表中的每個網元
    neList.components.forEach( ( ne ) => {
      // 從每個網元中獲取 id 和 name,並將它們作為 IdNamePair 對象添加到 neidNamePairs 中
      this.neidNamePairs.push( { id: ne.id, name: ne.name } );
    } );

    // 輸出處理後的 neidNamePairs 數組
    console.log( 'neidNamePairs:', this.neidNamePairs );
  }
  
// ↑ For Get Log Info ↑


// ↓ For control display "View Page" ↓ 

  // 用於儲存選擇的 User Log 的詳細訊息 @11/06 Add
  userLogdetail: UserLogDetail = {} as UserLogDetail;

  /* 用於查找名為'userlogDetail'的 Component <ng-template>，
     用於定義 User Log 詳細訊息的彈出視窗內容。 @11/03 Add  */
  @ViewChild( 'userlogDetail' ) userlogDetail: any;    
  UserlogDetailRef!: MatDialogRef< any >;   // 用於記錄 User Log 詳細資訊的對照視窗，以便在需要時操作和控制 User Log 詳細資訊的彈出視窗。 @11/06 Add 

  // Add by yuchen @11/06
  // 當使用者點擊 User Logs 的 "View" 時
  openUserlogDetail( UserLogsinfo: UserLogsInfo ) {

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
    this.UserlogDetailRef = this.dialog.open( this.userlogDetail, {
      id: 'userlogDetail',
      panelClass: 'custom-scroll' // 添加自定義滾動條類別
    } );

    // 監聽視窗關閉事件
    this.UserlogDetailRef.afterClosed().subscribe( () => {

    } );
  }

  // 用於儲存選擇的 NE Log 的詳細訊息 @11/06 Add
  neLogdetail: NELogDetail = {} as NELogDetail;       

  /* 用於查找名為'nelogDetail'的 Component  (ng-template)，
     通常用於定義 NE Log 訊息的彈出視窗內容。 @11/03 Add   */
  @ViewChild('nelogDetail') nelogDetail: any;
  NElogDetailRef!: MatDialogRef<any>;  // 用於記錄 NE Log 詳細資訊的對照視窗，以便在需要時操作和控制 NE Log 詳細資訊的彈出視窗。     @11/06 Add 

  // Add by yuchen @11/06
  // 當使用者點擊 NE Logs 的 "View" 時
  openNElogDetail( NELogsinfo: NELogsInfo ) {

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

    // 打開 NE Log 詳細資訊的視窗時
    this.NElogDetailRef = this.dialog.open( this.nelogDetail, {
      id: 'nelogDetail',
      panelClass: 'custom-scroll' // 添加自定義滾動條類別
    } );

    // 監聽視窗關閉事件
    this.NElogDetailRef.afterClosed().subscribe( () => {

    } );
  }

// ↑ For control display "View Page" ↑


// ↓ For click "Search" ↓

  // @2024/04/24 Add
  // 用於根據用戶身份調整參數並進行搜尋的通用 Log 搜尋函數
  private searchLogs( params: UserLogsParams | NELogsParams, isUserLog: boolean ) {

    const currentUserId = this.commonService.getUserId();

    if ( currentUserId !== 'admin' ) {
      // 對於非 admin 用戶，總是使用當前用戶的 ID 進行搜索
      params.userid = currentUserId;
    } else {
      // 對於 admin 用戶，檢查表單中是否填寫了 UserID
      const formUserId = this.searchForm.get('UserID')?.value;
      if ( formUserId ) {
        params.userid = formUserId;
      } else {
        delete params.userid; // 如果沒有填寫，則不應包括 userid 參數
      }
    }

    // 根據是 User Logs 還是 NE Logs，調用相應的 API
    const apiCall = isUserLog ? this.API_Log.queryLogList( params ) : this.API_Log.queryUserNetconfLog( params );
    apiCall.subscribe({
      next: ( res ) => {    // 成功的 callback

        if( isUserLog ){

          console.log( 'In search_UserLogs() - res:', res );
          
          // 傳回的數據 res 已是篩選過的，故直接放入 filtered_UserLogs
          this.filtered_UserLogs = res.loginfo;
          this.totalLogs = res.logNumber;       // 更新記錄的 Log 總數

          // 處理非 Local 模式下的 logtime 格式 (篩選後的結果)
          this.filtered_UserLogs.forEach(log => {
            log.logtime = this.commonService.formatTimeWithoutSecondsFraction(log.logtime);
          });

          this.isSearch_userLogs = true;        // Search 完畢，設置標記為 true，以便 userLogsToDisplay 切換成顯示 filtered_UserLogs
          console.log( "In search_UserLogs() - userLogsToDisplay:", this.userLogsToDisplay );

        } else {

          console.log( 'In search_NELogs() - res:', res );

          // 傳回的數據 res 已是篩選過的，故直接放入 filtered_NELogs
          this.filtered_NELogs = res.loginfo;
          this.totalLogs = res.logNumber;     // 更新記錄的 Log 總數

          // @2024/04/05 Add
          // 處理非 Local 模式下的 logtime 格式 (篩選後的結果)
          this.filtered_NELogs.forEach( log => {
            log.logtime = this.commonService.formatTimeWithoutSecondsFraction( log.logtime );
          });

          this.isSearch_neLogs = true;        // Search 完畢，設置標記為 true，以便 neLogsToDisplay 切換成顯示 filtered_NELogs
          console.log( "In search_NELogs() - neLogsToDisplay:", this.neLogsToDisplay );
        }
        
      },
      error: ( error ) => {  // 錯誤的 callback

        if( isUserLog ){
          console.error( 'Error searching user logs:', error ); // 顯示錯誤訊息

          // 設置加載旗標為 false，表示加載出錯
          this.isGetUserLogsInfoLoading = false;

        } else {
          console.error( 'Error searching NE logs:', error ); // 顯示錯誤訊息

          // 設置加載旗標為 false，表示加載出錯
          this.isGetNELogsInfoLoading = false;
        }
        this.hideSpinner();  // 失敗後隱藏 spinner

      },
      complete: () => {  // 完成的 callback

        if( isUserLog ){
          console.log( 'User logs searching completed' ); // 顯示完成訊息

          // 設置加載旗標為 false，表示加載完成
          this.isGetUserLogsInfoLoading = false;
        } else {
          console.log( 'NE logs searching completed' );   // 顯示完成訊息

          // 設置加載旗標為 false，表示加載完成
          this.isGetNELogsInfoLoading = false;
        }
        this.hideSpinner();  // 完成後隱藏 spinner
      }
    });
  }

  // For search User Logs @2024/04/24 Update
  filtered_UserLogs: UserLogsInfo[] = [];
  isSearch_userLogs: boolean = false;
  search_UserLogs() {
    console.log( 'search_UserLogs() - Start' );

    // UserLogsList 是否已加載 @12/04 Add
    if ( !this.UserLogsList || !this.UserLogsList.loginfo ) {
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

    this.afterSearchForm = _.cloneDeep( this.searchForm ); // @12/01 Add by yuchen

    this.isGetUserLogsInfoLoading = true; // 設置加載旗標為 true，表示開始加載
    this.showProcessingSpinner();   // 顯示 Loading Spinner

    // 如是在 Local 環境測試
    if ( this.commonService.isLocal ) {

      this.filtered_UserLogs = this.UserLogsList.loginfo.filter( log => {

          const isUserIdMatch = !userid || log.userid.includes( userid ); // 獲取 userid ，如不存在設為空字串  @11/20 Add by yuchen
          const logDate = new Date( log.logtime );
          const isAfterFrom = logDate >= new Date( formattedFrom );
          const isBeforeTo = logDate <= new Date( formattedTo );
          const isTypeMatch = userLogType === 'All' || log.logtype === userLogType;

          // 新增關鍵字篩選判斷  @11/13 Add by yuchen
          // 確認 log 中的請求資料或回應資料是否包含關鍵字，透過將字串轉換為小寫來實現不區分大小寫的比對  
          const isKeywordMatch = !keyword || log.logmsg.toLowerCase().includes( keyword.toLowerCase() );

          // @11/20 Add isUserIdMatch
          return isUserIdMatch && isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch;
      });

      this.isSearch_userLogs = true;  // Local Search 完畢，設置標記為 true

      this.totalLogs = this.filtered_UserLogs.length; // 確保更新 totalLogs 以反映搜尋結果的數量

      // @2024/04/05 Add
      // 處理 Local 模式下的 logtime 格式
      this.filtered_UserLogs.forEach( log => {
        log.logtime = this.commonService.formatTimeWithoutSecondsFraction( log.logtime );
      });

      console.log( "In search_UserLogs() in Local mode - userLogsToDisplay:", this.userLogsToDisplay );

      // 設置加載旗標為 false，表示加載完成
      this.isGetUserLogsInfoLoading = false;
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {  // 如非在 Local 環境測試

      // 只保留傳入日期的部分
      const formattedDate = this.commonService.dealPostDate( this.searchForm.controls['from'].value );
      const start = formattedDate.split(' ')[0]; // 獲取日期部分,例如 '2024-03-10'
      
      const formattedEnd = this.commonService.dealPostDate( this.searchForm.controls['to'].value );  
      const end = formattedEnd.split(' ')[0];    // 獲取日期部分,例如 '2024-03-10'

      // 從 searchForm 中獲取篩選條件
      const params: UserLogsParams = {
        //userid: this.searchForm.get('UserID')?.value || '',   // 取得 userid，如不存在設為空字串
        start,                                                  // 取得開始日期 - 目前後端無法篩選時分秒
        end,                                                    // 取得結束日期 - 目前後端無法篩選時分秒
        //keyword: this.searchForm.get('keyword')?.value || '', // 取得想搜尋的關鍵字

        offset: ( this.p - 1 ) * this.pageSize,                 // 計算分頁的 offset
        limit: 10                                               // 設定每頁顯示的 Logs 數量限制
      };

      // 獲取 userid 的控制元件
      // const userIdControl = this.searchForm.get('UserID');

      // // 判斷 keyword 控制元件是否存在且有值
      // if ( userIdControl && userIdControl.value !== '' ) {
      //   params.userid = userIdControl.value;
      // }

      // 獲取 UserLogType 的控制元件
      const userLogTypeControl = this.searchForm.get('UserLogType');

      // 判斷 UserLogType 控制元件是否存在且有值
      if ( userLogTypeControl && userLogTypeControl.value !== 'All' ) {
        params.logtype = userLogTypeControl.value;
      }

      // 獲取 keyword 的控制元件
      const keyWordControl = this.searchForm.get('keyword');

      // 判斷 keyword 控制元件是否存在且有值
      if ( keyWordControl && keyWordControl.value !== '' ) {
        params.keyword = keyWordControl.value;
      }

      // @2024/04/24 Add
      // 調用通用搜索函數，傳入參數和標識這是 User Logs 的搜索
      this.searchLogs( params, true );

      // 使用 API_Log 中的 queryLogList() 發起 HTTP GET 請求
      // this.API_Log.queryLogList( params ).subscribe({
      //   next: ( res ) => {    // 成功的 callback
  
      //     console.log( 'In search_UserLogs() - res:', res );
          
      //     // 傳回的數據 res 已是篩選過的，故直接放入 filtered_UserLogs
      //     this.filtered_UserLogs = res.loginfo;
      //     this.totalLogs = res.logNumber;       // 更新記錄的 Log 總數

      //     // @2024/04/05 Add
      //     // 處理非 Local 模式下的 logtime 格式 (篩選後的結果)
      //     this.filtered_UserLogs.forEach(log => {
      //       log.logtime = this.commonService.formatTimeWithoutSecondsFraction(log.logtime);
      //     });

      //     this.isSearch_userLogs = true;        // Search 完畢，設置標記為 true，以便 userLogsToDisplay 切換成顯示 filtered_UserLogs
      //     console.log( "In search_UserLogs() - userLogsToDisplay:", this.userLogsToDisplay );

      //     // this.UserloginfoDeal();   // 調用處理 User Log 訊息的函數

      //     // 設置加載旗標為 false，表示加載完成
      //     this.isGetUserLogsInfoLoading = false;
      //     this.hideSpinner();  // 完成後隱藏 spinner
      //   },
      //   error: ( error ) => {  // 錯誤的 callback
      //     console.error( 'Error searching user logs:', error ); // 顯示錯誤訊息

      //     // 設置加載旗標為 false，表示加載出錯
      //     this.isGetUserLogsInfoLoading = false;
      //     this.hideSpinner();  // 完成後隱藏 spinner
      //   }
      // });

    }

    // 檢查搜尋表單的值
    console.log( 'Search criteria for User Logs:', this.afterSearchForm.value );

    console.log( "search_UserLogs() - End" );
  }

  // 重置 User Logs 搜尋 @2024/03/13 Update
  clear_search_UserLogs() {

    this.isSearch_userLogs = false;

    this.searchForm.reset();
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep( this.searchForm );
    
    this.p = 1; // 當點擊重置搜尋時，將顯示頁數預設為 1

    this.getUserLogsInfo();
    
  }  

  // For search NE Logs @2024/04/24 Update
  filtered_NELogs: NELogsInfo[] = [];
  isSearch_neLogs: boolean = false;
  search_NELogs() {
    console.log( 'search_NELogs() - Start' );

    // NELogsList 是否已加載 @12/04 Add
    if ( !this.NELogsList || !this.NELogsList.loginfo ) {
      console.error( 'NELogsList.loginfo is not loaded yet.' );
      return;
    }

    // 更新顯示的搜尋條件 @12/04 Add
    this.afterSearchForm = this.searchForm.value;

    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1

    const userid = this.searchForm.get('UserID')?.value || '';   // 獲取 userid ，如不存在設為空字串  @11/20 Add by yuchen
    const comp_name = this.searchForm.get('neName')?.value || '';   // 獲取 nEname，如不存在設為空字串 @11/22 Add by yuchen
    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;
    const neLogType = this.searchForm.get('NELogType')?.value;
    const keyword = this.searchForm.get('keyword')?.value || ''; // 新增關鍵字篩選

    // 格式化日期為所需的格式
    const formattedFrom = this.commonService.dealPostDate( from );
    const formattedTo = this.commonService.dealPostDate( to );

    // 清除以前的搜尋結果
    this.filtered_NELogs = [];
    this.isSearch_neLogs = false;

    this.afterSearchForm = _.cloneDeep( this.searchForm ); // @12/04 Add by yuchen

    this.isGetNELogsInfoLoading = true; // 設置加載旗標為 true，表示開始加載
    this.showProcessingSpinner();   // 顯示 Loading Spinner

    // 如果是在 Local 環境測試
    if ( this.commonService.isLocal ) {

      this.filtered_NELogs = this.NELogsList.loginfo.filter(log => {
        
          const isUserIdMatch = !userid || log.userid.includes( userid );          // 新增 userid 篩選判斷  @11/20 Add by yuchen  
          const isnEnameMatch = !comp_name || log.comp_name.includes( comp_name ); // 新增 nEname 篩選判斷  @11/22 Add by yuchen       
          const logDate = new Date( log.logtime );
          const isAfterFrom = logDate >= new Date( formattedFrom );
          const isBeforeTo = logDate <= new Date( formattedTo );
          const isTypeMatch = neLogType === 'All' || log.operation === neLogType;

          // 確認 log 中的請求資料或回應資料是否包含關鍵字
          // 透過將字串轉換為小寫來實現不區分大小寫的比對  
          const isKeywordMatch = !keyword || 
                        log.req_data.toLowerCase().includes( keyword.toLowerCase() ) || 
                        log.resp_data.toLowerCase().includes( keyword.toLowerCase() );

          // @11/20 Add isUserIdMatch | @11/22 Add isnEnameMatch
          return isUserIdMatch && isnEnameMatch && isAfterFrom && isBeforeTo && isTypeMatch && isKeywordMatch; 
      });
      this.isSearch_neLogs = true;  // 本地 Search 完畢，設置標記為 true

      this.totalLogs = this.filtered_NELogs.length; // 確保更新 totalLogs 以反映搜尋結果的數量

      // @2024/04/05 Add
      // 處理 Local 模式下的 logtime 格式
      this.filtered_NELogs.forEach( log => {
        log.logtime = this.commonService.formatTimeWithoutSecondsFraction( log.logtime );
      });

      console.log( "In search_NELogs() in Local mode - neLogsToDisplay:", this.neLogsToDisplay );

      // 設置加載旗標為 false，表示加載完成
      this.isGetNELogsInfoLoading = false;
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {  // 如非在 Local 環境測試

      // 只保留傳入日期的部分 @2024/03/10 Add
      const formattedDate = this.commonService.dealPostDate(this.searchForm.controls['from'].value);
      const start = formattedDate.split(' ')[0]; // 獲取日期部分,例如 '2024-03-10'
      
      const formattedEnd = this.commonService.dealPostDate(this.searchForm.controls['to'].value);  
      const end = formattedEnd.split(' ')[0];    // 獲取日期部分,例如 '2024-03-10'

      // 從 searchForm 中獲取篩選條件
      const params: NELogsParams = {
        //userid: this.searchForm.get('UserID')?.value || '',     // 取得 userid，如不存在設為空字串
        //compid: this.searchForm.get('neName')?.value || '',     // 取得 compid，如不存在設為空字串
        start,                                                    // 取得開始日期 - 目前後端無法篩選時分秒
        end,                                                      // 取得結束日期 - 目前後端無法篩選時分秒
        //keyword: this.searchForm.get('keyword')?.value || '',   // 取得想搜尋的關鍵字
              
        offset: ( this.p - 1 ) * this.pageSize,                   // 計算分頁的 offset
        limit: 10                                                 // 設定每頁顯示的 Logs 數量限制
      };

      // 獲取 userid 的控制元件
      // const userIdControl = this.searchForm.get( 'UserID' );

      // // 判斷 keyword 控制元件是否存在且有值
      // if ( userIdControl && userIdControl.value !== '' ) {
      //   params.userid = userIdControl.value;
      // }

      // @2024/03/14 Add
      // 獲取 neName 的控制元件
      const neNameControl = this.searchForm.get( 'neName' );

      // @2024/03/14 Add
      // 判斷 neName 控制元件是否存在且有值
      if ( neNameControl && neNameControl.value !== '' ) {

        // 從 neidNamePairs 中查找與輸入的網元名稱相對應的 id
        const matchedPair = this.neidNamePairs.find( pair => pair.name === neNameControl.value );
        if ( matchedPair ) {
          params.compid = matchedPair.id;
        } else {
          console.warn( `No matching id found for the entered NE name: ${ neNameControl.value }` );
        }
      }

      // 獲取 NELogType 的控制元件
      const neLogTypeControl = this.searchForm.get( 'NELogType' );

      // 判斷 NELogType 控制元件是否存在且有值
      if ( neLogTypeControl && neLogTypeControl.value !== 'All' ) {
        params.operation = neLogTypeControl.value;
      }

      // 獲取 keyword 的控制元件
      const keyWordControl = this.searchForm.get( 'keyword' );

      // 判斷 keyword 控制元件是否存在且有值
      if ( keyWordControl && keyWordControl.value !== '' ) {
        params.keyword = keyWordControl.value;
      }

      // @2024/04/24 Add
      // 調用通用搜索函數，傳入參數和標識這是 NE Logs 的搜索
      this.searchLogs( params, false );

      // // 使用 API_Log 中的 queryUserNetconfLog() 發起 HTTP GET 請求 
      // this.API_Log.queryUserNetconfLog( params ).subscribe( {
      //   next: ( res ) => { // 成功的 callback

      //     console.log( 'In search_NELogs() - res:', res );

      //     // 傳回的數據 res 已是篩選過的，故直接放入 filtered_NELogs
      //     this.filtered_NELogs = res.loginfo;
      //     this.totalLogs = res.logNumber;     // 更新記錄的 Log 總數

      //     // @2024/04/05 Add
      //     // 處理非 Local 模式下的 logtime 格式 (篩選後的結果)
      //     this.filtered_NELogs.forEach( log => {
      //       log.logtime = this.commonService.formatTimeWithoutSecondsFraction( log.logtime );
      //     });

      //     this.isSearch_neLogs = true;        // Search 完畢，設置標記為 true，以便 neLogsToDisplay 切換成顯示 filtered_NELogs
      //     console.log( "In search_NELogs() - neLogsToDisplay:", this.neLogsToDisplay );

      //     // this.NEloginfoDeal();  // 調用處理 NE Log 訊息的函數

      //     // 設置加載旗標為 false，表示加載完成
      //     this.isGetNELogsInfoLoading = false;
      //     this.hideSpinner();  // 完成後隱藏 spinner
      //   },
      //   error: ( error ) => {   // 錯誤的 callback
      //     console.error( 'Error searching NE logs:', error ); // 顯示錯誤訊息

      //     // 設置加載旗標為 false，表示加載出錯
      //     this.isGetNELogsInfoLoading = false;
      //     this.hideSpinner();  // 完成後隱藏 spinner
      //   }
      // });

    }

    // 檢查搜尋表單的值
    console.log( 'Search criteria for NE Logs:', this.afterSearchForm.value );

    console.log( "search_NELogs() - End" );
  }

  // 重置 NE Logs 搜尋 @2024/03/13 Update
  clear_search_NELogs() {

    this.isSearch_neLogs = false;

    this.searchForm.reset();
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep( this.searchForm );

    this.p = 1; // 當點擊重置搜尋時，將顯示頁數預設為 1

    this.getNELogsInfo();
  }  

// ↑ For click "Search" ↑


// ↓ For control Dispaly logInfos on .html ↓

  // 用於顯示的 User Logs 數據 @11/27
  get userLogsToDisplay(): UserLogsInfo[] {

    // 檢查 this.UserLogsList 是否存在，以及 this.UserLogsList.loginfo 是否為非空數組
    if ( this.UserLogsList && Array.isArray( this.UserLogsList.loginfo ) ) {
      return this.isSearch_userLogs ? this.filtered_UserLogs : this.UserLogsList.loginfo;
    }
    return []; // 如果數據還沒有載入，則返回一個空數組
  }

  // 用於顯示的 NE Logs 數據 @11/27
  get neLogsToDisplay(): NELogsInfo[] {
    // 確保 NELogsList 和 NELogsList.loginfo 存在
    if ( this.NELogsList && Array.isArray( this.NELogsList.loginfo ) ) {
      return this.isSearch_neLogs ? this.filtered_NELogs : this.NELogsList.loginfo;
    }
    return []; // 如果數據還沒有載入，則返回一個空數組
  }

// ↑ For control Dispaly logInfos on .html ↑


// ↓ For download log Infos ↓

  // @2023/03/13 Update
  //         --> Excel's cell content is limited to 32767 characters.
  //         --> Adjust date local output format and add multiple output times.( YYYYMMDD_HHmm )
  exportLogsToFile( dataType: string ) {
    console.log( 'exportLogsToFile() - Start' );
    
    // 如是在 Local 環境測試
    if ( this.commonService.isLocal ) {

      // 宣告一個變數來存儲要匯出的資料，結構可是 UserLogsInfo 矩陣或是 NELogsInfo 矩陣
      let dataToExport: UserLogsInfo[] | NELogsInfo[] = [];

      // 依據使用者選擇的 dataType 確定是使用 UserLogType 還是 NELogType
      // 從 searchForm 獲取使用者選擇的日誌類型，如無選擇則默認為 'All'
      const logType = dataType === 'UserLogs' ? this.searchForm.get('UserLogType')?.value || 'All' 
                                              : this.searchForm.get('NELogType')?.value || 'All';
      
      const formattedLogType = logType.replace(/\s+/g, '_'); // 將空白符號替換為下底線
      
      // 從 searchForm 中獲取日期範圍
      const startDate = new Date( this.searchForm.get('from')?.value ); // 取得日期部分(從)
      const endDate = new Date( this.searchForm.get('to')?.value );     // 取得日期部分(至)

      // 將日期轉換為 'YYYYMMDD_HHmm' 的格式
      const formattedStartDate = this.commonService.formatDateForFileName( startDate );
      const formattedEndDate = this.commonService.formatDateForFileName( endDate );

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
          if ( record[key] && record[key].toString().length > 32767 ) {
            record[key] = record[key].toString().substring( 0, 32767 ); // 截斷文本
          }
        });

        // 根據欄位順序格式化數據
        return fields.reduce(( obj, field ) => {
          obj[field] = record[field];
          return obj;
        }, {} as Record<string, any>);
      });

      // 創建工作表
      const worksheet = XLSX.utils.json_to_sheet( formattedData );

      // 創建工作簿並添加工作表
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet( workbook, worksheet, 'Logs' );

      // 生成 Excel 檔案並保存
      const fileName = `${dataType}_${formattedLogType}_${formattedStartDate}_to_${formattedEndDate}.xlsx`;
  
      XLSX.writeFile( workbook, fileName );

    } else { // 非 local 模式依據 Log 類型分別呼叫對應的 API 下載

      // 改只保留傳入日期的部分
      const formattedDate = this.commonService.dealPostDate( this.searchForm.controls['from'].value );
      const start = formattedDate.split(' ')[0]; // 獲取日期部分,例如 '2024-03-10'
      
      const formattedEnd = this.commonService.dealPostDate( this.searchForm.controls['to'].value );  
      const end = formattedEnd.split(' ')[0];    // 獲取日期部分,例如 '2024-03-10'

      // 如是 User Logs，則呼叫 API - getDumpLogList()
      if ( dataType === 'UserLogs' ) {

        this.isGetUserLogsInfoLoading = true; // 設置加載旗標為 true，表示開始加載

        // 從 searchForm 中獲取篩選條件
        const userLogsParams: downloadUserLogsParams = {
          //userid: this.searchForm.get('UserID')?.value || '',    // 取得 userid，如不存在設為空字串
          start,                                                   // 取得開始日期 - 目前後端無法篩選時分秒
          end,                                                     // 取得結束日期 - 目前後端無法篩選時分秒
          // logtype,                                              // 取得想搜尋的類型
          // keyword: this.searchForm.get('keyword')?.value || '', // 取得想搜尋的關鍵字 ( 目前後端 User Logs 的下載 API 沒有該選項 )
        };

        // 獲取 userid 的控制元件
        const userIdControl = this.searchForm.get('UserID');

        // 判斷 keyword 控制元件是否存在且有值
        if ( userIdControl && userIdControl.value !== '' ) {
          userLogsParams.userid = userIdControl.value;
        }

        // 獲取 UserLogType 的控制元件
        const userLogTypeControl = this.searchForm.get('UserLogType');

        // 判斷 UserLogType 控制元件是否存在且有值
        if ( userLogTypeControl && userLogTypeControl.value !== 'All' ) {
          userLogsParams.logtype = userLogTypeControl.value;
        }

        // 用於命名檔案用
        // 從 searchForm 獲取使用者選擇的 User Logs 類型，如無選擇則默認為 'All'
        const logType = this.searchForm.get('UserLogType')?.value || 'All';
        const formattedLogType = logType.replace(/\s+/g, '_'); // 將空白符號替換為下底線

        // 獲取 keyword 的控制元件
        const keyWordControl = this.searchForm.get('keyword');

        // 判斷 keyword 控制元件是否存在且有值
        if ( keyWordControl && keyWordControl.value !== '' ) {
          userLogsParams.keyword = keyWordControl.value;
        }

        // 使用 API_Log 中的 getDumpLogList() 發起 HTTP GET 請求
        this.API_Log.getDumpLogList( userLogsParams ).subscribe({
          next: ( res ) => { // 成功的 callback

            // 顯示下載處理成功的響應訊息
            console.log( 'Successful downloading User logs:', res );

            //  定義 User Logs 檔名格式: {dataType}_{formattedLogType}_{年-月-日}_to_{年-月-日}.xlsx
            //                    e.g.,  UserLogs_POST_2024-03-06_to_2024-03-07.xlsx
            const userLogsfileName = `${dataType}_${formattedLogType}_${start}_to_${end}.xlsx`;

            // 解碼 Base64 字符串並自動下載 .xlsx 文件
            this.commonService.downloadExcelFromBase64( res, userLogsfileName );

            // 設置加載旗標為 false，表示加載完成
            this.isGetUserLogsInfoLoading = false;
          },
          error: ( error ) => {  // 錯誤的 callback
            console.error( 'Error downloading user logs:', error ); // 顯示錯誤訊息

            // 設置加載旗標為 false，表示加載出錯
            this.isGetUserLogsInfoLoading = false;
          }
        });


      // 如果是 NE Logs，則呼叫 API - getDumpUserNetconfLog()
      } else if ( dataType === 'NELogs' ) { 

        this.isGetNELogsInfoLoading = true; // 設置加載旗標為 true，表示開始加載

        // 從 searchForm 中獲取篩選條件
        const neLogsParams: downloadNELogsParams = {
          //userid: this.searchForm.get('UserID')?.value || '',     // 取得 userid，如不存在設為空字串
          //compid: this.searchForm.get('neName')?.value || '',     // 取得 comp_name，如不存在設為空字串
          start,                                                    // 取得開始日期 - 目前後端無法篩選時分秒
          end,                                                      // 取得結束日期 - 目前後端無法篩選時分秒
          // operation,                                             // 取得想搜尋的類型
          // keyword: this.searchForm.get('keyword')?.value || '',  // 取得想搜尋的關鍵字 
        };

        // 獲取 userid 的控制元件
        const userIdControl = this.searchForm.get('UserID');

        // 判斷 keyword 控制元件是否存在且有值
        if ( userIdControl && userIdControl.value !== '' ) {
          neLogsParams.userid = userIdControl.value;
        }

        // 獲取 neName 的控制元件
        const neNameControl = this.searchForm.get('neName');

        // 判斷 NELogType 控制元件是否存在且有值
        if ( neNameControl && neNameControl.value !== '' ) {
          neLogsParams.compid = neNameControl.value;
        }

        // 獲取 NELogType 的控制元件
        const neLogTypeControl = this.searchForm.get('NELogType');

        // 判斷 NELogType 控制元件是否存在且有值
        if ( neLogTypeControl && neLogTypeControl.value !== 'All' ) {
          neLogsParams.operation = neLogTypeControl.value;
        }

        // 用於命名檔案用
        // 從 searchForm 獲取使用者選擇的 NE Logs 類型，如無選擇則默認為 'All'
        const operation = this.searchForm.get('NELogType')?.value || 'All';
        const formattedLogType = operation.replace(/\s+/g, '_'); // 將空白符號替換為下底線

        // 獲取 keyword 的控制元件
        const keyWordControl = this.searchForm.get('keyword');

        // 判斷 keyword 控制元件是否存在且有值
        if ( keyWordControl && keyWordControl.value !== '' ) {
          neLogsParams.keyword = keyWordControl.value;
        }

        // 使用 API_Log 中的 getDumpUserNetconfLog() 發起 HTTP GET 請求 
        this.API_Log.getDumpUserNetconfLog( neLogsParams ).subscribe({
          next: ( res ) => { // 成功的 callback

            // 顯示下載處理成功的響應訊息
            console.log( 'Successful downloading NE logs:', res );

            //  定義 NE Logs 檔名格式: {dataType}_{formattedLogType}_{年-月-日}_to_{年-月-日}.zip
            //                  e.g.,  NELogs_All_2024-03-06_to_2024-03-07.zip
            const neLogsfileName = `${dataType}_${formattedLogType}_${start}_to_${end}.zip`;

            // 解碼 Base64 字符串並自動下載 .zip 文件
            this.commonService.downloadExcelFromBase64( res, neLogsfileName );

            // 設置加載旗標為 false，表示加載完成
            this.isGetNELogsInfoLoading = false;
          },
          error: ( error ) => { // 錯誤的 callback
            console.error( 'Error downloading NE logs:', error ); // 顯示錯誤訊息

            // 設置加載旗標為 false，表示加載出錯
            this.isGetNELogsInfoLoading = false;
          }
        });
      }
    }
    
    console.log( "exportLogsToFile() - End" );
  }



  /*
    // @11/24 not use
    // // 用於將指定 Log 匯出成 .csv 檔案  @11/07 Add by yuchen 
    // exportToCSV(dataType: string) {
      
    //   // 宣告一個變數來存儲要匯出的資料，結構可是 UserLogsInfo 矩陣或是 NELogsInfo 矩陣
    //   let dataToExport: UserLogsInfo[] | NELogsInfo[] = [];

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
  */

// ↑ For download log Infos ↑

}
