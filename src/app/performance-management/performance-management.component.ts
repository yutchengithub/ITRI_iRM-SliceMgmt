import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { OCloudList } from '../field-management/field-management.component';
import { Nf } from '../nf-management/nf-management.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { OCloudPerformanceComponent } from './o-cloud-performance/o-cloud-performance.component';
import { NfPerformanceComponent } from './nf-performance/nf-performance.component';
import { LanguageService } from '../shared/service/language.service';
import * as _ from 'lodash';

export interface FieldList {
  fields: Fields[];
}

export interface Fields {
  id: string;
  name: string;
  phone: string;
  fieldposition1: string;
  fieldposition2: string;
  fieldposition3: string;
  fieldposition4: string;
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

export interface Integrity {
  downlinkDelay: string;
  uplinkDelay: string;
  downlinkThrouthput: string;
  uplinkThrouthput: string;
}

export interface Utilization {
  pdu: string;
  resourceProcess: string;
  resourceMemory: string;
  resourceDisk: string;
  maxPdu: string;
}

@Component({
  selector: 'app-performance-management',
  templateUrl: './performance-management.component.html',
  styleUrls: ['./performance-management.component.scss']
})

export class PerformanceManagementComponent implements OnInit {
  sessionId: string = '';
  p: number = 1;            // 當前頁數
  pageSize: number = 2;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  @ViewChild('oCloudPerformanceComponent') oCloudPerformanceComponent!: OCloudPerformanceComponent;
  @ViewChild('NfPerformanceComponent') nfPerformanceComponent!: NfPerformanceComponent;
  refreshTimeout!: any;
  refreshTime: number = 300;
  searchForm!: FormGroup;
  fieldList: FieldList = {} as FieldList;
  ocloudList: OCloudList[] = [];
  nfList: Nf[] = [];
  afterSearchOcloudId = '';
  afterSearchOcloudName = '';
  afterSearchNfId = '';
  afterSearchNfName = '';
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  afterAdvancedForm!: FormGroup;
  isSettingAdvanced = false;

  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private route: ActivatedRoute,
    public languageService: LanguageService,
    private dialog: MatDialog,
  ) {
    this.searchForm = this.fb.group({
      'type': new FormControl('ocloud'),
      'ocloud': new FormControl(''),
      'ocloudName': new FormControl(''),
      'nf': new FormControl(''),
      'nfName': new FormControl('')
    });
    this.createAdvancedForm();

  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['type']) {
        this.searchForm.controls['type'].setValue(params['type']);
      }
      if (params['ocloud'] !== 'All') {
        this.searchForm.controls['ocloud'].setValue(params['ocloud']);
        this.afterSearchOcloudId = params['ocloud'];
      }
      if (params['nfId'] !== 'All') {
        this.searchForm.controls['nf'].setValue(params['nfId']);
        this.afterSearchNfId = params['nfId'];
      }
    });
    console.log('init searchForm:')
    console.log(this.searchForm.value);

    this.sessionId = this.commonService.getSessionId();
    // Field Summary
    this.getfieldListInfo();

    // this.getOcloudList();
    // this.getNfList();
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
  }

  getfieldListInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.fieldList = this.commonService.fieldList;
    } else {
      const url = `${this.commonService.restPath}/queryFieldList/${this.sessionId}`;
      // this.http.get(url).subscribe(
      //   res => {
      //     console.log('queryFieldList:');
      //     console.log(res);
      //     this.fieldList = res as FieldList;
      //   }
      //);
    }
  }

  // getOcloudList() {
  //   if (this.commonService.isLocal) {
  //     /* local file test */
  //     this.ocloudList = this.commonService.ocloudList;

  //   } else {
  //     this.commonService.queryOcloudList().subscribe(
  //       res => {
  //         console.log('getOcloudList:');
  //         console.log(res);
  //         this.ocloudList = res as OCloudList[];
  //       }
  //     );
  //   }
  // }

  // getNfList() {
  //   if (this.commonService.isLocal) {
  //     /* local file test */
  //     this.nfList = this.commonService.nfList;

  //   } else {
  //     //queryNfList
  //     this.commonService.queryNfList('All', 'All').subscribe(
  //       res => {
  //         console.log('getNfList:');
  //         console.log(res);
  //         this.nfList = res as Nf[];
  //       }
  //     );
  //   }
  // }

  changeType(e: MatButtonToggleChange) {
    this.searchForm.controls['ocloud'].setValue('');
    this.searchForm.controls['ocloudName'].setValue('');
    this.searchForm.controls['nf'].setValue('');
    this.searchForm.controls['nfName'].setValue('');
    this.afterSearchOcloudId = '';
    this.afterSearchOcloudName = '';
    this.afterSearchNfId = '';
    this.afterSearchNfName = '';
    this.createAdvancedForm();
    this.isSettingAdvanced = false;
  }

  search() {
    this.afterSearchOcloudId = this.searchForm.controls['ocloud'].value;
    this.afterSearchOcloudName = this.searchForm.controls['ocloudName'].value;
    this.afterSearchNfId = this.searchForm.controls['nf'].value;
    this.afterSearchNfName = this.searchForm.controls['nfName'].value;
    this.isSettingAdvanced = false;
  }

  createAdvancedForm() {
    this.advancedForm = this.fb.group({
      'globalId': new FormControl(''),
      'ocloudName': new FormControl(''),
      'nfId': new FormControl(''),
      'nfName': new FormControl(''),
      'cpu': new FormControl(''),
      'memory': new FormControl(''),
      'disk': new FormControl(''),
      'network': new FormControl(''),
      'cpulimit': new FormControl('min'),
      'memorylimit': new FormControl('min'),
      'disklimit': new FormControl('min'),
      'networklimit': new FormControl('min')
      // cpulimit={cpulimit}&memorylimit={memorylimit}&disklimit={disklimit}&networklimit={networklimit}
    });
  }

  openAdvancedModal() {
    const orgAdvancedForm = _.cloneDeep(this.advancedForm);
    this.advancedForm.controls['globalId'].setValue(this.searchForm.controls['ocloud'].value);
    this.advancedForm.controls['ocloudName'].setValue(this.searchForm.controls['ocloudName'].value);
    this.advancedForm.controls['nfId'].setValue(this.searchForm.controls['nf'].value);
    this.advancedForm.controls['nfName'].setValue(this.searchForm.controls['nfName'].value);
    this.advancedModalRef = this.dialog.open(this.advancedModal, { id: 'advancedModal' });
    this.advancedModalRef.afterClosed().subscribe((result) => {
      console.log(result);
      if (result === 'OK') {
        this.isSettingAdvanced = true;
        this.searchForm.controls['ocloud'].setValue(this.advancedForm.controls['globalId'].value);
        this.searchForm.controls['ocloudName'].setValue(this.advancedForm.controls['ocloudName'].value);
        this.searchForm.controls['nf'].setValue(this.advancedForm.controls['nfId'].value);
        this.searchForm.controls['nfName'].setValue(this.advancedForm.controls['nfName'].value);
        this.afterAdvancedForm = _.cloneDeep(this.advancedForm);
      } else {
        this.advancedForm = orgAdvancedForm;
      }
    });
  }

  // changeSwitch(formName: string) {
  //   this.advancedForm.controls[formName].setValue((this.advancedForm.controls[formName].value === 'min') ? 'max' : 'min');
  //   console.log(this.advancedForm.controls[formName].value);
  // }

  // switchStatus(formName: string): boolean {
  //   if (this.advancedForm.controls[formName].value === 'min') {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
  pageChanged(page: number) {
    this.p = page;
  }

  debug(){
    console.log('advancedForm:');
    console.log(this.advancedForm.value);
  }

}
