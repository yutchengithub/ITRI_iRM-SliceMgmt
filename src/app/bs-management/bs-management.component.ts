import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ElementRef } from '@angular/core';

import * as XLSX from 'xlsx'; // 用於建立基站時上傳參數檔 @2024/03/31 Add by yuchen 

import { SpinnerService } from '../shared/service/spinner.service';    // 用於控制顯示 Spinner @2024/04/17 Add

// import APIs of BS Management @2024/03/19 Add 
import { apiForBSMgmt } from '../shared/api/For_BS_Mgmt';

// 引入儲存各個資訊所需的 interfaces 
import { BSList, Basestation } from '../shared/interfaces/BS/For_queryBsList';   // @2024/03/19 Add 
import { UnusedNE }     from '../shared/interfaces/NE/For_queryUnusedNeList';    // @2024/04/26 Add

// 引入所需 Local Files
import { localBSList } from '../shared/local-files/BS/For_queryBsList';             // @2024/03/19 Add 
//import { localNEList } from '../shared/local-files/NE/For_queryBsComponentList';    // @2024/04/26 Add
import { localUnusedNEList } from '../shared/local-files/NE/For_queryUnusedNeList'; // @2024/04/26 Add

@Component({
  selector: 'app-bs-management',
  templateUrl: './bs-management.component.html',
  styleUrls: ['./bs-management.component.scss'],
})
export class BSManagementComponent implements OnInit {
  sessionId: string = '';
  softwareLists: SoftwareLists = {} as SoftwareLists;
  componentList: ComponentLists = {} as ComponentLists;
  @ViewChild('createBSModal') createBSModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('provisionModal') provisionModal: any;
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  afterAdvancedForm!: FormGroup;
  refreshTimeout!: any;
  isSettingAdvanced = true;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  provisionModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  provisionForm!: FormGroup;
  selectSoftware!: Uploadinfos;
  BSstatus: number=-1;
  nfTypeList: string[] = ['CU', 'DU', 'CU+DU'];
  file: any;
  typeMap: Map<number, string> = new Map();
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  fileMsg: string = '';
  formValidated = false;
  searchForm!: FormGroup;
  afterSearchForm!: FormGroup;
  updateForm!: FormGroup;
  isSearch: boolean = false;

  comtype: Item[] = [
    { displayName: 'CU', value: '1' },
    { displayName: `DU`, value: '2' },
    { displayName: `CU+DU+RU`, value: '3' }
  ];

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

  pageChanged(page: number) {
    this.p = page;
  }

  constructor(
    private           dialog: MatDialog,
    private           router: Router,
    private             http: HttpClient,
    private               fb: FormBuilder,
    private    commonService: CommonService,
    public   languageService: LanguageService,
    public    spinnerService: SpinnerService,

    public  API_BS: apiForBSMgmt,           // @2024/03/19 Add for import API of BS Management
    
    public        bsList_LocalFiles: localBSList,       // @2024/03/19 Add for import BS List Local Files 
    //public  neList_LocalFiles: localNEList,           // @2024/04/26 Add neList_LocalFiles 用於從 Local 文件獲取 NE 列表數據
    public  unusedNEList_LocalFiles: localUnusedNEList, // @2024/04/26 Add unusedNEList_LocalFiles 用於從 Local 文件獲取未使用 NE 列表數據

  ) {

    this.createBsCreationForm();
    this.initializeElementsForm();
  }

  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();

    this.getQueryBsList(); // @2024/03/19 Add for getting BS List
    
    this.afterSearchForm = _.cloneDeep(this.searchForm);
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
    if ( this.queryBsList ) this.queryBsList.unsubscribe();
    if ( this.queryUnusedNeList ) this.queryUnusedNeList.unsubscribe();
  }


  bsList: BSList = {} as BSList;   // @2024/03/19 Add
  isGetQueryBsListLoading = false; // 用於表示加載 BS List 的 flag，初始設置為 false @2024/03/19 Add for Progress Spinner
  queryBsList!: Subscription;

  // @2024/03/21 Update
  // Get the BS List in the O1 System
  getQueryBsList() {
    console.log( 'getQueryBsList() - Start' );       // getQueryBsList() 啟動 
    console.log( 'Start fetching info of Bs List' ); // 開始獲取 BS List 資訊
    clearTimeout( this.refreshTimeout );

    this.isGetQueryBsListLoading = true; // 開始顯示 Spinner 表載入 BS List 數據中
    this.showLoadingSpinner();  // 顯示 spinner

    // 檢查是否為 local 環境
    if ( this.commonService.isLocal ) { 

      // For testing with local files
      console.log( 'Start fetching BS List in Local' ); // 開始獲取 Local BS List 資訊

      // 模擬從 Local files 獲取數據並初始化 selected 屬性
      this.bsList = this.bsList_LocalFiles.bsList_local;
      console.log( 'BS List in Local:', this.bsList );

      this.queryBsListDeal();
      
      this.isGetQueryBsListLoading = false; // 加載完成，隱藏 spinner
      this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

    } else {
      
      console.log('Start fetching BS List from API'); // 開始獲取 BS List 資訊

      // Use API_BS's queryBsList() to make an HTTP GET request
      this.queryBsList = this.API_BS.queryBsList().subscribe({
        next: ( res: BSList ) => {

          this.bsList = res;
          this.queryBsListDeal();
          console.log( '基站列表資訊\n( BS List ):', this.bsList ); // 取得的 BS List 資訊 ( Obtained BS List information )
          
          this.isGetQueryBsListLoading = false; // 取得後隱藏 spinner
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          console.error( '獲取基站列表資訊出錯:', error );
          console.error( 'Error fetching - BS List:', error );
          this.isGetQueryBsListLoading = false; // 出錯時也應隱藏 spinner
          this.hideSpinner();  // 出錯時隱藏 spinner
        },
        complete: () => {
          console.log('基站列表資訊獲取完成');
          console.log( 'BS List - fetch completed' );
          this.hideSpinner();  // 出錯時隱藏 spinner
        }
      });
    }

    console.log( 'getQueryBsList() - End' ); // getQueryBsList() end
  }

  queryBsListDeal() {
    this.totalItems = this.bsList.basestation.length;
  
    // 遍歷 basestation 陣列
    this.bsList.basestation.forEach( bs => {
      // 如果 bstype 為 1
      if ( bs.bstype === 1 ) {
        // 設置 cellCount 為 1
        bs.cellCount = 1;
      } else if ( bs.bstype === 2 ) {
        // 如果 bstype 為 2，需要遍歷 components 物件
        let cellCount = 0;
        for ( const compKey in bs.components ) {
          const compVal = bs.components[compKey];
          for ( const innerKey in compVal ) {
            // 取得內層陣列的長度,即 cell 數量
            cellCount += compVal[innerKey].length;
          }
        }
        // 設置 cellCount
        bs.cellCount = cellCount;
      }
    });
  
    // 使用 setTimeout 設定一個定時刷新
    // 如當前頁面是第一頁，則定時刷新 BS 列表
    this.refreshTimeout = window.setTimeout( () => {
      if ( this.p === 1 ) {
        console.log( `page[${this.p}] ===> refresh.` );
        this.getQueryBsList(); // 刷新 BS 列表
      } else {
        console.log( `page[${this.p}] ===> no refresh.` );
      }
    }, 60000 ); // 設定 60000 ms ( 60s ) 後執行
  }

  selectBS!: Basestation;  // 用於存儲當前選中的 BS 訊息 @2024/03/22 Add

  /** @2024/03/28 Update
   * 導航到選定基站的詳細資訊頁面。
   * @param BS 從 BS 列表中選擇的 BS 物件。
   */
  viewBSDetailInfo( BS: Basestation ) {

    this.selectBS = BS; // 設定當前選擇的 BS。
    console.log( "View Detail of the BS id:", this.selectBS.id, "and the BS name: ", this.selectBS.name,
                   "and the BS type: ", this.selectBS.bstype ); // 輸出選擇的基站 ID、名稱和類型。
    
    // 導航到 BS 管理的詳細資訊頁面，帶上 BS 的 ID、名稱、類型作為路由參數。
    this.router.navigate( ['/main/bs-mgr/info', this.selectBS.id, this.selectBS.name, this.selectBS.bstype ] );
  }


// ↓ For Delete BS @2024/03/22 Add ↓

  // @2024/03/22 Add
  // ViewChild 裝飾器用於獲取模板中 #deleteBS_ConfirmWindow 的元素
  @ViewChild('deleteBS_ConfirmWindow') deleteBS_ConfirmWindow: any;

  // @2024/03/22 Add
  // MatDialogRef 用於控制打開的對話框
  deleteBS_ConfirmWindowRef!: MatDialogRef<any>;

  // 開啟選擇的 BS 刪除確認對話框 @2024/03/22 Add
  openDeleteBS_ConfirmWindow( BS: Basestation ) {

    // 將選中的 BS 賦值給 selectBS
    this.selectBS = BS;

    // 輸出將要刪除的 BS 名稱，用於記錄或調整
    console.log( "Deleted BS name: ", this.selectBS.name );

    // 使用 MatDialog 服務開啟確認刪除的對話框
    this.deleteBS_ConfirmWindowRef = this.dialog.open( 
        this.deleteBS_ConfirmWindow, { id: 'deleteBS_ConfirmWindow' }
    );

    // 訂閱對話框關閉後的事件
    this.deleteBS_ConfirmWindowRef.afterClosed().subscribe( confirm => {
      // 這裡可以根據用戶在對話框中的操作進行相應的處理
    });
  }

  // @2024/03/22 Add
  // 確認刪除 BS 的操作
  confirmDeleteBS() {

    // 顯示加載指示器
    this.isGetQueryBsListLoading = true;
    this.showProcessingSpinner();  // 顯示 spinner

    // 檢查是否是 Local 環境
    if ( this.commonService.isLocal ) {

      // 在控制台輸出調試訊息
      console.log('Remove BS in local environment.');

      // 調用刪除 BS 的函數，傳入 BS 名稱
      this.deleteBSInLocal( this.selectBS.name );

      // 刷新 BS 列表或進行其他更新
      this.getQueryBsList();

      // 關閉加載指示器
      this.isGetQueryBsListLoading = false;
      this.hideSpinner();  // 隱藏 spinner

    } else {

      // 非 Local 環境,調用後端 API 進行刪除
      this.API_BS.removeBs( this.selectBS.id ).subscribe({
        next: ( response ) => {

          // 刪除成功的回調,輸出成功訊息和後端響應
          console.log( 'BS removed successfully', response );

          // 刷新 BS 列表或進行其他更新
          this.getQueryBsList();

          // 關閉加載指示器
          this.isGetQueryBsListLoading = false;
          this.hideSpinner();  // 出錯時隱藏 spinner
        },
        error: ( error ) => {

          // 刪除失敗的回調,輸出錯誤訊息
          console.error('Failed to remove BS:', error);

          // 關閉加載指示器
          this.isGetQueryBsListLoading = false;
          this.hideSpinner();  // 出錯時隱藏 spinner
        },
        complete: () => {

          // 請求完成後的回調,不管成功或失敗都會執行
          // 關閉加載指示器
          this.isGetQueryBsListLoading = false;
          this.hideSpinner();  // 出錯時隱藏 spinner
        }
      });
    }
  }

  // @2024/03/22 Add
  // 模擬在 Local 環境中刪除 BS 的函數 ( 依據 name 進行刪除 )
  deleteBSInLocal( bsName: string ) {

    // 輸出將要刪除的 BS 名稱，用於記錄和調試
    console.log( "The delete BS name:", bsName )

    // 確保 bsList_LocalFiles.bsList_local.basestation 是一個陣列
    if ( Array.isArray( this.bsList_LocalFiles.bsList_local.basestation ) ) {

      // 從 BS 列表中過濾掉要刪除的 BS
      this.bsList_LocalFiles.bsList_local.basestation = this.bsList_LocalFiles.bsList_local.basestation.filter( bs => bs.name !== bsName );
    
    } else {

      // 如果 bsList_LocalFiles.bsList_local.basestation 不是陣列,輸出錯誤訊息
      console.error( 'bsList_local.basestation 不是陣列或為 undefined' );
    }
  }


// ↑ For Delete BS @2024/03/22 Add ↑



// ↓ For Create BS @2024/04/26 Add ↓

  // @2024/04/26 Add
  UnusedNEList: UnusedNE[] = [];
  isLoadingUnusedNEList = true;
  queryUnusedNeList!: Subscription;

  // @2024/04/26 Add
  // 用於取得 Unused NE 列表資訊的函數
  getUnusedNEList() {
    console.log( 'getUnusedNEList() - Start' ); // 輸出開始取得 Unused NE 列表的日誌

    this.isLoadingUnusedNEList = true;  // 開始加載數據，顯示進度指示器
    this.showLoadingSpinner();          // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {

      // 如果是本地模式
      // 從本地文件中獲取 Unused NE 列表
      this.UnusedNEList = this.unusedNEList_LocalFiles.unusedNEList_local;

      // 假設 processNEList 方法會更新 CUOptions, DUOptions, 和 RUOptions
      this.processUnusedNEList( this.UnusedNEList );  
      console.log( 'In Local - UnusedNEList:', this.UnusedNEList );

      this.isLoadingUnusedNEList = false; // Local 模式下，數據加載快速完成，直接設置為 false

      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      // 如果非本地模式
      // 從後端 API 獲取 Unused NE 列表
      this.queryUnusedNeList = this.API_BS.queryUnusedNeList().subscribe({
        next: ( res ) => {

          // 成功獲取 Unused NE 列表
          this.UnusedNEList = res; // 將獲取到的 UnusedNE 列表賦值給 UnusedNEList 屬性
          console.log( 'From Server - UnusedNEList:', this.UnusedNEList );

          // 將取得的未被使用 NE 列表進行分類
          this.processUnusedNEList( this.UnusedNEList );

          this.isLoadingUnusedNEList = false; // 數據加載完成
          
          // this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {

          // 獲取 NE 列表出錯
          console.error( 'Error fetching Unused NE list:', error ); // 輸出錯誤日誌
          this.isLoadingUnusedNEList = false; // 出錯時設置加載標誌為 false
          this.hideSpinner();  // 出錯時隱藏 spinner
        },
        complete: () => {

          // 獲取 Unused NE 列表完成
          console.log( 'Unused NE list fetch completed' ); // 輸出完成日誌
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }

    console.log( 'getUnusedNEList() - End' ); // 輸出結束取得 Unused NE 列表的日誌
  }

  // 儲存各類未使用網元數據用 @2024/04/26 Add
        CUOptions: UnusedNE[] = []; // 用於儲存 CU 網元
        DUOptions: UnusedNE[] = []; // 用於儲存 DU 網元
        RUOptions: UnusedNE[] = []; // 用於儲存 RU 網元
      CUDUOptions: UnusedNE[] = []; // 用於儲存 CU+DU 網元
  allInOneOptions: UnusedNE[] = []; // 用於儲存 All-In-One 網元

  // @2024/04/26 Add
  // 用於將取得的未使用網元列表進行分類放入對應數組
  processUnusedNEList( UnusedNEList: UnusedNE[] ) {
    UnusedNEList.forEach( ne => {
      switch ( ne.comtype ) {
        case 1:
          this.CUOptions.push( ne) ;
          break;
        case 2:
          this.DUOptions.push( ne );
          break;
        case 3:
          this.RUOptions.push( ne );
          break;
        case 4:
          this.CUDUOptions.push( ne );
          break;
        case 5:
          this.allInOneOptions.push( ne );
          break;
      }
    });
  }

  // 引用 "基站建立" 視窗組件  @2024/04/26 Add
  // 使用 ViewChild 裝飾器引用模板中的 'bsCreationWindow' 元素
  @ViewChild('bsCreationWindow') bsCreationWindow: any;

  // @2024/04/26 Add
  // 用於存儲對 MatDialogRef 的引用
  bsCreationWindowRef!: MatDialogRef<any>; // 用於控制 "基站建立" 視窗的開啟和關閉

  // @2024/04/26 Add
  // 用於跟踪 "基站建立" 表單的驗證狀態 
  bsCreationFormValidated = false; // 默認為 false，表示尚未驗證

  // @2024/04/26 Add
  // 打開 "基站建立" 視窗
  openBsCreationWindow() {

    // 表單驗證狀態重置
    this.bsCreationFormValidated = false;

    // 打開 "基站建立" 視窗
    this.bsCreationWindowRef = this.dialog.open( this.bsCreationWindow, {
      id: 'bsCreationWindow',
      // 這裡可以設置對話框的寬高，也可以使用 CSS 來設置
    });

    // 訂閱視窗關閉事件，並在關閉時重置表單驗證狀態
    this.bsCreationWindowRef.afterClosed().subscribe(() => {
      this.bsCreationFormValidated = false;
      // 可以在這裡進行一些清理工作，例如重置表單等
    });

    // 彈出視窗打開時加載未使用 NE 列表數據
    this.getUnusedNEList();

    this.resetBsCreationForm(); // 初始化所有輸入的"基站建立"設定
  }

  isLinear = false; // 先關閉一定要輸入完東西才可以點下一步
  bsFormGroup_Name!: FormGroup;
  bsFormGroup_Type!: FormGroup;
  bsFormGroup_Elements!: FormGroup;
  bsFormGroup_Description!: FormGroup;

  // @2024/04/26 Add
  // 初始化每個用於「創建基站」流程的 FormGroup
  createBsCreationForm() {
    // 步驟 1: 設定基站名稱
    this.bsFormGroup_Name = this.fb.group({
      BSName: ['', Validators.required]
    });

    // 步驟 2: 設定基站類型
    this.bsFormGroup_Type = this.fb.group({
      BSType: ['', Validators.required],
      DUNumber: [{value: '', disabled: true}, [Validators.required, Validators.min(1)]],
      RUNumber: [{value: '', disabled: true}, [Validators.required, Validators.min(1)]]
    });

    // 步驟 3: 設定網元和 GPS
    // 將在後面程式中動態處理
    this.bsFormGroup_Elements = this.fb.group({
      // ...
      DUElements: this.fb.array([]),
      RUElements: this.fb.array([])
    });

    // 步驟 4: 設定基站地點描述和上傳配置文件
    this.bsFormGroup_Description = this.fb.group({
      LocationDescription: ['', Validators.required],
      ConfigurationFile: [null, Validators.required]
    });
  }

  // @2024/04/26 Add
  // 用於重置所有輸入的"基站建立"設定
  resetBsCreationForm() {
    console.log("Resetting bs creation form settings.");

    // 重置各個步驟的 FormGroup
    this.bsFormGroup_Name.reset();
    this.bsFormGroup_Type.reset();
    this.bsFormGroup_Elements.reset();
    this.bsFormGroup_Description.reset();

    // 如果還有其他相關的狀態需要重置，也應該在這裡進行
    // 例如，如果有分頁或過濾器的狀態，也應該一併重置

    console.log("BS creation form settings have been reset.");
  }



  // 處理基站類型選擇的變化
  onBSTypeChange(typeValue: string) {
    if (typeValue === '分佈式') {
      this.bsFormGroup_Type.get('DUNumber')?.enable();
      this.bsFormGroup_Type.get('RUNumber')?.enable();
    } else {
      this.bsFormGroup_Type.get('DUNumber')?.disable();
      this.bsFormGroup_Type.get('RUNumber')?.disable();
    }
  }

  // 假設我們已經有了從後端獲取的網元選項列表
  //networkElementOptions: NetworkElement[] = []; // 這應該是一個包含網元的陣列
  gpsLocationPattern = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;

  // 初始化步驟 3 的 FormGroup
  initializeElementsForm() {
    this.bsFormGroup_Elements = this.fb.group({
      allInOneElement: [''],
      gpsLocationAllInOne: ['', [Validators.pattern(this.gpsLocationPattern)]],
      CUElement: [''],
      DUElements: this.fb.array([]),
      RUElements: this.fb.array([])
    });
  }

  // 根據選定的 DU 和 RU 數量動態增加表單控件
  updateElementsForm(DUNumber: number, RUNumber: number) {

    // 清空現有的表單控件
    const DUElementsArray = this.bsFormGroup_Elements.get('DUElements') as FormArray;
    if ( DUElementsArray ) {
      DUElementsArray.clear();
      // ...
    }

    const RUElementsArray = this.bsFormGroup_Elements.get('RUElements') as FormArray;
    if ( RUElementsArray ) {
      RUElementsArray.clear();
      // ...
    }

    // 動態添加 DU 控件
    for (let i = 0; i < DUNumber; i++) {
      DUElementsArray.push(this.fb.group({
        DUElement: ['', Validators.required],
      }));
    }

    // 動態添加 RU 控件
    for (let i = 0; i < RUNumber; i++) {
      RUElementsArray.push(this.fb.group({
        RUElement: ['', Validators.required],
        gpsLocationRU: ['', [Validators.pattern(this.gpsLocationPattern)]],
        connectedDU: ['', Validators.required],
      }));
    }
  }

  get DUElementsFormArray(): FormArray {
    return this.bsFormGroup_Elements.get('DUElements') as FormArray;
  }
  
  get RUElementsFormArray(): FormArray {
    return this.bsFormGroup_Elements.get('RUElements') as FormArray;
  }
  
  @ViewChild('fileInput') fileInput!: ElementRef;

  triggerFileInput() {
    // 觸發文件輸入元素的點擊事件
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;

    if (element.files && element.files.length > 0) {
      file = element.files.item(0);
    }

    // 處理文件的代碼...
    if (file) {
      // 調用你用於處理文件的方法
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json(ws);
      console.log(data);
      // 進一步處理 data 或保存
    };
    reader.readAsBinaryString(file);
  }

  // 表單提交時的處理函數
  onSubmit() {
    if (this.bsFormGroup_Name.valid && this.bsFormGroup_Type.valid && this.bsFormGroup_Elements.valid && this.bsFormGroup_Description.valid) {
      // 處理提交表單數據
    }
  }


// ↑ For Create BS @2024/04/26 Add ↑

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

