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
  }

  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();
    this.getQueryBsList(); // @2024/03/19 Add for getting BS List
    //this.createBsCreationForm( this.bsList.basestation ); // 確保 bsList 可用後再創建表單
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


// ↓ For Delete BS @2024/05/07 Update ↓

  // @2024/03/22 Add
  // ViewChild 裝飾器用於獲取模板中 #deleteBS_ConfirmWindow 的元素
  @ViewChild('deleteBS_ConfirmWindow') deleteBS_ConfirmWindow: any;

  // @2024/05/07 Add
  // ViewChild 裝飾器用於獲取模板中 #fieldInUsePromptWindow 的元素
  @ViewChild('fieldInUsePromptWindow') fieldInUsePromptWindow: any;

  // @2024/03/22 Add
  // MatDialogRef 用於控制打開的彈出視窗
  deleteBS_ConfirmWindowRef!: MatDialogRef<any>;
  fieldInUsePromptWindowRef!: MatDialogRef<any>;

  // @2024/05/07 Update
  // 開啟選擇的 BS 刪除確認彈出視窗
  openDeleteBS_ConfirmWindow( BS: Basestation ) {

    // 將選中的 BS 賦值給 selectBS
    this.selectBS = BS;

    // 輸出嘗試要刪除的 BS 名稱
    console.log( "Attempting to delete BS:", this.selectBS.name );

    if ( this.selectBS.fieldName ) {

      // 如有場域名稱，則顯示提示有場域使用中的彈出視窗

      // 使用 MatDialog 服務開啟提示有場域使用中的彈出視窗
      this.fieldInUsePromptWindowRef = this.dialog.open( 
        this.fieldInUsePromptWindow, { id: 'fieldInUsePromptWindow' }
      );

      // 訂閱彈出視窗關閉後的事件
      this.fieldInUsePromptWindowRef.afterClosed().subscribe( result => {
        console.log('The field in use dialog was closed');
      });

    } else {

      // 如無場域名稱，顯示正常的刪除確認彈出視窗

      // 使用 MatDialog 服務開啟確認刪除的彈出視窗
      this.deleteBS_ConfirmWindowRef = this.dialog.open( 
        this.deleteBS_ConfirmWindow, { id: 'deleteBS_ConfirmWindow' }
      );

      // 訂閱彈出視窗關閉後的事件
      this.deleteBS_ConfirmWindowRef.afterClosed().subscribe( confirm => {
        // 這裡可以根據用戶在彈出視窗中的操作進行相應的處理
      });
        
    }
  }

  // @2024/05/07 Update
  // 確認刪除 BS 的操作
  confirmDeleteBS() {

    // 輸出將要刪除的 BS 名稱
    console.log( "Deleted BS name: ", this.selectBS.name );

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


// ↑ For Delete BS @2024/05/07 Update ↑


// ↓ For Create BS @2024/05/02 Update ↓

  // @2024/04/26 Add
  UnusedNEList: UnusedNE[] = [];    // 存儲未被使用的網元列表
  isLoadingUnusedNEList = true;     // 表示是否正在加載未使用的網元列表
  queryUnusedNeList!: Subscription; // 用於存儲從 API 請求獲得未使用網元列表的訂閱對象

  /** @2024/04/26 Add
   *  用於取得未使用網元列表資訊
   *  @method getUnusedNEList
   *  @returns {void}
   *  @description
   *    - 根據運行模式（本地或服務器），從不同來源獲取未使用網元列表
   */
  getUnusedNEList() {
    console.log('getUnusedNEList() - Start'); // 標記開始獲取數據

    this.isLoadingUnusedNEList = true;  // 開始加載數據
    this.showLoadingSpinner();          // 顯示加載中的提示

    if ( this.commonService.isLocal ) {

      // 如果是本地模式，從本地文件中獲取數據
      this.UnusedNEList = this.unusedNEList_LocalFiles.unusedNEList_local;
      this.processUnusedNEList( this.UnusedNEList );  // 處理獲得的列表
      console.log( 'In Local - UnusedNEList:', this.UnusedNEList );

      this.isLoadingUnusedNEList = false; // 標記加載完成
      this.hideSpinner();  // 隱藏加載提示

    } else {

      // 非本地模式，從後端 API 獲取數據
      this.queryUnusedNeList = this.API_BS.queryUnusedNeList().subscribe({
        next: ( res ) => {

          this.UnusedNEList = res; // 更新網元列表

          console.log( 'From Server - UnusedNEList:', this.UnusedNEList );

          this.processUnusedNEList( this.UnusedNEList ); // 處理獲得的列表
          this.isLoadingUnusedNEList = false; // 標記加載完成

          //this.hideSpinner();  // 隱藏加載提示
        },
        error: ( error ) => {
          console.error( 'Error fetching Unused NE list:', error );
          this.isLoadingUnusedNEList = false; // 標記加載完成
          this.hideSpinner();  // 隱藏加載提示
        },
        complete: () => {
          console.log('Unused NE list fetch completed'); // 標記獲取完成
          this.hideSpinner();  // 隱藏加載提示
        }
      });
    }

    console.log('getUnusedNEList() - End'); // 標記結束獲取數據
  }

  // 用於儲存各類未使用的網元數據 @2024/04/26 Add
        CUOptions: UnusedNE[] = []; // 用於儲存 CU 網元
        DUOptions: UnusedNE[] = []; // 用於儲存 DU 網元
        RUOptions: UnusedNE[] = []; // 用於儲存 RU 網元
      CUDUOptions: UnusedNE[] = []; // 用於儲存 CU+DU 網元
  allInOneOptions: UnusedNE[] = []; // 用於儲存 All-In-One 網元

  /** @2024/04/26 Add
   *  將取得的未使用網元列表進行分類放入對應數組
   *  @method processUnusedNEList
   *  @param { UnusedNE[] } UnusedNEList - 未使用的網元列表
   *  @returns { void }
   *  @description
   *    - 將獲取的網元根據類型分類到相應的選項中
   */
  processUnusedNEList( UnusedNEList: UnusedNE[] ) {
    UnusedNEList.forEach( ne => {
        switch ( ne.comtype ) {
          case 1: // CU 網元
            this.CUOptions.push( ne );
            break;
          case 2: // DU 網元
            this.DUOptions.push( ne );
            break;
          case 3: // RU 網元
            this.RUOptions.push( ne );
            break;
          case 4: // CUDU 網元
            this.CUDUOptions.push( ne );
            break
          case 5: // All-In-One 網元
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

  /** @2024/04/26 Add
   *  打開 "基站建立" 視窗
   *  @method openBsCreationWindow
   *  @returns {void}
   *  @description
   *    - 初始化並打開基站建立視窗，設置表單，並監聽視窗關閉事件
   */
  openBsCreationWindow() {

    // 表單驗證狀態重置
    this.bsCreationFormValidated = false;

    // 確保 bsList 可用後再創建表單
    this.createBsCreationForm( this.bsList.basestation );

    // 打開 "基站建立" 彈出視窗
    this.bsCreationWindowRef = this.dialog.open( this.bsCreationWindow, {
      id: 'bsCreationWindow',
      // 這裡可以設置彈出視窗的寬高，也可以使用 CSS 來設置
    });

    // 訂閱視窗關閉事件，並在關閉時重置表單驗證狀態
    this.bsCreationWindowRef.afterClosed().subscribe(() => {
      this.bsCreationFormValidated = false;
      // 進行一些清理工作，例如重置表單
      this.resetBsCreationForm();
    });

    // 打開視窗時加載未使用網元列表數據
    this.getUnusedNEList();

    // 初始化所有輸入的"基站建立"設定
    this.resetBsCreationForm();

    // 輸出相關的狀態信息
    console.log("When Open BS Creation Window the bsComponents", this.bsComponents);
    console.log("When Open BS Creation Window the selectedDUIds", this.selectedDUIds);
    console.log("When Open BS Creation Window the selectedRUIds", this.selectedRUIds);
    console.log("When Open BS Creation Window the connectedDUOptions", this.connectedDUOptions);
    console.log("When Open BS Creation Window the selectedFileName", this.selectedFileName);
    console.log("When Open BS Creation Window the bsCreationData", this.bsCreationData);
  }


  // 表示是否為線性流程，用戶必須按順序完成每個步驟
  isLinear = true;

  // 儲存基站名稱表單組
  bsFormGroup_Name!: FormGroup;

  // 儲存基站類型表單組
  bsFormGroup_Type!: FormGroup;

  // 儲存基站元素設定表單組
  bsFormGroup_Elements!: FormGroup;

  // 儲存基站描述和文件上傳表單組
  bsFormGroup_Description!: FormGroup;

  // @2024/04/28 Add
  // 設定 DU 可選擇的數量選項 - 目前最多設為 4 個 ( 可依未來規格調整進行擴充 )
  duNumberOptions = [ 1, 2, 3, 4 ]; 

  // @2024/04/28 Add
  // 設定 RU 可選擇的數量選項 - 目前最多設為 16 個 ( 可依未來規格調整進行擴充 )
  ruNumberOptions = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
  
  /** @2024/04/28 Add
   *  使用 Basestation[] 替代 any[] 以獲得更強的類型檢查
   *  @method uniqueBSNameValidator
   *  @param { Basestation[] } bsList - 基站列表
   *  @returns { ValidatorFn } 返回一個表單驗證器函數
   */
  uniqueBSNameValidator(bsList: Basestation[]): ValidatorFn {
    return ( control: AbstractControl ): ValidationErrors | null => {
      // 使用 'some' 方法檢查是否存在具有相同名稱的基站
      const nameExists = bsList.some( bs => bs.name === control.value );
      // 如果名稱存在，返回錯誤物件
      return nameExists ? { uniqueBSName: true } : null;
    };
  }


  /** @2024/04/28 Update - 改為會接收 bsList 為參數
   *  初始化每個用於「創建基站」流程的 FormGroup
   *  @method createBsCreationForm
   *  @param { Basestation[] } bsList - 基站列表，用於名稱檢查
   *  @returns { void }
   */
  createBsCreationForm( bsList: Basestation[] ) {

    // 步驟 1: 設定基站名稱，加入唯一名稱驗證
    this.bsFormGroup_Name = this.fb.group({
      BSName: ['', [Validators.required, this.uniqueBSNameValidator(bsList)]]
    });

    // 步驟 2: 設定基站類型和 DU、RU 的數量
    this.bsFormGroup_Type = this.fb.group({
        BSType: ['', Validators.required],
      DUNumber: ['', [Validators.required]], // 使用下拉選單控制
      RUNumber: ['', [Validators.required]]  // 使用下拉選單控制
    });

    // 步驟 3: 基於基站類型動態初始化網元和 GPS 表單
    this.bsFormGroup_Elements = this.fb.group({});
    this.bsFormGroup_Type.get('BSType')?.valueChanges.subscribe( ( bsType ) => {
      this.initializeElementsForm( bsType );
    });

    // 步驟 4: 設定基站地點描述和上傳配置文件
    this.bsFormGroup_Description = this.fb.group({
      LocationDescription: ['', Validators.required],
        ConfigurationFile: [null, Validators.required]
    });
  }

  /** @2024/04/29 Update
   *  用於重置所有輸入的"基站建立"設定
   *  @method resetBsCreationForm
   *  @returns { void }
   */
  resetBsCreationForm() {
    console.log("Resetting bs creation form settings.");

    // 重置各個步驟的 FormGroup
    this.bsFormGroup_Name.reset();
    this.bsFormGroup_Type.reset();
    this.bsFormGroup_Elements.reset();
    this.bsFormGroup_Description.reset();

    // 重置 bsComponents 網元信息
    this.bsComponents = {};

    // 重置已選擇的 DU 和 RU IDs
    this.selectedDUIds = [];
    this.selectedRUIds = [];

    // 重置可選擇的連接 DU 選項
    this.connectedDUOptions = [];

    // 重置 RUElementsFormArray 中的 connectedDU 控制項
    if ( this.bsFormGroup_Elements?.contains('RUElements') ) {
      const RUElementsArray = this.bsFormGroup_Elements.get('RUElements') as FormArray;
      RUElementsArray.controls.forEach( control => {
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

    console.log("BS creation form settings have been reset.");
  }

  /**
   * 獲取 DU 表單陣列
   * @returns { FormArray }
   */
  get DUElementsFormArray(): FormArray {
    return this.bsFormGroup_Elements.get('DUElements') as FormArray;
  }

  /**
   * 獲取 RU 表單陣列
   * @returns { FormArray }
   */
  get RUElementsFormArray(): FormArray {
    return this.bsFormGroup_Elements.get('RUElements') as FormArray;
  }


  /** @2024/04/29 Update
   *  處理基站類型選擇的變化
   *  @method onBSTypeChange
   *  @param { string } typeValue - 使用者選擇的基站類型
   *  @returns { void }
   *  @description
   *    - 根據選擇的基站類型更新表單狀態和驗證要求
   */
  onBSTypeChange( typeValue: string ) {

    // 監聽用戶的選擇並更新 bsCreationData 中的 bstype
    this.bsCreationData.bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;

    // 判斷基站類型是否為分佈式 ('dist')
    if ( typeValue === 'dist' ) {

      // 啟用 DU 和 RU 的數量選擇
      this.bsFormGroup_Type.get('DUNumber')?.enable();
      this.bsFormGroup_Type.get('RUNumber')?.enable();

      // 如果已有預設的 DU 和 RU 數量，立即更新相應的表單
      const DUNumber = this.bsFormGroup_Type.get('DUNumber')?.value || 0;
      const RUNumber = this.bsFormGroup_Type.get('RUNumber')?.value || 0;

      // 根據 DU 和 RU 的數量來更新或初始化 FormArray
      this.updateElementsForm( DUNumber, RUNumber );
    } else {

      // 如非分佈式選擇，則禁用 DU 和 RU 的數量選擇
      this.bsFormGroup_Type.get('DUNumber')?.disable();
      this.bsFormGroup_Type.get('RUNumber')?.disable();

      // 清除步驟 3 中的表單元素，以重置表單狀態
      this.clearDuRuElementsForm();
    }
  }


  /** @2024/04/28 Add
   *  準備進入第三步
   *  @method prepareForStep3
   *  @returns {void}
   *  @description
   *    - 根據基站類型為 'dist' 時更新 DU 和 RU 的表單數量及驗證狀態
   */
  prepareForStep3() {

    // 檢查基站類型是否為 'dist'
    if ( this.bsFormGroup_Type.get('BSType')?.value === 'dist' ) {

      // 從表單獲取 DU 和 RU 的數量，預設為 0
      const DUNumber = this.bsFormGroup_Type.get('DUNumber')?.value || 0;
      const RUNumber = this.bsFormGroup_Type.get('RUNumber')?.value || 0;

      // 更新 DU 和 RU 的表單陣列
      this.updateElementsForm( DUNumber, RUNumber );

      // 輸出 DU 和 RU 表單的驗證狀態
      console.log( 'DU FormArray Valid?', this.DUElementsFormArray.valid );
      console.log( 'RU FormArray Valid?', this.RUElementsFormArray.valid );
    }
  }

  /** @2024/04/28 Add
   *  檢查進第四步驟之前的表單是否有通過驗證
   *  @method checkBefore4StepsFormsValidity
   *  @returns { boolean }
   *  @description
   *    - 檢查基站名稱、類型和元素表單組的驗證狀態，決定是否可進入下一步
   */
  checkBefore4StepsFormsValidity() {
    
    // 輸出基站名稱、類型和元素表單組的驗證狀態
    console.log( 'BS Name FormGroup Valid?', this.bsFormGroup_Name.valid );
    console.log( 'BS Type FormGroup Valid?', this.bsFormGroup_Type.valid );
    console.log( 'BS Elements FormGroup Valid?', this.bsFormGroup_Elements.valid );

    // 如所有 FormGroup 都有效，則可進下一步
    if ( this.bsFormGroup_Name.valid && this.bsFormGroup_Type.valid &&
          this.bsFormGroup_Elements.valid ) {

      // 所有表單如都有效，就進下一步
      console.log( 'All forms are valid, can proceed to the next step.' );
      return true;
    } else {

      // 有一個或多個表單無效，則不能進下一步
      console.log( 'One or more forms are invalid, cannot proceed to the next step.' );
      return false;
    }
  }

  /** @2024/04/28 Add
   *  檢查所有表單是否有通過驗證
   *  @method checkAllFormsValidity
   *  @returns { boolean }
   *  @description
   *    - 檢查所有表單組的驗證狀態，決定是否可進入下一步
   */
  checkAllFormsValidity() {

    // 輸出所有表單組的驗證狀態
    console.log( 'BS Name FormGroup Valid?', this.bsFormGroup_Name.valid );
    console.log( 'BS Type FormGroup Valid?', this.bsFormGroup_Type.valid );
    console.log( 'BS Elements FormGroup Valid?', this.bsFormGroup_Elements.valid );
    console.log( 'BS Description FormGroup Valid?', this.bsFormGroup_Description.valid );

    // 如所有 FormGroup 都有效，則可進下一步
    if ( this.bsFormGroup_Name.valid && this.bsFormGroup_Type.valid &&
            this.bsFormGroup_Elements.valid && this.bsFormGroup_Description.valid ) {
      
      // 所有表單如都有效，就進下一步
      console.log( 'All forms are valid, can proceed to the next step.' );
      return true;

    } else {

      // 有一個或多個表單無效，則不能進下一步
      console.log( 'One or more forms are invalid, cannot proceed to the next step.' );
      return false;
    }
  }

  /** @2024/04/28 Add
   *  切換 CU 設置面板的顯示狀態
   *  @method toggleNeCuSet
   *  @returns {void}
   *  @description
   *    - 切換 CU 設置面板的顯示或隱藏
   */
  toggleNeCuSet() {
    // 選擇 CU 設置面板的標頭元素
    const neCuSetHeader = document.querySelector('.ne-cu-set-wrap label');
    // 切換 'active' 類，用於顯示或隱藏
    neCuSetHeader?.classList.toggle('active');
  }

  /** @2024/04/28 Add
   *  切換 DU 設置面板的顯示狀態
   *  @method toggleNeDuSet
   *  @returns {void}
   *  @description
   *    - 切換 DU 設置面板的顯示或隱藏
   */
  toggleNeDuSet() {
    // 選擇 DU 設置面板的標頭元素
    const neDuSetHeader = document.querySelector('.ne-du-set-wrap label');
    // 切換 'active' 類，用於顯示或隱藏
    neDuSetHeader?.classList.toggle('active');
  }

  /** @2024/04/28 Add
   *  切換 RU 設置面板的顯示狀態
   *  @method toggleNeRuSet
   *  @returns {void}
   *  @description
   *    - 切換 RU 設置面板的顯示或隱藏
   */
  toggleNeRuSet() {
    // 選擇 RU 設置面板的標頭元素
    const neRuSetHeader = document.querySelector('.ne-ru-set-wrap label');
    // 切換 'active' 類，用於顯示或隱藏
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

  /**
   * @2024/04/28 Add
   * 初始化步驟 3 的 FormGroup
   * @method initializeElementsForm
   * @param bsType 基站類型
   * @returns {void}
   * @description
   * - 根據基站類型初始化不同的表單組
   */
  initializeElementsForm( bsType: string ) {

    if ( bsType === 'allInOne' ) {

      // 初始化 all-in-one 類型的表單
      this.bsFormGroup_Elements = this.fb.group({
          allInOneElement: ['', Validators.required],
        allInOneLongitude: ['', [Validators.required, Validators.pattern( this.longitudePattern )]],
         allInOneLatitude: ['', [Validators.required, Validators.pattern( this.latitudePattern ) ]],
      });

    } else if ( bsType === 'dist' ) {
      
      // 初始化分布式類型的表單
      this.bsFormGroup_Elements = this.fb.group({
        CUElement: ['', Validators.required],
        DUElements: this.fb.array([]),
        RUElements: this.fb.array([]),
      });
    }
  }

  /**
   * 清除所有相關的表單控件
   * @method clearDuRuElementsForm
   * @returns {void}
   * @description
   * - 清空 DU 和 RU 表單陣列
   */
  clearDuRuElementsForm() {
    if ( this.bsFormGroup_Elements?.contains('DUElements') ) {
      const DUElementsArray = this.bsFormGroup_Elements.get('DUElements') as FormArray;
      DUElementsArray.clear();  // 清空 DU 表單陣列
    }
    if ( this.bsFormGroup_Elements?.contains('RUElements') ) {
      const RUElementsArray = this.bsFormGroup_Elements.get('RUElements') as FormArray;
      RUElementsArray.clear();  // 清空 RU 表單陣列
    }
    console.log("已清空 bsFormGroup_Elements - DUElements、RUElements 的 formArray");
  }

  /**
   * @2024/04/28 Add
   * 依據使用者設定的 DU、RU 數量設置對應數量的設定表單
   * @method updateElementsForm
   * @param DUNumber DU 數量
   * @param RUNumber RU 數量
   * @returns {void}
   * @description
   * - 根據提供的 DU 和 RU 數量初始化對應的表單陣列
   */
  updateElementsForm( DUNumber: number, RUNumber: number ) {
    this.initializeDUElementsForm( DUNumber );  // 初始化 DU 表單陣列
    this.initializeRUElementsForm( RUNumber );  // 初始化 RU 表單陣列
  }

  /**
   * @2024/04/28 Add
   * 依據使用者設定數量設置對應數量的 DU 設定表單
   * @method initializeDUElementsForm
   * @param DUNumber DU 數量
   * @returns {void}
   * @description
   * - 為每個 DU 創建一個表單控制項，並加入到 DUElements 表單陣列中
   */
  initializeDUElementsForm( DUNumber: number ) {
    const DUElementsArray = this.bsFormGroup_Elements.get('DUElements') as FormArray;
    DUElementsArray.clear();  // 先清空現有的表單陣列
    for ( let i = 0; i < DUNumber; i++ ) {
      DUElementsArray.push( this.fb.group({
        DUElement: ['', Validators.required],
        // 可以根據需求添加其他控制項
      }));
    }
  }

  /**
   * @2024/04/28 Add
   * 依據使用者設定數量設置對應數量的 RU 設定表單
   * @method initializeRUElementsForm
   * @param RUNumber RU 數量
   * @returns {void}
   * @description
   * - 為每個 RU 創建一個表單控制項，包含位置和連接的 DU，並加入到 RUElements 表單陣列中
   */
  initializeRUElementsForm( RUNumber: number ) {
    const RUElementsArray = this.bsFormGroup_Elements.get('RUElements') as FormArray;
    RUElementsArray.clear();  // 先清空現有的表單陣列
    for ( let i = 0; i < RUNumber; i++ ) {
      RUElementsArray.push(this.fb.group({
        RUElement:   ['', Validators.required],
        longitude:   ['', [Validators.required, Validators.pattern(this.longitudePattern)]],  // 經度
        latitude:    ['', [Validators.required, Validators.pattern(this.latitudePattern)]],   // 緯度
        connectedDU: ['', Validators.required],  // RU 可連接的 DU
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

  /**
   * @2024/04/29 Add
   * 提交步驟 3 的表單並更新網元訊息
   * @method onStep3Submit
   * @returns {void}
   * @description
   * - 根據基站類型，更新不同類型基站的網元訊息
   */
  onStep3Submit() {
    // 從表單中獲取基站類型
    const bstype = this.bsFormGroup_Type.get('BSType')?.value;
    // 根據基站類型調用相應的更新函數
    if (bstype === 'allInOne') {
      this.updateBsComponentsForAllInOne();  // 更新 all-in-one 型基站的網元訊息
    } else if (bstype === 'dist') {
      this.updateBsComponentsForDistributed();  // 更新分布式基站的網元訊息
    }
  }

  /**
   * 更新 all-in-one 型基站的網元訊息
   * @method updateBsComponentsForAllInOne
   * @returns {void}
   * @description
   * - 更新 all-in-one 型基站的網元訊息，包括位置和網元 ID
   */
  updateBsComponentsForAllInOne() {
    // 從表單中獲取選擇的網元 ID 和位置訊息
    const selectedId = this.bsFormGroup_Elements.get('allInOneElement')?.value;
    const  longitude = this.bsFormGroup_Elements.get('allInOneLongitude')?.value;
    const   latitude = this.bsFormGroup_Elements.get('allInOneLatitude')?.value;
    // 格式化位置數據為字串
    const position = `[${longitude},${latitude}]`;

    // 如果有選擇的網元 ID，則更新 bsComponents 對象
    if ( selectedId ) {
      this.bsComponents.all = [{
        type: 'cu+du+ru',  // 指定網元類型
        id: selectedId,    // 網元 ID
        position: position // 網元位置
      }];
    }

    // 輸出選擇的組件訊息和位置
    console.log( "selected All-In-One ID:", selectedId );
    console.log( "this.bsComponents:", this.bsComponents );
  }


  // @2024/04/30 Add 
  duCount: number = 0; // 記錄已選擇的 DU 網元數量
  ruCount: number = 0; // 記錄已選擇的 RU 網元數量

  /**
   * @2024/04/30 Update
   * 更新分布式基站的網元訊息
   * @method updateBsComponentsForDistributed
   * @returns {void}
   * @description
   * - 根據表單選擇更新分布式基站的 CU、DU、RU 網元訊息，並計算各網元數量
   */
  updateBsComponentsForDistributed() {
    // 從表單中獲取選擇的 CU ID
    const selectedCUId = this.bsFormGroup_Elements.get('CUElement')?.value;
    // 如果選擇了 CU，則更新 bsComponents 對象
    if ( selectedCUId ) {
      this.bsComponents.cu = [{
        type: 'cu',
        id: selectedCUId,
        name: this.CUOptions.find( cu => cu.id === selectedCUId )?.name || ''
      }];
    }
    
    // 過濾並映射 DUElements 表單陣列，生成 DU 網元訊息列表
    this.bsComponents.du = this.DUElementsFormArray.controls
      .filter( du => du.get('DUElement')?.value )
      .map( du => {
        const id = du.get('DUElement')?.value;
        return {
          type: 'du',
          id: id,
          name: this.DUOptions.find( duOption => duOption.id === id )?.name || ''
        };
      });
    
    // 過濾並映射 RUElements 表單陣列，生成 RU 網元訊息列表
    this.bsComponents.ru = this.RUElementsFormArray.controls
      .filter( ru => ru.get('RUElement')?.value )
      .map( ru => {
        const id = ru.get('RUElement')?.value;
        const connectedDUId = ru.get('connectedDU')?.value;
        const longitude = ru.get('longitude')?.value;
        const latitude = ru.get('latitude')?.value;
        const position = `[${longitude},${latitude}]`;

        return {
          type: 'ru',
          id: id,
          name: this.RUOptions.find( ruOption => ruOption.id === id )?.name || '',
          duid: connectedDUId,
          duName: this.DUOptions.find( du => du.id === connectedDUId )?.name || '',
          position: position
        };
      });

    // 計算選中的 DU 和 RU 網元的數量
    this.duCount = this.bsComponents.du?.length || 0;
    this.ruCount = this.bsComponents.ru?.length || 0;

    // 輸出選擇的 CU ID 和網元訊息，以及 DU 和 RU 的數量
    console.log( "selectedCUId:", selectedCUId);
    console.log( "this.bsComponents:", this.bsComponents );
    console.log( "this.duCount:", this.duCount );
    console.log( "this.ruCount:", this.ruCount );
  }


  // 儲存已選擇的 DU IDs
  selectedDUIds: string[] = [];

  /**
   * @2024/05/02 Update
   * 更新 DU 選項
   * @method updateDUOptions
   * @returns {void}
   * @description
   * - 更新表單中 DU 選項的顯示，防止顯示重複的選項
   */
  updateDUOptions() {
    // 遍歷表單控件，獲取每個控件中選擇的 DU ID
    this.DUElementsFormArray.controls.forEach( ( control, index ) => {
      const selectedDUId = control.get('DUElement')?.value;  // 從表單控件中獲取 DU ID
      if ( selectedDUId ) {
        this.selectedDUIds[index] = selectedDUId;  // 若有選擇，則更新 selectedDUIds 數組
      }
    });

    // 使用 Set 去除重複的 DU ID
    const uniqueSelectedDUIds = Array.from( new Set( this.selectedDUIds ) );

    // 更新每個控件的選項，避免顯示已選擇的選項
    this.DUElementsFormArray.controls.forEach(( control, index ) => {
      const filteredDUOptions = this.DUOptions.filter( du => !uniqueSelectedDUIds.includes(du.id) || du.id === this.selectedDUIds[index] );
      const uniqueFilteredDUOptions = filteredDUOptions.filter(( du, idx, self ) =>
        idx === self.findIndex( d => d.id === du.id )  // 確保選項不重複
      );
      control.get('DUElement')?.setValidators([Validators.required]);  // 設定驗證器為必填
      control.get('DUElement')?.updateValueAndValidity();  // 更新表單控件的有效性狀態
    });
  }

  // 儲存已選擇的 RU IDs
  selectedRUIds: string[] = [];

  /**
   * @2024/05/02 Update
   * 更新 RU 選項
   * @method updateRUOptions
   * @returns {void}
   * @description
   * - 更新表單中 RU 選項的顯示，防止顯示重複的選項
   */
  updateRUOptions() {
    // 遍歷 RUElementsFormArray 的控件，獲取選擇的 RU ID
    this.RUElementsFormArray.controls.forEach((control, index) => {
      const selectedRUId = control.get('RUElement')?.value;  // 從表單控件中獲取 RU ID
      if (selectedRUId) {
        this.selectedRUIds[index] = selectedRUId;  // 若有選擇，則更新 selectedRUIds 數組
      }
    });

    // 使用 Set 去除重複的 RU ID
    const uniqueSelectedRUIds = Array.from(new Set(this.selectedRUIds));

    // 更新每個控件的選項，避免顯示已選擇的選項
    this.RUElementsFormArray.controls.forEach((control, index) => {
      const filteredRUOptions = this.RUOptions.filter(ru => !uniqueSelectedRUIds.includes(ru.id) || ru.id === this.selectedRUIds[index]);
      const uniqueFilteredRUOptions = filteredRUOptions.filter((ru, idx, self) =>
        idx === self.findIndex(r => r.id === ru.id)  // 確保選項不重複
      );
      control.get('RUElement')?.setValidators([Validators.required]);  // 設定驗證器為必填
      control.get('RUElement')?.updateValueAndValidity();  // 更新表單控件的有效性狀態
    });
  }

  // 用於儲存 RU 可連接的 DU 網元
  connectedDUOptions: UnusedNE[] = []; 

  /** @2024/04/30 Add
    * 更新已連接的 DU 選項
    * @method updateConnectedDUOptions
    * @returns {void}
    * @description
    * - 更新連接到的 DU 選項，去除重複項目
    */
  updateConnectedDUOptions() {
    // 使用 Set 去除 selectedDUIds 中的重複項目
    const uniqueSelectedDUIds = Array.from(new Set(this.selectedDUIds));
    // 過濾 DUOptions 以得到與選擇的 ID 相符的選項
    this.connectedDUOptions = this.DUOptions.filter(du => uniqueSelectedDUIds.includes(du.id));

    // 去重複項目操作：過濾掉 connectedDUOptions 中的重複數據
    this.connectedDUOptions = this.connectedDUOptions.filter((du, index, self) =>
      index === self.findIndex((d) => d.id === du.id)  // 根據 ID 去重
    );

    // 輸出當前已連接的 DU 選項
    console.log("In updateConnectedDUOptions(), the connectedDUOptions:", this.connectedDUOptions);
  }

  // 定義 Sample 檔名稱 @2024/05/02 Add
  sampleFileName = 'BS_parameters_sample.xlsx'; 

  /** @2024/05/02 Update
   *  產生基站參數樣本檔案
   *  @method generateSampleConf
   *  @returns { void }
   *  @description
   *  - 根據使用者選擇的基站類型（一體式或分佈式），生成對應的基站參數配置樣本檔案
   *  - 使用 XLSX 庫讀取預設的樣本 Excel 檔案，並根據使用者的設置修改相應的單元格內容
   *  - 處理不同類型的基站（CU、DU、RU）的參數配置，包括 gNBCUFunction、NRCellCU、gNBDUFunction、NRCellDU 等
   *  - 使用 XLSX 的工具函數（如 sheet_add_aoa）向 Excel 檔案的指定工作表中寫入數據
   *  - 生成的樣本檔案包含了基站的各個組件（如 CU、DU、RU）的參數配置，以及它們之間的關聯關係
   *  - 最終將修改後的 Excel 檔案寫入到本地，供使用者下載
   *  @note
   *  - 這個函數涉及到複雜的 Excel 操作，需要對 XLSX 庫有一定的了解
   *  - 函數中使用了大量的硬編碼索引（如 'A2'、'B2' 等），這使得代碼的可讀性和維護性降低
   *  - 可以考慮將一些常量或重複使用的字串提取出來，定義為單獨的變數，以提高代碼的可讀性
   **/
  generateSampleConf() {
    console.log( this.bsComponents ); // 打印基站組件的相關訊息
   
    // 獲取使用者選擇的基站類型（一體式或分佈式）
    const typeValue = this.bsFormGroup_Type.get('BSType')?.value;

    // 根據基站類型設置對應的數字標識（1：一體式，2：分佈式）
    const bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;
   
    // 發送 HTTP GET 請求，獲取預設的基站參數樣本 Excel 檔案
    this.http.get( 'assets/' + this.sampleFileName, { responseType: 'arraybuffer' } ).subscribe({
      next: ( buffer: ArrayBuffer ) => {
        // 使用 XLSX 庫讀取 Excel 檔案
        const workbook = XLSX.read( new Uint8Array( buffer ), { type: 'array' } );
        console.log( workbook ); // 打印讀取到的 Excel 工作簿對象
        
        // 根據基站類型，向相應的工作表中寫入數據
        if ( bstype === "1" ) {

          // 一體式基站，寫入 gNBCUFunction、NRCellCU、gNBDUFunction、NRCellDU 工作表
          XLSX.utils.sheet_add_aoa( workbook.Sheets['gNBCUFunction'], [[this.bsComponents.all![0].id]], { origin: 'A2' } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['NRCellCU'], [[this.bsComponents.all![0].id]], { origin: 'A2' } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['gNBDUFunction'], [[this.bsComponents.all![0].id]], { origin: 'A2' } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['NRCellDU'], [[this.bsComponents.all![0].id]], { origin: 'A2' } );

        } else {

          // 分佈式基站，只寫入 gNBCUFunction 工作表
          XLSX.utils.sheet_add_aoa( workbook.Sheets['gNBCUFunction'], [[this.bsComponents.cu![0].id]], { origin: 'A2' } )
        }
        
        // 定義 CU 的參數配置鍵
        const cuKeys = [{ f: 'gNBCUFunction!D2' }, { f: 'gNBCUFunction!E2' }, { f: 'gNBCUFunction!G2' }, { f: 'gNBCUFunction!H2' }];
        // 向 peeParametersList_CU、vnfParametersList_CU、EP_NgC、EP_NgU 工作表寫入 CU 的參數配置鍵
        XLSX.utils.sheet_add_aoa( workbook.Sheets['peeParametersList_CU'], [cuKeys], { origin: 'B2' } );
        XLSX.utils.sheet_add_aoa( workbook.Sheets['vnfParametersList_CU'], [cuKeys], { origin: 'B2' } );
        XLSX.utils.sheet_add_aoa( workbook.Sheets['EP_NgC'], [cuKeys], { origin: 'B2' } );
        XLSX.utils.sheet_add_aoa( workbook.Sheets['EP_NgU'], [cuKeys], { origin: 'B2' } );
   
        // 根據 DU 的數量，向 EP_F1C_CU、EP_F1U_CU 工作表寫入 CU 的參數配置鍵
        for ( let i = 0; i < this.duCount; i++ ) {
          const originIndex = 'B' + ( i + 2 );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['EP_F1C_CU'], [cuKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['EP_F1U_CU'], [cuKeys], { origin: originIndex } );
        }
   
        // 根據 RU 的數量，向 NRCellCU 工作表寫入 CU 的參數配置鍵
        for ( let i = 0; i < this.ruCount; i++ ) {
          let cuKeys: any[] = [];
          if ( bstype === "1" ) {
            cuKeys = [this.bsComponents.all![0].id, '', ...cuKeys];
          } else {
            cuKeys = [this.bsComponents.ru![i].id, '', ...cuKeys];
          }
          const originIndex = 'A' + ( i + 2 );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['NRCellCU'], [cuKeys], { origin: originIndex } );
          if ( bstype === "2" ) {
            workbook.Sheets['NRCellCU']['A' + ( i + 2 )].c = [{ a: 'iRM', t: this.bsComponents.ru![i].name }];
            workbook.Sheets['NRCellCU']['A' + ( i + 2 )].c.hidden = true;
          }
        }
   
        // 根據 RU 的數量，向 peeParametersList_NRCellCU、vnfParametersList_NRCellCU、s_NSSAI_leafList_NRCellCU 工作表寫入 NRCellCU 的參數配置鍵
        for ( let i = 0; i < this.ruCount; i++ ) {
          const originIndex = 'B' + ( i + 2 );
          const cellCuKeys = [
            { f: 'NRCellCU!C' + (i + 2) },
            { f: 'NRCellCU!D' + (i + 2) },
            { f: 'NRCellCU!E' + (i + 2) },
            { f: 'NRCellCU!F' + (i + 2) },
            { f: 'NRCellCU!G' + (i + 2) }
          ];
          XLSX.utils.sheet_add_aoa( workbook.Sheets['peeParametersList_NRCellCU'], [cellCuKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['vnfParametersList_NRCellCU'], [cellCuKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['s_NSSAI_leafList_NRCellCU'], [cellCuKeys], { origin: originIndex } );
        }
   
        // 根據 DU 的數量，向 gNBDUFunction 工作表寫入 DU 的參數配置鍵
        for ( let i = 0; i < this.duCount; i++ ) {
          let cuKeys: any[] = [];
          if ( bstype === "1" ) {
            cuKeys = [this.bsComponents.all![0].id, '', '', '', ...cuKeys];
          } else {
            cuKeys = [this.bsComponents.du![i].id, '', '', '', ...cuKeys];
          }
          const originIndex = 'A' + ( i + 2 );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['gNBDUFunction'], [cuKeys], { origin: originIndex } );
          if ( bstype === "2" ) {
            workbook.Sheets['gNBDUFunction']['A' + (i + 2)].c = [{ a: 'iRM', t: this.bsComponents.du![i].name }];
            workbook.Sheets['gNBDUFunction']['A' + (i + 2)].c.hidden = true;
          }
   
          // 定義 DU 的參數配置鍵
          const duKeys = [
            { f: 'gNBDUFunction!C' + (i + 2) },
            { f: 'gNBDUFunction!E' + (i + 2) },
            { f: 'gNBDUFunction!F' + (i + 2) },
            { f: 'gNBDUFunction!G' + (i + 2) },
            { f: 'gNBDUFunction!H' + (i + 2) }
          ];
          const duOriginIndex = 'B' + ( i + 2 );
          // 向 peeParametersList_DU、vnfParametersList_DU、EP_F1C_DU、EP_F1U_DU 工作表寫入 DU 的參數配置鍵
          XLSX.utils.sheet_add_aoa( workbook.Sheets['peeParametersList_DU'], [duKeys], { origin: duOriginIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['vnfParametersList_DU'], [duKeys], { origin: duOriginIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['EP_F1C_DU'], [duKeys], { origin: duOriginIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['EP_F1U_DU'], [duKeys], { origin: duOriginIndex } );
        }
   
        // 根據 RU 的數量，向 NRCellDU 工作表寫入 DU 的參數配置鍵
        for ( let i = 0; i < this.ruCount; i++ ) {
          const duIndex = this.getDuIndexByRuIndex( i );
          let duKeys: any[] = [];
          if ( duIndex >= 0 ) {
            if ( bstype === "1" ) {
              duKeys = [this.bsComponents.all![0].id, '', ...duKeys, { f: 'NRCellCU!G' + (i + 2) }];
            } else {
              duKeys = [this.bsComponents.ru![i].id, '', ...duKeys, { f: 'NRCellCU!G' + (i + 2) }];
            }
          }
          const originIndex = 'A' + (i + 2);
          XLSX.utils.sheet_add_aoa(workbook.Sheets['NRCellDU'], [duKeys], { origin: originIndex });
          if ( bstype === "2" ) {
            workbook.Sheets['NRCellDU']['A' + (i + 2)].c = [{ a: 'iRM', t: this.bsComponents.ru![i].name }];
            workbook.Sheets['NRCellDU']['A' + (i + 2)].c.hidden = true;
          }
   
          // 定義 NRCellDU 的參數配置鍵
          const cellDuKeys = ['', { f: 'NRCellDU!C' + (i + 2) }, { f: 'NRCellDU!D' + (i + 2) }, { f: 'NRCellDU!E' + (i + 2) }, { f: 'NRCellDU!F' + (i + 2) }, { f: 'NRCellDU!G' + (i + 2) }, { f: 'NRCellDU!H' + (i + 2) }];
          // 向 peeParametersList_NRCellDU、vnfParametersList_NRCellDU、s_NSSAI_leafList_NRCellDU、NRSectorCarrierRef_NRCellDU、bWPRef_leafList_NRCellDU 工作表寫入 NRCellDU 的參數配置鍵
          XLSX.utils.sheet_add_aoa( workbook.Sheets['peeParametersList_NRCellDU'], [cellDuKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['vnfParametersList_NRCellDU'], [cellDuKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['s_NSSAI_leafList_NRCellDU'], [cellDuKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['NRSectorCarrierRef_NRCellDU'], [cellDuKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['bWPRef_leafList_NRCellDU'], [cellDuKeys], { origin: originIndex } );
   
          // 定義 NRSectorCarrier 的參數配置鍵
          const nrSectorKeys = ['', { f: 'NRSectorCarrierRef_NRCellDU!B' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!C' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!D' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!E' + (i + 2) }, { f: 'NRSectorCarrierRef_NRCellDU!F' + (i + 2) }];
          // 向 NRSectorCarrier 工作表寫入 NRSectorCarrier 的參數配置鍵
          XLSX.utils.sheet_add_aoa( workbook.Sheets['NRSectorCarrier'], [nrSectorKeys], { origin: originIndex } );
   
          // 定義 NRSectorCarrier 的參數配置鍵（第二部分）
          const nrSectorKeys2 = ['', { f: 'NRSectorCarrier!B' + (i + 2) }, { f: 'NRSectorCarrier!C' + (i + 2) }, { f: 'NRSectorCarrier!D' + (i + 2) }, { f: 'NRSectorCarrier!E' + (i + 2) }, { f: 'NRSectorCarrier!F' + (i + 2) }, { f: 'NRSectorCarrier!A' + (i + 2) }];
          // 向 peeParametersList_NRSector、vnfParametersList_NRSector 工作表寫入 NRSectorCarrier 的參數配置鍵（第二部分）
          XLSX.utils.sheet_add_aoa( workbook.Sheets['peeParametersList_NRSector'], [nrSectorKeys2], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['vnfParametersList_NRSector'], [nrSectorKeys2], { origin: originIndex } );
   
          // 定義 BWP 的參數配置鍵
          const bwpRefKey = ['', { f: 'bWPRef_leafList_NRCellDU!B' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!C' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!D' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!E' + (i + 2) }, { f: 'bWPRef_leafList_NRCellDU!F' + (i + 2) }];
          // 向 BWP 工作表寫入 BWP 的參數配置鍵
          XLSX.utils.sheet_add_aoa( workbook.Sheets['BWP'], [bwpRefKey], { origin: originIndex } );

          // 定義 BWP 的參數配置鍵（第二部分）
          const bwpKeys = ['', { f: 'BWP!B' + (i + 2) }, { f: 'BWP!C' + (i + 2) }, { f: 'BWP!D' + (i + 2) }, { f: 'BWP!E' + (i + 2) }, { f: 'BWP!F' + (i + 2) }, { f: 'BWP!A' + (i + 2) }];
          // 向 peeParametersList_BWP、vnfParametersList_BWP 工作表寫入 BWP 的參數配置鍵（第二部分）
          XLSX.utils.sheet_add_aoa( workbook.Sheets['peeParametersList_BWP'], [bwpKeys], { origin: originIndex } );
          XLSX.utils.sheet_add_aoa( workbook.Sheets['vnfParametersList_BWP'], [bwpKeys], { origin: originIndex } );
        }

        // 將修改後的 Excel 工作簿寫入到本地檔案
        XLSX.writeFile( workbook, this.sampleFileName );
      },
      error: ( error ) => {
        // 處理獲取檔案時的錯誤
        console.error('Error fetching file:', error);
      },
      complete: () => {
        // 在完成生成樣本檔案後，記錄一條成功訊息
        console.log('基站參數配置樣本檔(.xlsx) - 產生成功');
      }
    });
  }

  /** @2024/04/30 Add 
    * 根據 RU 的索引獲取對應的 DU 索引
    * @method getDuIndexByRuIndex
    * @param {number} ruIndex - RU 的索引
    * @returns {number} - 對應的 DU 索引，如果沒有找到則返回 -1
    */
  getDuIndexByRuIndex( ruIndex: number ): number {

    // 獲取使用者選擇的基站類型（一體式或分佈式）
    const typeValue = this.bsFormGroup_Type.get('BSType')?.value;

    // 根據基站類型設置對應的數字標識（1：一體式，2：分佈式）
    const bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;
  
    // 如果是一體式基站，直接返回 0，因為只有一個 DU
    if ( bstype === "1" ) {
      return 0;
    }
  
    // 獲取指定 RU 對應的 DU ID
    const duId = this.bsComponents.ru![ruIndex].duid;
  
    // 遍歷所有的 DU
    for ( let i = 0; i < this.bsComponents.du!.length; i++ ) {
      // 如果找到了匹配的 DU ID，返回對應的索引
      if ( duId === this.bsComponents.du![i].id ) {
        return i;
      }
    }
  
    // 如果沒有找到匹配的 DU，返回 -1
    return -1;
  }

  /**
   * @2024/04/28 Add
   * 引用 DOM 中的 'fileInput' 元素
   * @ViewChild - Angular 裝飾器,用於訪問模板中的 DOM 元素
   * @type { ElementRef }
   */
  @ViewChild('fileInput') fileInput!: ElementRef;

  /**
   * @2024/04/28 Add
   * 觸發文件輸入元素的點擊事件
   * @method triggerFileInput
   * @returns {void}
   * @description
   * - 直接操作 DOM,觸發 input 元素的 click 事件
   */
  triggerFileInput() {
    // 使用 nativeElement 屬性訪問實際的 DOM 元素並調用 click 方法
    this.fileInput.nativeElement.click();
  }

  /**
   * @2024/04/28 Add
   * 儲存用戶選擇的文件名
   * @type {string} 初始化為空字符串
   */
  selectedFileName: string = '';

  /**
   * @2024/04/28 Add
   * 文件選擇事件處理函數
   * @method onFileSelected
   * @param event 文件選擇事件
   * @returns {void}
   * @description
   * - 處理文件輸入元素的 change 事件, 獲取選擇的文件
   */
  onFileSelected( event: Event ) {
    // 從事件中獲取當前目標元素，並將其轉型為 HTMLInputElement
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;  // 定義一個變量來存儲選擇的文件，初始化為 null

    // 檢查該輸入元素是否有文件被選擇
    if ( element.files && element.files.length > 0 ) {
        // 獲取第一個選擇的文件
        file = element.files.item( 0 );
    }

    // 如果有文件被選擇
    if ( file ) {
        // 更新表單控件 'ConfigurationFile' 的值
        this.bsFormGroup_Description.patchValue( {ConfigurationFile: file} );
        // 更新選擇的文件名稱，用於顯示或其他邏輯
        this.selectedFileName = file.name;
        // 調用處理文件的方法
        this.handleBsParametersFile( file );
    }
  }

  /**
  * @2024/04/28 Add
  * 檢查文件是否已上傳並標記為 touched
  * @method checkAndMarkFileAsTouched
  * @returns {void}
  * @description
  * - 用於表單驗證, 確保用戶已選擇文件
  */
  checkAndMarkFileAsTouched() {
    // 檢查表單控件 'ConfigurationFile' 是否有文件被選擇
    if ( !this.bsFormGroup_Description.get('ConfigurationFile')?.value ) {
        // 若無文件被選擇，將該表單控件標記為 touched，用於觸發任何相關的驗證消息顯示
        this.bsFormGroup_Description.get('ConfigurationFile')?.markAsTouched();
    }
  }

  /** @2024/05/02 Update
   *  處理基站參數文件
   *  @param {File} file 上傳的文件
   *  @method handleBsParametersFile
   *  @returns {void}
   *  @description
   *  - 讀取文件並解析為 JSON 對象
   */
  handleBsParametersFile( file: File ) {

    // 創建 FileReader 實例，用於讀取文件
    const reader: FileReader = new FileReader();

    // 當文件讀取完成時觸發的事件
    reader.onload = ( e: any ) => {
      // 從事件中提取 ArrayBuffer，即文件的二進制數據
      const arrayBuffer: ArrayBuffer = e.target.result;

      // 使用 XLSX.read 函數來讀取 ArrayBuffer，指定讀取類型為 'array'
      const workbook: XLSX.WorkBook = XLSX.read( arrayBuffer, { type: 'array' } );
      // 初始化一個空對象來存儲從每個工作表解析出來的數據
      const allData: { [key: string]: any[] } = {};

      // 遍歷所有工作表的名稱
      workbook.SheetNames.forEach( function( sheetName ) {
        // 將每個工作表轉換為 JSON 對象
        const object = XLSX.utils.sheet_to_json( workbook.Sheets[sheetName] );
        // 將轉換後的數據儲存到 allData 對象中
        allData[sheetName] = object;  // 儲存處理後的數據
      });

      // 將解析的數據存儲到應用的 state 或 model 中
      this.bsCreationData.componentsInfo = allData;  // 更新應用數據
    };

    // 使用 readAsArrayBuffer 方法讀取文件，這是一種安全且更新的方法來處理文件數據
    reader.readAsArrayBuffer( file );
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

  /** @2024/04/30 Update
   *  用於每步驟刷新收集建立基站 POST 所需之 JSON 數據
   *  @method updateBsCreationData
   *  @returns {void}
   *  @description
   *    - 依據用戶在表單中的輸入，更新用於提交基站建立請求的數據
   */
  updateBsCreationData() {

    // 從基站名稱表單控件獲取值並賦予基站建立數據對象
    this.bsCreationData.name = this.bsFormGroup_Name.get('BSName')?.value;

    // 從基站描述表單控件獲取值並賦予基站建立數據對象
    this.bsCreationData.description = this.bsFormGroup_Description.get('LocationDescription')?.value;

    // 從基站類型表單控件獲取值，並轉換為對應的數據代碼
    const typeValue = this.bsFormGroup_Type.get('BSType')?.value;
    this.bsCreationData.bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;

    // 根據基站類型進行不同的數據處理
    if ( this.bsCreationData.bstype === "1" ) {
      // 若為 All-In-One 類型，僅需記錄一個綜合網元 ID
      const selectedId = this.bsFormGroup_Elements.get('allInOneElement')?.value;
      this.bsCreationData.components = [ { type: 'cu+du+ru', id: selectedId } ];
    } else if ( this.bsCreationData.bstype === "2" ) {
      // 若為分佈式，則需記錄 CU、DU、RU 的 ID 和配置
      const cu = this.bsFormGroup_Elements.get('CUElement')?.value;
      // 映射 DU 表單陣列中的所有值，收集 DU ID
      const duElements = this.DUElementsFormArray.value.map( ( du: any ) => ( { id: du.DUElement } ) );
      // 映射 RU 表單陣列中的所有值，收集 RU ID 和位置
      const ruElements = this.RUElementsFormArray.value.map( ( ru: any ) => ({
        id: ru.RUElement,
        position: `[${ru.latitude}, ${ru.longitude}]`,
        duid: ru.connectedDU
      }));

      // 組織分佈式網元結構
      const components: Components_Dist = {};

      // 對 DU 進行迭代，並對每個 DU 的相關 RU 數據進行處理
      components[cu] = duElements.reduce( ( acc: duID, du: any ) => {
        const filteredRUs = ruElements.filter( ( ru: any ) => ru.duid === du.id );
        const ruMap: ruID[] = filteredRUs.map( ( ru: any ) => ({
          [ru.id]: ru.position
        }));
        acc[du.id] = ruMap;
        return acc;
      }, {});

      // 將組織好的網元結構賦予基站建立數據對象
      this.bsCreationData.components = components;
    }

    // 輸出最終用於提交的基站建立數據
    console.log( "bsCreationData for POST:", this.bsCreationData );
  }

  /**
   * @2024/04/30 Add
   * 表單提交事件處理
   * @method BsCreation_Submit
   * @returns {void}
   * @description
   * - 處理基站建立表單的提交,根據基站類型構建數據並執行相應的 API 調用
   */
  BsCreation_Submit() {
    console.log("BsCreation_Submit() - Start");

    // 獲取表單控件 'BSType' 的值，用於後續判斷基站的類型
    const typeValue = this.bsFormGroup_Type.get('BSType')?.value;
    // 決定基站類型: "1" 表示一體式基站, "2" 表示分布式基站, 若無匹配則為 null
    const bstype = typeValue === 'allInOne' ? "1" : typeValue === 'dist' ? "2" : null;

    // 構建提交數據，包括會話ID和其他基站建立相關數據
    const submitData: any = {
      session: this.sessionId,
      ...this.bsCreationData
    };

    // 若為一體式基站，添加位置訊息至提交數據中
    if ( bstype === "1" ) {
      submitData.position = this.bsComponents.all?.[0].position;
    }

    // 判斷是否處於本地模式以進行模擬或生產環境下進行實際API調用
    if ( this.commonService.isLocal ) {

      // 本地模式下僅打印模擬的提交數據
      console.log("Local 模擬基站建立，提交的數據:", submitData);

    } else {

      // 生產環境下根據基站類型執行對應的API調用
      const apiObservable = bstype === "1"
        ? this.API_BS.createBs( submitData )
        : this.API_BS.createDistributedBs( submitData );

      apiObservable.subscribe({

        next: ( response ) => {

          // 處理API成功響應，通常包括日誌輸出及後續處理
          console.log("基站建立成功:", response);

          // 基站建立成功後刷新基站列表
          this.getQueryBsList();

        },
        error: ( error ) => {
          // 處理API失敗響應，通常為錯誤日誌輸出
          console.error( "基站建立失敗:", error );
        }
      });
    }

    // 關閉基站建立窗口
    this.bsCreationWindowRef.close();

    // 重置基站建立表單，清空所有已填寫的資料
    this.resetBsCreationForm();

    // 函數執行完畢時在控制台輸出
    console.log("BsCreation_Submit() - End");
  }


// ↑ For Create BS @2024/05/02 Update ↑


}
