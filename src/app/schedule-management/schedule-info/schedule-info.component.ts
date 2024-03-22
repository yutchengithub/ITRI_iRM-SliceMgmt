import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { SoftwareList } from '../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';

// For import APIs of Schedule Management 
import { apiForScheduleMgmt }     from '../../shared/api/For_Schedule_Mgmt';  // @2024/03/15 Add

// 引入儲存各個資訊所需的 interfaces of Schedule Management
import { ScheduleInfo }           from '../../shared/interfaces/Schedule/For_queryJobTicketInfo';  // @2024/03/15 Add

// For import local files of Schedule Management 
import { localScheduleInfo }      from '../../shared/local-files/Schedule/For_queryJobTicketInfo'; // @2024/03/15 Add

export interface OcloudInfo {
  id: string;
  name: string;
  imsEndpoint: string;
  ipAddress: string;
  description: string;
  status: string;
  softwareVersion: string;
  callbackUri: string;
  dms: Dms[];
  nf: Nf[];
  fault: Fault;
  resourcepool: Resourcepool[];
}

export interface Dms {
  id: string;
  name: string;
  dmsEndpoint: string;
}

export interface Nf {
  id: string;
  name: string;
  dmsName: string;
  status: number;
  actionstatus: string;
}

export interface Fault {
  critical: number;
  major: number;
  minor: number;
  warning: number;
}

export interface Resourcepool {
  poolId: string;
  poolName: string;
  active?: boolean;
  node: Node[];
}

export interface Node {
  nodeId: string;
  nodeName: string;
  cpu: Cpu[];
  memory: Memory,
  nic: Nic[];
  storage: Storage;
}

export interface Cpu {
  id: string;
  name: string;
  product: string;
  capacity: string;
}

export interface Nic {
  id: string;
  name: string;
  product: string;
  capacity: string;
}

export interface Memory {
  name: string;
  size: string;
}

export interface Storage {
  total: string;
  items: Items[];
}

export interface Items {
  id: string;
  name: string;
  size: string;
}

export interface OcloudPerformance {
  // totalCpu: number;
  // usedCpu: number;
  cpu: string;
  memory: string;
  storage: string;
  network: string;
}
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
  files?: {
    name: string;
    version: string;
    localPath: string;
    integrity: string;
  };
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
  ocloudInfo: OcloudInfo = {} as OcloudInfo;
  ocloudPerformance: OcloudPerformance = {} as OcloudPerformance;
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
      this.ocloudPerformance = this.commonService.ocloudPerformance;
      this.ocloudPerformanceDeal();
    } else {
      clearTimeout(this.refreshTimeout);
      this.commonService.queryOcloudPerformance(this.cloudId).subscribe(
        res => {
          console.log('getOcloudPerformance:');
          console.log(res);
          this.ocloudPerformance = res as OcloudPerformance;
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

  // getSystemSummary() {
  //   if (this.commonService.isLocal) {
  //     /* local file test */
  //     this.systemSummary = this.commonService.systemSummary;
  //   } else {
  //     this.commonService.querySystemSummary().subscribe(
  //       res => {
  //         console.log('getSoftwareList:');
  //         console.log(res);
  //         this.systemSummary = res as SystemSummary;
  //       }
  //     );
  //   }
  // }

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
    if (this.ocloudInfo.resourcepool && this.ocloudInfo.resourcepool.length > 0) {
      this.ocloudInfo.resourcepool[0].active = true;
    }
  }

  ocloudPerformanceDeal() {
    // this.utilizationPercent = Math.floor((Number(this.ocloudPerformance.usedCpu) / Number(this.ocloudPerformance.totalCpu)) * 100);
    if (this.ocloudPerformance.cpu != 'N/A' || this.ocloudPerformance.storage != 'N/A' ||
      this.ocloudPerformance.memory != 'N/A' || this.ocloudPerformance.network != 'N/A') {
      this.ocloudPerformance.cpu += ' %';
      this.ocloudPerformance.memory += ' GB';
      this.ocloudPerformance.storage += ' MB';
      this.ocloudPerformance.network += ' Kbps';
    }
  }

  severityText(severity: string): string {
    return this.commonService.severityText(severity);
  }

  severityCount(severity: string): number {
    if (severity.toUpperCase() === this.severitys[0]) {
      return this.ocloudInfo.fault.critical;
    } else if (severity.toUpperCase() === this.severitys[1]) {
      return this.ocloudInfo.fault.major;
    } else if (severity.toUpperCase() === this.severitys[2]) {
      return this.ocloudInfo.fault.minor;
    } else if (severity.toUpperCase() === this.severitys[3]) {
      return this.ocloudInfo.fault.warning;
    } else {
      return 0;
    }
  }

  // 返回 Schedule Management 主頁
  back() {
    this.router.navigate(['/main/schedule-mgr']);
  }


  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.cloudName, 'All']);
  }

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
        ocloud: this.ocloudInfo.id,
        currentVersion: this.ocloudInfo.softwareVersion,
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
          ocloud: this.ocloudInfo.id,
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

  veiw(opt: Nf) {
    const url = '/main/nf-mgr';
    this.router.navigate([url]);
  }

  goPerformanceMgr() {
    this.router.navigate(['/main/performance-mgr', 'ocloud', this.ocloudInfo.id, 'All']);
  }

  goNFMgr(opt: Nf) {
    const nfId = opt.id;
    this.router.navigate(['/main/nf-mgr', nfId]);
  }

}
