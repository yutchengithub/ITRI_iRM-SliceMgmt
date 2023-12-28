//import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { CommonService } from '../shared/common.service';
import { Subscription } from 'rxjs';
//import { MatRadioChange } from '@angular/material/radio';
import { LanguageService } from '../shared/service/language.service';

export interface OCloudList {
  id: string;
  name: string;
  dmsCount: number;
  nfCount: number;
  imsEndpoint: string;
  deployStatus: string;
}

// @11/30 Add by yuchen 
export interface FieldList {
  fields: Fields[];
}

// @11/30 Add by yuchen 
export interface Fields {
  id: string;
  name: string;
  phone: string;
  fieldposition1: string;
  fieldposition2: string;
  fieldposition3: string;
  fieldposition4: string;
  bsinfo: Bsinfo[];
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

// @11/30 Add by yuchen 
export interface Bsinfo {
  id: string;
  name: string;
}

// @11/30 Add by yuchen 
export interface Integrity {
  downlinkDelay: string;
  uplinkDelay: string;
  downlinkThrouthput: string;
  uplinkThrouthput: string;
}

// @11/30 Add by yuchen 
export interface Utilization {
  pdu: string;
  resourceProcess: string;
  resourceMemory: string;
  resourceDisk: string;
  maxPdu: string;
}


@Component({
  selector: 'app-field-management',
  templateUrl: './field-management.component.html',
  styleUrls: ['./field-management.component.scss']
})

export class FieldManagementComponent implements OnInit, OnDestroy {

  fieldList: FieldList = {} as FieldList; // @11/30 Add by yuchen
  ueNum: string = '0';                    // @11/30 Add by yuchen
  selectField!: Fields;                   // @11/30 Add by yuchen

  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;

  refreshTimeout!: any;
  refreshTime: number = 5;

  createForm!: FormGroup;
  levelMap: Map<string, number> = new Map();

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用
  formValidated = false;
  
  isLoading = true; // 加載狀態的標誌，初始設置為 true @12/28 Add for Progress Spinner

  // queryFieldList 用於管理 HTTP 的訂閱請求，'!' 確保在使用前已賦值。
  queryFieldList!: Subscription;  // @11/30 Add by yuchen

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    //private http: HttpClient,
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

  sessionId: string = ''; // 宣告 sessionId 屬於字串型態
  /**
   * 當 Component 初始化完成後執行的 Lifecycle Hook。
   * 主要用於設定 Component 的初始狀態，包括預設的 Log 類型、sessionId、以及設定路由參數相關的應對處理。
   */
  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    // Field Summary
    this.getQueryFieldList();
  }

  // 銷毀 Component 時的清理工作
  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);

    // 如存在對 FieldSummaryInfo 的 API 請求訂閱，則取消訂閱以避免內存洩漏
    if (this.queryFieldList) this.queryFieldList.unsubscribe();
  }

  // @11/30 Add by yuchen
  getQueryFieldList() {
    console.log('getQueryFieldList() - Start');
    this.isLoading = true;        // 開始加載數據時設置為 true @12/28 Add for Progress Spinner 

    clearTimeout(this.refreshTimeout);
  
    if ( this.commonService.isLocal ) {

      // 本地模式使用本地數據
      this.fieldList = this.commonService.fieldList;	
      this.FieldListDeal();
      this.isLoading = false;     // 數據加載完成，設置為 false @12/28 Add for Progress Spinner
    } else {

      // 使用 commonService 中的 queryFieldList() 發起 HTTP GET 請求
      this.commonService.queryFieldList().subscribe({
        next: (res) => {
          console.log('getQueryFieldList:', res);
          this.fieldList = res;
          this.FieldListDeal();
        },
        error: (error) => {
          console.error('Error fetching field info:', error);
          this.isLoading = false; // 發生錯誤時也要設置為 false @12/28 Add for Progress Spinner
        },
        complete: () => {
          console.log('Field info fetch completed');
          this.isLoading = false; // 加載完成 @12/28 Add for Progress Spinner
        }
      });
    }
  }

  // @11/30 Add by yuchen
  FieldListDeal() {

    // 輸出檢查點
    console.log('Field list length:', this.fieldList.fields?.length);

    // 計算 fields 數組中元素的數量，即場域的總數
    //this.totalItems = this.fieldList.fields.length;
    this.totalItems = this.fieldList.fields?.length || 0;  // 使用可選鏈和空值合併運算符來避免 undefined 或 null
    console.log('Total items:', this.totalItems);
    
    // 定義一個空陣列，長度等於場域的總數
    this.nullList = new Array(this.totalItems);
  
    // 使用 setTimeout 設定一個定時刷新
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        console.log(`page[${this.p}] ===> refresh.`);
        //this.getQueryFieldList();  // 取得場域訊息函數
      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, 100); // timeout: 100 ms
  }
  
  // @12/05 Update by yuchen
  viewFieldDetail(fields: Fields) {
    this.selectField = fields;
    console.log("View Detail of the field id:", this.selectField.id, "and the field name: ", this.selectField.name);
    this.router.navigate(['/main/field-mgr/info', this.selectField.id, this.selectField.name]);
  }
  
  
  // @12/01 Update by yuchen
  viewFieldAlarm(fields: Fields) {
    this.selectField = fields;
    console.log("Selected alarm field name: ", this.selectField.name);
    this.router.navigate(['/main/fault-mgr', this.selectField.name, 'All']);
  }

  // @11/30 Add by yuchen
  openDeleteField(fields: Fields) {
    this.selectField = fields;
    console.log("Deleted field name: ", this.selectField.name);
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  // @11/30 Add by yuchen
  openSnapshot(fields: Fields){
    this.selectField = fields;
  }

  pageChanged(page: number) {
    this.p = page;
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
      // this.getOcloudList();

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
          // this.getOcloudList();
        }
      );
    }
  }

  // openDelectModal(oCloudList: OCloudList) {
  //   // this.selectOcloud = oCloudList;
  //   this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  // }

  delete() {
    // if (this.commonService.isLocal) {
    //   /* local file test */
    //   for (let i = 0; i < this.commonService.ocloudList.length; i++) {
    //     if (this.selectOcloud.id === this.commonService.ocloudList[i].id) {
    //       this.commonService.ocloudList.splice(i, 1);
    //       break;
    //     }
    //   }
    //   this.deleteModalRef.close();
    //   this.getOcloudList();
    // } else {
    //   this.commonService.deleteOcloud(this.selectOcloud.id).subscribe(
    //     res => {
    //       console.log('deleteOcloud:');
    //       console.log(this.selectOcloud.id);
    //       this.deleteModalRef.close();
    //       this.getOcloudList();
    //     }
    //   );
    // }
  }

  // levelValue(deployStatus: any): string {
  //   const level = this.levelMap.get(deployStatus) as number;
  //   return ((level / 9) * 100).toString();
  // }

}
