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
import { FmsgList } from './../../fault-management/fault-management.component';
import { FaultMessages } from './../../fault-management/fault-management.component';

// import APIs of BS Management @2024/03/25 Add 
import { apiForBSMgmt } from '../../shared/api/For_BS_Mgmt';

// 引入儲存各個資訊所需的 interfaces @2024/03/25 Add
import { BSInfo }      from '../../shared/interfaces/BS/For_queryBsInfo_BS';
import { BSInfo_dist } from '../../shared/interfaces/BS/For_queryBsInfo_dist_BS';

// 引入所需 Local Files @2024/03/25 Add
import { localBSInfo } from '../../shared/local-files/BS/For_queryBsInfo';

@Component({
  selector: 'app-bs-info',
  templateUrl: './bs-info.component.html',
  styleUrls: ['./bs-info.component.scss']
})

export class BSInfoComponent implements OnInit {

  sessionId: string = '';   // sessionId 用於存儲當前會話 ID
  refreshTimeout!: any;     // refreshTimeout 用於存儲 setTimeout 的引用，方便之後清除
  refreshTime: number = 5;  // refreshTime 定義自動刷新的時間間隔（秒）

  constructor(

    private         router: Router,
    private          route: ActivatedRoute,
    private             fb: FormBuilder,
    private         dialog: MatDialog,
    public   commonService: CommonService,
    public languageService: LanguageService,

    public  API_BS: apiForBSMgmt,           // @2024/03/25 Add for import API of BS Management
    public  bsInfo_LocalFiles: localBSInfo, // @2024/03/25 Add for import BS Info Local Files 
  
  ) {

    this.severitys = this.commonService.severitys;
    this.cmpsource = this.commonService.cmpsource;

  }

  // @2024/03/25 Add
  bsID:   string = '';      // 用於存儲當前選中的 BS ID
  bsName: string = '';      // 用於存儲當前選中的 BS 名稱
  bsType: string = '';      // 用於存儲當前選中的 BS 類型
  bsCellCount: string = ''; // 用於存儲當前選中的 BS Cell 數量

  // 頁面初始化 @2024/03/25 Update
  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();

    this.route.params.subscribe(( params ) => {
      this.bsID = params['id'];
      this.bsName = params['name'];
      this.bsType = params['type'];
      this.bsCellCount = params['cellCount'];
      console.log('bsId: ' + this.bsID + ', bsName: ' + this.bsName +
                     ', bsType: ' + this.bsType + ', bsCellCount: ' + this.bsCellCount + ',\nsend from /main/bs-mgr');
      
      // 初入該頁面就取得此BS資訊               
      this.getQueryBsInfo();
    });

  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }

  // 用於返回 BS 主頁 @2024/03/25 Add
  back() {
    this.router.navigate( ['/main/bs-mgr'] );
  }

  isLoadingBsInfo =  true;                            // 加載狀態的標誌，初始設置為 true
  selectBsInfo:      BSInfo = {} as BSInfo;           // 用於存儲從服務器或 Local Files 獲取的一體式基站資訊
  selectBsInfo_dist: BSInfo_dist = {} as BSInfo_dist; // 用於存儲從服務器或 Local Files 獲取的分佈式基站資訊

  // @2024/03/25 Add
  // 用於獲取基站資訊
  getQueryBsInfo() {
    console.log( 'getQueryBsInfo() - Start' );

    this.isLoadingBsInfo = true;         // 開始加載數據，顯示進度指示器

    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時，避免重複或不必要的操作

    if ( this.commonService.isLocal ) {
      // Local 模式: 使用 Local 文件提供的數據

      if ( this.bsType === "1" ) {

        // 取得 Local 一體式基站資訊
        this.selectBsInfo = this.bsInfo_LocalFiles.bsInfo_local.find( info => info.id === this.bsID ) || {} as BSInfo;
        console.log( 'In local - Get the BSInfo:', this.selectBsInfo );

      } else if ( this.bsType === "2" ) {

        // 取得 Local 分佈式基站資訊
        this.selectBsInfo_dist = this.bsInfo_LocalFiles.dist_bsInfo_local.find( info => info.id === this.bsID ) || {} as BSInfo_dist;
        console.log( 'In local - Get the BSInfo_dist:', this.selectBsInfo_dist );
      }

      this.isLoadingBsInfo = false; // Local 模式下，數據加載快速完成,直接設置為 false

    } else {
      
      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.API_BS.queryBsInfo( this.bsID ).subscribe({
        next: ( res ) => {

          console.log( 'Get the response of queryBsInfo:', res );

          if ( res.bstype === 1 ) {

            // 刷新一體式基站資訊
            this.selectBsInfo = res as BSInfo;
            console.log( 'Get the BSInfo:', this.selectBsInfo );

          } else if ( res.bstype === 2 ) {

            // 刷新分佈式基站資訊
            this.selectBsInfo_dist = res as BSInfo_dist; 
            console.log( 'Get the BSInfo_dist:', this.selectBsInfo_dist );
          }

          this.isLoadingBsInfo = false; // 數據加載完成
        },
        error: ( error ) => {
          console.error( 'Error fetching BS info:', error );
          this.isLoadingBsInfo = false; // 出錯時設置加載標誌為 false
        },
        complete: () => {
          console.log( 'BS info fetch completed' );
        }
      });
    }

    console.log( 'getQueryBsInfo() - End' );
  }















  

  getBSInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.bsComponentInfo = this.commonService.bsComponentInfo;
      this.ocloudInfoDeal();
    } else {
      this.commonService.queryOcloudInfo(this.cloudId).subscribe(
        res => {
          console.log('getOcloudInfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.ocloudInfo = JSON.parse(str);
          this.ocloudInfo = res as OcloudInfo;
          this.ocloudInfoDeal();
        }
      );
    }
  }
  nfRunRefresh() {
    clearTimeout(this.refreshTimeout);
    this.RunRefreshTimeout = window.setTimeout(() => this.getOcloudPerformance(), this.RunRefreshTime * 1000);
    this.RunRefreshTimeout = window.setTimeout(() => this.getBSInfo(), this.RunRefreshTime * 1000);
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
      this.getBSInfo();
    }
    this.getBSInfo();
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
        this.getBSInfo();
      } else {
        // Form validation failed, set the error flag
        this.updateNFSuccessful = false;
        this.hideUpdateIcon();
        this.updateBasicError = true;
      }
    }
    this.getBSInfo();
  }

  p: number = 1;            // 當前頁數
  pageSize: number = 5;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  pageChanged( page: number ) {
    this.p = page;
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

  search() {}
  searchForm!: FormGroup;
  cmpsource: string[];
  fmsgList: FmsgList = {} as FmsgList;
  isSearch: boolean = false;
  filteredFmList: FaultMessages[] = [];
  get msgToDisplay(): FaultMessages[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    // 否則，顯示全部 this.fmsgList.faultMessages
    return this.isSearch ? this.filteredFmList : this.fmsgList.faultMessages;
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

}


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