import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../shared/common.service';
import { SoftwareList } from './../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';

export interface OcloudInfo {
  id: string;
  name: string;
  imsEndpoint: string;
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

// @12/05 Add by yuchen
// 描述單一場域的詳細資訊
export interface FieldInfo {
  id: string;
  name: string;
  phone: string;
  fieldposition1: string;
  fieldposition2: string;
  fieldposition3: string;
  fieldposition4: string;
  bsinfo: BsInfo[];
  bsNum: number;
  ueNum: string;
  coverage: string;
  accessibility: string;
  availability: string;
  mobility: string;
  retainability: string;
  energy: string;
  integrity: Integrity;
  utilization: Utilization;
  alarmCriticalNum: number;
  alarmMajorNum: number;
  alarmMinorNum: number;
  alarmWarningNum: number;
}

// @12/05 Add by yuchen
// 描述 BS 的資訊
export interface BsInfo {
  id: string;
  name: string;
  accessibility: string | null;
  mobility: string | null;
  retainability: string | null;
  energy: string | null;
  integrity: Integrity;
  utilization: Utilization;
  cellInfo?: CellInfo[];
}

// @12/05 Add by yuchen
// 描述單一 BS 之 Cell 的資訊
export interface CellInfo {
  nci: string;
  accessibility: string;
  mobility: string;
  retainability: string;
  energy: string;
  integrity: Integrity;
  utilization: Utilization;
}

// @12/05 Add by yuchen
// 描述網路整體完整性的資訊
export interface Integrity {
  downlinkDelay: string | null;
  uplinkDelay: string | null;
  downlinkThrouthput: string | null;
  uplinkThrouthput: string | null;
}

// @12/05 Add by yuchen
// 描述網路使用情況的資訊
export interface Utilization {
  pdu: string | null;
  resourceProcess: string | null;
  resourceMemory: string | null;
  resourceDisk: string | null;
  maxPdu: string | null;
}

@Component({
  selector: 'app-field-info',
  templateUrl: './field-info.component.html',
  styleUrls: ['./field-info.component.scss']
})

export class FieldInfoComponent implements OnInit {
  sessionId: string = '';
  cloudId: string = '';
  cloudName: string = '';
  // utilizationPercent: number = 0;

  fieldInfo: FieldInfo = {} as FieldInfo; // @12/05 Add by yuchen
  fieldId: string = '';   // @12/05 Add by yuchen
  fieldName: string = ''; // @12/05 Add by yuchen

  refreshTimeout!: any;
  refreshTime: number = 5;

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  ocloudInfo: OcloudInfo = {} as OcloudInfo;
  ocloudPerformance: OcloudPerformance = {} as OcloudPerformance;
  softwareList: SoftwareList[] = [];
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  @ViewChild('updateModal') updateModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;

  // For Fault Alarms: CRITICAL, MAJOR, MINOR, WARNING
  severitys: string[];

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };

  // For import Google Maps @12/10 Add by yuchen
  center: google.maps.LatLngLiteral = {lat: 24, lng: 121};
  zoom = 8;
  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    // ... 更多的選項
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public languageService: LanguageService
  ) {
    this.severitys = this.commonService.severitys;
  }

  ngOnInit(){
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.fieldId = params['id'];  
      this.fieldName = params['name']; 
      console.log('fieldId: ' + this.fieldId + ', fieldName: ' + this.fieldName + ',\nsend from /main/field-mgr');
      this.getQueryFieldInfo();
  
      this.cloudId = params['cloudId'];
      this.cloudName = params['cloudName'];
      console.log('cloudId=' + this.cloudId + ', cloudName=' + this.cloudName);
      this.getOcloudInfo();
      this.getOcloudPerformance();
      this.getSoftwareList();
      this.getSystemSummary();
    });
  }

  // @12/05 Add by yuchen
  getQueryFieldInfo() {
      console.log('QueryFieldInfo() - Start');
      clearTimeout(this.refreshTimeout);
    
      if (this.commonService.isLocal) {

        // local files test
        this.fieldInfo = this.commonService.fieldInfo;
        this.fieldInfoDeal();

      } else {

        // 使用 commonService 中的 queryFieldInfo() 發起 HTTP GET 請求
        this.commonService.queryFieldInfo(this.fieldId).subscribe({
          next: (res) => {
            console.log('Get queryFieldInfo from API: ', res,'\nfieldId: '+ res.id +', fieldName: '+res.name);
            this.fieldInfo = res ;
            console.log('The Field info:', this.fieldInfo);
            this.fieldInfoDeal();
          },
          error: (error) => {
            console.error('Error fetching field info:', error);
          },
          complete: () => {
            console.log('Field info fetch completed');
          }
        });
      }
    }

    // @11/30 Add by yuchen
    fieldInfoDeal() {
      // 輸出檢查點
      console.log('fieldInfoDeal() - Start');
      console.log('The field info:', this.fieldInfo);
      console.log('The field info properties count:', this.fieldInfo ? Object.keys(this.fieldInfo).length : 'FieldInfo is undefined or null');
      console.log('After field info log');

      
      // 定義一個空陣列，長度等於場域的總數
      this.nullList = new Array(this.totalItems);
    
      // 如果需要，可以使用 setTimeout 設定一個定時刷新
      this.refreshTimeout = window.setTimeout(() => {
        if (this.p === 1) {
          console.log(`page[${this.p}] ===> refresh.`);
          //this.getQueryFieldInfo();  // 刷新場域資訊函數
        } else {
          console.log(`page[${this.p}] ===> no refresh.`);
        }
      }, 100); // timeout: 100 ms
    }

  // @12/08 Add
  currentColorbar: 'RSRP' | 'SINR' | null = null; // 開始時不顯示任何colorbar
  
  toggleColorbar(type: 'RSRP' | 'SINR') { // @12/08 Add
    this.currentColorbar = this.currentColorbar === type ? null : type;
  }
  

  // 設定告警種類文字 @12/07 Update by yuchen
  severityText(severity: string): string {
    const severityKey = `field.${severity.toLowerCase()}Fault`;
    return this.languageService.i18n[severityKey];
  }

  // 設定告警種類給 CSS 選擇器用文字 @12/07 Add by yuchen
  severityText_forCSS(severity: string): string {
    console.log("severity:", severity);
    return this.commonService.severityText(severity);
  }

  // 設定場域對應的告警種類數量 @12/07 Update by yuchen
  severityCount(severity: string): number {
  
    if (!this.fieldInfo) {
      return 0; // 確保 fieldInfo 已被賦值且不為空
    }
  
    if (severity.toUpperCase() === 'CRITICAL') {
      return this.fieldInfo.alarmCriticalNum;
    } else if (severity.toUpperCase() === 'MAJOR') {
      return this.fieldInfo.alarmMajorNum;
    } else if (severity.toUpperCase() === 'MINOR') {
      return this.fieldInfo.alarmMinorNum;
    } else if (severity.toUpperCase() === 'WARNING') {
      return this.fieldInfo.alarmWarningNum;
    } else {
      return 0;
    }
  }


  getOcloudInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudInfo = this.commonService.ocloudInfo;
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

  getOcloudPerformance() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudPerformance = this.commonService.ocloudPerformance;
      this.ocloudPerformanceDeal();
    } else {
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
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareList = this.commonService.softwareList;
      this.softwareDeal();
    } else {
      this.commonService.querySoftwareList('', '0', '').subscribe(
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

  getSystemSummary() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.systemSummary = this.commonService.systemSummary;
    } else {
      this.commonService.querySystemSummary().subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.systemSummary = res as SystemSummary;
        }
      );
    }
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
    // if (this.ocloudPerformance.cpu != 'N/A' || this.ocloudPerformance.storage != 'N/A' ||
    //   this.ocloudPerformance.memory != 'N/A' || this.ocloudPerformance.network != 'N/A') {
    //   this.ocloudPerformance.cpu += ' %';
    //   this.ocloudPerformance.memory += ' GB';
    //   this.ocloudPerformance.storage += ' MB';
    //   this.ocloudPerformance.network += ' Kbps';
    // }
  }

  // 返回 Field Mnagement 主頁
  back() {
    this.router.navigate(['/main/field-mgr']);
  }

  // 往 Fault Mnagement @12/07 Update
  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.fieldName, 'All']);
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
      this.getOcloudInfo();
    }
  }

  veiw(opt: Nf) {
    const url = '/main/nf-mgr';
    this.router.navigate([url]);
  }

  goPerformanceMgr() {
    this.router.navigate(['/main/performance-mgr', this.fieldName]);
  }


}
