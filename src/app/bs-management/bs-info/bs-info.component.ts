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
import { ChangeDetectorRef } from '@angular/core';

// import APIs of BS Management
import { apiForBSMgmt } from '../../shared/api/For_BS_Mgmt'; // @2024/03/25 Add

// 引入儲存各個資訊所需的 interfaces
import { BSInfo, Components }                      from '../../shared/interfaces/BS/For_queryBsInfo_BS';       // @2024/03/25 Add
import { BSInfo_dist, Info_dist, Components_dist } from '../../shared/interfaces/BS/For_queryBsInfo_dist_BS';  // @2024/03/25 Add
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
    private changeDetectorRef: ChangeDetectorRef,

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
   

   this.drawConnectingLines();
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }

  ngAfterViewInit() {
    this.canvas.nativeElement.width  = 800; // 增加 Canvas 的寬度
    this.canvas.nativeElement.height = 250; // 增加 Canvas 的寬度

    // 在獲取基站和網元資訊完成後，手動觸發變更檢測
   // Promise.all([this.getQueryBsInfo(), this.getNEList()]).then(() => {
      //this.changeDetectorRef.detectChanges();
      this.drawConnectingLines();
    //});
  }

  // 用於返回 BS 主頁 @2024/03/25 Add
  back() {
    this.router.navigate( ['/main/bs-mgr'] );
  }

  /** @2024/03/29 Add
   * 導航到選定基站的詳細資訊頁面。
   * @param BS 從 BS 列表中選擇的 BS 物件。
   */
  viewNEDetailInfo( NE: NE ) {
    this.router.navigate( ['/main/component-mgr/info', NE.id, NE.bsId] );
  }


  isLoadingBsInfo =  true;                            // 加載 BS 資訊狀態的標誌，初始設置為 true
  selectBsInfo:      BSInfo = {} as BSInfo;           // 用於存儲從服務器或 Local Files 獲取的一體式基站資訊
  selectBsInfo_dist: BSInfo_dist = {} as BSInfo_dist; // 用於存儲從服務器或 Local Files 獲取的分佈式基站資訊
  selectBsCellCount: number = 0;                      // 用於存儲當前選中的 BS Cell 數量
   selectBsPosition: string = "";                     // 用於存儲當前選中的一體式 BS 位置
  selectDistBsPosition: string = "";                  // 用於存儲當前選中的分佈式 BS 位置
  
  // 用於獲取基站資訊 @2024/03/27 Update
  getQueryBsInfo() {
    console.log( 'getQueryBsInfo() - Start' );

    this.isLoadingBsInfo = true;         // 開始加載數據，顯示進度指示器

    clearTimeout( this.refreshTimeout ); // 取消之前設定的超時，避免重複或不必要的操作

    if ( this.commonService.isLocal ) {
      // Local 模式: 使用 Local 文件提供的數據

      if ( this.bsType === "1" ) {

        // 取得 Local 一體式基站資訊
        this.selectBsInfo        = this.bsInfo_LocalFiles.bsInfo_local.find( info => info.id === this.bsID ) || {} as BSInfo;
        this.selectBsInfo.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo.laston ); // 處理時間格式
        this.selectBsPosition    = this.commonService.formatPosition( this.selectBsInfo.position );                 // 處理位置訊息格式
        console.log( 'In local - Get the BSInfo:', this.selectBsInfo );
        console.log( 'In local - Get the BSInfo position:', this.selectBsPosition );

        // 一體式基站，直接將 Cell 數量設為 1
        this.selectBsCellCount = 1;

      } else if ( this.bsType === "2" ) {

        // 取得 Local 分佈式基站資訊
        this.selectBsInfo_dist        = this.bsInfo_LocalFiles.dist_bsInfo_local.find( info => info.id === this.bsID ) || {} as BSInfo_dist;
        this.selectBsInfo_dist.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo_dist.laston ); // 處理時間格式
        //this.selectDistBsPosition     = this.commonService.formatPosition( this.selectBsInfo_dist.position );               // 處理位置訊息格式
        console.log( 'In local - Get the BSInfo_dist:', this.selectBsInfo_dist );
        //console.log( 'In local - Get the BSInfo_dist position:', this.selectBsInfo_dist.position );

         // 對於分佈式基站，計算 RU 的數量 ( 透過 info 內資料筆數直接計算，因基本上每筆都會有一個 RU )
         this.selectBsCellCount = this.selectBsInfo_dist.info.length; // 每個 RU 代表一個 Cell
      }

      console.log( `In local - BS Type ${ this.bsType } - Cell Count: ${ this.bsCellCount }` );

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
            this.selectBsInfo        = res as BSInfo;
            this.selectBsInfo.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo.laston ); // 處理時間格式
            this.selectBsPosition    = this.commonService.formatPosition( this.selectBsInfo.position );               // 處理位置訊息格式
            console.log( 'Get the BSInfo:', this.selectBsInfo );
            console.log( 'Get the BSInfo position:', this.selectBsPosition );

            // 一體式基站，直接將 Cell 數量設為 1
            this.selectBsCellCount = 1;

          } else if ( res.bstype === 2 ) {

            // 刷新分佈式基站資訊
            this.selectBsInfo_dist        = res as BSInfo_dist;
            this.selectBsInfo_dist.laston = this.commonService.formatTimeWithoutSecondsFraction( this.selectBsInfo_dist.laston ); // 處理時間格式
            //this.selectDistBsPosition     = this.commonService.formatPosition( this.selectBsInfo_dist.position );               // 處理位置訊息格式
            console.log( 'Get the BSInfo_dist:', this.selectBsInfo_dist );
            // console.log( 'Get the BSInfo_dist position:', this.selectDistBsPosition );

            // 對於分佈式基站，計算 RU 的數量 ( 透過 info 內資料筆數直接計算，因基本上每筆都會有一個 RU )
            this.selectBsCellCount = this.selectBsInfo_dist.info.length; // 每個 RU 代表一個 Cell
          }
          
          console.log(`BS Type ${ this.bsType } - Cell Count: ${ this.bsCellCount }`);

          // @2024/03/27 Add
          // 取得基站資訊後，取得網元列表資訊並進行座標位置或軟體版本顯示資訊的相關處理 
          //this.getNEList(); 

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
           NEList: NEList = {} as NEList; // 用於儲存 O1 系統內的網元列表
  isLoadingNEList =  true; // 控制加載 NE List 資訊狀態的標誌，初始設置為 true

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

      // 篩選出於此 BS 內的網元 
      this.filterNEListByBSName();       

      this.isLoadingNEList = false; // Local 模式下，數據加載快速完成，直接設置為 false

    } else {

      // 如果非本地模式
      // 從後端 API 獲取 NE 列表
      this.API_BS.queryBsComponentList().subscribe({
        next: ( res ) => {

          // 成功獲取 NE 列表
          this.NEList = res; // 將獲取到的 NE 列表賦值給 NEList 屬性
          this.processNEList( this.NEList );   // 處理獲取的 NE 列表

          // 篩選出於此 BS 內的網元 
          this.filterNEListByBSName();    

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

          this.drawConnectingLines();
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

  allInOneNEID: string = "";

  // @2024/03/27 Add
  // processNEList 函數用於處理從 NEList 中獲取的網元訊息，並將相關資訊存儲在以下對象中:
  // - ruIdNamePositionMap: 用於存儲分佈式基站的 RU id 對應到的名稱與位置
  //        - swVersionMap: 用於存儲網元的使用的軟體版本訊息，包括網元名稱、網元類型、網元型號和軟體版本號
  processNEList( neList: NEList ) {

    // 如果是一體式基站
    if ( this.bsType === "1" ) {

      // 處理一體式基站的組件資訊，放入 componentArray 用於繪拓樸圖
      this.componentArray = this.selectBsInfo.components;
      console.log( "一體式基站的 componentArray:", this.componentArray );

      // 處理一體式基站的軟體版本資訊
      for ( const component of this.selectBsInfo.components ) {

        // 在 NEList 中找到與組件 id 相對應的 NE
        const correspondingNE = neList.components.find( ne => ne.id === component.id );

        // 如果找到對應的 NE
        if ( correspondingNE ) {

          // 儲存此 NE ID 用於繪製拓樸圖
          this.allInOneNEID = correspondingNE.id;

          // 將組件類型轉換為大寫
          const neType = component.type.toUpperCase();

          // 構建 neModel 字串
          const neModel = `${correspondingNE.firm} / ${correspondingNE.modelname}`;

          // 獲取活動軟體版本，如果沒有則設置為 'None'
          const neSFversion = this.getActiveSoftwareVersion( correspondingNE.sm ) || 'None';

          // 將軟體版本資訊存儲在 swVersionMap 中，以組件 id 作為鍵
          this.swVersionMap[component.id] = { neName: correspondingNE.name, neType, neModel, neSFversion };
        }
      }

    } else if ( this.bsType === "2" ) { // 如是分佈式基站

      // 處理分佈式基站的組件資訊，放入 componentArray 用於繪拓樸圖
      this.getComponentArray_distBS( this.selectBsInfo_dist.components );
      console.log( "分佈式基站的 componentArray:", this.componentArray );

      console.log( "分佈式基站的 this.selectBsInfo_dist.info.length:", this.selectBsInfo_dist.info.length );
      // 檢查分佈式 BS 的 info 是否有值
      if ( this.selectBsInfo_dist.info.length > 0 ) {

        // 遍歷 selectBsInfo_dist.info 中的每個 Info 對象，對分佈式基站的網元軟體版本資訊進行處理
        this.if_BsInfo_dist_notNull( this.selectBsInfo_dist.info, neList );

      } else {

        console.log( "this.selectBsInfo_dist.info 無值，開始進行另外處理" );


      }
    }

  }

  // @2024/03/29 Add
  // 用於從 BsInfo_dist.components 取得網元組成資訊 ( 分佈式用 )
  getComponentArray_distBS( NE_Topology: Components_dist ) {

      // 處理分佈式基站的組件資訊，放入 componentArray 用於繪拓樸圖
      const components = NE_Topology;

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
  }

  // @2024/03/29 Add
  // 當於處理網元列表 processNEList()，且有從 BsInfo_dist.info 有取到值時，
  // 用於對基站的網元軟體版本資訊進行處理 ( 分佈式用 )。
  if_BsInfo_dist_notNull( info_distBS: Info_dist[], neList: NEList ) {

    // 遍歷 selectBsInfo_dist.info 中的每個 Info 對象，對分佈式基站的網元軟體版本資訊進行處理
    for ( const info of info_distBS ) {
              
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
          const neModel = `${correspondingNE.firm} / ${correspondingNE.modelname}`; // 構建網元型號字串
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
          const neModel = `${correspondingNE.firm} / ${correspondingNE.modelname}`; // 構建網元型號字串
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
          const neModel = `${correspondingNE.firm} / ${correspondingNE.modelname}`; // 構建網元型號字串
          const neSFversion = this.getActiveSoftwareVersion( correspondingNE.sm ) || 'None'; // 獲取活動軟體版本,如果沒有則設置為 'None'
          
          this.swVersionMap[duId] = { neName: correspondingNE.name, neType, neModel, neSFversion }; // 將軟體版本資訊存儲在 swVersionMap 中,以 DU.id 作為鍵
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


// ↓ 繪製拓樸圖區 @2024/03/28 Add ↓

  // 使用 @ViewChild 裝飾器獲取 canvas 元素的引用
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // 獲取一體式基站的位置
  getAllInOnePosition(): { x: number, y: number } {
    const canvasWidth = this.canvas.nativeElement.width; // 獲取畫布寬度
    const canvasHeight = this.canvas.nativeElement.height; // 獲取畫布高度
    const x = canvasWidth / 2; // 水平置中
    const y = canvasHeight / 2; // 垂直置中
    return { x, y }; // 返回位置
  }

  // 獲取 CU 的位置
  getCuPosition(cu: any): { x: number, y: number } {
    const index = this.componentArray.filter(c => c.type === 'cu').indexOf(cu); // 獲取 CU 在 componentArray 中的索引
    const x = this.canvas.nativeElement.width / 4; // CU 的 x 座標
    const y = this.canvas.nativeElement.height / (this.componentArray.filter(c => c.type === 'cu').length + 1) * (index + 1); // CU 的 y 座標
    return { x, y }; // 返回位置
  }

  // 獲取 DU 的位置
  getDuPosition(du: any): { x: number, y: number } {
    const index = this.componentArray.filter(c => c.type === 'du').indexOf(du); // 獲取 DU 在 componentArray 中的索引
    const x = this.canvas.nativeElement.width * 0.535; // DU 的 x 座標
    const y = this.canvas.nativeElement.height / (this.componentArray.filter(c => c.type === 'du').length + 1) * (index + 1); // DU 的 y 座標
    return { x, y }; // 返回位置
  }

  // 獲取 RU 的位置
  getRuPosition(ru: any): { x: number, y: number } {
    const index = this.componentArray.filter(c => c.type === 'ru').indexOf(ru); // 獲取 RU 在 componentArray 中的索引
    const ruCount = this.componentArray.filter(c => c.type === 'ru').length; // 獲取 RU 的數量
    const x = this.canvas.nativeElement.width * 0.75; // 調整 RU 的 x 座標
    const y = this.canvas.nativeElement.height / (ruCount + 1) * (index + 1) * 1.1; // 均勻分佈 RU 的 y 座標
    return { x, y }; // 返回位置
  }

  // 獲取組件名稱
  getComponentName(id: string): string {
    const component = this.NEList.components.find(c => c.id === id); // 根據組件 ID 查找組件
    return component ? component.name : ''; // 返回組件名稱，如果找不到則返回空字串
  }

  // 獲取組件狀態
  getComponentStatus(id: string): number {
    const component = this.NEList.components.find(c => c.id === id); // 根據組件 ID 查找組件
    return component ? component.status : 0; // 返回組件狀態，如果找不到則返回 0
  }

  // 繪製連接線
  drawConnectingLines() {
    const canvas = this.canvas.nativeElement; // 獲取 canvas 元素
    const ctx = canvas.getContext('2d'); // 獲取繪圖上下文

    // 檢查渲染上下文是否存在
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除畫布

      ctx.lineWidth = 3;         // 設置線條寬度為 3
      ctx.strokeStyle = 'white'; // 設置線條顏色為白色

      // 繪製 CU 和 DU 之間的連接線
      this.componentArray.filter(c => c.type === 'cu').forEach(cu => {
        const cuPosition = this.getCuPosition(cu); // 獲取 CU 位置
        this.componentArray.filter(c => c.type === 'du').forEach(du => {
          const duPosition = this.getDuPosition(du); // 獲取 DU 位置
          console.log("繪製 CU 和 DU 之間的連接線 - cuPosition", cuPosition); // 輸出 CU 位置
          console.log("繪製 CU 和 DU 之間的連接線 - duPosition", duPosition); // 輸出 DU 位置
          this.drawLine(ctx, cuPosition, duPosition); // 繪製 CU 和 DU 之間的連接線
        });
      });

      // 繪製 DU 和 RU 之間的連接線
      this.componentArray.filter(du => du.type === 'du').forEach(du => {
        const duPosition = this.getDuPosition(du); // 獲取 DU 位置
        this.componentArray.filter(ru => ru.type === 'ru' && ru.duid === du.id).forEach(ru => {
          const ruPosition = this.getRuPosition(ru); // 獲取 RU 位置
          console.log("繪製 DU 和 RU 之間的連接線 - duPosition", duPosition); // 輸出 DU 位置
          console.log("繪製 DU 和 RU 之間的連接線 - ruPosition", ruPosition); // 輸出 RU 位置
          this.drawLine(ctx, duPosition, ruPosition); // 繪製 DU 和 RU 之間的連接線
        });
      });
    }
  }

  // 繪製單條線
  drawLine(ctx: CanvasRenderingContext2D, start: { x: number, y: number }, end: { x: number, y: number }) {
    ctx.beginPath(); // 開始繪製新路徑
    ctx.moveTo(start.x, start.y); // 移動到起點
    ctx.lineTo(end.x, end.y); // 繪製到終點
    ctx.stroke(); // 描邊
  }

// ↑ 繪製拓樸圖區 @2024/03/28 Add ↑
  


  // @2024/03/29 Add
  // 用於儲存所有於此 BS 內的網元
  NEList_InThisBS: NEList = {} as NEList;

  // @2024/03/29 Add
  // 篩選出在 this.bsName 中的網元,並存儲到 NEList_InThisBS 中
  filterNEListByBSName() {
    console.log('filterNEListByBSName() - Start');

    // 建立一個空的 components 陣列，用於存儲篩選後的網元
    const filteredComponents: NE[] = [];

    // 遍歷 NEList 中的每個網元
    this.NEList.components.forEach( ( ne: NE ) => {

      // 判斷網元的 bsName 是否與 this.bsName 相同
      if ( ne.bsName === this.bsName ) {

        // 如果相同,則將該網元加入到 filteredComponents 中
        filteredComponents.push( ne );
      }
    });

    // 將篩選後的網元存儲到 NEList_InThisBS 中
    this.NEList_InThisBS = {
      components: filteredComponents
    };

    console.log( "於此 BS -", this.bsName, "內的網元有:", this.NEList_InThisBS );

    console.log( 'filterNEListByBSName() - End' );
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