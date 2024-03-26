import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

// import APIs of BS Management @2024/03/19 Add 
import { apiForBSMgmt } from '../shared/api/For_BS_Mgmt';

// 引入儲存各個資訊所需的 interfaces @2024/03/19 Add 
import { BSList, Basestation } from '../shared/interfaces/BS/For_queryBsList';

// 引入所需 Local Files @2024/03/19 Add 
import { localBSList } from '../shared/local-files/BS/For_queryBsList';

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
  querySoftwareScpt!: Subscription;
  querySWAdvanceSearchScpt!: Subscription;

  comtype: Item[] = [
    { displayName: 'CU', value: '1' },
    { displayName: `DU`, value: '2' },
    { displayName: `CU+DU+RU`, value: '3' }
  ];

  constructor(
    private         dialog: MatDialog,
    private         router: Router,
    private           http: HttpClient,
    private             fb: FormBuilder,
    private  commonService: CommonService,
    public languageService: LanguageService,

    public  API_BS: apiForBSMgmt,           // @2024/03/19 Add for import API of BS Management
    
    public  bsList_LocalFiles: localBSList, // @2024/03/19 Add for import BS List Local Files 

  ) {
    this.comtype.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
    this.createSearchForm();
    this.createAdvancedForm();
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.afterSearchForm = _.cloneDeep(this.searchForm);

    this.getQueryBsList(); // @2024/03/19 Add for getting BS List
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
    if (this.querySoftwareScpt) this.querySoftwareScpt.unsubscribe();
    if (this.querySWAdvanceSearchScpt) this.querySWAdvanceSearchScpt.unsubscribe();
  }

  bsList: BSList = {} as BSList;   // @2024/03/19 Add
  isGetQueryBsListLoading = false; // 用於表示加載 BS List 的 flag，初始設置為 false @2024/03/19 Add for Progress Spinner

  // @2024/03/21 Update
  // Get the BS List in the O1 System
  getQueryBsList() {
    console.log( 'getQueryBsList() - Start' );       // getQueryBsList() 啟動 
    console.log( 'Start fetching info of Bs List' ); // 開始獲取 BS List 資訊
    clearTimeout( this.refreshTimeout );

    this.isGetQueryBsListLoading = true; // 開始顯示 Spinner 表載入 BS List 數據中

    // 檢查是否為 local 環境
    if ( this.commonService.isLocal ) { 

      // For testing with local files
      console.log( 'Start fetching BS List in Local' ); // 開始獲取 Local BS List 資訊

      // 模擬從 Local files 獲取數據並初始化 selected 屬性
      this.bsList = this.bsList_LocalFiles.bsList_local;
      this.queryBsListDeal();
      console.log( 'BS List in Local:', this.bsList );
      
      this.isGetQueryBsListLoading = false; // 加載完成，隱藏 spinner

    } else {
      console.log('Start fetching BS List from API'); // 開始獲取 BS List 資訊

      // Use API_BS's queryBsList() to make an HTTP GET request
      this.API_BS.queryBsList().subscribe({
        next: ( res: BSList ) => {

          this.bsList = res;
          this.queryBsListDeal();
          console.log( '基站列表資訊\n( BS List ):', this.bsList ); // 取得的 BS List 資訊 ( Obtained BS List information )
          
          this.isGetQueryBsListLoading = false; // 取得後隱藏 spinner
        },
        error: ( error ) => {
          console.error( '獲取基站列表資訊出錯:', error );
          console.error( 'Error fetching - BS List:', error );
          this.isGetQueryBsListLoading = false; // 出錯時也應隱藏 spinner
        },
        complete: () => {
          console.log('基站列表資訊獲取完成');
          console.log( 'BS List - fetch completed' );
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

  /** @2024/03/22 Add
   * 導航到選定基站的詳細資訊頁面。
   * @param BS 從 BS 列表中選擇的 BS 物件。
   */
  viewBSDetailInfo( BS: Basestation ) {

    this.selectBS = BS; // 設定當前選擇的 BS。
    console.log( "View Detail of the BS id:", this.selectBS.id, "and the BS name: ", this.selectBS.name,
                   "and the BS type: ", this.selectBS.bstype, "and the BS cellCount:", this.selectBS.cellCount ); // 輸出選擇的基站 ID、名稱和類型。
    
    // 導航到 BS 管理的詳細資訊頁面，帶上 BS 的 ID、名稱、類型和Cell數作為路由參數。
    this.router.navigate( ['/main/bs-mgr/info', this.selectBS.id, this.selectBS.name, this.selectBS.bstype, this.selectBS.cellCount ] );
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
        },
        error: ( error ) => {

          // 刪除失敗的回調,輸出錯誤訊息
          console.error('Failed to remove BS:', error);

          // 關閉加載指示器
          this.isGetQueryBsListLoading = false;
        },
        complete: () => {

          // 請求完成後的回調,不管成功或失敗都會執行
          // 關閉加載指示器
          this.isGetQueryBsListLoading = false;
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


  

  createSearchForm() {
    const nowTime = this.commonService.getNowTime();
    this.searchForm = this.fb.group({
      'firm': new FormControl(''),
      'model': new FormControl(''),
      'uploadtype': new FormControl('All'),
      'version': new FormControl(''),
      'fileName': new FormControl(''),
    });
  }
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
    this.createModalRef = this.dialog.open(this.createBSModal, { id: 'createBSModal' });
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
        }
      );
    }
  }



  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.componentList.components.length; i++) {
        if (this.selectBS.id === this.commonService.componentList.components[i].id) {
          this.commonService.componentList.components.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
    } else {
      this.commonService.deleteSoftware(this.selectBS.id).subscribe(
        res => {
          this.deleteModalRef.close();
        }
      );
    }
  }
  changeType(e: MatButtonToggleChange) {
    this.formValidated = false;
    if (e.value === 'imageUrl') {
      this.updateForm.controls['imageUrl'].setValidators([Validators.required]);
      this.updateForm.controls['fileName'].setValidators(null);
      this.updateForm.controls['fileName'].setValue('');
    } else {
      this.updateForm.controls['imageUrl'].setValidators(null);
      this.updateForm.controls['imageUrl'].setValue('');
      this.updateForm.controls['fileName'].setValidators([Validators.required]);
    }
    this.updateForm.controls['imageUrl'].updateValueAndValidity();
    this.updateForm.controls['fileName'].updateValueAndValidity();
  }

  createAdvancedForm() {
    this.advancedForm = this.fb.group({
      'firm': new FormControl(''),
      'model': new FormControl(''),
      'uploadtype': new FormControl(''),
      'version': new FormControl(''),
      'from': new FormControl(''),
      'to': new FormControl(''),
      'fileName': new FormControl('')
    });
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
      this.queryBsListDeal();
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

  pageChanged(page: number) {
    this.p = page;
  }

  search() {
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
    this.createAdvancedForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
  }

}
