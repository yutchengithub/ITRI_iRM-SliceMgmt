import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../shared/common.service';
import { SoftwareList } from './../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';

import { forkJoin, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';          // @12/13 Add for use 'detectChanges()'
import { environment } from 'src/environments/environment'; // @12/20 Add for import Google Maps API Key
import { NgZone } from '@angular/core';

import { FieldInfo } from '../../shared/interfaces/Field_Info/For_queryFieldInfo';              // @12/21 Add
import { BsInfoInField } from '../../shared/interfaces/Field_Info/For_queryFieldInfo';          // @12/21 Add

import { BSInfo } from '../../shared/interfaces/BS_Info/For_queryBsInfo_BS';                    // @12/21 Add
import { BSInfo_dist, PLMNid } from '../../shared/interfaces/BS_Info/For_queryBsInfo_dist_BS';  // @12/24 Add
import { map } from 'rxjs/operators';                                 // @12/24 Add
import { localBSinfo } from '../../shared/local-files/For_BS';        // @12/27 Add
import { apiForField } from '../../shared/api/For-field-management';  // @2024/01/04 Add for import API of Field Management 

import { GoogleMap } from '@angular/google-maps';  // @2024/01/03 Add


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

export interface SimplifiedBSInfo {
  name: string;
  bstype: number;
  status: number;
  nci: string;
  pci: number;
  'plmn-id': PLMNid;
  "tx-power": number;
  "nrarfcn-dl": number;
  "nrarfcn-ul": number;
  position: string;
  neighbors: SimplifiedNeighborInfo[];
  iconUrl: string; // 存儲基站圖標的 URL
}

export interface SimplifiedNeighborInfo {
  'plmn-id': PLMNid;
  nci: string;
  pci: number;
}

// @2024/01/03 Add
// 定義一個枚舉來表示不同的 overlay 類型
enum OverlayType {
  FieldImage,
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
  cloudId: string = '';
  cloudName: string = '';

  fieldInfo: FieldInfo = {} as FieldInfo;      // @12/05 Add by yuchen
  fieldId: string = '';     // @12/05 Add by yuchen
  fieldName: string = '';   // @12/05 Add by yuchen

  refreshTimeout!: any;
  refreshTime: number = 5;

  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  nullList: string[] = [];  // 給頁籤套件使用

  @ViewChild('updateModal') updateModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;

  ocloudInfo: OcloudInfo = {} as OcloudInfo;
  ocloudPerformance: OcloudPerformance = {} as OcloudPerformance;
  softwareList: SoftwareList[] = [];
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};

  
  // For Fault Alarms: 
  // CRITICAL, MAJOR, MINOR, WARNING
  severitys: string[];

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };


// ↓ For setting Google Maps @12/20 Update by yuchen

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
  zoom = 16;

  // 定義地圖的其他配置選項，包括樣式，來隱藏默認的地標
  mapOptions: google.maps.MapOptions = {
    //center:{ lat: 0, lng: 0 }
    mapTypeId: 'roadmap',            // 設置地圖類型為道路地圖
    disableDefaultUI: true,          // 禁用地圖預設的用戶界面元件
    backgroundColor: '#126df5',      // 設置地圖的背景顏色
    clickableIcons: false,           // 設置地圖上的圖標是否可點擊
    disableDoubleClickZoom: true,    // 禁用雙擊縮放功能
    draggable: true,                 // 禁止用戶拖動地圖
    zoomControl: true,               // 禁止用戶通過控件來縮放地圖
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
    scaledSize: new google.maps.Size(30, 30), // 設定圖標的大小
    origin: new google.maps.Point(0, 0),      // 圖標的起始點
    anchor: new google.maps.Point(15, 15),    // 圖標錨點的位置
  };

// ↑ For setting Google Maps @12/20 Update by yuchen




  // @12/13 Add for listen activeButton
  // 用於監聽當前哪個按鈕是激活的
  //activeButton_NR: string | null = 'NR';       // 預設激活 'NR' 按鈕
  activeButton_NR: string | null = null;         // 預設不激活 'NR' 按鈕 @12/21 Add
  activeButton_menu: string | null = null;       // 儲存當前激活的菜單按鈕 ID

  // @2024/01/02 Add
  // 使用 @ViewChild 裝飾器來獲取模板中 <google-map> 元素的實例。
  // '!' 非空斷言操作符告訴 TypeScript 編譯器該屬性將會在後續的代碼中被賦值，
  // 因此它在初始化時不會是 null。這避免了 TypeScript 的嚴格 null 檢查錯誤。
  @ViewChild(GoogleMap) map!: GoogleMap; // 獲取 Google 地圖實例的引用

  // 用於儲存場域多邊形的邊界點 @2024/01/02 Add
  fieldBounds!: google.maps.LatLngBoundsLiteral;    // 用於儲存放置 GroundOverlay 的場域邊界資訊

  // 在類的屬性中添加一個用於跟蹤 overlay 顯示狀態的變量
  overlayVisible: boolean = false;                  // 一個 boolean 變量，用於指示 GroundOverlay 是否應該顯示在地圖上
  overlay: google.maps.GroundOverlay | null = null; // 用於存儲 GroundOverlay 實例的變量，初始值為 null。這個變量將在需要顯示場域圖片時被賦值

  // 用於跟蹤當前 overlay 類型的屬性 @2024/01/03 Add
  currentOverlayType: OverlayType = OverlayType.None;

  // 在地圖上的場域區域中顯示傳入的圖片 @2024/01/03 Update - 加入依據點擊類型顯示
  displayImageOnMap( imageSrc: string, overlayType: OverlayType ) {

    if ( this.map.googleMap && this.overlayVisible ) {
      // 設置當前 overlay 類型
      this.currentOverlayType = overlayType;
      
      // 創建並顯示 overlay
      this.overlay = new google.maps.GroundOverlay( imageSrc, this.fieldBounds ); // 使用場域圖片和邊界創建一個 GroundOverlay 實例
      this.overlay.setMap(this.map.googleMap); // 將創建的 GroundOverlay 添加到 Google 地圖實例上
      this.overlay.setOpacity( 0.5 );            // 設定 GroundOverlay 的透明度

      console.log( 'Display', this.currentOverlayType, 'Overlay:', this.overlay );
    }
  }

  // 隱藏(移除)在地圖上的場域區域中的圖片 @2024/01/03 Update
  removeOverlay() {

    // 檢查 overlay 物件是否已經被創建
    if (this.overlay) {
      this.overlay.setMap(null); // 將 overlay 從 Google 地圖上移除
      this.overlay = null;       // 將 overlay 物件設置為 null，釋放資源並避免內存洩漏
      this.currentOverlayType = OverlayType.None;   // 重置當前 overlay 類型為 None

      console.log('Remove the Overlay:', this.overlay);
    }
  }

  activeButton_fieldImage: string | null = null; // 儲存當前激活的場域圖片按鈕 ID

  // 當按鈕被點擊時，觸發更新激活按鈕"fieldImage"的狀態 @2024/01/03 Update
  setActiveButton_fieldImage( buttonId: string ) {
    console.log("The click button is:", buttonId)

    if ( this.activeButton_fieldImage === null ) {
      
      if ( this.activeButton_rsrp_sinr || this.currentColorbar ){
        this.activeButton_rsrp_sinr = null; // 隱藏 SINR/RSRP 圖片
        this.currentColorbar = null;        // 隱藏 ColorBar
        this.removeOverlay();               // 移除當前顯示的 overlay
        this.overlayVisible = false;
      }
      this.activeButton_fieldImage = buttonId;
      this.overlayVisible = true;
      this.getfieldImage();
      
    } else {
      this.activeButton_fieldImage = null;
      this.removeOverlay(); // 移除當前顯示的 overlay
      this.overlayVisible = false;
    }
  }
  

  // 獲取並顯示場域圖片 
  // @2024/01/03 Update - local Processing, displayImageOnMap()
  // @2024/01/04 Add loading spinner
  getfieldImage(){
    
    this.isMarkersLoading = true; // 點擊 Field Image 時，開始顯示 Spinner 表載入圖片中 

    if ( this.activeButton_fieldImage ) {
      // 檢查 Field Image 按鈕是否有被激活。
      // 如果此變數不為 null，則表示用戶已點擊了 Field Image 按鈕，
      // 並且期望根據當前的激活狀態來顯示或隱藏場域圖片。

      if ( this.commonService.isLocal ) { // 檢查是否為使用 local files

        // 設定場域圖片的 Local 路徑
        const imageSrc_localPath = './assets/img/fieldImage_for_local.png'; // 定義本地場域圖片的路徑

        // 檢查 Local 場域圖片路徑是否存在
        if ( imageSrc_localPath ) {
          this.displayImageOnMap( imageSrc_localPath, OverlayType.FieldImage );  // 如存在，則在地圖上顯示場域 local 圖片
        }
        this.isMarkersLoading = false; // Local 圖片載入完成，隱藏 Spinner

      } else { // 如非使用 local files

        // 跟後端 API 取得場域圖片
        this.commonService.queryFieldImage( this.fieldId ).subscribe({
          next: (response) => {
            // 當接收到圖片數據時，處理 Base64 編碼的圖片
            if (response && response.fieldImage) {
              const imageSrc = 'data:image/png;base64,' + response.fieldImage; // 將 Base64 字符串轉換為圖片URL
              this.displayImageOnMap( imageSrc, OverlayType.FieldImage );      // 在地圖上顯示場域圖片
            }
          },
          // 當圖片獲取失敗時，顯示其錯誤訊息
          error: (error) => {
            console.error('Error fetching field image:', error);
            this.isMarkersLoading = false; // 出錯時，也隱藏 Spinner
          },
          // 當圖片獲取過程完成時，顯示完成訊息
          complete: () => {
            console.log('Field image fetch completed');
            this.isMarkersLoading = false; // 加載完成，隱藏 Spinner
          }
        });
      }
    }
  }

  // @12/08 Add for toggle colobar
  currentColorbar: 'RSRP' | 'SINR' | null = null; // 開始時不顯示任何 colorbar

  // @2024/01/03 Update
  toggleColorbar(type: 'RSRP' | 'SINR') {
    console.log("The click button is:", type);

    // 如果 Field image 的按鈕是激活狀態，則移除 Field image 的 overlay
    if (this.activeButton_fieldImage && this.overlayVisible === true) {
      this.activeButton_fieldImage = null; // 將 Field image 的按鈕狀態設為非激活
      this.removeOverlay();        // 移除 overlay
      this.overlayVisible = false; // 設定 overlay 不可見
    }

    // 切換 Colorbar 狀態
    if (this.currentColorbar === null) {
      this.currentColorbar = type;
      this.setActiveButton_rsrp_sinr(type);
    } else {
      if (type === this.currentColorbar) {
        this.currentColorbar = null;
        this.removeOverlay(); // 移除當前顯示的 overlay
        this.overlayVisible = false; // 設定 overlay 不可見
      } else {
        this.currentColorbar = type;
        this.setActiveButton_rsrp_sinr(type);
      }
    }
  }

  activeButton_rsrp_sinr: string | null = null;  // 儲存當前激活的 RSRP 或 SINR 圖示按鈕 ID

  // @2024/01/03 Update
  setActiveButton_rsrp_sinr(buttonId: string) {
    console.log("The click button is:", buttonId);

    
    // 切換 RSRP/SINR 圖示按鈕狀態
    if (this.activeButton_rsrp_sinr === null) {

      this.activeButton_rsrp_sinr = buttonId;
      const overlayType = (this.activeButton_rsrp_sinr === 'SINR') ? OverlayType.SINR : OverlayType.RSRP;
      this.overlayVisible = true; // 設定 overlay 為可見
      this.getSinrRsrpImage(overlayType);

    } else {
      
      this.removeOverlay(); // 移除當前顯示的 overlay
      this.activeButton_rsrp_sinr = buttonId;
      const overlayType = (this.activeButton_rsrp_sinr === 'SINR') ? OverlayType.SINR : OverlayType.RSRP;
      this.overlayVisible = true; // 設定 overlay 為可見
      this.getSinrRsrpImage(overlayType);

    }
  }

  // @2024/01/04 Update
  getSinrRsrpImage( overlayType: OverlayType ) {
    
    this.isMarkersLoading = true; // 點擊 RSRP Map 或 SINR Map 時，開始顯示 Spinner 表載入圖片中

    // 根據 overlayType 決定 mapType
    const mapType = ( overlayType === OverlayType.SINR ) ? 0 : 1;

    if ( this.activeButton_rsrp_sinr ) {
      if (this.commonService.isLocal) {
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
        this.isMarkersLoading = false; // Local 圖片載入完成，隱藏 Spinner
      } else {

        // 從 fieldBounds 提取經緯度
        const leftLongitude = this.fieldBounds.west;  // 西邊界經度
        const leftLatitude = this.fieldBounds.north;  // 北邊界緯度
        const rightLongitude = this.fieldBounds.east; // 東邊界經度
        const rightLatitude = this.fieldBounds.south; // 南邊界緯度

        // 調用後端 API 獲取 SINR 或 RSRP 圖片
        this.commonService.bsHeatMap( this.fieldId, leftLongitude, leftLatitude,
                                       rightLongitude, rightLatitude, mapType ).subscribe({
          next: (response) => {
            const imageSrc = 'data:image/png;base64,' + response.heatMap; // 從後端回應中獲取圖片
            this.displayImageOnMap( imageSrc, overlayType );
          },
          error: (error) => {
            console.error("Error fetching SINR/RSRP image:", error);
            this.isMarkersLoading = false; // 出錯時，也隱藏 Spinner
          },
          complete: () => {
            console.log("SINR/RSRP image fetch completed");
            this.isMarkersLoading = false; // 加載完成，隱藏 Spinner
          }
        });
      }
    }
  }

  // 用於跟蹤鄰居線條的顯示狀態 @2024/01/04 Add 
  showNeighborLines: boolean = false;

  // Polyline 數組，用於保存基站之間的線條 @2024/01/04 Add 
  nrLines: google.maps.Polyline[] = [];

  /** @2024/01/04 Add
   * 當按鈕被點擊時調用的函數，用於切換基站之間連線的顯示狀態
   * @param {string} buttonId - 被點擊的按鈕ID
   */
  setActiveButton_NR(buttonId: string) {
    // 如果當前按鈕 ID 和傳入的 ID 相同，則取消選中，否則設置為選中
    this.activeButton_NR = this.activeButton_NR === buttonId ? null : buttonId;
    
    // 切換顯示或隱藏與鄰居 BS 的連線
    this.showNeighborLines = !this.showNeighborLines;
    this.toggleNeighborLines(this.showNeighborLines);
  }

  /** @2024/01/04 Add
   * 用於繪製或移除 BS 之間的線條
   * @param {boolean} show - 指示是否顯示線條
   */
  toggleNeighborLines(show: boolean) {
    if (show) {
      // 繪製線條
      this.allSimplifiedBsInfo.forEach(bs => {
        if (bs.neighbors) {
          bs.neighbors.forEach(neighbor => {
            const neighborBs = this.allSimplifiedBsInfo.find(nbs => nbs.nci === neighbor.nci);
            if (neighborBs) {

              // 使用 parsePosition 函數來轉換位置字串為 LatLngLiteral 對象
              const bsPosition = this.parsePosition(bs.position);
              const neighborBsPosition = this.parsePosition(neighborBs.position);

              // 創建路徑矩陣
              const linePath = [bsPosition, neighborBsPosition];

              // 創建 Polyline
              const polyline = new google.maps.Polyline({
                path: linePath,           // 設定 Polyline 的路徑點，將連接起來形成一條線
                geodesic: true,           // 設定是否依據地球曲率顯示弧線
                strokeColor: '#69ebf0f5', // 設定線的顏色
                strokeOpacity: 0.4,       // 設定線的透明度
                strokeWeight: 3           // 設定線的寬度(px)
              });

              // 將 Polyline 添加到地圖上
              this.addPolylineToMap(polyline);

              // 將 Polyline 添加到 nrLines 陣列中以便日後移除
              this.nrLines.push(polyline);
            }
          });
        }
      });
    } else {
      // 移除線條
      this.nrLines.forEach(polyline => {
        this.removePolylineFromMap(polyline);
      });
      // 清空儲存線條的矩陣
      this.nrLines = [];
    }
  }

  /** @2024/01/04 Add
   * 將 Polyline 添加到地圖上的方法
   * @param {google.maps.Polyline} polyline - 要添加到地圖上的 Polyline 對象
   */
  addPolylineToMap(polyline: google.maps.Polyline) {
    // 確認地圖已經載入，然後將 Polyline 設置到地圖上
    if (this.map.googleMap) {
      polyline.setMap(this.map.googleMap);
    }
  }

  /** @2024/01/04 Add
   * 從地圖上移除 Polyline 的方法
   * @param {google.maps.Polyline} polyline - 要從地圖上移除的 Polyline 對象
   */
  removePolylineFromMap(polyline: google.maps.Polyline) {
    // 將 Polyline 的地圖屬性設置為 null，從而將其從地圖上移除
    polyline.setMap(null);
  }

  setActiveButton_menu( buttonId: string ) {
    this.activeButton_menu = this.activeButton_menu === buttonId ? null : buttonId;
  }

  showMapModel: boolean = true;                   // 控制是否顯示地圖模式的 Flag    @12/13 Add
  recordColorbar: 'RSRP' | 'SINR' | null = null;  // 用於記錄 Colorbar 狀態的 Flag @12/13 Add

  // 用於切換顯示地圖模式或基站列表 @12/13 Add to toggle Map Mode or BS List
  toggleMenuButton() {

    this.showMapModel = !this.showMapModel; // 切換顯示的頁面並更新該 Flag 狀態
    //console.log("toggle showMapModel:", this.showMapModel);

    // 記錄切換頁面當下的 ColorBar 狀態 ( 沒值時才記錄 )
    if ( !this.recordColorbar ){
      this.recordColorbar = this.currentColorbar;
    }

    // 如切換的頁面為地圖模式，就預設激活 'NR' 按鈕
    // if ( this.showMapModel === true ) {
    //   this.activeButton_NR = 'NR';
    // }

    // 如果記錄的 Colorbar 不為空且切換的頁面為地圖模式，則恢復顯示記錄的 Colorbar
    if ( this.recordColorbar != null && this.showMapModel === true ) {

      this.currentColorbar = this.recordColorbar;
      //console.log("recordColorbar:", this.recordColorbar);
      this.cdr.detectChanges();   // 手動觸發變更檢測
      this.recordColorbar = null; // 初始化記錄 Colorbar 狀態的 Flag

    } else { // 如切換的頁面不為地圖模式，就將此 flag 設為空並隱藏 ColorBar
      this.currentColorbar = null;
      //console.log("recordColorbar:", this.recordColorbar);
      this.cdr.detectChanges(); // 手動觸發變更檢測
    }

  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    public bsLocalFiles: localBSinfo,    // @12/27 Add for import BS Local Files
    //public API_field: apiForField,       // @2024/01/04 Add for import API of Field Management 
    private fb: FormBuilder,
    private dialog: MatDialog,
    public languageService: LanguageService,
    // @12/13 Add - 使用 detectChanges() 方法用於手動觸發 Angular 的變更檢測機制，
    //              確保當數據模型更新後，相關的視圖能夠及時反映
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    const googleMapsApiKey = environment.googleMapsApiKey; // @12/20 Add for import Google Maps API Key
    this.severitys = this.commonService.severitys;         // 取得告警資訊種類名稱
  }

  // 頁面初始化
  ngOnInit(){

    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.fieldId = params['id'];
      this.fieldName = params['name'];
      console.log('fieldId: ' + this.fieldId + ', fieldName: ' + this.fieldName + ',\nsend from /main/field-mgr');
      this.getQueryFieldInfo();
    });

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
  calculateBoundingBoxCenter(points: google.maps.LatLngLiteral[]): google.maps.LatLngLiteral {

    // 初始化最小和最大緯度、經度值，初始值設定為陣列中的第一個點的緯度和經度
    let minLat = points[0].lat;
    let maxLat = points[0].lat;
    let minLng = points[0].lng;
    let maxLng = points[0].lng;
  
    // 遍歷 points 矩陣中的每一個 google.maps.LatLngLiteral 物件
    points.forEach(point => {
      // 如果當前點的緯度小於已知的最小緯度，更新 minLat 的值
      if (point.lat < minLat) minLat = point.lat;
      // 如果當前點的緯度大於已知的最大緯度，更新 maxLat 的值
      if (point.lat > maxLat) maxLat = point.lat;
      // 如果當前點的經度小於已知的最小經度，更新 minLng 的值
      if (point.lng < minLng) minLng = point.lng;
      // 如果當前點的經度大於已知的最大經度，更新 maxLng 的值
      if (point.lng > maxLng) maxLng = point.lng;
    });
  
    // 計算緯度和經度的平均值，得出邊界框的中心點經緯度，並返回這個中心點
    return {
      lat: (minLat + maxLat) / 2,
      lng: (minLng + maxLng) / 2
    };
  }


  // 用於計算最佳視角和縮放級別( zoom of google map ) @2024/01/04 Add
  calculateBestZoom() {
    // 創建一個新的 LatLngBounds 對象
    const bounds = new google.maps.LatLngBounds();
    
    // 將 polyPath 中的每個點加入 bounds 中
    this.polyPath.forEach((position) => {
      bounds.extend(position);
    });
    
    // 這將會在地圖加載後自動調整到最佳視角和縮放級別
    // 注意: 這需要在地圖加載並準備好之後調用
    // if (this.map.googleMap) {
    //   this.map.googleMap.fitBounds(bounds);
    // }
  }
  
  isMarkersLoading = true; // 加載狀態的標誌，初始設置為 true @12/28 Add for Progress Spinner

  // @2024/01/02 Add - 儲存場域邊界點
  // @2024/01/04 Update - Add calculateBestZoom()
  getQueryFieldInfo() {
    console.log('getQueryFieldInfo() - Start'); // 啟動獲取場域資訊

    console.log('Start fetching field info');   // 開始獲取場域資訊
    clearTimeout(this.refreshTimeout);

    if ( this.commonService.isLocal ) { // 檢查是否為使用 local files

      // For testing with local files
      console.log('Start fetching field info in Local');   // 開始獲取 local 場域資訊
      this.fieldInfo = this.commonService.fieldInfo;
      console.log( 'Local field info in Local:', this.fieldInfo );

      this.updateResourceUtilization();

      // 儲存場域位置 @12/27 Add
      // 該處建立了一個包含場域四個角落位置的矩陣，
      // 並且將場域的第一個位置再次添加到矩陣的末尾，以確保多邊形是閉合的。
      const positions = [
        this.parsePosition(this.fieldInfo.fieldposition1),
        this.parsePosition(this.fieldInfo.fieldposition2),
        this.parsePosition(this.fieldInfo.fieldposition3),
        this.parsePosition(this.fieldInfo.fieldposition4),
        this.parsePosition(this.fieldInfo.fieldposition1)  // 該位置用於閉合多邊形框線
      ];
      console.log( 'Local field position:', positions );

      this.polyPath = positions;

      this.calculateBestZoom(); // @2024/01/04 Add

      // 儲存或更新場域邊界點 @2024/01/02 Add
      this.fieldBounds = {

        // `north` 表示多邊形北邊的緯度，通過取所有頂點緯度的最大值來確定
        north: Math.max(...positions.map(p => p.lat)),
        
        // `south` 表示多邊形南邊的緯度，通過取所有頂點緯度的最小值來確定
        south: Math.min(...positions.map(p => p.lat)),
        
        // `east` 表示多邊形東邊的經度，通過取所有頂點經度的最大值來確定
        east: Math.max(...positions.map(p => p.lng)),
        
        // `west` 表示多邊形西邊的經度，通過取所有頂點經度的最小值來確定
        west: Math.min(...positions.map(p => p.lng)),
      };

      // 計算場域中心用來設定地圖的初始視圖中心
      this.center = this.calculateBoundingBoxCenter( positions );

      this.processFieldInfo(); // 處理場域資訊
      
      this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
    } else {
      
      console.log('Start fetching field info feom API');   // 開始獲取場域資訊

      // Use commonService's queryFieldInfo() to make an HTTP GET request
      this.commonService.queryFieldInfo(this.fieldId).subscribe({
        next: (res) => {

          // 當 API 響應數據到達時，執行此回調
          // This callback is executed when API response data arrives
          console.log('從 API 獲取 queryFieldInfo\n( Fetched queryFieldInfo from API ): ', res, 
                        '\nfieldId: ' + res.id + ', fieldName: ' + res.name);
          console.log('從 API 獲取 fieldId.bsinfo\n( Fetched fieldId.bsinfo from API ):', res.bsinfo);
          this.fieldInfo = res;
          console.log('場域資訊\n( Field info ):', this.fieldInfo); // 取得的場域資訊 ( Obtained field information ):

          this.updateResourceUtilization();

          // 儲存場域位置 @12/20 Add
          // 該處建立了一個包含場域四個角落位置的矩陣，
          // 並且將場域的第一個位置再次添加到矩陣的末尾，以確保多邊形是閉合的。
          const positions = [
            this.parsePosition(this.fieldInfo.fieldposition1),
            this.parsePosition(this.fieldInfo.fieldposition2),
            this.parsePosition(this.fieldInfo.fieldposition3),
            this.parsePosition(this.fieldInfo.fieldposition4),
            this.parsePosition(this.fieldInfo.fieldposition1)  // 該位置用於閉合多邊形框線
          ];

          // 更新 polyPath 和中心點 @12/20 Add
          // polyPath 用來儲存多邊形各個頂點的經緯度，這個數據將被用於在地圖上繪製多邊形。
          this.polyPath = positions;

          // 儲存或更新場域邊界點 @2024/01/02 Add
          this.fieldBounds = {
            // `north` 表示多邊形北邊的緯度，通過取所有頂點緯度的最大值來確定
            north: Math.max(...positions.map(p => p.lat)),
            
            // `south` 表示多邊形南邊的緯度，通過取所有頂點緯度的最小值來確定
            south: Math.min(...positions.map(p => p.lat)),
            
            // `east` 表示多邊形東邊的經度，通過取所有頂點經度的最大值來確定
            east: Math.max(...positions.map(p => p.lng)),
            
            // `west` 表示多邊形西邊的經度，通過取所有頂點經度的最小值來確定
            west: Math.min(...positions.map(p => p.lng)),
          };
          
          // 這個計算出的中心點將被用來設定地圖的初始視圖中心。
          //this.center = this.calculateCenter(positions); // 用於計算多邊形頂點的平均中心點
          this.center = this.calculateBoundingBoxCenter(positions); 
          // 輸出中心點到控制台，這樣可以用於調試和確認中心點是否如預期被正確計算。
          console.log('In getQueryFieldInfo() - center:', this.center);

          // 確保場域資訊已經被賦值後再進行後續處理
          // Ensure field info is assigned before proceeding
          this.processFieldInfo(); // 進行後續處理
        },
        error: (error) => {

          // 獲取資訊出錯時執行此回調
          // This callback is executed when there is an error fetching the info
          console.error('獲取場域資訊出錯:', error);
          console.error('Error fetching field info:', error);
          this.isMarkersLoading = false; // 出錯時也應隱藏 spinner @12/28 Add for Progress Spinner
        },
        complete: () => {

          // 請求完成時執行此回調
          // This callback is executed when the request is complete
          console.log('場域資訊獲取完成');
          console.log('Field info fetch completed');
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

      console.log( 'Local BS info in Local:', this.bsLocalFiles.bsInfo_local );
      console.log( 'Local Dist_BS info in Local:', this.bsLocalFiles.dist_bsInfo_local );

      // 初始化一個新數組用於存放所有轉換後的 SimplifiedBSInfo 對象
      const allSimplifiedData: SimplifiedBSInfo[] = [];

      // 遍歷 dist_bsInfo_local 數組並處理每一筆數據
      this.bsLocalFiles.dist_bsInfo_local.forEach( ( distBsInfo: BSInfo_dist ) => {
        allSimplifiedData.push( ...this.convertDistBsInfoToSimplifiedFormat( distBsInfo ));
      });

      // 遍歷 bsInfo_local 數組並處理每一筆數據
      this.bsLocalFiles.bsInfo_local.forEach( ( bsInfo: BSInfo ) => {
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
  getQueryBsInfoForAll(bsNum: number, bsinfo_Infield: BsInfoInField[]) {

    // 輸出開始處理的訊息到控制台
    console.log('getQueryBsInfoForAll() - Start');
    
    // 輸出場地內基站的總數
    console.log('There are', bsNum, 'BSs in the', this.fieldInfo.name, 'field');
    
    // 將場地內基站的資訊映射為一個 Observable 數組，用於異步請求每個基站的詳細資訊
    const observables: Observable<BSInfo | BSInfo_dist>[] = bsinfo_Infield.map((originalBsInfoInfield) => {
      // 發起異步請求以獲取每個基站的詳細資訊
      return this.commonService.queryBsInfo(originalBsInfoInfield.id).pipe(
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
        }
        this.isMarkersLoading = false; // 加載完成，隱藏 spinner @12/28 Add for Progress Spinner
      },
      error: (error) => {

        // 如果在請求過程中出現錯誤，則在控制台輸出錯誤信息
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

  // @12/26 Add
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
    })) || []; // 如果 bsInfo.anr 是 undefined，則 neighbors 默認為空數組

    // 創建一個 SimplifiedBSInfo 類型的對象，並用 bsInfo 中的數據填充
    const simplified: SimplifiedBSInfo = {

      name: bsInfo.name,      // 從 bsInfo 取出基站名稱
      bstype: bsInfo.bstype,  // 從 bsInfo 取出基站類型
      status: bsInfo.status,  // 從 bsInfo 取出基站狀態
      nci: bsInfo.info['bs-conf'].nci, // 從 bsInfo 的 info['bs-conf'] 取出 nci
      pci: bsInfo.info['bs-conf'].pci, // 從 bsInfo 的 info['bs-conf'] 取出 pci
      'plmn-id': { // 從 bsInfo 的 info['bs-conf']['plmn-id'] 取出 mcc 和 mnc 並創建 plmn-id 對象
        mcc: bsInfo.info['bs-conf']['plmn-id'].mcc,
        mnc: bsInfo.info['bs-conf']['plmn-id'].mnc,
      },
      "tx-power": bsInfo.info['bs-conf']['tx-power'],     // 從 bsInfo 的 info['bs-conf'] 取出發射功率
      "nrarfcn-dl": bsInfo.info['bs-conf']['nrarfcn-dl'], // 從 bsInfo 的 info['bs-conf'] 取出下行 NR ARFCN
      "nrarfcn-ul": bsInfo.info['bs-conf']['nrarfcn-ul'], // 從 bsInfo 的 info['bs-conf'] 取出上行 NR ARFCN 
      position: bsInfo.position,  // 從 bsInfo 取出基站位置    
      neighbors,  // 設定鄰居基站數據
      iconUrl: ""
    };
    
    // 返回轉換後的 SimplifiedBSInfo 對象
    return simplified;
  }

  // @12/26 Add
  // 函數定義：將 BSInfo_dist 類型轉換為 SimplifiedBSInfo 類型的數組
  convertDistBsInfoToSimplifiedFormat(Dist_bsInfo: BSInfo_dist): SimplifiedBSInfo[] {

    // 創建一個 SimplifiedBSInfo 數組來存放每個子基站的簡化訊息
    const simplifiedInfos: SimplifiedBSInfo[] = Dist_bsInfo.info.map(subBsInfo => {

      // 為當前子基站尋找相應的 ANR 訊息，使用子基站的 nci 值作為鍵
      const anrKey = subBsInfo.nci;

      // 從 Dist_bsInfo.anr 中獲取對應nci的鄰居訊息，並映射為 SimplifiedNeighborInfo 數組
      const anrNeighbors = Dist_bsInfo.anr[anrKey]?.['anr-son-output']?.neighbor.map(neighborItem => ({
        'plmn-id': neighborItem['plmn-id'], // 提取鄰居的 PLMN ID 訊息
        nci: neighborItem.nci,              // 提取鄰居的 NCI 訊息
        pci: neighborItem.pci               // 提取鄰居的 PCI 訊息
      })) || []; // 如果對應的 ANR 訊息不存在，則使用空數組作為默認值

      // 創建一個新的 SimplifiedBSInfo 對象，包含從子基站訊息和 ANR 訊息中提取的數據
      return {
        name: Dist_bsInfo.name,              // 總基站名稱
        bstype: Dist_bsInfo.bstype,          // 基站類型
        status: Dist_bsInfo.status,          // 基站狀態
        nci: subBsInfo.nci,                  // 子基站的 NCI
        pci: subBsInfo.DU?.nRPCI,            // 子基站的 DU 中的 nRPCI 值
        'plmn-id': {                         // 子基站的 PLMN ID 訊息
          mcc: subBsInfo.CU?.pLMNId_MCC,
          mnc: subBsInfo.CU?.pLMNId_MNC,
        },
        "tx-power": subBsInfo.DU?.configuredMaxTxPower, // DU 配置的最大傳輸功率
        "nrarfcn-dl": subBsInfo.DU?.arfcnDL,            // 下行頻率
        "nrarfcn-ul": subBsInfo.DU?.arfcnUL,            // 上行頻率
        position: subBsInfo.RU?.position,               // RU 的位置訊息
        neighbors: anrNeighbors,                        // 映射後的鄰居基站數據
        iconUrl: ""
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
    if (isSelected) {

      if (bsInfoBSType === 2 && bsInfoStatus === 1) {
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
      if (bsInfoBSType === 2 && currentBsInfoName === firstORclickBsInfoName) {
      
        // 符合就選擇分布式基站的非選中圖標
        iconName = (bsInfoStatus === 1) ? 'dist_gnb_offline_nonselected.png' : 'dist_gnb_online_nonselected.png';
        
      } else { // 其他情況選擇默認圖標

        if (bsInfoBSType === 2 && bsInfoStatus === 1) {
          iconName = 'dist_gnb_offline_default.png'; // 分布式基站離線的默認圖標
        } else if (bsInfoBSType === 2 && bsInfoStatus === 2) {
          iconName = 'dist_gnb_online_default.png';  // 分布式基站在線的默認圖標
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


  // Get response of queryBsInfo API
  // 該函數執行完應該會返回一個 Observable
  // getQueryBsInfo(bsId: string) {
  //   console.log('getQueryBsInfo() - Start');
  //   console.log('bsId: ', bsId);

  //   // 直接返回 API 請求的 Observable
  //   return this.commonService.queryBsInfo(bsId).pipe(
  //     tap({
  //       next: (res) => {
  //         console.log('Get queryBsInfo from API:', res, '\nBsName:', res.name, ', BsId:', res.id);

  //         // 處理從 API 獲取的基站資訊中的位置訊息
  //         if (!res.position) { // 檢查位置訊息是否為空、undefined 或 null
  //           // 嘗試從 res.info.RU.position 獲取位置訊息
  //           // 如果 res.info 或 res.info.RU 不存在，或者 res.info.RU.position 為空，
  //           // 則將 res.position 設置為 "None"
  //          // res.position = res.info?.RU?.position || "None";
  //         }
  //       },
  //       error: (error) => {
  //         console.error('Error fetching Bs Info:', error);
  //       },
  //       complete: () => {
  //         console.log('Bs Info fetch for ID', bsId, 'completed');
  //       }
  //     })
  //   );
  // }

  // @12/19 Add
  // 此方法用於將位置訊息的字串轉換為 Google 地圖所需的 LatLngLiteral 對象
  parsePosition(positionStr: string): google.maps.LatLngLiteral {
    try {

      // 嘗試解析 JSON 字串以獲取經緯度數組
      const positionArr = JSON.parse(positionStr);

      // 返回一個 LatLngLiteral 對象，其 lat 和 lng 屬性分別對應於緯度和經度 
      // ( 實際數據格式為: [ lng, lat ] = [ 121.044029, 24.773652 ] )
      return {
        lat: positionArr[1],
        lng: positionArr[0]
      };

    } catch (e) {

      // 如果解析出錯，則在控制台打印錯誤訊息
      console.error('Error parsing position:', e);

      // 返回一個默認的 LatLngLiteral 對象，防止程序崩潰
      return { lat: 0, lng: 0 };
    }
  }

  // @12/25 Add
  // 用於從當前顯示基站資訊中獲取轉換後的位置對象
  get displayBsInfoPosition(): google.maps.LatLngLiteral {

    // 如果 displayBsInfo 存在，則調用 parsePosition 方法進行轉換，否則返回默認值
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
    return this.languageService.i18n[severityKey];
  }

  // 設定告警種類給 CSS 選擇器用文字 @12/07 Add by yuchen
  severityText_forCSS(severity: string): string {
    //console.log("severity:", severity);
    return this.commonService.severityText(severity);
  }

  // 設定場域對應的告警種類數量 @12/07 Update by yuchen
  severityCount(severity: string): number {

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

  // 往 Fault Mnagement @12/07 Update
  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.fieldName, 'All']);
  }

  goPerformanceMgr() {
    this.router.navigate(['/main/performance-mgr', this.fieldName]);
  }

  getOcloudPerformance() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudPerformance = this.commonService.ocloudPerformance;
      this.ocloudPerformanceDeal();
    } else {
      this.commonService.queryOcloudPerformance(this.cloudId).subscribe(
        res => {
          console.log('getOcloudPerformance:');
          console.log(res);
          this.ocloudPerformance = res as OcloudPerformance;
          this.ocloudPerformanceDeal();
        }
      );
    }
  }

  getSoftwareList() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareList = this.commonService.softwareList;
      this.softwareDeal();
    } else {
      this.commonService.querySoftwareList('', '0', '').subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.softwareList = res as SoftwareList[];
          this.softwareDeal();
        }
      );
    }
  }

  softwareDeal() {
    this.fileNameMapSoftware = new Map();
    this.softwareList.forEach((row) => {
      this.fileNameMapSoftware.set(row.fileName, row);
    });
  }

  getSystemSummary() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.systemSummary = this.commonService.systemSummary;
    } else {
      this.commonService.querySystemSummary().subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.systemSummary = res as SystemSummary;
        }
      );
    }
  }

  softwareVersion(): string {
    const fileName = this.updateForm.controls['fileName'].value;
    if (fileName === '') {
      return '';
    } else {
      const software = this.fileNameMapSoftware.get(fileName) as any;
      return software.version;
    }
  }


  ocloudPerformanceDeal() {
    // this.utilizationPercent = Math.floor((Number(this.ocloudPerformance.usedCpu) / Number(this.ocloudPerformance.totalCpu)) * 100);
    // if (this.ocloudPerformance.cpu != 'N/A' || this.ocloudPerformance.storage != 'N/A' ||
    //   this.ocloudPerformance.memory != 'N/A' || this.ocloudPerformance.network != 'N/A') {
    //   this.ocloudPerformance.cpu += ' %';
    //   this.ocloudPerformance.memory += ' GB';
    //   this.ocloudPerformance.storage += ' MB';
    //   this.ocloudPerformance.network += ' Kbps';
    // }
  }

  // 返回 Field Mnagement 主頁
  back() {
    this.router.navigate(['/main/field-mgr']);
  }

  openUpdateModel() {
    this.formValidated = false;
    this.updateForm = this.fb.group({
      'type': new FormControl('imageUrl'),
      'imageUrl': new FormControl('', [Validators.required]),
      'fileName': new FormControl('')
    });
    this.updateModalRef = this.dialog.open(this.updateModal, { id: 'updateModal' });
    this.updateModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

  changeType(e: MatButtonToggleChange) {
    this.formValidated = false;
    if (e.value === 'imageUrl') {
      this.updateForm.controls['imageUrl'].setValidators([Validators.required]);
      this.updateForm.controls['fileName'].setValidators(null);
      this.updateForm.controls['fileName'].setValue('');
    } else {
      this.updateForm.controls['imageUrl'].setValidators(null);
      this.updateForm.controls['imageUrl'].setValue('');
      this.updateForm.controls['fileName'].setValidators([Validators.required]);
    }
    this.updateForm.controls['imageUrl'].updateValueAndValidity();
    this.updateForm.controls['fileName'].updateValueAndValidity();
  }

  update() {
    this.formValidated = true;
    if (!this.updateForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.updateModalRef.close();
    } else {
      const body: any = {
        ocloud: this.ocloudInfo.id,
        currentVersion: this.ocloudInfo.softwareVersion,
        sessionid: this.sessionId
      };
      if (this.updateForm.controls['type'].value === 'imageUrl') {
        const imageUrlSplit = this.updateForm.controls['imageUrl'].value.split('/');
        body['fileName'] = imageUrlSplit[imageUrlSplit.length - 1];
      } else {
        body['fileName'] = this.updateForm.controls['fileName'].value;
        body['version'] = this.softwareVersion();
      }
      this.commonService.applyOcloudSoftware(body).subscribe(
        () => console.log('Update Successful.')
      );
      this.updateModalRef.close();
      //this.getOcloudInfo();
    }
  }


}
