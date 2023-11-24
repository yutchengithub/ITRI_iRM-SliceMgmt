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
  sessionId: string = '';
  softwareLists: SoftwareLists = {} as SoftwareLists;
  componentList: ComponentLists = {} as ComponentLists;
  @ViewChild('createScheduleModal') createScheduleModal: any;
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
  selectSchedule!: Components;
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
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    public languageService: LanguageService
  ) {
    this.comtype.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
    this.createSearchForm();
    this.createAdvancedForm();
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getScheduleList();
  }

  getScheduleList() {
    const firm = this.searchForm.controls['firm'].value;
    const uploadtype = this.searchForm.controls['uploadtype'].value;
    const model = this.searchForm.controls['model'].value;
    console.log('querySoftwareList params:')
    console.log(`fileName=${firm}`);
    console.log(`uploadtype=${uploadtype}`);
    console.log(`model=${model}`);
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.componentList = this.commonService.componentList;
      console.log(this.componentList);
      this.scheduleListDeal();
    } else {
      this.commonService.queryBsComponentList().subscribe(
        res => {
          console.log('getBsComponent List:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.componentList = JSON.parse(str);
          this.scheduleListDeal();
        }
      );
    }
  }

  scheduleListDeal() {
    this.totalItems = this.componentList.components.length;
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
    if (this.querySoftwareScpt) this.querySoftwareScpt.unsubscribe();
    if (this.querySWAdvanceSearchScpt) this.querySWAdvanceSearchScpt.unsubscribe();
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
      this.getScheduleList();

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
          this.getScheduleList();
        }
      );
    }
  }

  openDeleteModal(scheduleList: Components) {
    this.selectSchedule = scheduleList;
    this.schedulestatus = scheduleList.status;
    console.log("test "+this.schedulestatus);
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  openProvisionModal(scheduleList: Components) {
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
      this.getScheduleList();
    } else {
      this.commonService.deleteSoftware(this.selectSchedule.id).subscribe(
        res => {
          this.deleteModalRef.close();
          this.getScheduleList();
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
    this.getScheduleList();
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

  viewPage(scheduleList: Components) {
    this.router.navigate(['/main/schedule-mgr/info', scheduleList.id, scheduleList.bsId]);
  }

  clearSetting() {
    this.isSearch = false;
    this.createSearchForm();
    this.createAdvancedForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getScheduleList();
  }

}
