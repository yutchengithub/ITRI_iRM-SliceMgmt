import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { MatRadioChange } from '@angular/material/radio';
import { LanguageService } from '../shared/service/language.service';

export interface OCloudList {
  id: string;
  name: string;
  dmsCount: number;
  nfCount: number;
  imsEndpoint: string;
  deployStatus: string;
}

@Component({
  selector: 'app-field-management',
  templateUrl: './field-management.component.html',
  styleUrls: ['./field-management.component.scss']
})
export class FieldManagementComponent implements OnInit, OnDestroy {
  sessionId: string = '';
  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  refreshTimeout!: any;
  refreshTime: number = 5;
  ocloudList: OCloudList[] = [];
  createForm!: FormGroup;
  levelMap: Map<string, number> = new Map();
  selectOcloud!: OCloudList;
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  formValidated = false;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    public languageService: LanguageService
  ) {
    this.levelMap.set('Deploy MaaS', 1);
    this.levelMap.set('Register VM on MaaS', 2);
    this.levelMap.set('Commission VM', 3);
    this.levelMap.set('Deploy Machines', 4);
    this.levelMap.set('Set Environment for k8s', 5);
    this.levelMap.set('Create k8s clusters', 6);
    this.levelMap.set('Deploy Node-Agent on each node', 7);
    this.levelMap.set('Deploy IMS', 8);
    this.levelMap.set('Running', 9);
    this.levelMap.set('Failed Deployment', 10);
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.getOcloudList();
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
  }

  getOcloudList() {
    clearTimeout(this.refreshTimeout);
    // this.p = 1;
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudList = this.commonService.ocloudList;
      this.ocloudListDeal();

    } else {
      this.commonService.queryOcloudList().subscribe(
        res => {
          console.log('getOcloudList:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.ocloudList = JSON.parse(str);
          //this.ocloudList = res as OCloudList[];
          this.ocloudListDeal();
        }
      );
    }
  }

  ocloudListDeal() {
    this.totalItems = this.ocloudList.length;
    // refresh
    this.refreshTimeout = window.setTimeout(() => this.getOcloudList(), this.refreshTime * 1000);
  }

  openCreateModal() {
    this.formValidated = false;
    this.createForm = this.fb.group({
      'name': new FormControl('', [Validators.required]),
      'description': new FormControl(''),
      'imsEndpoint': new FormControl('', [Validators.required]),
      'firstNode': new FormControl(''),
      'image': new FormControl(''),
      'method': new FormControl('existing'),
      'oCloudId': new FormControl('', [Validators.required]),
    });
    this.createModalRef = this.dialog.open(this.createModal, { id: 'createModal' });
    this.createModalRef.afterClosed().subscribe(() => this.formValidated = false);
  }

  changeMethod(e: MatButtonToggleChange) {
    this.formValidated = false;
    this.createForm.controls['imsEndpoint'].setValue('');
    this.createForm.controls['firstNode'].setValue('');
    this.createForm.controls['image'].setValue('');
    this.createForm.controls['oCloudId'].setValue('');
    if (e.value === 'existing') {
      this.createForm.controls['imsEndpoint'].setValidators([Validators.required]);
      this.createForm.controls['firstNode'].setValidators(null);
      this.createForm.controls['image'].setValidators(null);
      this.createForm.controls['oCloudId'].setValidators([Validators.required]);
    } else {
      this.createForm.controls['imsEndpoint'].setValidators(null);
      this.createForm.controls['firstNode'].setValidators([Validators.required]);
      this.createForm.controls['image'].setValidators([Validators.required]);
      this.createForm.controls['oCloudId'].setValidators(null);
    }
    this.createForm.controls['imsEndpoint'].updateValueAndValidity();
    this.createForm.controls['firstNode'].updateValueAndValidity();
    this.createForm.controls['image'].updateValueAndValidity();
    this.createForm.controls['oCloudId'].updateValueAndValidity();
  }

  create() {
    this.formValidated = true;
    console.log(this.createForm);
    if (!this.createForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.commonService.ocloudList.push({
        id: 'clould' + this.commonService.ocloudList.length,
        name: this.createForm.controls['name'].value,
        dmsCount: 4,
        nfCount: 5,
        imsEndpoint: 'http://10.172.61.37:5005/o2ims_infrastructureInventory/v1/',
        deployStatus: 'Deploy MaaS'
      })
      this.createModalRef.close();
      this.getOcloudList();

    } else {
      const body: any = {
        name: this.createForm.controls['name'].value,
        description: this.createForm.controls['description'].value,
        sessionid: this.sessionId
      };
      if (this.createForm.controls['method'].value === 'existing') {
        body['imsEndpoint'] = this.createForm.controls['imsEndpoint'].value;
        body['oCloudId'] = this.createForm.controls['oCloudId'].value;
      } else {
        body['firstNode'] = this.createForm.controls['firstNode'].value;
        body['image'] = this.createForm.controls['image'].value;
      }
      this.commonService.createOcloud(body).subscribe(
        res => {
          console.log('createOcloud:');
          console.log(res);
          this.createModalRef.close();
          this.getOcloudList();
        }
      );
    }
  }

  openDelectModal(oCloudList: OCloudList) {
    this.selectOcloud = oCloudList;
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.ocloudList.length; i++) {
        if (this.selectOcloud.id === this.commonService.ocloudList[i].id) {
          this.commonService.ocloudList.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
      this.getOcloudList();
    } else {
      this.commonService.deleteOcloud(this.selectOcloud.id).subscribe(
        res => {
          console.log('deleteOcloud:');
          console.log(this.selectOcloud.id);
          this.deleteModalRef.close();
          this.getOcloudList();
        }
      );
    }
  }

  viewPage(oCloudList: OCloudList) {
    this.router.navigate(['/main/field-mgr/info', oCloudList.id, oCloudList.name]);
  }

  // levelValue(deployStatus: any): string {
  //   const level = this.levelMap.get(deployStatus) as number;
  //   return ((level / 9) * 100).toString();
  // }

  pageChanged(page: number) {
    this.p = page;
  }
}
