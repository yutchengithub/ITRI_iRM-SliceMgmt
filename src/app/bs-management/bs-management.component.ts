import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ElementRef } from '@angular/core'; 
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

// Services
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService } from '../shared/service/spinner.service';    // 用於控制顯示 Spinner @2024/04/17 Add

// import APIs of BS Management @2024/03/19 Add 
import { apiForBSMgmt } from '../shared/api/For_BS_Mgmt';

// 引入儲存各個資訊所需的 interfaces 
import { BSList, Basestation } from '../shared/interfaces/BS/For_queryBsList';       // @2024/03/19 Add 
import { UnusedNE }            from '../shared/interfaces/NE/For_queryUnusedNeList'; // @2024/04/26 Add
import { CreateBs, Component_All, ComponentsInfo_All }               from '../shared/interfaces/BS/For_createBs';            // @2024/04/29 Add
import { CreateDistributedBs, Components_Dist, duID, ruID, ComponentsInfo_Dist } from '../shared/interfaces/BS/For_createDistributedBs'; // @2024/04/29 Add

// 引入所需 Local Files
import { localBSList } from '../shared/local-files/BS/For_queryBsList';             // @2024/03/19 Add
import { localUnusedNEList } from '../shared/local-files/NE/For_queryUnusedNeList'; // @2024/04/26 Add

import * as XLSX from 'xlsx'; // 用於建立基站時上傳參數檔 @2024/03/31 Add by yuchen 

// @2024/04/29 Add
// 用於使用者建立基站時，記錄設定 CU 或 DU 的相關資訊
export interface CuOrDu_selectRecord {
  type: string,
    id: string,
  name: string,
}

// @2024/04/29 Add 
// 用於使用者建立基站時，記錄設定 RU 的相關資訊
export interface Ru_selectRecord {
    type: string,
      id: string,
    name: string,
    duid: string,
  duName: string,
  position?:string
}


@Component({
  selector: 'app-bs-management',
  templateUrl: './bs-management.component.html',
  styleUrls: ['./bs-management.component.scss'],
})
export class BSManagementComponent implements OnInit {
  
  sessionId: string = '';
  refreshTimeout!: any;

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  pageChanged( page: number ) {
    this.p = page;
  }

  // @2024/04/17 Add
  // Show Spinner of Loading Title 
  showLoadingSpinner() {
    this.spinnerService.isLoading = true;
    this.spinnerService.show();
  }

  // @2024/04/17 Add
  // Show Spinner of Processing Title
  showProcessingSpinner() {
    this.spinnerService.isLoading = false;
    this.spinnerService.show();
  }
  
  // @2024/04/17 Add
  // Hide Spinner
  hideSpinner() {
    this.spinnerService.hide();
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
    public  unusedNEList_LocalFiles: localUnusedNEList, // @2024/04/26 Add unusedNEList_LocalFiles 用於從 Local 文件獲取未使用 NE 列表數據

  ) {

    //this.createBsCreationForm();
    //this.initializeElementsForm();
  }

  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();

    this.getQueryBsList(); // @2024/03/19 Add for getting BS List
    //this.createBsCreationForm( this.bsList.basestation ); // 確保 bsList 可用後再創建表單
   //this.initializeElementsForm();
  }

  ngAfterViewInit() {
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

  // @2024/04/28 Update - 多加入創建建立基站用表單
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
          this.CUOptions.push( ne ) ;
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

    this.createBsCreationForm( this.bsList.basestation ); // 確保 bsList 可用後再創建表單

    // 打開 "基站建立" 視窗
    this.bsCreationWindowRef = this.dialog.open( this.bsCreationWindow, {
      id: 'bsCreationWindow',
      // 這裡可以設置對話框的寬高，也可以使用 CSS 來設置
    });

    // 訂閱視窗關閉事件，並在關閉時重置表單驗證狀態
    this.bsCreationWindowRef.afterClosed().subscribe(() => {
      this.bsCreationFormValidated = false;
      // 可以在這裡進行一些清理工作，例如重置表單等
      this.resetBsCreationForm(); // 初始化所有輸入的"基站建立"設定
    });

    // 彈出視窗打開時加載未使用 NE 列表數據
    this.getUnusedNEList();

    this.resetBsCreationForm(); // 初始化所有輸入的"基站建立"設定

    console.log("When Open BS Creation Window the bsComponents", this.bsComponents );
    console.log("When Open BS Creation Window the selectedDUIds", this.selectedDUIds );
    console.log("When Open BS Creation Window the selectedRUIds", this.selectedRUIds );
    console.log("When Open BS Creation Window the connectedDUOptions", this.connectedDUOptions );
    console.log("When Open BS Creation Window the selectedFileName", this.selectedFileName );
    console.log("When Open BS Creation Window the bsCreationData", this.bsCreationData );
  }

  isLinear = true; // 先關閉，開啟表一定要輸入完東西才可以點下一步
  bsFormGroup_Name!: FormGroup;
  bsFormGroup_Type!: FormGroup;
  bsFormGroup_Elements!: FormGroup;
  bsFormGroup_Description!: FormGroup;

  // @2024/04/28 Add
  // 設定 DU 可選擇的數量選項 - 目前最多設為 4 個 ( 可依未來規格調整進行擴充 )
  duNumberOptions = [ 1, 2, 3, 4 ]; 

  // @2024/04/28 Add
  // 設定 RU 可選擇的數量選項 - 目前最多設為 16 個 ( 可依未來規格調整進行擴充 )
  ruNumberOptions = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];

  // @2024/04/28 Add
  // 使用 Basestation[] 替代 any[] 以獲得更強的類型檢查
  uniqueBSNameValidator( bsList: Basestation[] ): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      // 使用 ‘some’ 方法檢查是否存在具有相同名稱的基站
      const nameExists = bsList.some( bs => bs.name === control.value );
      // 如果名稱存在，返回錯誤物件
      return nameExists ? { uniqueBSName: true } : null;
    };
  }

  // @2024/04/28 Update - 改為接收 bsList 為參數
  // 初始化每個用於「創建基站」流程的 FormGroup
  createBsCreationForm( bsList: Basestation[] ) {

    // 步驟 1: 設定基站名稱
    this.bsFormGroup_Name = this.fb.group({
      BSName: ['', [Validators.required, this.uniqueBSNameValidator( bsList )]]
    });

    // 步驟 2: 設定基站類型
    this.bsFormGroup_Type = this.fb.group({
      BSType: ['', Validators.required],
      // DUNumber: [{value: '', disabled: true}, [Validators.required, Validators.min(1)]], // 如是讓使用者自行輸入數量，則需要設定 disabled
      // RUNumber: [{value: '', disabled: true}, [Validators.required, Validators.min(1)]]  // 如是讓使用者自行輸入數量，則需要設定 disabled
      DUNumber: ['', [Validators.required]], // 改為下拉選單控制，故不再設置 disabled
      RUNumber: ['', [Validators.required]]  // 改為下拉選單控制，故不再設置 disabled
    });

    // 步驟 3: 設定網元和 GPS
    //this.initializeElementsForm(); // 初始方法
    this.bsFormGroup_Elements = this.fb.group({}); // 創建一個空的 FormGroup，避免控制台報錯
    this.bsFormGroup_Type.get('BSType')?.valueChanges.subscribe( ( bsType ) => {
      this.initializeElementsForm( bsType );
    });

    // 步驟 4: 設定基站地點描述和上傳配置文件
    this.bsFormGroup_Description = this.fb.group({
      LocationDescription: ['', Validators.required],
      ConfigurationFile: [null, Validators.required]
    });
  }

  
  // @2024/04/29 Add
  // 用於收集當發送 POST 建立基站時所需的承載資訊，
  // 存儲用戶在表單中選擇的所有數據的服務或元件屬性
  bsCreationData: any = {
    name: null,
    bstype: null,
    description: null,
    components: null,
    componentsInfo: null
  };

  // @2024/04/29 Update
  // 用於重置所有輸入的"基站建立"設定
  resetBsCreationForm() {
    console.log("Resetting bs creation form settings.");

    // 重置各個步驟的 FormGroup
    this.bsFormGroup_Name.reset();
    this.bsFormGroup_Type.reset();
    this.bsFormGroup_Elements?.reset();
    this.bsFormGroup_Description.reset();

    // 重置 bsComponents
    this.bsComponents = {};

    // 重置已選擇的 DU 和 RU IDs
    this.selectedDUIds = [];
    this.selectedRUIds = [];

    // 重置可選擇的連接 DU 選項
    this.connectedDUOptions = [];

    // 重置 RUElementsFormArray 中的 connectedDU 控制項
    if (this.bsFormGroup_Elements?.contains('RUElements')) {
      const RUElementsArray = this.bsFormGroup_Elements.get('RUElements') as FormArray;
      RUElementsArray.controls.forEach(control => {
        control.get('connectedDU')?.reset();
      });
    }

    // 重置上傳檔案名稱
    this.selectedFileName = '';

    // 重置 bsCreationData
    this.bsCreationData = {
      name: null,
      bstype: null,
      description: null,
      components: null,
      componentsInfo: null
    };

    // 如果還有其他相關的狀態需要重置，也應該在這裡進行
    // 例如，如果有分頁或過濾器的狀態，也應該一併重置

    console.log("BS creation form settings have been reset.");
  }

  get DUElementsFormArray(): FormArray {
    return this.bsFormGroup_Elements.get('DUElements') as FormArray;
  }
  
  get RUElementsFormArray(): FormArray {
    return this.bsFormGroup_Elements.get('RUElements') as FormArray;
  }

  // @2024/04/30 Update
  // 用於每步驟刷新收集建立基站 POST 所需之 JSON 數據
  updateBsCreationData() {
      this.bsCreationData.name = this.bsFormGroup_Name.get('BSName')?.value;
      this.bsCreationData.description = this.bsFormGroup_Description.get('LocationDescription')?.value;
  
      const typeValue = this.bsFormGroup_Type.get('BSType')?.value;
      this.bsCreationData.bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;
  
      if (this.bsCreationData.bstype === "1") {
          const selectedId = this.bsFormGroup_Elements.get('allInOneElement')?.value;
          this.bsCreationData.components = [{ type: 'cu+du+ru', id: selectedId }];
      } else if (this.bsCreationData.bstype === "2") {
          const cu = this.bsFormGroup_Elements.get('CUElement')?.value;
          const duElements = this.DUElementsFormArray.value.map((du: any) => ({ id: du.DUElement }));
          const ruElements = this.RUElementsFormArray.value.map((ru: any) => ({
              id: ru.RUElement,
              position: `[${ru.latitude}, ${ru.longitude}]`,
              duid: ru.connectedDU
          }));
  
          // Define components with the appropriate type
          const components: Components_Dist = {};
  
          components[cu] = duElements.reduce((acc: duID, du: any) => {
              const filteredRUs = ruElements.filter((ru: any) => ru.duid === du.id);
              const ruMap: ruID = filteredRUs.reduce((ruAcc: ruID, ru: any) => {
                  ruAcc[ru.id] = ru.position;
                  return ruAcc;
              }, {});
              
              acc[du.id] = [ruMap];  // Adjust this if the structure needs to be different
              return acc;
          }, {});
  
          this.bsCreationData.components = components;
      }
  
      console.log("bsCreationData for POST:", this.bsCreationData);
  }
  
  
  // @2024/04/29 Update
  // 處理基站類型選擇的變化
  onBSTypeChange( typeValue: string ) {

    // 監聽用戶的選擇並更新 bstype
    this.bsCreationData.bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;

    if ( typeValue === 'dist' ) {

      // 啟用 DU 和 RU 的選擇
      this.bsFormGroup_Type.get('DUNumber')?.enable();
      this.bsFormGroup_Type.get('RUNumber')?.enable();
  
      /* 在使用者設定好數量時，立即更新下個步驟產生對應 DU、RU 設定數量

        // 可能需要更新 DU 和 RU 表單控制項的值
        // 通常是基於用戶之前的選擇或者一個預設值
        const DUNumber = this.bsFormGroup_Type.get('DUNumber')?.value || 0;
        const RUNumber = this.bsFormGroup_Type.get('RUNumber')?.value || 0;
        
        // 根據 DU 和 RU 的數量來更新或初始化 FormArray
        this.updateElementsForm( DUNumber, RUNumber );
      */

    } else {

      // 如非選擇分佈式，則禁用 DU 和 RU 的選擇
      this.bsFormGroup_Type.get('DUNumber')?.disable();
      this.bsFormGroup_Type.get('RUNumber')?.disable();

      // 可能還需要清除步驟 3 中的表單元素
      this.clearDuRuElementsForm();
    }
  }

  prepareForStep3() {
    if ( this.bsFormGroup_Type.get('BSType')?.value === 'dist' ) {

      // 從表單獲取 DU 和 RU 的數量
      const DUNumber = this.bsFormGroup_Type.get('DUNumber')?.value || 0;
      const RUNumber = this.bsFormGroup_Type.get('RUNumber')?.value || 0;
  
      // 更新 DU 和 RU 的 FormArray
      this.updateElementsForm( DUNumber, RUNumber );
  
      // 顯示 DU、RU 用表單的驗證狀態，用於檢查表單是否已過驗證
      console.log('DU FormArray Valid?', this.DUElementsFormArray.valid);
      console.log('RU FormArray Valid?', this.RUElementsFormArray.valid);
    }
  }

  // @2024/04/28 Add
  // 檢查進第四步驟之前的表單是否有通過驗證用的函數
  checkBefore4StepsFormsValidity() {
    console.log( 'BS Name FormGroup Valid?', this.bsFormGroup_Name.valid );
    console.log( 'BS Type FormGroup Valid?', this.bsFormGroup_Type.valid );
    console.log( 'BS Elements FormGroup Valid?', this.bsFormGroup_Elements.valid );
  
    // 如所有 FormGroup 都有效，則可進下一步
    if ( this.bsFormGroup_Name.valid && this.bsFormGroup_Type.valid &&
           this.bsFormGroup_Elements.valid ) {

      // 所有表單如都有效，就進下一步
      console.log('All forms are valid, can proceed to the next step.');

      return true;
    } else {

      // 有一個或多個表單無效，則不能進下一步
      console.log('One or more forms are invalid, cannot proceed to the next step.');
      return false;
    }
  }

  // @2024/04/28 Add
  // 檢查所有表單是否有通過驗證用的函數
  checkAllFormsValidity() {
    console.log('BS Name FormGroup Valid?', this.bsFormGroup_Name.valid);
    console.log('BS Type FormGroup Valid?', this.bsFormGroup_Type.valid);
    console.log('BS Elements FormGroup Valid?', this.bsFormGroup_Elements.valid);
    console.log('BS Description FormGroup Valid?', this.bsFormGroup_Description.valid);
  
    // 如所有 FormGroup 都有效，則可進下一步
    if ( this.bsFormGroup_Name.valid && this.bsFormGroup_Type.valid &&
          this.bsFormGroup_Elements.valid && this.bsFormGroup_Description.valid ) {

      // 所有表單如都有效，就進下一步
      console.log('All forms are valid, can proceed to the next step.');

      return true;

    } else {

      // 有一個或多個表單無效，則不能進下一步
      console.log('One or more forms are invalid, cannot proceed to the next step.');
      return false;
    }
  }
  
  // @2024/04/28 Add
  // For Toggle CU Set
  toggleNeCuSet() {
    const neCuSetHeader = document.querySelector('.ne-cu-set-wrap label');
    neCuSetHeader?.classList.toggle('active');
  }

  // @2024/04/28 Add
  // For Toggle DU Set
  toggleNeDuSet() {
    const neDuSetHeader = document.querySelector('.ne-du-set-wrap label');
    neDuSetHeader?.classList.toggle('active');
  }

  // @2024/04/28 Add
  // For Toggle RU Set
  toggleNeRuSet() {
    const neRuSetHeader = document.querySelector('.ne-ru-set-wrap label');
    neRuSetHeader?.classList.toggle('active');
  }

  // 用於定義經度驗證格式 @2024/04/28 Add
  // 經度正則表達式: -180 到 180
  // longitudePattern = /^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/; // 如小數輸入超過 6 位會報錯
  longitudePattern = /^(-?(1[0-7][0-9]|0?[0-9]{1,2})(\.[0-9]+)?|180(\.0+)?)$/;

  // 用於定義緯度驗證格式 @2024/04/28 Add
  // 緯度正則表達式: -90 到 90
  // latitudePattern = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/; // 如小數輸入超過 6 位會報錯
  latitudePattern = /^(-?[0-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/;

  // @2024/04/28 Add
  // 初始化步驟 3 的 FormGroup
  initializeElementsForm( bsType: string ) {
    if ( bsType === 'allInOne' ) {
      this.bsFormGroup_Elements = this.fb.group({
        allInOneElement: ['', Validators.required],
        allInOneLongitude: ['', [Validators.required, Validators.pattern( this.longitudePattern )]],
        allInOneLatitude: ['', [Validators.required, Validators.pattern( this.latitudePattern )]],
      });
    } else if ( bsType === 'dist' ) {
      this.bsFormGroup_Elements = this.fb.group({
        CUElement: ['', Validators.required],
        DUElements: this.fb.array([]),
        RUElements: this.fb.array([]),
      });
    }
  }

  // 清除所有相關的表單控件
  clearDuRuElementsForm() {
    if ( this.bsFormGroup_Elements?.contains('DUElements') ) {
      const DUElementsArray = this.bsFormGroup_Elements.get('DUElements') as FormArray;
      DUElementsArray.clear();
    }
    if ( this.bsFormGroup_Elements?.contains('RUElements') ) {
      const RUElementsArray = this.bsFormGroup_Elements.get('RUElements') as FormArray;
      RUElementsArray.clear();
    }
    console.log("已清空 bsFormGroup_Elements - DUElements、RUElements 的 formArray");
  }

  // @2024/04/28 Add
  // 依據使用者設定的 DU、RU 數量設置對應數量的設定表單
  updateElementsForm( DUNumber: number, RUNumber: number ) {
    // 這裡調用的是初始化 FormArray 的方法
    this.initializeDUElementsForm( DUNumber ); // 調用一個新方法來處理 DU 表單陣列的初始化
    this.initializeRUElementsForm( RUNumber ); // 調用一個新方法來處理 RU 表單陣列的初始化
  }

  // @2024/04/28 Add
  // 依據使用者設定數量設置對應數量的 DU 設定表單
  initializeDUElementsForm( DUNumber: number ) {
    const DUElementsArray = this.bsFormGroup_Elements.get('DUElements') as FormArray;
    DUElementsArray.clear();
    for (let i = 0; i < DUNumber; i++) {
      DUElementsArray.push(this.fb.group({
        DUElement: ['', Validators.required],
        // 其他需要的表單控制項
      }));
    }
  }

  // @2024/04/28 Add
  // 依據使用者設定數量設置對應數量的 RU 設定表單
  initializeRUElementsForm( RUNumber: number ) {
    const RUElementsArray = this.bsFormGroup_Elements.get('RUElements') as FormArray;
    RUElementsArray.clear();
    for ( let i = 0; i < RUNumber; i++ ) {
      RUElementsArray.push(this.fb.group({
        RUElement:   ['', Validators.required ],
        longitude:   ['', [ Validators.required, Validators.pattern( this.longitudePattern ) ]], // 新增的經度表單控制項
        latitude:    ['', [ Validators.required, Validators.pattern( this.latitudePattern ) ]],  // 新增的緯度表單控制項
        connectedDU: ['', Validators.required ],
      }));
    }
  }


  // @2024/04/29 Add
  // 用於記錄使用者選擇的網元資訊
  bsComponents: {
    all?: Component_All[];
     cu?: CuOrDu_selectRecord[];
     du?: CuOrDu_selectRecord[];
     ru?: Ru_selectRecord[];
  } = {};

  onStep3Submit() {
    const bstype = this.bsFormGroup_Type.get('BSType')?.value;
    if (bstype === 'allInOne') {
      this.updateBsComponentsForAllInOne();
    } else if (bstype === 'dist') {
      this.updateBsComponentsForDistributed();
    }
  }

  updateBsComponentsForAllInOne() {
    const selectedId = this.bsFormGroup_Elements.get('allInOneElement')?.value;
    const longitude = this.bsFormGroup_Elements.get('allInOneLongitude')?.value;
    const latitude = this.bsFormGroup_Elements.get('allInOneLatitude')?.value;
    const position = `[${longitude},${latitude}]`;
  
    if (selectedId) {
      this.bsComponents.all = [{
        type: 'cu+du+ru',
        id: selectedId,
        position: position
      }];
    }
  
    console.log("selected All-In-One ID:", selectedId);
    console.log("this.bsComponents:", this.bsComponents);
  }
  
  duCount: number = 0;
  ruCount: number = 0;

  // @2024/04/30 Update
  updateBsComponentsForDistributed() {
    const selectedCUId = this.bsFormGroup_Elements.get('CUElement')?.value;
    if (selectedCUId) {
      this.bsComponents.cu = [{
        type: 'cu',
        id: selectedCUId,
        name: this.CUOptions.find(cu => cu.id === selectedCUId)?.name || ''
      }];
    }
  
    this.bsComponents.du = this.DUElementsFormArray.controls
      .filter(du => du.get('DUElement')?.value)
      .map(du => {
        const id = du.get('DUElement')?.value;
        return {
          type: 'du',
          id: id,
          name: this.DUOptions.find(duOption => duOption.id === id)?.name || ''
        };
      });
  
    this.bsComponents.ru = this.RUElementsFormArray.controls
      .filter(ru => ru.get('RUElement')?.value)
      .map(ru => {
        const id = ru.get('RUElement')?.value;
        const connectedDUId = ru.get('connectedDU')?.value;
        const longitude = ru.get('longitude')?.value;
        const latitude = ru.get('latitude')?.value;
        const position = `[${longitude},${latitude}]`;
  
        return {
          type: 'ru',
          id: id,
          name: this.RUOptions.find(ruOption => ruOption.id === id)?.name || '',
          duid: connectedDUId,
          duName: this.DUOptions.find(du => du.id === connectedDUId)?.name || '',
          position: position
        };
      });

      // 計算 duCount 和 ruCount
      this.duCount = this.bsComponents.du?.length || 0;
      this.ruCount = this.bsComponents.ru?.length || 0;

      console.log("selectedCUId:", selectedCUId);
      console.log("this.bsComponents:", this.bsComponents);
      console.log("this.duCount:", this.duCount);
      console.log("this.ruCount:", this.ruCount);
  }
  

  // 儲存已選擇的 DU IDs
  selectedDUIds: string[] = [];

  // 更新 DU 選項
  updateDUOptions() {
    this.DUElementsFormArray.controls.forEach((control, index) => {
      const selectedDUId = control.get('DUElement')?.value;
      if (selectedDUId) {
        this.selectedDUIds[index] = selectedDUId;
      }
    });
  
    this.DUElementsFormArray.controls.forEach((control, index) => {
      const filteredDUOptions = this.DUOptions.filter(du => !this.selectedDUIds.includes(du.id) || du.id === this.selectedDUIds[index]);
      control.get('DUElement')?.setValidators([Validators.required]);
      control.get('DUElement')?.updateValueAndValidity();
    });
  }
  
  // 儲存已選擇的 RU IDs
  selectedRUIds: string[] = [];

  // 更新 RU 選項
  updateRUOptions() {
    this.RUElementsFormArray.controls.forEach((control, index) => {
      const selectedRUId = control.get('RUElement')?.value;
      if (selectedRUId) {
        this.selectedRUIds[index] = selectedRUId;
      }
    });
  
    this.RUElementsFormArray.controls.forEach((control, index) => {
      const filteredRUOptions = this.RUOptions.filter(ru => !this.selectedRUIds.includes(ru.id) || ru.id === this.selectedRUIds[index]);
      control.get('RUElement')?.setValidators([Validators.required]);
      control.get('RUElement')?.updateValueAndValidity();
    });
  }

  connectedDUOptions: UnusedNE[] = []; // 用於儲存 DU 網元

  // 更新已連接的 DU 選項
  // updateConnectedDUOptions() {
  //   const uniqueSelectedDUIds = Array.from(new Set(this.selectedDUIds));
  //   this.connectedDUOptions = this.DUOptions.filter(du => uniqueSelectedDUIds.includes(du.id));
  //   console.log("In updateConnectedDUOptions(), the connectedDUOptions:", this.connectedDUOptions  );
  // }

  updateConnectedDUOptions() {
    const uniqueSelectedDUIds = Array.from(new Set(this.selectedDUIds));
    this.connectedDUOptions = this.DUOptions.filter(du => uniqueSelectedDUIds.includes(du.id));
  
    // 去重操作: 過濾掉 connectedDUOptions 中的重複數據
    this.connectedDUOptions = this.connectedDUOptions.filter((du, index, self) =>
      index === self.findIndex((d) => d.id === du.id)
    );
  
    console.log("In updateConnectedDUOptions(), the connectedDUOptions:", this.connectedDUOptions);
  }
  
  


  // @2024/04/30 Add
  // 產生基站參數樣本檔案用
  generateSampleConf() {
    console.log(this.bsComponents);

    const typeValue = this.bsFormGroup_Type.get('BSType')?.value;
    const bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;

    this.http.get('assets/BS_parameters_sample.xlsx', { responseType: 'arraybuffer' })
    .subscribe(
      (buffer: ArrayBuffer) => {
        const workbook = XLSX.read(new Uint8Array(buffer), { type: 'array' });
        console.log(workbook);
        if (bstype === "1") {
          XLSX.utils.sheet_add_aoa(workbook.Sheets['gNBCUFunction'], [[this.bsComponents.all![0].id]], { origin: 'A2' });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['NRCellCU'], [[this.bsComponents.all![0].id]], { origin: 'A2' });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['gNBDUFunction'], [[this.bsComponents.all![0].id]], { origin: 'A2' });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['NRCellDU'], [[this.bsComponents.all![0].id]], { origin: 'A2' });
        } else {
          XLSX.utils.sheet_add_aoa(workbook.Sheets['gNBCUFunction'], [[this.bsComponents.cu![0].id]], { origin: 'A2' })
        }
        const cuKeys = [{ f: 'gNBCUFunction!D2' }, { f: 'gNBCUFunction!E2' }, { f: 'gNBCUFunction!G2' }, { f: 'gNBCUFunction!H2' }];
        XLSX.utils.sheet_add_aoa(workbook.Sheets['peeParametersList_CU'], [cuKeys], { origin: 'B2' });
        XLSX.utils.sheet_add_aoa(workbook.Sheets['vnfParametersList_CU'], [cuKeys], { origin: 'B2' });
        XLSX.utils.sheet_add_aoa(workbook.Sheets['EP_NgC'], [cuKeys], { origin: 'B2' });
        XLSX.utils.sheet_add_aoa(workbook.Sheets['EP_NgU'], [cuKeys], { origin: 'B2' });
        for (let i = 0; i < this.duCount; i++) {
          const originIndex = 'B' + (i + 2);
          XLSX.utils.sheet_add_aoa(workbook.Sheets['EP_F1C_CU'], [cuKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['EP_F1U_CU'], [cuKeys], { origin: originIndex });
        }
        for (let i = 0; i < this.ruCount; i++) {
          let cuKeys: any[] = [];
          if (bstype === "1") {
            cuKeys = [this.bsComponents.all![0].id, '', ...cuKeys];
          } else {
            cuKeys = [this.bsComponents.ru![i].id, '', ...cuKeys];
          }
          const originIndex = 'A' + (i + 2);
          XLSX.utils.sheet_add_aoa(workbook.Sheets['NRCellCU'], [cuKeys], { origin: originIndex });
          if (bstype === "2") {
            workbook.Sheets['NRCellCU']['A' + (i + 2)].c = [{ a: 'iRM', t: this.bsComponents.ru![i].name }];
            workbook.Sheets['NRCellCU']['A' + (i + 2)].c.hidden = true;
          }
        }
        for (let i = 0; i < this.ruCount; i++) {
          const originIndex = 'B' + (i + 2);
          const cellCuKeys = [
            { f: 'NRCellCU!C' + (i + 2) },
            { f: 'NRCellCU!D' + (i + 2) },
            { f: 'NRCellCU!E' + (i + 2) },
            { f: 'NRCellCU!F' + (i + 2) },
            { f: 'NRCellCU!G' + (i + 2) }
          ];
          XLSX.utils.sheet_add_aoa(workbook.Sheets['peeParametersList_NRCellCU'], [cellCuKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['vnfParametersList_NRCellCU'], [cellCuKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['s_NSSAI_leafList_NRCellCU'], [cellCuKeys], { origin: originIndex });
        }
        for (let i = 0; i < this.duCount; i++) {
          let cuKeys: any[] = [];
          if (bstype === "1") {
            cuKeys = [this.bsComponents.all![0].id, '', '', '', ...cuKeys];
          } else {
            cuKeys = [this.bsComponents.du![i].id, '', '', '', ...cuKeys];
          }
          const originIndex = 'A' + (i + 2);
          XLSX.utils.sheet_add_aoa(workbook.Sheets['gNBDUFunction'], [cuKeys], { origin: originIndex });
          if (bstype === "2") {
            workbook.Sheets['gNBDUFunction']['A' + (i + 2)].c = [{ a: 'iRM', t: this.bsComponents.du![i].name }];
            workbook.Sheets['gNBDUFunction']['A' + (i + 2)].c.hidden = true;
          }
          const duKeys = [
            { f: 'gNBDUFunction!C' + (i + 2) },
            { f: 'gNBDUFunction!E' + (i + 2) },
            { f: 'gNBDUFunction!F' + (i + 2) },
            { f: 'gNBDUFunction!G' + (i + 2) },
            { f: 'gNBDUFunction!H' + (i + 2) }
          ];
          const duOriginIndex = 'B' + (i + 2);
          XLSX.utils.sheet_add_aoa(workbook.Sheets['peeParametersList_DU'], [duKeys], { origin: duOriginIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['vnfParametersList_DU'], [duKeys], { origin: duOriginIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['EP_F1C_DU'], [duKeys], { origin: duOriginIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['EP_F1U_DU'], [duKeys], { origin: duOriginIndex });
        }
        for (let i = 0; i < this.ruCount; i++) {
          const duIndex = this.getDuIndexByRuIndex(i);
          let duKeys: any[] = [];
          if (duIndex >= 0) {
            if (bstype === "1") {
              duKeys = [this.bsComponents.all![0].id, '', ...duKeys, { f: 'NRCellCU!G' + (i + 2) }];
            } else {
              duKeys = [this.bsComponents.ru![i].id, '', ...duKeys, { f: 'NRCellCU!G' + (i + 2) }];
            }
          }
          const originIndex = 'A' + (i + 2);
          XLSX.utils.sheet_add_aoa(workbook.Sheets['NRCellDU'], [duKeys], { origin: originIndex });
          if (bstype === "2") {
            workbook.Sheets['NRCellDU']['A' + (i + 2)].c = [{ a: 'iRM', t: this.bsComponents.ru![i].name }];
            workbook.Sheets['NRCellDU']['A' + (i + 2)].c.hidden = true;
          }

          const cellDuKeys = ['', { f: 'NRCellDU!C' + (i + 2) }, { f: 'NRCellDU!D' + (i + 2) }, { f: 'NRCellDU!E' + (i + 2) }, { f: 'NRCellDU!F' + (i + 2) }, { f: 'NRCellDU!G' + (i + 2) }, { f: 'NRCellDU!H' + (i + 2) }];
          XLSX.utils.sheet_add_aoa(workbook.Sheets['peeParametersList_NRCellDU'], [cellDuKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['vnfParametersList_NRCellDU'], [cellDuKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['s_NSSAI_leafList_NRCellDU'], [cellDuKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['NRSectorCarrierRef_NRCellDU'], [cellDuKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['bWPRef_leafList_NRCellDU'], [cellDuKeys], { origin: originIndex });

          const nrSectorKeys = ['', { f: 'NRSectorCarrierRef_NRCellDU!B' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!C' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!D' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!E' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!F' + (i + 2) }];
          XLSX.utils.sheet_add_aoa(workbook.Sheets['NRSectorCarrier'], [nrSectorKeys], { origin: originIndex });

          const nrSectorKeys2 = ['', { f: 'NRSectorCarrier!B' + (i + 2) }, { f: 'NRSectorCarrier!C' + (i + 2) }, { f: 'NRSectorCarrier!D' + (i + 2) }, { f: 'NRSectorCarrier!E' + (i + 2) }, { f: 'NRSectorCarrier!F' + (i + 2) }, { f: 'NRSectorCarrier!A' + (i + 2) }];
          XLSX.utils.sheet_add_aoa(workbook.Sheets['peeParametersList_NRSector'], [nrSectorKeys2], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['vnfParametersList_NRSector'], [nrSectorKeys2], { origin: originIndex });

          const bwpRefKey = ['', { f: 'bWPRef_leafList_NRCellDU!B' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!C' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!D' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!E' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!F' + (i + 2) }];
          XLSX.utils.sheet_add_aoa(workbook.Sheets['BWP'], [bwpRefKey], { origin: originIndex });

          const bwpKeys = ['', { f: 'BWP!B' + (i + 2) }, { f: 'BWP!C' + (i + 2) }, { f: 'BWP!D' + (i + 2) }, { f: 'BWP!E' + (i + 2) }, { f: 'BWP!F' + (i + 2) }, { f: 'BWP!A' + (i + 2) }];
          XLSX.utils.sheet_add_aoa(workbook.Sheets['peeParametersList_BWP'], [bwpKeys], { origin: originIndex });
          XLSX.utils.sheet_add_aoa(workbook.Sheets['vnfParametersList_BWP'], [bwpKeys], { origin: originIndex });
        }

        XLSX.writeFile(workbook, 'BS_parameters_sample.xlsx');
      },
      (error) => {
        console.error('Error fetching file:', error);
      }
    );
  }

  getDuIndexByRuIndex( ruIndex: number ): number {

    const typeValue = this.bsFormGroup_Type.get('BSType')?.value;
    const bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;

    if ( bstype === "1" ) {
      return 0;
    }
  
    const duId = this.bsComponents.ru![ruIndex].duid;
    for (let i = 0; i < this.bsComponents.du!.length; i++) {
      if (duId === this.bsComponents.du![i].id) {
        return i;
      }
    }
  
    return -1;
  }



  /**
    * @2024/04/28 Add
    * 使用 ViewChild 裝飾器引用 DOM 中的 'fileInput' 元素。
    */
  @ViewChild('fileInput') fileInput!: ElementRef;

  /**
    * @2024/04/28 Add
    * 觸發文件輸入元素的點擊事件。
    */
  triggerFileInput() {
  // 觸發文件輸入元素的點擊事件
  this.fileInput.nativeElement.click();
  }

  /**
    * @2024/04/28 Add
    * 用於儲存上傳的檔案名稱。
    */
  selectedFileName: string = '';

  /**
    * @2024/04/28 Add
    * 當用戶選擇檔案時觸發。
    * @param event 文件選擇事件。
    */
  onFileSelected( event: Event ) {
    // 從事件中獲取目標元素
    const element = event.currentTarget as HTMLInputElement;
    // 初始化文件變數為 null
    let file: File | null = null;
    // 如果元素有文件且文件數量大於 0
    if ( element.files && element.files.length > 0 ) {
      // 獲取第一個文件
      file = element.files.item( 0 );
    }
    // 如果有選擇文件
    if ( file ) {
      // 將選擇的檔案設置到 ConfigurationFile 控件上
      this.bsFormGroup_Description.patchValue({
        ConfigurationFile: file
      });
      // 更新 selectedFileName 的值
      this.selectedFileName = file.name;
      // 調用你用於處理文件的方法
      this.handleBsParametersFile( file );
    }
  }

  // @2024/04/28 Add
  // 檢查是否已上傳檔案並標記為 touched
  checkAndMarkFileAsTouched() {
    // 檢查 ConfigurationFile 控件是否有值
    if ( !this.bsFormGroup_Description.get('ConfigurationFile')?.value ) {
      // 如果沒有值，則標記為 touched 以顯示錯誤信息
      this.bsFormGroup_Description.get('ConfigurationFile')?.markAsTouched();
    }
  }


  handleBsParametersFile( file: File ) {
    const reader: FileReader = new FileReader();
    reader.onload = ( e: any ) => {
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read( bstr, { type: 'binary' } );

      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      const data = XLSX.utils.sheet_to_json( ws );
      console.log( data );
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
