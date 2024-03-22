import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges , TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

// For import APIs of Schedule Management 
import { apiForScheduleMgmt }     from '../shared/api/For_Schedule';  // @2024/03/15 Add

// 引入儲存各個資訊所需的 interfaces of Schedule Management
import { ScheduleList, Schedule } from '../shared/interfaces/Schedule/For_queryJobTicketList'; // @2024/03/15 Add

// For import local files of Schedule Management 
import { localScheduleList }      from '../shared/local-files/Schedule/For_queryJobTicketList'; // @2024/03/15 Add

// 定義 State 類型
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

  constructor(
    
    private           http: HttpClient,
    private             fb: FormBuilder,
    private          route: ActivatedRoute,
    private         dialog: MatDialog,
    private         router: Router,
    private  commonService: CommonService,
    public languageService: LanguageService,

    public             API_Schedule: apiForScheduleMgmt,  // API_Schedule 用於排程管理相關的 API 請求
    public  scheduleList_LocalFiles: localScheduleList,   // scheduleList_LocalFiles 用於從 Local Files 獲取排程列表數據
  
  ) {

    // 使用這些格式化後的值來更新 searchForm 控件的值
    this.searchForm = this.fb.group({  
      'State': new FormControl( 'All' ),   // Only for Schedule List
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
    } );

    // 建立 searchForm 的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。
    this.afterSearchForm = _.cloneDeep( this.searchForm );

    this.getQueryJobTicketList();

    this.languageService.languageChanged.subscribe(
      ( language ) => this.updateTicketStatusInfo()
    );
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
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

  /** @2024/03/17 Add
   * 用於獲取 Schedule List。
   * 根據是否處於 Local 模式,它會從 Local 文件或通過 API 從伺服器獲取排程資訊。
   */
  getQueryJobTicketList() {
    console.log( 'getQueryJobTicketList() - Start' );
    this.isLoadingScheduleList = true; // 開始加載數據,顯示進度指示器

    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時,避免重複或不必要的操作

    if ( this.commonService.isLocal ) {
      // Local 模式: 使用 Local 文件提供的數據
      this.scheduleList = this.scheduleList_LocalFiles.scheduleList_local;
      console.log( 'In local - Get the ScheduleList:', this.scheduleList );

      this.isLoadingScheduleList = false; // Local 模式下,數據加載快速完成,直接設置為 false
    } else {

      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.queryJobTicketList = this.API_Schedule.queryJobTicketList().subscribe({
        next: ( res ) => {

          // 請求成功,獲得排程列表數據
          console.log( 'Get the ScheduleList:', res );

          this.scheduleList = res; // 更新排程列表數據
          this.scheduleListDeal();
          console.log( '排程列表資訊\n( BS List ):', this.scheduleList ); // 取得的 Schedule List 資訊 ( Obtained Schedule List information )
          
          this.isLoadingScheduleList = false; // 數據加載完成
        },
        error: ( error ) => {
          // 請求出現錯誤
          console.error( 'Error fetching schedule list:', error );
          this.isLoadingScheduleList = false; // 出錯時設置加載標誌為 false
        },
        complete: () => {
          // 數據流處理完成（無論成功或失敗）
          console.log( 'Schedule list fetch completed' );
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
    }, 10000 ); // 設定 10000 ms 後執行
  }


// ↓ 控制顯示排程狀態的 icon 與訊息 ↓

  // @2024/03/21 Add
  // 用於存儲排程狀態對應的 icon 和訊息
  ticketStatusInfo = [
    { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] },
    { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobDailyString'] + ')' },
    { icon: 'blueLight',   message: this.languageService.i18n['sm.jobOnGoingString'] },
    { icon: 'greenLight',  message: this.languageService.i18n['sm.jobSuccessString'] },
    { icon: 'redLight',    message: this.languageService.i18n['sm.jobFailString'] },
    { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
  ];

  // @2024/03/21 Add
  // 根據排程狀態獲取對應的圖示和訊息
  getTicketStatusInfo( schedule: Schedule ) {
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
        // 返回一個自定義的對象,包含圖示和消息
        return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobWeeklyString'] + ')' };
      } else if ( executedType === 3 ) {
        // 返回一個自定義的對象,包含圖示和消息
        return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobMonthlyString'] + ')' };
      }
    }

    // 如果上述條件都不滿足,則返回 ticketStatusInfo 中與 ticketStatus 相對應的項目
    return this.ticketStatusInfo[ticketStatus];
  }

  // @2024/03/21 Add
  // 用於控制當語系切換時根據排程狀態，顯示對應的 icon 或中英文字訊息
  updateTicketStatusInfo() {

    // 重新初始化 ticketStatusInfo 數組，以正確顯示對應的語言訊息於表格的狀態欄中
    this.ticketStatusInfo = [
      { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] },
      { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobDailyString'] + ')' },
      { icon: 'blueLight', message: this.languageService.i18n['sm.jobOnGoingString'] },
      { icon: 'greenLight', message: this.languageService.i18n['sm.jobSuccessString'] },
      { icon: 'redLight', message: this.languageService.i18n['sm.jobFailString'] },
      { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
    ];

    // 重新初始化 States 數組，以正確顯示對應的語言於下拉式選單中
    this.States = [
      { displayName: 'All', value: 'All' },
      { displayName: this.languageService.i18n['sm.jobSchedulingString'],     value: '0' }, // 假設 '0' 和 '1' 都代表 'Scheduling'
      { displayName: this.languageService.i18n['sm.jobOnGoingString'],        value: '2' },
      { displayName: this.languageService.i18n['sm.jobSuccessString'],        value: '3' },
      { displayName: this.languageService.i18n['sm.jobFailString'],           value: '4' },
      { displayName: this.languageService.i18n['sm.jobPartialSuccessString'], value: '5' }
    ];
  }

// ↑ 控制顯示排程狀態的 icon 與訊息 ↑


// ↓ For Create FormGroup @2024/03/21 Add ↓

  searchForm!: FormGroup;      // 用於儲存篩選條件
  afterSearchForm!: FormGroup; // 用於儲存並顯示出篩選條件

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

  // 建立搜尋表單 @2024/03/21 Add
  // 使用 States 更新建立表單控件的選項
  createSearchForm() {
    this.searchForm = this.fb.group({
      'State': new FormControl( this.States[0].value ), // 使用預設值 'All'
    });
    this.afterSearchForm = _.cloneDeep( this.searchForm ); // Ensure afterSearchForm is also initialized
  }

  filtered_ScheduleList: Schedule[] = []; 
  isSearch_scheduleList: boolean = false;

  // @2024/03/21 Add
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
    
    const selectedStateValue = this.searchForm.get('State')?.value || 'All';

    this.filtered_ScheduleList = this.scheduleList.jobticket.filter( schedule => {
      if ( selectedStateValue === 'All' ) {
        return true; // 如果選擇 "All"，則不過濾任何任務
      } else if ( selectedStateValue === '0' ) {
        return schedule.ticketstatus.toString() === '0' || schedule.ticketstatus.toString() === '1';
        // 當選擇 "Scheduling" 時，接受 ticketstatus 為 0 或 1 的任務
      } else {
        return schedule.ticketstatus.toString() === selectedStateValue;
        // 對於其他選擇，直接比較 ticketstatus 和選擇的值
      }
    });
    
    console.log("篩選後的 filtered_ScheduleList :", this.filtered_ScheduleList );

    this.isSearch_scheduleList = true; // 標記搜尋完成

    this.totalItems = this.filtered_ScheduleList.length; // 確保更新 totalItems 以反映搜尋結果的數量

    console.log("search_ScheduleList() - End");
  }

  // @2024/03/21 Add
  // 重置 Schedule List 搜尋
  clear_search_ScheduleList() {

    this.isSearch_scheduleList = false;

    this.searchForm.reset();
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


  // @2024/03/17 Add
  // 用於存儲當前選中的 Schedule 訊息
  selectSchedule!: Schedule;  
  
  /** @2024/03/17 Add
   *  導航到選定的排程詳細資訊頁面。
   *  @param schedule 從排程列表中選擇的排程物件。
   */
  viewScheduleDetailInfo( schedule: Schedule  ) {

    this.selectSchedule = schedule; // 設定當前選擇的排程。

    // 輸出選擇的排程 ID 和 類型。
    console.log( "View Detail of the schedule id:", this.selectSchedule.id, "and the schedule type: ", this.selectSchedule.tickettype ); 
    
    // 導航到排程管理的詳細資訊頁面，帶上排程的 ID 和排程的 ID 類型 作為路由參數。
    this.router.navigate( ['/main/schedule-mgr/info', this.selectSchedule.id, this.selectSchedule.tickettype] );
  }


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
        },
        error: ( error ) => {
          // 刪除失敗的回調,輸出錯誤訊息
          console.error( 'Failed to remove Schedule:', error );

          // 關閉加載指示器
          this.isLoadingScheduleList = false;
        },
        complete: () => {
          // 請求完成後的回調,不管成功或失敗都會執行
          // 關閉加載指示器
          this.isLoadingScheduleList = false;
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

  fileChange(e: any) {
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
