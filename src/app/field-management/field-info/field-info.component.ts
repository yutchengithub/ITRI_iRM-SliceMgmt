
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../shared/common.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';

import { LanguageService } from 'src/app/shared/service/language.service';

// Mat Modules
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox'; // @2024/01/19 Add
import { MatDialogModule } from '@angular/material/dialog';     // @2024/01/19 Add
import { MatButtonModule } from '@angular/material/button';     // @2024/01/19 Add
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog'; // @2024/01/19 Add

import { of } from 'rxjs'; // @2024/01/09 Add 
import { forkJoin, Observable } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';          // @2023/12/13 Add for use 'detectChanges()'
import { environment } from 'src/environments/environment'; // @2023/12/20 Add for import Google Maps API Key
import { NgZone } from '@angular/core';

// import APIs of Field Management @2024/01/04 Add 
import { apiForField } from '../../shared/api/For_Field'; 

// 引入儲存各個資訊所需的 interfaces
import { FieldInfo }                      from '../../shared/interfaces/Field/For_queryFieldInfo';                     // @2023/12/21 Add
import { BsInfoInField }                  from '../../shared/interfaces/Field/For_queryFieldInfo';                     // @2023/12/21 Add
import { ForCreateOrUpdateField, Bsinfo } from '../../shared/interfaces/Field/For_createField_or_updateField';         // @2024/01/26 Add
import { ForQueryOrUpdatePmFTPInfo }      from '../../shared/interfaces/Field/For_queryPmFtpInfo_or_updatePmFtpInfo';  // @2024/02/04 Add
import { BSInfo }              from '../../shared/interfaces/BS/For_queryBsInfo_BS';       // @2023/12/21 Add
import { BSInfo_dist, PLMNid } from '../../shared/interfaces/BS/For_queryBsInfo_dist_BS';  // @2023/12/24 Add
import { BSList, Basestation } from '../../shared/interfaces/BS/For_queryBsList';          // @2024/01/25 Update

// 引入所需 Local Files
import { localPmFTPInfo } from '../../shared/local-files/Field/For_queryPmFtpInfo'; // @2024/02/04 Add
import { localBSList }    from '../../shared/local-files/BS/For_queryBsList';       // @2024/01/16 Add
import { localBSinfo }    from '../../shared/local-files/BS/For_queryBsInfo';       // @2023/12/27 Add

import { map } from 'rxjs/operators';              // @2023/12/24 Add
import { GoogleMap } from '@angular/google-maps';  // @2024/01/03 Add

import { ElementRef } from '@angular/core';

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
}

export interface SimplifiedNeighborInfo {
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

  // 返回 Field Management 主頁
  back() {
    this.router.navigate( ['/main/field-mgr'] );
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


// ↓ Page Init ↓

  constructor(
    private router: Router,
    private  route: ActivatedRoute,
    private     fb: FormBuilder,
    private dialog: MatDialog,
    // @12/13 Add - 使用 detectChanges() 方法用於手動觸發 Angular 的變更檢測機制，
    //              確保當數據模型更新後，相關的視圖能夠及時反映
    private    cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    // private messageService: MessageService

    public      languageService: LanguageService,
    public        commonService: CommonService,
    public            API_Field: apiForField,     // @2024/01/04 Add for import API of Field Management 
    public     bsInfoLocalFiles: localBSinfo,     // @2023/12/27 Add for import BS Info Local Files
    public    bsList_LocalFiles: localBSList,     // @2024/01/16 Add for import BS List Local Files 
    public pmFtpInfo_LocalFiles: localPmFTPInfo,  // @2024/02/04 Add for import info of PM Parameter Setting Local Files
  ) {
    
    const googleMapsApiKey = environment.googleMapsApiKey; // @12/20 Add for import Google Maps API Key
    this.severitys = this.commonService.severitys;         // 取得告警資訊種類名稱

    // 建立並初始化各功能所需表單
    this.createBSInfoForm();              // For updateBs API @2024/01/05 Add 
    this.createFieldInfoForm();           // For Field Info in Field Editing  @2024/01/17 Add
    this.createPMgmtParameterSetForm();   // For Pm Ftp Info in PM Parameter Setting  @2024/02/04 Add
  }

  // 頁面初始化
  ngOnInit(){
    this.sessionId = this.commonService.getSessionId();
    console.log( 'The sessionId is', this.sessionId ); // @2024/01/05 Add 
    this.route.params.subscribe((params) => {
      this.fieldId = params['id'];
      this.fieldName = params['name'];
      console.log('fieldId: ' + this.fieldId + ', fieldName: ' + this.fieldName + ',\nsend from /main/field-mgr');
      this.getQueryFieldInfo();
    });
  }

  // @2024/01/05 Add
  // ngAfterViewInit 是 Angular 在組件視圖初始化後會呼叫的生命週期事件。
  // ngAfterViewInit() {
  //   // 使用 setTimeout 確保地圖元素已經加載完成並存在於 DOM 中。
  //   // 這樣做可以避免在 Google Maps API 還沒有完全準備好時嘗試操作地圖。
  //   setTimeout(() => {
  //     // 呼叫 adjustMapZoom 方法來根據場域的邊界調整地圖的縮放等級。
  //     this.adjustMapZoom();
  //   }, 1000); // 設定 1000 ms 的延遲，以確保地圖的初始化過程已經完成。
  // }

  ngAfterViewInit() {
    // 檢查 this.map.googleMap 是否已經被定義。
    // this.map 是通過 ViewChild 獲取的 GoogleMap 實例，
    // 而 googleMap 是實際的 Google Maps JavaScript API 地圖對象。
    if ( this.map.googleMap ) {
      // 如果 googleMap 對象存在，則向它添加一個事件監聽器。
      // 'tilesloaded' 事件會在地圖上的所有可見瓦片都已加載完成後觸發。
      // 這是一個好時機來調整地圖的視角和縮放等級，因為它表明地圖已經準備好了。
      this.map.googleMap.addListener('tilesloaded', () => {
        // 當 'tilesloaded' 事件觸發時，調用 adjustMapZoom 方法。
        // 此方法將根據場域的邊界值調整地圖的縮放等級，
        // 確保用戶可以看到完整的場域範圍。
        this.adjustMapZoom();
      });
    }
    // 如果 this.map.googleMap 尚未定義，可能表示地圖尚未完全初始化。
    // 在這種情況下，可能需要考慮使用其他方法或檢查點以確保地圖已經準備好
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
  
  // @2024/01/05 Add
  // adjustMapZoom 方法用於根據場域邊界自動調整地圖的縮放等級和視角。
  adjustMapZoom() {
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
      this.overlay.setMap(this.map.googleMap);   // 將創建的 GroundOverlay 添加到 Google 地圖實例上
      this.overlay.setOpacity( 0.5 );            // 設定 GroundOverlay 的透明度
      
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

  // 獲取並顯示場域圖片 
  // @2024/01/24 Update
  getfieldImage(){
    // 點擊 Field Image 部分的處理

      // 點擊 Field Image 時，開始顯示 Spinner 表載入圖片中
      this.isfieldImage_or_RsrpSinrMapLoading = true;

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
  
        } else { // 如非使用 local files
  
          // 跟後端 API 取得場域圖片
          this.API_Field.queryFieldImage( this.fieldId ).subscribe({
              next: ( response ) => {
                // 當接收到圖片數據時，處理 Base64 編碼的圖片
                if ( response && response.fieldImage ) {
                  const imageSrc = 'data:image/png;base64,' + response.fieldImage;   // 將 Base64 字符串轉換為圖片 URL
                  this.displayFieldImageOnMap( imageSrc, this.currentOverlayType );  // 在地圖上顯示場域圖片
                }
              },
              // 當圖片獲取失敗時，顯示其錯誤訊息
              error: ( error ) => {
                console.error( 'Error fetching field image:', error );
                this.isfieldImage_or_RsrpSinrMapLoading = false;  // 出錯時，也隱藏 Spinner
                this.openNoFieldImagePromptWindow();              // 未有場域圖片時顯示提示視窗
              },
              // 當圖片獲取過程完成時，顯示完成訊息
              complete: () => {
                console.log( 'Field image fetch completed' );
                this.isfieldImage_or_RsrpSinrMapLoading = false; // 加載完成，隱藏 Spinner
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
        this.removePolylineFromMap(polyline);
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
   * @param {google.maps.Polyline} polyline - 要從地圖上移除的 Polyline 對象
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
    console.log("The click button is:", type);

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
    console.log("The click button is:", buttonId);
    
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

  // @2024/01/10 Update
  getSinrRsrpImage( overlayType: OverlayType ) {
    
    this.isfieldImage_or_RsrpSinrMapLoading = true; // 點擊 RSRP Map 或 SINR Map 時，開始顯示 Spinner 表載入圖片中

    // 根據 overlayType 決定 mapType
    const mapType = ( overlayType === OverlayType.SINR ) ? 0 : 1;

    if ( this.activeButton_rsrp_sinr ) {
      if ( this.commonService.isLocal ) {
        let imageSrc_localPath = '';

        // 設定本地 SINR 或 RSRP 圖片的路徑
        if ( overlayType === OverlayType.SINR ) {
          imageSrc_localPath = './assets/img/sinrMap_local.png'; // 定義本地 SINR 圖片路徑
          console.log("The local path of image is:", imageSrc_localPath);
        } else {
          imageSrc_localPath = './assets/img/rsrpMap_local.png'; // 定義本地 RSRP 圖片路徑
          console.log("The local path of image is:", imageSrc_localPath);
        }

        // 如果本地路徑存在，則在地圖上顯示本地圖片
        if ( imageSrc_localPath ) {
          this.displayImageOnMap( imageSrc_localPath, overlayType );
        }
        this.isfieldImage_or_RsrpSinrMapLoading = false; // Local 圖片載入完成，隱藏 Spinner
      } else {

        // 從 fieldBounds 提取經緯度
        const leftLongitude = this.fieldBounds.west;  // 西邊界經度
        const leftLatitude = this.fieldBounds.north;  // 北邊界緯度
        const rightLongitude = this.fieldBounds.east; // 東邊界經度
        const rightLatitude = this.fieldBounds.south; // 南邊界緯度

        // 調用後端 API 獲取 SINR 或 RSRP 圖片
        this.API_Field.bsHeatMap( this.fieldId, leftLongitude, leftLatitude,
                                       rightLongitude, rightLatitude, mapType ).subscribe({
          next: (response) => {
            const imageSrc = 'data:image/png;base64,' + response.heatMap; // 從後端回應中獲取圖片
            this.displayImageOnMap( imageSrc, overlayType );
          },
          error: (error) => {
            console.error("Error fetching SINR/RSRP image:", error);
            this.isfieldImage_or_RsrpSinrMapLoading = false; // 出錯時，也隱藏 Spinner
          },
          complete: () => {
            console.log("SINR/RSRP image fetch completed");
            this.isfieldImage_or_RsrpSinrMapLoading = false; // 加載完成，隱藏 Spinner
          }
        });
      }
    }
  }

  showMapModel: boolean = true;                   // 控制是否顯示地圖模式的 Flag    @12/13 Add
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
  
  isMarkersLoading = true; // 加載狀態的標誌，初始設置為 true @12/28 Add for Progress Spinner

  // @2024/01/02 Add - 儲存場域邊界點
  // @2024/01/04 Update - Add calculateBestZoom()
  getQueryFieldInfo() {
    console.log( 'getQueryFieldInfo() - Start' ); // 啟動獲取場域資訊

    console.log( 'Start fetching field info' );   // 開始獲取場域資訊
    clearTimeout( this.refreshTimeout );

    this.isMarkersLoading = true;
    
    if ( this.commonService.isLocal ) { // 檢查是否為使用 local files

      // For testing with local files
      console.log( 'Start fetching field info in Local' );   // 開始獲取 local 場域資訊
      this.fieldInfo = this.commonService.fieldInfo;
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
        },
        error: ( error ) => {

          // 獲取資訊出錯時執行此回調
          // This callback is executed when there is an error fetching the info
          console.error( '獲取場域資訊出錯:', error );
          console.error( 'Error fetching field info:', error );
          this.isMarkersLoading = false; // 出錯時也應隱藏 spinner @12/28 Add for Progress Spinner
        },
        complete: () => {

          // 請求完成時執行此回調
          // This callback is executed when the request is complete
          console.log( '場域資訊獲取完成' );
          console.log( 'Field info fetch completed' );
          //this.isMarkersLoading = false; // 加載完成 @12/28 Add for Progress Spinner
        }
      });
    }
  }
  
  // @12/27 Update - Add Local Files Processing
  // 處理場域資訊並調用 getQueryBsInfoForAll
  // Process field info and call getQueryBsInfoForAll
  processFieldInfo() {

    if ( this.commonService.isLocal ) {
    
      console.log('Start fetching BS info in Local');   // 開始獲取 Local BS 資訊

      console.log( 'Local BS info in Local:', this.bsInfoLocalFiles.bsInfo_local );
      console.log( 'Local Dist_BS info in Local:', this.bsInfoLocalFiles.dist_bsInfo_local );

      // 初始化一個新數組用於存放所有轉換後的 SimplifiedBSInfo 對象
      const allSimplifiedData: SimplifiedBSInfo[] = [];

      // 遍歷 dist_bsInfo_local 數組並處理每一筆數據
      this.bsInfoLocalFiles.dist_bsInfo_local.forEach( ( distBsInfo: BSInfo_dist ) => {
        allSimplifiedData.push( ...this.convertDistBsInfoToSimplifiedFormat( distBsInfo ));
      });

      // 遍歷 bsInfo_local 數組並處理每一筆數據
      this.bsInfoLocalFiles.bsInfo_local.forEach( ( bsInfo: BSInfo ) => {
        allSimplifiedData.push( this.convertBsInfoToSimplifiedFormat( bsInfo )) ;
      });
      
      // 將合併後的所有 SimplifiedBSInfo 對象賦值給 this.allSimplifiedBsInfo 屬性
      this.allSimplifiedBsInfo = allSimplifiedData;

      // 檢查 allSimplifiedBsInfo 數組是否包含任何基站資訊
      if ( this.allSimplifiedBsInfo.length > 0 ) {

        // 有就遍歷 allSimplifiedBsInfo 並為每個基站設置圖標 URL
        this.allSimplifiedBsInfo.forEach((bsInfo, index) => {
          // 獲取 allSimplifiedBsInfo 數組中第一筆資料的名稱
          const firstBsInfoName = this.allSimplifiedBsInfo[0].name;

          // 判斷當前處理的基站是否為數組中的第一個元素（即索引為 0 的元素）
          // 如果是第一個元素（index === 0），則 isSelected 為 true，否則為 false
          // isSelected 用於確定當前基站是否應該顯示為「被選中」狀態的圖標
          const isSelected = ( index === 0 );

          // 為當前基站設置圖標 URL，根據基站的類型、狀態、是否被選中以及是否是數組中的第一個基站
          bsInfo.iconUrl = this.setIconUrl( bsInfo.bstype, bsInfo.status, isSelected, firstBsInfoName, bsInfo.name );
        });

        // 將 allSimplifiedBsInfo 數組中的第一筆基站資訊顯示於「基站資訊」欄位上
        this.displayBsInfo = this.allSimplifiedBsInfo[0];

        // 當 displayBsInfo 更新後，更新表單 @2024/01/17 Add
        //this.updateModifyConfigForm( this.displayBsInfo );
      }

      this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner

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
      
    }
  }
  
  // @12/26 Add
  // 用於存儲轉換後的所有基站資訊，每個元素代表一個基站的簡化資訊
  allSimplifiedBsInfo: SimplifiedBSInfo[] = [];
  
  // @12/26 Add
  // 用於存儲當前選中的基站簡化資訊，以便在前端的「基站資訊」欄位中顯示
  displayBsInfo: SimplifiedBSInfo | null = null;

  // 用於獲取場地內所有 BS 的資訊 @12/26 Update
  // Get the All infos of BSs in the field 
  getQueryBsInfoForAll( bsNum: number, bsinfo_Infield: BsInfoInField[] ) {

    // 輸出開始處理的訊息到控制台
    console.log('getQueryBsInfoForAll() - Start');
    
    // 輸出場地內基站的總數
    console.log('There are', bsNum, 'BSs in the', this.fieldInfo.name, 'field');
    
    // 將場地內基站的資訊映射為一個 Observable 數組，用於異步請求每個基站的詳細資訊
    const observables: Observable<BSInfo | BSInfo_dist>[] = bsinfo_Infield.map((originalBsInfoInfield) => {
      // 發起異步請求以獲取每個基站的詳細資訊
      return this.API_Field.queryBsInfo( originalBsInfoInfield.id ).pipe(
        map((response: BSInfo | BSInfo_dist) => {

          // 根據是否包含特定屬性來判斷返回的資訊類型
          if ('cellInfo' in originalBsInfoInfield) {

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
    forkJoin(observables).subscribe({
      next: (results: (BSInfo | BSInfo_dist)[]) => {

        // 初始化一個新數組用於存放所有轉換後的 SimplifiedBSInfo 對象
        const allSimplifiedData: SimplifiedBSInfo[] = [];

        // 遍歷每個異步請求的結果
        results.forEach(result => {
          if (result.bstype === 2) {

            // 如果結果為 BSInfo_dist 類型，則處理每個子基站資訊
            // 使用展開運算符...將每個子基站轉換函數返回的數組元素加入到 allSimplifiedData 數組中
            allSimplifiedData.push(...this.convertDistBsInfoToSimplifiedFormat(result as BSInfo_dist));
          } else {

            // 如果結果為 BSInfo 類型，則直接將轉換後的對象加入到 allSimplifiedData 數組
            allSimplifiedData.push(this.convertBsInfoToSimplifiedFormat(result as BSInfo));
          }
        });

        // 將合併後的所有 SimplifiedBSInfo 對象賦值給 this.allSimplifiedBsInfo 屬性
        this.allSimplifiedBsInfo = allSimplifiedData;

        // 檢查 allSimplifiedBsInfo 數組是否包含任何基站資訊
        if ( this.allSimplifiedBsInfo.length > 0 ) {

          // 有就遍歷 allSimplifiedBsInfo 並為每個基站設置圖標 URL
          this.allSimplifiedBsInfo.forEach((bsInfo, index) => {
            // 獲取 allSimplifiedBsInfo 數組中第一筆資料的名稱
            const firstBsInfoName = this.allSimplifiedBsInfo[0].name;

            // 判斷當前處理的基站是否為數組中的第一個元素（即索引為 0 的元素）
            // 如果是第一個元素（index === 0），則 isSelected 為 true，否則為 false
            // isSelected 用於確定當前基站是否應該顯示為「被選中」狀態的圖標
            const isSelected = (index === 0);

            // 為當前基站設置圖標 URL，根據基站的類型、狀態、是否被選中以及是否是數組中的第一個基站
            bsInfo.iconUrl = this.setIconUrl(bsInfo.bstype, bsInfo.status, isSelected, firstBsInfoName, bsInfo.name);
          });

          // 將 allSimplifiedBsInfo 數組中的第一筆基站資訊顯示於「基站資訊」欄位上
          this.displayBsInfo = this.allSimplifiedBsInfo[0];

          // 當 displayBsInfo 更新後，更新表單 @2024/01/17 Add
          //this.updateModifyConfigForm( this.displayBsInfo );
        }
        this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      },
      error: (error) => {

        // 如果在請求過程中出現錯誤，則在控制台輸出錯誤訊息
        console.error('Error fetching BS Infos:', error);
        this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      },
      complete: () => {

        // 當所有請求都完成後，輸出一個完成訊息
        console.log('All BS Info fetches completed');
        this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      }
    });

    // 輸出函數結束的訊息到控制台
    console.log('getQueryBsInfoForAll() - End');
  }

  // @2024/01/11 Update
  // 函數定義: 將 BSInfo 類型轉換為 SimplifiedBSInfo 類型 - All-in-one BS
  convertBsInfoToSimplifiedFormat(bsInfo: BSInfo): SimplifiedBSInfo {

    // 使用可選鏈和映射來從 bsInfo.anr 中的鄰居訊息創建 SimplifiedNeighborInfo 數組
    const neighbors = bsInfo.anr?.['anr-son-output']?.neighbor.map( neighborItem => ({
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
      neighbors,  // 設定鄰居基站數據
      iconUrl: "",

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
    
    // 返回轉換後的 SimplifiedBSInfo 對象
    return simplified;
  }

  // @2024/01/27 Update
  // 函數定義：將 BSInfo_dist 類型轉換為 SimplifiedBSInfo 類型的數組
  convertDistBsInfoToSimplifiedFormat( Dist_bsInfo: BSInfo_dist ): SimplifiedBSInfo[] {

    // 首先檢查 Dist_bsInfo.info 是否為陣列 @2024/01/27 Add
    if ( !Array.isArray( Dist_bsInfo.info ) ) {
      // 如果不是陣列，你可以選擇拋出一個錯誤或返回一個空數組
      // throw new Error('Dist_bsInfo.info is not an array');
      // 或者
      console.error('Dist_bsInfo.info is not an array:', Dist_bsInfo.info);
      return [];
    }

    // 創建一個 SimplifiedBSInfo 數組來存放每個子基站的簡化訊息
    const simplifiedInfos: SimplifiedBSInfo[] = Dist_bsInfo.info.map(subBsInfo => {

      console.log()

      // 為當前子基站尋找相應的 ANR 訊息，使用子基站的 nci 值作為鍵
      const anrKey = subBsInfo.nci;

      // 從 Dist_bsInfo.anr 中獲取對應nci的鄰居訊息，並映射為 SimplifiedNeighborInfo 數組
      const anrNeighbors = Dist_bsInfo.anr[anrKey]?.['anr-son-output']?.neighbor.map(neighborItem => ({
        'plmn-id': neighborItem['plmn-id'], // 提取鄰居的 PLMN ID 訊息
        nci: neighborItem.nci,              // 提取鄰居的 NCI 訊息
        pci: neighborItem.pci               // 提取鄰居的 PCI 訊息
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
        neighbors: anrNeighbors,                        // 映射後的鄰居 BS 數據
        iconUrl: "",

        // When update Dist BS need these:
        description: Dist_bsInfo.description,           // 從 Dist_bsInfo 取出總基站描述
        channelbandwidth: subBsInfo.DU?.bSChannelBwDL,  // 取出 DU 配置 bSChannelBwDL
        tac: subBsInfo.DU?.nRTAC,                       // 取出 DU 配置 tac
        components: Dist_bsInfo.components,

        // @2024/01/11 Add
        // When open Field Edit need these: 
        gNBId: subBsInfo.gNBId,
        gNBIdLength: subBsInfo.gNBIdLength
      };
    });

    // 返回包含所有子基站簡化訊息的數組
    return simplifiedInfos;
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
        iconName = (bsInfoStatus === 1) ? 'dist_gnb_offline_nonselected.png' : 'dist_gnb_online_nonselected.png';
        
      } else { // 其他情況選擇預設圖標

        if (bsInfoBSType === 2 && bsInfoStatus === 1) {
          iconName = 'dist_gnb_offline_default.png'; // 分布式基站離線的預設圖標
        } else if (bsInfoBSType === 2 && bsInfoStatus === 2) {
          iconName = 'dist_gnb_online_default.png';  // 分布式基站在線的預設圖標
        } else if (bsInfoBSType === 1 && bsInfoStatus === 1) {
          iconName = 'gnb_offline_nonselected.png';  // 通用基站離線的非選中圖標
        } else if (bsInfoBSType === 1 && bsInfoStatus === 2) {
          iconName = 'gnb_online_nonselected.png';   // 通用基站在線的非選中圖標
        }
      }
    }

    // 返回最終的圖標 URL
    return basePath + iconName;
  }

  // 用來切換成顯示"當下點擊的基站資訊與基站圖標"
  onSelectBsInfo( clickbsInfo: SimplifiedBSInfo, clickbsInfoName: string, clickbsInfoBSType: number, clickbsInfoStatus: number ) {

    this.ngZone.run(() => {
        // 在 Angular 的 ngZone 中執行以保證更新能正確反映在 UI 上

        // 更新顯示資訊為當前被點擊的基站
        this.displayBsInfo = clickbsInfo;

        // 遍歷所有基站，更新它們的圖標
        this.allSimplifiedBsInfo.forEach((bsInfo) => {

            // 檢查是否為被點擊的基站
            const isSelected = (bsInfo === clickbsInfo);

            // 更新圖標URL
            bsInfo.iconUrl = this.setIconUrl(bsInfo.bstype, bsInfo.status, isSelected, clickbsInfoName, bsInfo.name);
        });

        // 在控制台輸出被點擊的基站名稱、類型和狀態
        console.log("Marker", clickbsInfoName, "is clicked,\n",
                    "its type is", clickbsInfoBSType, "its status is", clickbsInfoStatus);
    });

    // 手動觸發變化檢測以更新界面
    this.cdr.detectChanges();
    // 在控制台輸出當前顯示的基站資訊
    console.log("After click onSelectBsInfo the displayBsInfo:", this.displayBsInfo)
  }

  // @2024/01/09 - Update
  // 此方法用於將位置訊息的字串轉換為 Google 地圖所需的 LatLngLiteral 對象
  parsePosition( positionStr: string): google.maps.LatLngLiteral {
    try {

      // 檢查字符串中是否包含 'NaN'
      if (positionStr.includes('NaN')) {
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
  

  // @12/25 Add
  // 用於從當前顯示基站資訊中獲取轉換後的位置對象
  get displayBsInfoPosition(): google.maps.LatLngLiteral {

    // 如果 displayBsInfo 存在，則調用 parsePosition 方法進行轉換，否則返回預設值
    return this.displayBsInfo ? this.parsePosition(this.displayBsInfo.position) : { lat: 0, lng: 0 };
  }

  //  string -> number (mobility - 換手成功率)
  // @12/18 Update coverage -> mobility by yuchen
  get mobilityAsNumber(): number {
    return parseFloat(this.fieldInfo.mobility);
  }

  // accessibility - 接入成功率
  get accessibilityAsNumber(): number {
    return parseFloat(this.fieldInfo.accessibility);
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

  modifyConfig_click_NUM: number = 0;
  // @2024/01/15 Update 
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
            description:      String(this.displayBsInfo!.description),
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
                this.API_Field.updateBs( post_BS_body ).subscribe({
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
                this.API_Field.updateDistributedBs( post_BS_body ).subscribe({
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
      this.API_Field.queryBsList().subscribe({
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
        },
        error: (error) => {
          console.error( '獲取基站列表資訊出錯:', error );
          console.error( 'Error fetching - BS List:', error );
          this.isGetQueryBsListLoading = false; // 出錯時也應隱藏 spinner
        },
        complete: () => {
          console.log('基站列表資訊獲取完成');
          console.log( 'BS List - fetch completed' );
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


  /** @2024/02/01 Update
   * 提交場域編輯信息。
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
      bsinfo: this.selectedBsInfos,              // 從先前的選擇中獲取基站信息
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
        this.API_Field.updateField( submitData ).subscribe({

          next: ( response ) => {

            // 處理成功響應
            console.log( "場域更新成功:", response );
            
            // 更新成功後重新獲取場域訊息
            this.getQueryFieldInfo();
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
      this.API_Field.uploadFieldImage( this.fieldId, file ).subscribe({
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

      this.API_Field.removeFieldImage( this.fieldId ).subscribe({
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

    if ( this.commonService.isLocal ) { // 檢查是否為使用 local files

      console.log( "is local in getfieldImage_forFieldEdit");
      this.isFieldImageOnFieldEditLoading = true;

      // 直接將本地圖片路徑賦值給 imageSrcLocal
      this.imageSrcLocal = './assets/img/fieldImage_for_local.png';

      this.have_FieldImage_flag = true; // 註記為有圖片

      // 重置記錄 Local 環境下圖片的刪除狀態
      this.removeImageInLocal_flag = false; // @2024/01/24 Add

      this.isFieldImageOnFieldEditLoading = false; // 載入 local 圖片完也停止顯示 Spinner

    } else { // 如非使用 local files

      //this.isFieldImageOnFieldEditLoading = true;

      // 從後端 API 獲取場域圖片
      this.API_Field.queryFieldImage( this.fieldId ).subscribe({
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
        },
        error: (error) => {
          console.error('Error fetching field image:', error);
          // 出錯時，也顯示提示訊息
          this.displayNoImageMessage();
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


// For PM Parameter Setting @2024/02/16 Update ↓ ( 缺 RADIO BUTTON 控制使用者選擇的量測類型 )

  PmFtpInfo: ForQueryOrUpdatePmFTPInfo = {} as ForQueryOrUpdatePmFTPInfo; // 用於儲存"效能參數"的設定資訊 @2024/02/15 Add

  measurementType: string = ''; // 用於控制"量測類型"的選擇，預設為 "" ( off ) @2024/02/16 Add

  // 用於取得"效能管理參數設定"資訊 @2024/02/20 Update
  getQueryPmFtpInfo() {
    console.log('getQueryPmFtpInfo() - Start'); // 獲取效能參數設定資訊 - 啟動

    if ( this.commonService.isLocal ) { // 檢查是否為使用 local files
      console.log('Fetching PM FTP Info from local files'); // 從本地文件獲取 PM FTP 資訊

      this.PmFtpInfo = this.pmFtpInfo_LocalFiles.pmFtpInfo_local; // 賦值本地存儲的 PM FTP 資訊
      console.log( 'PM FTP Info from Local:', this.PmFtpInfo );   // 輸出本地的 PM FTP 資訊

      // @2024/02/20 Add
      if ( this.PmFtpInfo ) { // 確保"效能參數"的設定資訊已獲取

        this.PMgmtParameterSetForm.patchValue({ // 使用現有"效能參數"填入表單
          pmIP: this.PmFtpInfo.ftpip,
          pmID: this.PmFtpInfo.ftpid,
          pmKey: this.PmFtpInfo.ftpkey,
          folderPath: this.PmFtpInfo.folderpath,
          MeasurementInterval_pmint: this.PmFtpInfo.pmint,
          UploadInterval_fmint: this.PmFtpInfo.fmint,
          measurementType: this.PmFtpInfo.metric      // "量測類型"欄位 
        });
      }  

    } else {
      console.log( 'Fetching PM FTP Info from API '); // 從 API 獲取 PM FTP 資訊

      this.API_Field.queryPmFtpInfo( this.fieldId ).subscribe({
        next: ( res: ForQueryOrUpdatePmFTPInfo ) => {
          console.log('Fetched PM FTP Info from API:', res); // 從 API 獲取的 PM FTP 資訊
          this.PmFtpInfo = res; // 更新 PM FTP 資訊

          // @2024/02/20 Add
          if ( this.PmFtpInfo ) { // 確保"效能參數"的設定資訊已獲取

            // 使用現有"效能參數"填入表單
            this.PMgmtParameterSetForm.patchValue({
              pmIP: this.PmFtpInfo.ftpip,
              pmID: this.PmFtpInfo.ftpid,
              pmKey: this.PmFtpInfo.ftpkey,
              folderPath: this.PmFtpInfo.folderpath,
              MeasurementInterval_pmint: this.PmFtpInfo.pmint,
              UploadInterval_fmint: this.PmFtpInfo.fmint,
              measurementType: this.PmFtpInfo.metric      // "量測類型"欄位 
            });
          }     
        },
        error: ( error ) => {
          console.error('Error fetching PM FTP Info:', error); // 獲取 PM FTP 資訊出錯
        },
        complete: () => {
          console.log('PM FTP Info fetch completed');          // PM FTP 資訊獲取完成
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

  // @2024/02/20 Update
  // 用於記錄 Radio Button 選擇的"量測類型"
  logClickMeasurementType( value: string ) {
    this.measurementType = value; // 設定當前選擇的量測類型

    if ( value === "selfDefined" ) {
      // 如果選擇的是自定義量測類型且還沒有添加任何自定義參數，則添加一個新的輸入欄位
      if ( this.selfDefinedParameters.length === 0 ) {
        this.addSelfDefinedParameterInput();
      }
    } else {
      // 如果選擇的不是自定義量測類型，則清空所有自定義參數輸入欄位
      while ( this.selfDefinedParameters.length !== 0 ) {
        this.removeSelfDefinedParameterInput( 0 );
      }
    }

    // 根據選擇的量測類型輸出不同的日誌
    if ( this.measurementType === "" ) {
      console.log( 'Selected Measurement Type: Off' );
    } else {
      console.log( 'Selected Measurement Type:', this.measurementType );
    }
    
    // 其他邏輯...
  }

 // 當選擇 'selfDefined' 選項時調用此方法
  addSelfDefinedParameterInput() {
    const selfDefinedParameters = this.PMgmtParameterSetForm.get( 'selfDefinedParameters' ) as FormArray;
    // 為每個新的自定義參數創建一個 FormGroup，並在其中添加一個名為 'value' 的 FormControl
    const group = new FormGroup({
      'SelfDefinedParameter_input': new FormControl( '', Validators.required )
    });
    selfDefinedParameters.push( group );
  }

  // @2024/02/20 Add
  // 調用此方法以刪除新增的自定義參數輸入區
  removeSelfDefinedParameterInput( index: number ) {
    const selfDefinedParameters = this.PMgmtParameterSetForm.get( 'selfDefinedParameters' ) as FormArray;
    selfDefinedParameters.removeAt( index ); // 從 selfDefinedParameters FormArray 中移除指定索引的 FormGroup
  }


  // 引用"效能管理參數設定"視窗組件
  @ViewChild('PMgmtParameterSetWindow') PMgmtParameterSetWindow: any;
  PMgmtParameterSetWindowRef!: MatDialogRef<any>;
  PMgmtParameterSetFormValidated = false;

  // 打開"效能管理參數設定"視窗 @2024/02/15 Update
  openPMgmtParameterSetWindow() {

    this.getQueryPmFtpInfo(); // 取得"效能管理參數設定"資訊

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
                  measurementType: this.PmFtpInfo.metric // "量測類型"欄位 @2024/02/16 Add
      });
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

  // 點擊 PMgmt Parameter Setting 視窗的 Cancel 按鈕行為 @2024/02/15 Add
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

// For PM Parameter Setting @2024/02/16 Update ↑








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