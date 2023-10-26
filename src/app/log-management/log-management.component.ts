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

export interface LogLists {
  users: Users[];
}

export interface Users {
  id: string;
  role: string;
}

export interface CreateUsers {
  session: string;
  id: string;
  key: string;
  role: string;
}

@Component({
  selector: 'app-log-management',
  templateUrl: './log-management.component.html',
  styleUrls: ['./log-management.component.scss'],
})
export class LogManagementComponent implements OnInit {
  sessionId: string = '';
  softwareList: SoftwareList[] = [];
  softwareLists: SoftwareLists = {} as SoftwareLists;
  logLists: LogLists = {} as LogLists;
  logInfo: CreateUsers = {} as CreateUsers;
  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  isSettingAdvanced = false;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  selectSoftware!: Uploadinfos;
  selectUser!: Users;
  file: any;
  typeMap: Map<number, string> = new Map();
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  fileMsg: string = '';
  formValidated = false;
  searchForm!: FormGroup;


  uploadType = 'upload';
  role = 'upload';
  userTypeList: Item[] = [
    { displayName: 'Administrator', value: '1' },
    { displayName: `Manager`, value: '2' },
    { displayName: `Monitor`, value: '3' }
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    public languageService: LanguageService
  ) {
    this.userTypeList.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
    this.searchForm = this.fb.group({
      'fileName': new FormControl(''),
      'type': new FormControl('All'),
      'version': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.getLogList();
  }

  changeMethod(e: MatButtonToggleChange) {
    this.formValidated = false;
    if (e.value === 'existing') {

    } else {

    }

  }


  getLogList() {
    const fileName = this.searchForm.controls['fileName'].value;
    const type = this.searchForm.controls['type'].value;
    const version = this.searchForm.controls['version'].value;
    console.log('querySoftwareList params:')
    console.log(`fileName=${fileName}`);
    console.log(`type=${type}`);
    console.log(`version=${version}`);
    if (this.commonService.isLocal) {
      /* local file test */
      this.logLists = this.commonService.accountLists;
      console.log(this.logLists);
      this.softwareListDeal();
    } else {
      this.commonService.queryUploadFileList().subscribe(
        res => {
          console.log('Get software list:');
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
      this.getLogList();

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
              this.getLogList();
            }
          );
          this.createModalRef.close();
          this.getLogList();
        }
      );
    }
  }

  openDelectModal(logLists: Users) {
    this.selectUser = logLists;
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
      this.getLogList();
    } else {
      this.commonService.deleteSoftware(this.selectSoftware.id).subscribe(
        res => {
          this.deleteModalRef.close();
          this.getLogList();
        }
      );
    }
  }


  typeText(role: number): string {
    return this.typeMap.get(role) as string;
  }

  pageChanged(page: number) {
    this.p = page;
  }

  // search() {
  //   this.getLogList();
  // }

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

  viewPage(logwareList: Users) {
    this.router.navigate(['/main/log-mgr/info', logwareList.id, logwareList.role]);
  }
}
