
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MatStepperModule } from '@angular/material/stepper';      // @2024/01/31 Add for Create Field
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // @2024/01/31 Add for Create Field
import { MatInputModule } from '@angular/material/input';          // @2024/01/31 Add for Create Field
import { MatFormFieldModule } from '@angular/material/form-field'; // @2024/01/31 Add for Create Field

import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';

// For import APIs of Field Management 
import { apiForField } from '../shared/api/For_Field';  // @2024/01/29 Add 

// For import interface of queryFieldList
import { FieldList, Fields } from '../shared/interfaces/Field/For_queryFieldList'; // @2024/01/29 Add 

// For import interfaces of queryBsList
import { BSList, Basestation } from '../shared/interfaces/BS/For_queryBsList'; // @2024/02/01 Add 

// For import interfaces of createField
import { ForCreateOrUpdateField, Bsinfo } from '../shared/interfaces/Field/For_createField_or_updateField'; // @2024/02/01 Add 

// For import local files of Field Management 
import { localFieldList } from '../shared/local-files/Field/For_queryFieldList';  // @2024/01/29 Add
import { localBSList } from '../shared/local-files/BS/For_queryBsList';           // @2024/02/01 Add

@Component({
  selector: 'app-field-management',
  templateUrl: './field-management.component.html',
  styleUrls: ['./field-management.component.scss']
})

export class FieldManagementComponent implements OnInit, OnDestroy {

  refreshTimeout!: any;
  refreshTime: number = 5;

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  constructor(

    private router:              Router,
    private dialog:              MatDialog,
    private commonService:       CommonService,
    private fb:                  FormBuilder,
    public languageService:      LanguageService,
    public API_Field:            apiForField,       // @2024/01/29 Add for import API of Field Management 
    public fieldList_LocalFiles: localFieldList,    // @2024/01/29 Add for import Field List Local Files
    public bsList_LocalFiles:    localBSList,       // @2024/02/01 Add for import BS List Local Files
    
  ) {

    this.createFieldCreationForm(); // 初始化並創建每個場域設置用的 FormGroup @2024/02/02 Add
  }
 

  sessionId: string = ''; // 宣告 sessionId 屬於字串型態

  ngOnInit() {

    this.sessionId = this.commonService.getSessionId();

    // Field Summary
    this.getQueryFieldList();
  }

  // 銷毀 Component 時的清理工作
  ngOnDestroy() {

    clearTimeout( this.refreshTimeout );

    // 如存在對 queryFieldList 的 API 請求訂閱，則取消訂閱以避免內存洩漏
    if ( this.queryFieldList ) this.queryFieldList.unsubscribe();

    // 如存在對 queryBsList 的 API 請求訂閱，則取消訂閱以避免內存洩漏
    if ( this.queryBsList ) this.queryBsList.unsubscribe();
  }


  fieldList: FieldList = {} as FieldList; // @11/30 Add by yuchen
  ueNum: string = '0';                    // @11/30 Add by yuchen
  selectField!: Fields;                   // @11/30 Add by yuchen

  // queryFieldList 用於管理 HTTP 的訂閱請求，'!' 確保在使用前已賦值。
  queryFieldList!: Subscription;  // @11/30 Add by yuchen

  isLoading = true; // 加載狀態的標誌，初始設置為 true @12/28 Add for Progress Spinner

  // @2024/01/29 Update by yuchen
  getQueryFieldList() {
    console.log('getQueryFieldList() - Start');
    this.isLoading = true;        // 開始加載數據時設置為 true @12/28 Add for Progress Spinner 

    clearTimeout( this.refreshTimeout );
  
    if ( this.commonService.isLocal ) {

      // 本地模式使用本地數據
      this.fieldList = this.fieldList_LocalFiles.fieldList;
      //this.FieldListDeal();
      this.isLoading = false;     // 數據加載完成，設置為 false @12/28 Add for Progress Spinner
      
    } else {

      // 使用 API_Field 中的 queryFieldList() 發起 HTTP GET 請求
      this.API_Field.queryFieldList().subscribe({
        next: ( res ) => {

          console.log('getQueryFieldList:', res);
          this.fieldList = res;
          // this.FieldListDeal();

        },
        error: ( error ) => {

          console.error('Error fetching field info:', error);
          this.isLoading = false; // 發生錯誤時也要設置為 false @12/28 Add for Progress Spinner

        },
        complete: () => {

          console.log('Field info fetch completed');
          this.isLoading = false; // 加載完成 @12/28 Add for Progress Spinner

        }
      });
    }
  }

  // @11/30 Add by yuchen ( 該函數應該用不到 )
  FieldListDeal() {

    // 輸出檢查點
    console.log('Field list length:', this.fieldList.fields?.length);

    // 計算 fields 數組中元素的數量，即場域的總數
    //this.totalItems = this.fieldList.fields.length;
    this.totalItems = this.fieldList.fields?.length || 0;  // 使用可選鏈和空值合併運算符來避免 undefined 或 null
    console.log('Total items:', this.totalItems);
    
    // 定義一個空陣列，長度等於場域的總數
    this.nullList = new Array( this.totalItems );
  
    // 使用 setTimeout 設定一個定時刷新
    this.refreshTimeout = window.setTimeout( () => {
      if ( this.p === 1 ) {
        console.log(`page[${this.p}] ===> refresh.`);
        // this.getQueryFieldList();  // 取得場域訊息函數
      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100 ); // timeout: 100 ms
  }


// For Field Creation Setting @2024/02/02 Update ↓

  // @2024/01/31 Add by yuchen
  isLinear = false;
  firstFormGroup_FieldName!:    FormGroup;
  secondFormGroup_fieldBounds!: FormGroup;
  thirdFormGroup_PhoneNum!:     FormGroup;
  
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

  // 用於重置所有輸入的"建立場域"設定 @2024/02/02 Add
  resetFieldCreationForm() {
    console.log("Resetting field creation form settings.");

    // 重置各個步驟的 FormGroup
    this.firstFormGroup_FieldName.reset();
    this.secondFormGroup_fieldBounds.reset();
    this.thirdFormGroup_PhoneNum.reset();
    
    // 重置 displayedBSs 中的每個基站的選擇狀態
    this.displayedBSs.forEach( bs => bs.selected = false );

    // 清空 ( 初始化 ) 儲存選擇基站的陣列
    this.selectedBsInfos = [];

    // 重置全選 Checkbox 的狀態
    this.isAllSelected = false;

    // 如果還有其他相關的狀態需要重置，也應該在這裡進行
    // 例如，如果有分頁或過濾器的狀態，也應該一併重置

    console.log("Field creation form settings have been reset.");
  }

  // 引用場域建立視窗組件  @2024/02/02 Update by yuchen
  @ViewChild('fieldCreationWindow') fieldCreationWindow: any;
  fieldCreationWindowRef!: MatDialogRef<any>;
  fieldCreationFormValidated = false;

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

    // 檢查是否在本地測試環境
    if ( this.commonService.isLocal ) {
      console.log( 'Fetching BS List in Local' );  // 在控制台中記錄正在本地獲取基站列表的訊息

      // 從本地文件中讀取基站列表
      this.bsList = this.bsList_LocalFiles.bsList_local;

      // 對本地的基站列表應用篩選函數
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
  // 提交場域建立表單的函數。如果處於本地模式，則模擬提交過程；如果處於生產模式，則向後端 API 發送請求。
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
              bsinfo: this.selectedBsInfos,                         // 已選擇的基站信息
               phone: this.thirdFormGroup_PhoneNum.value.PhoneNum,   // 管理者電話號碼

      // 使用者不可調整:
      session: this.sessionId // 會話識別碼
    };

    // 檢查是否在本地環境下模擬執行
    if ( this.commonService.isLocal ) {

      // 本地模式下模擬場域建立過程
      console.log( "本地模擬場域建立，提交的數據:", fieldCreationData );

       // 本地模式建立成功後，刷新場域列表
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




  // @12/05 Update by yuchen
  viewFieldDetail( fields: Fields ) {
    this.selectField = fields;
    console.log("View Detail of the field id:", this.selectField.id, "and the field name: ", this.selectField.name);
    this.router.navigate(['/main/field-mgr/info', this.selectField.id, this.selectField.name]);
  }
  
  // @12/01 Update by yuchen
  viewFieldAlarm(fields: Fields) {
    this.selectField = fields;
    console.log("Selected alarm field name: ", this.selectField.name);
    this.router.navigate(['/main/fault-mgr', this.selectField.name, 'All']);
  }

  // @2024/01/29 Add
  // ViewChild 裝飾器用於獲取模板中 #deleteField_ConfirmWindow 的元素引用
  @ViewChild('deleteField_ConfirmWindow') deleteField_ConfirmWindow: any;

  // @2024/01/29 Add
  // MatDialogRef 用於控制打開的對話框
  deleteField_ConfirmWindowRef!: MatDialogRef<any>;

  // 根據用戶的選擇開啟刪除場域的對話框 @2024/01/29 Update by yuchen
  openDeleteField_ConfirmWindow( fields: Fields ) {

    // 將選中的場域賦值給 selectField
    this.selectField = fields;

    // 輸出將要刪除的場域名稱，用於記錄和調試
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

      // 不是 Local 環境，調用後端 API 進行刪除
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
  // 模擬在 Local 環境中刪除場域的函數 ( Local 依據 name 控制刪除 )
  deleteFieldInLocal( fieldName: string ) {

    // 輸出將要刪除的場域名稱，用於記錄和調試
    console.log( "The delete field name:", fieldName )

    // 確保 fieldList_LocalFiles.fieldList.fields 是一個陣列
    if ( Array.isArray( this.fieldList_LocalFiles.fieldList.fields ) ) {

      // 從場域列表中過濾掉要刪除的場域
      this.fieldList_LocalFiles.fieldList.fields = this.fieldList_LocalFiles.fieldList.fields.filter( field => field.name !== fieldName );
    
    } else {

      // 如果 fieldList_LocalFiles.fieldList.fields 不是陣列，輸出錯誤訊息
      console.error( 'fieldList.fields 不是陣列或為 undefined' );
    }
  }


  // @11/30 Add by yuchen
  openSnapshot(fields: Fields){
    this.selectField = fields;
  }

  pageChanged(page: number) {
    this.p = page;
  }

}








export interface OCloudList {
  id: string;
  name: string;
  dmsCount: number;
  nfCount: number;
  imsEndpoint: string;
  deployStatus: string;
}