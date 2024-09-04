import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { OCloudList } from '../field-management/field-management.component';
import { Nf } from '../nf-management/nf-management.component';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { OCloudPerformanceComponent } from './o-cloud-performance/o-cloud-performance.component';
import { NfPerformanceComponent } from './nf-performance/nf-performance.component';
import * as _ from 'lodash';

// Services
import { CommonService }   from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService }  from '../shared/service/spinner.service';

// For import interfaces
import { FieldList, Field } from '../shared/interfaces/Field/For_queryFieldList';  // @2024/03/14 Add by yuchen

// For import local files
import { localFieldList }   from '../shared/local-files/Field/For_queryFieldList'; // @2024/03/14 Add by yuchen

@Component({
  selector: 'app-performance-management',
  templateUrl: './performance-management.component.html',
  styleUrls: ['./performance-management.component.scss']
})

export class PerformanceManagementComponent implements OnInit {
  sessionId: string = '';
  p: number = 1;           // 當前頁數
  pageSize: number = 5;    // 每頁幾筆
  totalItems: number = 0;  // 總筆數

  @ViewChild('oCloudPerformanceComponent') oCloudPerformanceComponent!: OCloudPerformanceComponent;
  @ViewChild('NfPerformanceComponent') nfPerformanceComponent!: NfPerformanceComponent;
  refreshTimeout!: any;
  refreshTime: number = 300;
  searchForm!: FormGroup;
  
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

  // @2024/06/22 Add
  // Show Spinner of Loading Title 
  showLoadingSpinner() {
    this.spinnerService.isLoading = true;
    this.spinnerService.show();
  }

  // @2024/06/22 Add
  // Show Spinner of Processing Title
  showProcessingSpinner() {
    this.spinnerService.isLoading = false;
    this.spinnerService.show();
  }
  
  // @2024/06/22 Add
  // Hide Spinner
  hideSpinner() {
    this.spinnerService.hide();
  }

  constructor(
    private                 http: HttpClient,
    private                   fb: FormBuilder,
    private               route: ActivatedRoute,
    private              dialog: MatDialog,

    public    commonService: CommonService,
    public  languageService: LanguageService,
    public   spinnerService: SpinnerService,
    
    public fieldList_LocalFiles: localFieldList,  // fieldList_LocalFiles 用於從 Local 文件獲取場域列表數據

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
    this.route.params.subscribe( ( params ) => {
      if ( params['type'] ) {
        this.searchForm.controls['type'].setValue( params['type'] );
      }
      if ( params['ocloud'] !== 'All' ) {
        this.searchForm.controls['ocloud'].setValue( params['ocloud'] );
        this.afterSearchOcloudId = params['ocloud'];
      }
      if ( params['nfId'] !== 'All' ) {
        this.searchForm.controls['nf'].setValue( params['nfId'] );
        this.afterSearchNfId = params['nfId'];
      }
    });
    console.log('init searchForm:')
    console.log( this.searchForm.value );

    this.sessionId = this.commonService.getSessionId();

    // Field Summary
    this.getQueryFieldList();
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }

  fieldList: FieldList = {} as FieldList;
  getQueryFieldList() {

    this.showLoadingSpinner();  // 顯示 spinner

    if ( this.commonService.isLocal ) {

      /* local file test */
      this.fieldList = this.fieldList_LocalFiles.fieldList_local;
      this.FieldListDeal(); // 調用處理函數，進行數據處理

      this.hideSpinner();   // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

    } else {

      const url = `${this.commonService.restPath}/queryFieldList/${this.sessionId}`;
      this.http.get( url ).subscribe(
        res => {
          
          console.log( 'queryFieldList:', res );
          this.fieldList = res as FieldList;
          this.FieldListDeal(); // 調用處理函數，進行數據處理

          this.hideSpinner();  // 完成後隱藏 spinner
        }
      );
    }
  }

  FieldListDeal() {

    // 輸出檢查點 - 打印場域列表的長度
    console.log('Field list length:', this.fieldList.fields?.length);

    // 計算 fields 數組中元素的數量，即場域的總數
    // 使用可選鏈和空值合併運算符來避免 undefined 或 null
    this.totalItems = this.fieldList.fields?.length || 0;
    console.log('Total items:', this.totalItems);
  }

  changeType( e: MatButtonToggleChange ) {
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

    const orgAdvancedForm = _.cloneDeep( this.advancedForm );

    this.advancedForm.controls['globalId'].setValue(this.searchForm.controls['ocloud'].value);
    this.advancedForm.controls['ocloudName'].setValue(this.searchForm.controls['ocloudName'].value);
    this.advancedForm.controls['nfId'].setValue(this.searchForm.controls['nf'].value);
    this.advancedForm.controls['nfName'].setValue(this.searchForm.controls['nfName'].value);
    this.advancedModalRef = this.dialog.open(this.advancedModal, { id: 'advancedModal' });

    this.advancedModalRef.afterClosed().subscribe( ( result ) => {
      console.log( result );

      if ( result === 'OK' ) {

        this.isSettingAdvanced = true;
        this.searchForm.controls['ocloud'].setValue( this.advancedForm.controls['globalId'].value );
        this.searchForm.controls['ocloudName'].setValue( this.advancedForm.controls['ocloudName'].value );
        this.searchForm.controls['nf'].setValue( this.advancedForm.controls['nfId'].value );
        this.searchForm.controls['nfName'].setValue( this.advancedForm.controls['nfName'].value );
        this.afterAdvancedForm = _.cloneDeep( this.advancedForm );

      } else {
        this.advancedForm = orgAdvancedForm;
      }
    });
  }

  pageChanged( page: number ) {
    this.p = page;
  }

  debug(){
    console.log('advancedForm:');
    console.log( this.advancedForm.value );
  }

}
