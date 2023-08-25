import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import * as _ from 'lodash';

export interface SoftwareList {
  id: string;
  firm: string;
  model: string;
  type: number;
  version: string;
  notes: string;
  uploadTime: string;
  fileName: string;
}

export interface SoftwareLists {
  uploadinfos: uploadinfos[];
}

export interface uploadinfos {
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
  selector: 'app-software-management',
  templateUrl: './software-management.component.html',
  styleUrls: ['./software-management.component.scss'],
})
export class SoftwareManagementComponent implements OnInit {
  sessionId: string = '';
  softwareList: SoftwareList[] = [];
  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  isSettingAdvanced = false;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  selectSoftware!: SoftwareList;
  nfTypeList: string[] = ['CU', 'DU', 'CU+DU'];
  file: any;
  typeMap: Map<number, string> = new Map();
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  fileMsg: string = '';
  formValidated = false;
  searchForm!: FormGroup;


  uploadType = 'upload';

  searchTypeList: Item[] = [
    { displayName: 'CU', value: '0' },
    { displayName: `DU`, value: '1' },
    { displayName: `CU+DU`, value: '2' },
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
    this.searchTypeList.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
    this.searchForm = this.fb.group({
      'fileName': new FormControl(''),
      'type': new FormControl('All'),
      'version': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.getSoftwareList();
  }

  changeMethod(e: MatButtonToggleChange) {
    this.formValidated = false;
    if (e.value === 'existing') {

    } else {

    }

  }


  getSoftwareList() {
    const fileName = this.searchForm.controls['fileName'].value;
    const type = this.searchForm.controls['type'].value;
    const version = this.searchForm.controls['version'].value;
    console.log('querySoftwareList params:')
    console.log(`fileName=${fileName}`);
    console.log(`type=${type}`);
    console.log(`version=${version}`);
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareList = this.commonService.softwareList;
      this.softwareListDeal();
    } else {
      this.commonService.querySoftwareList(fileName, type, version).subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.softwareList = res as SoftwareList[];
          this.softwareListDeal();
        }
      );
    }
  }

  softwareListDeal() {
    this.totalItems = this.softwareList.length;
  }

  openCreateModal() {
    this.formValidated = false;
    this.createForm = this.fb.group({
      'fileName': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'version': new FormControl('', [Validators.required]),
      'mode': new FormControl('ocloud'),
      'type': new FormControl('0'),
      'sessionid': this.sessionId
    });
    this.createModalRef = this.dialog.open(this.createModal, { id: 'createModal' });
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
      this.createForm.controls['fileName'].setValue('');
    } else {
      this.file = files[0];
      this.createForm.controls['fileName'].setValue(files[0].name);
    }
    // console.log(files);
  }

  create() {
    // 先呼叫createSoftware、然後利用return softwareId呼叫uploadSoftwar
    this.formValidated = true;
    if (!this.createForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.commonService.softwareList.push(
        {
          id: "s0011009",
          firm: "ITRI",
          model: "Os_image_2.tar",
          type: 0,
          version: "1.0.0",
          notes: "Os_image_2.tar",
          uploadTime: "2023-07-01 20: 01: 30",
          fileName: "fw-v1-0-0.zip"
        }
      );
      this.createModalRef.close();
      this.getSoftwareList();

    } else {
      const body = this.createForm.value;
      if (this.createForm.controls['type'].value === 'CU') {
        body['type'] = 1;
      } else if (this.createForm.controls['type'].value === 'DU') {
        body['type'] = 2;
      } else if (this.createForm.controls['type'].value === 'CU+DU') {
        body['type'] = 3;
      } else {
        body['type'] = 0;
      }
      body['sessionid'] = this.sessionId;
      this.commonService.createSoftware(body).subscribe(
        (res: any) => {
          console.log('createSoftware:');
          console.log(res);
          const softwareId = res['softwareId'];
          const uploadUrl = `${this.commonService.restPath}/uploadSoftware/${this.sessionId}/${softwareId}`;
          const options = this.commonService.options;
          const formData = new FormData();
          formData.append('file', this.file);
          this.http.post(uploadUrl, formData, options).subscribe(
            () => {
              this.createModalRef.close();
              this.getSoftwareList();
            }
          );
          this.createModalRef.close();
          this.getSoftwareList();
        }
      );
    }
  }

  openDelectModal(softwareList: SoftwareList) {
    this.selectSoftware = softwareList;
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.softwareList.length; i++) {
        if (this.selectSoftware.id === this.commonService.softwareList[i].id) {
          this.commonService.softwareList.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
      this.getSoftwareList();
    } else {
      this.commonService.deleteSoftware(this.selectSoftware.id).subscribe(
        res => {
          this.deleteModalRef.close();
          this.getSoftwareList();
        }
      );
    }
  }

  openAdvancedModal() {
    const orgAdvancedForm = _.cloneDeep(this.advancedForm);
    // this.advancedForm.controls['cloudName'].setValue(this.searchForm.controls['cloudName'].value);
    // this.advancedForm.controls['nfName'].setValue(this.searchForm.controls['nfName'].value);
    // this.advancedForm.controls['from'].setValue(this.searchForm.controls['from'].value);
    // this.advancedForm.controls['to'].setValue(this.searchForm.controls['to'].value);
    // this.advancedForm.controls['severity'].setValue(this.searchForm.controls['severity'].value);
    // this.advancedModalRef = this.dialog.open(this.advancedModal, { id: 'faultAdvancedModal' });
    // this.advancedModalRef.afterClosed().subscribe((result) => {
    //   if (result === 'OK') {
    //     this.isSettingAdvanced = true;
    //     this.searchForm.controls['cloudName'].setValue(this.advancedForm.controls['cloudName'].value);
    //     this.searchForm.controls['nfName'].setValue(this.advancedForm.controls['nfName'].value);
    //     this.searchForm.controls['from'].setValue(this.advancedForm.controls['from'].value);
    //     this.searchForm.controls['to'].setValue(this.advancedForm.controls['to'].value);
    //     this.searchForm.controls['severity'].setValue(this.advancedForm.controls['severity'].value);
    //     this.p = 1;
    //     //this.getFMAdvanceSearch();
    //   } else {
    //     this.advancedForm = orgAdvancedForm;
    //   }
    // });
  }

  typeText(type: number): string {
    return this.typeMap.get(type) as string;
  }

  pageChanged(page: number) {
    this.p = page;
  }

  search() {
    this.getSoftwareList();
  }

  debug() {
    const body = this.createForm.value;
    if (this.createForm.controls['type'].value === 'CU') {
      body['type'] = 1;
    } else if (this.createForm.controls['type'].value === 'DU') {
      body['type'] = 2;
    } else if (this.createForm.controls['type'].value === 'CU+DU') {
      body['type'] = 3;
    } else {
      body['type'] = 0;
    }
    body['sessionid'] = this.sessionId;
    console.log(body);
  }

  viewPage(softwareList: SoftwareList) {
    this.router.navigate(['/main/software-mgr/info', softwareList.id, softwareList.fileName]);
  }
}
