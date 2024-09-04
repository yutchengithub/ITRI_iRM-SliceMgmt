
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Router } from '@angular/router';

// Services
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService } from '../shared/service/spinner.service';    // 用於控制顯示 Spinner @2024/04/17 Add

// For import interfaces
import { FieldSummary }     from '../shared/interfaces/Field/For_queryFieldSummaryInfo';  // @2024/03/14 Add by yuchen
import { FieldList, Field } from '../shared/interfaces/Field/For_queryFieldList';         // @2024/03/14 Add by yuchen

// For import local files
import { localFieldSummaryInfo } from '../shared/local-files/Field/For_queryFieldSummaryInfo'; // @2024/03/14 Add by yuchen
import { localFieldList }        from '../shared/local-files/Field/For_queryFieldList';        // @2024/03/14 Add by yuchen

export interface SystemSummary {
  ocloudCount: number;
  nfCount: number;
  totalCritical: number;
  totalMajor: number;
  totalMinor: number;
  totalWarning: number;
  avgCpu: string;
  totalMemory: string;
  avgStorage: string;
  avgNetwork: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  sessionId: string = '';

  /* CRITICAL,MAJOR,MINOR,WARNING */
  severitys: string[];

  // @2024/04/17 Add
  // Show spinner of Loading Title 
  showLoadingSpinner() {
    this.spinnerService.isLoading = true;
    this.spinnerService.show();
  }

  // @2024/04/17 Add
  // Show spinner of Processing Title
  showProcessingSpinner() {
    this.spinnerService.isLoading = false;
    this.spinnerService.show();
  }

  // Hide spinner @2024/04/17 Add
  hideSpinner() {
    this.spinnerService.hide();
  }

  constructor(

    private                   http: HttpClient, 
    public           commonService: CommonService, 
    public          spinnerService: SpinnerService,
    private                 router: Router, 
    public         languageService: LanguageService,

    public fieldSummary_LocalFiles: localFieldSummaryInfo, // fieldSummary_LocalFiles 用於從 Local 文件獲取總結所有場域資訊
    public    fieldList_LocalFiles: localFieldList,        // fieldList_LocalFiles 用於從 Local 文件獲取場域列表數據
    
  ) {

    this.severitys = this.commonService.severitys;
  }

  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();

    // Field Summary
    this.getfieldSummaryInfo();
    this.getfieldListInfo();
  }
  
  ueNum: string = '0';
  isFieldSummaryLoading = false; // 加載狀態的標誌，初始設置為 false @2024/03/14 Add for Progress Spinner
  fieldSummary: FieldSummary = {} as FieldSummary;
  getfieldSummaryInfo() {

    this.isFieldSummaryLoading = true; // 開始加載數據，顯示進度指示器
    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {
      // local file test

      this.fieldSummary = this.fieldSummary_LocalFiles.fieldSummary_local;
	    this.fieldSummary.fieldSummaryInfo.forEach( field => {

        this.ueNum = ( field.ueNum.match(/\d+/)?.[0] || '0' ).toString();
        //field.ueNum = extractedNumber;

      });

      console.log( 'fieldSummaryInfo:', this.fieldSummary );		

      this.isFieldSummaryLoading = false; //  Local 模式下，數據加載快速完成，直接設置為 false
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      const url = `${this.commonService.restPath}/queryFieldSummaryInfo/${this.sessionId}`;

      this.http.get( url ).subscribe(
        res => {
          console.log( 'queryFieldSummaryInfo:', res );
          this.fieldSummary = res as FieldSummary;

          this.isFieldSummaryLoading = false; // 數據加載完成
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      );
    }
  }

  isFieldListLoading = false; // 加載狀態的標誌，初始設置為 false @2024/03/14 Add for Progress Spinner
  fieldList: FieldList = {} as FieldList;
  getfieldListInfo() {

    this.isFieldListLoading = true; // 開始加載數據，顯示進度指示器
    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {
      /* local file test */

      this.fieldList = this.fieldList_LocalFiles.fieldList_local;
      this.FieldListDeal(); // 調用處理函數，進行數據處理

      //this.isFieldListLoading = false; //  Local 模式下，數據加載快速完成，直接設置為 false
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      const url = `${this.commonService.restPath}/queryFieldList/${this.sessionId}`;

      this.http.get( url ).subscribe(
        res => {

          console.log( 'queryFieldList:', res );
          this.fieldList = res as FieldList;
          this.FieldListDeal(); // 調用處理函數，進行數據處理

          //this.isFieldListLoading = false; // 數據加載完成
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      );
    }
  }
  
  totalItems: number = 0;    // 總筆數 - 整個數據集的總條目數，用於計算分頁總數。
  FieldListDeal() {

    // 輸出檢查點 - 打印場域列表的長度
    console.log('Field list length:', this.fieldList.fields?.length);

    // 計算 fields 數組中元素的數量，即場域的總數
    // 使用可選鏈和空值合併運算符來避免 undefined 或 null
    this.totalItems = this.fieldList.fields?.length || 0;
    console.log('Total items:', this.totalItems);
  }

  ueNumList: string[] = [];
  numUes( inputString: string ): string {

    const matches = inputString.match(/\d+/);

    return matches ? matches[0] : '0';
  }

  // @12/13 Add by yuchen
  selectField!: Field;  

  // @12/13 Update by yuchen
  view( fields: Field ) {
    this.selectField = fields;
    console.log( "View Detail of the field id:", this.selectField.id, "and the field name: ", this.selectField.name );
    this.router.navigate( ['/main/field-mgr/info', this.selectField.id, this.selectField.name] );
  }


  systemSummary: SystemSummary = {} as SystemSummary;

  severityCount( severity: string ): number {

    if ( severity.toUpperCase() === this.severitys[0] ) {
      return this.systemSummary.totalCritical;
    } else if ( severity.toUpperCase() === this.severitys[1] ) {

      return this.systemSummary.totalMajor;

    } else if ( severity.toUpperCase() === this.severitys[2] ) {

      return this.systemSummary.totalMinor;

    } else if ( severity.toUpperCase() === this.severitys[3] ) {
      
      return this.systemSummary.totalWarning;

    } else {

      return 0;
    }
  }

  severityText( severity: string ): string {
    return this.commonService.severityText( severity );
  }

}
