
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';

// For import APIs of Field Management 
import { apiForFieldMgmt } from '../shared/api/For_Field_Mgmt';  // @2024/01/29 Add 

// For import interface of queryFieldList
import { FieldList, Field } from '../shared/interfaces/Field/For_queryFieldList'; // @2024/01/29 Add 

// For import interfaces of queryBsList
import { BSList, Basestation } from '../shared/interfaces/BS/For_queryBsList'; // @2024/02/01 Add 

// For import interfaces of createField
import { ForCreateOrUpdateField, Bsinfo } from '../shared/interfaces/Field/For_createField_or_updateField'; // @2024/02/01 Add 

// For import interfaces of queryFieldSnapshotList
import { FieldSnapshotList, FieldSnapshot } from '../shared/interfaces/Field/For_queryFieldSnapshotList'; // @2024/03/06 Add 

// For import local files of Field Management 
import { localFieldList }         from '../shared/local-files/Field/For_queryFieldList';          // @2024/01/29 Add
import { localBSList }            from '../shared/local-files/BS/For_queryBsList';                // @2024/02/01 Add
import { localFieldSnapshotList } from '../shared/local-files/Field/For_queryFieldSnapshotList';  // @2024/03/06 Add

// For download snapshot ( local mode )
import * as XLSX from 'xlsx';           // @2024/03/09 Add 
//import { saveAs } from 'file-saver';  // @2024/03/09 Add 

@Component({
  selector: 'app-field-management',                 // 定義組件的標籤選擇器，用於在其他 HTML 中引用此組件
  templateUrl: './field-management.component.html', // 指定組件的 HTML 模板文件位置
  styleUrls: ['./field-management.component.scss']  // 指定組件專用的樣式表(SCSS)文件
})

export class FieldManagementComponent implements OnInit, OnDestroy {

        sessionId: string = ''; // sessionId 用於存儲當前會話 ID
  refreshTimeout!: any;         // refreshTimeout 用於存儲 setTimeout 的引用，方便之後清除
      refreshTime: number = 5;  // refreshTime 定義自動刷新的時間間隔（秒）

  // 類的構造函數，注入了多個依賴項目
  constructor(

    private router:         Router,          // Router 用於在應用內導航
    private dialog:         MatDialog,       // MatDialog 用於彈出對話框
    public languageService: LanguageService, // LanguageService 用於語言切換和國際化
    private commonService:  CommonService,   // CommonService 提供通用的服務（如 Session ID 獲取）
    private fb:             FormBuilder,     // FormBuilder 用於建立表單

    public                    API_Field: apiForFieldMgmt,         // API_Field 用於場域管理相關的 API 請求
    public         fieldList_LocalFiles: localFieldList,          // fieldList_LocalFiles 用於從 Local 文件獲取場域列表數據
    public            bsList_LocalFiles: localBSList,             // bsList_LocalFiles 用於從 Local 文件獲取基站列表數據
    public fieldSnapshotList_LocalFiles: localFieldSnapshotList,  // fieldSnapshotList_LocalFiles 用於從 Local 文件獲取指定場域內的 Snapshot List 數據 @2024/03/06 Add

  ) {
    this.createFieldCreationForm();     // 初始化並創建每個場域設置用的 FormGroup @2024/02/02 Add
    this.createFieldSnapshotSetForm();  // 初始化並創建每個場域快照用的 FormGroup @2024/03/03 Add
  }
 
  // 組件初始化時執行的函數
  ngOnInit() {

    // 從 commonService 獲取會話 ID
    this.sessionId = this.commonService.getSessionId();

    // 呼叫 getQueryFieldList 函數獲取 O1 內所有場域資訊
    this.getQueryFieldList();
  }

  // 組件銷毀時執行的清理工作
  ngOnDestroy() {

    // 清除設置的 setTimeout，避免不必要的執行
    clearTimeout( this.refreshTimeout );

    // 取消對 queryFieldList 的訂閱，防止內存洩漏
    if ( this.queryFieldList ) this.queryFieldList.unsubscribe();

    // 取消對 queryBsList 的訂閱，防止內存洩漏
    if ( this.queryBsList ) this.queryBsList.unsubscribe();
  }


           p: number = 1;    // 當前頁數 - 指示分頁控件當前顯示的頁面編號，初始設定為第 1 頁。
    pageSize: number = 10;   // 每頁幾筆 - 每頁顯示的數據條目數量，這裡設定為每頁顯示 10 條數據。
  totalItems: number = 0;    // 總筆數 - 整個數據集的總條目數，用於計算分頁總數。
    nullList: string[] = []; // 給頁籤套件使用 - 用於分頁控件的一個空陣列，通常用於初始化或臨時存儲數據。

  /**
   * 當分頁控件中的頁面發生變化時被呼叫的函數。
   * @param page 這是新選擇的頁面編號。
   * 
   * 此函數更新當前頁面編號（this.p），從而觸發應用程式在該頁面上顯示相應的數據。
   * 這通常會導致對應用程式的狀態或模型中的數據進行分頁處理，以便只顯示當前頁面的數據。
   * 此方法與分頁管道（ngFor 與 paginate 管道）緊密相連，確保頁面上正確地顯示數據。
   */
  pageChanged( page: number ) {

    this.p = page; // 更新當前頁面編號
  }
  
  fieldList: FieldList = {} as FieldList; // 用於存儲從伺服器或 Local 文件獲取的場域列表數據 @11/30 Add by yuchen
  selectField!: Field;  // 用於存儲當前選中的場域信息 @2024/02/03 Update by yuchen
  isLoading = true;     // 加載狀態的標誌，初始設置為 true @12/28 Add for Progress Spinner

  // queryFieldList 用於管理 HTTP 的訂閱請求，'!' 確保在使用前已賦值。
  queryFieldList!: Subscription;  // @11/30 Add by yuchen

  /** @2024/01/29 Update by yuchen
   *  用於獲取場域列表。
   *  根據是否處於 Local 模式，它會從 Local 文件或通過 API 從伺服器獲取場域資訊。
   */
  getQueryFieldList() {
    console.log('getQueryFieldList() - Start');
    this.isLoading = true; // 開始加載數據，顯示進度指示器
    
    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時，避免重複或不必要的操作
    
    if ( this.commonService.isLocal ) {

      //  Local 模式: 使用 Local 文件提供的數據
      this.fieldList = this.fieldList_LocalFiles.fieldList_local;
      console.log( 'In local - getQueryFieldList:', this.fieldList );

      this.isLoading = false; //  Local 模式下，數據加載快速完成，直接設置為 false

    } else {

      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.API_Field.queryFieldList().subscribe({
        next: ( res ) => {

          // 請求成功，獲得場域列表數據
          console.log('getQueryFieldList:', res);

          this.fieldList = res; // 更新場域列表數據
          this.FieldListDeal(); // 調用處理函數，進行數據處理（如分頁）
          
        },
        error: ( error ) => {

          // 請求出現錯誤
          console.error('Error fetching field info:', error);
          this.isLoading = false; // 出錯時設置加載標誌為 false
        },
        complete: () => {
          // 數據流處理完成（ 無論成功或失敗 ）
          console.log('Field info fetch completed');
          this.isLoading = false; // 數據加載完成
        }
      });
    }
  }

  /** @2024/02/03 Update by yuchen
   *  用於處理場域列表的顯示和分頁。
   *  它計算場域總數，設置分頁所需的空陣列，並根據當前頁數定時刷新場域資訊。
   */
  FieldListDeal() {

    // 輸出檢查點 - 打印場域列表的長度
    console.log('Field list length:', this.fieldList.fields?.length);

    // 計算 fields 數組中元素的數量，即場域的總數
    // 使用可選鏈和空值合併運算符來避免 undefined 或 null
    this.totalItems = this.fieldList.fields?.length || 0;
    console.log('Total items:', this.totalItems);

    // 定義一個空陣列，長度等於場域的總數，用於分頁控制
    this.nullList = new Array(this.totalItems);

    // 使用 setTimeout 設定一個定時刷新
    // 如果當前頁面是第一頁，則執行場域訊息更新
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        console.log(`page[${this.p}] ===> refresh.`);
        // 可以在這裡調用 getQueryFieldList() 函數來更新場域訊息( 可選 )
      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); // 設定 100 ms 後執行
  }


// For Field Creation Setting @2024/02/02 Update ↓

  // @2024/01/31 Add by yuchen
  isLinear = true;                          // 用於控制步驟導航(mat-step)是否為線性模式（ 即必須按順序完成每一步，目前設為需要 ）
  firstFormGroup_FieldName!:    FormGroup;  // 用於存儲場域名稱設置的表單控件
  secondFormGroup_fieldBounds!: FormGroup;  // 用於存儲場域邊界設置的表單控件 
  thirdFormGroup_PhoneNum!:     FormGroup;  // 用於存儲場域聯絡人電話號碼設置的表單控件
  
  // @2024/02/02 Update
  // 初始化並創建每個 FormGroup，並用於"建立場域"設置 
  createFieldCreationForm() {

    // 初始化第一步驟的 FormGroup 用於設置場域名稱
    this.firstFormGroup_FieldName = this.fb.group({
      FieldName: ['', Validators.required],
    });

    // 初始化第二步驟的 FormGroup 用於設置場域邊界
    this.secondFormGroup_fieldBounds = this.fb.group({
      northBound: ['', [Validators.required, Validators.pattern(/^(-?[0-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/)]],
      southBound: ['', [Validators.required, Validators.pattern(/^(-?[0-8]?[0-9](\.[0-9]+)?|90(\.0+)?)$/)]],
       westBound: ['', [Validators.required, Validators.pattern(/^(-?(1[0-7][0-9]|0?[0-9]{1,2})(\.[0-9]+)?|180(\.0+)?)$/)]],
       eastBound: ['', [Validators.required, Validators.pattern(/^(-?(1[0-7][0-9]|0?[0-9]{1,2})(\.[0-9]+)?|180(\.0+)?)$/)]],
    });
  
    // 初始化第三步驟的 FormGroup 用於設置管理者門號
    this.thirdFormGroup_PhoneNum = this.fb.group({
       PhoneNum: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
    });
  }

  // 用於重置所有輸入的"建立場域"設定 @2024/02/04 Update
  resetFieldCreationForm() {
    console.log("Resetting field creation form settings.");

    // 重置各個步驟的 FormGroup
    this.firstFormGroup_FieldName.reset();
    this.secondFormGroup_fieldBounds.reset();
    this.thirdFormGroup_PhoneNum.reset();
    
    // 重置 displayedBSs 中的每個基站的選擇狀態
    // 使用 forEach 迭代 displayedBSs 數組中的每個基站物件，將其 selected 屬性設置為 false 以取消選中狀態
    // this.displayedBSs.forEach(bs => bs.selected = false);

    // 重置 displayedBSs 中的每個基站的選擇狀態
    // 此行代碼創建一個新陣列，每個元素都是從 `displayedBSs` 原始元素複製過來的，
    // 但將每個元素的 `selected` 屬性設置為 `false`。
    // 使用展開運算符（`...`）來複製每個 `bs` 物件的所有現有屬性，
    // 然後 `selected: false` 會在每個複製中覆寫 `selected` 屬性。
    // 將這個新陣列重新賦值給 `displayedBSs`，我們確保 Angular 能夠
    // 檢測到變化並相應地更新 UI，因為這是一個新的陣列參考。
    this.displayedBSs = this.displayedBSs.map(bs => ({ ...bs, selected: false }));

    // 清空 ( 初始化 ) 儲存選擇基站的陣列
    this.selectedBsInfos = [];

    // 重置全選 Checkbox 的狀態
    this.isAllSelected = false;

    // 如果還有其他相關的狀態需要重置，也應該在這裡進行
    // 例如，如果有分頁或過濾器的狀態，也應該一併重置

    console.log("Field creation form settings have been reset.");
  }

  // 引用場域建立視窗組件  @2024/02/02 Update by yuchen
  // 使用 ViewChild 裝飾器引用模板中的 'fieldCreationWindow' 元素
  @ViewChild('fieldCreationWindow') fieldCreationWindow: any; // 這允許在 TypeScript 代碼中直接訪問該元素

  // 用於存儲對 MatDialogRef 的引用
  fieldCreationWindowRef!: MatDialogRef<any>; // 用於控制"場域建立"視窗的開啟和關閉

  // 用於跟踪場域建立表單的驗證狀態
  fieldCreationFormValidated = false; // 默認為 false，表示尚未驗證


  // 打開"場域建立"視窗 @2024/02/01 Add
  openfieldCreationWindow() {

    // 表單驗證狀態重置
    this.fieldCreationFormValidated = false; 

    // 打開場域編輯視窗
    this.fieldCreationWindowRef = this.dialog.open( this.fieldCreationWindow, { 
          id: 'fieldCreationWindow',
          // 自定義視窗寬高設置
          // width: '800px', 
          // height: '650px'
    } );

    // 訂閱視窗關閉事件，並在關閉時重置表單驗證狀態
    this.fieldCreationWindowRef.afterClosed().subscribe(() => {
      this.fieldCreationFormValidated = false;
    });

    this.getQueryBsList(); // 打開該視窗就先載入 BS List 數據  @2024/01/28 Add  
    
    // 打印當前場域內選中的基站 ID
    console.log("In openfieldCreationWindow(),\n 目前被選中的基站 id 有", this.selectedBsInfos )

    this.resetFieldCreationForm(); // 初始化所有輸入的"場域建立"設定  @2024/02/02 Add

    // 打印當前場域內選中的基站 ID
    console.log("In openfieldCreationWindow(),\n 目前被選中的基站 id 有", this.selectedBsInfos )
  }


  bsList: BSList = {} as BSList;       // 用於存儲取得的 BS List 數據 @2024/02/01 Add
  selectedBsInfos: Bsinfo[] = [];      // 用於存儲用戶建立場域時要選擇放入的 BS 之 ID @2024/02/01 Add
  isGetQueryBsListLoading = false;     // 用於表示加載 BS List 的 flag，初始設置為 false @2024/02/01 Add for Progress Spinner

  displayedBSs:   Basestation[] = [];  // 用於控制顯示於"場域建立"頁面上的 BS 選擇列表 @2024/02/01 Add
  BSsNotUsedInO1: Basestation[] = [];  // 用於存儲 O1 內還未被使用的 BS  @2024/02/01 Add

  // queryBsList 用於管理 HTTP 的訂閱請求，'!' 確保在使用前已賦值。
  queryBsList!: Subscription;  // @2024/02/02 Add by yuchen

  // @2024/02/01 Add 
  // Get the BS List in the O1 System 
  getQueryBsList() {
    console.log('getQueryBsList() - Start');  // 在控制台中記錄開始獲取基站列表的訊息

    // 使用 clearTimeout 來取消任何已經設定但尚未執行的 setTimeout，
    // 這可以防止在重新獲取基站列表之前執行之前的延遲任務，確保不會有多餘的執行或資源衝突。
    clearTimeout( this.refreshTimeout );

    this.isGetQueryBsListLoading = true; // 設置加載旗標為 true，表示開始加載

    // 定義一個篩選基站列表的內部函數
    const filterBSList = ( bsList: BSList ) => {
      
      // 從基站列表中篩選出未被使用的基站（ 即沒有 fieldId 和 fieldName 的基站 ）
      this.BSsNotUsedInO1 = bsList.basestation.filter ( bs => !bs.fieldId && !bs.fieldName );

      // 對篩選出來的基站列表中的每個基站設置其 selected 屬性為 false
      this.BSsNotUsedInO1.forEach( bs => bs.selected = false );

      // 將篩選後的基站列表賦值給顯示用的基站列表
      this.displayedBSs = [...this.BSsNotUsedInO1];
    };

    // 檢查是否在 Local 測試環境
    if ( this.commonService.isLocal ) {
      console.log( 'Fetching BS List in Local' );  // 在控制台中記錄正在 Local 獲取基站列表的訊息

      // 從 Local 文件中讀取基站列表
      this.bsList = this.bsList_LocalFiles.bsList_local;

      // 對 Local 的基站列表應用篩選函數
      filterBSList ( this.bsList );

      // 設置加載旗標為 false，表示加載完成
      this.isGetQueryBsListLoading = false;

      console.log( "In getQueryBsList(),\n 目前 local 環境中被選中的基站 id 目前有 ( 此時應為空 ):\n", this.selectedBsInfos )
      console.log( '目前 local 環境中 O1 內所有的基站有:\n', this.bsList ); 
      console.log( '目前 local 環境中 O1 內未被選擇的基站有:\n', this.BSsNotUsedInO1 ); 

    } else {

      console.log('Fetching BS List from API');  // 在控制台中記錄正在從 API 獲取基站列表的訊息

      // 從 API 獲取基站列表
      this.API_Field.queryBsList().subscribe({
        next: ( res: BSList ) => {

          // 將 API 返回的基站列表賦值給 bsList 變數
          this.bsList = res;

          // 對 API 返回的基站列表應用篩選函數
          filterBSList( this.bsList );

          // 設置加載旗標為 false，表示加載完成
          this.isGetQueryBsListLoading = false;

          console.log( "In getQueryBsList(),\n 目前被選中的基站 id 目前有 ( 此時應為空 ):\n", this.selectedBsInfos )
          console.log( '目前 O1 內所有的基站有:\n', this.bsList ); 
          console.log( '目前 O1 內未被選擇的基站有:\n', this.BSsNotUsedInO1 ); 

        },
        error: ( error ) => {

          // 在控制台中記錄獲取基站列表出錯的訊息
          console.error( 'Error fetching BS List:', error );

          // 設置加載旗標為 false，表示加載出錯
          this.isGetQueryBsListLoading = false;
        },
        complete: () => {

          // 在控制台中記錄基站列表獲取完成的訊息
          console.log( 'BS List fetch completed' );
        }
      });
    }

    // 在控制台中記錄方法結束的訊息
    console.log( 'getQueryBsList() - End' );
  }

  // @2024/02/01 Add 
  // 用於追蹤是否所有基站都被選中 
  isAllSelected: boolean = false; 

  // @2024/02/01 新增
  // 當用戶改變基站選中狀態的事件處理函數
  // 更新單一基站的選擇狀態，同時更新 selectedBsInfos 陣列
  onBsSelectionChange( bsId: string, event: Event ) {
    
    // 從事件獲取 Checkbox 的選中狀態
    const isChecked = ( event.target as HTMLInputElement ).checked;

    // 檢查 Checkbox 是否被勾選
    if ( isChecked ) {

      // 如果 Checkbox 被勾選，進行檢查以確定該基站 ID 是否不在 selectedBsInfos 陣列中
      if ( !this.selectedBsInfos.some( bi => bi.id === bsId ) ) {

        // 如果該 ID 不在陣列中，則將其添加到陣列中
        this.selectedBsInfos.push( { id: bsId } );
      }
    } else {

      // 如果 Checkbox 沒有被勾選，從 selectedBsInfos 陣列中移除對應的基站 ID
      this.selectedBsInfos = this.selectedBsInfos.filter( bi => bi.id !== bsId );
    }

    // 檢查是否所有基站都被選中，更新全選 Checkbox 的狀態
    this.isAllSelected = this.displayedBSs.length === this.selectedBsInfos.length;

    // 輸出當前所有被選中的基站的 ID
    console.log( "In onBsSelectionChange() - End,\n 所有被選中的基站訊息現在有", this.selectedBsInfos );

    // 這裡可以添加額外的邏輯，比如將選中狀態的改變發送到伺服器等
  }

  // @2024/02/01 Add
  // 全選或全不選基站列表的函數
  // 如果全選，則添加所有基站，如果取消全選，則清空陣列。
  onSelectAllBs( event: Event ) {

    // 從事件獲取 Checkbox 的選中狀態
    const isChecked = ( event.target as HTMLInputElement ).checked;

    // 更新所有 displayedBSs 的 selected 屬性
    this.displayedBSs.forEach( bs => bs.selected = isChecked );

    // 如果全選，則添加所有基站到 selectedBsInfos，否則清空陣列
    this.selectedBsInfos = isChecked ? this.displayedBSs.map( bs => ( { id: bs.id } ) ) : [];

    // 全選 Checkbox 的選中狀態
    this.isAllSelected = isChecked;

    // 輸出當前所有被選中的基站的 ID
    console.log( "In onSelectAllBs() - End,\n 所有被選中的基站訊息現在有", this.selectedBsInfos );
  }

  // @2024/02/02 Add
  // 提交場域建立表單的函數。如果處於 Local 模式，則模擬提交過程；如果處於生產模式，則向後端 API 發送請求。
  FieldCreation_Submit() {

    // 在控制台記錄開始執行函數的訊息
    console.log( "FieldCreation_Submit() - Start" );

    // 根據用戶填寫的表單資料，建立提交到後端的數據結構
    const fieldCreationData: ForCreateOrUpdateField = {

      // 使用者可調整:
      // 將表單內容轉換成場域位置數據
      fieldposition1: `[${this.secondFormGroup_fieldBounds.value.eastBound},${this.secondFormGroup_fieldBounds.value.northBound}]`,
      fieldposition2: `[${this.secondFormGroup_fieldBounds.value.westBound},${this.secondFormGroup_fieldBounds.value.northBound}]`,
      fieldposition3: `[${this.secondFormGroup_fieldBounds.value.westBound},${this.secondFormGroup_fieldBounds.value.southBound}]`,
      fieldposition4: `[${this.secondFormGroup_fieldBounds.value.eastBound},${this.secondFormGroup_fieldBounds.value.southBound}]`,
                name: this.firstFormGroup_FieldName.value.FieldName,  // 場域名稱
              bsinfo: this.selectedBsInfos,                           // 已選擇的基站信息
               phone: this.thirdFormGroup_PhoneNum.value.PhoneNum,    // 管理者電話號碼

      // 使用者不可調整:
      session: this.sessionId // 會話識別碼
    };

    // 檢查是否在 Local 環境下模擬執行
    if ( this.commonService.isLocal ) {

      //  Local 模式下模擬場域建立過程
      console.log( " Local 模擬場域建立，提交的數據:", fieldCreationData );

       //  Local 模式建立成功後，刷新場域列表
       this.getQueryFieldList();

    } else {

      // 生產環境下向後端 API 發送場域建立請求
      this.API_Field.createField( fieldCreationData ).subscribe({
        next: ( response ) => {

          // 處理成功響應
          console.log( "場域建立成功:", response );

          // 建立成功後，刷新場域列表
          this.getQueryFieldList();
        },
        error: ( error ) => {
          // 處理失敗響應
          console.error("場域建立失敗:", error);
          // 例如顯示錯誤訊息給用戶
        }
      });
    }
    
    // 關閉場域建立視窗
    this.fieldCreationWindowRef.close();

    // 重置場域建立表單，清空所有已填寫的資料
    this.resetFieldCreationForm();
    
    // 在控制台記錄函數執行結束的訊息
    console.log("FieldCreation_Submit() - End");
  }

  
// For Field Creation Setting @2024/02/02 Update ↑


  /** @2024/02/03 Update by yuchen
   * 導航到選定場域的詳細資訊頁面。
   * @param field 從場域列表中選擇的場域物件。
   */
  viewFieldDetailInfo( field: Field ) {

    this.selectField = field; // 設定當前選擇的場域。
    console.log( "View Detail of the field id:", this.selectField.id, "and the field name: ", this.selectField.name ); // 輸出選擇的場域 ID 和名稱。
    
    // 導航到場域管理的詳細資訊頁面，帶上場域的 ID 和名稱作為路由參數。
    this.router.navigate( ['/main/field-mgr/info', this.selectField.id, this.selectField.name] );
  }
  
  /** @2024/02/03 Update by yuchen
   * 導航到選定場域的警報資訊頁面。
   * @param field 從場域列表中選擇的場域物件。
   */
  viewFieldAlarmInfo( field: Field ) {

    this.selectField = field; // 設定當前選擇的場域。
    console.log( "Selected alarm field name: ", this.selectField.name ); // 輸出選擇的場域名稱。

    // 導航到故障管理的警報資訊頁面，帶上場域名稱和預設的警報類型 'All'。
    this.router.navigate( ['/main/fault-mgr', this.selectField.name, 'All'] );
  }


  // @2024/01/29 Add
  // ViewChild 裝飾器用於獲取模板中 #deleteField_ConfirmWindow 的元素
  @ViewChild('deleteField_ConfirmWindow') deleteField_ConfirmWindow: any;

  // @2024/01/29 Add
  // MatDialogRef 用於控制打開的對話框
  deleteField_ConfirmWindowRef!: MatDialogRef<any>;

  // 根據用戶的選擇開啟刪除場域的對話框 @2024/01/29 Update by yuchen
  openDeleteField_ConfirmWindow( field: Field ) {

    // 將選中的場域賦值給 selectField
    this.selectField = field;

    // 輸出將要刪除的場域名稱，用於記錄或調整
    console.log( "Deleted field name: ", this.selectField.name );

    // 使用 MatDialog 服務開啟確認刪除的對話框
    this.deleteField_ConfirmWindowRef = this.dialog.open( 
        this.deleteField_ConfirmWindow, { id: 'deleteField_ConfirmWindow' }
    );

    // 訂閱對話框關閉後的事件
    this.deleteField_ConfirmWindowRef.afterClosed().subscribe( confirm => {
      // 這裡可以根據用戶在對話框中的操作進行相應的處理
    });
  }

  // 確認刪除場域的操作 @2024/01/29 Add by yuchen
  confirmDeleteField() {

    // 顯示加載指示器
    this.isLoading = true;

    // 檢查是否是 Local 環境
    if ( this.commonService.isLocal ) {
      // 在控制台輸出調試訊息
      console.log('Remove field in local environment.');

      // 調用刪除場域的函數，傳入場域名稱
      this.deleteFieldInLocal( this.selectField.name );

      // 刷新場域列表或進行其他更新
      this.getQueryFieldList();
      
      // 關閉加載指示器
      this.isLoading = false;

    } else {

      // 非 Local 環境，調用後端 API 進行刪除
      this.API_Field.removeField( this.selectField.id ).subscribe({
        next: ( response ) => {

          // 刪除成功的回調，輸出成功訊息和後端響應
          console.log( 'Field removed successfully', response );

          // 刷新場域列表或進行其他更新
          this.getQueryFieldList();

          // 關閉加載指示器
          this.isLoading = false;
        },
        error: ( error ) => {

          // 刪除失敗的回調，輸出錯誤訊息
          console.error('Failed to remove field:', error);

          // 關閉加載指示器
          this.isLoading = false;
        },
        complete: () => {

          // 請求完成後的回調，不管成功或失敗都會執行
          // 關閉加載指示器
          this.isLoading = false;
        }
      });   
    }
  }

  // @2024/01/29 Add by yuchen
  // 模擬在 Local 環境中刪除場域的函數 ( 依據 name 進行刪除 )
  deleteFieldInLocal( fieldName: string ) {

    // 輸出將要刪除的場域名稱，用於記錄和調試
    console.log( "The delete field name:", fieldName )

    // 確保 fieldList_LocalFiles.fieldList.fields 是一個陣列
    if ( Array.isArray( this.fieldList_LocalFiles.fieldList_local.fields ) ) {

      // 從場域列表中過濾掉要刪除的場域
      this.fieldList_LocalFiles.fieldList_local.fields = this.fieldList_LocalFiles.fieldList_local.fields.filter( field => field.name !== fieldName );
    
    } else {

      // 如果 fieldList_LocalFiles.fieldList.fields 不是陣列，輸出錯誤訊息
      console.error( 'fieldList_local.fields 不是陣列或為 undefined' );
    }
  }


// For Field Snapshot Set @2024/03/07 Update by yuchen ↓

  // @2024/03/03 Add 
  // 創建表單組，用於"場域快照設置"
  fieldSnapshotSetForm!: FormGroup;

  // @2024/03/08 Update
  // 用於建立"場域快照設置"用的表單組
  createFieldSnapshotSetForm() {

    // 正則表達式：至少包含一個非空白字符
    const notOnlyWhitespaceRegex = /\S/;

    // 初始化表單控件
    this.fieldSnapshotSetForm = this.fb.group({
      // 驗證器檢查輸入是否至少包含一個非空白字符
      snapshotName: new FormControl( '', [ Validators.required, Validators.pattern( notOnlyWhitespaceRegex ) ] )
    });
  }

  // 用於重置所有輸入的"場域快照設置"設定 @2024/03/03 Add
  resetFieldSnapshotSetForm() {
    console.log("Resetting Field Snapshot form settings.");

    // 重置 FormGroup - fieldSnapshotSetForm
    this.fieldSnapshotSetForm.reset();

    console.log("Field Snapshot form settings have been reset.");
  }

  // 引用 "Field Snapshot Set" 視窗組件 @2024/03/03 Add 
  @ViewChild('fieldSnapshotSetWindow') fieldSnapshotSetWindow: any;  // 使用 ViewChild 裝飾器引用模板中的 'fieldSnapshotSetWindow' 元素
  fieldSnapshotSetWindowRef!: MatDialogRef<any>; // 用於控制"場域快照設置"視窗的開啟和關閉
  fieldSnapshotSetFormValidated = false;         // 用於跟踪"場域快照設置"表單的驗證狀態

  // 開啟 "場域快照" 視窗用 @2024/03/07 Update
  openfieldSnapshotSetWindow( field: Field ){
    this.selectField = field;

    // @2024/03/06 Add
    this.toCreateFieldSnapshot();     // 打開視窗即建立一張當下快照 
    this.getQueryFieldSnapshotList(); // 接著取得先前有儲存的其它場域快照

    // @2024/03/07 Add
    this.isFieldSnapshotListPanelExpanded = false; // 打開視窗都預設 Snapshot 列表的摺疊面板為非展開

    // 表單驗證狀態重置
    this.fieldSnapshotSetFormValidated = false; 

    // 打開 "場域快照設置" 視窗
    this.fieldSnapshotSetWindowRef = this.dialog.open( this.fieldSnapshotSetWindow, { 
          id: 'fieldSnapshotSetWindow',
          // 自定義視窗寬高設置
          // width: '800px', 
          // height: '650px'
    } );

    // 訂閱視窗關閉事件，並在關閉時重置表單驗證狀態
    this.fieldSnapshotSetWindowRef.afterClosed().subscribe(() => {
      this.fieldSnapshotSetFormValidated = false;
    });
  }

  // 用於儲存剛建立的快照 ID @2024/03/08 Add
  currentFieldSnapshotID: string = "";

  // @2024/03/09 Update
  // 呼叫場域快照建立的函數。如果處於 Local 模式，則模擬建立過程；如果處於生產模式，則向後端 API 發送請求實際建立。
  toCreateFieldSnapshot() {

    // 在控制台記錄開始執行函數的訊息
    console.log( "toCreateFieldSnapshot() - Start" );

    // 檢查是否在 Local 環境下模擬執行
    if ( this.commonService.isLocal ) {

      //  Local 模式下模擬場域快照建立過程
      console.log( "Local 模擬 ( 無法真的建立 )\n - 要產生快照的場域 ID 為:", this.selectField.id );

    } else {

      console.log( "選擇要產生快照的場域 ID 為:", this.selectField.id );

      // 生產環境下向後端 API 發送場域快照建立請求
      this.API_Field.createFieldSnapshot( this.selectField.id ).subscribe({
        next: ( response ) => {

          // 處理成功響應
          console.log( "場域快照建立成功，此快照 id 為:", response );

          // 儲存剛建立的場域快照 ID 進指定變數
          this.currentFieldSnapshotID = response.id;
          console.log( "this.currentFieldSnapshotID:", this.currentFieldSnapshotID );
        },
        error: ( error ) => {
          // 處理失敗響應
          console.error("場域快照建立失敗:", error);
          // 例如顯示錯誤訊息給用戶
        }
      });
    }
    
    // 在控制台記錄函數執行結束的訊息
    console.log("toCreateFieldSnapshot() - End");
  }


  // @2024/03/08 Add
  // 用於儲存剛建立的場域快照
  saveCurrentFieldSnapshot() {
    console.log( "saveCurrentFieldSnapshot() - Start" );

    // 從表單中獲取快照名稱
    const snapshotName = this.fieldSnapshotSetForm.get('snapshotName')?.value;

    // 構建請求體
    const body = {
      session: this.sessionId,
      name: snapshotName,
      id: this.currentFieldSnapshotID
    };

    // 檢查是否在 Local 環境下模擬執行
    if ( this.commonService.isLocal ) {

      //  Local 模式下模擬儲存快照過程
      console.log( " Local 模擬 - 申請儲存的快照資訊為:", body );

      // 刷新場域快照列表
      this.getQueryFieldSnapshotList();

      // 重置"輸入場域名稱"欄位表單
      this.resetFieldSnapshotSetForm();

    } else {

      // 生產環境下向後端 API 發送請求儲存快照
      this.API_Field.updateFieldSnapshot( body ).subscribe({
        next: ( response ) => {
          // 處理成功響應
          console.log( "快照儲存成功:", response );

          // 刷新場域快照列表
          this.getQueryFieldSnapshotList();

          // 重置"輸入場域名稱"欄位表單
          this.resetFieldSnapshotSetForm();
        },
        error: ( error ) => {
          // 處理失敗響應
          console.error( "快照儲存失敗:", error );
          // 例如顯示錯誤訊息給用戶
        }
      });
    }

    console.log( "saveCurrentFieldSnapshot() - End" );
  }

  // @2024/03/09 Add
  // 用於下載剛建立的場域快照
  downloadCurrentFieldSnapshot() {
    console.log( "downloadCurrentFieldSnapshot() - Start" );

    // 檢查是否在 Local 環境下模擬執行
    if ( this.commonService.isLocal ) {

      //  Local 模式下無法下載快照
      //console.log( "Local 模式下無法下載快照，此剛建立的場域快照ID為:", this.currentFieldSnapshotID );
      console.log( "Local 模式下無法真的建立快照，故也無法下載。" );

    } else {

      // 生產環境下向後端 API 發送請求下載快照
      this.API_Field.getDumpFieldSnapshot( this.currentFieldSnapshotID ).subscribe({
        next: ( response ) => {
          
          // 處理成功的響應
          console.log( "剛建立的場域快照 -", this.currentFieldSnapshotID, "下載成功:", response );

          // 取得快照所屬場域名稱
          const fieldName = this.selectField.name;

          // 定義檔名格式為: {fieldName}_currentFieldSnapshot_{此快照ID}.xlsx
          //          e.g., fieldName_currentFieldSnapshot_e2833d293c8049559ed0.xlsx
          const fileName = `${fieldName}_currentFieldSnapshot_${this.currentFieldSnapshotID}.xlsx`;

          // 解碼 Base64 字符串並自動下載 .xlsx 文件
          this.commonService.downloadExcelFromBase64( response, fileName );
        },
        error: ( error ) => {
          // 處理失敗響應
          console.error( "下載剛建立的場域快照失敗:", error );
          // 例如顯示錯誤訊息給用戶
        }
      });
    }

    console.log( "downloadCurrentFieldSnapshot() - End" );
  }

  // @2024/03/09 Add
  // 用於下載快照列表裡的指定場域快照
  downloadSpecificFieldSnapshotInList( snapshot: FieldSnapshot ) {
    console.log( "downloadSpecificFieldSnapshotInList() - Start" );

    // 檢查是否在 Local 環境下模擬執行
    if ( this.commonService.isLocal ) {

      //  Local 模式下無法下載快照
      console.log( "Local 模式下無法真的下載快照，\n 此點選要下載的快照名稱為:", snapshot.name );

    } else {

      // 生產環境下向後端 API 發送請求下載快照
      this.API_Field.getDumpFieldSnapshot( snapshot.id ).subscribe({
        next: ( response ) => {
          
          // 處理成功的響應
          console.log( "快照", snapshot.name, "下載成功:", response );

          // 取得快照所屬場域名稱
          const fieldName = this.selectField.name;
          
          // 取得建立的快照名稱
          const snapshotName = snapshot.name;

          // 使用 JavaScript 的 Date 對象解析出年、月、日、時、分、秒
          const createdDate = new Date( snapshot.createtime );
          const year = createdDate.getFullYear();
          const month = String( createdDate.getMonth() + 1 ).padStart( 2, '0' );
          const day = String( createdDate.getDate() ).padStart( 2, '0' );
          const hours = String( createdDate.getHours() ).padStart( 2, '0' );
          const minutes = String( createdDate.getMinutes() ).padStart( 2, '0' );
          const seconds = String( createdDate.getSeconds() ).padStart( 2, '0' );

          // 定義的檔名格式: {fieldName}_{snapshotName}_{年月日}_{時分秒}.xlsx
          //          e.g., fieldName_SnapshotName_20240306_140538.xlsx
          const fileName = `${fieldName}_${snapshotName}_${year}${month}${day}_${hours}${minutes}${seconds}.xlsx`;

          // 解碼 Base64 字符串並自動下載 .xlsx 文件
          this.commonService.downloadExcelFromBase64( response, fileName );
        },
        error: ( error ) => {
          // 處理失敗響應
          console.error( "快照下載失敗:", error );
          // 例如顯示錯誤訊息給用戶
        }
      });
    }

    console.log( "downloadSpecificFieldSnapshotInList() - End" );
  }

  // 用於存儲取得的 Field Snapshot List 數據 @2024/03/06 Add
  getFieldSnapshotList: FieldSnapshotList = {} as FieldSnapshotList;
  isGetQueryFieldSnapshotLoading = false;     // 用於表示加載 Snapshot List 的 flag，初始設置為 false @2024/03/06 Add for Progress Spinner

  // @2024/03/09 Update
  // getFieldSnapshotList 用分頁控件 
  p_getFieldSnapshotList: number = 1;           // 當前頁數 - 指示分頁控件當前顯示的頁面編號，初始設定為第 1 頁。
  pageSize_getFieldSnapshotList: number = 5;    // 每頁幾筆 - 每頁顯示的數據條目數量，這裡設定為每頁顯示 5 條數據。
  totalItems_getFieldSnapshotList: number = 0;  // 總筆數 - 整個數據集的總條目數，用於計算分頁總數。
  nullList_getFieldSnapshotList: string[] = []; // 給頁籤套件使用 - 用於分頁控件的一個空陣列，通常用於初始化或臨時存儲數據。

  /** @2024/03/09 Update
   *  getFieldSnapshotList 用的分頁控件函數
   *  當分頁控件中的頁面發生變化時被呼叫的函數。
   *  @param page 這是新選擇的頁面編號。
   * 
   * 此函數更新當前頁面編號（ this.p_fieldSnapshotList ），從而觸發應用程式在該頁面上顯示相應的數據。
   * 這通常會導致對應用程式的狀態或模型中的數據進行分頁處理，以便只顯示當前頁面的數據。
   * 此方法與分頁管道（ ngFor 與 paginate 管道 ）緊密相連，確保頁面上正確地顯示數據。
   */
  pageChanged_fieldSnapshotList( page: number ) {

    this.p_getFieldSnapshotList = page; // 更新當前頁面編號

    console.log( "目前 Snapshot List 顯示的頁面為:", this.p_getFieldSnapshotList );
  }

  // @2024/03/09 Update
  // Get the Snapshot List in specific field
  getQueryFieldSnapshotList() {
    console.log('getQueryFieldSnapshotList() - Start');  // 在控制台中記錄開始獲取指定場域內的 Snapshot List 的訊息

    // 使用 clearTimeout 來取消任何已經設定但尚未執行的 setTimeout，
    // 這可以防止在重新獲取指定場域內的 Snapshot List 前執行之前的延遲任務，確保不會有多餘的執行或資源衝突。
    clearTimeout( this.refreshTimeout );

    this.isGetQueryFieldSnapshotLoading = true; // 設置加載旗標為 true，表示開始加載

    // 檢查是否在 Local 測試環境
    if ( this.commonService.isLocal ) {
      console.log( 'Fetching Snapshot List in Local' );  // 在控制台中記錄正在 Local 獲取指定場域內的 Snapshot List 的訊息

      // 從 Local 文件中讀取 Snapshot List 
      this.getFieldSnapshotList = this.fieldSnapshotList_LocalFiles.fieldSnapshotList_local;

      // 計算 fieldSnapshot 數組中元素的數量，即場域快照的總數
      // 使用可選鏈和空值合併運算符來避免 undefined 或 null
      this.totalItems_getFieldSnapshotList = this.getFieldSnapshotList.fieldSnapshot?.length || 0;
      console.log( 'Total items of fieldSnapshot:', this.totalItems_getFieldSnapshotList );

      // 定義一個空陣列，長度等於場域快照的總數，用於分頁控制
      this.nullList_getFieldSnapshotList = new Array( this.totalItems_getFieldSnapshotList );

      // 設置加載旗標為 false，表示加載完成
      this.isGetQueryFieldSnapshotLoading = false;

      console.log( '目前 local 環境中，指定場域內已儲存的 Snapshot List:\n', this.getFieldSnapshotList ); 

    } else {

      console.log('Fetching Snapshot List from API');  // 在控制台中記錄正在從 API 獲取指定場域內的 Snapshot List 的訊息

      // 從 API 獲取 Snapshot List 
      this.API_Field.queryFieldSnapshotList( this.selectField.id ).subscribe({
        next: ( res: FieldSnapshotList ) => {

          // 將 API 返回指定場域內的 Snapshot List 賦值給 getFieldSnapshotList 變數
          this.getFieldSnapshotList = res;

          // 計算 fieldSnapshot 數組中元素的數量，即場域快照的總數
          // 使用可選鏈和空值合併運算符來避免 undefined 或 null
          this.totalItems_getFieldSnapshotList = this.getFieldSnapshotList.fieldSnapshot?.length || 0;
          console.log( 'Total items of getFieldSnapshotList:', this.totalItems_getFieldSnapshotList );

          // 定義一個空陣列，長度等於場域快照的總數，用於分頁控制
          this.nullList_getFieldSnapshotList = new Array( this.totalItems_getFieldSnapshotList );

          // 設置加載旗標為 false，表示加載完成
          this.isGetQueryFieldSnapshotLoading = false;

          console.log( '目前指定場域內已儲存的 Snapshot List:\n', this.getFieldSnapshotList );

        },
        error: ( error ) => {

          // 在控制台中記錄獲取指定場域內的 Snapshot List 出錯的訊息
          console.error( 'Error fetching Snapshot List:', error );

          // 設置加載旗標為 false，表示加載出錯
          this.isGetQueryFieldSnapshotLoading = false;
        },
        complete: () => {

          // 在控制台中記錄指定場域內的 Snapshot List 獲取完成的訊息
          console.log( 'Snapshot List fetch completed' );
        }
      });
    }

    // 在控制台中記錄方法結束的訊息
    console.log( 'getQueryFieldSnapshotList() - End' );
  }

  // @2024/03/07 Add
  // 用來追蹤摺疊面板是否展開的狀態變量 ( For Field Snapshot List )
  isFieldSnapshotListPanelExpanded: boolean = false; // 初始設置為 false，表示摺疊面板在初始狀態下是未展開的

  // @2024/03/07 Add
  // 此函數用於切換摺疊面板的展開/摺疊狀態 ( For Field Snapshot List )
  togglePanel() {
    this.isFieldSnapshotListPanelExpanded = !this.isFieldSnapshotListPanelExpanded;               // 將 isFieldSnapshotListPanelExpanded 的值反轉，如果為 true 則變為 false，反之亦然
    console.log("Field Snapshot List 的摺疊面板展開狀態:", this.isFieldSnapshotListPanelExpanded ); // 在控制台輸出當前摺疊面板的展開狀態
  }


  // @2024/03/09 Update
  // ViewChild 裝飾器用於獲取模板中 #deleteSpecificFieldSnapshot_ConfirmWindow 的元素
  @ViewChild('deleteSpecificFieldSnapshot_ConfirmWindow') deleteSpecificFieldSnapshot_ConfirmWindow: any;

  deleteSpecificFieldSnapshot_ConfirmWindowRef!: MatDialogRef<any>;

  // 用於存儲點擊對應到的 Field Snapshot  @2024/03/07 Add
  selectedSnapshot: FieldSnapshot = {} as FieldSnapshot;

  // 用於開啟删除場域快照確認視窗 @2024/03/09 Update 
  openDeleteSpecificFieldSnapshot_ConfirmWindow( snapshot: FieldSnapshot ) {

    // 將選中的場域快照賦值給 selectedSnapshot
    this.selectedSnapshot = snapshot;

    // 輸出將要刪除的場域快照名稱，用於記錄或調整
    console.log( "Deleted snapshot name: ", this.selectedSnapshot.name );

    // 使用 MatDialog 服務開啟確認刪除的對話框
    this.deleteSpecificFieldSnapshot_ConfirmWindowRef = this.dialog.open(
      this.deleteSpecificFieldSnapshot_ConfirmWindow, { id: 'deleteSpecificFieldSnapshot_ConfirmWindow' }
    );

    // 訂閱對話框關閉後的事件
    this.deleteSpecificFieldSnapshot_ConfirmWindowRef.afterClosed().subscribe(confirm => {
      // 確認刪除處理邏輯
    });
  }

  // 用於確認刪除場域快照 @2024/03/09 Update 
  confirmDeleteSpecificFieldSnapshot() {

    this.isGetQueryFieldSnapshotLoading = true; // 設置加載旗標為 true，表示開始加載刪除
    
    // 檢查是否是 Local 環境
    if ( this.commonService.isLocal ) {

      // 在控制台輸出調試訊息
      console.log('Local environment - simulate snapshot deletion.');

      // 調用 Local 模式刪除場域的函數，傳入場域快照名稱
      this.deleteSpecificSnapshotInLocal( this.selectedSnapshot.name );

      // 刷新場域快照列表或進行其他更新
      this.getQueryFieldSnapshotList();

      // 設置加載旗標為 false，表示刪除加載完成
      this.isGetQueryFieldSnapshotLoading = false;

    } else {

      // 非 Local 環境，調用後端 API 進行刪除
      this.API_Field.removeFieldSnapshotInfo( this.selectedSnapshot.id ).subscribe({
        next: ( response ) => {

          // 刪除成功的回調，輸出成功訊息和後端響應
          console.log( 'Snapshot deleted successfully', response );

          // 刷新場域快照列表或進行其他更新
          this.getQueryFieldSnapshotList();

          // 設置加載旗標為 false，表示刪除加載完成
          this.isGetQueryFieldSnapshotLoading = false;
        },
        error: ( error ) => {
          console.error( 'Failed to delete snapshot:', error );

          // 設置加載旗標為 false，表示刪除加載出錯
          this.isGetQueryFieldSnapshotLoading = false;
        }
      });
    }
  }

  // @2024/03/07 Add 
  // 用於模擬 local 環境中刪除指定場域快照 ( 依據 name 進行刪除 )
  deleteSpecificSnapshotInLocal( snapshotName: string ) {

    // 輸出將要刪除的場域快照名稱，用於記錄和調試
    console.log( "The delete field name:", snapshotName )

    // 確保 this.fieldSnapshotList_LocalFiles.fieldSnapshotList_local.fieldSnapshot 是一個陣列
    if ( Array.isArray( this.fieldSnapshotList_LocalFiles.fieldSnapshotList_local.fieldSnapshot ) ) {

      // 從場域快照列表中過濾掉要刪除的場域快照
      this.fieldSnapshotList_LocalFiles.fieldSnapshotList_local.fieldSnapshot =
            this.fieldSnapshotList_LocalFiles.fieldSnapshotList_local.fieldSnapshot.filter( snapshot => snapshot.name !== snapshotName );
    
    } else {

      // 如果 fieldSnapshotList_LocalFiles.fieldSnapshotList_local.fieldSnapshot 不是陣列，輸出錯誤訊息
      console.error('fieldSnapshotList_local.fieldSnapshot is not an array or undefined');
    }
  }

// For Field Snapshot Set @2024/03/07 Update by yuchen ↑

}

// 此頁面開發完會刪除
export interface OCloudList {
  id: string;
  name: string;
  dmsCount: number;
  nfCount: number;
  imsEndpoint: string;
  deployStatus: string;
}