import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SoftwareList }  from './../../software-management/software-management.component';
import { SoftwareLists } from './../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary }   from 'src/app/dashboard/dashboard.component';
import { FmsgList }      from './../../fault-management/fault-management.component';
import { FaultMessages } from './../../fault-management/fault-management.component';
import { Subscription }  from 'rxjs';
import { XMLParser }     from "fast-xml-parser";
import { formatDate } from '@angular/common';

// @2024/05/03 Add
import { Location } from '@angular/common';  // 引入 Location 服務，用於控制瀏覽器的歷史記錄導航

// Services
import { CommonService } from '../../shared/common.service';
import { LanguageService } from '../../shared/service/language.service';
import { SpinnerService } from '../../shared/service/spinner.service';    // 用於控制顯示 Spinner @2024/04/17 Add


// For import APIs of Schedule Management 
import { apiForScheduleMgmt } from '../../shared/api/For_Schedule_Mgmt';  // @2024/03/15 Add

// 引入儲存各個資訊所需的 interfaces of Schedule Management
import { ScheduleInfo, sfUpdateInfo, caReportInfo, pmReportInfo, sfOrfmReportInfo } from '../../shared/interfaces/Schedule/For_queryJobTicketInfo';  // @2024/03/15 Add
import { installLogInfo, kpiInfo } from '../../shared/interfaces/Schedule/For_queryJobTicketInfo';  // @2024/03/24 Add

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

  // @2024/05/03 Update
  // 返回使用的前個頁面
  back() {
    this.location.back();
    //this.router.navigate( ['/main/schedule-mgr'] ); // 返回 schedule 主頁
  }

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
  
    private             fb: FormBuilder,
    private         router: Router,
    private          route: ActivatedRoute,
    private         dialog: MatDialog,
    private       location: Location,  // @2024/05/03 Add
    public   commonService: CommonService,
    public languageService: LanguageService,
    public  spinnerService: SpinnerService,

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
      ( language ) => {
        this.updateTicketStatusInfo();
        this.parseScheduleTime(); // 重新解析時間，以更新顯示
      }
    );
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }

  // 新增儲存週期性執行細節的變數
  detailedTime: string = ''; // New variable to store detailed time

  isLoadingScheduleInfo = true;  // 加載狀態的標誌，初始設置為 true
  selectScheduleInfo:     ScheduleInfo = {} as ScheduleInfo;     // 用於存儲從伺服器或 Local 文件獲取的排程資訊
  /** @2024/05/07 Update
   *  用於獲取排程詳細資訊。
   *  根據是否處於 Local 模式，它會從 Local 文件或通過 API 從伺服器獲取排程資訊。
   */
  getQueryJobTicketInfo() {
    console.log( 'getQueryJobTicketInfo() - Start' );

    this.isLoadingScheduleInfo = true;   // 開始加載數，顯示進度指示器
    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時，避免重複或不必要的操作

    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {

      // Local 模式: 使用 Local 文件提供的數據
      this.selectScheduleInfo = this.scheduleInfo_LocalFiles.scheduleInfo_local.find( info => info.id === this.scheduleId ) || {} as ScheduleInfo;
      console.log( 'In local - Get the ScheduleInfo:', this.selectScheduleInfo );

      this.parseScheduleTime(); // 解析排程執行時間

      this.isLoadingScheduleInfo = false; // Local 模式下，數據加載快速完成,直接設置為 false
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {

      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.API_Schedule.queryJobTicketInfo( this.scheduleId ).subscribe({
        next: ( res ) => {

          // 請求成功，獲得排程資訊
          console.log( 'Get the ScheduleInfo:', res );

          this.selectScheduleInfo = res; // 更新排程資訊

          this.parseScheduleTime(); // 解析排程執行時間

          this.isLoadingScheduleInfo = false; // 數據加載完成
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          // 請求出現錯誤
          console.error( 'Error fetching job ticket info:', error );
          this.isLoadingScheduleInfo = false; // 出錯時設置加載標誌為 false
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        complete: () => {
          // 數據流處理完成（ 無論成功或失敗 ）
          console.log( 'Job ticket info fetch completed' );
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }
  }
  
  /**
   * @2024/05/07 Add
   * 解析排程執行時間的詳細資訊
   * @method parseScheduleTime
   * @returns { void }
   * @description
   * - 根據排程的執行類型，解析排程執行時間的詳細資訊
   * - 對於每日執行，顯示執行時間
   * - 對於每週執行，顯示執行時間和對應的星期幾
   * - 對於每月執行，顯示執行日期和時間
   * - 若非週期性執行，顯示對應的語言訊息
   */
  parseScheduleTime() {

    // 將排程執行時間轉換為 Date 對象
    const scheduleDate = new Date( this.selectScheduleInfo.executedtime ); 
    
    // 獲取排程執行日期是星期幾 (0-6)
    const dayOfWeek = scheduleDate.getDay();
    
    // 格式化排程執行時間為 "HH:mm:ss" 的字符串
    const timeString = formatDate( scheduleDate, 'HH:mm:ss', 'en-US' );
    
    // 獲取對應語言的星期名稱數組
    const days = this.languageService.i18n['sm.daysOfWeek'];
    
    // 獲取對應語言的日期後綴
    const dateSuffix = this.languageService.i18n['sm.dateSuffix'];

    // 根據排程的執行類型進行處理
    switch ( this.selectScheduleInfo.executedtype ) {
      case '1': // 每天執行
        this.detailedTime = `${timeString}`;
        break;
      case '2': // 每週執行 
        if ( this.languageService.language === 'EN' ) {
          this.detailedTime = `${timeString} ${days[dayOfWeek]}`;
        } else {
          this.detailedTime = `${days[dayOfWeek]} ${timeString}`;  
        }
        break;
      case '3': // 每月執行
        if ( this.languageService.language === 'EN' ) { 
          this.detailedTime = `${dateSuffix} ${scheduleDate.getDate()} at ${timeString}`;
        } else {
          this.detailedTime = `${scheduleDate.getDate()} ${dateSuffix} ${timeString}`;
        }
        break;
      default: // 非週期性執行
        this.detailedTime = this.languageService.i18n['sm.notPeriodicExecution'];
        break;
    }
  }
  
  // @2024/03/24 Add
  // isSfUpdateInfoArray 是一個自定義的類型守衛函數，用於檢查 `ticketinfo` 是否為 `sfUpdateInfo[]` 類型的陣列。
  isSfUpdateInfoArray( ticketinfo: ScheduleInfo['ticketinfo'] ): ticketinfo is sfUpdateInfo[] {
    // `this.selectScheduleInfo.tickettype === '0'` 檢查當前選擇的排程信息 (`selectScheduleInfo`) 的 `tickettype` 是否為 '0'。
    // 如果 `tickettype` 是 '0'，根據我們的介面定義，`ticketinfo` 應該是一個 `sfUpdateInfo[]` 類型的陣列。
    
    // `Array.isArray(ticketinfo)` 是 JavaScript 的標準函數，用於檢查 `ticketinfo` 是否是一個陣列。
    // 組合這兩個條件，我們可以確定 `ticketinfo` 是不是一個 `sfUpdateInfo[]` 類型的陣列。

    // 此函數最終返回一個布爾值，如果是 `sfUpdateInfo[]` 類型的陣列則返回 true，否則返回 false。
    // 這樣的檢查使得在使用 `ticketinfo` 變數時，TypeScript 能夠了解其類型，並且提供正確的自動完成功能和類型檢查。
    return this.selectScheduleInfo.tickettype === '0' && Array.isArray( ticketinfo );
  }

  // @2024/03/24 Add
  // 檢查 ticketinfo 是否為 caReportInfo 類型（當 tickettype 為 '1' 時）
  isCaReportInfo( ticketinfo: ScheduleInfo['ticketinfo'] ): ticketinfo is caReportInfo {
    return this.selectScheduleInfo.tickettype === '1' && !Array.isArray( ticketinfo );
  }

 /** @2024/03/24 Add
   * 檢查給定的 ticketinfo 是否為 pmReportInfo[] 類型。
   * 此函數是一個類型守衛，用於當 tickettype 為 '2' 時，
   * 確保 ticketinfo 是 pmReportInfo[] 類型的陣列。
   * @param ticketinfo - 從 ScheduleInfo['ticketinfo'] 傳入的值
   * @returns - 如果 ticketinfo 是 pmReportInfo[] 類型且 tickettype 為 '2'，則返回 true，否則返回 false
   */
  isPmReportInfoArray( ticketinfo: ScheduleInfo['ticketinfo'] ): ticketinfo is pmReportInfo[] {
    // 先檢查 tickettype 是否為 '2'，然後檢查 ticketinfo 是否為一個陣列。
    // 這是必要的，因為根據 ScheduleInfo 介面的定義，當 tickettype 為 '2' 時，ticketinfo 應該是 pmReportInfo[] 類型。
    return this.selectScheduleInfo.tickettype === '2' && Array.isArray( ticketinfo );
  }

 /** @2024/03/24 Add
   * 將 customizedkpi 物件轉換為 kpiInfo 類型的陣列。
   * 這允許在模板中使用 *ngFor 來迭代 kpiInfo 項目。
   * @param customizedkpi - 可能是一個字典物件或 undefined，字典的值是 kpiInfo 類型
   * @returns - 如果 customizedkpi 定義了，則返回一個 kpiInfo 陣列，否則返回一個空陣列
   */
  getCustomizedKpiArray( customizedkpi: { [key: string]: kpiInfo } | undefined ): kpiInfo[] {
    // 使用 JavaScript 的 Object.values() 函數來轉換物件的值為一個陣列。
    // 如果 customizedkpi 是 undefined，則返回一個空陣列以防止錯誤。
    return customizedkpi ? Object.values( customizedkpi ) : [];
  }

  // @2024/03/24 Add
  // 檢查 ticketinfo 是否為 sfOrfmReportInfo[] 類型（當 tickettype 為 '3' 或 '4' 時）
  isSfOrfmReportInfoArray( ticketinfo: ScheduleInfo['ticketinfo'] ): ticketinfo is sfOrfmReportInfo[] {
    return ( this.selectScheduleInfo.tickettype === '3' || this.selectScheduleInfo.tickettype === '4' ) && Array.isArray( ticketinfo );
  }

  // @2024/03/26 Add
  // 在組件類中定義方法，根據不同條件返回對應的 CSS 類名
  getDynamicClasses( scheduleInfo: ScheduleInfo ): Record<string, boolean> {
    // 定義所有可能的 CSS 類名
    const cssClasses: Record<string, boolean> = {
      'sfUpdate': scheduleInfo.tickettype === '0',
      'caReport': scheduleInfo.tickettype === '1',
      'pmReport': scheduleInfo.tickettype === '2',
      'fmReport': scheduleInfo.tickettype === '3',
      'sfReport': scheduleInfo.tickettype === '4',
    };
  
    // 檢查是否應該應用 kpiTable 樣式
    cssClasses['kpiTable'] = this.shouldApplyKpiTableStyle(); // 無需if檢查，直接賦值
  
    return cssClasses;
  }
  
  // @2024/03/26 Add
  // 在組件類中定義方法，用於檢查是否應該應用 'kpiTable' 樣式
  shouldApplyKpiTableStyle(): boolean {
    
    // 使用類型守衛函數 isPmReportInfoArray 來檢查 ticketinfo 是否是 pmReportInfo[] 類型
    if ( this.isPmReportInfoArray( this.selectScheduleInfo.ticketinfo ) ) {

      // 如果是 pmReportInfo[] 類型，並且第一個元素的 iscustomized 屬性為 1，則返回 true
      return this.selectScheduleInfo.ticketinfo[0].iscustomized === 1;
    }

    // 如果不是 pmReportInfo[] 類型或者 iscustomized 不為 1，則返回 false
    return false;
  }


  // ↓ 控制顯示排程狀態的 icon 與訊息 @2024/03/22 Add ↓

    // @2024/03/22 Add
    // 用於存儲排程狀態對應的 icon 和訊息
    ticketStatusInfo = [
      { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] },
      { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobDailyString'] + ' )' },
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
          return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobWeeklyString'] + ' )' };
        } else if ( executedType === 3 ) {
          // 返回一個自定義的對象,包含圖示和消息
          return { icon: 'grayLight', message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobMonthlyString'] + ' )' };
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
        { icon: 'grayLight',   message: this.languageService.i18n['sm.jobSchedulingString'] + ' ( ' + this.languageService.i18n['sm.jobDailyString'] + ' )' },
        { icon: 'blueLight',   message: this.languageService.i18n['sm.jobOnGoingString'] },
        { icon: 'greenLight',  message: this.languageService.i18n['sm.jobSuccessString'] },
        { icon: 'redLight',    message: this.languageService.i18n['sm.jobFailString'] },
        { icon: 'yellowLight', message: this.languageService.i18n['sm.jobPartialSuccessString'] }
      ];
    }

// ↑ 控制顯示排程狀態的 icon 與訊息 @2024/03/22 Add ↑


// ↓ For Download Schedule Report @2024/03/24 Add ↓

  // 用於下載排程列表裡的指定排程報表
  downloadSpecificScheduleReportInList( scheduleInfo: ScheduleInfo ) {
    console.log("downloadSpecificScheduleReportInList() - Start");

    this.showProcessingSpinner();

    // 將選中的 scheduleInfo 賦值給 selectScheduleInfo
    this.selectScheduleInfo = scheduleInfo;

    // 檢查是否在 Local 環境下模擬執行
    if ( this.commonService.isLocal ) {

      // Local 模式下無法下載報表
      console.log( "Local 模式下無法真的下載報表,\n 此點選要下載的報表名稱為:", this.selectScheduleInfo.ticketresult );

      this.hideSpinner();  // 完成後隱藏 spinner
    } else {

      // 生產環境下向後端 API 發送請求下載報表
      this.API_Schedule.getReportFile( this.selectScheduleInfo.id ).subscribe({
        next: ( response ) => {

          // 處理成功的響應
          console.log( "排程報表", this.selectScheduleInfo.ticketresult, "下載成功:", response );

          // 取得報表名稱
          const fileName = this.selectScheduleInfo.ticketresult;

          // 解碼 Base64 字符串並自動下載檔案
          this.commonService.downloadExcelFromBase64( response, fileName );

          this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          // 處理失敗響應
          console.error( "排程報表下載失敗:", error );
          // 例如顯示錯誤訊息給用戶
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }

    console.log( "downloadSpecificScheduleReportInList() - End" );
  }

// ↑ For Download Schedule Report @2024/03/24 Add ↑


// ↓ For 處理 "軟體更新" 排程裡會出現的 installlog @2024/03/24 Add ↓

  /** @2024/03/26 Update
  * 將每個 Install Log 條目解析成模板中更易於管理的格式。
  * @param installLogs - 軟體更新資訊中的 Install Log 資訊陣列。
  * @returns - 包含解析後日誌細節的物件陣列。
  */
  parseInstallLog( installLogs: installLogInfo[] ): any[] {

    return installLogs.map(log => {

      // 嘗試匹配 Download Log 條目是否符合預定義的模式
      const downloadMatch = log.Download.match(/(.*) (Download Success|Download Fail) (.*)/);

      // 嘗試匹配 Install Log 條目是否符合預定義的模式
      const installMatch = log.Install.match(/(.*) (Install Success|Install Fail) (.*)/);

      // 處理時間字符串，去掉秒數後的小數部分
      const downloadTime = downloadMatch ? downloadMatch[1].split('.')[0] : ''; // 下載時間處理
      const installTime = installMatch ? installMatch[1].split('.')[0] : '';    // 安裝時間處理

      // 返回一個物件，包含下載和安裝事件的解析時間、狀態及目標
      return {
        downloadTime,  // 捕獲並處理的下載時間
        downloadStatus: downloadMatch ? downloadMatch[2] : '',  // 捕獲的下載狀態
        downloadTarget: downloadMatch ? downloadMatch[3] : '',  // 捕獲的下載目標 NE ID
        installTime,    // 捕獲並處理的安裝時間
        installStatus: installMatch ? installMatch[2] : '',    // 捕獲的安裝狀態
        installTarget: installMatch ? installMatch[3] : '',    // 捕獲的安裝目標 NE ID
      };
    });
  }

// ↑ For 處理 "軟體更新" 排程裡會出現的 installlog @2024/03/24 Add ↑




  p: number = 1;            // 當前頁數
  pageSize: number = 5;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  pageChanged( page: number ) {
    this.p = page;
  }

}
