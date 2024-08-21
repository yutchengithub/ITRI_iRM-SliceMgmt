import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Inject, LOCALE_ID } from '@angular/core';
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
import { FaultList, FaultMessages_new }        from '../shared/interfaces/Fault/For_queryCurrentAllFaultMessage';      // @2024/06/03 Add
import { FaultProcessList, FaultAlarmProcess } from '../shared/interfaces/Fault/For_queryFaultAlarmProcessStatusList'; // @2024/06/19 Add

// 引入所需 Local Files
import { localFaultList } from '../shared/local-files/Fault/For_queryCurrentAllFaultMessage'; // @2024/06/03 Add
import { localFaultProcessList } from '../shared/local-files/Fault/For_queryFaultAlarmProcessStatusList'; // @2024/06/19 Add

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


// @2024/06/16 Add 
// 定義 Status Type ( 告警狀態 ) 介面
interface StatusType {
  displayName: string;
  value: string | number;
}

// @2024/06/16 Add 
// 定義 Situation Type ( 處理狀況 ) 介面
interface SituationType {
  displayName: string;
  value: string | number;
}

@Component({
  selector: 'app-fault-management',
  templateUrl: './fault-management.component.html',
  styleUrls: ['./fault-management.component.scss']
})
export class FaultManagementComponent implements OnInit, AfterViewInit, OnDestroy {

  sessionId: string = '';
  refreshTimeout: any;

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

  // @2024/06/04 Add
  owner: string = ""; // 用於儲存回應人員
  severitys: string[] = [];

  // @2024/06/16 Add
  // 定義所有 "告警狀態" 的類型及其對應的 notificationtype
  statusTypes: StatusType[] = [
    { displayName: 'All', value: 'All' },
    { displayName: this.languageService.i18n['fm.unexcluded'], value: 0 },
    { displayName: this.languageService.i18n['fm.excluded'], value: 1 },
  ];

  // @2024/06/16 Add
  // 定義所有的類型及其對應的 processstatus
  situationTypes: SituationType[] = [
    { displayName: 'All', value: 0 },
    { displayName: this.languageService.i18n['resolved'], value: 1 },
    { displayName: this.languageService.i18n['pending_error'], value: 2 },
  ];

  /**
   * @2024/06/16 Add
   * 更新排程狀態和類型的顯示訊息，以對應當前用戶選擇的語言設定。
   * 這確保了用戶介面中相關訊息的多語言一致性。
   */
  updateFilterOptions() {

    // 更新 statusTypes 以反映 "告警狀態" 下拉式選單的多語言選項
    this.statusTypes = [
      { displayName: 'All', value: 'All' },  // 顯示所有選項
      { displayName: this.languageService.i18n['fm.unexcluded'], value: 0 },  // 顯示未排除的選項
      { displayName: this.languageService.i18n['fm.excluded'], value: 1 },  // 顯示已排除的選項
    ];

    // 更新 situationTypes 以反映 "處理狀況" 下拉式選單的多語言選項
    this.situationTypes = [
      { displayName: 'All', value: 'All' },  // 顯示所有選項
      { displayName: this.languageService.i18n['pending_error'], value: '' },  // 顯示待處理錯誤的選項
      { displayName: this.languageService.i18n['resolved'], value: 1 },  // 顯示已解決的選項
    ];

  }

  constructor(
    @Inject( LOCALE_ID ) private locale: string,
    private   http: HttpClient,
    private     fb: FormBuilder,
    private  route: ActivatedRoute,
    private dialog: MatDialog,

    public     commonService: CommonService,
    public   languageService: LanguageService,
    public    spinnerService: SpinnerService,

    public                    API_Fault: apiForFaultMgmt,        // @2024/06/03 Add for import API of Fault Management
    public         faultList_LocalFiles: localFaultList,         // @2024/06/03 Add for import Fault List Local Files
    public  faultProcessList_LocalFiles: localFaultProcessList,  // @2024/06/19 Add for import Fault Process List Local Files
  ) {

    this.severitys = this.commonService.severitys;
    this.owner = this.commonService.getUserId();

    this.createSearchForm(); // 初始化並創建篩選 Fault Mgmt 用的 FormGroup
  }

  selectedMsg: FaultMessages = {} as FaultMessages;
  modifyMsg: FaultMessages = {} as FaultMessages;
  //modifySatus?: string;
  nullList: string[] = [];  // 給頁籤套件使用
  @ViewChild('itemDetail') itemDetail: any;
  @ViewChild('statusModal') statusModal: any;
  statusModalRef!: MatDialogRef<any>;
  selectFaultId: string = '';
  fmStatus: FmStatus = {} as FmStatus;
  
  selectedHistories: situRecord[] = []; //situation history of selected message
  showHistories: situRecord[] = []; //situation history of selected message for display
  addSitu: situRecord = {} as situRecord;
  @ViewChild('modifyModal') modifyModal: any;
  modifyModalRef!: MatDialogRef<any>;
  show200MsgTimeout!: any;
  show200Msg = false;
  show500Msg = false;
  //timeSort: '' | 'asc' | 'desc' = '';
  filteredFmList: FaultMessages[] = [];

  ngOnInit(): void {
    
    this.sessionId = this.commonService.getSessionId();

    this.owner = this.commonService.getUserId();
    console.log("ngOnInit() - owner:", this.owner);

    this.route.params.subscribe( ( params ) => {
      if ( params['fieldName'] !== 'All' ) {
        this.searchForm.controls['fieldName'].setValue( params['fieldName'] );
      }
      if ( params['neName'] !== 'All' ) {
        this.searchForm.controls['neName'].setValue( params['neName'] );
      }
    });

    // 建立 searchForm 的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。
    this.afterSearchForm = _.cloneDeep( this.searchForm );

    // 取得告警列表數據
    this.getFaultList();

    this.createSearchForm();

    // @2024/06/16 Add
    // 訂閱語系切換事件，以便在語言變更時更新告警下拉選單選項語系
    this.languageService.languageChanged.subscribe(
      ( language ) => this.updateFilterOptions(), // 監聽下拉選單選項語系
    );
  }

  ngAfterViewInit() {
    this.owner = this.commonService.getUserId();
    this.createSearchForm();
  }

  queryCurrentAllFaultMessage: any;
  queryCurrentFieldFaultMessage: any;
  queryCurrentBsFaultMessage: any;
  queryCurrentBsComFaultMessage: any;
  queryCurrentFilterFaultMessage: any;

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
    if ( this.queryCurrentAllFaultMessage ) this.queryCurrentAllFaultMessage.unsubscribe();
    if ( this.queryCurrentFieldFaultMessage ) this.queryCurrentFieldFaultMessage.unsubscribe();
    if ( this.queryCurrentBsFaultMessage ) this.queryCurrentBsFaultMessage.unsubscribe();
    if ( this.queryCurrentBsComFaultMessage ) this.queryCurrentBsComFaultMessage.unsubscribe();
  }
  
  searchForm!: FormGroup;

  // 建立搜尋表單的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。 
  afterSearchForm!: FormGroup;

  // 取得狀態的顯示名稱
  getStatusDisplayName( value: string | number ): string {
    const matchedStatus = this.statusTypes.find( status => status.value === value );
    return matchedStatus ? matchedStatus.displayName : '';
  }

  // 取得處理狀況的顯示名稱  
  getSituationDisplayName( value: string | number ): string {
    const matchedSituation = this.situationTypes.find( situation => situation.value === value );
    return matchedSituation ? matchedSituation.displayName : '';  
  }

  // 建立搜尋表單
  createSearchForm() {
    const nowTime = this.commonService.getNowTime();

    this.searchForm = this.fb.group({
      'fieldName': new FormControl(''),
      'BSName': new FormControl(''),
      'neName': new FormControl(''),
      'alarmName': new FormControl(''),
      'severity': new FormControl('All'),
      'status': new FormControl('All'),
      'situation': new FormControl(0),
      //'ackOwner': new FormControl(''),
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)),   // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`))  // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
    });
  }

  /**
   * @2024/06/19 Add
   * 將時間戳格式化為 "YYYY-MM-DD HH:mm:ss" 格式的字串
   * @method formatTimestamp
   * @param timestamp 要格式化的時間戳字串
   * @returns 返回格式化後的日期時間字串
   */
  formatTimestamp( timestamp: string ): string {

    // 將傳入的時間戳字串轉換為 Date 物件
    const date = new Date( timestamp );

    // 獲取年份
    const year = date.getFullYear();

    // 獲取月份，並確保是兩位數字
    const month = String( date.getMonth() + 1 ).padStart( 2, '0' );

    // 獲取日期，並確保是兩位數字
    const day = String( date.getDate() ).padStart( 2, '0' );

    // 獲取小時，並確保是兩位數字
    const hours = String( date.getHours() ).padStart( 2, '0' );
  
    // 獲取分鐘，並確保是兩位數字
    const minutes = String( date.getMinutes() ).padStart( 2, '0');

    // 獲取秒數，並確保是兩位數字
    const seconds = String( date.getSeconds() ).padStart( 2, '0' );

    // 返回格式化後的日期時間字串
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // 將日期只保留年月日
  extractDateOnly( dateTimeString: string ): string {
    // 使用正則表達式匹配日期部分
    const dateMatch = dateTimeString.match(/^\d{4}-\d{2}-\d{2}/);
    
    if (dateMatch) {
        // 如果匹配成功，返回匹配到的日期部分
        return dateMatch[0];
    } else {
        // 如果沒有匹配到合適的日期格式，拋出錯誤
        throw new Error("Invalid date format. Expected format: YYYY-MM-DD HH:mm");
    }
  }

           p: number = 1;  // 當前頁數
    pageSize: number = 10; // 每頁幾筆
  totalItems: number = 0;  // 總筆數

  displayMode: string = '';
  pageChanged( page: number ) {
    this.p = page;
    console.log( "Current faultList displayMode:", this.displayMode+", Page:", this.p );

    // @2024/03/13 Add
    // 如非 Local 模式，切換每頁時才呼叫 API 取得 log 資訊 
    if ( !this.commonService.isLocal ) {
      this.getFaultList();
    }
  }

  // @2024/08/05 Update
  faultList: FaultList = {} as FaultList;

  /**
   * @2024/08/05 Update
   * 用於控制顯示於頁面上 faultList 數據
   * @property faultListToDisplay
   * @description
   *    - 返回 faultList 的數據，如果已進行搜尋，則顯示 filteredFaultList。
   *    - 確保 faultList 和 faultList.faultMessage 存在。
   */
  get faultListToDisplay(): FaultMessages_new[] {
    // 確保 faultList 和 faultList.faultMessage 存在
    if (this.faultList && Array.isArray(this.faultList.faultMessage)) {
      // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 filteredFaultList
      return this.isSearch ? this.filteredFaultList : this.faultList.faultMessage;
    }
    return []; // 如果數據還沒有載入，則返回一個空數組
  }

  /**
   * @2024/08/05 Update
   * 獲取故障列表數據
   * @method getFaultList
   * @description
   *    - 獲取並處理 faultList 數據。
   *    - 根據搜尋條件向服務器發送請求，並根據結果更新 faultList。
   */
  getFaultList() {
    console.log('getFaultList() - Start');
    this.showLoadingSpinner(); // 顯示加載中的提示

    clearTimeout( this.refreshTimeout ); // 清除刷新計時器

    const method = 'desc'; // 設置請求方法為 'desc'
    const params: any = {
      method: method,
      acktype: this.searchForm.get('situation')?.value, // 獲取情況篩選條件
      offset: ( this.p - 1 ) * this.pageSize, // 頁數切換時，取得指定筆數的數據
      limit: this.pageSize,                   // 設置每頁顯示的數量
      orderby: 0,
      orderbyDesc: 1
    };

    const fieldName = this.searchForm.controls['fieldName'].value; // 獲取欄位名篩選條件
    if ( fieldName && fieldName.value !== '' ) { // 如果 fieldName 存在且不為空
      params.fieldname = fieldName; // 設置請求參數中的 fieldname
    }

    const bsName = this.searchForm.controls['BSName'].value; // 獲取基站名稱篩選條件
    if ( bsName && bsName.value !== '' ) { // 如果 bsName 存在且不為空
      params.bsname = bsName; // 設置請求參數中的 bsname
    }

    const compName = this.searchForm.controls['neName'].value; // 獲取公司名稱篩選條件
    if ( compName && compName.value !== '' ) { // 如果 compName 存在且不為空
      params.compname = compName; // 設置請求參數中的 compname
    }

    const fname = this.searchForm.controls['alarmName'].value; // 獲取警報名稱篩選條件
    if ( fname && fname.value !== '' ) { // 如果 fname 存在且不為空
      params.fname = fname; // 設置請求參數中的 fname
    }

    const urgency = this.searchForm.controls['severity'].value; // 獲取嚴重程度篩選條件
    if ( urgency && urgency !== 'All' ) { // 如果 urgency 存在且不為 'All'
      params.urgency = urgency; // 設置請求參數中的 urgency
    }

    // const ackType = this.searchForm.get('situation')?.value;
    // if (ackType) {
    //   params.acktype = ackType;
    // }

    const start = this.commonService.dealPostDate( this.searchForm.controls['from'].value ); // 獲取開始日期篩選條件
    if ( start ) { // 如果 start 存在
      params.start = this.extractDateOnly( start ); // 設置請求參數中的 start 日期
    }

    const end = this.commonService.dealPostDate( this.searchForm.controls['to'].value ); // 獲取結束日期篩選條件
    if ( end ) { // 如果 end 存在
      params.end = this.extractDateOnly( end ); // 設置請求參數中的 end 日期
    }

    console.log("POST BODY for get faultList:", params);

    if ( this.commonService.isLocal ) {
      // 本地文件測試
      this.faultList = this.faultList_LocalFiles.faultList_local;
      this.faultMessagesDeal();
      this.hideSpinner(); // 隱藏加載提示
    } else {
      // 向服務器發送請求
      this.queryCurrentFilterFaultMessage = this.API_Fault.queryCurrentFilterFaultMessage( params ).subscribe({
        next: ( res ) => {
          console.log('In queryCurrentFilterFaultMessage() - res:', res);
          this.faultList = res;
          this.faultMessagesDeal();
        },
        error: ( error ) => {
          console.error('Error fetching fault messages:', error);
          this.hideSpinner(); // 錯誤時隱藏加載提示
        },
        complete: () => {
          console.log('Fault messages fetch completed');
          this.hideSpinner(); // 完成後隱藏加載提示
        }
      });
    }

    console.log('getFaultList() - End');
  }
  
  /**
   * @2024/08/05 Update
   * 處理 faultList 數據
   * @method faultMessagesDeal
   * @description
   *    - 更新總消息數量並設置刷新計時器。
   *    - 根據當前頁數決定是否刷新數據。
   */
  faultMessagesDeal() {
    //this.p = 1;
    this.totalItems = this.faultList.totalMessageNumber; // 更新總消息數量
    this.nullList = new Array(this.totalItems); // 初始化空列表

    // 設置刷新計時器
    this.refreshTimeout = window.setTimeout(() => {
      if ( this.p === 1 ) {
        console.log(`page[${this.p}] ===> refresh.`);
        this.getFaultList();
      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 60000); // 設定 60000 ms (60s) 後執行
  }

  selectedFaultMsg: FaultMessages_new = {} as FaultMessages_new;
  openFaultDetail( faultMessages: FaultMessages_new ) {
    // this.show200Msg = false;
    // this.show500Msg = false;
    
    this.selectedFaultMsg = faultMessages;

    this.statusModalRef = this.dialog.open(this.itemDetail, { id: 'itemDetail' });
    this.statusModalRef.afterClosed().subscribe(() => {

    });
  }

  /**
   * @2024/08/05 Update
   * 用於搜尋 faultList
   * @property filteredFaultList
   * @description
   *    - 用於存儲篩選後的 faultList 數據。
   *    - 當進行搜尋時，設置 isSearch 為 true。
   */
  filteredFaultList: FaultMessages_new[] = []; // 用於存儲篩選後的 faultList 數據
  isSearch: boolean = false; // 標記是否進行了搜尋

  /**
   * @2024/08/05 Update
   * 搜尋故障列表數據
   * @method search
   * @description
   *    - 根據搜尋條件篩選 faultList 數據。
   *    - 更新顯示的搜尋條件並發送請求。
   */
  search() {
    console.log('search() - Start');

    // 確認 faultList 是否已加載
    if (!this.faultList || !this.faultList.faultMessage) {
      console.error('faultList.faultMessage is not loaded yet.');
      return;
    }

    // 更新顯示的搜尋條件
    this.afterSearchForm = this.searchForm.value;

    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1

    const method = 'desc'; // 設置請求方法為 'desc'
    const ackType = this.searchForm.get('situation')?.value; // 獲取情況篩選條件
    const params: any = {
      method: method,
      acktype: ackType,
      offset: ( this.p - 1 ) * this.pageSize, // 頁數切換時，取得指定筆數的數據
      limit: this.pageSize, // 設置每頁顯示的數量
      orderby: 0,
      orderbyDesc: 1
    };

    const fieldName = this.searchForm.get('fieldName')?.value; // 獲取欄位名篩選條件
    if ( fieldName && fieldName.value !== '' ) { // 如果 fieldName 存在且不為空
      params.fieldname = fieldName; // 設置請求參數中的 fieldname
    }

    const bsName = this.searchForm.get('BSName')?.value; // 獲取基站名稱篩選條件
    if ( bsName && bsName.value !== '' ) { // 如果 bsName 存在且不為空
      params.bsname = bsName; // 設置請求參數中的 bsname
    }

    const compName = this.searchForm.get('neName')?.value; // 獲取公司名稱篩選條件
    if ( compName && compName.value !== '' ) { // 如果 compName 存在且不為空
      params.compname = compName; // 設置請求參數中的 compname
    }

    const fname = this.searchForm.get('alarmName')?.value; // 獲取警報名稱篩選條件
    if ( fname && fname.value !== '' ) { // 如果 fname 存在且不為空
      params.fname = fname; // 設置請求參數中的 fname
    }

    const urgency = this.searchForm.get('severity')?.value; // 獲取嚴重程度篩選條件
    if ( urgency && urgency !== 'All' ) { // 如果 urgency 存在且不為 'All'
      params.urgency = urgency; // 設置請求參數中的 urgency
    }

    const statusType = this.searchForm.get('status')?.value; // 獲取狀態篩選條件
    if ( statusType && statusType !== 'All' ) { // 如果 statusType 存在且不為 'All'
      params.status = statusType; // 設置請求參數中的 status
    }

    // const ackType = this.searchForm.get('situation')?.value;
    // if (ackType) {
    //   params.acktype = ackType;
    // }

    const start = this.searchForm.get('from')?.value; // 獲取開始日期篩選條件
    if ( start && start.value !== '' ) { // 如果 start 存在且不為空
      params.start = this.extractDateOnly( this.commonService.dealPostDate( start ) ); // 設置請求參數中的 start 日期
    }

    const end = this.searchForm.get('to')?.value; // 獲取結束日期篩選條件
    if ( end && end.value !== '' ) { // 如果 end 存在且不為空
      params.end = this.extractDateOnly( this.commonService.dealPostDate( end ) ); // 設置請求參數中的 end 日期
    }

    console.log("POST BODY for searching fault:", params);

    // 清除以前的搜尋結果
    this.filteredFaultList = [];
    this.isSearch = false;

    /**
     * 複製搜尋表單的值以便在搜尋後使用
     * @method _.cloneDeep
     * @description
     *    - 使用 _.cloneDeep 函數深拷貝 searchForm 物件，以確保 afterSearchForm 的值不受後續操作影響。
     *    - 用於顯示當下使用的搜尋條件給使用者查看。
     */
    this.afterSearchForm = _.cloneDeep( this.searchForm );

    this.showProcessingSpinner(); // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {
      // 本地文件測試
      this.filteredFaultList = this.faultList.faultMessage.filter( msg => {
        const isFieldMatch = !fieldName || msg.fieldName.includes( fieldName );
        const isBSMatch = !bsName || msg.bsName.includes( bsName );
        const isNEMatch = !compName || msg.compname.includes( compName );
        const isAlarmMatch = !fname || msg.probablecause.includes( fname );
        const isSeverityMatch = urgency === 'All' || msg.perceivedseverity === urgency;
        const isStatusMatch = statusType === 'All' || msg.notificationtype === statusType;
        const isSituMatch = ackType === 'All' || msg.processstatus === ackType;
        const msgDate = new Date( msg.timestamp );
        const isAfterFrom = !start || msgDate >= new Date( this.commonService.dealPostDate( start ) );
        const isBeforeTo = !end || msgDate <= new Date( this.commonService.dealPostDate( end ) );
        //const isOwnerMatch = !owner_name || msg.acknowledgeOwner.includes( owner_name );

        return isFieldMatch && isBSMatch && isNEMatch && isAlarmMatch && isSeverityMatch
          && isStatusMatch && isSituMatch && isAfterFrom && isBeforeTo;
      });
      this.isSearch = true; // Local Search 完畢，設置標記為 true

      this.totalItems = this.filteredFaultList.length; // 確保更新 totalItems 以更新左下角統計數量，反映搜尋結果的數量

      console.log( "In search() in Local mode - faultListToDisplay:", this.faultListToDisplay );

      this.hideSpinner(); // 隱藏加載提示

    } else {

      // 向服務器發送請求
      this.queryCurrentFilterFaultMessage =
        this.API_Fault.queryCurrentFilterFaultMessage( params ).subscribe({
          next: ( res ) => {
            console.log( 'In search() - res:', res );

            this.filteredFaultList = res.faultMessage;
            this.totalItems = res.totalMessageNumber;
            this.isSearch = true; // Search 完畢，設置標記為 true，以便 faultListToDisplay 切換成顯示 filtered_UserLogs

            // 輸出搜尋後顯示於頁面列表上的故障列表
            console.log( "In search() - faultListToDisplay:", this.faultListToDisplay );
          },
          error: ( error ) => {
            console.error('Error searching fault messages:', error); // 錯誤的 callback
            this.hideSpinner(); // 錯誤時隱藏加載提示
          },
          complete: () => {
            console.log('Fault message search completed'); // 完成的 callback
            this.hideSpinner(); // 完成後隱藏加載提示
          }
        });
    }

    // 檢查搜尋表單的值
    console.log( 'Search criteria for Fault List:', this.afterSearchForm.value );

    console.log("search() - End");
  }

  /**
   * @2024/08/05 Update
   * 清除搜尋條件
   * @method clear_search
   * @description
   *    - 重置搜尋表單並重載故障列表。
   */
  clear_search() {
    this.isSearch = false; // 設置 isSearch 為 false

    this.searchForm.reset(); // 重置搜尋表單
    this.createSearchForm(); // 重新創建搜尋表單
    this.afterSearchForm = _.cloneDeep( this.searchForm ); // 複製搜尋表單的初始值( 用於顯示當下使用的搜尋條件 )

    this.p = 1; // 當點擊重置搜尋時，將顯示頁數預設為 1

    this.getFaultList(); // 重新獲取故障列表
  }


  openItemDetail( faultMessages: FaultMessages ) {
    // this.show200Msg = false;
    // this.show500Msg = false;
    this.selectedMsg = faultMessages;

    this.statusModalRef = this.dialog.open(this.itemDetail, { id: 'itemDetail' });
    this.statusModalRef.afterClosed().subscribe(() => {

    });
  }

  modifySatus: 'PENDING' | 'RESOLVE' = 'PENDING';

  openStatusModal( faultMessages: FaultMessages_new ) {
    this.fmStatus = {} as FmStatus;
    this.type = 'add_situation';
  
    this.selectedFaultMsg = faultMessages;
    this.selectedHistories = this.selectedMsg.histories;
  
    // 根據 processstatus 設置默認值
    if ( this.selectedFaultMsg.processstatus === 1 || this.selectedFaultMsg.processstatus === '1' ) {
      this.modifySatus = 'RESOLVE';
    } else if (this.selectedFaultMsg.processstatus === '' || 
               this.selectedFaultMsg.processstatus === 0 || 
               this.selectedFaultMsg.processstatus === '0') {
      this.modifySatus = 'PENDING';
    } else {
      // 如果 processstatus 不符合上述任何條件，可以設置一個默認值
      this.modifySatus = 'PENDING';
    }
  
    this.getFaultProcessList();
  
    this.statusModalRef = this.dialog.open( this.statusModal, { id: 'fault_statusModal' } );
    this.statusModalRef.afterClosed().subscribe(() => {
      // 關閉後的操作
    });
  }

  type: string = 'add_situation';
  changeType( e: MatButtonToggleChange ) {
    console.log( this.type );
    if ( this.type === 'add_situation' ) {

    } else {
      // this.getFaultProcessList();
    }
  }

  faultProcessList: FaultProcessList = {} as FaultProcessList;
  isLoadingFaultProcessList = true;    // 表示是否正在加載 "處理狀況" 歷史列表
  queryFaultProcessList!: Subscription; // 用於存儲從 API 請求獲得 "處理狀況" 歷史列表的訂閱對象

  get faultProcessListToDisplay(): FaultAlarmProcess[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    // 否則，顯示全部 this.faultList.faultMessage
    return this.faultProcessList.FaultAlarmProcess;
  }

  record_p: number = 1;
  record_pageSize: number = 5;
  record_totalItems: number = 0;
  timeSort: 'asc' | 'desc' = 'asc';

  recordPageChanged( page: number ) {
    this.record_p = page;
  }

  doSortTime() {
    this.timeSort = this.timeSort === 'asc' ? 'desc' : 'asc';
    this.showHistories_new.sort((a, b) => {
      const dateA = new Date(a.createtime).getTime();
      const dateB = new Date(b.createtime).getTime();
      return this.timeSort === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }

  /**
   * @2024/06/19 Add
   * 用於取得指定告警的 "處理狀況" 歷史列表
   * @method getFaultProcessList
   * @returns {void}
   * @description
   *    - 根據運行模式（本地或服務器），從不同來源獲取 "處理狀況" 歷史列表
   */
  getFaultProcessList() {
    console.log('getFaultProcessList() - Start'); // 標記開始獲取數據

    this.isLoadingFaultProcessList = true;  // 開始加載數據
    this.showLoadingSpinner();              // 顯示加載中的提示

    const faultId = this.selectedFaultMsg.id; // 取得選中的告警ID

    if ( this.commonService.isLocal ) {
      // 如果是本地模式，從本地文件中獲取數據
      
      // 假設本地數據結構如下：
      this.faultProcessList = this.faultProcessList_LocalFiles.faultAlarmProcessStatusList_local;
      this.processFaultProcessList( this.faultProcessList );

      console.log('In Local - FaultProcessList:', this.faultProcessList);
      this.isLoadingFaultProcessList = false; // 標記加載完成
      this.hideSpinner();  // 隱藏加載提示

    } else {

      // 非本地模式，從後端 API 獲取數據
      this.queryFaultProcessList = this.API_Fault.queryFaultAlarmProcessStatusList( faultId ).subscribe({
        next: ( res: FaultProcessList ) => {
          this.faultProcessList = res; // 更新列表
          console.log('From Server - FaultProcessList:', this.faultProcessList);
          this.processFaultProcessList( this.faultProcessList ); // 處理獲得的列表
          this.isLoadingFaultProcessList = false; // 標記加載完成
          this.hideSpinner();  // 隱藏加載提示
        },
        error: ( error ) => {
          console.error('Error fetching Fault Process list:', error);
          this.isLoadingFaultProcessList = false; // 標記加載完成
          this.hideSpinner();  // 隱藏加載提示
        },
        complete: () => {
          console.log('Fault Process list fetch completed'); // 標記獲取完成
          this.hideSpinner();  // 隱藏加載提示
        }
      });
    }

    console.log('getFaultProcessList() - End'); // 標記結束獲取數據
  }

  showHistories_new: FaultAlarmProcess[] = [];

  // @2024/06/19 Add
  processFaultProcessList( list: FaultProcessList ) {
    // 處理獲得的列表邏輯
    this.showHistories_new = list.FaultAlarmProcess;
    this.record_totalItems = this.showHistories_new.length;
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
        if (this.queryCurrentFieldFaultMessage) this.queryCurrentFieldFaultMessage.unsubscribe();
        this.queryCurrentFieldFaultMessage = this.commonService.queryFMstatus(this.selectFaultId).subscribe(
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

            this.getFaultList();
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
      //if (this.commonService.isLocal) {
        /* local file test */
        // const num = Math.floor(Math.random() * 2); //回傳0或1
        // const status = (num === 0) ? 200 : 500;
        let status = 200; //Always success now        
        resolve(status);
      //} else {
        // if (this.queryCurrentBsFaultMessage) this.queryCurrentBsFaultMessage.unsubscribe();
        // const processStatus = (this.fmStatus.__processStatus === 'PENDING') ? 1 : 0;
        // this.queryCurrentBsFaultMessage = this.commonService.queryFMProcess(this.selectFaultId, processStatus, this.fmStatus.processComment, this.fmStatus.acknowledgeOwner).subscribe(
        //   (res: HttpResponse<any>) => {
        //     console.log('queryFMProcess:');
        //     console.log(res.status);
        //     resolve(res.status);
        //   }
        // );
      //}
    });
  }
  /* Add Situation End */

  /* Situation History Start */
  getFMstatusrecord() {
    //this.timeSort = '';
    return new Promise((resolve, reject) => {
      //if (this.commonService.isLocal) {
        /* local file test */
        this.showHistories = _.cloneDeep(this.selectedHistories);
        this.fMstatusrecordDeal();
        resolve(true);
      //} else {
       // if (this.queryCurrentBsComFaultMessage) this.queryCurrentBsComFaultMessage.unsubscribe();
        //this.queryCurrentBsComFaultMessage = this.commonService.queryFMstatusrecord(this.selectFaultId).subscribe(
          //res => {
            // console.log('getFMstatusrecord:');
            // console.log(res);
            // this.orgFmStatusRecordList = res as FmStatusRecord[];
            // this.fMstatusrecordDeal();
            // resolve(true);
          //}
        //);
      //}
    });
  }

  fMstatusrecordDeal() {
    this.record_p = 1;
    this.record_totalItems = this.selectedHistories.length;
  }


  // doSortTime() {
  //   if (this.timeSort === '') {
  //     this.timeSort = 'asc';
  //   } else if (this.timeSort === 'asc') {
  //     this.timeSort = 'desc';
  //   } else {
  //     this.timeSort = '';
  //   }

  //   if (this.timeSort === '') {
  //     this.showHistories = _.cloneDeep(this.selectedHistories);
  //   } else {
  //     this.showHistories = _.orderBy(this.selectedHistories, ['timestamp'], [this.timeSort as any]);
  //   }
  // }
  /* Situation History End */
}
