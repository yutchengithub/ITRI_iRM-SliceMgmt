import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges , TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

// Services
import { CommonService }   from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService }  from '../shared/service/spinner.service';    // 用於控制顯示 Spinner @2024/04/17 Add

// For import APIs of Schedule Management 
import { apiForScheduleMgmt }     from '../shared/api/For_Schedule_Mgmt';  // @2024/03/15 Add

// 引入儲存各個資訊所需的 interfaces of Schedule Management
import { ScheduleList, Schedule } from '../shared/interfaces/Schedule/For_queryJobTicketList'; // @2024/03/15 Add

// For import local files of Schedule Management 
import { localScheduleList }      from '../shared/local-files/Schedule/For_queryJobTicketList'; // @2024/03/15 Add


// @2024/04/25 Add 
// 定義 Schedule Type 介面
interface ScheduleType {
  displayName: string;
  value: string;
}

// 定義 Schedule State 介面
interface State {
  displayName: string;
  value: string;
}

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss'],
})
export class ScheduleManagementComponent implements OnInit {
  
  sessionId: string = '';   // sessionId 用於存儲當前會話 ID
  refreshTimeout!: any;     // refreshTimeout 用於存儲 setTimeout 的引用，方便之後清除
  refreshTime: number = 5;  // refreshTime 定義自動刷新的時間間隔（秒）

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

  constructor(
    
    private           http: HttpClient,
    private             fb: FormBuilder,
    private          route: ActivatedRoute,
    private         dialog: MatDialog,
    private         router: Router,
    public   commonService: CommonService,
    public  spinnerService: SpinnerService,
    public languageService: LanguageService,

    public             API_Schedule: apiForScheduleMgmt,  // API_Schedule 用於排程管理相關的 API 請求
    public  scheduleList_LocalFiles: localScheduleList,   // scheduleList_LocalFiles 用於從 Local Files 獲取排程列表數據
  
  ) {
    
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
       'from': new FormControl( `${oneMonthAgoDate.getFullYear()}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}` ), 
         'to': new FormControl( `${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}` ),
       'Type': new FormControl( 'All' ),  // Schedule Type
      'State': new FormControl( 'All' ),  // Schedule State
    });

    this.createSearchForm(); // 初始化並創建篩選 Schedule List 用的 FormGroup

    // 建立 searchForm 的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。
    this.afterSearchForm = _.cloneDeep( this.searchForm );
  }

  ngOnInit() {

    // 取得 Session ID
    this.sessionId = this.commonService.getSessionId();

    // 建立一個 subscribe 來監聽來自路由參數的變化，並更新 searchForm 的值
    this.route.params.subscribe( ( params ) => {
      if ( params['State'] && params['State'] !== 'All' ) {
        this.searchForm.controls['State'].setValue( params['State'] );
      }
      if ( params['Type'] && params['Type'] !== 'All' ) {
        this.searchForm.controls['Type'].setValue( params['Type'] );
      }
    } );

    // 建立 searchForm 的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。
    this.afterSearchForm = _.cloneDeep( this.searchForm );

    // 取得排程列表數據
    this.getQueryJobTicketList();

    // 訂閱語系切換事件，以便在語言變更時更新排程類型和狀態的顯示訊息
    this.languageService.languageChanged.subscribe(
      ( language ) => this.updateScheduleTypeStatusInfo(),
    );
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );

    // @2024/04/25 Add
    // 如存在對 Schedule List 的 API 請求訂閱，則取消訂閱
    if ( this.queryJobTicketList ) this.queryJobTicketList.unsubscribe();
  }

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  pageChanged( page: number ) {
    this.p = page;
  }


  scheduleList: ScheduleList = {} as ScheduleList; // 用於存儲從伺服器或 Local 文件獲取的排程列表數據
  isLoadingScheduleList = true; // 加載狀態的標誌, 初始設置為 true

  // queryJobTicketList 用於管理 HTTP 的訂閱請求,'!' 確保在使用前已賦值。
  queryJobTicketList!: Subscription; // @2024/03/15 Add

  /** @2024/04/28 Update
    * 用於獲取 Schedule List。
    * 根據是否處於 Local 模式,它會從 Local 文件或通過 API 從伺服器獲取排程資訊。
    */
  getQueryJobTicketList() {
    console.log( 'getQueryJobTicketList() - Start' );
    this.isLoadingScheduleList = true; // 開始加載數據,顯示進度指示器

    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時,避免重複或不必要的操作

    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {
      // Local 模式: 使用 Local 文件提供的數據
      
      this.scheduleList = this.scheduleList_LocalFiles.scheduleList_local;
      console.log( 'In local - Get the ScheduleList:', this.scheduleList );

      this.search_ScheduleList();

      this.isLoadingScheduleList = false; // Local 模式下,數據加載快速完成,直接設置為 false
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      // @2024/04/25 Add
      // 取消之前的任何 API 訂閱
      if ( this.queryJobTicketList ) this.queryJobTicketList.unsubscribe();

      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.queryJobTicketList = this.API_Schedule.queryJobTicketList().subscribe({
        next: ( res ) => {

          // 請求成功,獲得排程列表數據
          console.log( 'Get the ScheduleList:', res );

          this.scheduleList = res; // 更新排程列表數據
          //this.search_ScheduleList();
          this.scheduleListDeal();
          console.log( '排程列表資訊\n( BS List ):', this.scheduleList ); // 取得的 Schedule List 資訊 ( Obtained Schedule List information )
          
          this.isLoadingScheduleList = false; // 數據加載完成
          //this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          // 請求出現錯誤
          console.error( 'Error fetching schedule list:', error );
          this.isLoadingScheduleList = false; // 出錯時設置加載標誌為 false
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        complete: () => {
          // 數據流處理完成（無論成功或失敗）
          console.log( 'Schedule list fetch completed' );
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }

    console.log( 'getQueryJobTicketList() - End' );
  }

  // 進一步處理 Schedule List @2024/03/21 Add
  scheduleListDeal() {
    this.totalItems = this.scheduleList.jobticket.length;

    // 使用 setTimeout 設定一個定時刷新
    // 如當前頁面是第一頁，則定時刷新排程列表
    this.refreshTimeout = window.setTimeout(() => {
      if ( this.p === 1 ) {

        console.log(`page[${ this.p }] ===> refresh.`);
        this.getQueryJobTicketList(); // 更新排程訊息( 可選 )

      } else {

        console.log(`page[${ this.p }] ===> no refresh.`);
      }
    }, 60000 ); // 設定 60000 ms ( 60s ) 後執行
  }


// ↓ 控制顯示排程狀態的 icon 與訊息，以及排程類型的訊息 @2024/04/25 Update ↓

  // @2024/03/21 Add
  // 用於存儲排程狀態對應的 icon 和訊息
  ticketStatusInfo = [
    { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] },
    { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobDailyString'] + ' )' },
    { icon: 'blueLight',   message: this.languageService.i18n['sm.jobOnGoingString'] },
    { icon: 'greenLight',  message: this.languageService.i18n['sm.jobSuccessString'] },
    { icon: 'redLight',    message: this.languageService.i18n['sm.jobFailString'] },
    { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
  ];

  // @2024/04/25 Update
  // 根據排程狀態獲取對應的圖示和訊息
  getScheduleStatusInfo( schedule: Schedule ) {
    // 將 schedule.ticketstatus 從字符串轉換為數字
    const ticketStatus = parseInt( schedule.ticketstatus );
    // 將 schedule.executedtype 從字符串轉換為數字
    const executedType = parseInt( schedule.executedtype );

    // 如果 ticketStatus 為 0 或 1
    if ( ticketStatus === 0 || ticketStatus === 1 ) {
      // 如果 executedType 為 1
      if ( executedType === 1 ) {
        // 返回 ticketStatusInfo 中索引為 1 的項目
        return this.ticketStatusInfo[1];
      } else if ( executedType === 2 ) {
        // 返回一個自定義的對象，包含圖示和消息
        return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobWeeklyString'] + ' )' };
      } else if ( executedType === 3 ) {
        // 返回一個自定義的對象，包含圖示和消息
        return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobMonthlyString'] + ' )' };
      }
    }

    // 如果上述條件都不滿足,則返回 ticketStatusInfo 中與 ticketStatus 相對應的項目
    return this.ticketStatusInfo[ticketStatus];
  }

  // @2024/04/25 Update
  // 更新排程狀態和類型的顯示訊息，以對應當前用戶選擇的語言設定。這確保了用戶介面中相關訊息的多語言一致性。
  updateScheduleTypeStatusInfo() {

    // 更新 ticketStatusInfo 以顯示表格中的狀態欄位的多語言訊息
    this.ticketStatusInfo = [
      { icon:  ' grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] },
      { icon:   'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobDailyString'] + ' )' },
      { icon:   'blueLight', message: this.languageService.i18n['sm.jobOnGoingString'] },
      { icon:  'greenLight', message: this.languageService.i18n['sm.jobSuccessString'] },
      { icon:    'redLight', message: this.languageService.i18n['sm.jobFailString'] },
      { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
    ];

    // 更新 States 以反映執行狀態下拉式選單的多語言選項
    this.States = [
      { displayName: 'All', value: 'All' },
      { displayName: this.languageService.i18n['sm.jobSchedulingString'],     value: '0' }, // 假設 '0' 和 '1' 都代表 'Scheduling'
      { displayName: this.languageService.i18n['sm.jobOnGoingString'],        value: '2' },
      { displayName: this.languageService.i18n['sm.jobSuccessString'],        value: '3' },
      { displayName: this.languageService.i18n['sm.jobFailString'],           value: '4' },
      { displayName: this.languageService.i18n['sm.jobPartialSuccessString'], value: '5' }
    ];

    // 更新 Types 以反映排程類型下拉式選單的多語言選項
    this.Types = [
      { displayName: 'All', value: 'All' },
      { displayName: this.languageService.i18n['sm.sfUpdate'], value: '0' },
      { displayName: this.languageService.i18n['sm.caReport'], value: '1' },
      { displayName: this.languageService.i18n['sm.pmReport'], value: '2' },
      { displayName: this.languageService.i18n['sm.fmReport'], value: '3' },
      { displayName: this.languageService.i18n['sm.sfReport'], value: '4' }
    ];
  }

// ↑ 控制顯示排程狀態的 icon 與訊息，以及排程類型的訊息 @2024/04/25 Update ↑



// ↓ For Create FormGroup @2024/04/25 Update ↓

  searchForm!: FormGroup;      // 用於儲存篩選條件
  afterSearchForm!: FormGroup; // 用於儲存並顯示出篩選條件

  // @2024/04/25 Add
  // 定義所有的類型及其對應的 tickettype
  Types: ScheduleType[] = [
    { displayName: 'All', value: 'All' },
    { displayName: this.languageService.i18n['sm.sfUpdate'], value: '0' },
    { displayName: this.languageService.i18n['sm.caReport'], value: '1' },
    { displayName: this.languageService.i18n['sm.pmReport'], value: '2' },
    { displayName: this.languageService.i18n['sm.fmReport'], value: '3' },
    { displayName: this.languageService.i18n['sm.sfReport'], value: '4' }
  ];

  // @2024/03/21 Add
  // 定義所有可能的狀態及其對應的 ticketstatus
  States: State[] = [
    { displayName: 'All', value: 'All' },
    { displayName: this.languageService.i18n['sm.jobSchedulingString'],     value: '0' }, // 假設 '0' 和 '1' 都代表 'Scheduling'
    { displayName: this.languageService.i18n['sm.jobOnGoingString'],        value: '2' },
    { displayName: this.languageService.i18n['sm.jobSuccessString'],        value: '3' },
    { displayName: this.languageService.i18n['sm.jobFailString'],           value: '4' },
    { displayName: this.languageService.i18n['sm.jobPartialSuccessString'], value: '5' }
  ];

  // @2024/04/25 Update
  // 建立搜尋表單並初始化控制項
  createSearchForm() {

    const nowTime = this.commonService.getNowTime();

    // 創建當前時間的 Date 物件
    const now = new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`);

    // 創建往回推一個月的時間之 Date 物件
    const from = new Date(now);
    from.setMonth(from.getMonth() - 1);

    // 格式化日期時間以符合兩位數格式
    const  paddedMonth = ('0' + (from.getMonth() + 1)).slice(-2);
    const    paddedDay = ('0' + from.getDate()).slice(-2);
    const   paddedHour = ('0' + from.getHours()).slice(-2);
    const paddedMinute = ('0' + from.getMinutes()).slice(-2);

    this.searchForm = this.fb.group({
      'from': new FormControl(`${from.getFullYear()}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedMinute}`), 
         'to': new FormControl(`${now.getFullYear()}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`),
      'State': new FormControl('All'), // 狀態，預設 'All'
       'Type': new FormControl('All'), // 類型，預設 'All'
    });

    this.afterSearchForm = _.cloneDeep(this.searchForm); // 保存一份 searchForm 的深拷貝供後續使用
  }

  filtered_ScheduleList: Schedule[] = []; 
  isSearch_scheduleList: boolean = false;

  // @2024/04/25 Update
  // For search Schedule List
  search_ScheduleList() {
    console.log('search_ScheduleList() - Start');
    
    // 確認 scheduleList 是否已加載
    if ( !this.scheduleList || !this.scheduleList.jobticket ) {
      console.error('scheduleList.jobticket is not loaded yet.');
      return;
    }
  
    // 更新顯示的搜尋條件，使用 Deep Copy
    this.afterSearchForm = _.cloneDeep( this.searchForm ); 
    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1
    
    // 清除以前的搜尋結果
    this.filtered_ScheduleList = []; // 存儲篩選結果的陣列
    this.isSearch_scheduleList = false;
    
    // 從表單獲取篩選條件
    const selectedStateValue = this.searchForm.get('State')?.value || 'All';
    const selectedTypeValue = this.searchForm.get('Type')?.value || 'All';
    const executionTimeFrom = this.searchForm.get('from')?.value;
    const executionTimeTo = this.searchForm.get('to')?.value;

    // 應用篩選條件
    this.filtered_ScheduleList = this.scheduleList.jobticket.filter(schedule => {
      const isStateMatch = selectedStateValue === 'All' || schedule.ticketstatus.toString() === selectedStateValue;
      const isTypeMatch = selectedTypeValue === 'All' || schedule.tickettype === selectedTypeValue;
      const isTimeMatch = (!executionTimeFrom || new Date(schedule.executedtime) >= new Date(executionTimeFrom)) &&
                          (!executionTimeTo || new Date(schedule.executedtime) <= new Date(executionTimeTo));

      return isStateMatch && isTypeMatch && isTimeMatch;
    });

    this.isSearch_scheduleList = true; // 標記搜尋完成
    this.totalItems = this.filtered_ScheduleList.length; // 確保更新 totalItems 以反映搜尋結果的數量

    console.log("篩選後的 filtered_ScheduleList :", this.filtered_ScheduleList );
    console.log("search_ScheduleList() - End");
  }

  // @2024/04/25 Update
  // 重置 Schedule List 搜尋
  clear_search_ScheduleList() {

    this.isSearch_scheduleList = false;

    this.searchForm.reset();

    // 重新設定表單的初始值
    this.createSearchForm();

    this.afterSearchForm = _.cloneDeep( this.searchForm );
    
    this.p = 1; // 當點擊重置搜尋時，將顯示頁數預設為 1

    this.getQueryJobTicketList();
  } 

  // 用於顯示 ScheduleList 數據 @2024/03/21 Add
  get scheduleListToDisplay(): Schedule[] {
    // Check if this.scheduleList exists and if this.scheduleList.jobticket is a non-empty array
    if (this.scheduleList && Array.isArray(this.scheduleList.jobticket)) {
      return this.isSearch_scheduleList ? this.filtered_ScheduleList : this.scheduleList.jobticket;
    }
    return []; // If the data has not yet been loaded, return an empty array
  }
  
// ↑ For Create FormGroup @2024/03/21 Add ↑


// ↓ For Click View @2024/03/22 Add ↓

  // @2024/03/17 Add
  // 用於存儲當前選中的 Schedule 訊息
  selectSchedule!: Schedule;  
  
  /** @2024/03/17 Add
   *  導航到選定的排程詳細資訊頁面。
   *  @param schedule 從排程列表中選擇的排程物件。
   */
  viewScheduleDetailInfo( schedule: Schedule ) {

    this.selectSchedule = schedule; // 設定當前選擇的排程。

    // 輸出選擇的排程 ID 和 類型。
    console.log( "View Detail of the schedule id:", this.selectSchedule.id, "and the schedule type: ", this.selectSchedule.tickettype ); 
    
    // 導航到排程管理的詳細資訊頁面，帶上排程的 ID 和排程的 ID 類型 作為路由參數。
    this.router.navigate( ['/main/schedule-mgr/info', this.selectSchedule.id, this.selectSchedule.tickettype] );
  }

// ↑ For Click View @2024/03/22 Add ↑


// ↓ For Download Schedule Report @2024/03/22 Add ↓

  // 用於下載排程列表裡的指定排程報表
  downloadSpecificScheduleReportInList( schedule: Schedule ) {
    console.log("downloadSpecificScheduleReportInList() - Start");
    
    this.showProcessingSpinner();

    // 將選中的 Schedule 賦值給 selectSchedule
    this.selectSchedule = schedule;

    // 檢查是否在 Local 環境下模擬執行
    if ( this.commonService.isLocal ) {

      // Local 模式下無法下載報表
      console.log( "Local 模式下無法真的下載報表,\n 此點選要下載的報表名稱為:", this.selectSchedule.ticketresult );

      this.hideSpinner();  // 完成後隱藏 spinner
    } else {

      // 生產環境下向後端 API 發送請求下載報表
      this.API_Schedule.getReportFile( this.selectSchedule.id ).subscribe({
        next: ( response ) => {

          // 處理成功的響應
          console.log("排程報表", this.selectSchedule.ticketresult, "下載成功:", response);

          // 取得報表名稱
          const fileName = this.selectSchedule.ticketresult;

          // 解碼 Base64 字符串並自動下載檔案
          this.commonService.downloadExcelFromBase64( response, fileName );
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          // 處理失敗響應
          console.error( "排程報表下載失敗:", error );
          // 例如顯示錯誤訊息給用戶
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }

    console.log( "downloadSpecificScheduleReportInList() - End" );
  }

// ↑ For Download Schedule Report @2024/03/22 Add ↑


// ↓ For Delete Schedule @2024/03/22 Add ↓

  // @2024/03/22 Add
  // @ViewChild 裝飾器用於獲取模板中 #deleteSchedule_ConfirmWindow 的元素
  @ViewChild('deleteSchedule_ConfirmWindow') deleteSchedule_ConfirmWindow: any;

  // @2024/03/22 Add
  // MatDialogRef 用於控制打開的對話框
  deleteSchedule_ConfirmWindowRef!: MatDialogRef<any>;

  // 開啟選擇的 Schedule 刪除確認對話框
  openDeleteSchedule_ConfirmWindow( schedule: Schedule ) {

    // 將選中的 Schedule 賦值給 selectSchedule
    this.selectSchedule = schedule;

    // 輸出將要刪除的 Schedule 相關資訊，用於記錄或調整
    console.log( "Time of Schedule Deleted: ", this.selectSchedule.executedtime );

    // 使用 MatDialog 服務開啟確認刪除的對話框
    this.deleteSchedule_ConfirmWindowRef = this.dialog.open(
      this.deleteSchedule_ConfirmWindow, { id: 'deleteSchedule_ConfirmWindow' }
    );

    // 訂閱對話框關閉後的事件
    this.deleteSchedule_ConfirmWindowRef.afterClosed().subscribe( confirm => {
      // 這裡可以根據用戶在對話框中的操作進行相應的處理
    });
  }

  // @2024/03/22 Add
  // 確認刪除 Schedule 的操作
  confirmDeleteSchedule() {

    // 顯示加載指示器
    this.isLoadingScheduleList = true;
    this.showProcessingSpinner();

    // 檢查是否是 Local 環境
    if ( this.commonService.isLocal ) {

      // 在控制台輸出調試訊息
      console.log( 'Remove Schedule in local environment.' );

      // 調用刪除 Schedule 的函數,傳入 Schedule ID
      this.deleteScheduleInLocal( this.selectSchedule.id );

      // 刷新 Schedule 列表或進行其他更新
      this.getQueryJobTicketList();

      // 關閉加載指示器
      this.isLoadingScheduleList = false;
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      // 非 Local 環境,調用後端 API 進行刪除
      this.API_Schedule.removeJobTicket( this.selectSchedule.id ).subscribe({

        next: ( response ) => {

          // 刪除成功的回調,輸出成功訊息和後端響應
          console.log( 'Schedule removed successfully', response );

          // 刷新 Schedule 列表或進行其他更新
          this.getQueryJobTicketList();

          // 關閉加載指示器
          this.isLoadingScheduleList = false;
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          // 刪除失敗的回調,輸出錯誤訊息
          console.error( 'Failed to remove Schedule:', error );

          // 關閉加載指示器
          this.isLoadingScheduleList = false;
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        complete: () => {
          // 請求完成後的回調,不管成功或失敗都會執行
          // 關閉加載指示器
          this.isLoadingScheduleList = false;
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }
  }

  // @2024/03/22 Add
  // 模擬在 Local 環境中刪除 Schedule 的函數 ( 依據 id 進行刪除 )
  deleteScheduleInLocal( scheduleId: string ) {

    // 輸出將要刪除的 Schedule ID,用於記錄和調試
    console.log( "The delete Schedule id:", scheduleId )

    // 確保 scheduleList_LocalFiles.scheduleList_local.jobticket 是一個陣列
    if ( Array.isArray( this.scheduleList_LocalFiles.scheduleList_local.jobticket ) ) {
      
      // 從 Schedule 列表中過濾掉要刪除的 Schedule
      this.scheduleList_LocalFiles.scheduleList_local.jobticket = this.scheduleList_LocalFiles.scheduleList_local.jobticket.filter(schedule => schedule.id !== scheduleId);
    
    } else {

      // 如果 scheduleList_LocalFiles.scheduleList_local.jobticket 不是陣列,輸出錯誤訊息
      console.error('scheduleList_local.jobticket 不是陣列或為 undefined');
    }
  }

// ↑ For Delete Schedule @2024/03/22 Add ↑




  openCreateModal() {
    this.formValidated = false;
    this.createForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'ip': new FormControl('', [Validators.required]),
      'mac': new FormControl('', [Validators.required]),
      'comtype': new FormControl('', [Validators.required]),
      'port': new FormControl('', [Validators.required]),
      'account': new FormControl('', [Validators.required]),
      'key': new FormControl('', [Validators.required]),
      'firm': new FormControl('', [Validators.required]),
      'modelname': new FormControl('', [Validators.required]),
      'sessionid': this.sessionId
    });
    this.createModalRef = this.dialog.open(this.createScheduleModal, { id: 'createScheduleModal' });
    this.createModalRef.afterClosed().subscribe(() => {
      this.fileMsg = '';
      this.formValidated = false;
    });
  }

  fileChange( e: any ) {
    // console.log(e);
    this.fileMsg = '';
    let passFile = null;
    const files = e.target.files;
    if ('0' in files) {
      if (files[0].name.indexOf('.zip') >= 0 || files[0].name.indexOf('.tar') >= 0) {
        passFile = files[0];
      } else {
        this.fileMsg = '格式只允許[file].zip 和.tar';
      }
    }
    if (passFile === null) {
      this.file = null;
      this.provisionForm.controls['fileName'].setValue('');
    } else {
      this.file = files[0];
      this.provisionForm.controls['fileName'].setValue(files[0].name);
    }
    // console.log(files);
  }
  

  create() {
    this.formValidated = true;
    if (!this.createForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.commonService.componentList.components.push(
        {
          id: "0f03212c522b4c86abda",
          bsId: "8e427f7c5ff34326a380",
          bsName: "itri_10.0.2.10",
          name: "itri_10.0.2.10",
          ip: "10.0.2.10",
          port: "830",
          account: "k200",
          key: "k200123",
          comtype: 2,
          firm: "ITRI",
          modelname: "v2.0",
          status: 1
        }
      );
      this.createModalRef.close();
      this.getQueryJobTicketList();

    } else {
      const body = this.createForm.value;
      if (this.createForm.controls['uploadtype'].value === 'CU') {
        body['uploadtype'] = 1;
      } else if (this.createForm.controls['uploadtype'].value === 'DU') {
        body['uploadtype'] = 2;
      } else if (this.createForm.controls['uploadtype'].value === 'CU+DU+RU') {
        body['uploadtype'] = 3;
      } else {
        body['uploadtype'] = 0;
      }
      body['sessionid'] = this.sessionId;
      this.commonService.createBsComponent(body).subscribe(
        res => {
          console.log('createBsComponent:');
          console.log(res);
          this.createModalRef.close();
          this.getQueryJobTicketList();
        }
      );
    }
  }

  openDeleteModal(scheduleList: Schedule) {
    this.selectSchedule = scheduleList;
    //this.schedulestatus = scheduleList.status;
    console.log("test "+this.schedulestatus);
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  openProvisionModal( scheduleList: Schedule)  {
    this.formValidated = false;
    this.provisionForm = this.fb.group({
      'fileName': new FormControl('', [Validators.required])
    });
    this.selectSchedule = scheduleList;
    this.provisionModalRef = this.dialog.open(this.provisionModal, { id: 'provisionModal' });
    this.provisionModalRef.afterClosed().subscribe(() => {
      this.fileMsg = '';
      this.formValidated = false;
    });
  }

  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.componentList.components.length; i++) {
        if (this.selectSchedule.id === this.commonService.componentList.components[i].id) {
          this.commonService.componentList.components.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
      this.getQueryJobTicketList();
    } else {
      this.commonService.deleteSoftware(this.selectSchedule.id).subscribe(
        res => {
          this.deleteModalRef.close();
          this.getQueryJobTicketList();
        }
      );
    }
  }

  openAdvancedModal() {
    const orgAdvancedForm = _.cloneDeep(this.advancedForm);
    this.advancedForm.controls['firm'].setValue(this.searchForm.controls['firm'].value);
    this.advancedForm.controls['model'].setValue(this.searchForm.controls['model'].value);
    this.advancedForm.controls['uploadtype'].setValue(this.searchForm.controls['uploadtype'].value);
    this.advancedForm.controls['fileName'].setValue(this.searchForm.controls['fileName'].value);
    this.advancedModalRef = this.dialog.open(this.advancedModal, { id: 'faultAdvancedModal' });
    this.advancedModalRef.afterClosed().subscribe((result) => {
      if (result === 'OK') {
        this.isSettingAdvanced = true;
        this.isSearch = true;
        this.searchForm.controls['firm'].setValue(this.advancedForm.controls['firm'].value);
        this.searchForm.controls['model'].setValue(this.advancedForm.controls['model'].value);
        this.searchForm.controls['uploadtype'].setValue(this.advancedForm.controls['uploadtype'].value);
        this.searchForm.controls['fileName'].setValue(this.advancedForm.controls['fileName'].value);
        this.afterAdvancedForm = _.cloneDeep(this.advancedForm);
        this.afterSearchForm = _.cloneDeep(this.advancedForm);
        this.p = 1;
        this.getFMAdvanceSearch();
      } else {
        this.advancedForm = orgAdvancedForm;
      }
    });
  }

  getFMAdvanceSearch() {
    const firm = this.afterAdvancedForm.controls['firm'].value;
    const model = encodeURIComponent(this.afterAdvancedForm.controls['model'].value);
    const uploadtype = this.afterAdvancedForm.controls['uploadtype'].value;
    const start = this.commonService.dealPostDate(this.afterAdvancedForm.controls['from'].value);
    const end = this.commonService.dealPostDate(this.afterAdvancedForm.controls['to'].value);
    const fileName = this.afterAdvancedForm.controls['fileName'].value;
    const offset = (this.p - 1) * this.pageSize;
    console.log('getFMAdvanceSearch:');
    console.log(`firm=${firm}, model=${model}, start=${start}, end=${end}, fileName=${fileName}, offset=${offset}`);
    console.log(`uploadtype=${uploadtype}`);
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareLists = this.commonService.softwareLists;
      console.log(this.softwareLists);
      this.scheduleListDeal();
    } else {
      const firm = this.afterAdvancedForm.controls['firm'].value;
      const model = encodeURIComponent(this.afterAdvancedForm.controls['model'].value);
      const fileName = this.afterAdvancedForm.controls['fileName'].value;
      const uploadtype = this.afterAdvancedForm.controls['uploadtype'].value;
      const start = this.commonService.dealPostDate(this.afterAdvancedForm.controls['from'].value);
      const end = this.commonService.dealPostDate(this.afterAdvancedForm.controls['to'].value);
      const offset = (this.p - 1) * this.pageSize;
      const limit = 10;
      if (this.querySWAdvanceSearchScpt) this.querySWAdvanceSearchScpt.unsubscribe();
      this.querySWAdvanceSearchScpt = this.commonService.querySoftwareAdvanceSearch(firm, model, fileName, start, end, offset, limit).subscribe(
        res => {
          console.log('getFMAdvanceSearch:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.softwareLists = JSON.parse(str);
        }
      );
     }
  }

  typeText(type: number): string {
    return this.typeMap.get(type) as string;
  }


  search() {
    this.getQueryJobTicketList();
  }

  debug() {
    const body = this.createForm.value;
    if (this.createForm.controls['uploadtype'].value === 'CU') {
      body['uploadtype'] = 1;
    } else if (this.createForm.controls['uploadtype'].value === 'DU') {
      body['uploadtype'] = 2;
    } else if (this.createForm.controls['uploadtype'].value === 'CU+DU') {
      body['uploadtype'] = 3;
    } else {
      body['uploadtype'] = 0;
    }
    body['sessionid'] = this.sessionId;
    console.log(body);
  }

  clearSetting() {
    this.isSearch = false;
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getQueryJobTicketList();
  }



  softwareLists: SoftwareLists = {} as SoftwareLists;
  componentList: ComponentLists = {} as ComponentLists;
  @ViewChild('createScheduleModal') createScheduleModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('provisionModal') provisionModal: any;
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  afterAdvancedForm!: FormGroup;

  isSettingAdvanced = true;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  provisionModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  provisionForm!: FormGroup;
  selectSoftware!: Uploadinfos;
  
  schedulestatus: number=-1;
  nfTypeList: string[] = ['CU', 'DU', 'CU+DU'];
  file: any;
  typeMap: Map<number, string> = new Map();

  fileMsg: string = '';
  formValidated = false;
  updateForm!: FormGroup;
  isSearch: boolean = false;
  querySoftwareScpt!: Subscription;
  querySWAdvanceSearchScpt!: Subscription;

  comtype: Item[] = [
    { displayName: 'CU', value: '1' },
    { displayName: `DU`, value: '2' },
    { displayName: `CU+DU+RU`, value: '3' }
  ];

}







export interface ComponentLists {
  components: Components[];
}

export interface Components {
  id: string;
  bsId: string;
  bsName: string;
  name: string;
  ip: string;
  port: string;
  account: string;
  key: string;
  comtype: number;
  firm: string;
  modelname: string;
  status: number;
}

export interface SoftwareLists {
  uploadinfos: Uploadinfos[];
}

export interface Uploadinfos {
  id: string;
  firm: string;
  modelname: string;
  uploadtime: string;
  uploadtype: number;
  uploadversion: string;
  description: string;
  uploadinfo: string;
  uploadurl: string;
}
