import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges , TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss'],
})
export class ScheduleManagementComponent implements OnInit {
  
  sessionId: string = '';   // sessionId 用於存儲當前會話 ID
  refreshTimeout!: any;     // refreshTimeout 用於存儲 setTimeout 的引用，方便之後清除
  refreshTime: number = 5;  // refreshTime 定義自動刷新的時間間隔（秒）

  
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
    
    private           http: HttpClient,
    private             fb: FormBuilder,
    private         dialog: MatDialog,
    private         router: Router,
    private  commonService: CommonService,
    public languageService: LanguageService,

    public             API_Schedule: apiForScheduleMgmt,  // API_Schedule 用於排程管理相關的 API 請求
    public  scheduleList_LocalFiles: localScheduleList,   // scheduleList_LocalFiles 用於從 Local Files 獲取排程列表數據
  
  ) {

    this.comtype.forEach( ( row ) => this.typeMap.set( Number( row.value ), row.displayName ) );
    this.createSearchForm();
    this.createAdvancedForm();

  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.afterSearchForm = _.cloneDeep( this.searchForm );
    this.getQueryJobTicketList();

    this.languageService.languageChanged.subscribe(
      (language) => this.updateTicketStatusInfo()
    );
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
    if (this.querySoftwareScpt) this.querySoftwareScpt.unsubscribe();
    if (this.querySWAdvanceSearchScpt) this.querySWAdvanceSearchScpt.unsubscribe();
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


  scheduleList: ScheduleList = {} as ScheduleList; // 用於存儲從伺服器或 Local 文件獲取的排程列表數據
  isLoadingScheduleList = true; // 加載狀態的標誌, 初始設置為 true

  // queryJobTicketList 用於管理 HTTP 的訂閱請求,'!' 確保在使用前已賦值。
  queryJobTicketList!: Subscription; // @2024/03/15 Add

  /** @2024/03/17 Add
   * 用於獲取排程列表。
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


// 控制顯示排程狀態的 icon 與訊息 ↓

  // @2024/03/21 Add
  // 用於存儲排程狀態對應的 icon 和訊息
  ticketStatusInfo = [
    { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] },
    { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobDailyString'] + ')' },
    { icon: 'blueLight', message: this.languageService.i18n['sm.jobOnGoingString'] },
    { icon: 'greenLight', message: this.languageService.i18n['sm.jobSuccessString'] },
    { icon: 'redLight', message: this.languageService.i18n['sm.jobFailString'] },
    { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
  ];

  // @2024/03/21 Add
  // 根據排程狀態獲取對應的 icon 和訊息
  getTicketStatusInfo( schedule: Schedule ) {
    const ticketStatus = parseInt( schedule.ticketstatus );
    const executedType = parseInt( schedule.executedtype );

    if ( ticketStatus === 0 || ticketStatus === 1 ) {
      if ( executedType === 1 ) {
        return this.ticketStatusInfo[1];
      } else if ( executedType === 2 ) {
        return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobWeeklyString'] + ')' };
      } else if ( executedType === 3 ) {
        return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobMonthlyString'] + ')' };
      }
    }

    return this.ticketStatusInfo[ticketStatus];
  }

  // @2024/03/21 Add
  // 用於更新根據排程狀態獲取對應的 icon 和訊息
  updateTicketStatusInfo() {
    this.ticketStatusInfo = [
      { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] },
      { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobDailyString'] + ')' },
      { icon: 'blueLight', message: this.languageService.i18n['sm.jobOnGoingString'] },
      { icon: 'greenLight', message: this.languageService.i18n['sm.jobSuccessString'] },
      { icon: 'redLight', message: this.languageService.i18n['sm.jobFailString'] },
      { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
    ];
  }

// 控制顯示排程狀態的 icon 與訊息 ↑



  selectSchedule!: Schedule;  // 用於存儲當前選中的排程訊息 @2024/03/17 Add
  
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

  pageChanged(page: number) {
    this.p = page;
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
    this.createAdvancedForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getQueryJobTicketList();
  }

}
