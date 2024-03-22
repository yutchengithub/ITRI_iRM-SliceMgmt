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
import { XMLParser } from "fast-xml-parser";

// For import APIs of Schedule Management 
import { apiForScheduleMgmt }     from '../../shared/api/For_Schedule_Mgmt';  // @2024/03/15 Add

// 引入儲存各個資訊所需的 interfaces of Schedule Management
import { ScheduleInfo }           from '../../shared/interfaces/Schedule/For_queryJobTicketInfo';  // @2024/03/15 Add

// For import local files of Schedule Management 
import { localScheduleInfo }      from '../../shared/local-files/Schedule/For_queryJobTicketInfo'; // @2024/03/15 Add

@Component({
  selector: 'app-schedule-info',
  templateUrl: './schedule-info.component.html',
  styleUrls: ['./schedule-info.component.scss']
})

export class ScheduleInfoComponent implements OnInit {

  sessionId: string = '';   // sessionId 用於存儲當前會話 ID
  refreshTimeout!: any;     // refreshTimeout 用於存儲 setTimeout 的引用，方便之後清除
  refreshTime: number = 5;  // refreshTime 定義自動刷新的時間間隔（秒）

  // 返回 Schedule Management 主頁
  back() {
    this.router.navigate(['/main/schedule-mgr']);
  }

  constructor(
  
    private             fb: FormBuilder,
    private         router: Router,
    private          route: ActivatedRoute,
    private         dialog: MatDialog,
    public   commonService: CommonService,
    public languageService: LanguageService,

    public             API_Schedule: apiForScheduleMgmt,  // API_Schedule 用於排程管理相關的 API 請求
    public  scheduleInfo_LocalFiles: localScheduleInfo,   // scheduleInfo_LocalFiles 用於從 Local Files 獲取排程資訊
  
  ) {
  }

  // @2024/03/17 Add
  scheduleId:   string = '';      // 用於存儲當前選中的排程 ID
  scheduleType: string = '';      // 用於存儲當前選中的排程類型

  // @2024/03/17 Update
  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();

    this.route.params.subscribe(( params ) => {
      this.scheduleId = params['id'];
      this.scheduleType = params['type'];
      console.log('scheduleId: ' + this.scheduleId + ', scheduleType: ' + this.scheduleType + ',\nsend from /main/schedule-mgr');
      this.getQueryJobTicketInfo();
    });

    this.languageService.languageChanged.subscribe(
      ( language ) => this.updateTicketStatusInfo()
    );
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }


  selectScheduleInfo: ScheduleInfo = {} as ScheduleInfo; // 用於存儲從伺服器或 Local 文件獲取的排程資訊
             isLoadingScheduleInfo = true;               // 加載狀態的標誌，初始設置為 true

  /** @2024/03/17 Add
   *  用於獲取排程詳細資訊。
   *  根據是否處於 Local 模式，它會從 Local 文件或通過 API 從伺服器獲取排程資訊。
   */
  getQueryJobTicketInfo() {
    console.log( 'getQueryJobTicketInfo() - Start' );

    this.isLoadingScheduleInfo = true;   // 開始加載數，顯示進度指示器
    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時，避免重複或不必要的操作

    if ( this.commonService.isLocal ) {

      // Local 模式: 使用 Local 文件提供的數據
      this.selectScheduleInfo = this.scheduleInfo_LocalFiles.scheduleInfo_local.find( info => info.id === this.scheduleId ) || {} as ScheduleInfo;
      console.log( 'In local - Get the ScheduleInfo:', this.selectScheduleInfo );

      this.isLoadingScheduleInfo = false; // Local 模式下，數據加載快速完成,直接設置為 false

    } else {

      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.API_Schedule.queryJobTicketInfo( this.scheduleId ).subscribe({
        next: ( res ) => {

          // 請求成功，獲得排程資訊
          console.log( 'Get the ScheduleInfo:', res );

          this.selectScheduleInfo = res; // 更新排程資訊
        },
        error: ( error ) => {
          // 請求出現錯誤
          console.error( 'Error fetching job ticket info:', error );
          this.isLoadingScheduleInfo = false; // 出錯時設置加載標誌為 false
        },
        complete: () => {
          // 數據流處理完成（ 無論成功或失敗 ）
          console.log( 'Job ticket info fetch completed' );
          this.isLoadingScheduleInfo = false; // 數據加載完成
        }
      });
    }
  }


  // ↓ 控制顯示排程狀態的 icon 與訊息 @2024/03/22 Add ↓

    // @2024/03/22 Add
    // 用於存儲排程狀態對應的 icon 和訊息
    ticketStatusInfo = [
      { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] },
      { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobDailyString'] + ')' },
      { icon: 'blueLight',   message: this.languageService.i18n['sm.jobOnGoingString'] },
      { icon: 'greenLight',  message: this.languageService.i18n['sm.jobSuccessString'] },
      { icon: 'redLight',    message: this.languageService.i18n['sm.jobFailString'] },
      { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
    ];

    // @2024/03/22 Add
    // 根據排程狀態獲取對應的圖示和訊息
    getTicketStatusInfo( scheduleInfo: ScheduleInfo ) {

      // 將 scheduleInfo.ticketstatus 從字符串轉換為數字
      const ticketStatus = parseInt( scheduleInfo.ticketstatus );

      // 將 scheduleInfo.executedtype 從字符串轉換為數字
      const executedType = parseInt( scheduleInfo.executedtype );

      // 如果 ticketStatus 為 0 或 1
      if ( ticketStatus === 0 || ticketStatus === 1 ) {
        // 如果 executedType 為 1
        if ( executedType === 1 ) {
          // 返回 ticketStatusInfo 中索引為 1 的項目
          return this.ticketStatusInfo[1];
        } else if ( executedType === 2 ) {
          // 返回一個自定義的對象,包含圖示和消息
          return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobWeeklyString'] + ')' };
        } else if ( executedType === 3 ) {
          // 返回一個自定義的對象,包含圖示和消息
          return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobMonthlyString'] + ')' };
        }
      }

      // 如果上述條件都不滿足,則返回 ticketStatusInfo 中與 ticketStatus 相對應的項目
      return this.ticketStatusInfo[ticketStatus];
    }

    // @2024/03/22 Add
    // 用於控制當語系切換時根據排程狀態，顯示對應的 icon 或中英文字訊息
    updateTicketStatusInfo() {

      // 重新初始化 ticketStatusInfo 數組，以正確顯示對應的語言訊息於表格的狀態欄中
      this.ticketStatusInfo = [
        { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] },
        { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] + ' (' + this.languageService.i18n['sm.jobDailyString'] + ')' },
        { icon: 'blueLight',   message: this.languageService.i18n['sm.jobOnGoingString'] },
        { icon: 'greenLight',  message: this.languageService.i18n['sm.jobSuccessString'] },
        { icon: 'redLight',    message: this.languageService.i18n['sm.jobFailString'] },
        { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
      ];
    }

// ↑ 控制顯示排程狀態的 icon 與訊息 @2024/03/22 Add ↑






  p: number = 1;            // 當前頁數
  pageSize: number = 5;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  pageChanged( page: number ) {
    this.p = page;
  }

}
