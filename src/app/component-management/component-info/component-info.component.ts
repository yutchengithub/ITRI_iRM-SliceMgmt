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
  files?: {
    name: string;
    version: string;
    localPath: string;
    integrity: string;
  };
}
@Component({
  selector: 'app-component-info',
  templateUrl: './component-info.component.html',
  styleUrls: ['./component-info.component.scss']
})

export class ComponentInfoComponent implements OnInit {
  sessionId: string = '';
  cloudId: string = '';
  cloudName: string = '';
  newip: string = '';
  comId: string = '';
  // utilizationPercent: number = 0;
  bsComponentInfo: BsComponentInfo = {} as BsComponentInfo;
  uploadinfos: Uploadinfos[] = [];
  softwareList: SoftwareList[] = [];
  componentInfosw: ComponentInfosw = {} as ComponentInfosw;
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  RunRefreshTimeout!: any;
  RunRefreshTime: number = 3;
  refreshTimeout!: any;
  ListRefreshTime: number = 5;
  @ViewChild('updateModal') updateModal: any;
  @ViewChild('updateIPModal') updateIPModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateIPModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;
  /* CRITICAL,MAJOR,MINOR,WARNING */
  severitys: string[];
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

  

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
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

  ngOnInit(): void {
    this.createSearchForm();
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.comId = params['id'];
      //console.log('id=' + this.comId);
      this.getComponentInfo();
      this.getSoftwareList();
      this.getFaultMessage();
      
    });
  }
  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
  }

  getComponentInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.bsComponentInfo = this.commonService.bsComponentInfo;
    } else {
      this.commonService.queryBsComponentInfo(this.comId).subscribe(
        res => {
          console.log('getOcloudInfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.bsComponentInfo = JSON.parse(str);
          this.bsComponentInfo = res as BsComponentInfo;
        }
      );
    }
  }

   // 建立搜尋表單
   createSearchForm() {
    const nowTime = this.commonService.getNowTime();
    // // // console.log(nowTime)
    // // // 格式驗證需要處理?

    this.searchForm = this.fb.group({
      'fieldName': new FormControl(''),
      'gnbName': new FormControl(''),
      'compName': new FormControl(''),
      'alarmName': new FormControl(''),
      'severity': new FormControl('All'),
      'status': new FormControl('All'),
      'situation': new FormControl('All'),
      'ackOwner': new FormControl(''),
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)),   // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`))  // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
    });
    this.severitys = this.commonService.severitys;
  }

  getFaultMessage() {
    //console.log('getFaultMessage:');
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.fmsgList = this.commonService.fmsgList;
      console.log(this.fmsgList);
      this.faultMessageDeal();
    } else {
      const emptyvalue = '';
      const severity = this.searchForm.controls['severity'].value;
      // const start = this.commonService.dealPostDate(this.searchForm.controls['from'].value);
      // const end = this.commonService.dealPostDate(this.searchForm.controls['to'].value);
      const offset = (this.p - 1) * this.pageSize;
      const limit = 10;
      if (this.queryFaultMessageScpt) this.queryFaultMessageScpt.unsubscribe();
      this.queryFaultMessageScpt = this.commonService.queryFaultMessage(emptyvalue, emptyvalue, emptyvalue, severity, '', '', offset, limit).subscribe(
        res => {
          console.log('getFaultMessage:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.fmsgList = JSON.parse(str);
          this.fmsgList = res as FmsgList;
          this.faultMessageDeal();
        }
      );
    }
  }
  faultMessageDeal() {
    //this.p = 1;
    this.totalItems = this.fmsgList.faultMessages.length;
    this.nullList = new Array(this.totalItems);
    //this.refreshTimeout = window.setTimeout(() => this.getFaultMessage(), this.ListRefreshTime * 1000);
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        //console.log(`page[${this.p}] ===> refresh.`);
        // if (this.isSettingAdvanced) {
        //   this.getFMAdvanceSearch();
        // } else {
          this.getFaultMessage();
        // }

      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, this.ListRefreshTime * 1000); //timeout 1000ms
  }

  search() {
    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1
    const comp_name = this.searchForm.get('compName')?.value || '';
    const severity_lv = this.searchForm.get('severity')?.value;
    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;
    // 格式化日期為所需的格式
    const formattedFrom = this.commonService.dealPostDate(from);
    const formattedTo = this.commonService.dealPostDate(to);

    // 清除以前的搜尋結果
    this.filteredFmList = [];
    this.isSearch = false;

    if (this.commonService.isLocal) {
      /* local file test */
      this.filteredFmList = this.fmsgList.faultMessages.filter(msg => {
        const isCompMatch = !comp_name || msg.compname.includes(comp_name);
        const isSeverityMatch = severity_lv === 'All' || msg.eventtype === severity_lv;
        const msgDate = new Date(msg.timestamp);
        const isAfterFrom = msgDate >= new Date(formattedFrom);
        const isBeforeTo = msgDate <= new Date(formattedTo);

        return isCompMatch && isSeverityMatch && isAfterFrom && isBeforeTo;
      });
      this.isSearch = true; // Local Search 完畢，設置標記為 true
      this.totalItems = this.filteredFmList.length; // 確保更新 totalItems 以反映搜尋結果的數量
    } else {

    }
  }

  clear_search() {
    this.createSearchForm();
    this.isSearch = false;
  }  
  get msgToDisplay(): FaultMessages[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    // 否則，顯示全部 this.fmsgList.faultMessages
    return this.isSearch ? this.filteredFmList : this.fmsgList.faultMessages;
  }

  pageChanged(page: number) {
    this.p = page;
    this.getFaultMessage();
  }
  
  nfRunRefresh() {
    clearTimeout(this.refreshTimeout);
    this.RunRefreshTimeout = window.setTimeout(() => this.getComponentInfo(), this.RunRefreshTime * 1000);
  }

  getSoftwareList() {
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.componentInfosw.uploadinfos = this.commonService.componentInfosw.uploadinfos;
      //this.softwareListDeal();
    } else {
      this.commonService.queryUploadFileList().subscribe(
        res => {
          console.log('Get software list:');
          console.log(res);
          //this.softwareLists = res as SoftwareLists;
          //this.softwareListDeal();
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

  severityText(severity: string): string {
    return this.commonService.severityText(severity);
  }

  back() {
    this.router.navigate(['/main/component-mgr']);
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


  updateNFSuccessful: boolean | null = null; 
  hideUpdateIcon() {
    setTimeout(() => {
      this.updateNFSuccessful = null;
    }, 3000);
  }

  
  clickBox(key: string) {
    Object.keys(this.activeMap).forEach((k) => {
      console.log(k)
      this.activeMap[k] = false;
    });
    this.activeMap[key] = true;
  }
 

}
