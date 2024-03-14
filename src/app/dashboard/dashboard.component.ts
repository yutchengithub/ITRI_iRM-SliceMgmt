
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as _ from 'lodash';
import { Router } from '@angular/router';

import { CommonService } from '../shared/common.service';														
import { LanguageService } from '../shared/service/language.service';

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

  constructor(

    private                   http: HttpClient, 
    public           commonService: CommonService, 
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

    if ( this.commonService.isLocal ) {
      // local file test

      this.fieldSummary = this.fieldSummary_LocalFiles.fieldSummary_local;
	    this.fieldSummary.fieldSummaryInfo.forEach( field => {

        this.ueNum = ( field.ueNum.match(/\d+/)?.[0] || '0' ).toString();
        //field.ueNum = extractedNumber;

      });

      console.log( 'fieldSummaryInfo:', this.fieldSummary );		

      this.isFieldSummaryLoading = false; //  Local 模式下，數據加載快速完成，直接設置為 false

    } else {

      const url = `${this.commonService.restPath}/queryFieldSummaryInfo/${this.sessionId}`;

      this.http.get( url ).subscribe(
        res => {
          console.log( 'queryFieldSummaryInfo:', res );
          this.fieldSummary = res as FieldSummary;

          this.isFieldSummaryLoading = false; // 數據加載完成
        }
      );
    }
  }

  isFieldListLoading = false; // 加載狀態的標誌，初始設置為 false @2024/03/14 Add for Progress Spinner
  fieldList: FieldList = {} as FieldList;
  getfieldListInfo() {

    this.isFieldListLoading = true; // 開始加載數據，顯示進度指示器

    if ( this.commonService.isLocal ) {
      /* local file test */

      this.fieldList = this.fieldList_LocalFiles.fieldList_local;

      this.isFieldListLoading = false; //  Local 模式下，數據加載快速完成，直接設置為 false

    } else {

      const url = `${this.commonService.restPath}/queryFieldList/${this.sessionId}`;

      this.http.get( url ).subscribe(
        res => {

          console.log( 'queryFieldList:', res );
          this.fieldList = res as FieldList;

          this.isFieldListLoading = false; // 數據加載完成
        }
      );
    }
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
