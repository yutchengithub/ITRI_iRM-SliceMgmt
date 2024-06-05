
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { Subscription } from 'rxjs';
import { ElementRef } from '@angular/core';

// Services
import { CommonService }     from '../../shared/common.service';
import { LanguageService }   from '../../shared/service/language.service';
import { SpinnerService }    from '../../shared/service/spinner.service';     // 用於控制顯示 Spinner @2024/04/17 Add
import { FieldStateService } from '../../shared/service/field-state.service'; // 用於跟蹤場域頁面的 showMapModel 的顯示模式狀態 @2024/05/03 Add
import { NavigationService } from '../../shared/service/navigation.service';  // 用於跟蹤路由歷史 @2024/05/03 Add

// Mat Modules
import { MatButtonToggleChange } from '@angular/material/button-toggle';

import { of } from 'rxjs'; // @2024/01/09 Add 
import { forkJoin, Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';          // @2023/12/13 Add for use 'detectChanges()'
import { environment } from 'src/environments/environment'; // @2023/12/20 Add for import Google Maps API Key
import { NgZone } from '@angular/core';

// @2024/05/03 Add
import { Location } from '@angular/common';  // 引入 Location 服務，用於控制瀏覽器的歷史記錄導航

// import APIs of Field Management @2024/03/14 Update 
import { apiForFieldMgmt } from '../../shared/api/For_Field_Mgmt';

// 引入儲存各個資訊所需的 interfaces
import { FieldInfo }                      from '../../shared/interfaces/Field/For_queryFieldInfo';                     // @2023/12/21 Add
import { BsInfoInField, CellInfo }        from '../../shared/interfaces/Field/For_queryFieldInfo';                     // @2023/12/21 Add
import { ForCreateOrUpdateField, Bsinfo } from '../../shared/interfaces/Field/For_createField_or_updateField';         // @2024/01/26 Add
import { ForQueryOrUpdatePmFTPInfo }      from '../../shared/interfaces/Field/For_queryPmFtpInfo_or_updatePmFtpInfo';  // @2024/02/04 Add
import { ForQuerySonParameter }           from '../../shared/interfaces/Field/For_querySonParameter';                  // @2024/03/30 Add

import { ForCalculateSon, ForCalculateSonResponse,
         cco_CellIndividualResult, ProcessedCcoResult,
         anr_CellIndividualResult, ProcessedAnrResult, anr_Neighbor,
         pci_CellIndividualResult, pci_Collisioncell, pci_Collisioncount, pci_Confusioncell, pci_Confusioncount
  } from '../../shared/interfaces/Field/For_multiCalculateBs'; // @2024/03/31 Add
import { ForApplySon, ApplySon_BsInfo }   from '../../shared/interfaces/Field/For_multiOptimalBs';  // @2024/04/12 Add

import { BSInfo } from '../../shared/interfaces/BS/For_queryBsInfo_BS';       // @2023/12/21 Add
import { BSInfo_dist, PLMNid,
         Components_dist, duID, ruID,} from '../../shared/interfaces/BS/For_queryBsInfo_dist_BS';  // @2023/12/24 Add
import { BSList, Basestation } from '../../shared/interfaces/BS/For_queryBsList';                  // @2024/01/25 Update

// 引入所需 Local Files
import { localFieldInfo }            from '../../shared/local-files/Field/For_queryFieldInfo';    // @2024/03/14 Add
import { localPmFTPInfo }            from '../../shared/local-files/Field/For_queryPmFtpInfo';    // @2024/02/04 Add
import { localFieldSonParameters }   from '../../shared/local-files/Field/For_querySonParameter'; // @2024/03/30 Add
import { localCalculateSonResponse } from '../../shared/local-files/Field/For_multiCalculateBs_response'; // @2024/03/31 Add
import { localBSList }    from '../../shared/local-files/BS/For_queryBsList';       // @2024/01/16 Add
import { localBSInfo }    from '../../shared/local-files/BS/For_queryBsInfo';       // @2023/12/27 Add

import { map } from 'rxjs/operators';              // @2023/12/24 Add
import { GoogleMap } from '@angular/google-maps';  // @2024/01/03 Add
import { MapMarker, MapInfoWindow } from '@angular/google-maps'; // @2024/02/27 Add

import { MatCheckboxChange } from '@angular/material/checkbox'; // @2024/03/30 Add
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { LegendPosition } from '@swimlane/ngx-charts';

// chart.js 圖表配置用 @2024/06/05 Add
import {  Chart, 
          ChartConfiguration, 
          ChartOptions,
          ChartType,
          ChartComponentLike, 
          ChartEvent, 
          LegendItem
        } from "chart.js";
import { BaseChartDirective } from 'ng2-charts';

import { Console } from 'console';

export interface SimplifiedBSInfo {
  
    // For display and POST of update BS
            name: string;
          bstype: number;
          status: number;
            nci: string;
            pci: number;
      "tx-power": number;
    "nrarfcn-dl": number;
    "nrarfcn-ul": number;
        position: string;
      neighbors: SimplifiedNeighborInfo[];
        iconUrl: string; // 存儲 BS 圖標的 URL

    // For POST of update BS
            id: string;
    description: string;
            tac: string;
      'plmn-id': PLMNid;
    channelbandwidth: number;
          components: {};  // 存儲 BS 的 Component ID

    // For Field Edit @2024/01/11 Add
          gNBId: number;
    gNBIdLength: number;


    // 取出 CU 配置的 ID
    componentId: string;

    // 用於儲存 BS 的 Cell 之 RU ID 與 nci 的對應關係 ( 一體式會為空 )
    cellInfo: {};  // 存儲 BS 的 Component ID
}

export interface SimplifiedNeighborInfo {
         id: string;
  'plmn-id': PLMNid;
        nci: string;
        pci: number;
}

// @2024/01/10 Update
// 定義一個 enum 來表示不同的 overlay 類型
enum OverlayType {
  SINR,
  RSRP,
  None
}

// @2024/05/31 Add
// 定義場域效能區 - Kpi Category 介面
interface KpiCategory {
  displayName: string;
  value: string;
}

// @2024/05/31 Add
// 定義場域效能區 - Kpi Subcategory 介面
interface KpiSubcategory {
  displayName: string;
  value: string;
}

/** 
 * @2024/05/31 Add
 * 定義圖表數據點結構，用於存儲每個數據點的詳細信息。
 * @interface BarChartData
 * @property {string} [color] - 儲存顏色
 * @property {string} [time] - 儲存時間範圍
 * @property {string} [name] - 儲存名稱
 * @property {any}    [value] - 儲存數值
 * @property {string} [label] - 儲存標籤
 * @property {string} [unit] - 儲存單位
 */
 export interface BarChartData {
  color?: string;    // 儲存顏色
  time?: string;     // 儲存時間範圍
  name: string;      // 儲存名稱
  value: number;       // 儲存數值
  label?: string;    // 儲存標籤
  unit?: string;     // 儲存單位
}
@Component({
  selector: 'app-field-info',
  templateUrl: './field-info.component.html',
  styleUrls: ['./field-info.component.scss']
})

export class FieldInfoComponent implements OnInit {

  sessionId: string = '';

  tooltipOptions = {
    theme: 'light',  // 'dark' | 'light'
    hideDelay: 250
  };

  refreshTimeout!: any;
  refreshTime: number = 5;

  fieldInfo: FieldInfo = {} as FieldInfo;      // @12/05 Add by yuchen
  fieldId: string = '';     // @12/05 Add by yuchen
  fieldName: string = '';   // @12/05 Add by yuchen

  // @2024/05/03 Update
  // 返回使用的前個頁面
  back() {
    this.location.back();
    //this.router.navigate( ['/main/field-mgr'] ); // 返回 Field 主頁
  }

  // For Fault Alarms: 
  // CRITICAL, MAJOR, MINOR, WARNING
  severitys: string[];

  // 往 Fault Management @12/07 Update
  goFaultMgr() {
    this.router.navigate( ['/main/fault-mgr', this.fieldName, 'All'] );
  }

  // 往 Performance Management @2024/01/05 Update
  goPerformanceMgr() {
    this.router.navigate( ['/main/performance-mgr'] );
  }


  selectBS!: SimplifiedBSInfo;  // 用於存儲當前選中的 BS 訊息 @2024/03/22 Add

  /** @2024/05/03 Update
   * 導航到選定基站的詳細資訊頁面。
   * @param BS 從 BS 列表中選擇的 BS 物件。
   */
  viewBSDetailInfo( BS: SimplifiedBSInfo ) {

    this.selectBS = BS; // 設定當前選擇的 BS。

    console.log( "View Detail of the BS id:", this.selectBS.id, "and the BS name: ", this.selectBS.name,
                   "and the BS type: ", this.selectBS.bstype ); // 輸出選擇的基站 ID、名稱和類型。

    this.fieldStateService.showMapModel = this.showMapModel; // 保存當前場域資訊頁的顯示模式=

    // 導航到 BS 管理的詳細資訊頁面，帶上 BS 的 ID、名稱、類型作為路由參數。
    this.router.navigate( ['/main/bs-mgr/info', this.selectBS.id, this.selectBS.name, this.selectBS.bstype] );
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

// ↓ Page Init ↓

  constructor(
    private router: Router,
    private  route: ActivatedRoute,
    private     fb: FormBuilder,
    private dialog: MatDialog,

    // @12/13 Add - 使用 detectChanges() 方法用於手動觸發 Angular 的變更檢測機制，
    //              確保當數據模型更新後，相關的視圖能夠及時反映
    private      cdr: ChangeDetectorRef,

    private   ngZone: NgZone,
    private location: Location,  // @2024/05/03 Add

    public    languageService: LanguageService,
    public      commonService: CommonService,
    public     spinnerService: SpinnerService,
    private navigationService: NavigationService, // 用於跟蹤路由歷史 @2024/05/03 Add
    private fieldStateService: FieldStateService, // 用於跟蹤場域頁面的 showMapModel 的顯示模式狀態 @2024/05/03 Add

    public       API_Field: apiForFieldMgmt,        // @2024/03/14 Update for import API of Field Management

    public    fieldInfo_LocalFiles: localFieldInfo, // @2024/03/14 Add for import Field Info Local Files
    public       bsInfo_LocalFiles: localBSInfo,    // @2023/12/27 Add for import BS Info Local Files
    public       bsList_LocalFiles: localBSList,    // @2024/01/16 Add for import BS List Local Files local
    public    pmFtpInfo_LocalFiles: localPmFTPInfo, // @2024/02/04 Add for import info of PM Parameter Setting Local Files
    public    fieldSonParameters_LocalFiles: localFieldSonParameters,   // @2024/03/30 Add for import info of Field Son Parameters Local Files
    public  calculateSonResponse_LocalFiles: localCalculateSonResponse, // @2024/03/31 Add for import info of Calculate Son Response Local Files
  ) {

    this.severitys = this.commonService.severitys;  // 取得告警資訊種類名稱

    // 建立並初始化各功能所需表單
    this.createBSInfoForm();              // For updateBs API @2024/01/05 Add 
    this.createFieldInfoForm();           // For Field Info in Field Editing  @2024/01/17 Add
   // this.createFieldOptimizationForm(); // For Son Parameters in Field Optimization  @2024/03/30 Add

  }

  // 頁面初始化時執行的方法
  ngOnInit(){
    // 從 commonService 獲取會話 ID 並存儲在 sessionId 變數中
    this.sessionId = this.commonService.getSessionId();
    // 在控制台打印會話 ID，用於調試
    console.log( 'The sessionId is', this.sessionId );

    // 訂閱路由參數變化
    this.route.params.subscribe( params => {

      // 從路由參數中提取 fieldId 和 fieldName，並存儲
      this.fieldId = params['id'];
      this.fieldName = params['name'];

      // 打印 fieldId 和 fieldName 到控制台，用於調試
      console.log('fieldId: ' + this.fieldId + ', fieldName: ' + this.fieldName + ',\nsend from /main/field-mgr');

      // @2024/05/03 Add
      // 調用 updateViewMode 方法以刷新顯示模式
      this.updateViewMode();

      // 調用 getQueryFieldInfo 方法以獲取場域資訊
      this.getQueryFieldInfo();
    });

    // 此行被註釋掉，用於之後可能的表單優化功能
    //this.createFieldOptimizationForm();


    // @2024/05/31 Add
    // 訂閱語系切換事件，以便在語言變更時更新基站效能區的下拉選單文字
    this.languageService.languageChanged.subscribe(() => {
      this.updateLanguageOptions();       // 單純更新語系顯示
      //this.updateLanguageSubcategories(); // 單純更新子類別顯示
    });
  }

  /**
   * @2024/05/03 Add
   * 更新場域資訊頁面的顯示模式
   * @method updateViewMode
   * @returns {void}
   * @description
   * - 根據用戶從哪個頁面返回，調整場域資訊頁面的顯示模式（地圖模式或列表模式）
   * - 利用 navigationService 檢查上一個訪問的 URL 以確定用戶從何處返回
   * - 如果從基站資訊頁面返回，則保持當前的顯示模式不變
   * - 如果從其他頁面返回，則自動切換到地圖模式
   * - 更新顯示模式後，透過 fieldStateService 同步更新組件的顯示狀態
   */
  private updateViewMode() {

    // 調用 navigationService 獲取上一個訪問的 URL
    const previousUrl = this.navigationService.getPreviousUrl();
    
    // 檢查上一個 URL 是否包含特定基站資訊頁面的路徑
    if ( previousUrl.includes('/main/bs-mgr/info') ) {

      // 如果是從基站資訊頁面返回，保持當前的顯示模式不變
      this.fieldStateService.showMapModel = this.fieldStateService.showMapModel;

    } else {
      
      // 如果不是從基站資訊頁面返回，設置顯示模式為地圖模式
      this.fieldStateService.showMapModel = true;
    }
    
    // 從 fieldStateService 更新組件的 showMapModel 狀態，以反映最新的顯示模式
    this.showMapModel = this.fieldStateService.showMapModel;
  }


  // @2024/03/19 Update
  // ngAfterViewInit 是 Angular 在組件視圖初始化後會呼叫的生命週期事件。
  ngAfterViewInit() {
    
    // 檢查 this.map.googleMap 是否已經被定義。
    // this.map 是通過 ViewChild 獲取的 GoogleMap 實例，
    // 而 googleMap 是實際的 Google Maps JavaScript API 地圖對象。
    if ( this.map.googleMap ) {

      // 如果 googleMap 對象存在，則向它添加一個事件監聽器。
      // 'tilesloaded' 事件會在地圖上的所有可見瓦片都已加載完成後觸發。
      // 這是一個好時機來調整地圖的視角和縮放等級，因為它表明地圖已經準備好了。
      this.map.googleMap.addListener( 'tilesloaded', () => {

        // 當 'tilesloaded' 事件觸發時，調用 adjustMapZoom 方法。
        // 此方法將根據場域的邊界值調整地圖的縮放等級，
        // 確保用戶可以看到完整的場域範圍。
        this.adjustMapZoom();
        
      });
    }
    // 如果 this.map.googleMap 尚未定義，可能表示地圖尚未完全初始化。
    // 在這種情況下，可能需要考慮使用其他方法或檢查點以確保地圖已經準備好

    // @2024/03/19 Update
    // 監聽 <map-info-window> 窗口的 closeclick 事件
    if ( this.infoWindow ) {

      // 確保在 Angular 的 NgZone 內註冊事件監聽器
      this.ngZone.run(() => {

        this.infoWindow.closeclick.subscribe(() => {

          // 重置基站資訊摺疊面板展開狀態
          this.isPanelExpanded = false;

          // 重置地圖回一開始的中心縮放位置
          this.adjustMapZoom();

          // 重置被選中的 BS 
          this.selectedBsInfo = null;

          // 關閉顯示自製的 "BS 詳細資訊 " 視窗 ( Mouseover )
          //this.showBsInfoWindow = false;

          // 遍歷所有基站資訊，重置所有 BS 的顯示圖標狀態
          this.allSimplifiedBsInfo.forEach( bsInfo => {
            
            // 將每個基站都設為未點擊
            const isSelected = false;
            
            // 更新圖標 URL
            bsInfo.iconUrl = this.setIconUrl( bsInfo.bstype, bsInfo.status, isSelected, "", bsInfo.name );
          });

        });
      });
    }
    
    //this.getQueryPmFtpInfo();  // 此時先取得"效能管理參數設定"資訊 @2024/02/22 Add
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
    if ( this.queryFieldImage ) this.queryFieldImage.unsubscribe();
    if ( this.bsHeatMap ) this.bsHeatMap.unsubscribe();
    if ( this.queryFieldInfo ) this.queryFieldInfo.unsubscribe();
    if ( this.queryBsInfo ) this.queryBsInfo.unsubscribe();
    if ( this.updateBs ) this.updateBs.unsubscribe();
    if ( this.updateDistributedBs ) this.updateDistributedBs.unsubscribe();
    if ( this.queryBsList ) this.queryBsList.unsubscribe();
    if ( this.updateField ) this.updateField.unsubscribe();
    if ( this.uploadFieldImage ) this.uploadFieldImage.unsubscribe();
    if ( this.removeFieldImage ) this.removeFieldImage.unsubscribe();
    if ( this.queryPmFtpInfo ) this.queryPmFtpInfo.unsubscribe();
    if ( this.updatePmFtpInfo ) this.updatePmFtpInfo.unsubscribe();
    if ( this.querySonParameter ) this.querySonParameter.unsubscribe();
    if ( this.multiCalculateBs ) this.multiCalculateBs.unsubscribe();
    if ( this.multiOptimalBs ) this.multiOptimalBs.unsubscribe();
  }

// ↑ Page Init ↑


// ↓ For setting Google Maps @2024/01/10 by yuchen

  // 定義用於繪製多邊形的樣式選項
  polyOptions: google.maps.PolygonOptions = {
    strokeColor: '#0f91e7',   // 多邊形邊界的顏色
    strokeOpacity: 0.8,       // 多邊形邊界的透明度
    strokeWeight: 1.5,        // 多邊形邊界線的寬度
    fillColor: '#0f91e7',     // 多邊形填充的顏色
    fillOpacity: 0,           // 將多邊形填充的透明度設置為 0，使其透明
    clickable: false          // 確保多邊形不會捕捉點擊事件
  };

  // 用於存儲多邊形頂點的陣矩陣，初始時為空
  polyPath: google.maps.LatLngLiteral[] = [];

  // 初始化地圖中心的經緯度為(0, 0)，這可能會導致地圖在視圖上看不到任何內容( 目前都可以顯示 )
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };
  
  // 設置地圖的初始縮放級別
  //zoom = 16;

  // 定義地圖的其他配置選項，包括樣式，來隱藏預設的地標
  mapOptions: google.maps.MapOptions = {
    //center:{ lat: 0, lng: 0 }
    mapTypeId: 'roadmap',            // 設置地圖類型為道路地圖
    disableDefaultUI: true,          // 禁用地圖預設的用戶界面元件
    backgroundColor: '#126df5',      // 設置地圖的背景顏色
    clickableIcons: false,           // 設置地圖上的圖標是否可點擊
    disableDoubleClickZoom: true,    // 禁用雙擊縮放功能
    draggable: false,                 // 禁止用戶拖動地圖
    zoomControl: false,               // 禁止用戶通過控件來縮放地圖
    styles: [                        // 自定義樣式來隱藏地圖上的點擊性圖標
      {
        // "poi" 隱藏所有類型的搜尋點
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      }
    ]
  };

  // 自定義標記 Icon
  customIcon: google.maps.Icon = {
           url: '', // 圖標的相對路徑 URL
    scaledSize: new google.maps.Size( 30, 30 ), // 設定圖標的大小
        origin: new google.maps.Point( 0, 0 ),      // 圖標的起始點
        anchor: new google.maps.Point( 15, 15 ),    // 圖標錨點的位置
  };

  // @2024/01/02 Add
  // 使用 @ViewChild 裝飾器來獲取模板中 <google-map> 元素的實例。
  // '!' 非空斷言操作符告訴 TypeScript 編譯器該屬性將會在後續的代碼中被賦值，
  // 因此它在初始化時不會是 null。這避免了 TypeScript 的嚴格 null 檢查錯誤。
  @ViewChild( GoogleMap ) map!: GoogleMap; // 獲取 Google 地圖實例的引用

  // 用於儲存場域多邊形的邊界點 @2024/01/02 Add
  fieldBounds!: google.maps.LatLngBoundsLiteral;    // 用於儲存放置 GroundOverlay 的場域邊界資訊
  
  // @2024/03/18 Update
  // adjustMapZoom 方法用於根據場域邊界自動調整地圖的縮放等級和視角。
  adjustMapZoom() {

    // 在 <map-info-window> 已展開的情況下不進行調整
    if ( this.isPanelExpanded ) {
        return;
    }

    // 先檢查地圖實例和場域邊界是否都已經被正確設定。
    if ( this.map.googleMap && this.fieldBounds ) {
      // 如果都設定好了，就利用 Google Maps API 的 fitBounds 方法，
      // 傳入場域邊界值，讓 API 自動調整地圖的縮放等級和中心點，
      // 確保用戶視野範圍內可以看到完整的場域邊界。
      this.map.googleMap.fitBounds( this.fieldBounds );
    }
  }


  // 用於跟蹤 overlay 顯示狀態的變數
  overlayVisible: boolean = false;                         // 一個 boolean 變數，用於指示 GroundOverlay 是否應該顯示在地圖上
         overlay: google.maps.GroundOverlay | null = null; // 用於存儲 GroundOverlay 實例的變數，初始值為 null。這個變數將在需要顯示場域圖片時被賦值
  
  // 用於跟蹤當前 overlay 類型的屬性 @2024/01/03 Add
  currentOverlayType: OverlayType = OverlayType.None;

  // 在地圖上的場域區域中顯示傳入的圖片 @2024/01/03 Update - 加入依據點擊類型顯示
  displayImageOnMap( imageSrc: string, overlayType: OverlayType ) {

    if ( this.map.googleMap && this.overlayVisible ) {
      // 設置當前 overlay 類型
      this.currentOverlayType = overlayType;

      // 創建並顯示 overlay
      this.overlay = new google.maps.GroundOverlay( imageSrc, this.fieldBounds ); // 使用場域圖片和邊界創建一個 GroundOverlay 實例
      this.overlay.setMap( this.map.googleMap );   // 將創建的 GroundOverlay 添加到 Google 地圖實例上
      this.overlay.setOpacity( 0.5 );              // 設定 GroundOverlay 的透明度
      
      console.log( 'Display', this.currentOverlayType, 'Overlay:', this.overlay );
    }
  }

  // 隱藏(移除)在地圖上的場域區域中的圖片 @2024/01/03 Update
  removeOverlay() {

    // 檢查 overlay 物件是否已經被創建
    if ( this.overlay ) {
      this.overlay.setMap( null ); // 將 overlay 從 Google 地圖上移除
      this.overlay = null;         // 將 overlay 物件設置為 null，釋放資源並避免內存洩漏
      this.currentOverlayType = OverlayType.None;   // 重置當前 overlay 類型為 None

      console.log( 'Remove the Overlay:', this.overlay );
    }
  }


  // Field image 的 overlay 變數 @2024/01/10 Add
  fieldImageOverlay: google.maps.GroundOverlay | null = null;

  // Field image overlay 是否可見的標記 @2024/01/10 Add
  fieldImageOverlayVisible: boolean = false;

  // 顯示 Field image overlay 的函數 @2024/01/10 Add
  displayFieldImageOnMap( FieldImage_imageSrc: string, overlayType: OverlayType ) {
    
    if ( this.map.googleMap && this.fieldImageOverlayVisible ) {
      
      if ( overlayType !== OverlayType.None ) { // 如之前有先顯示過 rsrp or sinr 的 overlay
        // 確保 rsrp or sinr 的 overlay 都會壓在 Field image overlay 上層

        this.overlay!.setMap( null ); // 先將 rsrp or sinr overlay 從 Google Map 上移除
        this.overlay = null;          // 先將 rsrp or sinr overlay 物件設置為 null，釋放資源並避免內存洩漏

        // 再創建並顯示 fieldImageOverlay
        this.fieldImageOverlay = new google.maps.GroundOverlay( FieldImage_imageSrc, this.fieldBounds ); // 使用場域圖片和邊界創建一個 fieldImageOverlay 實例
        this.fieldImageOverlay.setMap( this.map.googleMap );   // 將創建的 fieldImageOverlay 添加到 Google 地圖實例上
        this.fieldImageOverlay.setOpacity( 0.5 );              // 設定 fieldImageOverlay 的透明度
        
        // 再重新取得並顯示 rsrp or sinr 的 overlay
        this.getSinrRsrpImage( overlayType );

      } else { // 如之前未先顯示過 rsrp or sinr 的 overlay

        // 就直接創建並顯示 fieldImageOverlay
        this.fieldImageOverlay = new google.maps.GroundOverlay( FieldImage_imageSrc, this.fieldBounds ); // 使用場域圖片和邊界創建一個 fieldImageOverlay 實例
        this.fieldImageOverlay.setMap( this.map.googleMap );   // 將創建的 fieldImageOverlay 添加到 Google 地圖實例上
        this.fieldImageOverlay.setOpacity( 0.5 );              // 設定 fieldImageOverlay 的透明度
      }
    }
  }

  // 移除 Field image overlay 的函數 @2024/01/10 Add
  removeFieldImageOverlay() {

    // 檢查 fieldImageOverlay 物件是否已經被創建
    if ( this.fieldImageOverlay ) {
      this.fieldImageOverlay.setMap( null ); // 將 fieldImageOverlay 從 Google 地圖上移除
      this.fieldImageOverlay = null;         // 將 fieldImageOverlay 物件設置為 null，釋放資源並避免內存洩漏
    }
  }

// ↑ For setting Google Maps @2024/01/10 Update by yuchen ↑


  // @12/13 Add for listen activeButton
  // 用於監聽當前哪個按鈕是激活的
  activeButton_fieldImage: string | null = null; // 儲存當前激活的場域圖片按鈕 ID
  //activeButton_NR: string | null = 'NR';       // 預設激活 'NR' 按鈕
  activeButton_NR: string | null = null;         // 預設不激活 'NR' 按鈕 @12/21 Add
  activeButton_rsrp_sinr: string | null = null;  // 儲存當前激活的 RSRP 或 SINR 圖示按鈕 ID
  activeButton_menu: string | null = null;       // 儲存當前激活的菜單按鈕 IDs


  // 當按鈕被點擊時，觸發更新激活按鈕"fieldImage"的狀態 @2024/01/10 Update
  setActiveButton_fieldImage( buttonId: string ) {
    console.log("The click button is:", buttonId)

     // 基於 fieldImage 按鈕的當前狀態決定顯示或隱藏 overlay
    if ( this.activeButton_fieldImage === null ) {
      this.activeButton_fieldImage = buttonId;
      this.fieldImageOverlayVisible = true;  // 設置為 true 以顯示 Field image 的 overlay
      this.getfieldImage();        
    } else {
      this.activeButton_fieldImage = null;
      this.removeFieldImageOverlay();        // 新的函數來處理 Field image 的 overlay 移除
      this.fieldImageOverlayVisible = false; // 設置為 false 以隱藏 overlay
    }
  }

  // @2024/01/10 Add for Progress Spinner
  isfieldImage_or_RsrpSinrMapLoading = false; // 用於識別加載場域圖片、RSRP、SINR 地圖狀態的標誌，初始設置為 false 

  // @2024/01/22 Add
  @ViewChild( 'promptWindow_noFieldImage' ) promptWindow_noFieldImage: any; // 使用 ViewChild 來獲取模板中的 promptWindow_noFieldImage 參考
  promptWindow_noFieldImage_Ref!: MatDialogRef<any>; // 儲存對話框的參考，以便在需要時可以操作對話框

  // 打開無場域圖片提示視窗 @2024/01/22 Add
  openNoFieldImagePromptWindow() {
    // 使用 MatDialog 服務的 open 方法打開視窗，並傳遞 promptWindow_noFieldImage 的 TemplateRef。
    // id: 'promptWindow_noFieldImage' 用於設定特定的 DOM ID，這樣可以在 CSS 中定制樣式或在測試中容易找到。
    this.promptWindow_noFieldImage_Ref = this.dialog.open( this.promptWindow_noFieldImage,
                                                           { id: 'promptWindow_noFieldImage' } );
    // 將 activeButton_fieldImage 設置為 null，表示目前沒有場域圖片按鈕被激活。
    this.activeButton_fieldImage = null;
    // 調用 removeFieldImageOverlay() 函數來移除場域圖片的覆蓋層。
    this.removeFieldImageOverlay();        
    // 將 fieldImageOverlayVisible 設置為 false，這樣場域圖片的覆蓋層將不會被顯示。
    this.fieldImageOverlayVisible = false; 
  }

  queryFieldImage!: Subscription;

  // 獲取並顯示場域圖片 
  // @2024/01/24 Update
  getfieldImage(){
    // 點擊 Field Image 部分的處理

      // 點擊 Field Image 時，開始顯示 Spinner 表載入圖片中
      this.isfieldImage_or_RsrpSinrMapLoading = true;
      this.showLoadingSpinner();   // 顯示 Loading Spinner

      if ( this.activeButton_fieldImage ) {
        // 檢查 Field Image 按鈕是否有被激活。
        // 如果此變數不為 null，則表示用戶已點擊了 Field Image 按鈕，
        // 並且期望根據當前的激活狀態來顯示或隱藏場域圖片。
  
        if ( this.commonService.isLocal ) { // 檢查是否為使用 local files
      
          if ( this.removeImageInLocal_flag ) { // 檢查 local 下是否有刪除過圖片

            // 有就顯示未有圖片提示視窗
            this.openNoFieldImagePromptWindow();

            // 重置記錄 Local 環境下圖片的刪除狀態
            //this.removeImageInLocal_flag = false;

          } else {

            // 設定場域圖片的 Local 路徑
            const imageSrc_localPath = './assets/img/fieldImage_for_local.png'; // 定義本地場域圖片的路徑
              
            // 檢查 Local 場域圖片路徑是否存在
            if ( imageSrc_localPath ) {
              this.displayFieldImageOnMap( imageSrc_localPath, this.currentOverlayType );  // 如存在，則在地圖上顯示場域 local 圖片
            }

          }
          
          this.isfieldImage_or_RsrpSinrMapLoading = false; // Local 圖片載入完成，隱藏 Spinner
          this.hideSpinner();  // 完成後隱藏 spinner

        } else { // 如非使用 local files
  
          // 跟後端 API 取得場域圖片
          this.queryFieldImage = this.API_Field.queryFieldImage( this.fieldId ).subscribe({
              next: ( response ) => {
                // 當接收到圖片數據時，處理 Base64 編碼的圖片
                if ( response && response.fieldImage ) {
                  const imageSrc = 'data:image/png;base64,' + response.fieldImage;   // 將 Base64 字符串轉換為圖片 URL
                  this.displayFieldImageOnMap( imageSrc, this.currentOverlayType );  // 在地圖上顯示場域圖片
                }
                this.hideSpinner();  // 完成後隱藏 spinner
              },
              // 當圖片獲取失敗時，顯示其錯誤訊息
              error: ( error ) => {
                console.error( 'Error fetching field image:', error );
                this.isfieldImage_or_RsrpSinrMapLoading = false;  // 出錯時，也隱藏 Spinner
                this.openNoFieldImagePromptWindow();              // 未有場域圖片時顯示提示視窗
                this.hideSpinner();  // 完成後隱藏 spinner
              },
              // 當圖片獲取過程完成時，顯示完成訊息
              complete: () => {
                console.log( 'Field image fetch completed' );
                this.isfieldImage_or_RsrpSinrMapLoading = false; // 加載完成，隱藏 Spinner
                this.hideSpinner();  // 完成後隱藏 spinner
              }
          });
        }
      }
  }

  // 用於跟蹤鄰居 BS 線條的顯示狀態 @2024/01/04 Add 
  showNeighborLines: boolean = false;

  // Polyline 數組，用於保存基站之間的線條 @2024/01/04 Add 
  nrLines: google.maps.Polyline[] = [];

  /** @2024/01/04 Add
   * 當按鈕被點擊時調用的函數，用於切換基站之間連線的顯示狀態
   * @param { string } buttonId - 被點擊的按鈕ID
   */
  setActiveButton_NR( buttonId: string ) {
    // 如果當前按鈕 ID 和傳入的 ID 相同，則取消選中，否則設置為選中
    this.activeButton_NR = this.activeButton_NR === buttonId ? null : buttonId;
    
    // 切換顯示或隱藏與鄰居 BS 的連線
    this.showNeighborLines = !this.showNeighborLines;
    this.toggleNeighborLines( this.showNeighborLines );
  }

  /** @2024/01/04 Add
   * 用於繪製或移除 BS 之間的線條
   * @param { boolean } show - 指示是否顯示線條
   */
  toggleNeighborLines( show: boolean ) {
    if ( show ) {
      // 繪製線條
      this.allSimplifiedBsInfo.forEach( bs => {
        if ( bs.neighbors ) {
          bs.neighbors.forEach( neighbor => {
            const neighborBs = this.allSimplifiedBsInfo.find( nbs => nbs.nci === neighbor.nci );
            if ( neighborBs ) {

              // 使用 parsePosition 函數來轉換位置字串為 LatLngLiteral 對象
              const bsPosition = this.parsePosition( bs.position );
              const neighborBsPosition = this.parsePosition( neighborBs.position );

              // 創建路徑矩陣
              const linePath = [ bsPosition, neighborBsPosition ];

              // 創建 Polyline
              const polyline = new google.maps.Polyline({
                path: linePath,           // 設定 Polyline 的路徑點，將連接起來形成一條線
                geodesic: true,           // 設定是否依據地球曲率顯示弧線
                strokeColor: '#00ffff',   // 設定線的顏色
                strokeOpacity: 0.4,       // 設定線的透明度
                strokeWeight: 3           // 設定線的寬度(px)
              });

              // 將 Polyline 添加到地圖上
              this.addPolylineToMap( polyline );

              // 將 Polyline 添加到 nrLines 陣列中以便日後移除
              this.nrLines.push( polyline );
            }
          });
        }
      });
    } else {
      // 移除線條
      this.nrLines.forEach( polyline => {
        this.removePolylineFromMap( polyline );
      });
      // 清空儲存線條的矩陣
      this.nrLines = [];
    }
  }

  /** @2024/01/04 Add
   * 將 Polyline 添加到地圖上的方法
   * @param { google.maps.Polyline } polyline - 要添加到地圖上的 Polyline 對象
   */
  addPolylineToMap( polyline: google.maps.Polyline ) {
    // 確認地圖已經載入，然後將 Polyline 設置到地圖上
    if ( this.map.googleMap ) {
      polyline.setMap( this.map.googleMap );
    }
  }

  /** @2024/01/04 Add
   * 從地圖上移除 Polyline 的方法
   * @param { google.maps.Polyline } polyline - 要從地圖上移除的 Polyline 對象
   */
  removePolylineFromMap( polyline: google.maps.Polyline ) {
    // 將 Polyline 的地圖屬性設置為 null，從而將其從地圖上移除
    polyline.setMap( null );
  }

  setActiveButton_menu( buttonId: string ) {
    this.activeButton_menu = this.activeButton_menu === buttonId ? null : buttonId;
  }


  // @12/08 Add for toggle colobar
  currentColorbar: 'RSRP' | 'SINR' | null = null; // 開始時不顯示任何 colorbar

  // @2024/01/03 Update
  toggleColorbar( type: 'RSRP' | 'SINR' ) {
    console.log( "The click button is:", type );

    // 切換 Colorbar 狀態
    if ( this.currentColorbar === null ) {
      this.currentColorbar = type;
      this.setActiveButton_rsrp_sinr( type );
    } else {
      if ( type === this.currentColorbar ) {
        this.currentColorbar = null;
        this.activeButton_rsrp_sinr = null; // 再次點擊為同顆按鈕時將該 Flag 也初始化 
        this.removeOverlay();               // 移除當前顯示的 overlay
        this.overlayVisible = false;        // 設定 overlay 不可見
      } else {
        this.currentColorbar = type;
        this.setActiveButton_rsrp_sinr( type );
      }
    }
  }

  // @2024/01/03 Update
  setActiveButton_rsrp_sinr( buttonId: string ) {
    console.log( "The click button is:", buttonId );
    
    // 切換 RSRP/SINR 圖示按鈕狀態
    if ( this.activeButton_rsrp_sinr === null ) {

      this.activeButton_rsrp_sinr = buttonId;
      const overlayType = ( this.activeButton_rsrp_sinr === 'SINR' ) ? OverlayType.SINR : OverlayType.RSRP;
      this.overlayVisible = true; // 設定 overlay 為可見
      this.getSinrRsrpImage( overlayType );

    } else {
      
      this.removeOverlay(); // 移除當前顯示的 overlay
      this.activeButton_rsrp_sinr = buttonId;
      const overlayType = ( this.activeButton_rsrp_sinr === 'SINR' ) ? OverlayType.SINR : OverlayType.RSRP;
      this.overlayVisible = true; // 設定 overlay 為可見
      this.getSinrRsrpImage( overlayType );

    }
  }

  bsHeatMap!: Subscription;

  // @2024/01/10 Update
  getSinrRsrpImage( overlayType: OverlayType ) {
    
    this.isfieldImage_or_RsrpSinrMapLoading = true; // 點擊 RSRP Map 或 SINR Map 時，開始顯示 Spinner 表載入圖片中
    this.showProcessingSpinner();   // 顯示 Loading Spinner
    
    // 根據 overlayType 決定 mapType
    const mapType = ( overlayType === OverlayType.SINR ) ? 0 : 1;

    if ( this.activeButton_rsrp_sinr ) {
      if ( this.commonService.isLocal ) {
        let imageSrc_localPath = '';

        // 設定本地 SINR 或 RSRP 圖片的路徑
        if ( overlayType === OverlayType.SINR ) {
          imageSrc_localPath = './assets/img/sinrMap_local.png'; // 定義本地 SINR 圖片路徑
          console.log( "The local path of image is:", imageSrc_localPath );
        } else {
          imageSrc_localPath = './assets/img/rsrpMap_local.png'; // 定義本地 RSRP 圖片路徑
          console.log( "The local path of image is:", imageSrc_localPath );
        }

        // 如果本地路徑存在，則在地圖上顯示本地圖片
        if ( imageSrc_localPath ) {
          this.displayImageOnMap( imageSrc_localPath, overlayType );
        }
        this.isfieldImage_or_RsrpSinrMapLoading = false; // Local 圖片載入完成，隱藏 Spinner
        this.hideSpinner();  // 完成後隱藏 spinner
      } else {

        // 從 fieldBounds 提取經緯度
        const leftLongitude = this.fieldBounds.west;  // 西邊界經度
        const leftLatitude = this.fieldBounds.north;  // 北邊界緯度
        const rightLongitude = this.fieldBounds.east; // 東邊界經度
        const rightLatitude = this.fieldBounds.south; // 南邊界緯度

        // 調用後端 API 獲取 SINR 或 RSRP 圖片
        this.bsHeatMap = this.API_Field.bsHeatMap( this.fieldId, leftLongitude, leftLatitude,
                                       rightLongitude, rightLatitude, mapType ).subscribe({
          next: ( response ) => {
            const imageSrc = 'data:image/png;base64,' + response.heatMap; // 從後端回應中獲取圖片
            this.displayImageOnMap( imageSrc, overlayType );

            this.hideSpinner();  // 完成後隱藏 spinner
          },
          error: ( error ) => {
            console.error( "Error fetching SINR/RSRP image:", error );
            this.isfieldImage_or_RsrpSinrMapLoading = false; // 出錯時，也隱藏 Spinner
            this.hideSpinner();  // 完成後隱藏 spinner
          },
          complete: () => {
            console.log( "SINR/RSRP image fetch completed" );
            this.isfieldImage_or_RsrpSinrMapLoading = false; // 加載完成，隱藏 Spinner
            this.hideSpinner();  // 完成後隱藏 spinner
          }
        });
      }
    }
  }

  showMapModel: boolean = true;                   // 控制是否顯示地圖模式的 Flag   @12/13 Add
  recordColorbar: 'RSRP' | 'SINR' | null = null;  // 用於記錄 Colorbar 狀態的 Flag @12/13 Add
  recordShowNeighborLines: boolean = false; 

  // @2024/01/22 Update
  // 用於切換顯示地圖模式或基站列表 
  toggleMenuButton() {

    this.showMapModel = !this.showMapModel; // 切換顯示的頁面並更新該 Flag 狀態
    //console.log("toggle showMapModel:", this.showMapModel);

    // 記錄切換頁面當下的 ColorBar 狀態 ( 沒值時才記錄 )
    if ( !this.recordColorbar ){
      this.recordColorbar = this.currentColorbar;
    }

    if ( this.showNeighborLines ){
      this.recordShowNeighborLines = this.showNeighborLines;
      console.log( '是否有顯示 NR :', this.recordShowNeighborLines )
    }

    // 如切換的頁面為地圖模式，就預設激活 'NR' 按鈕
    // if ( this.showMapModel === true ) {
    //   this.activeButton_NR = 'NR';
    // }

    // 如果切換的頁面為地圖模式
    if ( this.showMapModel === true ) {

        console.log("this.fieldBounds:", this.fieldBounds);

        // 重新調整地圖縮放 (zoom) 大小 @2024/01/22 Update
        setTimeout(() => {

          // 呼叫 adjustMapZoom 方法來根據場域的邊界調整地圖的縮放等級。
          this.adjustMapZoom();

          // 如切換地圖模式前有顯示 NR 就恢復顯示 @2024/01/22 Add
          if ( this.activeButton_NR ) {
            this.toggleNeighborLines( this.recordShowNeighborLines );
            //this.cdr.detectChanges(); // 手動觸發變更檢測
          }

          // 如切換地圖模式前有顯示"場域圖片"就恢復顯示 @2024/01/22 Add
          if ( this.activeButton_fieldImage ){
            this.getfieldImage();
          } 

          // 如切換地圖模式前有顯示 RSRP 或 SINR 分佈圖就恢復顯示
          if ( this.recordColorbar ) {
            // 如記錄的 Colorbar 不為空，則恢復顯示記錄的 Colorbar

            this.currentColorbar = this.recordColorbar;
            //console.log("recordColorbar:", this.recordColorbar);

            // 同步顯示回 SINR 或 RSRP 分佈圖 @2024/01/15 
            const overlayType = ( this.currentColorbar === 'SINR' ) ? OverlayType.SINR : OverlayType.RSRP;
            this.removeOverlay();       // 移除當前顯示的 overlay
            this.overlayVisible = true; // 設定 overlay 為可見
            this.getSinrRsrpImage( overlayType );
            
            this.cdr.detectChanges();   // 手動觸發變更檢測
            this.recordColorbar = null; // 初始化記錄 Colorbar 狀態的 Flag
          } 

        }, 100); // 設定 100 ms 的延遲，以確保地圖的初始化過程已經完成。   
        
    } else { // 如切換的頁面不為地圖模式，就將此 flag 設為空並隱藏 ColorBar
          this.currentColorbar = null;
          //console.log("recordColorbar:", this.recordColorbar);
          this.cdr.detectChanges(); // 手動觸發變更檢測
    }
  }

  /**
   * 計算多邊形中心點的函數。
   * 這個函數接受一個 google.maps.LatLngLiteral 物件的陣列，這些物件代表多邊形的頂點。
   * @param points 一個包含多邊形每個頂點經緯度的陣列。
   * @returns 返回一個包含多邊形幾何中心經緯度的物件。
   */
  // calculateCenter(points: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {

  //   // 初始化緯度和經度的總和
  //   let lat = 0;
  //   let lng = 0;

  //   // 迭代多邊形的每個頂點
  //   points.forEach(point => {

  //     // 累加所有頂點的緯度和經度
  //     lat += point.lat;
  //     lng += point.lng;
  //   });

  //   // 返回多邊形所有頂點緯度和經度的平均值作為多邊形的中心點
  //   // 這是通過將總和除以點的數量來計算的
  //   return {
  //     lat: lat / points.length,  // 計算緯度的平均值
  //     lng: lng / points.length   // 計算經度的平均值
  //   };
  // }

  // @12/27 Add
  calculateBoundingBoxCenter( points: google.maps.LatLngLiteral[] ): google.maps.LatLngLiteral {

    // 初始化最小和最大緯度、經度值，初始值設定為陣列中的第一個點的緯度和經度
    let minLat = points[0].lat;
    let maxLat = points[0].lat;
    let minLng = points[0].lng;
    let maxLng = points[0].lng;
  
    // 遍歷 points 矩陣中的每一個 google.maps.LatLngLiteral 物件
    points.forEach( point => {
      // 如果當前點的緯度小於已知的最小緯度，更新 minLat 的值
      if ( point.lat < minLat ) minLat = point.lat;
      // 如果當前點的緯度大於已知的最大緯度，更新 maxLat 的值
      if ( point.lat > maxLat ) maxLat = point.lat;
      // 如果當前點的經度小於已知的最小經度，更新 minLng 的值
      if ( point.lng < minLng ) minLng = point.lng;
      // 如果當前點的經度大於已知的最大經度，更新 maxLng 的值
      if ( point.lng > maxLng ) maxLng = point.lng;
    });
  
    // 計算緯度和經度的平均值，得出邊界框的中心點經緯度，並返回這個中心點
    return {
      lat: ( minLat + maxLat ) / 2,
      lng: ( minLng + maxLng ) / 2
    };
  }
  
  queryFieldInfo!: Subscription;
  isMarkersLoading = true; // 加載狀態的標誌，初始設置為 true @12/28 Add for Progress Spinner

  // @2024/01/02 Add - 儲存場域邊界點
  // @2024/01/04 Update - Add calculateBestZoom()
  getQueryFieldInfo() {
    console.log( 'getQueryFieldInfo() - Start' ); // 啟動獲取場域資訊

    console.log( 'Start fetching field info' );   // 開始獲取場域資訊
    clearTimeout( this.refreshTimeout );

    this.isMarkersLoading = true;
    this.showLoadingSpinner();   // 顯示 Loading Spinner
    
    if ( this.commonService.isLocal ) { // 檢查是否為使用 local files

      // For testing with local files
      console.log( 'Start fetching field info in Local' );   // 開始獲取 local 場域資訊
      this.fieldInfo = this.fieldInfo_LocalFiles.fieldInfo_local;
      console.log( 'Local field info in Local:', this.fieldInfo );

      this.updateResourceUtilization();

      // 儲存場域位置 @12/27 Add
      // 該處建立了一個包含場域四個角落位置的矩陣，
      // 並且將場域的第一個位置再次添加到矩陣的末尾，以確保多邊形是閉合的。
      const positions = [
        this.parsePosition( this.fieldInfo.fieldposition1 ),
        this.parsePosition( this.fieldInfo.fieldposition2 ),
        this.parsePosition( this.fieldInfo.fieldposition3 ),
        this.parsePosition( this.fieldInfo.fieldposition4 ),
        this.parsePosition( this.fieldInfo.fieldposition1 )  // 該位置用於閉合多邊形框線
      ];
      console.log( 'Local field position:', positions );

      this.polyPath = positions;

      // 儲存或更新場域邊界點 @2024/01/02 Add
      this.fieldBounds = {

        // `north` 表示多邊形北邊的緯度，通過取所有頂點緯度的最大值來確定
        north: Math.max( ...positions.map( p => p.lat ) ),
        
        // `south` 表示多邊形南邊的緯度，通過取所有頂點緯度的最小值來確定
        south: Math.min( ...positions.map( p => p.lat ) ),
        
        // `east` 表示多邊形東邊的經度，通過取所有頂點經度的最大值來確定
        east: Math.max( ...positions.map( p => p.lng ) ),
        
        // `west` 表示多邊形西邊的經度，通過取所有頂點經度的最小值來確定
        west: Math.min( ...positions.map( p => p.lng ) ),
      };

      // 計算場域中心用來設定地圖的初始視圖中心
      this.center = this.calculateBoundingBoxCenter( positions );

      setTimeout( () => {
        // 呼叫 adjustMapZoom 方法來根據場域的邊界調整地圖的縮放等級。
        this.adjustMapZoom();
      }, 10 ); // 設定 1000 ms 的延遲，以確保地圖的初始化過程已經完成。

      // @2024/01/17 Add 
      // Set the get value to fieldEditForm for Field Editing  
      this.fieldEditForm.patchValue({
        fieldName:        this.fieldInfo.name,
        fieldBound_North: this.fieldBounds.north,
        fieldBound_South: this.fieldBounds.south,
        fieldBound_West:  this.fieldBounds.west,
        fieldBound_East:  this.fieldBounds.east,
        phoneNumber:      this.fieldInfo.phone
      });

      this.processFieldInfo(); // 處理場域資訊
      
      this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {
      
      console.log( 'Start fetching field info feom API' );   // 開始獲取場域資訊

      // Use API_Field's queryFieldInfo() to make an HTTP GET request
      this.API_Field.queryFieldInfo( this.fieldId ).subscribe({
        next: ( res ) => {

          // 當 API 響應數據到達時，執行此回調
          // This callback is executed when API response data arrives
          console.log( '從 API 獲取 queryFieldInfo\n( Fetched queryFieldInfo from API ): ', res, 
                        '\nfieldId: ' + res.id + ', fieldName: ' + res.name );
          console.log( '從 API 獲取 fieldId.bsinfo\n( Fetched fieldId.bsinfo from API ):', res.bsinfo );
          this.fieldInfo = res;
          console.log( '場域資訊\n( Field info ):', this.fieldInfo ); // 取得的場域資訊 ( Obtained field information ):

          this.updateResourceUtilization();

          // 儲存場域位置 @12/20 Add
          // 該處建立了一個包含場域四個角落位置的矩陣，
          // 並且將場域的第一個位置再次添加到矩陣的末尾，以確保多邊形是閉合的。
          const positions = [
            this.parsePosition( this.fieldInfo.fieldposition1 ),
            this.parsePosition( this.fieldInfo.fieldposition2 ),
            this.parsePosition( this.fieldInfo.fieldposition3 ),
            this.parsePosition( this.fieldInfo.fieldposition4 ),
            this.parsePosition( this.fieldInfo.fieldposition1 )  // 該位置用於閉合多邊形框線
          ];

          // 更新 polyPath 和中心點 @12/20 Add
          // polyPath 用來儲存多邊形各個頂點的經緯度，這個數據將被用於在地圖上繪製多邊形。
          this.polyPath = positions;

          // 儲存或更新場域邊界點 @2024/01/02 Add
          this.fieldBounds = {
            // `north` 表示多邊形北邊的緯度，通過取所有頂點緯度的最大值來確定
            north: Math.max( ...positions.map( p => p.lat ) ),
            
            // `south` 表示多邊形南邊的緯度，通過取所有頂點緯度的最小值來確定
            south: Math.min( ...positions.map( p => p.lat ) ),
            
            // `east` 表示多邊形東邊的經度，通過取所有頂點經度的最大值來確定
            east: Math.max( ...positions.map( p => p.lng ) ),
            
            // `west` 表示多邊形西邊的經度，通過取所有頂點經度的最小值來確定
            west: Math.min( ...positions.map( p => p.lng ) ),
          };
          
          // 這個計算出的中心點將被用來設定地圖的初始視圖中心。
          //this.center = this.calculateCenter(positions); // 用於計算多邊形頂點的平均中心點
          this.center = this.calculateBoundingBoxCenter( positions ); 
          // 輸出中心點到控制台，這樣可以用於調試和確認中心點是否如預期被正確計算。
          console.log( 'In getQueryFieldInfo() - center:', this.center );

          // @2024/01/17 Add 
          // Set the get value to fieldEditForm for Field Editing  
          this.fieldEditForm.patchValue({
            fieldName:        this.fieldInfo.name,
            fieldBound_North: this.fieldBounds.north,
            fieldBound_South: this.fieldBounds.south,
            fieldBound_West:  this.fieldBounds.west,
            fieldBound_East:  this.fieldBounds.east,
            phoneNumber:      this.fieldInfo.phone
          });

          // 確保場域資訊已經被賦值後再進行後續處理
          // Ensure field info is assigned before proceeding
          this.processFieldInfo(); // 進行後續處理

          //this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {

          // 獲取資訊出錯時執行此回調
          // This callback is executed when there is an error fetching the info
          console.error( '獲取場域資訊出錯:', error );
          console.error( 'Error fetching field info:', error );
          this.isMarkersLoading = false; // 出錯時也應隱藏 spinner @12/28 Add for Progress Spinner
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        complete: () => {

          // 請求完成時執行此回調
          // This callback is executed when the request is complete
          console.log( '場域資訊獲取完成' );
          console.log( 'Field info fetch completed' );
          //this.isMarkersLoading = false; // 加載完成 @12/28 Add for Progress Spinner
          
          window.setTimeout(() => {

            this.hideSpinner();  // 完成後隱藏 spinner

          }, 2800 ); // 設定 10000 ms ( s ) 後執行
        }
      });
    }
  }
  
  // @2024/03/19 Update - 關閉預設顯示第一筆 BS 資訊為預設點擊 icon 
  // 處理場域資訊並調用 getQueryBsInfoForAll
  // Process field info and call getQueryBsInfoForAll
  processFieldInfo() {

    // 輸出開始處理的訊息到控制台
    console.log('processFieldInfo() - Start');

    if ( this.commonService.isLocal ) {
    
      console.log('Start fetching BS info in Local');   // 開始獲取 Local BS 資訊

      console.log( 'Local BS info in Local:', this.bsInfo_LocalFiles.bsInfo_local );
      console.log( 'Local Dist_BS info in Local:', this.bsInfo_LocalFiles.dist_bsInfo_local );

      // 初始化一個新數組用於存放所有轉換後的 SimplifiedBSInfo 對象
      const allSimplifiedData: SimplifiedBSInfo[] = [];

      // 遍歷 dist_bsInfo_local 數組並處理每一筆數據
      this.bsInfo_LocalFiles.dist_bsInfo_local.forEach( ( distBsInfo: BSInfo_dist ) => {
        allSimplifiedData.push( ...this.convertDistBsInfoToSimplifiedFormat( distBsInfo ));
      });

      // 遍歷 bsInfo_local 數組並處理每一筆數據
      this.bsInfo_LocalFiles.bsInfo_local.forEach( ( bsInfo: BSInfo ) => {
        allSimplifiedData.push( this.convertBsInfoToSimplifiedFormat( bsInfo )) ;
      });
      
      // 將合併後的所有 SimplifiedBSInfo 對象賦值給 this.allSimplifiedBsInfo 屬性
      this.allSimplifiedBsInfo = allSimplifiedData;

      // 檢查 allSimplifiedBsInfo 數組是否包含任何基站資訊
      if ( this.allSimplifiedBsInfo.length > 0 ) {

        // 有就遍歷 allSimplifiedBsInfo 並為每個基站設置圖標 URL
        this.allSimplifiedBsInfo.forEach((bsInfo, index) => {
          // 獲取 allSimplifiedBsInfo 數組中第一筆資料的名稱
          // const firstBsInfoName = this.allSimplifiedBsInfo[0].name;
          const firstBsInfoName = "";

          // 判斷當前處理的基站是否為數組中的第一個元素（即索引為 0 的元素）
          // 如果是第一個元素（index === 0），則 isSelected 為 true，否則為 false
          // isSelected 用於確定當前基站是否應該顯示為「被選中」狀態的圖標
          // const isSelected = (index === 0);
          const isSelected = false;

          // 為當前基站設置圖標 URL，根據基站的類型、狀態、是否被選中以及是否是數組中的第一個基站
          bsInfo.iconUrl = this.setIconUrl( bsInfo.bstype, bsInfo.status, isSelected, firstBsInfoName, bsInfo.name );
        });

        // 將 allSimplifiedBsInfo 數組中的第一筆基站資訊顯示於「基站資訊」欄位上
        this.displayBsInfo = this.allSimplifiedBsInfo[0];

        // 當 displayBsInfo 更新後，更新表單 @2024/01/17 Add
        //this.updateModifyConfigForm( this.displayBsInfo );
      }

      this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      //this.hideSpinner();  // 完成後隱藏 spinner
    } else {

      // 確認 fieldInfo 和 fieldInfo.bsinfo 是否已經被定義
      // Ensure fieldInfo and fieldInfo.bsinfo are defined
      if (this.fieldInfo && this.fieldInfo.bsinfo) {

        // 確認場域資訊記錄的"基站數量"是否與"bsinfo"內的資料筆數相等
        if ( this.fieldInfo.bsNum === this.fieldInfo.bsinfo.length ) {

          // 取得該場域所有基站之詳細資訊
          this.getQueryBsInfoForAll( this.fieldInfo.bsNum, this.fieldInfo.bsinfo );
        }
      }
      //this.hideSpinner();  // 完成後隱藏 spinner
      
    }

    // 輸出轉換後的所有基站資訊
    console.log( '經過簡化轉換後場域內的所有基站資訊有\n( allSimplifiedBsInfo ) :', this.allSimplifiedBsInfo );
    
    // 輸出函數結束的訊息到控制台
    console.log( 'processFieldInfo() - End' );
    //this.hideSpinner();  // 完成後隱藏 spinner
  }
  
  // @12/26 Add
  // 用於存儲轉換後的所有基站資訊，每個元素代表一個基站的簡化資訊
  allSimplifiedBsInfo: SimplifiedBSInfo[] = [];
  
  // @12/26 Add
  // 用於存儲當前選中的基站簡化資訊，以便在前端的「基站資訊」欄位中顯示
  displayBsInfo: SimplifiedBSInfo | null = null;

  queryBsInfo!: Subscription;

  // 用於獲取場地內所有 BS 的資訊 @2024/03/19 Update - 關閉預設顯示第一筆 BS 資訊為預設點擊 icon 
  // Get the All infos of BSs in the field 
  getQueryBsInfoForAll( bsNum: number, bsinfo_Infield: BsInfoInField[] ) {

    // 輸出開始處理的訊息到控制台
    console.log('getQueryBsInfoForAll() - Start');
    
    // 輸出場地內基站的總數
    console.log('There are', bsNum, 'BSs in the', this.fieldInfo.name, 'field');
    
    // 將場地內基站的資訊映射為一個 Observable 數組，用於異步請求每個基站的詳細資訊
    const observables: Observable< BSInfo | BSInfo_dist >[] = bsinfo_Infield.map( ( originalBsInfoInfield ) => {
      // 發起異步請求以獲取每個基站的詳細資訊
      return this.API_Field.queryBsInfo( originalBsInfoInfield.id ).pipe(
        map( ( response: BSInfo | BSInfo_dist ) => {

          // 根據是否包含特定屬性來判斷返回的資訊類型
          if ( 'cellInfo' in originalBsInfoInfield ) {

            // 如果原始資訊中包含 cellInfo 屬性，則視為 BSInfo_dist 類型
            return response as BSInfo_dist;
          } else {

            // 否則，視為 BSInfo 類型
            return response as BSInfo;
          }
        })
      );
    });

    // 使用 forkJoin 等待所有 Observable 完成，然後處理它們的結果
    this.queryBsInfo = forkJoin( observables ).subscribe({
      next: ( results: ( BSInfo | BSInfo_dist )[] ) => {

        console.log( "取得的基站資訊:", results );

        // 初始化一個新數組用於存放所有轉換後的 SimplifiedBSInfo 對象
        const allSimplifiedData: SimplifiedBSInfo[] = [];

        // 遍歷每個異步請求的結果
        results.forEach( result => {

          if ( result.bstype === 2 ) {

            // 如果結果為 BSInfo_dist 類型，則處理每個子基站資訊
            // 使用展開運算符...將每個子基站轉換函數返回的數組元素加入到 allSimplifiedData 數組中
            allSimplifiedData.push( ...this.convertDistBsInfoToSimplifiedFormat( result as BSInfo_dist ) );
          } else {

            // 如果結果為 BSInfo 類型，則直接將轉換後的對象加入到 allSimplifiedData 數組
            allSimplifiedData.push( this.convertBsInfoToSimplifiedFormat( result as BSInfo ) );
          }

        });

        // 將合併後的所有 SimplifiedBSInfo 對象賦值給 this.allSimplifiedBsInfo 屬性
        this.allSimplifiedBsInfo = allSimplifiedData;

        // 檢查 allSimplifiedBsInfo 數組是否包含任何基站資訊
        if ( this.allSimplifiedBsInfo.length > 0 ) {

          // 有就遍歷 allSimplifiedBsInfo 並為每個基站設置圖標 URL
          this.allSimplifiedBsInfo.forEach( ( bsInfo, index ) => {
            // 獲取 allSimplifiedBsInfo 數組中第一筆資料的名稱
            // const firstBsInfoName = this.allSimplifiedBsInfo[0].name;
            const firstBsInfoName = "";

            // 判斷當前處理的基站是否為數組中的第一個元素（即索引為 0 的元素）
            // 如果是第一個元素（index === 0），則 isSelected 為 true，否則為 false
            // isSelected 用於確定當前基站是否應該顯示為「被選中」狀態的圖標
            // const isSelected = (index === 0);
            const isSelected = false;

            // 為當前基站設置圖標 URL，根據基站的類型、狀態、是否被選中以及是否是數組中的第一個基站
            bsInfo.iconUrl = this.setIconUrl( bsInfo.bstype, bsInfo.status, isSelected, firstBsInfoName, bsInfo.name);
          });

          // 將 allSimplifiedBsInfo 數組中的第一筆基站資訊預設顯示於「基站資訊」欄位上
          this.displayBsInfo = this.allSimplifiedBsInfo[0];

          // 當 displayBsInfo 更新後，更新表單 @2024/01/17 Add
          //this.updateModifyConfigForm( this.displayBsInfo );
        }

        this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      },
      error: ( error ) => {

        // 如果在請求過程中出現錯誤，則在控制台輸出錯誤訊息
        console.error('Error fetching BS Infos:', error);
        this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      },
      complete: () => {

        // 當所有請求都完成後，輸出一個完成訊息
        console.log('All BS Info fetches completed');
        console.log("In getQueryBsInfoForAll() - allSimplifiedBsInfo", this.allSimplifiedBsInfo );

        this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
        //this.hideSpinner();  // 完成後隱藏 spinner
      }
    });

    // 輸出函數結束的訊息到控制台
    console.log('getQueryBsInfoForAll() - End');
  }


  /**
   * @2024/04/10 Update
   * 將 BSInfo 類型轉換為 SimplifiedBSInfo 類型 - All-in-one BS
   * @function convertBsInfoToSimplifiedFormat
   * @param {BSInfo} bsInfo - 待轉換的一體式基站資訊對象
   * @returns {SimplifiedBSInfo} 轉換後的簡化基站資訊對象
   * @description
   * - 使用可選鏈操作符和映射從 bsInfo.anr 中提取鄰居訊息，並建立 SimplifiedNeighborInfo 陣列
   * - 創建一個 SimplifiedBSInfo 類型的對象，並使用 bsInfo 中的數據填充此對象
   * - 確保當 bsInfo.anr 為 undefined 時，neighbors 默認為空陣列，避免錯誤
   * - 此函數對於一體式基站資訊進行轉換，方便後續的資料處理和顯示
   */
  convertBsInfoToSimplifiedFormat( bsInfo: BSInfo ): SimplifiedBSInfo {

    // 輸出開始處理的訊息到控制台
    console.log('convertBsInfoToSimplifiedFormat() - Start');

    // 使用可選鏈和映射來從 bsInfo.anr 中的鄰居訊息創建 SimplifiedNeighborInfo 數組
    const neighbors = bsInfo.anr?.['anr-son-output']?.neighbor.map( neighborItem => ({
      
      // 從 neighborItem 取出鄰居 BS 的 id
      id: neighborItem.id,

      // 從 neighborItem 取出'plmn-id'，並假設它在 BSInfo 和 SimplifiedBSInfo 中是相同類型
      'plmn-id': neighborItem['plmn-id'],

      // 從 neighborItem 取出 nci
      nci: neighborItem.nci,

      // 從 neighborItem 取出pci
      pci: neighborItem.pci
    })) || []; // 如果 bsInfo.anr 是 undefined，則 neighbors 預設為空數組

    // 創建一個 SimplifiedBSInfo 類型的對象，並用 bsInfo 中的數據填充
    const simplified: SimplifiedBSInfo = {

      id: bsInfo.id,                   // 從 bsInfo 取出基站 id
      name: bsInfo.name,               // 從 bsInfo 取出基站名稱
      bstype: bsInfo.bstype,           // 從 bsInfo 取出基站類型
      status: bsInfo.status,           // 從 bsInfo 取出基站狀態
      nci: bsInfo.info['bs-conf'].nci, // 從 bsInfo 的 info['bs-conf'] 取出 nci
      pci: bsInfo.info['bs-conf'].pci, // 從 bsInfo 的 info['bs-conf'] 取出 pci
      'plmn-id': { 
        // 從 bsInfo 的 info['bs-conf']['plmn-id'] 取出 mcc 和 mnc
        mcc: bsInfo.info['bs-conf']['plmn-id'].mcc,
        mnc: bsInfo.info['bs-conf']['plmn-id'].mnc,
      },
      "tx-power": bsInfo.info['bs-conf']['tx-power'],     // 從 bsInfo 的 info['bs-conf'] 取出發射功率
      "nrarfcn-dl": bsInfo.info['bs-conf']['nrarfcn-dl'], // 從 bsInfo 的 info['bs-conf'] 取出下行 NR ARFCN
      "nrarfcn-ul": bsInfo.info['bs-conf']['nrarfcn-ul'], // 從 bsInfo 的 info['bs-conf'] 取出上行 NR ARFCN 
      position: bsInfo.position,  // 從 bsInfo 取出基站位置  

      componentId: bsInfo.extension_info[0].gNBCUFunction?.db.componentId, // 取出 CU 配置的 ID
         cellInfo: bsInfo.cellInfo, // 取出基站的 cellInfo 訊息 ( 一體式的目前都會為空 )

      neighbors,    // 取出鄰居基站數據
      iconUrl: "",  // 初始化圖標 URL

      // When update BS need these:
      tac: bsInfo.info['bs-conf'].tac, // 從 bsInfo 取出基站 tac
      channelbandwidth: bsInfo.info['bs-conf']['channel-bandwidth'], // 從 bsInfo 取出基站 channelbandwidth
      description: bsInfo.description, // 從 bsInfo 取出總基站描述
      components: bsInfo.components,

      // @2024/01/11 Add
      // When open Field Edit need these: 
      gNBId: bsInfo.info.gNBId,
      gNBIdLength: bsInfo.info.gNBIdLength
    };
    
    // 輸出函數結束的訊息到控制台
    console.log( 'convertBsInfoToSimplifiedFormat() - End' );

    // 返回轉換後的 SimplifiedBSInfo 對象
    return simplified;
  }

  
  /**
   * @2024/04/10 Update
   * 將 BSInfo_dist 類型轉換為 SimplifiedBSInfo 類型的數組
   * @function convertDistBsInfoToSimplifiedFormat
   * @param {BSInfo_dist} Dist_bsInfo - 待轉換的分佈式基站資訊對象
   * @returns {SimplifiedBSInfo[]} 轉換後的簡化基站資訊數組
   * @description
   * - 如果原始資料中的 info 不是陣列，則嘗試從 extension_info 屬性中構建 SimplifiedBSInfo 數組
   * - 每個基站的簡化資訊會包含從原始資料和擴展資訊中提取的相關屬性
   * - 函數提供了對數據不完整的處理，以確保轉換過程中不會發生錯誤
   */
  convertDistBsInfoToSimplifiedFormat( Dist_bsInfo: BSInfo_dist ): SimplifiedBSInfo[] {

    // 輸出開始處理的訊息到控制台
    console.log('convertDistBsInfoToSimplifiedFormat() - Start');

    // 首先檢查 Dist_bsInfo.info 是否為陣列 
    if ( !Array.isArray( Dist_bsInfo.info ) ) {

        console.log( " Dist_bsInfo.info 無數據 - 開始啟用備案處理分佈式基站資訊 " )

        // 如果 extension_info 也不是陣列或為空，則返回空陣列
        if (!Array.isArray(Dist_bsInfo.extension_info) || Dist_bsInfo.extension_info.length === 0) {
          console.error('Dist_bsInfo.info 和 Dist_bsInfo.extension_info 都不是有效的陣列。');
          return [];
        }

        // 遍歷 extension_info 陣列構建 SimplifiedBSInfo 陣列
        const simplifiedInfos: SimplifiedBSInfo[]  = Dist_bsInfo.extension_info.map((extensionItem) => {
          // 從 Dist_bsInfo.anr 中獲取對應 nci 的鄰居資訊
          const anrNeighbors = Dist_bsInfo.anr[extensionItem.nci]?.['anr-son-output']?.neighbor.map(neighborItem => ({

            // 從 neighborItem 取出鄰居 BS 的 id
            id: neighborItem.id,

            'plmn-id': {
              mcc: neighborItem['plmn-id'].mcc,
              mnc: neighborItem['plmn-id'].mnc
            },

            nci: neighborItem.nci,
            pci: neighborItem.pci

          })) || [];

          // 確認 Dist_bsInfo.components 的類型為 Components_dist
          const components: Components_dist = Dist_bsInfo.components;

          // 查找 componentId 對應的位置資訊
          let position = '';
          Object.values(components).forEach((duObject: duID) => {
            Object.values(duObject).forEach((ruArray: ruID[]) => {
              ruArray.forEach((ruObj: ruID) => {
                // ruObj 的類型應為 ruID，包含一組具有字串鍵和值的對象
                const ruId = Object.keys(ruObj)[0];
                if (ruId === extensionItem.NRCellCU?.db.componentId) {
                  position = ruObj[ruId];
                }
              });
            });
          });

          // 創建 SimplifiedBSInfo 物件
          return {
                  id: Dist_bsInfo.id,       // 分佈式基站總 ID
                name: Dist_bsInfo.name,     // 分佈式基站名稱
              bstype: Dist_bsInfo.bstype,   // 分佈式基站類型
              status: Dist_bsInfo.status,   // 分佈式基站狀態
        
              nci: extensionItem.nci,                 // 子基站的 NCI
              pci: extensionItem.NRCellDU?.db.nRPCI,  // 子基站的 PCI
              'plmn-id': {                            // 子基站的 PLMN ID 訊息
                mcc: extensionItem.NRCellCU?.db.pLMNId_MCC,
                mnc: extensionItem.NRCellCU?.db.pLMNId_MNC,
              },
              "tx-power": extensionItem.NRSectorCarrier?.db.configuredMaxTxPower,  // 子基站的傳輸功率
              "nrarfcn-dl": extensionItem.NRSectorCarrier?.db.arfcnDL,             // 子基站的下行頻率
              "nrarfcn-ul": extensionItem.NRSectorCarrier?.db.arfcnUL,             // 子基站的上行頻率
              position: position,  // 子基站的位置資訊
        
              componentId: extensionItem.gNBCUFunction?.db.componentId, // CU 配置的 ID
              cellInfo: Dist_bsInfo.cellInfo,    // 子基站的 cellInfo 訊息
        
              neighbors: anrNeighbors,           // 映射後的鄰居 BS 數據
              iconUrl: "",                       // 圖標 URL 初始化
        
              // When update Dist BS need these:
              description: Dist_bsInfo.description,   // 總基站描述
              components:  Dist_bsInfo.components,    // 基站組件
              channelbandwidth: extensionItem.NRCellDU?.db.bSChannelBwDL, // 子基站的頻寬
              tac: extensionItem.NRCellDU?.db.nRTAC,  // 子基站的 TAC
        
              // When open Field Edit need these: 
              gNBId: extensionItem.gNBId,             // 子基站的 gNBId
              gNBIdLength: extensionItem.gNBIdLength, // 子基站的 gNBId 長度
          };
      });

      // 輸出函數結束的訊息到控制台
      console.log( 'convertDistBsInfoToSimplifiedFormat() - End' );

      return simplifiedInfos; // 返回轉換後的 SimplifiedBSInfo 數組


    } else {  // 當 Dist_bsInfo.info 有值時的處理

      console.log( " Dist_bsInfo.info 有數據 - 使用一般方式處理分佈式基站資訊 " )
 
      // 創建一個 SimplifiedBSInfo 數組來存放每個子基站的簡化訊息
      const simplifiedInfos: SimplifiedBSInfo[] = Dist_bsInfo.info.map( subBsInfo => {

          // 為當前子基站尋找相應的 ANR 訊息，使用子基站的 nci 值作為鍵
          const anrKey = subBsInfo.nci;

          // 從 Dist_bsInfo.anr 中獲取對應nci的鄰居訊息，並映射為 SimplifiedNeighborInfo 數組
          const anrNeighbors = Dist_bsInfo.anr[anrKey]?.['anr-son-output']?.neighbor.map(neighborItem => ({

            id: neighborItem.id,                // 提取鄰居 BS 的 id
            'plmn-id': neighborItem['plmn-id'], // 提取鄰居 BS 的 PLMN ID 訊息
            nci: neighborItem.nci,              // 提取鄰居 BS 的 NCI 訊息
            pci: neighborItem.pci               // 提取鄰居 BS 的 PCI 訊息
          })) || []; // 如果對應的 ANR 訊息不存在，則使用空數組作為預設值

          // 創建一個新的 SimplifiedBSInfo 對象，包含從子基站訊息和 ANR 訊息中提取的數據
          return {
            id: Dist_bsInfo.id,                   // 從 Dist_bsInfo 取出總基站 id
            name: Dist_bsInfo.name,               // 從 Dist_bsInfo 取出總基站名稱
            bstype: Dist_bsInfo.bstype,           // 從 Dist_bsInfo 取出總基站類型
            status: Dist_bsInfo.status,           // 從 Dist_bsInfo 取出總基站狀態

            nci: subBsInfo.nci,                   // 從 Dist_bsInfo 取出子基站的 NCI
            pci: subBsInfo.DU?.nRPCI,             // 從 Dist_bsInfo 取出子基站的 DU 中的 nRPCI 值
            'plmn-id': {                          // 從 Dist_bsInfo 取出子基站的 PLMN ID 訊息
              mcc: subBsInfo.CU?.pLMNId_MCC,
              mnc: subBsInfo.CU?.pLMNId_MNC,
            },
            "tx-power": subBsInfo.DU?.configuredMaxTxPower, // 取出 DU 配置的最大傳輸功率
            "nrarfcn-dl": subBsInfo.DU?.arfcnDL,            // 取出 DU 配置下行頻率
            "nrarfcn-ul": subBsInfo.DU?.arfcnUL,            // 取出 DU 配置上行頻率
            position: subBsInfo.RU?.position,               // 取出 RU 的位置訊息

            componentId: subBsInfo.CU.id,                   // 取出 CU 配置的 ID
            cellInfo: Dist_bsInfo.cellInfo,                 // 從 Dist_bsInfo 取出子基站的 cellInfo 訊息

            neighbors: anrNeighbors,                        // 映射後的鄰居 BS 數據

            iconUrl: "",                                    // 初始化圖標 URL

            // @2024/01/11 Add
            // When update Dist BS need these:
            description: Dist_bsInfo.description,           // 從 Dist_bsInfo 取出總基站描述
            components: Dist_bsInfo.components,

            channelbandwidth: subBsInfo.DU?.bSChannelBwDL,  // 取出 DU 配置 bSChannelBwDL
            tac: subBsInfo.DU?.nRTAC,                       // 取出 DU 配置 tac

            // @2024/01/11 Add
            // When open Field Edit need these: 
            gNBId: subBsInfo.gNBId,
            gNBIdLength: subBsInfo.gNBIdLength
          };

      });

      // 輸出函數結束的訊息到控制台
      console.log( 'convertDistBsInfoToSimplifiedFormat() - End' );

      return simplifiedInfos; // 返回轉換後的 SimplifiedBSInfo 數組
    }

  }

  // @12/26 Add
  // 函數定義: 根據基站類型、狀態、選中狀態以及名稱來決定顯示的圖標
  setIconUrl( bsInfoBSType: number, bsInfoStatus: number,
               isSelected: boolean = false, firstORclickBsInfoName: string, currentBsInfoName: string ): string {

    // 設定圖標的基礎路徑
    const basePath = './assets/img/bs_icons_v3/';
    let iconName = ''; // 用於存儲最終的圖標文件名

    // 檢查基站是否被選中
    if ( isSelected ) {

      if ( bsInfoBSType === 2 && bsInfoStatus === 1 ) {
        iconName = 'dist_gnb_offline_selected.png'; // 分布式基站離線且被選中的圖標
      } else if (bsInfoBSType === 2 && bsInfoStatus === 2) {
        iconName = 'dist_gnb_online_selected.png';  // 分布式基站在線且被選中的圖標
      } else if (bsInfoBSType === 1 && bsInfoStatus === 1) {
        iconName = 'gnb_offline_selected.png';      // 通用基站離線且被選中的圖標
      } else if (bsInfoBSType === 1 && bsInfoStatus === 2) {
        iconName = 'gnb_online_selected.png';       // 通用基站在線且被選中的圖標
      }

    } else { // 若基站未被選中

      // 檢查名稱是否與第一筆資料相同且 bsInfoBSType 為 2
      if ( bsInfoBSType === 2 && currentBsInfoName === firstORclickBsInfoName ) {
      
        // 符合就選擇分布式基站的非選中圖標
        iconName = ( bsInfoStatus === 1 ) ? 'dist_gnb_offline_nonselected.png' : 'dist_gnb_online_nonselected.png';
        
      } else { // 其他情況選擇預設圖標

        if ( bsInfoBSType === 2 && bsInfoStatus === 1 ) {
          iconName = 'dist_gnb_offline_default.png'; // 分布式基站離線的預設圖標
        } else if ( bsInfoBSType === 2 && bsInfoStatus === 2 ) {
          iconName = 'dist_gnb_online_default.png';  // 分布式基站在線的預設圖標
        } else if ( bsInfoBSType === 1 && bsInfoStatus === 1 ) {
          iconName = 'gnb_offline_nonselected.png';  // 通用基站離線的非選中圖標
        } else if ( bsInfoBSType === 1 && bsInfoStatus === 2 ) {
          iconName = 'gnb_online_nonselected.png';   // 通用基站在線的非選中圖標
        }
      }
    }

    // 返回最終的圖標 URL
    return basePath + iconName;
  }


  // @2024/02/26 Add for MouseOver 
  // 用於保存當前選中的基站訊息。如果沒有選中的基站，則為 null。
  selectedBsInfo: SimplifiedBSInfo | null = null;

  // @2024/02/26 Add for MouseOver 
  // 一個布林值，指示是否應該顯示基站的詳細訊息視窗。
  showBsInfoWindow: boolean = false;

  // @2024/02/27 Add
  // 使用 @ViewChild 裝飾器來獲取模板中的 MapInfoWindow 元素的實例。
  // '!' 非空斷言操作符告訴 TypeScript 編譯器該屬性將在代碼的後續部分被賦值，
  // 因此它在初始化時不會是 null 或 undefined。
  @ViewChild( MapInfoWindow ) infoWindow!: MapInfoWindow; // @2024/02/27 Add

  // @2024/02/27 Add
  // 宣告一個字符串變量 `infoContent` 用來儲存要顯示在 InfoWindow 中的內容。
  infoContent = "";

  // @2024/02/27 Add
  // 宣告一個變量 `displayBsInfo_for_googleMapInfoWindow` 用於存儲要顯示在 InfoWindow 中的基站詳細資訊。
  // 它的類型是 `SimplifiedBSInfo | null`，這意味著它可以存儲一個 `SimplifiedBSInfo` 對象或者是 `null`。
  displayBsInfo_for_googleMapInfoWindow: SimplifiedBSInfo | null = null; 

  // @2024/02/27 Add
  // 定義一個函數 `openBsInfo`，該函數接收一個 MapMarker 對象和一個 SimplifiedBSInfo 對象作為參數。
  // 這個函數將被用來打開一個 InfoWindow 並顯示基站的詳細資訊。
  openBsInfo( marker: MapMarker, clickbsInfo: SimplifiedBSInfo ) {
    // 將傳入的基站資訊對象 `clickbsInfo` 賦值給 `displayBsInfo_for_googleMapInfoWindow`。
    // 這將確保 InfoWindow 顯示當前被點擊的基站的資訊。
    this.displayBsInfo_for_googleMapInfoWindow = clickbsInfo;

    // 使用 MapInfoWindow 實例的 `open` 方法，傳入一個 MapMarker 對象來打開 InfoWindow。
    // InfoWindow 將顯示在與傳入的 marker 關聯的地圖上的位置。
    this.infoWindow.open( marker );
  }

  // @2024/02/27 Add for MouseOver of Google Map APIs 
  // 用於從當前顯示基站資訊中獲取轉換後的位置對象
  get displayBsInfo_for_googleMapInfoWindowPosition(): google.maps.LatLngLiteral {

    // 如果 displayBsInfo_for_googleMapInfoWindow 存在，則調用 parsePosition 方法進行轉換，否則返回預設值
    return this.displayBsInfo_for_googleMapInfoWindow ? this.parsePosition(this.displayBsInfo_for_googleMapInfoWindow.position) : { lat: 0, lng: 0 };
  }


  // @2024/03/19 Update for control mouseover
  // 負責處理當地圖上的標記被點擊時的事件，
  // 用來切換成顯示 "當下點擊的基站資訊與基站圖標"，並顯示對應的資訊於點擊到的基站圖標上"
  onSelectBsInfo( marker: MapMarker, clickbsInfo: SimplifiedBSInfo, clickbsInfoName: string,
                   clickbsInfoBSType: number, clickbsInfoStatus: number ) {
    
    // 每次當點擊一個基站都預設不展開摺疊面板 @2024/02/29 Add 
    this.isPanelExpanded = false;
    
    // 每次當點擊一個基站都重置地圖回一開始的中心縮放位置 @2024/03/18 Add
    this.adjustMapZoom();

    // 在 Angular 的 NgZone 中執行以保證更新能正確反映在 UI 上
    this.ngZone.run(() => {

      // 開啟訊息視窗並顯示被點擊的基站訊息
      this.openBsInfo( marker, clickbsInfo );
      
      // 更新基站選中狀態
      if ( this.selectedBsInfo === clickbsInfo ) {

        // 如果此基站已選中，則取消選中並隱藏訊息視窗
          this.selectedBsInfo = null;
        //this.showBsInfoWindow = false;
           this.displayBsInfo = null;

      } else {

        // 否則，將此基站設為選中狀態並顯示訊息視窗
          this.selectedBsInfo = clickbsInfo;
        //this.showBsInfoWindow = true;
           this.displayBsInfo = clickbsInfo;
      }

      // 遍歷所有基站資訊，更新它們的圖標顯示狀態
      this.allSimplifiedBsInfo.forEach( bsInfo => {
        
        // 檢查每個基站是否為當前點擊的基站
        const isSelected = bsInfo === this.selectedBsInfo;
        
        // 更新圖標 URL
        bsInfo.iconUrl = this.setIconUrl( bsInfo.bstype, bsInfo.status, isSelected, clickbsInfoName, bsInfo.name );
      });

      // 輸出被點擊的基站訊息到控制台
      console.log( "Marker", clickbsInfoName, "is clicked,\n",
                    "its type is", clickbsInfoBSType, "its status is", clickbsInfoStatus );
    });

    // 觸發變化檢測更新 UI
    this.cdr.detectChanges();

    // 輸出當前點擊的基站訊息到控制台
    console.log( "After click onSelectBsInfo() the displayBsInfo:", this.displayBsInfo );
  }


  // Mouse Over @2024/03/19 Update  
  // 當鼠標懸停在地圖上的基站標記上時觸發的事件處理函數
  onMouseOverBsInfo( marker: MapMarker, bsInfoInMouseover: SimplifiedBSInfo ): void {

    // 將當前懸停的基站訊息設為要顯示的基站詳細訊息
    // this.displayBsInfo = bsInfoInMouseover;

    // 設置顯示基站詳細訊息視窗的標記為 true，使其顯示
    // this.showBsInfoWindow = true;

    // 如沒有 BS 被點擊過
    if ( !this.selectedBsInfo ) {

      // 就顯示出鼠標碰到的對應 BS 資訊上 <map-info-window> 中
      this.displayBsInfo_for_googleMapInfoWindow = bsInfoInMouseover;
      this.infoWindow.open( marker );
    }
  }

  // Mouse Out @2024/03/19 Update
  // 當鼠標從地圖上的基站標記移開時觸發的事件處理函數
  onMouseOutBsInfo(): void {

    // 檢查是否有基站被選中
    // if ( !this.selectedBsInfo ) {
      
    //   // 如果沒有基站被選中，則將顯示基站詳細訊息視窗的標記設為 false，使其隱藏
    //   this.showBsInfoWindow = false;
    // }
    // 如果有基站被選中，則不做任何操作，保持詳細訊息視窗顯示

    // 如沒有 BS 被點擊過
    if ( !this.selectedBsInfo ) {
      
      // 鼠標離開碰到的 BS 就取消顯示 <map-info-window> 
      this.infoWindow.close();
    }
    
  }

  // @2024/02/26 Add for MouseOver 
  // 這個方法用於關閉並重置地圖上顯示的基站詳細資訊視窗
  // closeBsInfoWindow(): void {

  //   // 在控制台輸出日誌，表示此函數已被觸發，用於調試
  //   console.log("已觸發 - closeBsInfoWindow()");

  //   // 將控制顯示基站詳細資訊視窗的布爾變數設為 false，使資訊視窗不顯示
  //   this.showBsInfoWindow = false;

  //   // 將當前顯示的基站詳細資訊設為 null，表示沒有基站訊息被選中或顯示
  //   this.displayBsInfo = null;
  // }

  // @12/25 Add
  // 用於從當前顯示基站資訊中獲取轉換後的位置對象
  get displayBsInfoPosition(): google.maps.LatLngLiteral {

    // 如果 displayBsInfo 存在，則調用 parsePosition 方法進行轉換，否則返回預設值
    return this.displayBsInfo ? this.parsePosition( this.displayBsInfo.position ) : { lat: 0, lng: 0 };
  }

  // @2024/02/26 Add for MouseOver 
  // 用於從當前選到顯示的基站資訊中獲取轉換後的位置對象
  get selectedBsInfoPosition(): google.maps.LatLngLiteral {

    // 如果 selectedBsInfo 存在，則調用 parsePosition 方法進行轉換，否則返回預設值
    return this.selectedBsInfo ? this.parsePosition( this.selectedBsInfo.position ) : { lat: 0, lng: 0 };
  }

  // @2024/01/09 - Update
  // 此方法用於將位置訊息的字串轉換為 Google 地圖所需的 LatLngLiteral 對象
  parsePosition( positionStr: string ): google.maps.LatLngLiteral {
    try {

      // 檢查字符串中是否包含 'NaN'
      if ( positionStr.includes('NaN') ) {
        throw new Error('Position contains NaN');
      }

      // 嘗試解析 JSON 字串以獲取經緯度數組
      const positionArr = JSON.parse( positionStr );

      // 返回一個 LatLngLiteral 對象，其 lat 和 lng 屬性分別對應於緯度和經度 
      // ( 實際數據格式為: [ lng, lat ] = [ 121.044029, 24.773652 ] )
      return {
        lat: positionArr[1],
        lng: positionArr[0]
      };

    } catch ( e ) {

      // 如果解析出錯，則在控制台打印錯誤訊息
      console.error( 'Error parsing position:', e );

      // 返回一個預設的 LatLngLiteral 對象，防止程序崩潰
      return { lat: 0, lng: 0 };
    }
  }


  // @2024/02/29 Add
  // 追蹤 Info Window 裡的摺疊面板是否為展開的狀態 ( For Google Map Info Window )
  isPanelExpanded: boolean = false; // 初始設置為 false，表示摺疊面板在初始狀態下是未展開的

  // @2024/03/18 Update
  // 切換 Info Window 摺疊面板展開或收起的狀態
  togglePanel() {
    this.isPanelExpanded = !this.isPanelExpanded; // 反轉 isPanelExpanded 的值

    if ( this.isPanelExpanded ) {
      // 如果面板展開，則調整地圖視野以適應訊息窗口
      this.expandMapInfoWindow_adjustMapView();
    } else {
      // 如果面板收起，則重置地圖視野到原始中心
      this.adjustMapZoom();
    }

    console.log( "Info Window 摺疊面板展開狀態:", this.isPanelExpanded );
  }

  // @2024/03/19 Update
  // 調整地圖視野，以保證訊息窗口在面板展開時完全可見
  expandMapInfoWindow_adjustMapView() {
    if ( !this.map.googleMap || !this.displayBsInfo_for_googleMapInfoWindow ) {
      // 如果地圖未準備好或沒有選中的基站資訊，則不進行任何操作
      return;
    }

    const infoWindowHeight = 1; // 設置訊息窗口的高度，這裡是假定值

    // 獲取地圖容器元素，並得到其高度
    const mapContainer = document.getElementById( 'google-map-container' );
    const mapHeight = mapContainer ? mapContainer.offsetHeight : 0;
    const latLng = this.parsePosition( this.displayBsInfo_for_googleMapInfoWindow.position );
    const latLngBounds = this.map.googleMap.getBounds();

    if ( latLngBounds && latLng ) {
      const northEast = latLngBounds.getNorthEast(); // 獲取地圖視界的東北角
      const southWest = latLngBounds.getSouthWest(); // 獲取地圖視界的西南角

      // 計算每像素的緯度單位
      const latPerPx = ( northEast.lat() - southWest.lat() ) / mapHeight;

      // 根據訊息窗口高度計算相應的緯度增量
      const additionalLat = infoWindowHeight * latPerPx;

      // 創建一個新的地圖中心點，向上偏移以使訊息窗口完全顯示
      const newCenter = {
        lat: latLng.lat + additionalLat,
        lng: latLng.lng,
      };

      // 將地圖中心移動到新的位置
      this.map.googleMap.panTo( newCenter );
    }
  }


  // @2024/02/29 Add
  // 用來追蹤是否展示額外資訊的狀態變量 ( For 自製 MouseOver )
  isAdditionalInfoVisible: boolean = false;

  // @2024/02/29 Add
  // 切換額外資訊的顯示狀態 ( For 自製 MouseOver )
  toggleAdditionalInfo() {
    this.isAdditionalInfoVisible = !this.isAdditionalInfoVisible;
  }

  // @12/18 Add
  // mobility - 取得換手成功率
  get mobilityAsNumber(): number {
    return parseFloat( this.fieldInfo.mobility );
  }

  // @12/18 Add
  // accessibility - 取得存取成功率
  get accessibilityAsNumber(): number {
    return parseFloat( this.fieldInfo.accessibility );
  }

  // @2024/05/27 Add 
  // coverage - 取得覆蓋率
  get coverageAsNumber(): number {
    return parseFloat( this.fieldInfo.coverage );
  }

  // @2024/05/27 Add 
  // retainability - 取得維持率
  get retainabilityAsNumber(): number {
    return parseFloat( this.fieldInfo.retainability );
  }

  // @2024/05/27 Add
  // energy consumption - 能源消耗量
  get energyConsumptionAsNumber(): number {
    return parseFloat( this.fieldInfo.energy );
  }

  resourceProcess: number = 0;
  resourceMemory: number = 0;
  updateResourceUtilization() {

    // 更新 CPU 使用率
    this.resourceProcess = parseFloat(this.fieldInfo.utilization.resourceProcess);
    console.log('resourceProcess:', this.resourceProcess);

    // 更新 Memory 使用率
    this.resourceMemory = parseFloat(this.fieldInfo.utilization.resourceMemory);
    console.log('resourceMemory:', this.resourceMemory);
  }

  // 設定告警種類文字 @12/07 Update by yuchen
  severityText(severity: string): string {
    const severityKey = `field.${severity.toLowerCase()}Fault`;
    return this.languageService.i18n[ severityKey ];
  }

  // 設定告警種類給 CSS 選擇器用文字 @12/07 Add by yuchen
  severityText_forCSS(severity: string): string {
    //console.log("severity:", severity);
    return this.commonService.severityText(severity);
  }

  // 設定場域對應的告警種類數量 @12/07 Update by yuchen
  severityCount( severity: string ): number {

    if (!this.fieldInfo) {
      return 0; // 確保 fieldInfo 已被賦值且不為空
    }

    if (severity.toUpperCase() === 'CRITICAL') {
      return this.fieldInfo.alarmCriticalNum;
    } else if (severity.toUpperCase() === 'MAJOR') {
      return this.fieldInfo.alarmMajorNum;
    } else if (severity.toUpperCase() === 'MINOR') {
      return this.fieldInfo.alarmMinorNum;
    } else if (severity.toUpperCase() === 'WARNING') {
      return this.fieldInfo.alarmWarningNum;
    } else {
      return 0;
    }
  }

  // @2024/02/06 Add
  // 用於獲取 CRITICAL 的告警數量
  getCriticalAlarmCount(): string {
    // 從 fieldInfo 對象中獲取 alarmCriticalNum 屬性的值，如果 fieldInfo 為 undefined，則預設值為 0
    const criticalCount = this.fieldInfo?.alarmCriticalNum ?? 0;
    // 如果 CRITICAL 告警的數量大於 99，則返回 '99+'，否則返回其數量的字符串表示
    return criticalCount > 99 ? '99+' : criticalCount.toString();
  }


  
// BS Modify Configuration Setting @2024/01/05 Add ↓

  @ViewChild('modifyConfigWindow') modifyConfigWindow: any;
  modifyConfigWindowRef!: MatDialogRef<any>;
  modifyConfigForm!: FormGroup;
  formValidated = false;
  isModifySuccess: boolean = false;  // For control display success message
  isModifyError: boolean = false;    // For control display error message
  errorMessage: string = '';         // For display error message
  isNothingChanged: boolean = false; // 控制 "nothing changed" 訊息的顯示 @2024/01/15 Add


  createBSInfoForm() {
    this.modifyConfigForm = this.fb.group({
      bsName: new FormControl(''), 
      pci: new FormControl(''),
      // mcc: new FormControl(''),
      // mnc: new FormControl(''),
      txPower: new FormControl(''),
      nrarfcnul: new FormControl(''),
      nrarfcndl: new FormControl(''),
      longitude: new FormControl(''),
      latitude: new FormControl('')
    });
  }

  // 接收 displayBsInfo 對象並使用其值來更新表單 @2024/01/17 Add
  updateModifyConfigForm( bsInfo: SimplifiedBSInfo ) {
    this.modifyConfigForm.patchValue({
         bsName: bsInfo.name, 
            pci: bsInfo.pci,
         // mcc: bsInfo['plmn-id'].mcc, // 如果這些值是可用的
         // mnc: bsInfo['plmn-id'].mnc,
        txPower: bsInfo['tx-power'],
      nrarfcnul: bsInfo['nrarfcn-ul'],
      nrarfcndl: bsInfo['nrarfcn-dl'],
      longitude: this.displayBsInfoPosition.lng, // 確保 position 是一個物件並有 lng 屬性
       latitude: this.displayBsInfoPosition.lat  // 確保 position 是一個物件並有 lat 屬性
    });
  }
  
  openModifyConfigWindow() {
    this.formValidated = false;

    // 如果 displayBsInfo 已被賦值，就更新表單
    if ( this.displayBsInfo ) {
      this.updateModifyConfigForm(this.displayBsInfo);
    }

    this.modifyConfigWindowRef = this.dialog.open( this.modifyConfigWindow, { id: 'modifyConfigWindow' } );
    this.modifyConfigWindowRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

  // 函數來驗證並解析坐標值
  parseCoordinate(value: string, defaultValue?: number): number | undefined {
    const parsed = parseFloat(value);
    return !isNaN(parsed) ? parsed * 1000000 : defaultValue;
  }

  updateBs!: Subscription;
  updateDistributedBs!: Subscription;

  modifyConfig_click_NUM: number = 0;
  // 更新 BS 配置 Submit 時用的函數 @2024/01/15 Update 
  ModifyConfig_Submit( bsName: string ,bsType: number ) {
    console.log( "ModifyConfig_Submit() - Start" );

    // 在方法開始時重置 'isNothingChanged'
    this.isNothingChanged = false;

    console.log( "The modify BS Name:", bsName, ", bsType is:", bsType );

    this.modifyConfig_click_NUM ++;

    this.isMarkersLoading = true; // 點擊 Modify Configuration 時，開始顯示 Spinner 表載入修改資訊中 

    this.formValidated = true;
    if ( !this.modifyConfigForm.valid ) {
       return;
    }
  
    // 表格上的輸入值
    const formValues = this.modifyConfigForm.value;
    console.log( formValues );
  
    // 解析原始的 position 字串以獲取經緯度
    const originalPosition = this.displayBsInfo ? this.parsePosition( this.displayBsInfo.position ) : null;

    console.log("When click Modify Configration the original position is:", originalPosition );
    console.log("When click Modify Configration the formValues' position is:", formValues.longitude, formValues.latitude );

    // 使用 parseCoordinate 函數來安全解析經度和緯度
    const gpslongitude = this.parseCoordinate(formValues.longitude, originalPosition ? originalPosition.lng * 1000000 : undefined);
    const gpslatitude = this.parseCoordinate(formValues.latitude, originalPosition ? originalPosition.lat * 1000000 : undefined);

    // 檢查是否有變更 @2024/01/16 Update for determining lat and lng
    const isNameChanged = formValues.bsName !== null && formValues.bsName !== '' && formValues.bsName !== this.displayBsInfo!.name;
    const isPciChanged = formValues.pci !== null && formValues.pci !== '' && formValues.pci !== this.displayBsInfo!.pci;
    const isTxPowerChanged = formValues.txPower !== null && formValues.txPower !== '' && formValues.txPower !== this.displayBsInfo!['tx-power'];
    const isNrarfcndlChanged = formValues.nrarfcndl !== null && formValues.nrarfcndl !== '' && formValues.nrarfcndl !== this.displayBsInfo!['nrarfcn-dl'];
    const isNrarfcnulChanged = formValues.nrarfcnul !== null && formValues.nrarfcnul !== '' && formValues.nrarfcnul !== this.displayBsInfo!['nrarfcn-ul'];
    const isLongitudeChanged = originalPosition && gpslongitude !== undefined && originalPosition.lng * 1000000 !== gpslongitude;
    const isLatitudeChanged = originalPosition && gpslatitude !== undefined && originalPosition.lat * 1000000 !== gpslatitude;
    
    console.log( isNameChanged, isPciChanged, isTxPowerChanged, isNrarfcndlChanged, isNrarfcnulChanged,
                   isLongitudeChanged, isLatitudeChanged );

    // 如果所有欄位都沒有變更，則設置 isNothingChanged 為 true @2024/01/15 Add
    this.isNothingChanged = !(isNameChanged || isPciChanged || isTxPowerChanged || isNrarfcndlChanged || isNrarfcnulChanged ||
                               isLongitudeChanged || isLatitudeChanged);

    console.log( "The num of click Modify Config:", this.modifyConfig_click_NUM, 
                  "\nand the flag of isNothingChanged:", this.isNothingChanged );

    // 如果沒有任何變更，則直接返回並顯示訊息，不進行後續操作 @2024/01/15 Add
    if ( this.isNothingChanged ) {

      console.log("Nothing changed!");
      this.isMarkersLoading = false; // 隱藏 Spinner
      setTimeout( () => this.isNothingChanged = false, 4500 );  // 可選: 4.5 秒後隱藏訊息
      this.modifyConfigWindowRef.close();
      this.modifyConfigForm.reset();      // 重置整個表單
      //this.isNothingChanged = false;
      return;

    } else { // 如果有變更

        const post_BS_body: any = {

            // User can modify:
            name:      formValues.bsName !== null && formValues.bsName !== ''
                        ? String( formValues.bsName ) : String( this.displayBsInfo!.name ),
            pci:       formValues.pci !== null && formValues.pci !== ''
                        ? String( formValues.pci ) : String( this.displayBsInfo!.pci ),
            txpower:   formValues.txPower !== null && formValues.txPower !== ''
                        ? String( formValues.txPower ) : String( this.displayBsInfo!['tx-power'] ),
            nrarfcndl: formValues.nrarfcndl !== null && formValues.nrarfcndl !== ''
                        ? String( formValues.nrarfcndl ) : String( this.displayBsInfo!['nrarfcn-dl'] ),
            nrarfcnul: formValues.nrarfcnul !== null && formValues.nrarfcnul !== ''
                        ? String( formValues.nrarfcnul ) : String( this.displayBsInfo!['nrarfcn-ul'] ),
            
            // 使用 parseCoordinate 函數安全解析後的經緯度
            gpslongitude: String(gpslongitude),
            gpslatitude:  String(gpslatitude),

            // User can't modify in field-info:
            session: String( this.sessionId ),
            id:      String( this.displayBsInfo!.id ),
            bstype:  String( this.displayBsInfo!.bstype ),
            nci:     String( this.displayBsInfo!.nci ),
            plmnid: {
              mnc:   String( this.displayBsInfo!['plmn-id'].mnc ),
              mcc:   String( this.displayBsInfo!['plmn-id'].mcc )
              // mnc: formValues.mnc !== null && formValues.mnc !== '' ? String(formValues.mnc) : String(this.displayBsInfo!['plmn-id'].mnc),
              // mcc: formValues.mcc !== null && formValues.mcc !== '' ? String(formValues.mcc) : String(this.displayBsInfo!['plmn-id'].mcc)
            },
            description:      String( this.displayBsInfo!.description ),
            channelbandwidth: String( this.displayBsInfo!.channelbandwidth ),
            tac:              String( this.displayBsInfo!.tac ),
            components:       this.displayBsInfo!.components
        };

          // 如果為有效的經緯度值
          if (post_BS_body.gpslongitude !== undefined && post_BS_body.gpslatitude !== undefined) {
            post_BS_body.position = String(`[${(post_BS_body.gpslongitude / 1000000).toFixed(6)},${(post_BS_body.gpslatitude / 1000000).toFixed(6)}]`);
          } else {
            // 如果任一值為 undefined，則使用原始的 position
            post_BS_body.position = String( this.displayBsInfo!.position );
          }

          if ( this.commonService.isLocal ) {
            // 如是 local 環境

            if ( bsType === 1 ) {
              // 模擬一個成功響應或者直接返回
              of({ success: true, message: 'All-in-one BS Update successful...' }).subscribe( response => {
                  console.log( response.message );
                  
                  if ( this.activeButton_rsrp_sinr ){ 
                    console.log( 'Modify successful... ,and the flag of this.activeButton_rsrp_sinr is:', this.activeButton_rsrp_sinr );
                    // 同步更新 SINR 或 RSRP 分佈圖 @2024/01/15 
                    const overlayType = ( this.activeButton_rsrp_sinr === 'SINR' ) ? OverlayType.SINR : OverlayType.RSRP;
                    this.removeOverlay();       // 移除當前顯示的 overlay
                    this.overlayVisible = true; // 設定 overlay 為可見
                    this.getSinrRsrpImage( overlayType );
                    }

                  // 處理模擬響應
                  console.log('本地測試環境，不進行更新操作。\nLocal testing environment, no update operation will be performed.');
                  this.isModifySuccess = true;                           // 設置成功標記為 true
                  setTimeout(() => this.isModifySuccess = false, 4500);  // 可選: 4.5 秒後隱藏訊息
              });

            } else if ( bsType === 2 ) {
              
              of({ success: true, message: 'Disaggregated BS: [CU] + [DU] + [RU] Update error...' }).subscribe( response => {
                  console.log( response.message );
                  
                  if ( this.activeButton_rsrp_sinr ){ 
                    console.log( 'Modify successful... ,and the flag of this.activeButton_rsrp_sinr is:', this.activeButton_rsrp_sinr );
                    // 同步更新 SINR 或 RSRP 分佈圖 @2024/01/15 
                    const overlayType = ( this.activeButton_rsrp_sinr === 'SINR' ) ? OverlayType.SINR : OverlayType.RSRP;
                    this.removeOverlay();       // 移除當前顯示的 overlay
                    this.overlayVisible = true; // 設定 overlay 為可見
                    this.getSinrRsrpImage( overlayType );
                  }

                  console.log('本地測試環境，不進行更新操作。\nLocal testing environment, no update operation will be performed.');
                  this.isModifyError = true;                           // 設置成功標記為 true
                  setTimeout(() => this.isModifyError = false, 4500);  // 可選: 4.5 秒後隱藏訊息
              });
            }

            this.isMarkersLoading = false; // 隱藏 spinner
            this.getQueryFieldInfo();      // 立即呼叫以刷新數據
            
          } else {

              // 非 Local，進行正常的更新請求
              if (bsType === 1) {

                // For All-in-one BS
                console.log( "The POST for updateBs():", post_BS_body );
                this.updateBs = this.API_Field.updateBs( post_BS_body ).subscribe({
                  next: ( response ) => {

                   this.getQueryFieldInfo(); // 確保這個函數會重新獲取最新的數據並更新頁面

                    if ( this.activeButton_rsrp_sinr ){ 
                        console.log( 'Modify successful... ,and the flag of this.activeButton_rsrp_sinr is:', this.activeButton_rsrp_sinr );
                        // 同步更新 SINR 或 RSRP 分佈圖 @2024/01/15 
                        const overlayType = ( this.activeButton_rsrp_sinr === 'SINR' ) ? OverlayType.SINR : OverlayType.RSRP;
                        this.removeOverlay();       // 移除當前顯示的 overlay
                        this.overlayVisible = true; // 設定 overlay 為可見
                        this.getSinrRsrpImage( overlayType );
                    }

                    // Handle success
                    console.log('All-in-one BS Modify successful...');
                    this.isModifySuccess = true;                           // 設置成功標記為 true
                    setTimeout(() => this.isModifySuccess = false, 4500);  // 可選: 4.5 秒後隱藏訊息

                    this.isMarkersLoading = false; // 隱藏 spinner
                    //this.getQueryFieldInfo(); // 立即呼叫以刷新數據
                  },
                  error: ( error ) => {
                    // Handle error
                    console.log('All-in-one BS Modify error...');
                    this.isModifyError = true;
                    this.errorMessage = error;
                    setTimeout(() => this.isModifyError = false, 3500);
                    this.isMarkersLoading = false; // 隱藏 spinner
                    this.getQueryFieldInfo(); // 錯誤處理後也刷新數據
                  }
                });

              } else if ( bsType === 2 )  {

                // For Disaggregated BS: [CU] + [DU] + [RU]
                console.log( "The POST for updateDistributedBs():", post_BS_body );
                this.updateDistributedBs = this.API_Field.updateDistributedBs( post_BS_body ).subscribe({
                  next: ( response ) => {

                    this.getQueryFieldInfo(); // 確保這個函數會重新獲取最新的數據並更新頁面
                    
                    if ( this.activeButton_rsrp_sinr ){
                      // 同步更新 SINR 或 RSRP 分佈圖 @2024/01/15 
                      const overlayType = ( this.activeButton_rsrp_sinr === 'SINR' ) ? OverlayType.SINR : OverlayType.RSRP;
                      this.removeOverlay(); // 移除當前顯示的 overlay
                      this.overlayVisible = true; // 設定 overlay 為可見
                      this.getSinrRsrpImage( overlayType );
                    }

                    // Handle success
                    console.log('Disaggregated BS: [CU] + [DU] + [RU] Modify successful...');
                    this.isModifySuccess = true;                           // 設置成功標記為 true
                    setTimeout(() => this.isModifySuccess = false, 3500);  // 可選: 4.5 秒後隱藏訊息
                    
                    this.isMarkersLoading = false; // 隱藏 spinner
                    //this.getQueryFieldInfo(); // 立即呼叫以刷新數據
                  },
                  error: ( error ) => {
                    // Handle error
                    console.log('Disaggregated BS: [CU] + [DU] + [RU] Modify error...');
                    this.getQueryFieldInfo(); // 錯誤處理後也刷新數據
                    this.isModifyError = true;
                    this.errorMessage = error;
                    setTimeout(() => this.isModifyError = false, 4500);  
                    this.isMarkersLoading = false; // 隱藏 spinner
                  }
                });
            }

            // 選擇性地在動作後重置 'isNothingChanged'
            this.isNothingChanged = false;
          }
          
          // The end:
          // 關閉對話框並重置表單
          this.modifyConfigWindowRef.close();
          this.modifyConfigForm.reset();      // 重置整個表單
    }

    // 結尾重置 'isNothingChanged'
    this.isNothingChanged = false;
    console.log( "ModifyConfig_Submit() - End" );
  }
  
  // 點擊 BS Modify Configuration 視窗的 Cancel 按鈕行為 @2024/01/28 Update
  resetBSModifyConfigForm( bsName: string ) {
    console.log(`Modification for BS '${bsName}' has been cancelled.`);
    this.modifyConfigForm.reset();  // 重置整個表單
  }
  
// BS Modify Configuration Setting @2024/01/05 Add ↑


// For Field Editing Setting @2024/01/11 Add ↓

  // 創建表單組，用於場域編輯
  fieldEditForm!: FormGroup;
  createFieldInfoForm() {
    // 初始化表單控件
    this.fieldEditForm = this.fb.group({
      fieldName: new FormControl(this.fieldInfo?.name || ''),           // 場域名稱，預設值為現有場域名稱或空字串
      fieldBound_North: new FormControl(this.fieldBounds?.north || ''), // 北邊界，預設值為現有北邊界或空字串
      fieldBound_South: new FormControl(this.fieldBounds?.south || ''), // 南邊界，預設值為現有南邊界或空字串
      fieldBound_West: new FormControl(this.fieldBounds?.west || ''),   // 西邊界，預設值為現有西邊界或空字串
      fieldBound_East: new FormControl(this.fieldBounds?.east || ''),   // 東邊界，預設值為現有東邊界或空字串
      phoneNumber: new FormControl(this.fieldInfo?.phone || '')         // 聯絡電話，預設值為現有聯絡電話或空字串
    });
  }

  // 引用場域編輯視窗組件
  @ViewChild('fieldEditWindow') fieldEditWindow: any;
  fieldEditWindowRef!: MatDialogRef<any>;
  fieldEditFormValidated = false;

  // 打開場域編輯視窗 @2024/01/28 Update
  openfieldEditWindow() {

    // 確保場域資訊和邊界資訊已獲取
    if( this.fieldInfo && this.fieldBounds ) {

      // 使用現有場域資訊和邊界資訊更新表單
      this.fieldEditForm.patchValue({
          fieldName:        this.fieldInfo.name,
          fieldBound_North: this.fieldBounds.north,
          fieldBound_South: this.fieldBounds.south,
          fieldBound_West:  this.fieldBounds.west,
          fieldBound_East:  this.fieldBounds.east,
          phoneNumber:      this.fieldInfo.phone
      });
    }

    // 表單驗證狀態重置
    this.fieldEditFormValidated = false; 

    // 打開場域編輯視窗
    this.fieldEditWindowRef = this.dialog.open( this.fieldEditWindow, { 
          id: 'fieldEditWindow',
          // 自定義視窗寬高設置
          // width: '800px', 
          // height: '650px'
    } );

    // 訂閱視窗關閉事件，並在關閉時重置表單驗證狀態
    this.fieldEditWindowRef.afterClosed().subscribe(() => {
      this.fieldEditFormValidated = false;
    });

    // 打印當前場域編輯類型頁 
    console.log( "Open the window of field Edit is:", this.fieldEditType )

    this.fieldEditType = 'Field_Infos';    // 每次打開該視窗都預設顯示場域資訊頁       @2024/01/28 Add
    this.selectedBsInfos = [];             // 每次打開該視窗都初始化 selectedBsInfos @2024/01/28 Add
    this.isFirstEnterInBSListPage = false; // 每次打開該視窗都初始化該 Flag @2024/01/27 Add
    this.displayAllBSFlag =  false;        // 每次打開該視窗都初始化該 Flag ( 表只要當接著馬上打開 BS List 頁都是先顯示場域內 BS ) @2024/01/27 Add
    
    // 根據旗標狀態切換 displayedBasestations 的數據來源 ( 只要打開該視窗都是先顯示場域內 BS ) 
    this.displayedBasestations = this.displayAllBSFlag 
                                  ? this.SortAllBasestationsInO1 
                                  : this.BasestationsInField;

    this.getQueryBsList(); // 打開該視窗就先載入 BS List 數據  @2024/01/28 Add  
    
    // 打印當前場域內選中的基站 ID
    console.log("In openfieldEditWindow(),\n 目前在場域內(被選中)的基站 id 目前有", this.selectedBsInfos )

    // 取得場域圖片
    this.getfieldImage_forFieldEdit();
  }

  // 場域圖片編輯視窗開啟函數 @2024/04/18 Add
  @ViewChild('fieldImageEdit') fieldImageEdit: any;
  fieldImageEdit_Ref!: MatDialogRef<any>;

  openFieldImageEditWindow() {
    this.fieldImageEdit_Ref = this.dialog.open(this.fieldImageEdit, {
    id: 'fieldImageEdit',
    // width 和 height 可以根據需要設置或去掉
    // width: '300px',
    // height: '200px'
    });
  }

  fieldEditType: string = 'Field_Infos';      // 預設選擇 "Field Infos"  
  //fieldEditType: string = 'BS_List';        // 預設選擇 "BS List"   
  isFirstEnterInBSListPage: boolean = false;  // 用於檢測是不是第一次進 "BS List" 頁 @2024/01/27 Add
  
  // 變更 field Edit 視窗顯示類型的函數
  changefieldEditType( e: MatButtonToggleChange ) {
    console.log( "changefieldEditType() - Start" );

    // 根據用戶當前的選擇來設定 field Edit 視窗顯示的類型
    if ( e.value === 'Field_Infos' ) {
      // 如果選擇的是場域資訊頁面

      this.fieldEditType = 'Field_Infos';  // 設定場域編輯類型為場域資訊
      this.getfieldImage_forFieldEdit();    // 獲取場域圖片
      
    } else if ( e.value === 'BS_List' ) {
      // 如果選擇的是基站列表頁面

      this.fieldEditType = 'BS_List';   // 設定場域編輯類型為基站列表
      //this.displayAllBSFlag = false;  // 每次切換該頁面時，都預設不顯示 All BS  @2024/01/26 Add

      // @2024/01/27 Add
      // 如是進入 BS_List 的第一次，則載入數據 
      if ( !this.isFirstEnterInBSListPage ) {
          
          this.getQueryBsList();                // 載入 BS List 數據
          this.isFirstEnterInBSListPage = true; // 切換該 Flag ( 表示已不是第一次進入該頁面 )
      } else {

        // @2024/01/28 Add
        // 如果不是第一次該頁面，則同步基站選中狀態 
        this.syncBasestationSelection();
      }
      
      // 否則不需要做任何事情，保留 displayAllBSFlag 和 selectedBsInfos 的狀態
    }

    // 輸出場域編輯類型的變更結果
    console.log("頁面切換後，顯示的 Field Edit 類型:", this.fieldEditType+
                  "\n Field Edit type displayed after tab switch:", this.fieldEditType );

    // 輸出當前選中的基站 ID
    console.log("In changefieldEditType(),\n 目前在場域內(被選中)的基站 id 目前有", this.selectedBsInfos )
    
    // 函數結束的日誌
    console.log( "changefieldEditType() - End,\n the window of field Edit is", this.fieldEditType );
  }

  // @2024/01/28 Add
  // 用於確保在顯示"BS List"頁前，每個 BS 的選中狀態與 selectedBsInfos 陣列同步
  private syncBasestationSelection() {
    // 遍歷當前顯示的 BS 列表
    this.displayedBasestations.forEach( bs => {
      // 更新每個 BS 的選中狀態，檢查它是否存在於 selectedBsInfos 陣列中
      // 如果基站的 id 與 selectedBsInfos 中某個元素的 id 相符，則將該基站的 selected 屬性設為 true
      bs.selected = this.selectedBsInfos.some( selectedBs => selectedBs.id === bs.id );
    });
  }

  queryBsList!: Subscription;
  bsList: BSList = {} as BSList;   // @2024/01/16 Add
  selectedBsInfos: Bsinfo[] = [];  // 用於存儲選中的基站 ID @2024/01/26 Add
  isGetQueryBsListLoading = false; // 用於表示加載 BS List 的 flag，初始設置為 false @2024/01/17 Add for Progress Spinner

  displayedBasestations: Basestation[] = [];    // 用於控制顯示於"場域編輯"頁面上的所有 BS 列表 @2024/01/25 Add
  BasestationsInField: Basestation[] = [];      // 用於存儲場域內的 BS  @2024/01/26 Add
  SortAllBasestationsInO1: Basestation[] = [];  // 用於存儲排序過 O1 內的所有 BS 列表 @2024/01/26 Add

  // Get the BS List in the O1 System @2024/01/26 Update
  getQueryBsList() {
    console.log('getQueryBsList() - Start');       // getQueryBsList() 啟動 
    console.log('Start fetching info of Bs List'); // 開始獲取 BS List 資訊
    clearTimeout(this.refreshTimeout);

    this.isGetQueryBsListLoading = true; // 開始顯示 Spinner 表載入 BS List 數據中

    // 檢查是否為 local 環境
    if ( this.commonService.isLocal ) { 
      // For testing with local files
      console.log('Start fetching BS List in Local'); // 開始獲取 Local BS List 資訊

      // 模擬從 Local files 獲取數據並初始化 selected 屬性
      this.bsList = this.bsList_LocalFiles.bsList_local;
      this.bsList.basestation.forEach(bs => {
        // 檢查每個基站是否存在於場域內的基站訊息中
        bs.selected = this.fieldInfo.bsinfo.some(fbs => fbs.id === bs.id);

        // 如果基站已被選中，並且它的 ID 還沒有在 selectedBsInfos 中，則創建一個新的 Bsinfo 對象並添加它
        if (bs.selected && !this.selectedBsInfos.some( bi => bi.id === bs.id )) {
          this.selectedBsInfos.push({ id: bs.id });
        }
      });

      console.log( "In getQueryBsList(),\n Local 目前在場域內(被選中)的基站 id 目前有", this.selectedBsInfos );

      console.log( 'BS List in Local:', this.bsList );

      // 初始化 BasestationsInField 為場域內的基站
      this.BasestationsInField = this.bsList.basestation.filter( bs => bs.selected );
      this.displayedBasestations = this.BasestationsInField; // 同步初始化顯示於 html 上

      
      // 使用 SortAllBSInO1 函數對 O1 內所有基站進行排序
      this.SortAllBasestationsInO1 = this.SortAllBSInO1( [...this.bsList.basestation] );
      
      this.isGetQueryBsListLoading = false; // 加載完成，隱藏 spinner

    } else {
      console.log('Start fetching BS List from API'); // 開始獲取 BS List 資訊

      // Use API_Field's queryBsList() to make an HTTP GET request
      this.queryBsList = this.API_Field.queryBsList().subscribe({
        next: ( res: BSList ) => {

          // 遍歷 API 傳回的基站列表 ( res.basestation )
          res.basestation.forEach( bs => {
            // 對每個 bs 進行檢查，確定是否它的 ID 出現在另一個陣列 ( this.fieldInfo.bsinfo ) 中，
            // 這個陣列包含了場域內的基站訊息。如果是，則將該 bs 的 'selected' 屬性設置為 true。
            bs.selected = this.fieldInfo.bsinfo.some( fbs => fbs.id === bs.id );

            // 檢查選中的基站是否已經存在於 selectedBsInfos 陣列中
            // 如果不存在，則創建一個新的 Bsinfo 對象並將其添加到陣列中
            if ( bs.selected && !this.selectedBsInfos.some( bi => bi.id === bs.id ) ) {
              this.selectedBsInfos.push({ id: bs.id });
            }
          });
          console.log("In getQueryBsList(),\n 目前在場域內(被選中)的基站 id 目前有", this.selectedBsInfos )

          this.bsList = res;
          console.log('基站列表資訊\n( BS List ):', this.bsList); // 取得的 BS List 資訊 ( Obtained BS List information )

          // 初始化 BasestationsInField 為場域內的基站
          this.BasestationsInField = this.bsList.basestation.filter( bs => bs.selected );
          this.displayedBasestations = this.BasestationsInField; // 同步初始化顯示於 html 上

          // 使用 SortAllBSInO1 函數對 O1 內所有基站進行排序
          this.SortAllBasestationsInO1 = this.SortAllBSInO1( this.bsList.basestation );
          
          this.isGetQueryBsListLoading = false; // 取得後隱藏 spinner
          //this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          console.error( '獲取基站列表資訊出錯:', error );
          console.error( 'Error fetching - BS List:', error );
          this.isGetQueryBsListLoading = false; // 出錯時也應隱藏 spinner
        },
        complete: () => {
          console.log('基站列表資訊獲取完成');
          console.log( 'BS List - fetch completed' );
          this.hideSpinner();  // 完成後隱藏 spinner
        }
      });
    }

    console.log('getQueryBsList() - End'); // getQueryBsList() end
  }


  displayAllBSFlag: boolean = false;     // false 表示顯示場域內 BS，true 表示切換後顯示全部 BS @2024/01/26 Add

  // 切換顯示所有基站的可見性 @2024/01/26 Add
  toggleAllBSVisibility() {

    // 切換旗標狀態
    this.displayAllBSFlag = !this.displayAllBSFlag;

    // 根據旗標狀態切換 displayedBasestations 的數據來源
    this.displayedBasestations = this.displayAllBSFlag 
                                ? this.SortAllBasestationsInO1 
                                : this.BasestationsInField;
  }

  // 顯示所有 BS 時用的排序函數 @2024/01/26 Add
  // SortAllBSInO1 函數接受一個 Basestation 類型的陣列作為參數，
  // 如果沒有傳入參數，則預設為一個空陣列。
  SortAllBSInO1( sortBasestations: Basestation[] = [] ) {
    console.log( "已觸發 SortAllBSInO1()" );

    // 對傳入的 sortBasestations 陣列進行排序
    sortBasestations.sort( ( a, b ) => {
      // 首先比較基站的狀態。如果 a 基站的狀態為 0 或 1（ 紅燈狀態，代表有問題或不可用 ），
      // 而 b 基站的狀態不是 0 或 1，則 a 應該排在 b 之前（ -1 表示 a 在排序中應該出現在 b 之前 ）。
      if (( a.status === 0 || a.status === 1 ) && ( b.status !== 0 && b.status !== 1 )) {
        return -1;
      } else if (( b.status === 0 || b.status === 1 ) && ( a.status !== 0 && a.status !== 1 )) {
        // 如果 b 基站的狀態為 0 或 1 而 a 不是，則 b 應該排在 a 之前。
        return 1;
      }

      // 如果基站 a 和 b 的狀態相同，則進一步比較它們是否被選中（ selected ）。
      // 如果 a 被選中而 b 沒有，則 a 應排在 b 之前。
      if ( a.selected && !b.selected ) {
        return -1;
      } else if ( b.selected && !a.selected ) {
        // 如果 b 被選中而 a 沒有，則 b 應排在 a 之前。
        return 1;
      }

      // 如果基站 a 和 b 的狀態以及選中狀況相同，則根據它們在原始 bsList.basestation 陣列中的順序進行排序。
      // 找到 a 和 b 在原始陣列中的索引，並返回它們的差值，這將保持它們的原始順序。
      return this.bsList.basestation.findIndex( bs => bs.id === a.id ) - this.bsList.basestation.findIndex( bs => bs.id === b.id );
    });

    // 返回排序後的陣列
    return sortBasestations;
  }

  // @2024/01/26 Update
  // 當用戶改變基站選中狀態的事件處理函數 
  // 更新單一基站的選擇狀態，同時更新 selectedBsInfos 陣列
  onBsSelectionChange( bsId: string, event: Event ) {

    // 從事件獲取 Checkbox 的選中狀態
    const isChecked = ( event.target as HTMLInputElement ).checked;

    // 檢查 Checkbox 是否被勾選
    if ( isChecked ) {

      // 如果 Checkbox 被勾選，進行檢查以確定該基站 ID 是否不在 selectedBsInfos 陣列中
      if ( !this.selectedBsInfos.some( bi => bi.id === bsId ) ) {

        // 如果該 ID 不在陣列中，則將其添加到陣列中
        this.selectedBsInfos.push({ id: bsId });
      }
    } else {
      
      // 如果 Checkbox 沒有被勾選，從 selectedBsInfos 陣列中移除對應的基站 ID
      this.selectedBsInfos = this.selectedBsInfos.filter( bi => bi.id !== bsId );
    }

    // 輸出當前所有被選中的基站的 ID
    console.log( "In onBsSelectionChange(),\n 所有被選中的基站訊息現在有", this.selectedBsInfos );

    // 這裡可以添加額外的邏輯，比如將選中狀態的改變發送到伺服器等
  }


  updateField!: Subscription;
  /** @2024/02/01 Update
   * 提交場域編輯訊息。
   * 如果是本地模式，則模擬數據更新過程；
   * 如果不是本地模式，則向伺服器發送更新請求。
   */
  UpdateFieldEditing_Submit() {
    console.log( "UpdateFieldEditing_Submit() - Start" );

    // 準備提交的數據，按照 ForUpdateField 介面格式化
    const submitData: ForCreateOrUpdateField = {
      // 使用者通過表單界面可調整的部分
      fieldposition1: `[${this.fieldEditForm.value.fieldBound_East},${this.fieldEditForm.value.fieldBound_North}]`,
      fieldposition2: `[${this.fieldEditForm.value.fieldBound_West},${this.fieldEditForm.value.fieldBound_North}]`,
      fieldposition3: `[${this.fieldEditForm.value.fieldBound_West},${this.fieldEditForm.value.fieldBound_South}]`,
      fieldposition4: `[${this.fieldEditForm.value.fieldBound_East},${this.fieldEditForm.value.fieldBound_South}]`,
      name: this.fieldEditForm.value.fieldName,  // 從表單中獲取場域名稱
      bsinfo: this.selectedBsInfos,              // 從先前的選擇中獲取基站訊息
      phone: this.fieldEditForm.value.phoneNumber, // 從表單中獲取聯絡電話

      // 使用者不能調整但需提交的部分
      session: this.sessionId,  // 使用當前會話 ID
      id: this.fieldInfo.id,    // 使用場域的唯一識別符
    };

    // 檢查是否在本地模式運行
    if ( this.commonService.isLocal ) {

        // 在本地模式下模擬場域更新
        console.log( "本地模擬場域更新，提交的數據:", submitData );

        // 模擬一個響應
        setTimeout(() => {
          console.log( "本地場域更新成功" );

          // 更新成功後重新獲取場域訊息
          this.getQueryFieldInfo();

        }, 1000 ); // 假設 1 秒後獲得響應

    } else {

        // 非本地模式，向服務器發送 POST 請求
        this.updateField = this.API_Field.updateField( submitData ).subscribe({

          next: ( response ) => {

            // 處理成功響應
            console.log( "場域更新成功:", response );
            
            // 更新成功後重新獲取場域訊息
            this.getQueryFieldInfo();
           // this.getfieldImage_forFieldEdit();
          },
          error: ( error ) => {
            // 處理錯誤響應
            console.error( "更新場域出錯:", error );
          }
        });
    }

    // The end:
    this.fieldEditWindowRef.close(); // 關閉場域編輯視窗
    this.fieldEditForm.reset();      // 重置整個場域編輯表單

    console.log("UpdateFieldEditing_Submit() - End");
  }

  // 點擊 field Edit 視窗的 Cancel 按鈕行為 @2024/01/28 Add
  resetFieldEditingForm( fieldName: string ) {
    console.log(`Edit for Field -'${fieldName}' has been cancelled.`);

    this.fieldEditWindowRef.close(); // 關閉場域編輯視窗
    this.fieldEditForm.reset();      // 重置整個場域編輯表單
  }

  // 用於控制 field Edit 確認視窗 @2024/01/28 Add
  @ViewChild('confirmFieldEditWindow') confirmFieldEditWindow: any;
  confirmFieldEditWindow_Ref!: MatDialogRef<any>;
  confirmFieldEditWindow_Validated = false;

  // 開啟確認視窗 - 場域編輯 @2024/01/28 Add
  openConfirmFieldEditWindow() {
    this.confirmFieldEditWindow_Validated = false;
    this.confirmFieldEditWindow_Ref = this.dialog.open(this.confirmFieldEditWindow, {
      id: 'confirmFieldEditWindow',
      // width 和 height 可以根據需要設置或去掉
      // width: '300px', 
      // height: '200px'
    });

    // 訂閱對話框關閉後的事件
    this.confirmFieldEditWindow_Ref.afterClosed().subscribe(() => {
      // 這裡可以添加當對話框關閉後的邏輯
      this.confirmFieldEditWindow_Validated = false;
    });
  }


  // For upload Field Image @2024/01/18 Add
  @ViewChild('fileInput') fileInput!: ElementRef;

  // For upload Field Image @2024/01/18 Add
  triggerFileInput() {
    // 觸發文件輸入元素的點擊事件
    this.fileInput.nativeElement.click();
  }

  uploadFieldImage!: Subscription;

  // For upload Field Image @2024/01/18 Add
  // 當在前端選擇了檔案後觸發的事件處理函數，通常用於上傳檔案
  onFileSelected( event: any ) {
    // 從事件中獲取到選擇的檔案
    const file = event.target.files[0];
    
    // 如果檔案存在
    if ( file ) {
      // 設置加載狀態為 true，通常用來顯示一個載入指示器
      this.isFieldImageOnFieldEditLoading = true;
      
      // 調用 API 服務上傳檔案，傳遞場域 ID 和選擇的檔案
      this.uploadFieldImage = this.API_Field.uploadFieldImage( this.fieldId, file ).subscribe({
        next: ( response ) => {

          // 如上傳成功，打印成功訊息和響應
          console.log( 'Image uploaded successfully', response );
          
          // 調用 getfieldImage_forFieldEdit 方法來獲取最新的場域圖像
          this.getfieldImage_forFieldEdit();
          
          // 上傳完成後設置加載狀態為 false，隱藏載入指示器
          this.isFieldImageOnFieldEditLoading = false;
        },
        error: ( error ) => {

          // 如上傳過程中出現錯誤，打印錯誤訊息
          console.error( 'Error uploading image', error );
          
          // 這裡可以處理上傳失敗的邏輯，例如顯示錯誤訊息
          this.isFieldImageOnFieldEditLoading = false;  // 錯誤發生時也應停止顯示載入指示器
        }
      });
    }
  }


  // 用於控制室內(場域)圖片刪除確認視窗 @2024/01/19 Add
  @ViewChild('confirmDeleteWindow_For_fieldEdit') confirmDeleteWindow_For_fieldEdit: any;
  confirmDeleteWindow_For_fieldEdit_Ref!: MatDialogRef<any>;
  confirmDeleteWindow_For_fieldEdit_Validated = false;

  // 開啟確認視窗 - 室內(場域)圖片刪除 @2024/01/19 Add
  openConfirmDeleteWindow_For_fieldEdit() {

    this.confirmDeleteWindow_For_fieldEdit_Validated = false;
    this.confirmDeleteWindow_For_fieldEdit_Ref = this.dialog.open( this.confirmDeleteWindow_For_fieldEdit, { 
      id: 'confirmDeleteWindow_For_fieldEdit',
      // width: '300px', 
      // height: '650px'
    } );
    this.confirmDeleteWindow_For_fieldEdit_Ref.afterClosed().subscribe(() => {
      this.confirmDeleteWindow_For_fieldEdit_Validated = false;
    });
  }

  removeFieldImage!: Subscription;

  // 用於記錄 Local 環境下圖片的刪除狀態 @2024/01/24 Add
  removeImageInLocal_flag: boolean = false;

  // 刪除顯示室內(場域)圖片 @2024/01/28 Update
  removeIndoorImage() {

    this.isFieldImageOnFieldEditLoading = true;
    
    if ( this.activeButton_fieldImage ) {
      // 檢查 Field Image 按鈕是否有被激活。
      this.setActiveButton_fieldImage( this.activeButton_fieldImage ); // 有就傳入該 button ID 同步移除場域區域上的 Overlay
    }

    if ( this.commonService.isLocal ) { // 新增如為 Local 模式的處理

      this.displayNoImageMessage();                 // 顯示沒有圖片的提示訊息
      this.removeImageInLocal_flag = true;          // 將 Local 環境下圖片的刪除狀態設為 true
      this.isFieldImageOnFieldEditLoading = false;  // 停止顯示 Spinner

    } else {

      this.removeFieldImage = this.API_Field.removeFieldImage( this.fieldId ).subscribe({
        next: () => {
          // 刪除成功，重新獲取圖片顯示狀態
          this.getfieldImage_forFieldEdit();
          this.isFieldImageOnFieldEditLoading = false;  // 停止顯示 Spinner
        },
        error: (error) => {
          console.error('Failed to remove image:', error);
          this.isFieldImageOnFieldEditLoading = false;  // 停止顯示 Spinner
        }
      });  
    }
  }

  // @2024/01/24 Update
  // 獲取並顯示場域圖片 (場域編輯用)
  isFieldImageOnFieldEditLoading: boolean = false;  // 用於控制載入室內圖片時的進度條
  imageSrcLocal: string = './assets/img/fieldImage_for_local.png'; // 用於保存本地圖片路徑 @2024/01/23 Add
  getfieldImage_forFieldEdit() {

    this.showLoadingSpinner(); 

    if ( this.commonService.isLocal ) { // 檢查是否為使用 local files

      console.log( "is local in getfieldImage_forFieldEdit");
      this.isFieldImageOnFieldEditLoading = true;

      // 直接將本地圖片路徑賦值給 imageSrcLocal
      this.imageSrcLocal = './assets/img/fieldImage_for_local.png';

      this.have_FieldImage_flag = true; // 註記為有圖片

      // 重置記錄 Local 環境下圖片的刪除狀態
      this.removeImageInLocal_flag = false; // @2024/01/24 Add

      this.isFieldImageOnFieldEditLoading = false; // 載入 local 圖片完也停止顯示 Spinner
      this.hideSpinner();  // 完成後隱藏 spinner

    } else { // 如非使用 local files

      //this.isFieldImageOnFieldEditLoading = true;

      // 從後端 API 獲取場域圖片
      this.queryFieldImage = this.API_Field.queryFieldImage( this.fieldId ).subscribe({
        next: ( response ) => {
          // 處理 Base64 編碼的圖片
          if ( response && response.fieldImage ) {
            const imageSrc = 'data:image/png;base64,' + response.fieldImage;
            this.displayFieldImageOnFieldEdit( imageSrc ); // 顯示圖片
            //this.isFieldImageOnFieldEditLoading = false; // 載入完成停止顯示 Spinner
          } else {
            // 如果沒有圖片，則顯示提示訊息
            this.displayNoImageMessage();
            //this.isFieldImageOnFieldEditLoading = false;   // 載入完成停止顯示 Spinner
          }
            //this.isFieldImageOnFieldEditLoading = false;   // 載入完成停止顯示 Spinner
            this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: (error) => {
          console.error('Error fetching field image:', error);
          // 出錯時，也顯示提示訊息
          this.displayNoImageMessage();
          this.hideSpinner();  // 完成後隱藏 spinner
          //this.isFieldImageOnFieldEditLoading = false;  // 載入出錯也停止顯示 Spinner
        }
      });
    }
  }

  // @2024/01/18 Add
  // 用於顯示場域圖片於場域編輯中 
  have_FieldImage_flag: boolean = false;  // 用於標記是否有場域圖片
  displayFieldImageOnFieldEdit( FieldImage_imageSrc: string ) {
    const imageElement = document.getElementById('uploadedImage') as HTMLImageElement;
    const noImageMessageElement = document.getElementById('noImageMessage') as HTMLElement;

    this.isFieldImageOnFieldEditLoading = true;
    if ( FieldImage_imageSrc ) {
      imageElement.src = FieldImage_imageSrc;
      imageElement.style.display = 'block'; // 顯示圖片
      noImageMessageElement.style.display = 'none'; // 隱藏提示訊息
      this.have_FieldImage_flag = true; // 註記為有圖片
    } else {
      this.displayNoImageMessage();
    }
    this.isFieldImageOnFieldEditLoading = false;
  }

  // 顯示沒有圖片的提示訊息 @2024/01/18 Add
  displayNoImageMessage() {
    const imageElement = document.getElementById('uploadedImage') as HTMLImageElement;
    const noImageMessageElement = document.getElementById('noImageMessage') as HTMLElement;

    // this.isFieldImageOnFieldEditLoading = true;
    if ( imageElement && noImageMessageElement ) {
      imageElement.style.display = 'none';           // 隱藏圖片
      noImageMessageElement.style.display = 'block'; // 顯示提示訊息
    }
    this.have_FieldImage_flag = false; // 註記為未有圖片
    // this.isFieldImageOnFieldEditLoading = false;
  }

// For Field Editing Setting @2024/01/11 Add ↑


// For PM Parameter Setting @2024/02/24 Update ↓

  PmFtpInfo: ForQueryOrUpdatePmFTPInfo = {} as ForQueryOrUpdatePmFTPInfo; // 用於儲存"效能參數"的設定資訊 @2024/02/15 Add

  measurementType: string = ""; // 用於控制"量測類型"的選擇，預設為 "" ( off ) @2024/02/16 Add

  queryPmFtpInfo!: Subscription;

  // @2024/02/22 Add for Progress Spinner
  getQueryPmFtpInfo_Loading = false; // 用於識別載入"效能管理參數設定"資訊的標誌，初始設置為 false 

  // 用於取得"效能管理參數設定"資訊 @2024/02/24 Update
  getQueryPmFtpInfo() {
    console.log('getQueryPmFtpInfo() - Start'); // 獲取效能參數設定資訊 - 啟動

    this.getQueryPmFtpInfo_Loading = true; // 顯示 Loading Progress Spinner @2024/02/22 Add
    this.showLoadingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) { // 檢查是否為使用 Local files
      console.log('Fetching PM FTP Info from local files');       // 從 Local files 獲取 PM FTP 資訊
      
      // 從 local 數組中尋找匹配當前 fieldId 的對象
      const matchedInfo = this.pmFtpInfo_LocalFiles.pmFtpInfo_local.find( info => info.id === this.fieldId );
      
      if ( matchedInfo ) { // 如果找到匹配的對象
        this.PmFtpInfo = matchedInfo; // 賦值找到的對象到 this.PmFtpInfo
        console.log('PM FTP Info from Local:', this.PmFtpInfo); // 輸出匹配的 PM FTP 資訊

        // @2024/02/22 Update
        if ( this.PmFtpInfo ) { // 確保"效能參數"的設定資訊已獲取

          this.PMgmtParameterSetForm.patchValue({ // 使用現有"效能參數"填入表單
            pmIP: this.PmFtpInfo.ftpip,
            pmID: this.PmFtpInfo.ftpid,
            pmKey: this.PmFtpInfo.ftpkey,
            folderPath: this.PmFtpInfo.folderpath,
            MeasurementInterval_pmint: this.PmFtpInfo.pmint,
            UploadInterval_fmint: this.PmFtpInfo.fmint,    
            // "量測類型"欄位，依據傳回值判定，要設定甚麼值給該欄位便於預設選擇的 Radio Button
            measurementType: this.PmFtpInfo.metric !== "" && this.PmFtpInfo.metric !== "default" ? 'selfDefined' : this.PmFtpInfo.metric 
          });

          // @2024/02/22 Add
          // 檢測 PmFtpInfo.metric 其值是否同時不為 "default" 與 "" 
          if ( this.PmFtpInfo.metric !== "default" && this.PmFtpInfo.metric !== "" ) { 
            this.initializeSelfDefinedParameters( this.PmFtpInfo.metric ); // 如符合該條件即表示量測類型為自定義模式，因此進行初始化自定義參數 
          }
        }

      } else {
        console.error( 'No matching PM FTP Info found for fieldId:', this.fieldId ); // 如果沒有找到匹配的對象，輸出錯誤
      }

      this.getQueryPmFtpInfo_Loading = false; // 不管是否找到匹配對象，停止 Loading Progress Spinner @2024/02/22 Add
      this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

    } else {
      console.log( 'Fetching PM FTP Info from API '); // 從 API 獲取 PM FTP 資訊

      this.queryPmFtpInfo = this.API_Field.queryPmFtpInfo( this.fieldId ).subscribe({
        next: ( res: ForQueryOrUpdatePmFTPInfo ) => {
          console.log('Fetched PM FTP Info from API:', res); // 從 API 獲取的 PM FTP 資訊
          this.PmFtpInfo = res; // 更新 PM FTP 資訊
          
          // @2024/02/22 Update
          if ( this.PmFtpInfo ) { // 確保"效能參數"的設定資訊已獲取

            // 使用現有"效能參數"填入表單
            this.PMgmtParameterSetForm.patchValue({
              pmIP: this.PmFtpInfo.ftpip,
              pmID: this.PmFtpInfo.ftpid,
              pmKey: this.PmFtpInfo.ftpkey,
              folderPath: this.PmFtpInfo.folderpath,
              MeasurementInterval_pmint: this.PmFtpInfo.pmint,
              UploadInterval_fmint: this.PmFtpInfo.fmint,
              // "量測類型"欄位，依據傳回值判定，要設定甚麼值給該欄位便於預設選擇的 Radio Button
              measurementType: this.PmFtpInfo.metric !== "" && this.PmFtpInfo.metric !== "default" ? 'selfDefined' : this.PmFtpInfo.metric
            });

            // @2024/02/22 Add
            // 檢測 PmFtpInfo.metric 其值是否同時不為 "default" 與 "" 
            if ( this.PmFtpInfo.metric !== "default" && this.PmFtpInfo.metric !== "" ) { 
              this.initializeSelfDefinedParameters( this.PmFtpInfo.metric ); // 如符合該條件即表示量測類型為自定義模式，因此進行初始化自定義參數 
            }
          }     

          this.getQueryPmFtpInfo_Loading = false; // 取得後停止 Loading Progress Spinner @2024/02/22 Add
          this.hideSpinner();  // 完成後隱藏 spinner
        },
        error: ( error ) => {
          console.error( 'Error fetching PM FTP Info:', error ); // 獲取 PM FTP 資訊出錯
          this.getQueryPmFtpInfo_Loading = false; // 取得後停止 Loading Progress Spinner @2024/02/22 Add
          this.hideSpinner();  // 出錯時隱藏 spinner
        },
        complete: () => {
          console.log( 'PM FTP Info fetch completed' );          // PM FTP 資訊獲取完成
          //this.getQueryPmFtpInfo_Loading = false; // 取得後停止 Loading Progress Spinner @2024/02/22 Add
        }
      });
    }

    console.log('getQueryPmFtpInfo() - End'); // 獲取效能參數設定資訊 - 結束
  }


  // 創建表單組，用於"效能管理參數設定"
  PMgmtParameterSetForm!: FormGroup;

  // @2024/02/16 Update - 新增"量測類型"欄位的表單控件
  createPMgmtParameterSetForm() {
    // 初始化表單控件
    this.PMgmtParameterSetForm = this.fb.group({
                           pmIP: new FormControl( this.PmFtpInfo?.ftpip || '' ),       // PM 伺服器 IP 位址，預設值為現有 IP 位址 或 空字串
                           pmID: new FormControl( this.PmFtpInfo?.ftpid || '' ),       // 基站登入 PM 伺服器帳號，預設值為現有 帳號 或 空字串
                          pmKey: new FormControl( this.PmFtpInfo?.ftpkey || '' ),      // 基站登入 PM 伺服器密碼，預設值為現有 密碼 或 空字串
                     folderPath: new FormControl( this.PmFtpInfo?.folderpath || '' ),  // 資料夾路徑，預設值為現有 資料夾路徑 或 空字串
      MeasurementInterval_pmint: new FormControl( this.PmFtpInfo?.pmint || '' ),       // PM 資料量測頻率(秒)，預設值為現有 量測頻率 或 空字串
           UploadInterval_fmint: new FormControl( this.PmFtpInfo?.fmint || '' ),       // PM 資料上傳頻率(秒):，預設值為現有 上傳頻率 或 空字串
                measurementType: new FormControl( this.PmFtpInfo?.metric || '' ),      // "量測類型"欄位的表單控件，預設值為現有 量測類型 或 空字串 ( 表 off ) @2024/02/16 Add
          selfDefinedParameters: new FormArray([]),                                    // 輸入自定義參數用的 FormArray @2024/02/21 Add
    });
  }

  // @2024/02/15 Add
  // 用於控制密碼顯示的狀態( 預設為隱藏 ) 
  hidePassword: boolean = true;

  // 用於控制是否顯示密碼 @2024/02/15 Add
  togglePasswordVisibility(): void {
    // 切換 hidePassword 狀態來顯示或隱藏密碼
    this.hidePassword = !this.hidePassword;
  }

  // @2024/02/20 Add
  // 確保您有一個 getter 來獲取自定義參數的 FormArray
  get selfDefinedParameters(): FormArray {
    return this.PMgmtParameterSetForm.get( 'selfDefinedParameters' ) as FormArray; // 從表單中獲取名為 'selfDefinedParameters' 的 FormArray
  }

  // 處理自定義參數的初始化 @2024/02/22 Add
  initializeSelfDefinedParameters( metric: string ) {
    const selfDefinedParametersControl = this.PMgmtParameterSetForm.get('selfDefinedParameters') as FormArray;
    
    // 清除現有的 FormGroup
    while (selfDefinedParametersControl.length !== 0) {
      selfDefinedParametersControl.removeAt( 0 );
    }
    
    // 分割 metric 並為每個參數添加新的 FormGroup
    if ( metric && metric !== "default" && metric !== "" ) {
      metric.split(',').forEach(( metricValue ) => {
        const group = this.fb.group({
          'selfDefinedParameter_input': [metricValue, Validators.required] // 確保名稱與模板中的 formControlName 一致
        });
        selfDefinedParametersControl.push( group );
      });
    }
  }

  // 用來暫存自定義參數的值 @2024/02/26 Add
  temporarySelfDefinedParameters: string = "";

  // @2024/02/26 Update
  // 處理量測類型選擇的變化，並根據選擇的量測類型更新表單狀態
  logClickMeasurementType(value: string) {
    this.measurementType = value; // 更新當前選擇的量測類型

    // 如果用戶選擇了自定義量測類型
    if (value === "selfDefined") {
      // 檢查是否已存在自定義參數的輸入框
      if (this.selfDefinedParameters.length === 0) {
        // 如果暫存中有自定義參數值，則使用這些值初始化表單
        if (this.temporarySelfDefinedParameters) {
          this.initializeSelfDefinedParameters(this.temporarySelfDefinedParameters);
        } else {
          // 如果沒有暫存值，則添加一個空的自定義參數輸入框
          this.addSelfDefinedParameterInput();
        }
      } else {
        // 如果已經有輸入框，並且存在先前的自定義參數值，則重新初始化這些參數
        this.initializeSelfDefinedParameters(this.PmFtpInfo.metric);
        // 將當前的自定義參數值保存到暫存變數中
        this.temporarySelfDefinedParameters = this.PmFtpInfo.metric;
      }
    } else if (value !== "selfDefined") {
      // 如果用戶沒有選擇自定義量測類型，則清空所有自定義參數輸入框
      while (this.selfDefinedParameters.length !== 0) {
        this.removeSelfDefinedParameterInput(0);
      }
    }

    // 輸出當前選擇的量測類型
    if (this.measurementType === "") {
      console.log('Selected Measurement Type: Off');
    } else {
      console.log('Selected Measurement Type:', this.measurementType);
    }
  }

  // @2024/02/26 Update
  // 添加新的自定義參數輸入框
  addSelfDefinedParameterInput() {
    const selfDefinedParameters = this.PMgmtParameterSetForm.get('selfDefinedParameters') as FormArray;
    // 創建新的 FormGroup 以保存自定義參數輸入值
    const group = new FormGroup({
      'selfDefinedParameter_input': new FormControl('', Validators.required)
    });
    // 將新的 FormGroup 加入到 FormArray 中
    selfDefinedParameters.push(group);
  }

  // @2024/02/26 Update
  // 刪除指定索引的自定義參數輸入框
  removeSelfDefinedParameterInput(index: number) {
    const selfDefinedParameters = this.PMgmtParameterSetForm.get('selfDefinedParameters') as FormArray;
    // 從 FormArray 中移除指定的 FormGroup
    selfDefinedParameters.removeAt(index);
  }


  // 引用"效能管理參數設定"視窗組件
  @ViewChild('PMgmtParameterSetWindow') PMgmtParameterSetWindow: any;
  PMgmtParameterSetWindowRef!: MatDialogRef<any>;
  PMgmtParameterSetFormValidated = false;

  // @2024/02/22 Update
  // 打開"效能管理參數設定"視窗
  openPMgmtParameterSetWindow() {

    this.measurementType = ""; // 先重置用於控制顯示"自定義參數輸入欄位"的變數

    this.createPMgmtParameterSetForm();   // For Pm Ftp Info in PM Parameter Setting  @2024/02/04 Add

    this.getQueryPmFtpInfo();  // 取得"效能管理參數設定"資訊
    
    console.log("In openPMgmtParameterSetWindow() - this.PmFtpInfo = ", this.PmFtpInfo);

    // 確保"效能參數"的設定資訊已獲取
    if( this.PmFtpInfo ) {

      // 使用現有"效能參數"填入表單
      this.PMgmtParameterSetForm.patchValue({
                             pmIP: this.PmFtpInfo.ftpip,
                             pmID: this.PmFtpInfo.ftpid,
                            pmKey: this.PmFtpInfo.ftpkey,
                       folderPath: this.PmFtpInfo.folderpath,
        MeasurementInterval_pmint: this.PmFtpInfo.pmint,
             UploadInterval_fmint: this.PmFtpInfo.fmint,
                  // "量測類型"欄位，依據傳回值判定，要設定甚麼值給該欄位便於預設選擇的 Radio Button
                  measurementType: this.PmFtpInfo.metric !== "" && this.PmFtpInfo.metric !== "default" ? 'selfDefined' : this.PmFtpInfo.metric
      });

      // 根據 PmFtpInfo.metric 的值正確設置 measurementType
      if ( this.PmFtpInfo.metric === "default" || this.PmFtpInfo.metric === "" ) {
        // 如果是 "default" 或空字符串，則將 measurementType 設置為 PmFtpInfo.metric 的值
        this.measurementType = this.PmFtpInfo.metric;
      } else {
        // 如果有自定義度量值，將 measurementType 設置為 'selfDefined'
        this.measurementType = 'selfDefined';
      }

      //console.log("In openPMgmtParameterSetWindow() - this.measurementType = ", this.measurementType);
      
      // 透過前面取得的 measurementType 值來傳入 logClickMeasurementType()
      this.logClickMeasurementType( this.measurementType );
    }

    // 表單驗證狀態重置
    this.PMgmtParameterSetFormValidated = false; 

    // 打開"效能管理參數設定"視窗
    this.PMgmtParameterSetWindowRef = this.dialog.open( this.PMgmtParameterSetWindow, { 
          id: 'PMgmtParameterSetWindow',
          // 自定義視窗寬高設置
          // width: '800px', 
          // height: '650px'
    } );

    // 訂閱視窗關閉事件，並在關閉時重置表單驗證狀態
    this.PMgmtParameterSetWindowRef.afterClosed().subscribe(() => {
      this.PMgmtParameterSetFormValidated = false;
    });

  }

  // @2024/02/15 Add
  // 點擊 PMgmt Parameter Setting 視窗的 Cancel 按鈕行為
  resetPMgmtParameterSetForm() {
    console.log(`Set for PM Parameter has been cancelled.`);

    this.PMgmtParameterSetWindowRef.close(); // 關閉"效能管理參數設定"視窗
    this.PMgmtParameterSetForm.reset();      // 重置整個"效能管理參數設定"表單
  }

  // 用於控制 PMgmt Parameter Setting 確認視窗 @2024/02/15 Add
  @ViewChild('confirmPMgmtParameterSetWindow') confirmPMgmtParameterSetWindow: any;
  confirmPMgmtParameterSetWindow_Ref!: MatDialogRef<any>;
  confirmPMgmtParameterSetWindow_Validated = false;

  // 開啟確認視窗 - 效能管理參數設定 @2024/02/15 Add
  openConfirmPMgmtParameterSetWindow() {
    this.confirmPMgmtParameterSetWindow_Validated = false;
    this.confirmPMgmtParameterSetWindow_Ref = this.dialog.open( this.confirmPMgmtParameterSetWindow, {
      id: 'confirmPMgmtParameterSetWindow',
      // width 和 height 可以根據需要設置或去掉
      // width: '300px', 
      // height: '200px'
    });

    // 訂閱對話框關閉後的事件
    this.confirmPMgmtParameterSetWindow_Ref.afterClosed().subscribe(() => {
      // 這裡可以添加當對話框關閉後的邏輯
      this.confirmPMgmtParameterSetWindow_Validated = false;
    });
  }

  updatePmFtpInfo!: Subscription;

  // @2024/02/24 Update
  // 提交 PMgmt Parameter Setting 參數更新用
  UpdatePMParameterSetting_Submit() {
    console.log("UpdatePMParameterSetting_Submit() - Start");
    this.getQueryPmFtpInfo_Loading = true; // 顯示 Loading Progress Spinner @2024/02/22 Add
    this.showLoadingSpinner();   // 顯示 Loading Spinner

    let metricValue; // 宣告變數來儲存將要提交的 metric 值

    // 根據量測類型來決定 metric 值的內容
    if (this.measurementType === 'selfDefined') {
      // 收集自定義參數，並將它們轉換為逗號分隔的字符串
      metricValue = this.selfDefinedParameters.value
        .map((param: { selfDefinedParameter_input: string }) => param.selfDefinedParameter_input)
        .join(',');
    } else {
      // 如果不是自定義參數，則使用 measurementType 的值作為 metric
      metricValue = this.measurementType;
    }
  
    // 準備提交的數據，格式化為適合 API 的格式
    const submitData: any = {
      // 從 PMgmtParameterSetForm 表單中獲取值
      ftpip: this.PMgmtParameterSetForm.value.pmIP,
      ftpid: this.PMgmtParameterSetForm.value.pmID,
      ftpkey: this.PMgmtParameterSetForm.value.pmKey,
      folderpath: this.PMgmtParameterSetForm.value.folderPath,
      pmint: this.PMgmtParameterSetForm.value.MeasurementInterval_pmint,
      fmint: this.PMgmtParameterSetForm.value.UploadInterval_fmint,
      metric: metricValue, // 使用條件判斷後的 metric 值
      
      // 使用者不能調整但需提交的部分
      session: this.sessionId,  // 使用當前會話 ID
      id: this.fieldInfo.id,    // 使用場域的唯一識別符
    };
  
    if ( this.commonService.isLocal ) {
      // 本地模式下的處理
      console.log( "本地模擬更新效能參數設定，提交的數據:", submitData );

      // 更新後，重新取得"效能管理參數設定"資訊
      this.getQueryPmFtpInfo();  

      this.getQueryPmFtpInfo_Loading = false;  // 更新完成後停止 Loading Progress Spinner @2024/02/22 Add
      this.PMgmtParameterSetWindowRef.close(); // 更新讀取完後，關閉效能參數設定視窗
      this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

    } else {

      console.log( "呼叫實際 API 前，更新效能參數設定所提交的數據:", submitData );

      // 向伺服器發送更新請求
      this.updatePmFtpInfo = this.API_Field.updatePmFtpInfo( submitData ).subscribe({
        next: ( response ) => {
          console.log( "效能參數設定更新成功:", response );

          // 更新後，重新取得"效能管理參數設定"資訊
          this.getQueryPmFtpInfo();  

          this.getQueryPmFtpInfo_Loading = false; // 更新完成後停止 Loading Progress Spinner @2024/02/22 Add
          this.PMgmtParameterSetWindowRef.close(); // 更新讀取完後，關閉效能參數設定視窗
          this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

        },
        error: ( error ) => {
          console.error( "更新效能參數設定出錯:", error );
          this.getQueryPmFtpInfo_Loading = false;  // 更新失敗也停止 Loading Progress Spinner @2024/02/22 Add
          // this.PMgmtParameterSetWindowRef.close(); // 更新失敗也關閉效能參數設定視窗
          this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner
        },
      });
    }
  
    // 結束處理
    this.PMgmtParameterSetForm.reset();      // 重置效能參數設定表單

    console.log("UpdatePMParameterSetting_Submit() - End");
  }
  

// For PM Parameter Setting @2024/02/24 Update ↑



// For 場域效能報表 @2024/06/03 Update ↓

  // 用於控制 場域效能報表 視窗 @2024/03/30 Add
  @ViewChild('fieldPMReportWindow') fieldPMReportWindow: any;
  fieldPMReportWindow_Ref!: MatDialogRef<any>;
  fieldPMReportWindow_Validated = false;

  // 定義頁籤類型 @2024/05/27 Add
  fieldPMReportType: string = 'Performance_Overview'; // 預設顯示 "效能總攬" 頁面

  // @2024/05/31 Update
  // 打開場域效能分析視窗
  openfieldPMReportWindow() {

    this.fieldPMReportType = 'Performance_Overview'; // 每次打開視窗都預設顯示 "場域效能總覽" 頁面
    this.updateDropdownOptions();     // 刷新下拉選單選項
    this.selectedKpiCategory = "Accessibility";       // 預設 "KPI 類別" 選擇 Accessibility
    this.selectedKpiSubcategory= "DRB Accessibility"; // 預設 "KPI 子類別" 選擇 DRB Accessibility
    this.prepareAndUpdateChartData(); // 用新數據刷新圖表

    // 表單驗證狀態重置
    this.fieldPMReportWindow_Validated = false; 

    // 打開場域效能分析視窗
    this.fieldPMReportWindow_Ref = this.dialog.open( this.fieldPMReportWindow, { 
        id: 'fieldPMReportWindow',
        // 自定義視窗寬高設置
        // width: '800px', 
        // height: '650px'
    });

    // 訂閱視窗關閉事件
    this.fieldPMReportWindow_Ref.afterClosed().subscribe(() => {
        this.fieldPMReportType = 'Performance_Overview'; // 重置頁籤
        this.fieldPMReportWindow_Validated = false;      // 重置表單驗證狀態
    });

    console.log( "Open the window of field PM Report's page is:", this.fieldPMReportType );
  

  }

  // @2024/05/27 Add
  // 處理場域效能分析彈出視窗的頁籤切換函數
  changeFieldPMReportType( e: MatButtonToggleChange ) {
      console.log("changefieldPMReportType() - Start");

      // 根據用戶當前的選擇來設定頁籤顯示的類型
      if ( e.value === 'Performance_Overview' ) {
          this.fieldPMReportType = 'Performance_Overview';
      } else if ( e.value === 'Performance_History' ) {
          this.fieldPMReportType = 'Performance_History';
      }

      // 輸出頁籤切換結果
      console.log( "頁籤切換後顯示的類型:", this.fieldPMReportType );
      console.log("changefieldPMReportType() - End");
  }


  kpiCategories: KpiCategory[] = [];       // 定義 KPI 類別的選項
  kpiSubcategories: KpiSubcategory[] = []; // 定義 KPI 子類別的選項  
  selectedKpiCategory: string = "";        // 當前選擇的 KPI 類別
  selectedKpiSubcategory: string = "";     // 當前選擇的 KPI 子類別

  // 數值格式化函數
  //valueFormatting = (value: any) => `${value} ${this.getUnit()}`;
  valueFormatting = (value: any) => `${value}`;

  // 名稱格式化函數
  nameFormatting = (name: any) => `${name}`;

  // ngx-charts-bar-horizontal 圖表模組外觀設定區 ↓
  
    view: [number,number] = [1000, 500];
    showLegend = true;
    legendTitle: string = this.languageService.i18n['BS.dataSource']; // 定義圖例標題名稱
    legendPosition: LegendPosition = LegendPosition.Right;  // 使用枚舉
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showXAxisLabel = true;
    xAxisLabel = '效能指標'; 
    showYAxisLabel = false;
    showDataLabel = true;
    yAxisLabel = '基站與 Cell 識別';
    trimYAxisTicks = false;
    xAxisTickFormatting = this.valueFormatting;
    yAxisTickFormatting = this.nameFormatting;
    barPadding = 20;
    roundDomains = true;

    // 設定圖表配色方案
    colorScheme: Color = {
      name: 'ocean',            // 配色方案名稱
      selectable: true,         // （ 此屬性在 ngx-charts 中沒有官方文檔說明，可能無實際作用 ）
      group: ScaleType.Ordinal, // 配色組別，可以是 Ordinal 或 Linear
      domain: [                 // 配色範圍，定義多個顏色用於數據系列
        '#FF4500', // Orange Red
        '#32CD32', // Lime Green
        '#1E90FF', // Dodger Blue
        '#FFD700', // Gold
        '#FF69B4', // Hot Pink
        '#8A2BE2', // Blue Violet
        '#00CED1', // Dark Turquoise
        '#FF6347', // Tomato
        '#4682B4', // Steel Blue
        '#7FFF00', // Chartreuse
        '#DC143C', // Crimson
        '#00FA9A', // Medium Spring Green
        '#FF1493', // Deep Pink
        '#00BFFF', // Deep Sky Blue
        '#FF8C00', // Dark Orange
        '#8B0000', // Dark Red
        '#ADFF2F', // Green Yellow
        '#20B2AA', // Light Sea Green
        '#9370DB', // Medium Purple
        '#FFB6C1'  // Light Pink
      ]
    };

    // colorScheme = {
    //   domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA','#FFFF00','#00FF00','#FF0000','#0000CD','#FF00FF','#00FFFF','#4B0082','#8B4513','#808000']
    // };

    dataColorMap = new Map<string, string>();    // 用於顯示圖表數據線的顏色映射表  

    customColors = (value: any) => {
      console.log("In customColors() - the get value:", value);
      
      // 如果值為 null 或 ""，返回透明色
      if (value === null || value === "" || value === "none") {
        return '#ffffff00'; // 透明色 
      }
    
      // 根據名稱設置顏色
      const colorEntry = this.dataColorMap.get(value);
      return colorEntry || '#ffffff'; // 沒取得對應值就默認設為白色
    };

    // @2024/05/31 Add
    barVisibility: { [key: string]: boolean } = {};

  // ngx-charts-bar-horizontal 圖表模組外觀設定區 ↑

  preparedChartData: BarChartData[] = [];  // 經過整理後的數據，用於進一步處理
  
  displayChartData: BarChartData[] = [];  // 最終顯示在圖表上的數據

  refreshFieldInfo_Flag: boolean = false; // 用於標記是否效能資訊是否被刷新

  // 更新下拉選單的選項
  // updateDropdownOptions() {
  //   this.kpiCategories = [
  //     { displayName: this.languageService.i18n['BS.accessibility'], value: 'Accessibility' },        // Accessibility 選項 
  //     { displayName: this.languageService.i18n['BS.integrity'], value: 'Integrity' },                // Integrity 選項
  //     { displayName: this.languageService.i18n['BS.utilization'], value: 'Utilization' },            // Utilization 選項  
  //     { displayName: this.languageService.i18n['BS.retainability'], value: 'Retainability' },        // Retainability 選項
  //     { displayName: this.languageService.i18n['BS.mobility'], value: 'Mobility' },                  // Mobility 選項
  //     { displayName: this.languageService.i18n['BS.energyConsumption'], value: 'Energy Consumption' } // Energy Consumption 選項
  //   ];
  //   this.selectedKpiCategory = this.kpiCategories[0].value; // 設置預設選擇的 KPI 類別
  //   this.updateKpiSubcategories(); // 更新 KPI 子類別選項
  // }

  // 更新 KPI 子類別的選項
  // updateKpiSubcategories() {
  //   switch ( this.selectedKpiCategory ) {
  //     case 'Accessibility':
  //       this.kpiSubcategories = [
  //         { displayName: this.languageService.i18n['BS.drbAccessibility'], value: 'DRB Accessibility' } // DRB Accessibility 子類別  
  //       ];
  //       break;
          
  //     case 'Integrity':
  //       this.kpiSubcategories = [
  //         { displayName: this.languageService.i18n['BS.integratedDownlinkDelay'], value: 'Integrated Downlink Delay' },  // Integrated Downlink Delay 子類別
  //         { displayName: this.languageService.i18n['BS.integratedUplinkDelay'], value: 'Integrated Uplink Delay' },      // Integrated Uplink Delay 子類別
  //         { displayName: this.languageService.i18n['BS.ranUEDownlinkThroughput'], value: 'RAN UE Downlink Throughput' }, // RAN UE Downlink Throughput 子類別
  //         { displayName: this.languageService.i18n['BS.ranUEUplinkThroughput'], value: 'RAN UE Uplink Throughput' }      // RAN UE Uplink Throughput 子類別
  //       ];
  //       break;

  //     case 'Utilization':
  //       this.kpiSubcategories = [
  //         { displayName: this.languageService.i18n['BS.processUtilization'], value: 'Process Utilization' }, // Process Utilization 子類別
  //         { displayName: this.languageService.i18n['BS.memoryUtilization'], value: 'Memory Utilization' },   // Memory Utilization 子類別  
  //         { displayName: this.languageService.i18n['BS.diskUtilization'], value: 'Disk Utilization' }        // Disk Utilization 子類別
  //       ];
  //       break;

  //     case 'Retainability':
  //       this.kpiSubcategories = [
  //         { displayName: this.languageService.i18n['BS.retainability'], value: 'Retainability' } // Retainability 子類別
  //       ];
  //       break;

  //     case 'Mobility':
  //       this.kpiSubcategories = [
  //         { displayName: this.languageService.i18n['BS.ngRanHandoverSuccessRate'], value: 'NG-RAN Handover Success Rate' } // NG-RAN Handover Success Rate 子類別
  //       ];
  //       break;
        
  //     case 'Energy Consumption':
  //       this.kpiSubcategories = [
  //         { displayName: this.languageService.i18n['BS.energyConsumption'], value: 'Energy Consumption' } // Energy Consumption 子類別
  //       ];
  //       break;
  //   }
  //   this.selectedKpiSubcategory = this.kpiSubcategories[0]?.value; // 設置預設選擇的 KPI 子類別
  // }

  // 切換 KPI 類別時的處理
  // onKpiCategoryChange() {
  //   this.updateKpiSubcategories();    // 更新 KPI 子類別選項
  //   this.setXAxisLabel();             // 更新 X 軸標籤  
  //   this.prepareAndUpdateChartData(); // 刷新圖表數據
  // }

  // 更新語系選項
  updateLanguageOptions() {

    // 更新 KPI 類別的顯示名稱
    this.kpiCategories.forEach( category => {
      switch ( category.value ) {
        case 'Accessibility':
          category.displayName = this.languageService.i18n['BS.accessibility'];     // 更新顯示名稱為 Accessibility
          break;
          
        case 'Integrity':
          category.displayName = this.languageService.i18n['BS.integrity'];         // 更新顯示名稱為 Integrity 
          break;

        case 'Utilization': 
          category.displayName = this.languageService.i18n['BS.utilization'];       // 更新顯示名稱為 Utilization
          break;

        case 'Retainability':
          category.displayName = this.languageService.i18n['BS.retainability'];     // 更新顯示名稱為 Retainability
          break;
        
        case 'Mobility':
          category.displayName = this.languageService.i18n['BS.mobility'];          // 更新顯示名稱為 Mobility
          break;

        case 'Energy Consumption':
          category.displayName = this.languageService.i18n['BS.energyConsumption']; // 更新顯示名稱為 Energy Consumption
          break;
      }
    });
    
    this.updateKpiSubcategories(); // 更新 KPI 子類別顯示名稱
    this.setXAxisLabel();          // 更新 X 軸標籤
  }

  // 更新 KPI 子類別語系選項
  updateLanguageSubcategories() {
    switch ( this.selectedKpiCategory ) {
      case 'Accessibility':
        this.kpiSubcategories.forEach( subcategory => {
          if ( subcategory.value === 'DRB Accessibility' ) {
            subcategory.displayName = this.languageService.i18n['BS.drbAccessibility']; // 更新顯示名稱為 DRB Accessibility
          }
        });
        break;

      case 'Integrity':
        this.kpiSubcategories.forEach( subcategory => {
          switch ( subcategory.value ) {
            case 'Integrated Downlink Delay':
              subcategory.displayName = this.languageService.i18n['BS.integratedDownlinkDelay']; // 更新顯示名稱為 Integrated Downlink Delay
              break;
            case 'Integrated Uplink Delay':
              subcategory.displayName = this.languageService.i18n['BS.integratedUplinkDelay'];   // 更新顯示名稱為 Integrated Uplink Delay  
              break;
            case 'RAN UE Downlink Throughput':
              subcategory.displayName = this.languageService.i18n['BS.ranUEDownlinkThroughput']; // 更新顯示名稱為 RAN UE Downlink Throughput
              break;
            case 'RAN UE Uplink Throughput':
              subcategory.displayName = this.languageService.i18n['BS.ranUEUplinkThroughput'];   // 更新顯示名稱為 RAN UE Uplink Throughput
              break;
          }
        });
        break;

      case 'Utilization':
        this.kpiSubcategories.forEach( subcategory => {
          switch ( subcategory.value ) {
            case 'Process Utilization':
              subcategory.displayName = this.languageService.i18n['BS.processUtilization']; // 更新顯示名稱為 Process Utilization
              break;
            case 'Memory Utilization':
              subcategory.displayName = this.languageService.i18n['BS.memoryUtilization'];  // 更新顯示名稱為 Memory Utilization
              break;  
            case 'Disk Utilization':
              subcategory.displayName = this.languageService.i18n['BS.diskUtilization'];    // 更新顯示名稱為 Disk Utilization
              break;
          }
        });
        break;

      case 'Retainability':
        this.kpiSubcategories.forEach( subcategory => {
          if ( subcategory.value === 'Retainability' ) {
            subcategory.displayName = this.languageService.i18n['BS.retainability'];  // 更新顯示名稱為 Retainability
          }
        });
        break;
        
      case 'Mobility':
        this.kpiSubcategories.forEach( subcategory => {
          if ( subcategory.value === 'NG-RAN Handover Success Rate' ) {
            subcategory.displayName = this.languageService.i18n['BS.ngRanHandoverSuccessRate']; // 更新顯示名稱為 NG-RAN Handover Success Rate
          }
        });
        break;

      case 'Energy Consumption':
        this.kpiSubcategories.forEach( subcategory => {
          if ( subcategory.value === 'Energy Consumption' ) {
            subcategory.displayName = this.languageService.i18n['BS.energyConsumption']; // 更新顯示名稱為 Energy Consumption
          }
        });
        break;
    }
  }

  // 根據選擇的 KPI 類別設置 X 軸標籤
  // setXAxisLabel() {
  //   let kpiName = '';    // 初始化 KPI 名稱
  //   let subKpiName = ''; // 初始化子 KPI 名稱
  //   let unit = '';       // 初始化單位
    
  //   // 根據選擇的 KPI 類別設置對應的 KPI 名稱
  //   switch ( this.selectedKpiCategory ) {
  //     case 'Accessibility':
  //       kpiName = this.languageService.i18n['BS.accessibility']; // 設置 KPI 名稱為 "Accessibility"
  //       subKpiName = this.languageService.i18n['BS.drbAccessibility']; // 設置子 KPI 名稱為 "DRB Accessibility"
  //       unit = '%'; // 設置單位為 %
  //       break;

  //     case 'Integrity':
  //       kpiName = this.languageService.i18n['BS.integrity']; // 設置 KPI 名稱為 "Integrity"
  //       if ( this.selectedKpiSubcategory === 'Integrated Downlink Delay' ) {
  //         subKpiName = this.languageService.i18n['BS.integratedDownlinkDelay']; // 設置子 KPI 名稱為 "Integrated Downlink Delay"
  //         unit = 'ms';   // 設置單位為 ms
  //       } else if ( this.selectedKpiSubcategory === 'Integrated Uplink Delay' ) {
  //         subKpiName = this.languageService.i18n['BS.integratedUplinkDelay']; // 設置子 KPI 名稱為 "Integrated Uplink Delay"
  //         unit = 'ms';   // 設置單位為 ms
  //       } else if ( this.selectedKpiSubcategory === 'RAN UE Downlink Throughput' ) {
  //         subKpiName = this.languageService.i18n['BS.ranUEDownlinkThroughput']; // 設置子 KPI 名稱為 "RAN UE Downlink Throughput"
  //         unit = 'Mbps'; // 設置單位為 Mbps
  //       } else if ( this.selectedKpiSubcategory === 'RAN UE Uplink Throughput' ) {
  //         subKpiName = this.languageService.i18n['BS.ranUEUplinkThroughput']; // 設置子 KPI 名稱為 "RAN UE Uplink Throughput"
  //         unit = 'Mbps'; // 設置單位為 Mbps
  //       }
  //       break;

  //     case 'Utilization':
  //       kpiName = this.languageService.i18n['BS.utilization']; // 設置 KPI 名稱為 "Utilization"
  //       if ( this.selectedKpiSubcategory === 'Process Utilization' ) {
  //         subKpiName = this.languageService.i18n['BS.processUtilization']; // 設置子 KPI 名稱為 "Process Utilization"
  //       } else if ( this.selectedKpiSubcategory === 'Memory Utilization' ) {
  //         subKpiName = this.languageService.i18n['BS.memoryUtilization']; // 設置子 KPI 名稱為 "Memory Utilization"
  //       } else if ( this.selectedKpiSubcategory === 'Disk Utilization' ) {
  //         subKpiName = this.languageService.i18n['BS.diskUtilization']; // 設置子 KPI 名稱為 "Disk Utilization"
  //       } 
  //       unit = '%'; // 設置單位為 %
  //       break;
        
  //     case 'Retainability':
  //       kpiName = this.languageService.i18n['BS.retainability']; // 設置 KPI 名稱為 "Retainability"
  //       unit = '%';                                              // 設置單位為 %
  //       break;
        
  //     case 'Mobility': 
  //       kpiName = this.languageService.i18n['BS.mobility'];                    // 設置 KPI 名稱為 "Mobility"
  //       subKpiName = this.languageService.i18n['BS.ngRanHandoverSuccessRate']; // 設置子KPI 名稱為 "NG-RAN Handover Success Rate"
  //       unit = '%';   
  //       break;
        
  //     case 'Energy Consumption':
  //       kpiName = this.languageService.i18n['BS.energyConsumption']; // 設置 KPI 名稱為 "Energy Consumption"
  //       unit = 'J';                                                  // 設置單位為 J
  //       break;

  //     default:
  //       kpiName = 'KPI Name'; // 設置默認 KPI 名稱 
  //       subKpiName = '';      // 默認子 KPI 名稱為空
  //       unit = '';            // 默認單位為空
  //       break;  
  //   }

  //   // 設置 X 軸標籤為 "子 KPI 名稱" 或 "KPI 名稱"
  //   this.xAxisLabel = subKpiName ? `${subKpiName} ( ${unit} )` : `${kpiName} ( ${unit} )`;
  //   //this.xAxisLabel = subKpiName ? `${subKpiName}` : `${kpiName}`;
  // }

  // 刷新場域效能資訊
  refreshFieldInfo() {
    this.refreshFieldInfo_Flag = true; // 標記為 true

    this.getQueryFieldInfo(); // 刷新場域資訊
  }

  // 根據選擇的 KPI 類別和子類別獲取對應的數據
  getKpiData(data: BsInfoInField | CellInfo, bsName: string, color: string, cellName?: string): { name: string; value: any, label?: string, unit?: string, color?: string }[] {
    const kpiData: { name: string; value: any, label?: string, unit?: string, color?: string }[] = [];
    let unit = ''; // 初始化單位
    let name = ''; // 初始化名稱
  
    console.log("In getKpiData() - selectedKpiCategory = ", this.selectedKpiCategory);
  
    const addDataName = (value: any, prop: string) => {
      if ('nci' in data) {
        name = `${bsName} - ${cellName}`;
      } else {
        name = `${bsName}`;
      }
  
      if (value !== null && value !== "" && value !== "none") { // 只在 value 有效時添加數據
        kpiData.push({ name: name, value: parseFloat(value), label: name, unit: unit, color: color });
      } else {
        kpiData.push({ name: name, value: null, label: name, unit: unit, color: '#fff0' }); // 設置透明色
      }
    };
  
    switch (this.selectedKpiCategory) {
      case 'Accessibility':
        unit = '%';
        addDataName(data.accessibility, 'accessibility');
        break;
      case 'Integrity':
        if (this.selectedKpiSubcategory === 'Integrated Downlink Delay') {
          unit = 'ms';
          addDataName(data.integrity.downlinkDelay, 'downlinkDelay');
        } else if (this.selectedKpiSubcategory === 'Integrated Uplink Delay') {
          unit = 'ms';
          addDataName(data.integrity.uplinkDelay, 'uplinkDelay');
        } else if (this.selectedKpiSubcategory === 'RAN UE Downlink Throughput') {
          unit = 'Mbps';
          addDataName(data.integrity.downlinkThrouthput, 'downlinkThrouthput');
        } else if (this.selectedKpiSubcategory === 'RAN UE Uplink Throughput') {
          unit = 'Mbps';
          addDataName(data.integrity.uplinkThrouthput, 'uplinkThrouthput');
        }
        break;
      case 'Utilization':
        unit = '%';
        if (this.selectedKpiSubcategory === 'Process Utilization') {
          addDataName(data.utilization.resourceProcess, 'resourceProcess');
        } else if (this.selectedKpiSubcategory === 'Memory Utilization') {
          addDataName(data.utilization.resourceMemory, 'resourceMemory');
        } else if (this.selectedKpiSubcategory === 'Disk Utilization') {
          addDataName(data.utilization.resourceDisk, 'resourceDisk');
        }
        break;
      case 'Retainability':
        unit = '%';
        addDataName(data.retainability, 'retainability');
        break;
      case 'Mobility':
        unit = '%';
        addDataName(data.mobility, 'mobility');
        break;
      case 'Energy Consumption':
        unit = 'J';
        addDataName(data.energy, 'energy');
        break;
    }
  
    return kpiData;
  }
  
  cleanData(data: any[]): any[] {
    console.log("In cleanData() - data =", data);
    const cleanedData = data.filter(item => item !== null && item !== undefined && !isNaN(Number(item.value)));
    console.log("In cleanData() - cleanedData =", cleanedData);
    return cleanedData;
  }
  
  // prepareAndUpdateChartData() {
  //   let rawData = this.filterData(); // 獲取過濾後的原始數據
  //   console.log("In prepareAndUpdateChartData before clean - rawData =", rawData); 
  //   rawData = this.cleanData(rawData); // 清理數據
  //   console.log("In prepareAndUpdateChartData after clean - rawData =", rawData); 
  //   this.preparedChartData = rawData; // 將過濾後的數據賦值給 preparedChartData
  //   console.log("In prepareAndUpdateChartData - preparedChartData =", this.preparedChartData); // 輸出整理後的數據到控制台
  //   this.preparedChartData.forEach(data => {
  //     if (!(data.name in this.barVisibility)) {
  //       this.barVisibility[data.name] = true; // 初始化顯示狀態為 true
  //     }
  //   });
  //   this.updateDisplayChartData();
  //   console.log("In prepareAndUpdateChartData end - displayChartData =", this.displayChartData);
  //   this.setXAxisLabel(); // 更新 X 軸標籤
  //   this.cdr.detectChanges(); // 強制觸發變更檢測
  // }
  
  updateDisplayChartData() {
    this.displayChartData = this.preparedChartData.map(data => {
      return {
        name: data.name,
        value: this.barVisibility[data.name] ? Number(data.value) : 0,  // 將隱藏的數據條的值設為 0，確保 value 為數字類型
        label: data.label,
        color: data.color
      };
    });
    console.log("In updateDisplayChartData - displayChartData =", this.displayChartData);
  }
  
  // 根據選擇的條件過濾數據
  // filterData(): BarChartData[] {
  //   let filteredData: BarChartData[] = []; // 定義過濾後的數據陣列
  //   const colorScheme = this.colorScheme;  // 獲取當前的顏色方案

  //   console.log("In filterData() - dataColorMap =", this.dataColorMap); // 輸出 dataColorMap

  //   this.fieldInfo.bsinfo.forEach((bs: BsInfoInField, bsIndex) => { // 遍歷每個基站訊息
  //     const color = colorScheme.domain[bsIndex % colorScheme.domain.length]; // 根據基站索引分配顏色
  //     this.dataColorMap.set(`${bs.name}`, color); // 設置 bs 數據的顏色映射
  //     console.log(`${bsIndex} Adding data with color: ${color}`); // 輸出基站索引和顏色

  //     if (bs.cellInfo && bs.cellInfo.length > 0) { // 如果有分佈式基站
  //       bs.cellInfo.forEach((cell: CellInfo, cellIndex) => { // 遍歷每個 cell 訊息
  //         const cellColor = colorScheme.domain[(bsIndex + cellIndex + 2) % colorScheme.domain.length]; // 分配 cell 顏色
  //         this.dataColorMap.set(`${bs.name} - Cell#${cellIndex + 1} (NCI=${cell.nci})`, cellColor); // 設置 cell 數據的顏色映射
  //         console.log(`In filterData() - Cell#${cellIndex + 1} Adding data with color: ${cellColor}`); // 輸出 cell 訊息和顏色
  //         const cellData = this.getKpiData(cell, bs.name, cellColor, `Cell#${cellIndex + 1} (NCI=${cell.nci})`);
  //         filteredData.push(...cellData);
  //       });
  //     } else { // 如果是一體式基站
  //       const series = this.getKpiData(bs, bs.name, color); // 獲取基站的 KPI 數據
  //       filteredData.push(...series);
  //     }
  //   });

  //   // 過濾掉非法值
  //   filteredData = filteredData.filter(item => item !== null && item !== undefined && !isNaN(item.value));

  //   console.log("In filterData() - filteredData =", filteredData); // 輸出 filteredData

  //   return filteredData; // 返回過濾後的數據
  // }


  // 獲取當前選擇的 KPI 的單位
  getUnit() {
    switch ( this.selectedKpiCategory ) {
      case 'Accessibility':
        return '%';
      case 'Integrity':
        if ( this.selectedKpiSubcategory === 'Integrated Downlink Delay' || this.selectedKpiSubcategory === 'Integrated Uplink Delay' ) {
          return 'ms';
        } else if ( this.selectedKpiSubcategory === 'RAN UE Downlink Throughput' || this.selectedKpiSubcategory === 'RAN UE Uplink Throughput' ) {
          return 'Mbps';
        }
        return ''; // 添加缺失的返回值
      case 'Utilization':
        return '%';
      case 'Retainability':
        return '%';
      case 'Mobility':
        return '%';
      case 'Energy Consumption':
        return 'J';
      default:
        return '';
    }
  }

  onChartInteraction(event: any) {
    // 判斷事件類型是否為字串 (圖例點擊)
    if (typeof event === 'string') {
      const legendName = event; // 獲取圖例名稱
      console.log("In onChartInteraction() - legendName =", legendName);
      // 切換對應數據線的顯示狀態
      this.barVisibility[legendName] = !this.barVisibility[legendName];
      console.log("In onChartInteraction() - barVisibility =", this.barVisibility);
      // 更新圖表顯示的數據
      this.updateDisplayChartData();
      console.log("In onChartInteraction() end - displayChartData =", this.displayChartData);
      // 獲取所有圖例項目
      const legendItems = document.querySelectorAll('.legend-label');
      legendItems.forEach(item => {
        // 獲取圖例文本
        const legendText = item.querySelector('.legend-label-text');
        if (legendText) {
          // 獲取圖例文本內容並去除多餘空白
          const textContent = legendText.textContent?.trim() ?? null;
          console.log("In onChartInteraction() - legendText content =", textContent);
          // 檢查圖例文本內容是否與點擊的圖例名稱相符
          if (textContent && textContent === legendName.trim()) {
            // 切換圖例文本的劃線樣式
            if (this.barVisibility[legendName]) {
              legendText.classList.remove('hidden-line'); // 移除劃線樣式
            } else {
              legendText.classList.add('hidden-line'); // 添加劃線樣式
            }
          }
        } else {
          // 若未找到圖例文本,輸出提示訊息
          console.log("In onChartInteraction() - legendText is null for item", item);
        }
      });
      // 獲取所有數據條
      const bars = document.querySelectorAll('g[ngx-charts-bar]');
      bars.forEach(bar => {
        // 獲取數據條的 aria-label 屬性
        const ariaLabel = bar.getAttribute('aria-label');
        if (ariaLabel && ariaLabel.includes(legendName)) {
          // 如果 aria-label 包含圖例名稱,則根據可見狀態添加或移除 'hidden' 類
          if (this.barVisibility[legendName]) {
            bar.classList.remove('hidden');
          } else {
            bar.classList.add('hidden');
          }
        }
      });
    } else if (typeof event === 'object') {
      // 處理數據點點擊事件
      console.log("Data point clicked:", event);
      // 執行數據點點擊相關操作,例如顯示數據點的詳細訊息
    } else {
      // 處理未知事件類型
      console.warn("Unknown event type in onChartInteraction:", event);
    }
  }




  // ng2-charts 圖表模組設定區 ↓

  title_overview = 'ng2-charts-demo';
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartLegend = true;
  public barChartPlugins: ChartComponentLike[] = [
    {
      id: 'customPlugin',
      beforeDraw: (chart: Chart) => {
        const ctx = chart.ctx;
        ctx.save();
        ctx.font = 'bold 16px Arial';
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        if (chart.legend && chart.legend.left !== undefined && chart.legend.width !== undefined && chart.legend.top !== undefined) {
          ctx.fillText('數據名稱', chart.legend.left + chart.legend.width / 2, chart.legend.top - 10);
        }
        ctx.restore();
      }
    }
  ];
  public barChartType: ChartType = 'bar';
  
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  public originalLabels: string[] = [];

  // public barChartOptions: ChartConfiguration<'bar'>['options'] = {
  //   responsive: true,
  //   indexAxis: 'y',
  //   skipNull: true,  // 跳過空值
  //   scales: {
  //     x: {
  //       stacked: false,
  //       title: {
  //         display: true,
  //         text: 'KPI Name'
  //       },
  //     },
  //     y: {
  //       stacked: false,
  //       title: {
  //         display: false,
  //         text: '基站與 Cell 識別'
  //       }
  //     }
  //   },
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'right',
  //       labels: {
  //         font: {
  //           size: 12
  //         }
  //       }
  //     },
  //     tooltip: {
  //       position: 'nearest',
  //       callbacks: {
  //         label: (context) => {
  //           const label = context.dataset.label || '';
  //           const value = context.raw as number;
  //           const unit = this.selectedKpiUnit || '';
  //           return `${label}: ${value} ${unit}`;
  //         },
  //         title: (context) => {
  //           const kpiName = this.selectedKpiSubcategory || this.selectedKpiCategory;
  //           return `${kpiName}`;
  //         }
  //       }
  //     }
  //   }
  // };
  public barChartOptions: ChartConfiguration<'bar'>['options'] = { 
      responsive: true,
      indexAxis: 'y',
      skipNull: true,  // 跳過空值
      scales: {
        x: {
          stacked: false,
          title: {
            display: true,
            text: 'KPI Name'
          },
        },
        y: {
          stacked: false,
          title: {
            display: false,
            text: '基站與 Cell 識別'
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            font: {
              size: 12
            }
          },
          onClick: (e: ChartEvent, legendItem: LegendItem, legend: any) => {
            const index = legendItem.datasetIndex;
            const ci = legend.chart;
            const meta = ci.getDatasetMeta( index );

            // 切換數據集顯示狀態
            meta.hidden = !meta.hidden;

            // 更新 Y 軸標籤
            if ( meta.hidden ) {
              if ( ci.data.labels && index !== undefined ) {
                ci.data.labels[index] = '';  // 隱藏時設置為空
              }
            } else {
              if ( ci.data.labels && index !== undefined ) {
                if ( this.originalLabels[index] !== undefined && index !== undefined ) {
                  ci.data.labels[index] = this.originalLabels[index];  // 恢復原本的標籤
                }
              }
            }

            ci.update();
          }
        },
        tooltip: {
          position: 'nearest',
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const value = context.raw as number;
              const unit = this.selectedKpiUnit || '';
              return `${label}: ${value} ${unit}`;
            },
            title: (context) => {
              const kpiName = this.selectedKpiSubcategory || this.selectedKpiCategory;
              return `${kpiName}`;
            }
          }
        }
      }
    }

    setChartData() {
      const labels = this.preparedChartData.map(data => data.name);
      this.originalLabels = Array.from(new Set(labels)); // 獲取唯一的標籤並保存原始標籤
      const datasetsMap = new Map<string, { data: number[], label: string, backgroundColor: string[], barPercentage: number, categoryPercentage: number }>();
    
      this.preparedChartData.forEach(data => {
        if (!datasetsMap.has(data.name)) {
          datasetsMap.set(data.name, { data: [], label: data.name, backgroundColor: [], barPercentage: 0.9, categoryPercentage: 0.9 });
        }
        const dataset = datasetsMap.get(data.name);
        if (dataset) {
          dataset.data.push(data.value);
          dataset.backgroundColor.push(data.color || '');
        }
      });
    
      const datasets = Array.from(datasetsMap.values()).map(dataset => {
        const filledData = new Array(this.originalLabels.length).fill(null);
        dataset.data.forEach((value, index) => {
          const labelIndex = this.originalLabels.indexOf(dataset.label);
          if (labelIndex !== -1) {
            filledData[labelIndex] = value;
          }
        });
        return {
          ...dataset,
          data: filledData
        };
      });
    
      this.barChartData = {
        labels: [...this.originalLabels],  // 使用原始標籤
        datasets: datasets
      };
    
      console.log("In setChartData() end - barChartData:", this.barChartData);
    }
  
    
  // // 設定圖表配色方案
  // setChartData() {
  //   const labels = this.preparedChartData.map(data => data.name);
  //   const uniqueLabels = Array.from(new Set(labels)); // 獲取唯一的標籤
  //   const datasetsMap = new Map<string, { data: number[], label: string, backgroundColor: string[] }>();

  //   this.preparedChartData.forEach(data => {
  //     if (!datasetsMap.has(data.name)) {
  //       datasetsMap.set(data.name, { data: [], label: data.name, backgroundColor: [] });
  //     }
  //     const dataset = datasetsMap.get(data.name);
  //     if (dataset) {
  //       dataset.data.push(data.value);
  //       dataset.backgroundColor.push(data.color || '');
  //     }
  //   });

  //   const datasets = Array.from(datasetsMap.values()).map(dataset => {
  //     const filledData = new Array(uniqueLabels.length).fill(null);
  //     dataset.data.forEach((value, index) => {
  //       const labelIndex = uniqueLabels.indexOf(dataset.label);
  //       if (labelIndex !== -1) {
  //         filledData[labelIndex] = value;
  //       }
  //     });
  //     return {
  //       ...dataset,
  //       data: filledData
  //     };
  //   });

  //   this.barChartData = {
  //     labels: uniqueLabels,
  //     datasets: datasets
  //   };

  //   console.log("In setChartData() end - barChartData:", this.barChartData);
  // }
  

  
  
  
  // 更新下拉選單的選項
  updateDropdownOptions() {
    this.kpiCategories = [
      { displayName: this.languageService.i18n['BS.accessibility'], value: 'Accessibility' },
      { displayName: this.languageService.i18n['BS.integrity'], value: 'Integrity' },
      { displayName: this.languageService.i18n['BS.utilization'], value: 'Utilization' },
      { displayName: this.languageService.i18n['BS.retainability'], value: 'Retainability' },
      { displayName: this.languageService.i18n['BS.mobility'], value: 'Mobility' },
      { displayName: this.languageService.i18n['BS.energyConsumption'], value: 'Energy Consumption' }
    ];
    this.selectedKpiCategory = this.kpiCategories[0].value;
    this.updateKpiSubcategories();
  }
  
  // 更新 KPI 子類別的選項
  updateKpiSubcategories() {
    switch (this.selectedKpiCategory) {
      case 'Accessibility':
        this.kpiSubcategories = [{ displayName: this.languageService.i18n['BS.drbAccessibility'], value: 'DRB Accessibility' }];
        break;
      case 'Integrity':
        this.kpiSubcategories = [
          { displayName: this.languageService.i18n['BS.integratedDownlinkDelay'], value: 'Integrated Downlink Delay' },
          { displayName: this.languageService.i18n['BS.integratedUplinkDelay'], value: 'Integrated Uplink Delay' },
          { displayName: this.languageService.i18n['BS.ranUEDownlinkThroughput'], value: 'RAN UE Downlink Throughput' },
          { displayName: this.languageService.i18n['BS.ranUEUplinkThroughput'], value: 'RAN UE Uplink Throughput' }
        ];
        break;
      case 'Utilization':
        this.kpiSubcategories = [
          { displayName: this.languageService.i18n['BS.processUtilization'], value: 'Process Utilization' },
          { displayName: this.languageService.i18n['BS.memoryUtilization'], value: 'Memory Utilization' },
          { displayName: this.languageService.i18n['BS.diskUtilization'], value: 'Disk Utilization' }
        ];
        break;
      case 'Retainability':
        this.kpiSubcategories = [{ displayName: this.languageService.i18n['BS.retainability'], value: 'Retainability' }];
        break;
      case 'Mobility':
        this.kpiSubcategories = [{ displayName: this.languageService.i18n['BS.ngRanHandoverSuccessRate'], value: 'NG-RAN Handover Success Rate' }];
        break;
      case 'Energy Consumption':
        this.kpiSubcategories = [{ displayName: this.languageService.i18n['BS.energyConsumption'], value: 'Energy Consumption' }];
        break;
    }
    this.selectedKpiSubcategory = this.kpiSubcategories[0]?.value;
  }
  
  // 切換 KPI 類別時的處理
  onKpiCategoryChange() {
    this.updateKpiSubcategories();
    this.setXAxisLabel();
    this.prepareAndUpdateChartData();
  }
  
  // 刷新數據
  prepareAndUpdateChartData() {
    this.preparedChartData = this.filterData();
    this.setChartData();
    this.setXAxisLabel();
    this.cdr.detectChanges();
  }
  
  // 過濾數據
  filterData(): BarChartData[] {
    let filteredData: BarChartData[] = [];
    const colorScheme = this.colorScheme;
  
    this.fieldInfo.bsinfo.forEach((bs, bsIndex) => {
      const color = colorScheme.domain[bsIndex % colorScheme.domain.length];
      this.dataColorMap.set(`${bs.name}`, color);
  
      if (bs.cellInfo && bs.cellInfo.length > 0) {
        bs.cellInfo.forEach((cell, cellIndex) => {
          const cellColor = colorScheme.domain[(bsIndex + cellIndex + 2) % colorScheme.domain.length];
          this.dataColorMap.set(`${bs.name} - Cell#${cellIndex + 1} (NCI=${cell.nci})`, cellColor);
          const cellData = this.getKpiData(cell, bs.name, cellColor, `Cell#${cellIndex + 1} (NCI=${cell.nci})`);
          filteredData.push(...cellData);
        });
      } else {
        const series = this.getKpiData(bs, bs.name, color);
        filteredData.push(...series);
      }
    });
  
    return filteredData.filter(item => item !== null && item !== undefined && !isNaN(item.value));
  }
  
 
  selectedKpiUnit: string = "";
  setXAxisLabel() {
    let kpiName = '';
    let subKpiName = '';
    let unit = '';
  
    switch (this.selectedKpiCategory) {
      case 'Accessibility':
        kpiName = this.languageService.i18n['BS.accessibility'];
        subKpiName = this.languageService.i18n['BS.drbAccessibility'];
        unit = '%';
        this.selectedKpiUnit = unit;
        break;
      case 'Integrity':
        kpiName = this.languageService.i18n['BS.integrity'];
        if (this.selectedKpiSubcategory === 'Integrated Downlink Delay') {
          subKpiName = this.languageService.i18n['BS.integratedDownlinkDelay'];
          unit = 'ms';
          this.selectedKpiUnit = unit;
        } else if (this.selectedKpiSubcategory === 'Integrated Uplink Delay') {
          subKpiName = this.languageService.i18n['BS.integratedUplinkDelay'];
          unit = 'ms';
          this.selectedKpiUnit = unit;
        } else if (this.selectedKpiSubcategory === 'RAN UE Downlink Throughput') {
          subKpiName = this.languageService.i18n['BS.ranUEDownlinkThroughput'];
          unit = 'Mbps';
          this.selectedKpiUnit = unit;
        } else if (this.selectedKpiSubcategory === 'RAN UE Uplink Throughput') {
          subKpiName = this.languageService.i18n['BS.ranUEUplinkThroughput'];
          unit = 'Mbps';
          this.selectedKpiUnit = unit;
        }
        break;
      case 'Utilization':
        kpiName = this.languageService.i18n['BS.utilization'];
        if (this.selectedKpiSubcategory === 'Process Utilization') {
          subKpiName = this.languageService.i18n['BS.processUtilization'];
        } else if (this.selectedKpiSubcategory === 'Memory Utilization') {
          subKpiName = this.languageService.i18n['BS.memoryUtilization'];
        } else if (this.selectedKpiSubcategory === 'Disk Utilization') {
          subKpiName = this.languageService.i18n['BS.diskUtilization'];
        }
        unit = '%';
        this.selectedKpiUnit = unit;
        break;
      case 'Retainability':
        kpiName = this.languageService.i18n['BS.retainability'];
        unit = '%';
        this.selectedKpiUnit = unit;
        break;
      case 'Mobility':
        kpiName = this.languageService.i18n['BS.mobility'];
        subKpiName = this.languageService.i18n['BS.ngRanHandoverSuccessRate'];
        unit = '%';
        this.selectedKpiUnit = unit;
        break;
      case 'Energy Consumption':
        kpiName = this.languageService.i18n['BS.energyConsumption'];
        unit = 'J';
        this.selectedKpiUnit = unit;
        break;
      default:
        kpiName = 'KPI Name';
        subKpiName = '';
        unit = '';
        this.selectedKpiUnit = unit;
        break;
    }
  
    if (this.barChartOptions && this.barChartOptions.scales && this.barChartOptions.scales['x']) {
      if (!this.barChartOptions.scales['x'].title) {
        this.barChartOptions.scales['x'].title = { display: true, text: '' };
      }
      this.barChartOptions.scales['x'].title.text = subKpiName ? `${subKpiName} ( ${unit} )` : `${kpiName} ( ${unit} )`;
    }
  }
  
  
  
  
  
  






  title = 'ng2-charts-demo';

  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July'
    ],
    datasets: [
      {
        data: [ 65, 59, 80, 81, null, 55, 40 ],
        label: 'Series A',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false
  };
  public lineChartLegend = true;


// For 場域效能報表 @2024/06/03 Update ↑



// For 場域優化 @2024/04/12 Update ↓

  getFieldSonParameters: ForQuerySonParameter = {} as ForQuerySonParameter;   // @2024/03/30 Add

  querySonParameter!: Subscription;

  // @2024/02/22 Add for Progress Spinner
  getQuerySonParameter_Loading = false; // 用於識別載入"場域優化參數"資訊狀態的標誌，初始設置為 false 

  // @2024/03/30 Add
  // 取得 場域優化參數 用函數
  getQuerySonParameter() {
    this.getQuerySonParameter_Loading = true; // 顯示加載中的提示
    this.showLoadingSpinner();   // 顯示 Loading Spinner
  
    if ( this.commonService.isLocal ) { // 如果是本地模式

      this.getFieldSonParameters = this.fieldSonParameters_LocalFiles.fieldSonParameters_local;

      this.populateFieldOptimizationForm();

      this.getQuerySonParameter_Loading = false; // 隱藏加載中的提示
      this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

    } else { // 如果是 API 模式

      this.querySonParameter = this.API_Field.querySonParameter().subscribe({

        next: ( res: ForQuerySonParameter ) => {

          this.getFieldSonParameters = res; // 將 API 回應賦值給變數
          this.populateFieldOptimizationForm();
          this.getQuerySonParameter_Loading = false; // 隱藏加載中的提示
          this.hideSpinner();  // 出錯時隱藏 spinner
        },
        error: ( error ) => {
          console.error('Error fetching SON parameters:', error);
          this.getQuerySonParameter_Loading = false; // 隱藏加載中的提示
          this.hideSpinner();  // 出錯時隱藏 spinner
        },
        complete: () => console.log('SON parameters fetch completed')
      });
    }
  }
  
  // @2024/04/08 Update
  // 用於預填充 fieldOptimizationForm 表單值用
  populateFieldOptimizationForm() {

    let ccoParameter = '';

    if ( this.getFieldSonParameters.ratioAverageSINR !== '0' && this.getFieldSonParameters.ratioAverageSINR !== '' ) {
      ccoParameter = 'ratioAverageSINR';
    } else if ( this.getFieldSonParameters.ratioCoverage !== '0' && this.getFieldSonParameters.ratioCoverage !== '' ) {
      ccoParameter = 'maxCoverageRange';
    }

    // 使用獲取的 SON 參數填充表單
    this.fieldOptimizationForm.patchValue({
      setSONParameters: {
        cco: true, // 預設勾選 CCO
        anr: true, // 預設勾選 ANR
        pci: true, // 預設勾選 PCI
        ccoSetParameters: ccoParameter, // 從 getFieldSonParameters 獲取的值
        ueSyncMinSINR: this.getFieldSonParameters.ueSyncMinSINR, // 從 getFieldSonParameters 獲取的值
        pciMax: this.getFieldSonParameters.pciMax, // 從 getFieldSonParameters 獲取的值
        pciMin: this.getFieldSonParameters.pciMin  // 從 getFieldSonParameters 獲取的值
      }
    });

  }

  // 用於控制 場域優化 視窗 @2024/03/30 Add
  @ViewChild('fieldOptimizationWindow') fieldOptimizationWindow: any;
  fieldOptimizationWindow_Ref!: MatDialogRef<any>;
  fieldOptimizationWindow_Validated = false;

  // 開啟視窗 - 場域優化 @2024/04/12 Update
  openfieldOptimizationWindow() {

    this.createFieldOptimizationForm();   // For Son Parameters in Field Optimization

    this.getQuerySonParameter();  // 取得"場域優化參數"資訊
    
    console.log( "In openfieldOptimizationWindow() - this.getFieldSonParameters = ", this.getFieldSonParameters );

    this.fieldOptimizationResultType = 'cco'; // 預設顯示 CCO 頁籤
    
    // 表單驗證狀態重置
    this.fieldOptimizationWindow_Validated = false;

    // 打開"場域優化"視窗
    this.fieldOptimizationWindow_Ref = this.dialog.open( this.fieldOptimizationWindow, {
      id: 'fieldOptimizationWindow',
      // width 和 height 可以根據需要設置或去掉
      // width: '300px', 
      // height: '200px'
    });

    // 訂閱對話框關閉後的事件
    this.fieldOptimizationWindow_Ref.afterClosed().subscribe(() => {
      // 這裡可以添加當對話框關閉後的邏輯
      this.fieldOptimizationWindow_Validated = false; // 關閉時重置表單驗證狀態
    });
  }

  // 創建表單組，用於"場域優化設定" @2024/03/30 Add
  fieldOptimizationForm!: FormGroup;

  // 創建場域優化表單 @2024/04/08 Update
  createFieldOptimizationForm() {

    this.fieldOptimizationForm = this.fb.group({
      setSONParameters: this.fb.group({
        cco: new FormControl( true ), // 設置 CCO 預設為選中
        anr: new FormControl( true ), // 設置 ANR 預設為選中 
        pci: new FormControl( true ), // 設置 PCI 預設為選中
        ccoSetParameters: new FormControl( '' ), // 設置默認為空字符串
        ueSyncMinSINR: new FormControl( this.getFieldSonParameters.ueSyncMinSINR || '' ),  // UE 同步最小 SINR 的默認值
        pciMax: new FormControl( this.getFieldSonParameters.pciMax || '' ), // PCI 最大值的默認值
        pciMin: new FormControl( this.getFieldSonParameters.pciMin || '' )  // PCI 最小值的默認值
      })
    });

  }


  /** @2024/04/12 Update
   *  點擊場域優化視窗的"清除並重置"與"取消"按鈕行為的函數
   *  @method resetFieldOptimizationForm
   *  @returns { void }
   *  @description
   *  - 重新載入場域優化表單以反映系統內現有設定
   *  - 清空計算類別和結果的數據結構
   *  - 重置所有存儲計算結果的變數
   *  - 根據需要關閉場域優化視窗
   *  @note
   *  - 這個操作是用戶在進行場域設定調整後，如果需要重新開始時使用
   *  - 重置操作會清除所有當前未保存的變更，恢復到最後一次保存的狀態
   **/
  resetFieldOptimizationForm() {

    // @2024/04/09 Add
    // 重新取得系統內現有設定 
    this.populateFieldOptimizationForm();

    this.calculationCategories = [];
    this.calculationResults = [];

    // @2024/04/11 Update
    // 清空存儲計算結果的變數
    this.gnbsCco = [];
    this.processedCcoResults = [];
    this.gnbsAnr = [];
    this.gnbsPci = [];
    this.originalPciCollisions = [];
    this.originalPciCollisionCount = [];
    this.originalPciCollisionTotalCount = 0;
    this.originalPciCollisionRatio = 0;
    this.newPciCollisions = [];
    this.newPciCollisionCount = [];
    this.newPciCollisionTotalCount = 0;
    this.newPciCollisionRatio = 0;
    this.originalPciConfusions = [];
    this.originalPciConfusionCount = [];
    this.originalPciConfusionTotalCount = 0;
    this.originalPciConfusionRatio = 0;
    this.newPciConfusions = [];
    this.newPciConfusionCount = [];
    this.newPciConfusionTotalCount = 0;
    this.newPciConfusionRatio = 0;

    // 重置顯示設定區域的標誌
    // this.showCCOSettings = false;
    // this.showANRSettings = false;
    // this.showPCISettings = false;

    // 如果需要，這裡可以關閉場域優化視窗
    //this.fieldOptimizationWindow_Ref.close();

    this.fieldOptimizationResultType = 'cco'; // 重置場域優化結果頁籤顯示類型為 CCO

    console.log("已重置 fieldOptimizationForm 表單回系統內現有設定");
  }

  showCCOSettings = false;  // 是否顯示 CCO 設定區域 @2024/03/30 Add
  showANRSettings = false;  // 是否顯示 ANR 設定區域 @2024/03/30 Add
  showPCISettings = false;  // 是否顯示 PCI 設定區域 @2024/03/30 Add

  // @2024/03/31 Add
  // CCO Checkbox 變更事件處理函數
  onCCOChange( event: MatCheckboxChange ) {
    // 斷言 'setSONParameters' 一定是一個 FormGroup
    const setSONParameters = this.fieldOptimizationForm.get('setSONParameters') as FormGroup;

    if (event.checked) {
      setSONParameters.controls['anr'].setValue(true);
      setSONParameters.controls['pci'].setValue(true);
      this.showCCOSettings = true;
      this.showANRSettings = true;
      this.showPCISettings = true;
    } else {
      setSONParameters.controls['anr'].setValue(false);
      setSONParameters.controls['pci'].setValue(false);
      this.showCCOSettings = false;
      this.showANRSettings = false;
      this.showPCISettings = false;
    }
  }

  // @2024/03/31 Add
  // ANR Checkbox 變更事件處理函數
  onANRChange( event: MatCheckboxChange ) {

    // 斷言 'setSONParameters' 一定是一個 FormGroup
    const setSONParameters = this.fieldOptimizationForm.get('setSONParameters') as FormGroup;

    if ( event.checked ) {
      setSONParameters.controls['pci'].setValue( true );
      this.showANRSettings = true;
      this.showPCISettings = true;
    } else {
      setSONParameters.controls['cco'].setValue( false );
      setSONParameters.controls['pci'].setValue( false );
      this.showCCOSettings = false;
      this.showANRSettings = false;
      this.showPCISettings = false;
    }
  }

  // @2024/03/31 Add
  // PCI Checkbox 變更事件處理函數
  onPCIChange( event: MatCheckboxChange ) {

    // 斷言 'setSONParameters' 一定是一個 FormGroup
    const setSONParameters = this.fieldOptimizationForm.get('setSONParameters') as FormGroup;

    if ( event.checked ) {
      this.showPCISettings = true;
    } else {
      setSONParameters.controls['cco'].setValue( false );
      setSONParameters.controls['anr'].setValue( false );
      this.showCCOSettings = false;
      this.showANRSettings = false;
      this.showPCISettings = false;
    }
  }


  calculationCategories: string[] = []; // 用於記錄選擇計算的類別與數值 @2024/03/31 Add
     calculationResults: string[] = []; // 用於記錄計算的結果          @2024/03/31 Add

  // 宣告一個變數來接收 SON 計算的回傳值 @2024/03/31 Add
  calculationResponse: ForCalculateSonResponse = {} as ForCalculateSonResponse;

  // 記錄是否觸發計算旗標 @2024/04/02 Add
  isClickCalculate: boolean = false;

  /** @2024/04/08 Add
   *  切換種類區的展開/縮合狀態
   *  @method toggleOptimizationType
   *  @returns { void }
   *  @description
   *  - 通過 document.querySelector() 獲取種類區標題元素
   *  - 使用 classList.toggle('active') 切換 "active" 類別
   *  - 當 "active" 類別存在時，種類區展開；否則，種類區縮合
   *  @note
   *  - 這種直接操作 DOM 的方式並不是 Angular 推薦的做法
   *  - 在 Angular 中,更好的方式是使用資料綁定和指令來控制元素的狀態
   *  - 但考慮到需求,這種方式可以快速地實現所需的效果
   * */
  toggleOptimizationType() {
    const optimizationTypeHeader = document.querySelector('.field-optim-wrap h4');
    optimizationTypeHeader?.classList.toggle('active');
  }

  // @2024/04/08 Add
  fieldOptimizationResultType: string = 'cco'; // 預設選擇顯示 "cco" 

  /** @2024/05/02 Update
   *  變更場域優化結果頁籤顯示的類型函數
   *  @method changefieldOptimizationResultType
   *  @param {MatButtonToggleChange} e - 用戶操作的事件物件
   *  @returns { void }
   *  @description
   *  - 根據用戶的選擇更新場域優化結果的顯示類型
   *  - 打印當前選擇的場域優化結果類型
   *  - 提供選項以在切換類型時進行額外操作
   *  @note
   *  - 此函數響應用戶的頁籤選擇，動態調整顯示內容
   **/
  changefieldOptimizationResultType( e: MatButtonToggleChange ) {
    console.log("changefieldOptimizationResultType() - Start");

    // 根據用戶當前的選擇來設定場域優化結果顯示的類型
    /*
      if ( e.value === 'cco' ) {

        // 如果選擇的是 CCO 頁面
        this.fieldOptimizationResultType = 'cco'; // 設定場域優化結果顯示類型為 CCO

      } else if ( e.value === 'anr' ) {

        // 如果選擇的是 ANR 頁面
        this.fieldOptimizationResultType = 'anr'; // 設定場域優化結果顯示類型為 ANR

      } else if ( e.value === 'pci' ) {

        // 如果選擇的是 PCI 頁面
        this.fieldOptimizationResultType = 'pci'; // 設定場域優化結果顯示類型為 PCI
      }
    */

    // @2024/05/02 Add
    this.fieldOptimizationResultType = e.value;

    // 輸出場域優化結果顯示類型的變更結果
    console.log("頁面切換後，顯示的場域優化結果類型:", this.fieldOptimizationResultType + "\n Optimization result type displayed after tab switch:",
                   this.fieldOptimizationResultType);

    // 函數結束的日誌
    console.log("changefieldOptimizationResultType() - End, \n the optimization result type is", this.fieldOptimizationResultType);
  }


  // @2024/04/12 Add for Progress Bar
  calculateSON_Loading = false; // 用於識別計算"場域優化"資訊的標誌，初始設置為 false 
  multiCalculateBs!: Subscription;

  /** @2024/05/02 Update
   *  發送計算 SON 演算法的函數
   *  @method calculateSON_Submit
   *  @returns { void }
   *  @description
   *  - 初始化計算所需的參數和數據結構
   *  - 根據場域優化表單設定的參數來構建提交數據
   *  - 根據執行環境（本地或遠端），發送計算請求
   *  - 處理回傳的計算結果並更新前端顯示
   *  - 計算完成後自動縮合優化種類區，並根據計算類型顯示結果頁籤
   *  @note
   *  - 這是一個觸發計算並處理回應的整合函數，涉及多個計算類型和數據交互
   **/
  calculateSON_Submit() {
    console.log( "calculateSON_Submit() - Start" );

    // @2024/04/11 Update
    // 清空存儲計算結果的變數，確保計算結果是最新的
    this.gnbsCco = [];
    this.processedCcoResults = [];
    this.gnbsAnr = [];
    this.gnbsPci = [];
    this.originalPciCollisions = [];
    this.originalPciCollisionCount = [];
    this.originalPciCollisionTotalCount = 0;
    this.originalPciCollisionRatio = 0;
    this.newPciCollisions = [];
    this.newPciCollisionCount = [];
    this.newPciCollisionTotalCount = 0;
    this.newPciCollisionRatio = 0;
    this.originalPciConfusions = [];
    this.originalPciConfusionCount = [];
    this.originalPciConfusionTotalCount = 0;
    this.originalPciConfusionRatio = 0;
    this.newPciConfusions = [];
    this.newPciConfusionCount = [];
    this.newPciConfusionTotalCount = 0;
    this.newPciConfusionRatio = 0;

    console.log( "gnbsCco: ", this.gnbsCco );

    this.isClickCalculate = true;
    this.calculateSON_Loading = true; // 顯示 Loading Progress Bar

    // 根據使用者選擇的設定，生成 Calculation Categories
    this.calculationCategories = [];
    if ( this.fieldOptimizationForm.get( 'setSONParameters.cco' )?.value ) {
      this.calculationCategories.push( 'cco' );
    }
    if ( this.fieldOptimizationForm.get( 'setSONParameters.anr' )?.value ) {
      this.calculationCategories.push( 'anr' );
    }
    if ( this.fieldOptimizationForm.get( 'setSONParameters.pci' )?.value ) {
      this.calculationCategories.push( 'pci' );
    }

    // @2024/05/02 Add
    // 根據計算類別設置初始頁籤 
    if (this.calculationCategories.includes('cco')) {
      this.fieldOptimizationResultType = 'cco';
    } else if (this.calculationCategories.includes('anr')) {
      this.fieldOptimizationResultType = 'anr';  
    } else if (this.calculationCategories.includes('pci')) {
      this.fieldOptimizationResultType = 'pci';
    }

    const formData = this.fieldOptimizationForm.value.setSONParameters;

    const submitData: ForCalculateSon = {
          session: this.sessionId,
      fieldServer: "127.0.0.1",
          fieldId: this.fieldInfo.id,
            type: this.calculationCategories,
          pciMin: formData.pciMin || '',
          pciMax: formData.pciMax || '',
          ueSyncMinSINR: formData.ueSyncMinSINR || '',
       ratioAverageSINR: this.getFieldSonParameters.ratioAverageSINR || '',
          ratioCoverage: this.getFieldSonParameters.ratioCoverage || '',     // 從取回的 SON 參數獲取 ratioCoverage
       ratioMaxCapacity: this.getFieldSonParameters.ratioMaxCapacity || '',  // 從取回的 SON 參數獲取 ratioMaxCapacity
      ratioFairCapacity: this.getFieldSonParameters.ratioFairCapacity || '', // 從取回的 SON 參數獲取 ratioFairCapacity
             txPowerMax: this.getFieldSonParameters.txPowerMax || '',        // 從取回的 SON 參數獲取 txPowerMax
             txPowerMin: this.getFieldSonParameters.txPowerMin || '',        // 從取回的 SON 參數獲取 txPowerMin
      // ...其餘參數
    };

    // 獲取用戶在表單中設置的 CCO 參數
    const ccoSetParam = this.fieldOptimizationForm.get('setSONParameters.ccoSetParameters')?.value;

    // 根據用戶選擇的 CCO 參數設置相關值
    if ( ccoSetParam === 'maxCoverageRange' ) {
      
      submitData.ratioCoverage = '100';
      submitData.ratioAverageSINR = '0';
      submitData.ratioFairCapacity = '0';
      submitData.ratioMaxCapacity = '0';

    } else if ( ccoSetParam === 'ratioAverageSINR' ) {

      submitData.ratioAverageSINR = '100';
      submitData.ratioCoverage = '0';
      submitData.ratioFairCapacity = '0';
      submitData.ratioMaxCapacity = '0';
    }


    if ( this.commonService.isLocal ) {
      // Local 模式下的處理

      console.log( "本地模擬 SON 計算，提交的數據:", submitData );

      // 取得本地模擬 SON 計算的死回應檔案
      this.calculationResponse = this.calculateSonResponse_LocalFiles.calculateSonResponse_local;

      console.log( "In Local - SON 計算成功:", this.calculationResponse );

      // 模擬計算結果，這裡你可以根據實際需求進行修改
      // this.calculationResults = [
      //   'PCI Result',
      //   'ANR Result',
      //   'CCO Result',
      //   'Performance'
      // ];

      // 處理計算結果
      this.processCalculationResponse( this.calculationResponse );

      // @04/08 Add
      // 計算完成後自動縮合優化種類區
      this.toggleOptimizationType();

      this.calculateSON_Loading = false; // 計算完成後停止 Loading Progress Spinner

    } else {

      console.log( "呼叫實際 API 前，SON 計算所提交的數據:", submitData );

      // 向伺服器發送 SON 計算請求
      this.multiCalculateBs = this.API_Field.multiCalculateBs( submitData ).subscribe({
        next: ( response: ForCalculateSonResponse ) => {

          console.log( "SON 計算成功:", response );

          this.calculationResponse = response;       // 將 API 回應賦值給變數

          // 處理計算結果
          this.processCalculationResponse( this.calculationResponse );

          // @04/08 Add
          // 計算完成後自動縮合優化種類區
          this.toggleOptimizationType();

          this.calculateSON_Loading = false; // 計算完成後停止 Loading Progress Spinner

        },
        error: ( error ) => {
          console.error( "SON 計算出錯:", error );
          this.calculateSON_Loading = false; // 計算失敗也停止 Loading Progress Spinner
        },
      });
    }

    // @04/08 Add
    // 根據計算類別顯示結果頁籤
    if ( this.calculationCategories.includes('cco') ) {
      this.fieldOptimizationResultType = 'cco';
    } else if ( this.calculationCategories.includes('anr') ) {
      this.fieldOptimizationResultType = 'anr';
    } else if ( this.calculationCategories.includes('pci') ) {
      this.fieldOptimizationResultType = 'pci';
    }

    console.log( "calculateSON_Submit() - End" );
  }

  /** @2024/04/12 Update
   *  清除場域優化計算結果的函數
   *  @method clear_calculateSON
   *  @returns { void }
   *  @description
   *  - 重置場域優化相關的所有標誌和數據結構
   *  - 輸出操作完成的日誌訊息
   *  - 動態切換優化種類區的展開狀態
   *  @note
   *  - 用於清理環境，確保下一次計算的環境是乾淨的
   **/
  clear_calculateSON() {

    this.isCcoClass = false;
    this.isAnrClass = false;
    this.isPciClass = false;
    this.isClickCalculate = false;

    console.log("已清除場域優化計算結果");

    this.fieldOptimizationResultType = 'cco'; // 重置場域優化結果頁籤顯示類型為 CCO

    // @04/09 Add
    // 清除場域優化計算結果後自動展開優化種類區
    this.toggleOptimizationType();
  }

  // 宣告變數來儲存 CCO 結果
  gnbsCco: cco_CellIndividualResult[] = [];
  resultSinr: string = '';
  resultCoverage: string = '';

  // 定義新矩陣來儲存處理後的 CCO 結果 @2024/04/09 Add
  processedCcoResults: ProcessedCcoResult[] = [];

  // 宣告變數來儲存 ANR 結果
  gnbsAnr: anr_CellIndividualResult[] = [];

  // 定義新矩陣來儲存處理後的 ANR 結果 @2024/04/11 Add
  processedAnrResults: ProcessedAnrResult[] = [];

  // 宣告變數來儲存 PCI 結果
  gnbsPci: pci_CellIndividualResult[] = [];

  // 記錄原始 PCI Collision 資訊
  originalPciCollisions: pci_Collisioncell[] = [];
  originalPciCollisionCount: pci_Collisioncount[] = [];
  originalPciCollisionTotalCount: number = 0;
  originalPciCollisionRatio: number = 0;

  // 記錄新的 PCI Collision 資訊
  newPciCollisions: pci_Collisioncell[] = [];
  newPciCollisionCount: pci_Collisioncount[] = [];
  newPciCollisionTotalCount: number = 0;
  newPciCollisionRatio: number = 0;

  // 記錄原始 PCI Confusion 資訊
  originalPciConfusions: pci_Confusioncell[] = [];
  originalPciConfusionCount: pci_Confusioncount[] = [];
  originalPciConfusionTotalCount: number = 0;
  originalPciConfusionRatio: number = 0;

  // 記錄新的 PCI Confusion 資訊
  newPciConfusions: pci_Confusioncell[] = [];
  newPciConfusionCount: pci_Confusioncount[] = [];
  newPciConfusionTotalCount: number = 0;
  newPciConfusionRatio: number = 0;

  // 宣告變數來儲存前端顯示狀態
  isCcoClass: boolean = false;
  isPciClass: boolean = false;
  isAnrClass: boolean = false;

  currentProgress: number = 0;
  showPciMax: number | null = null;
  showPciMin: number | null = null;
  showAnrSense: number | null = null;
  showOptType: boolean | null = null;

  /** @2024/05/02 Update
   *  處理 SON 計算回傳值的函數
   *  @method processCalculationResponse
   *  @param {ForCalculateSonResponse} calculationResponse - SON 計算後的回傳數據
   *  @returns { void }
   *  @description
   *  - 打印接收到的計算數據
   *  - 提取和處理 CCO，ANR，和 PCI 的計算結果
   *  - 分別更新對應的數據結構以支持後續操作
   *  - 處理過程中包括對基站訊息的匹配和新舊鄰居數據的整合
   *  @note
   *  - 此函數是計算流程的核心部分，確保各項數據正確反映最新計算結果
   **/
  processCalculationResponse( calculationResponse: ForCalculateSonResponse ) {

    // 將取得的回傳值轉換成輸出到控制台上 this.allSimplifiedBsInfo
    console.log( "In processCalculationResponse() - SON calculation:", calculationResponse );
    console.log( "In processCalculationResponse() - this.allSimplifiedBsInfo:", this.allSimplifiedBsInfo );

    console.log( "In processCalculationResponse() - this.calculationCategories: ", this.calculationCategories );
    
    // 從回傳值中取出 cco、anr、pci 的結果資料
    const tempCco = calculationResponse.cco;
    const tempAnr = calculationResponse.anr;
    const tempPci = calculationResponse.pci;

    console.log( "tempCCO: ", tempCco );
    console.log( "tempANR: ", tempAnr );
    console.log( "tempPci: ", tempPci );

    // 處理 CCO 結果資料 ( 已完整 )
    if ( tempCco !== undefined && tempCco.cellIndividualResult ) {
      
      // 清空原有的 CCO 結果陣列
      this.gnbsCco = [];

      // 在計算開始前清空上一次的 CCO 處理結果
      this.processedCcoResults = [];

      // 遍歷計算結果中的每個 Cell
      tempCco.cellIndividualResult.forEach( res => {

          // 查找匹配的基站訊息
          const matchingBsInfo = this.allSimplifiedBsInfo.find( bsInfo => bsInfo.gNBId === res.gNBId );
          if ( matchingBsInfo ) {

            // 創建新的 CCO 結果對象，並填入匹配的訊息
            const ccoResult: ProcessedCcoResult = {
                         bsId: matchingBsInfo.id,          // 取得基站 ID @2024/04/12 Add
                         name: matchingBsInfo.name,        // 取得基站名稱
                          nci: matchingBsInfo.nci,         // 取得基站 NCI
              originalTxPower: matchingBsInfo['tx-power'], // 取得基站原始傳輸功率
                  newTxPower: res.txpower                  // 取得基站新的傳輸功率

            };

            // 將新的結果對象加入到已處理的 CCO 結果矩陣中
            this.processedCcoResults.push( ccoResult );
          }
      });

      // 取得平均 SINR 值
      this.resultSinr = tempCco['average_sinr'];
      // 使用 parseFloat() 將字串轉換為數字型態
      // 使用 toFixed(1) 將小數點後保留一位，並返回字串型態的結果
      this.resultSinr = parseFloat(this.resultSinr).toFixed(1);
      // 此時 this.resultSinr 的型態為字串（string）

      // 取得覆蓋率
      this.resultCoverage = tempCco.coverage;
      // 使用 parseFloat() 將字串轉換為數字型態
      // 將原本的小數值乘以 100，轉換為百分比形式
      // 使用 toFixed(1) 將小數點後保留一位，並返回字串型態的結果
      this.resultCoverage = (parseFloat(this.resultCoverage) * 100).toFixed(1);
      // 此時 this.resultCoverage 的型態為字串（string）
    }
    console.log("this.processedCcoResults:", this.processedCcoResults );
    

    // 處理 ANR 結果資料 ( 已完整 @2024/04/11 )
    // 建立一個 map 來存儲每個基站的原鄰居基站描述
    const originalNeighborsMap = new Map< string, anr_Neighbor[] >();

    // 處理原鄰居基站的部分
    // 遍歷所有簡化的基站資訊
    this.allSimplifiedBsInfo.forEach( bsInfo => {
      // 如果基站有鄰居
      if ( bsInfo.neighbors ) {
        // 將鄰居基站資訊轉換為 Neighbor 物件陣列
        const originalNeighbors = bsInfo.neighbors.map( neighbor => {
          // 找到對應的鄰居基站資訊
          const neighborBsInfo = this.allSimplifiedBsInfo.find( info => info.nci === neighbor.nci );
          // 如果找到鄰居基站資訊，則建立 Neighbor 物件，否則返回 null
          return neighborBsInfo ? { name: neighborBsInfo.name, nci: neighbor.nci } : null;
        // 過濾掉 null 值，並將結果斷言為 Neighbor 型別的陣列
        }).filter( ( neighbor ): neighbor is anr_Neighbor => neighbor !== null ) as anr_Neighbor[];
        // 將原鄰居基站資訊存儲到 map 中，使用 gNBId 作為 key
        originalNeighborsMap.set( String( bsInfo.gNBId ), originalNeighbors );
      }
    });

    // 處理新鄰居基站的部分 ( 補取得套用優化用所需數據 @2024/04/12 )
    // 如果有 ANR 結果資料
    if ( tempAnr && tempAnr.cellIndividualResult ) {

      // 清空原有的 ANR 結果陣列
      this.gnbsAnr = [];
      this.processedAnrResults = [];

      // 遍歷每個 ANR 結果
      tempAnr.cellIndividualResult.forEach(anrResult => {
        // 找到對應的基站資訊
        const matchingBsInfo = this.allSimplifiedBsInfo.find(bsInfo => bsInfo.gNBId === anrResult.gNBId);
        // 如果找到對應的基站資訊
        if ( matchingBsInfo ) {
          // 從 map 中取出原鄰居基站資訊,如果沒有則使用空陣列
          const originalNeighbors = originalNeighborsMap.get( String( matchingBsInfo.gNBId ) ) || [];
          // 將新的鄰居基站資訊轉換為 anr_Neighbor 物件陣列
          const newNeighbors = anrResult.NRCellRelation.map( rel => {
            // 找到對應的新鄰居基站資訊
            const newNeighborBsInfo = this.allSimplifiedBsInfo.find( bsInfo => bsInfo.gNBId === rel.gNBId );

            // 如果找到新鄰居基站資訊,則建立 anr_Neighbor 物件,否則返回 null
            return newNeighborBsInfo ? {
              name: newNeighborBsInfo.name,
              nci: newNeighborBsInfo.nci,
              pci: rel.nRPCI,       // 從 nRPCI 取得 pci
              nrarfcn: rel.arfcnDl, // 從 arfcnDl 取得 nrarfcn
              'plmn-id': {
                mcc: rel.pLMNId_MCC, // 從 pLMNId_MCC 取得 mcc
                mnc: rel.pLMNId_MNC // 從 pLMNId_MNC 取得 mnc
              }
            } : null;

          // 過濾掉 null 值,並將結果斷言為 anr_Neighbor 型別的陣列
          }).filter( ( neighbor ): neighbor is anr_Neighbor => neighbor !== null ) as anr_Neighbor[];

          // 將處理後的 ANR 結果存儲到陣列中
          this.processedAnrResults.push({
            name: matchingBsInfo.name,
            nci: matchingBsInfo.nci,
            originalNeighbors: originalNeighbors,
            newNeighbors: newNeighbors
          });
        }
      });
    }
    console.log("this.processedAnrResults:", this.processedAnrResults );


    // 處理 PCI 結果資料 ( 已完整 @2024/04/11 )
    if ( tempPci !== undefined ) {

      // 宣告變數來儲存鄰居 Cell 的總數和組合數
      let neighborCount = 0;
      let combineCount = 0;

      // 如果有 PCI 的個別 Cell 結果
      if ( tempPci.cellIndividualResult ) {

        // 遍歷每個 Cell 結果
        tempPci.cellIndividualResult.forEach( res => {

          // 將小區結果加入到 gnbsPci 陣列中
          this.gnbsPci.push( res );

          // 取得當前小區的鄰居 Cell 數量
          const count = res.NRCellRelation.length;

          // 將當前小區的鄰居 Cell 數量加到總數中
          neighborCount += count;

          // 計算當前小區的鄰居 Cell 組合數,並加到總組合數中
          combineCount += ( count * ( count - 1 ) ) / 2;
        });

        console.log("this.gnbsPci:", this.gnbsPci);
      }

      // 處理原始 PCI 碰撞的 Cell 資料
      if ( tempPci.collision_cell ) {

        // 將原始 PCI 碰撞的 Cell 資料賦值給 originalPciCollisions
        this.originalPciCollisions = tempPci.collision_cell;
      }

      // 計算原始 PCI 碰撞的統計資料
      if ( tempPci.collision_count ) {

        // 將原始 PCI 碰撞的計數賦值給 originalPciCollisionCount
        this.originalPciCollisionCount = tempPci.collision_count;

        // 計算原始 PCI 碰撞的總數
        this.originalPciCollisionTotalCount = tempPci.collision_count.reduce( ( sum, item ) => sum + item.collision_count, 0 ) / 2;

        // 如果鄰居 Cell 的總數大於 0
        if ( neighborCount > 0 ) {
          // 計算原始 PCI 碰撞的比率，並四捨五入到小數點後一位
          this.originalPciCollisionRatio = Number(
            ((this.originalPciCollisionTotalCount / (neighborCount / 2)) * 100).toFixed(1)
          );
        }
      }

      // 處理新的 PCI 碰撞的 Cell 資料
      if ( tempPci.collision_cell_new ) {

        // 將新的 PCI 碰撞的 Cell 資料賦值給 newPciCollisions
        this.newPciCollisions = tempPci.collision_cell_new;
      }

      // 計算新的 PCI 碰撞的統計資料
      if ( tempPci.collision_count_new ) {

        // 將新的 PCI 碰撞的計數賦值給 newPciCollisionCount
        this.newPciCollisionCount = tempPci.collision_count_new;

        // 計算新的 PCI 碰撞的總數
        this.newPciCollisionTotalCount = tempPci.collision_count_new.reduce( ( sum, item) => sum + item.collision_count, 0 ) / 2;

        // 如果鄰居 Cell 的總數大於 0
        if (neighborCount > 0) {
          // 計算新的 PCI 碰撞的比率，並四捨五入到小數點後一位
          this.newPciCollisionRatio = Number(
            ((this.newPciCollisionTotalCount / (neighborCount / 2)) * 100).toFixed(1)
          );
        }
      }

      // 處理原始 PCI 混淆的 Cell 資料
      if ( tempPci.confusion_cell ) {

        // 將原始 PCI 混淆的 Cell 資料賦值給 originalPciConfusions
        this.originalPciConfusions = tempPci.confusion_cell;
      }

      // 計算原始 PCI 混淆的統計資料
      if ( tempPci.confusion_count ) {

        // 將原始 PCI 混淆的計數賦值給 originalPciConfusionCount
        this.originalPciConfusionCount = tempPci.confusion_count;

        // 計算原始 PCI 混淆的總數
        this.originalPciConfusionTotalCount = tempPci.confusion_count.reduce( ( sum, item ) => sum + item.confusion_count, 0 ) / 2;

        // 如果鄰居 Cell 的組合數大於 0
        if (combineCount > 0) {
          // 計算原始 PCI 混淆的比率，並四捨五入到小數點後一位
          this.originalPciConfusionRatio = Number(
            ((this.originalPciConfusionTotalCount / combineCount) * 100).toFixed(1)
          );
        }
      }

      // 處理新的 PCI 混淆的 Cell 資料
      if ( tempPci.confusion_cell_new ) {

        // 將新的 PCI 混淆的 Cell 資料賦值給 newPciConfusions
        this.newPciConfusions = tempPci.confusion_cell_new;
      }

      // 計算新的 PCI 混淆的統計資料
      if ( tempPci.confusion_count_new ) {

        // 將新的 PCI 混淆的計數賦值給 newPciConfusionCount
        this.newPciConfusionCount = tempPci.confusion_count_new;

        // 計算新的 PCI 混淆的總數
        this.newPciConfusionTotalCount = tempPci.confusion_count_new.reduce((sum, item) => sum + item.confusion_count, 0) / 2;

        // 如果鄰居 Cell 的組合數大於 0
        if (combineCount > 0) {
          // 計算新的 PCI 混淆的比率，並四捨五入到小數點後一位
          this.newPciConfusionRatio = Number(
            ((this.newPciConfusionTotalCount / combineCount) * 100).toFixed(1)
          );
        }
      }
    }

    // 更新前端顯示狀態
    this.isPciClass = this.calculationCategories.includes('pci');
    this.isAnrClass = this.calculationCategories.includes('anr');
    this.isCcoClass = this.calculationCategories.includes('cco');
    this.currentProgress = 100;

    if ( this.isPciClass ) {

      // 取得 PCI 最大值和最小值的設定
      this.showPciMax = this.fieldOptimizationForm.get('pciMax')?.value;
      this.showPciMin = this.fieldOptimizationForm.get('pciMin')?.value;
    }
    if ( this.isAnrClass ) {

      // 取得 UE 同步最小 SINR 的設定
      this.showAnrSense = this.fieldOptimizationForm.get('ueSyncMinSINR')?.value;
    }
    if ( this.isCcoClass ) {

      // 取得 CCO 優化類型的設定
      this.showOptType = this.fieldOptimizationForm.get('setSONParameters.cco')?.value;
    }

  }


  /** @2024/04/11 Add
   *  取得匹配的基站訊息
   *  @method getMatchingBsInfo
   *  @param {number} gNBId - 要匹配的基站全球唯一識別碼
   *  @returns {SimplifiedBSInfo | undefined} - 返回匹配的基站資訊或未找到時返回undefined
   *  @description
   *  - 遍歷存儲的所有簡化基站資訊數據，查找與指定 gNBId 匹配的基站資訊
   *  @note
   *  - 這個函數用於快速檢索特定 gNBId 的基站資訊，支援其他函數如優化計算或資訊展示等
   **/
  getMatchingBsInfo( gNBId: number ): SimplifiedBSInfo | undefined {
    return this.allSimplifiedBsInfo.find( bsInfo => bsInfo.gNBId === gNBId );
  }


  /** @2024/04/12 Add
   *  發送套用 SON 計算優化函數
   *  @method applySON_Submit
   *  @returns { void }
   *  @description
   *  - 記錄函數執行起始
   *  - 構建提交數據結構，包含 Session ID、是否保存標誌、類型和基站資訊
   *  - 遍歷 gnbsPci 以收集和匹配基站訊息
   *  - 根據包含的計算類型（如 'cco', 'anr'），進行基站訊息擴充，包括設定發射功率和波束模式以及更新鄰居資訊
   *  - 在本地模式下進行模擬，假裝處理成功，進行以下操作：
   *    - 關閉場域優化視窗
   *    - 重置場域優化表單並清除計算結果
   *    - 刷新場域和效能管理參數設定資訊
   *    - 隱藏場域地圖的載入指示器
   *  - 在非本地模式下，向服務器發送實際的套用 SON 優化請求，成功後進行相同的關閉、重置和刷新操作，並管理載入指示器
   *  - 記錄函數執行結束
   *  @note
   *  - 功能豐富，結合本地和遠端運算以實現SON優化
   *  - 本地模式和非本地模式的行為有所不同，但均包括視窗管理、資料刷新及界面反饋
   **/
  multiOptimalBs!: Subscription;
  applySON_Submit() {
    console.log("applySON_Submit() - Start"); // 記錄函數執行的開始

    const submitData: ForApplySon = {
      session: this.sessionId,          // 設置 Session ID
      isSave: true,                     // 指定數據是否保存
      type: this.calculationCategories, // 設置優化計算的類型
      bsInfo: [],                       // 初始化基站訊息數組
    };

    // 循環處理每一個 PCI 結果
    this.gnbsPci.forEach( pciResult => {
      const matchingBsInfo = this.getMatchingBsInfo( pciResult.gNBId ); // 從基站訊息中尋找匹配的PCI

      if ( matchingBsInfo ) {
        const bsInfo: ApplySon_BsInfo = {
          bsId: matchingBsInfo.id, // 設定基站 ID
          nci: matchingBsInfo.nci, // 設定基站的 NCI
          pci: pciResult.nrPCI,    // 設定 PCI
          neighbor: [],            // 初始化鄰居訊息數組
        };

        // 處理cco相關設定
        if ( this.calculationCategories.includes('cco') ) {
          const ccoResult = this.processedCcoResults.find( cco => cco.nci === matchingBsInfo.nci );
          if ( ccoResult ) {
            bsInfo['tx-power'] = ccoResult.newTxPower; // 設置新的發射功率
            bsInfo['beam-pattern'] = "FINE"; // 設置波束模式
          }
        }

        // 處理anr相關設定
        if ( this.calculationCategories.includes('anr') ) {
          const anrResult = this.processedAnrResults.find( anr => anr.nci === matchingBsInfo.nci );
          if ( anrResult ) {
            bsInfo.neighbor = anrResult.newNeighbors.map( neighbor => ({
              nci: neighbor.nci, // 鄰居的NCI
              pci: neighbor.pci || 0, // 鄰居的PCI
              nrarfcn: neighbor.nrarfcn || 0, // 鄰居的NRARFCN
              'plmn-id': neighbor['plmn-id'] || { mcc: '', mnc: '' }, // 鄰居的PLMN-ID
              tac: "",
              id: "0",
              enable: "0",
              alias: "xxxxxxxxxxxxxxxxxx",
              cio: "",
              blacklisted: "",
              'must-include': "",
              'q-offset': "",
              'rs-tx-power': "",
              __itri_default___: 0,
            }));
          }
        }

        submitData.bsInfo.push( bsInfo ); // 添加配置好的基站訊息到提交數據
      }
    });

    // 顯示載入場域地圖 BS 資訊的 Spinner
    this.isMarkersLoading = true;
    this.showProcessingSpinner();   // 顯示 Loading Spinner

    if ( this.commonService.isLocal ) {
      console.log( "本地模擬套用 SON 優化，提交的數據:", submitData ); // 本地模式日誌

      // 套用成功後，關閉場域優化視窗
      this.fieldOptimizationWindow_Ref.close();

      // 也重置場域優化表單並清除計算結果
      this.resetFieldOptimizationForm(); 
      this.clear_calculateSON();

      // 假裝 Local 模式處理成功，此時刷新該場域的所有資訊
      this.getQueryFieldInfo();

      // 假裝 Local 模式處理成功，此時也刷新該場域的"效能管理參數設定"資訊
      this.getQueryPmFtpInfo();

      //this.isMarkersLoading = false; // 加載完成，隱藏 Spinner
      this.hideSpinner();  // 完成後隱藏 spinner

    } else {
      console.log( "呼叫實際 API 前,套用 SON 優化所提交的數據:", submitData ); // 實際模式日誌

      // 發送請求到服務器
      this.multiOptimalBs = this.API_Field.multiOptimalBs( submitData ).subscribe({
        next: ( response ) => {
          console.log( "套用 SON 優化成功:", response ); // 請求成功日誌

          // 套用成功後，先關閉場域優化視窗
          this.fieldOptimizationWindow_Ref.close();

          // 也重置場域優化表單並清除計算結果
          this.resetFieldOptimizationForm(); 
          this.clear_calculateSON();

          // 套用成功後，此時刷新該場域的所有資訊
          this.getQueryFieldInfo();

          // 套用成功後，此時也刷新該場域的"效能管理參數設定"資訊
          this.getQueryPmFtpInfo();

          //this.isMarkersLoading = false; // 加載完成，隱藏 Spinner
          this.hideSpinner();  // 完成後隱藏 spinner

        },
        error: ( error ) => {
          console.error("套用 SON 優化出錯:", error); // 請求失敗日誌
          //this.isMarkersLoading = false; // 出錯時也應隱藏 spinner
          this.hideSpinner();  // 完成後隱藏 spinner
        },
      });
    }

    console.log( "applySON_Submit() - End" ); // 記錄函數執行的結束
  }

  // @2024/04/12 Add
  // Control for SON optimization confirmation window
  @ViewChild('confirmApplySonWindow') confirmApplySonWindow: any;
  confirmApplySonWindow_Ref!: MatDialogRef<any>;
  confirmApplySonWindow_Validated = false;

  /** @2024/04/12 Add
   *  打開套用 SON 優化計算的確認窗口
   *  @method openConfirmApplySonWindow
   *  @returns { void }
   *  @description
   *  - 初始化確認窗口的驗證狀態為未驗證
   *  - 打開確認窗口，設置其ID並可選擇性地定義窗口的寬高
   *  - 訂閱對話框關閉後的事件，當對話框關閉時重置驗證狀態
   *  @note
   *  - 此函數為用戶提供最後一步確認機會，以確保他們願意進行優化計算
   *  - 使用 Angular Material Dialog 組件來實現模態對話框功能
   * */
  openConfirmApplySonWindow() {
    this.confirmApplySonWindow_Validated = false;
    this.confirmApplySonWindow_Ref = this.dialog.open( this.confirmApplySonWindow, {
      id: 'confirmApplySonWindow',
      // width and height can be set as needed or removed
      // width: '300px', 
      // height: '200px'
    });

    // Subscribe to the dialog close event
    this.confirmApplySonWindow_Ref.afterClosed().subscribe(() => {
      // Logic after the dialog closes can be added here
      this.confirmApplySonWindow_Validated = false;
    });
  }

// For 場域優化 @2024/04/12 Update ↑














  // 完成後可能要砍掉的
           p: number = 1;     // 當前頁數
    pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;     // 總筆數
    nullList: string[] = [];  // 給頁籤套件使用
     cloudId: string = '';
   cloudName: string = '';
}

// 完成後要砍掉的
export interface OcloudInfo {
  id: string;
  name: string;
  imsEndpoint: string;
  softwareVersion: string;
  callbackUri: string;
  dms: Dms[];
  nf: Nf[];
  fault: Fault;
  resourcepool: Resourcepool[];
}

export interface Dms {
  id: string;
  name: string;
  dmsEndpoint: string;
}

export interface Nf {
  id: string;
  name: string;
  dmsName: string;
  status: number;
}

export interface Fault {
  critical: number;
  major: number;
  minor: number;
  warning: number;
}

export interface Resourcepool {
  poolId: string;
  poolName: string;
  active?: boolean;
  node: Node[];
}

export interface Node {
  nodeId: string;
  nodeName: string;
  cpu: Cpu[];
  memory: Memory,
  nic: Nic[];
  storage: Storage;
}

export interface Cpu {
  id: string;
  name: string;
  product: string;
  capacity: string;
}

export interface Nic {
  id: string;
  name: string;
  product: string;
  capacity: string;
}

export interface Memory {
  name: string;
  size: string;
}

export interface Storage {
  total: string;
  items: Items[];
}

export interface Items {
  id: string;
  name: string;
  size: string;
}

export interface OcloudPerformance {
  // totalCpu: number;
  // usedCpu: number;
  cpu: string;
  memory: string;
  storage: string;
  network: string;
}