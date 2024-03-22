import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../shared/common.service';
import { SoftwareList } from './../../software-management/software-management.component';
import { SoftwareLists } from './../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';
import { FmsgList } from './../../fault-management/fault-management.component';
import { FaultMessages } from './../../fault-management/fault-management.component';
import { Subscription } from 'rxjs';
import { XMLParser } from "fast-xml-parser";

// For import APIs of Schedule Management 
import { apiForScheduleMgmt }     from '../../shared/api/For_Schedule_Mgmt';  // @2024/03/15 Add

// 引入儲存各個資訊所需的 interfaces of Schedule Management
import { ScheduleInfo }           from '../../shared/interfaces/Schedule/For_queryJobTicketInfo';  // @2024/03/15 Add

// For import local files of Schedule Management 
import { localScheduleInfo }      from '../../shared/local-files/Schedule/For_queryJobTicketInfo'; // @2024/03/15 Add

//component Info
export interface BsComponentInfo {
  id: string;
  name: string;
  ip: string;
  port: string;
  account: string;
  key: string;
  comtype: number;
  firm: string;
  modelname: string;
  status: number;
  info: Info;
  sm: {
    softwareInventory: {
      softwareSlot: SoftwareSlot[];
    };
  };
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

export interface ComponentInfosw{
  uploadinfos: Uploadinfos[];
}

export interface Info {
  data: string;
}

interface SoftwareSlot {
  name: string;
  status: string;
  active?: string;
  running?: string;
  access?: string;
  vendorCode?: string;
  buildId?: string;
  buildName?: string;
  buildVersion?: string;
  files?: Files;
}
interface Files {
  name: string;
  version: string;
  localPath: string;
  integrity: string;
}

@Component({
  selector: 'app-schedule-info',
  templateUrl: './schedule-info.component.html',
  styleUrls: ['./schedule-info.component.scss']
})

export class ScheduleInfoComponent implements OnInit {

  sessionId: string = '';   // sessionId 用於存儲當前會話 ID
  refreshTimeout!: any;     // refreshTimeout 用於存儲 setTimeout 的引用，方便之後清除
  refreshTime: number = 5;  // refreshTime 定義自動刷新的時間間隔（秒）

  constructor(
  
    private             fb: FormBuilder,
    private         router: Router,
    private          route: ActivatedRoute,
    private         dialog: MatDialog,
    public   commonService: CommonService,
    public languageService: LanguageService,

    public             API_Schedule: apiForScheduleMgmt,  // API_Schedule 用於排程管理相關的 API 請求
    public  scheduleInfo_LocalFiles: localScheduleInfo,   // scheduleInfo_LocalFiles 用於從 Local Files 獲取排程資訊
  
  ) {
    this.severitys = this.commonService.severitys;
    this.cmpsource = this.commonService.cmpsource;
  }

  // @2024/03/17 Add
  scheduleId:   string = '';      // 用於存儲當前選中的排程 ID
  scheduleType: string = '';      // 用於存儲當前選中的排程類型

  // @2024/03/17 Update
  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();

    this.route.params.subscribe((params) => {
      this.scheduleId = params['id'];
      this.scheduleType = params['type'];
      console.log('scheduleId: ' + this.scheduleId + ', scheduleType: ' + this.scheduleType + ',\nsend from /main/schedule-mgr');
      this.getQueryJobTicketInfo();
    });

  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }

  cloudId: string = '';
  cloudName: string = '';
  newip: string = '';
  // utilizationPercent: number = 0;
  bsComponentInfo: BsComponentInfo = {} as BsComponentInfo;
  softwareList: SoftwareList[] = [];
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  RunRefreshTimeout!: any;
  RunRefreshTime: number = 3;
  @ViewChild('updateModal') updateModal: any;
  @ViewChild('updateIPModal') updateIPModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateIPModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;
  /* CRITICAL,MAJOR,MINOR,WARNING */
  severitys: string[];

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };



  scheduleInfo: ScheduleInfo = {} as ScheduleInfo; // 用於存儲從伺服器或 Local 文件獲取的排程資訊
  isLoadingScheduleInfo = true; // 加載狀態的標誌，初始設置為 true
  /** @2024/03/17 Add
   *  用於獲取排程資訊。
   *  根據是否處於 Local 模式，它會從 Local 文件或通過 API 從伺服器獲取排程資訊。
   */
  getQueryJobTicketInfo() {
    console.log( 'getQueryJobTicketInfo() - Start' );
    this.isLoadingScheduleInfo = true;   // 開始加載數，顯示進度指示器

    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時，避免重複或不必要的操作

    if ( this.commonService.isLocal ) {

      // Local 模式: 使用 Local 文件提供的數據
      this.scheduleInfo = this.scheduleInfo_LocalFiles.scheduleInfo_local.find( info => info.id === this.scheduleId ) || {} as ScheduleInfo;
      console.log( 'In local - Get the ScheduleInfo:', this.scheduleInfo );

      this.isLoadingScheduleInfo = false; // Local 模式下，數據加載快速完成,直接設置為 false

    } else {

      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.API_Schedule.queryJobTicketInfo( this.scheduleId ).subscribe({
        next: ( res ) => {

          // 請求成功，獲得排程資訊
          console.log( 'Get the ScheduleInfo:', res );

          this.scheduleInfo = res; // 更新排程資訊
        },
        error: ( error ) => {
          // 請求出現錯誤
          console.error( 'Error fetching job ticket info:', error );
          this.isLoadingScheduleInfo = false; // 出錯時設置加載標誌為 false
        },
        complete: () => {
          // 數據流處理完成（ 無論成功或失敗 ）
          console.log( 'Job ticket info fetch completed' );
          this.isLoadingScheduleInfo = false; // 數據加載完成
        }
      });
    }
  }





  nfRunRefresh() {
    clearTimeout(this.refreshTimeout);
    this.RunRefreshTimeout = window.setTimeout(() => this.getOcloudPerformance(), this.RunRefreshTime * 1000);
    this.RunRefreshTimeout = window.setTimeout(() => this.getQueryJobTicketInfo(), this.RunRefreshTime * 1000);
  }
  getOcloudPerformance() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudPerformanceDeal();
    } else {
      clearTimeout(this.refreshTimeout);
      this.commonService.queryOcloudPerformance(this.cloudId).subscribe(
        res => {
          console.log('getOcloudPerformance:');
          console.log(res);
          this.ocloudPerformanceDeal();
        }
      );
    }
  }

  getSoftwareList() {
    let type = '0'
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareList = this.commonService.softwareList;
      this.softwareDeal();
    } else {
      if (this.cloudName === 'Wind River' || this.cloudName === 'windriver'){
        type = '-3';
      }
      this.commonService.querySoftwareList('', type, '').subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.softwareList = res as SoftwareList[];
          this.softwareDeal();
        }
      );
    }
  }

  softwareDeal() {
    this.fileNameMapSoftware = new Map();
    this.softwareList.forEach((row) => {
      this.fileNameMapSoftware.set(row.fileName, row);
    });
  }


  softwareVersion(): string {
    const fileName = this.updateForm.controls['fileName'].value;
    if (fileName === '') {
      return '';
    } else {
      const software = this.fileNameMapSoftware.get(fileName) as any;
      return software.version;
    }
  }

  ocloudInfoDeal() {
  }

  ocloudPerformanceDeal() {}

  severityText(severity: string): string {
    return this.commonService.severityText(severity);
  }

  severityCount(severity: string) {
  }

  // 返回 Schedule Management 主頁
  back() {
    this.router.navigate(['/main/schedule-mgr']);
  }

  pageChanged( page: number ) {
    this.p = page;
  }

  get msgToDisplay(): FaultMessages[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    // 否則，顯示全部 this.fmsgList.faultMessages
    return this.isSearch ? this.filteredFmList : this.fmsgList.faultMessages;
  }

  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.cloudName, 'All']);
  }

  search() { }

  openUpdateModel() {
    this.formValidated = false;
    this.updateForm = this.fb.group({
      'type': new FormControl('imageUrl'),
      'imageUrl': new FormControl('', [Validators.required]),
      'fileName': new FormControl('')
    });
    this.updateModalRef = this.dialog.open(this.updateModal, { id: 'updateModal' });
    this.updateModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

  updateBasicError: boolean = false;
  openUpdateIPModel() {
    this.formValidated = false;
    this.updateForm = this.fb.group({
      newip: ['',],
    });
    this.updateIPModalRef = this.dialog.open(this.updateIPModal, { id: 'updateIPModal' });
    this.updateIPModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
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

  update() {
    this.formValidated = true;
    if (!this.updateForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.updateModalRef.close();
    } else {
      const body: any = {
        sessionid: this.sessionId
      };
      if (this.updateForm.controls['type'].value === 'imageUrl') {
        const imageUrlSplit = this.updateForm.controls['imageUrl'].value.split('/');
        body['fileName'] = imageUrlSplit[imageUrlSplit.length - 1];
      } else {
        body['fileName'] = this.updateForm.controls['fileName'].value;
        body['version'] = this.softwareVersion();
      }
      this.commonService.applyOcloudSoftware(body).subscribe(
        () => console.log('Update Successful.')
      );
      this.updateModalRef.close();
      this.getQueryJobTicketInfo();
    }
    this.getQueryJobTicketInfo();
  }

  updateNFSuccessful: boolean | null = null; 
  hideUpdateIcon() {
    setTimeout(() => {
      this.updateNFSuccessful = null;
    }, 3000);
  }
  updateIPAddress() {
    this.updateBasicError = false; // Reset the error state
    const newIPControl = this.updateForm.get('newip');
    if (newIPControl) {
      this.newip = newIPControl.value;
    }
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)$/;
    if (this.commonService.isLocal) {
      /* local file test */
      this.updateIPModalRef.close();
    } else {
      const isIPValid = ipPattern.test(this.newip);
      if (isIPValid) {
        // Valid IP and non-empty port, proceed with the update
        const body: any = {
          ip: this.newip,
        };
        // this.commonService.queryOCInfoUpdate(body).subscribe(
        //   () => console.log('Update Successful.')  
        // );
        this.updateNFSuccessful = true;
        this.hideUpdateIcon();
        this.updateIPModalRef.close();
        this.getQueryJobTicketInfo();
      } else {
        // Form validation failed, set the error flag
        this.updateNFSuccessful = false;
        this.hideUpdateIcon();
        this.updateBasicError = true;
      }
    }
    this.getQueryJobTicketInfo();
  }

  veiw() {
    const url = '/main/nf-mgr';
    this.router.navigate([url]);
  }

  goPerformanceMgr() {
    this.router.navigate(['/main/performance-mgr', 'ocloud']);
  }

  goNFMgr( ) {
    const nfId = "";
    this.router.navigate(['/main/nf-mgr', nfId]);
  }

  comId: string = '';
  uploadinfos: Uploadinfos[] = [];
  componentInfosw: ComponentInfosw = {} as ComponentInfosw;

  ListRefreshTime: number = 5;

  cmpsource: string[];
  fmsgList: FmsgList = {} as FmsgList;
  searchForm!: FormGroup;
  p: number = 1;            // 當前頁數
  pageSize: number = 5;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  queryFaultMessageScpt!: Subscription;
  nullList: string[] = [];  // 給頁籤套件使用
  timeSort: '' | 'asc' | 'desc' = '';
  isSearch: boolean = false;
  filteredFmList: FaultMessages[] = [];
  isActive = false;
  activeMap: any = {
    box1 : true,
    box2 : false,
    box3 : false,
    box4 : false,
    box5 : false
  };

}

