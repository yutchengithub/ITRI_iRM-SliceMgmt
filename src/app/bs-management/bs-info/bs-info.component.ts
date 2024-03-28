import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';
import { SoftwareList } from '../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';
import { FmsgList } from './../../fault-management/fault-management.component';
import { FaultMessages } from './../../fault-management/fault-management.component';

// import APIs of BS Management
import { apiForBSMgmt } from '../../shared/api/For_BS_Mgmt'; // @2024/03/25 Add

// 引入儲存各個資訊所需的 interfaces
import { BSInfo, Components }              from '../../shared/interfaces/BS/For_queryBsInfo_BS';       // @2024/03/25 Add
import { BSInfo_dist, Components_dist }    from '../../shared/interfaces/BS/For_queryBsInfo_dist_BS';  // @2024/03/25 Add
import { NEList, NE, Sm  } from '../../shared/interfaces/NE/For_queryBsComponentList'; // @2024/03/27 Add

// 引入所需 Local Files
import { localBSInfo } from '../../shared/local-files/BS/For_queryBsInfo';          // @2024/03/25 Add
import { localNEList } from '../../shared/local-files/NE/For_queryBsComponentList'; // @2024/03/27 Add

@Component({
  selector: 'app-bs-info',
  templateUrl: './bs-info.component.html',
  styleUrls: ['./bs-info.component.scss']
})

export class BSInfoComponent implements OnInit {

  sessionId: string = '';   // sessionId 用於存儲當前會話 ID
  refreshTimeout!: any;     // refreshTimeout 用於存儲 setTimeout 的引用，方便之後清除
  refreshTime: number = 5;  // refreshTime 定義自動刷新的時間間隔（秒）

  constructor(

    private         router: Router,
    private          route: ActivatedRoute,
    private             fb: FormBuilder,
    private         dialog: MatDialog,
    public   commonService: CommonService,
    public languageService: LanguageService,

    public  API_BS: apiForBSMgmt,           // @2024/03/25 Add for import API of BS Management
    public  bsInfo_LocalFiles: localBSInfo, // @2024/03/25 Add for import BS Info Local Files 
    public  neList_LocalFiles: localNEList, // @2024/03/27 Add neList_LocalFiles 用於從 Local 文件獲取 NE 列表數據
  
  ) {

    this.severitys = this.commonService.severitys;
    this.cmpsource = this.commonService.cmpsource;

  }

  // @2024/03/25 Add
  bsID:   string = '';      // 用於存儲當前選中的 BS ID
  bsName: string = '';      // 用於存儲當前選中的 BS 名稱
  bsType: string = '';      // 用於存儲當前選中的 BS 類型
  bsCellCount: string = ''; // 用於存儲當前選中的 BS Cell 數量

  // 頁面初始化 @2024/03/25 Update
  ngOnInit(): void {

    this.sessionId = this.commonService.getSessionId();

    this.route.params.subscribe(( params ) => {
      this.bsID = params['id'];
      this.bsName = params['name'];
      this.bsType = params['type'];
      this.bsCellCount = params['cellCount'];
      console.log('bsId: ' + this.bsID + ', bsName: ' + this.bsName +
                     ', bsType: ' + this.bsType + ', bsCellCount: ' + this.bsCellCount + ',\nsend from /main/bs-mgr');
      
      // 初入該頁面就取得此 BS 資訊               
      this.getQueryBsInfo();

      // @2024/03/27 Add
      // 取得基站資訊後，取得網元列表資訊並進行座標位置或軟體版本顯示資訊的相關處理 
      this.getNEList(); 

      
    });
   // this.initTopologyPanel();
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }

  ngAfterViewInit() {
    this.initTopologyPanel();
  }

  // 用於返回 BS 主頁 @2024/03/25 Add
  back() {
    this.router.navigate( ['/main/bs-mgr'] );
  }



  isLoadingBsInfo =  true;                            // 加載 BS 資訊狀態的標誌，初始設置為 true
  selectBsInfo:      BSInfo = {} as BSInfo;           // 用於存儲從服務器或 Local Files 獲取的一體式基站資訊
  selectBsInfo_dist: BSInfo_dist = {} as BSInfo_dist; // 用於存儲從服務器或 Local Files 獲取的分佈式基站資訊
  selectBsCellCount: number = 0;                      // 用於存儲當前選中的 BS Cell 數量

  // 用於獲取基站資訊 @2024/03/27 Update
  getQueryBsInfo() {
    console.log( 'getQueryBsInfo() - Start' );

    this.isLoadingBsInfo = true;         // 開始加載數據，顯示進度指示器

    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時，避免重複或不必要的操作

    if ( this.commonService.isLocal ) {
      // Local 模式: 使用 Local 文件提供的數據

      if ( this.bsType === "1" ) {

        // 取得 Local 一體式基站資訊
        this.selectBsInfo = this.bsInfo_LocalFiles.bsInfo_local.find( info => info.id === this.bsID ) || {} as BSInfo;
        this.selectBsInfo.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo.laston ); // 處理時間格式
        this.selectBsInfo.position = this.commonService.formatPosition( this.selectBsInfo.position );               // 處理位置訊息格式
        console.log( 'In local - Get the BSInfo:', this.selectBsInfo );

        // 一體式基站，直接將 Cell 數量設為 1
        this.selectBsCellCount = 1;

      } else if ( this.bsType === "2" ) {

        // 取得 Local 分佈式基站資訊
        this.selectBsInfo_dist = this.bsInfo_LocalFiles.dist_bsInfo_local.find( info => info.id === this.bsID ) || {} as BSInfo_dist;
        this.selectBsInfo_dist.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo_dist.laston ); // 處理時間格式
        this.selectBsInfo_dist.position = this.commonService.formatPosition( this.selectBsInfo_dist.position );               // 處理位置訊息格式
        console.log( 'In local - Get the BSInfo_dist:', this.selectBsInfo_dist );

         // 對於分佈式基站，計算 RU 的數量 ( 透過 info 內資料筆數直接計算，因基本上每筆都會有一個 RU )
         this.selectBsCellCount = this.selectBsInfo_dist.info.length; // 每個 RU 代表一個 Cell
      }

      console.log(`In local - BS Type ${ this.bsType } - Cell Count: ${ this.bsCellCount }`);

      // @2024/03/27 Add
      // 取得基站資訊後，取得網元列表資訊並進行座標位置或軟體版本顯示資訊的相關處理 
      //this.getNEList(); 

      this.isLoadingBsInfo = false; // Local 模式下，數據加載快速完成，直接設置為 false

    } else {
      
      // 非 Local 模式: 通過 API 從服務器獲取數據
      this.API_BS.queryBsInfo( this.bsID ).subscribe({
        next: ( res ) => {

          console.log( 'Get the response of queryBsInfo:', res );

          if ( res.bstype === 1 ) {

            // 刷新一體式基站資訊
            this.selectBsInfo = res as BSInfo;
            this.selectBsInfo.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo.laston ); // 處理時間格式
            this.selectBsInfo.position = this.commonService.formatPosition( this.selectBsInfo.position );               // 處理位置訊息格式
            console.log( 'Get the BSInfo:', this.selectBsInfo );

            // 一體式基站，直接將 Cell 數量設為 1
            this.selectBsCellCount = 1;

          } else if ( res.bstype === 2 ) {

            // 刷新分佈式基站資訊
            this.selectBsInfo_dist = res as BSInfo_dist;
            this.selectBsInfo_dist.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo_dist.laston ); // 處理時間格式
            this.selectBsInfo_dist.position = this.commonService.formatPosition( this.selectBsInfo_dist.position );               // 處理位置訊息格式
            console.log( 'Get the BSInfo_dist:', this.selectBsInfo_dist );

            // 對於分佈式基站，計算 RU 的數量 ( 透過 info 內資料筆數直接計算，因基本上每筆都會有一個 RU )
            this.selectBsCellCount = this.selectBsInfo_dist.info.length; // 每個 RU 代表一個 Cell
          }
          
          console.log(`BS Type ${ this.bsType } - Cell Count: ${ this.bsCellCount }`);

          // @2024/03/27 Add
          // 取得基站資訊後，取得網元列表資訊並進行座標位置或軟體版本顯示資訊的相關處理 
          //this.getNEList(); 

         // this.initTopologyPanel();

          this.isLoadingBsInfo = false; // 數據加載完成
        },
        error: ( error ) => {
          console.error( 'Error fetching BS info:', error );
          this.isLoadingBsInfo = false; // 出錯時設置加載標誌為 false
        },
        complete: () => {
          console.log( 'BS info fetch completed' );
        }
      });
    }

    console.log( 'getQueryBsInfo() - End' );
  }


  // @2024/03/27 Add
  // 定義 NEList 物件，並使用類型斷言將其初始化為空物件
  NEList:  NEList = {} as NEList;
  isLoadingNEList =  true;        // 控制加載 NE List 資訊狀態的標誌，初始設置為 true

  // @2024/03/27 Add
  // 用於取得 NE 列表資訊的函數
  getNEList() {
    console.log( 'getNEList() - Start' ); // 輸出開始取得 NE 列表的日誌

    this.isLoadingNEList = true;         // 開始加載數據，顯示進度指示器

    if ( this.commonService.isLocal ) {

      // 如果是本地模式
      // 從本地文件中獲取 NE 列表
      this.NEList = this.neList_LocalFiles.neList_local;

      // 處理獲取的 NE 列表,將 id 和 name 存儲到 neidNamePairs 中
      this.processNEList( this.NEList );

      this.isLoadingNEList = false; // Local 模式下，數據加載快速完成，直接設置為 false

    } else {

      // 如果非本地模式
      // 從後端 API 獲取 NE 列表
      this.API_BS.queryBsComponentList().subscribe({
        next: ( res ) => {

          // 成功獲取 NE 列表
          this.NEList = res; // 將獲取到的 NE 列表賦值給 NEList 屬性
          this.processNEList( this.NEList ); // 處理獲取的 NE 列表

          this.isLoadingNEList = false; // 數據加載完成

          
        },
        error: ( error ) => {

          // 獲取 NE 列表出錯
          console.error( 'Error fetching NE list:', error ); // 輸出錯誤日誌
          this.isLoadingNEList = false; // 出錯時設置加載標誌為 false
        },
        complete: () => {

          // 獲取 NE 列表完成
          console.log( 'NE list fetch completed' ); // 輸出完成日誌

          this.initTopologyPanel();
        }
      });
    }

    console.log( 'getNEList() - End' ); // 輸出結束取得 NE 列表的日誌
  }

  // @2024/03/27 Add
  // 用於存儲網元的使用的軟體版本訊息，包括網元名稱、網元類型、網元型號和軟體版本號
  swVersionMap: { [neId: string]: { neName: string, neType: string, neModel: string, neSFversion: string } } = {};

  // @2024/03/27 Add
  // 用於存儲分佈式基站的 RU id 對應到的名稱與位置
  ruIdNamePositionMap: { [ruId: string]: { name: string, position: string } } = {};

  // @2024/03/27 Add
  // 用於存儲兩種基站的網元資訊，用於後續繪製拓樸圖
  componentArray: any[] = [];

  // @2024/03/27 Add
  // processNEList 函數用於處理從 NEList 中獲取的網元訊息，並將相關資訊存儲在以下對象中:
  // - ruIdNamePositionMap: 用於存儲分佈式基站的 RU id 對應到的名稱與位置
  //        - swVersionMap: 用於存儲網元的使用的軟體版本訊息，包括網元名稱、網元類型、網元型號和軟體版本號
  processNEList( neList: NEList ) {

    // 如果是一體式基站
    if ( this.bsType === "1" ) {

      // 處理一體式基站的組件資訊，放入 componentArray 用於繪拓樸圖
      this.componentArray = this.selectBsInfo.components;

      // 處理一體式基站的軟體版本資訊
      for ( const component of this.selectBsInfo.components ) {

        // 在 NEList 中找到與組件 id 相對應的 NE
        const correspondingNE = neList.components.find( ne => ne.id === component.id );

        // 如果找到對應的 NE
        if ( correspondingNE ) {

          // 將組件類型轉換為大寫
          const neType = component.type.toUpperCase();

          // 構建 neModel 字串
          const neModel = `${correspondingNE.firm}/${correspondingNE.modelname}`;

          // 獲取活動軟體版本,如果沒有則設置為 'None'
          const neSFversion = this.getActiveSoftwareVersion( correspondingNE.sm ) || 'None';

          // 將軟體版本資訊存儲在 swVersionMap 中,以組件 id 作為鍵
          this.swVersionMap[component.id] = { neName: correspondingNE.name, neType, neModel, neSFversion };
        }
      }

    } else if ( this.bsType === "2" ) { // 如果是分佈式基站

        // 處理分佈式基站的組件資訊，放入 componentArray 用於繪拓樸圖
        const components = this.selectBsInfo_dist.components;

        for ( const cuid in components ) {
          this.componentArray.push( { type: 'cu', id: cuid } );

          const dus = components[cuid];
          for ( const duid in dus ) {
            this.componentArray.push( { type: 'du', id: duid, cuid: cuid } );

            const rus = dus[duid];
            for ( let i = 0; i < rus.length; i++ ) {
              const ruId = Object.keys( rus[i] )[0];

              this.componentArray.push( { type: 'ru', id: ruId, duid: duid } );
            }
          }
        }

        // 遍歷 selectBsInfo_dist.info 中的每個 Info 對象，對分佈式基站的網元軟體版本資訊進行處理
        for ( const info of this.selectBsInfo_dist.info ) {
          
          // 如果 RU.id 存在
          if ( info.RU && info.RU.id ) {

            const ruId = info.RU.id; // 獲取 RU.id

            // 在 NEList 中找到與 RU.id 相對應的 NE
            const correspondingNE = neList.components.find( ne => ne.id === ruId );

            // 如果找到對應的 NE
            if ( correspondingNE ) {

              // 將 NE 的名稱和位置存儲在對象中,以 RU.id 作為鍵
              this.ruIdNamePositionMap[ruId] = {
                name: correspondingNE.name, // NE 的名稱
                position: this.commonService.formatPosition( info.RU.position ) // 格式化 RU 的位置資訊
              };

              // 處理軟體版本資訊
              const neType = 'RU'; // 設置網元類型為 'RU'
              const neModel = `${correspondingNE.firm}/${correspondingNE.modelname}`; // 構建網元型號字串
              const neSFversion = this.getActiveSoftwareVersion( correspondingNE.sm ) || 'None'; // 獲取活動軟體版本,如果沒有則設置為 'None'
              this.swVersionMap[ruId] = { neName: correspondingNE.name, neType, neModel, neSFversion }; // 將軟體版本資訊存儲在 swVersionMap 中,以 RU.id 作為鍵
            }
          }
      
          // 處理 CU 和 DU 的軟體版本資訊
          if ( info.CU && info.CU.id ) { // 如果 CU.id 存在

            const cuId = info.CU.id; // 獲取 CU.id
            const correspondingNE = neList.components.find(ne => ne.id === cuId); // 在 NEList 中找到與 CU.id 相對應的 NE

            // 如果找到對應的 NE
            if ( correspondingNE ) {
              const neType = 'CU'; // 設置網元類型為 'CU'
              const neModel = `${correspondingNE.firm}/${correspondingNE.modelname}`; // 構建網元型號字串
              const neSFversion = this.getActiveSoftwareVersion( correspondingNE.sm ) || 'None'; // 獲取活動軟體版本,如果沒有則設置為 'None'

              this.swVersionMap[cuId] = { neName: correspondingNE.name, neType, neModel, neSFversion }; // 將軟體版本資訊存儲在 swVersionMap 中,以 CU.id 作為鍵
            }
          }
      
          if ( info.DU && info.DU.id ) { // 如果 DU.id 存在

            const duId = info.DU.id; // 獲取 DU.id
            const correspondingNE = neList.components.find( ne => ne.id === duId ); // 在 NEList 中找到與 DU.id 相對應的 NE

            // 如果找到對應的 NE
            if ( correspondingNE ) { 
              const neType = 'DU';   // 設置網元類型為 'DU'
              const neModel = `${correspondingNE.firm}/${correspondingNE.modelname}`; // 構建網元型號字串
              const neSFversion = this.getActiveSoftwareVersion( correspondingNE.sm ) || 'None'; // 獲取活動軟體版本,如果沒有則設置為 'None'
              
              this.swVersionMap[duId] = { neName: correspondingNE.name, neType, neModel, neSFversion }; // 將軟體版本資訊存儲在 swVersionMap 中,以 DU.id 作為鍵
            }
          }
        }

      }
  }

  // @2024/03/27 Add
  // 用於取得對應 NE 目前使用的軟體版本
  getActiveSoftwareVersion( sm: Sm ): string | undefined {

    // 如果 sm 和 software-inventory 和 software-slot 存在
    if ( sm && sm['software-inventory'] && sm['software-inventory']['software-slot'] ) {

      // 找到 active 為 'true' 的 slot
      const activeSlot = sm['software-inventory']['software-slot'].find( slot => slot.active === 'true' );

      // 如果找到活動 slot 並且有 build-version
      if ( activeSlot && activeSlot['build-version'] ) {

        // 返回 build-version
        return activeSlot['build-version'];
      }
    }

    // 如果沒有找到活動軟體版本，返回 undefined
    return undefined;
  }




  // 使用 @ViewChild 裝飾器獲取 canvas 元素的引用
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // 初始化拓撲圖面板
  initTopologyPanel() {
    // 輸出目前的 componentArray 到控制台
    console.log('In initTopologyPanel() - componentArray:', this.componentArray);

    // 檢查 canvas 元素是否存在
    if (this.canvas) {
      // 獲取 canvas 的 2D 渲染上下文
      const ctx = this.canvas.nativeElement.getContext('2d');
      // 獲取 canvas 的寬度
      const canvasWidth = this.canvas.nativeElement.width;
      // 獲取 canvas 的高度
      const canvasHeight = this.canvas.nativeElement.height;

      // 檢查渲染上下文是否存在
      if (ctx) {
        // 清除整個 canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // 設置線條寬度為 1
        ctx.lineWidth = 1;
        // 設置線條顏色為白色
        ctx.strokeStyle = 'white';
        // 設置填充顏色為白色
        ctx.fillStyle = 'white';
        // 設置字體為 12px Arial
        ctx.font = '12px Arial';

        // 檢查是否為一體式基站
        if (this.selectBsInfo && this.selectBsInfo.bstype === 1) {
          // 獲取一體式基站的組件
          const component = this.selectBsInfo.components[0];
          // 在 NEList 中找到對應的網元
          const ne = this.NEList.components.find(n => n.id === component.id);

          // 如果找到對應的網元
          if (ne) {
            // 計算一體式基站的中心位置
            const x = canvasWidth / 2;
            const y = canvasHeight / 2;
            // 開始一個新的路徑
            ctx.beginPath();
            // 繪製一個半徑為 1 的圓
            ctx.arc(x, y, 1, 0, 2 * Math.PI);
            // 繪製線條
            ctx.stroke();
            // 繪製網元名稱和組件類型 (註解掉)
            //ctx.fillText( `${ne.name} (${component.type})`, x + 40, y );
          }
        }

        // 檢查是否為分佈式基站
        if (this.selectBsInfo_dist && this.selectBsInfo_dist.bstype === 2) {
          // 獲取分佈式基站的組件
          const components = this.selectBsInfo_dist.components;

          // 開始繪製 CU、DU 和 RU
          ctx.beginPath();
          // 遍歷所有的 CU
          for (const cuid in components) {
            // 在 componentArray 中找到對應的 CU
            const cu = this.componentArray.find(component => component.id === cuid);
            // 如果找到對應的 CU
            if (cu) {
              // 計算 CU 的位置
              const cuX = canvasWidth / 4;
              const cuY = canvasHeight / (Object.keys(components).length + 1) * (Object.keys(components).indexOf(cuid) + 1);
              // 移動到 CU 的位置
              ctx.moveTo(cuX, cuY);
              // 繪製一個半徑為 1 的圓
              ctx.arc(cuX, cuY, 1, 0, 2 * Math.PI);
            }

            // 獲取當前 CU 下的所有 DU
            const dus = components[cuid];
            // 遍歷所有的 DU
            for (const duid in dus) {
              // 在 componentArray 中找到對應的 DU
              const du = this.componentArray.find(component => component.id === duid);
              // 如果找到對應的 DU
              if (du) {
                // 計算 DU 的位置
                const duX = canvasWidth / 2;
                const duY = canvasHeight / (Object.keys(dus).length + 1) * (Object.keys(dus).indexOf(duid) + 1);
                // 移動到 DU 的位置
                ctx.moveTo(duX, duY);
                // 繪製一個半徑為 1 的圓
                ctx.arc(duX, duY, 1, 0, 2 * Math.PI);
              }

              // 獲取當前 DU 下的所有 RU
              const rus = dus[duid];
              // 遍歷所有的 RU
              for (let i = 0; i < rus.length; i++) {
                // 獲取 RU 的 ID
                const ruId = Object.keys(rus[i])[0];
                // 在 componentArray 中找到對應的 RU
                const ru = this.componentArray.find(component => component.id === ruId);
                // 如果找到對應的 RU
                if (ru) {
                  // 計算 RU 的位置
                  const ruX = canvasWidth * 0.75;
                  const ruY = canvasHeight / (rus.length + 1) * (i + 1);
                  // 移動到 RU 的位置
                  ctx.moveTo(ruX, ruY);
                  // 繪製一個半徑為 1 的圓
                  ctx.arc(ruX, ruY, 1, 0, 2 * Math.PI);
                }
              }
            }
          }
          // 繪製所有的 CU、DU 和 RU
          ctx.stroke();

          // 開始繪製連線
          // 遍歷所有的 CU
          for (const cuid in components) {
            // 在 componentArray 中找到對應的 CU
            const cu = this.componentArray.find(component => component.id === cuid);
            // 獲取當前 CU 下的所有 DU
            const dus = components[cuid];
            // 遍歷所有的 DU
            for (const duid in dus) {
              // 在 componentArray 中找到對應的 DU
              const du = this.componentArray.find(component => component.id === duid);
              // 如果找到對應的 CU 和 DU
              if (cu && du) {
                // 計算 CU 的位置
                const cuX = canvasWidth / 4;
                const cuY = canvasHeight / (Object.keys(components).length + 1) * (Object.keys(components).indexOf(cuid) + 1);
                // 計算 DU 的位置
                const duX = canvasWidth / 2;
                const duY = canvasHeight / (Object.keys(dus).length + 1) * (Object.keys(dus).indexOf(duid) + 1);
                // 移動到 CU 的位置
                ctx.moveTo(cuX, cuY);
                // 繪製一條線到 DU 的位置
                ctx.lineTo(duX, duY);
              }

              // 獲取當前 DU 下的所有 RU
              const rus = dus[duid];
              // 遍歷所有的 RU
              for (let i = 0; i < rus.length; i++) {
                // 獲取 RU 的 ID
                const ruId = Object.keys(rus[i])[0];
                // 在 componentArray 中找到對應的 RU
                const ru = this.componentArray.find(component => component.id === ruId);
                // 如果找到對應的 DU 和 RU
                if (du && ru) {
                  // 計算 DU 的位置
                  const duX = canvasWidth / 2;
                  const duY = canvasHeight / (Object.keys(dus).length + 1) * (Object.keys(dus).indexOf(duid) + 1);
                  // 計算 RU 的位置
                  const ruX = canvasWidth * 0.75;
                  const ruY = canvasHeight / (rus.length + 1) * (i + 1);
                  // 移動到 DU 的位置
                  ctx.moveTo(duX, duY);
                  // 繪製一條線到 RU 的位置
                  ctx.lineTo(ruX, ruY);
                }
              }
            }
          }
          // 繪製所有的連線
          ctx.stroke();
        }
      }
    }
  }

  getCuPosition(cu: any): { x: number, y: number } {
    const index = this.componentArray.filter(c => c.type === 'cu').indexOf(cu);
    const x = this.canvas.nativeElement.width / 4;
    const y = this.canvas.nativeElement.height / (this.componentArray.filter(c => c.type === 'cu').length + 1) * (index + 1);
    return { x, y };
  }
  
  getDuPosition(du: any): { x: number, y: number } {
    const index = this.componentArray.filter(c => c.type === 'du').indexOf(du);
    const x = this.canvas.nativeElement.width / 2;
    const y = this.canvas.nativeElement.height / (this.componentArray.filter(c => c.type === 'du').length + 1) * (index + 1);
    return { x, y };
  }
  
  getRuPosition(ru: any): { x: number, y: number } {
    const index = this.componentArray.filter(c => c.type === 'ru').indexOf(ru);
    const x = this.canvas.nativeElement.width * 0.75;
    const y = this.canvas.nativeElement.height / (this.componentArray.filter(c => c.type === 'ru').length + 1) * (index + 1);
    return { x, y };
  }
  
  getComponentName( id: string ): string {
    const component = this.NEList.components.find(c => c.id === id);
    return component ? component.name : '';
  }
  
  getComponentStatus( id: string) : number {
    const component = this.NEList.components.find(c => c.id === id);
    return component ? component.status : 0;
  }

  

  getBSInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.bsComponentInfo = this.commonService.bsComponentInfo;
      this.ocloudInfoDeal();
    } else {
      this.commonService.queryOcloudInfo(this.cloudId).subscribe(
        res => {
          console.log('getOcloudInfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.ocloudInfo = JSON.parse(str);
          this.ocloudInfo = res as OcloudInfo;
          this.ocloudInfoDeal();
        }
      );
    }
  }
  nfRunRefresh() {
    clearTimeout(this.refreshTimeout);
    this.RunRefreshTimeout = window.setTimeout(() => this.getOcloudPerformance(), this.RunRefreshTime * 1000);
    this.RunRefreshTimeout = window.setTimeout(() => this.getBSInfo(), this.RunRefreshTime * 1000);
  }
  getOcloudPerformance() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudPerformance = this.commonService.ocloudPerformance;
      this.ocloudPerformanceDeal();
    } else {
      clearTimeout(this.refreshTimeout);
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
    let type = '0'
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareList = this.commonService.softwareList;
      this.softwareDeal();
    } else {
      if (this.cloudName === 'Wind River' || this.cloudName === 'windriver'){
        type = '-3';
      }
      this.commonService.querySoftwareList('', type, '').subscribe(
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

  softwareVersion(): string {
    const fileName = this.updateForm.controls['fileName'].value;
    if (fileName === '') {
      return '';
    } else {
      const software = this.fileNameMapSoftware.get(fileName) as any;
      return software.version;
    }
  }

  ocloudInfoDeal() {
    if (this.ocloudInfo.resourcepool && this.ocloudInfo.resourcepool.length > 0) {
      this.ocloudInfo.resourcepool[0].active = true;
    }
  }

  ocloudPerformanceDeal() {
    // this.utilizationPercent = Math.floor((Number(this.ocloudPerformance.usedCpu) / Number(this.ocloudPerformance.totalCpu)) * 100);
    if (this.ocloudPerformance.cpu != 'N/A' || this.ocloudPerformance.storage != 'N/A' ||
      this.ocloudPerformance.memory != 'N/A' || this.ocloudPerformance.network != 'N/A') {
      this.ocloudPerformance.cpu += ' %';
      this.ocloudPerformance.memory += ' GB';
      this.ocloudPerformance.storage += ' MB';
      this.ocloudPerformance.network += ' Kbps';
    }
  }

  severityText(severity: string): string {
    return this.commonService.severityText(severity);
  }

  severityCount(severity: string): number {
    if (severity.toUpperCase() === this.severitys[0]) {
      return this.ocloudInfo.fault.critical;
    } else if (severity.toUpperCase() === this.severitys[1]) {
      return this.ocloudInfo.fault.major;
    } else if (severity.toUpperCase() === this.severitys[2]) {
      return this.ocloudInfo.fault.minor;
    } else if (severity.toUpperCase() === this.severitys[3]) {
      return this.ocloudInfo.fault.warning;
    } else {
      return 0;
    }
  }

  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.cloudName, 'All']);
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

  updateBasicError: boolean = false;
  openUpdateIPModel() {
    this.formValidated = false;
    this.updateForm = this.fb.group({
      newip: ['',],
    });
    this.updateIPModalRef = this.dialog.open(this.updateIPModal, { id: 'updateIPModal' });
    this.updateIPModalRef.afterClosed().subscribe(() => {
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
      this.getBSInfo();
    }
    this.getBSInfo();
  }

  updateNFSuccessful: boolean | null = null; 
  hideUpdateIcon() {
    setTimeout(() => {
      this.updateNFSuccessful = null;
    }, 3000);
  }
  updateIPAddress() {
    this.updateBasicError = false; // Reset the error state
    const newIPControl = this.updateForm.get('newip');
    if (newIPControl) {
      this.newip = newIPControl.value;
    }
    const ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|0|255)$/;
    if (this.commonService.isLocal) {
      /* local file test */
      this.updateIPModalRef.close();
    } else {
      const isIPValid = ipPattern.test(this.newip);
      if (isIPValid) {
        // Valid IP and non-empty port, proceed with the update
        const body: any = {
          ocloud: this.ocloudInfo.id,
          ip: this.newip,
        };
        // this.commonService.queryOCInfoUpdate(body).subscribe(
        //   () => console.log('Update Successful.')  
        // );
        this.updateNFSuccessful = true;
        this.hideUpdateIcon();
        this.updateIPModalRef.close();
        this.getBSInfo();
      } else {
        // Form validation failed, set the error flag
        this.updateNFSuccessful = false;
        this.hideUpdateIcon();
        this.updateBasicError = true;
      }
    }
    this.getBSInfo();
  }

  p: number = 1;            // 當前頁數
  pageSize: number = 5;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  pageChanged( page: number ) {
    this.p = page;
  }

  veiw(opt: Nf) {
    const url = '/main/nf-mgr';
    this.router.navigate([url]);
  }

  goPerformanceMgr() {
    this.router.navigate(['/main/performance-mgr', 'ocloud', this.ocloudInfo.id, 'All']);
  }

  goNFMgr(opt: Nf) {
    const nfId = opt.id;
    this.router.navigate(['/main/nf-mgr', nfId]);
  }

  search() {}
  clear_search(){}
  searchForm!: FormGroup;
  cmpsource: string[];
  fmsgList: FmsgList = {} as FmsgList;
  isSearch: boolean = false;
  filteredFmList: FaultMessages[] = [];
  get msgToDisplay(): FaultMessages[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    // 否則，顯示全部 this.fmsgList.faultMessages
    return this.isSearch ? this.filteredFmList : this.fmsgList.faultMessages;
  }



  cloudId: string = '';
  cloudName: string = '';
  newip: string = '';
  // utilizationPercent: number = 0;
  bsComponentInfo: BsComponentInfo = {} as BsComponentInfo;
  ocloudInfo: OcloudInfo = {} as OcloudInfo;
  ocloudPerformance: OcloudPerformance = {} as OcloudPerformance;
  softwareList: SoftwareList[] = [];
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  RunRefreshTimeout!: any;
  RunRefreshTime: number = 3;
  @ViewChild('updateModal') updateModal: any;
  @ViewChild('updateIPModal') updateIPModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateIPModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;
  /* CRITICAL,MAJOR,MINOR,WARNING */
  severitys: string[];

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };

}


export interface OcloudInfo {
  id: string;
  name: string;
  imsEndpoint: string;
  ipAddress: string;
  description: string;
  status: string;
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
  actionstatus: string;
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
//component Info
export interface BsComponentInfo {
  id: string;
  name: string;
  ip: string;
  port: string;
  account: string;
  key: string;
  comtype: number;
  firm: string;
  modelname: string;
  status: number;
  info: Info;
  sm: {
    softwareInventory: {
      softwareSlot: SoftwareSlot[];
    };
  };
}

export interface Info {
  data: string;
}

interface SoftwareSlot {
  name: string;
  status: string;
  active?: string;
  running?: string;
  access?: string;
  vendorCode?: string;
  buildId?: string;
  buildName?: string;
  buildVersion?: string;
  files?: {
    name: string;
    version: string;
    localPath: string;
    integrity: string;
  };
}