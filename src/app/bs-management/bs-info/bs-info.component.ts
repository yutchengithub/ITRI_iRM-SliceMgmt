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
import { CurrentBsFmList, FaultMessage } from '../../shared/interfaces/BS/For_queryCurrentBsFaultMessage'; // @2024/03/31 Add
import { NEList, NE, Sm  }               from '../../shared/interfaces/NE/For_queryBsComponentList'; // @2024/03/27 Add
import { NEInfo }                        from '../../shared/interfaces/NE/For_queryBsComponentInfo'; // @2024/03/29 Add

// 引入所需 Local Files
import { localBSInfo } from '../../shared/local-files/BS/For_queryBsInfo';          // @2024/03/25 Add
import { localNEList } from '../../shared/local-files/NE/For_queryBsComponentList'; // @2024/03/27 Add
import { localCurrentBsFmList } from '../../shared/local-files/BS/For_queryCurrentBsFaultMessage'; // @2024/03/31 Add


// 2024/04/01 Add
// 搜尋基站告警用
interface bsCurrentFmParams {
  method: string;
  start: string;
  end: string;
  urgency?: string; // 可選

  offset: number;
  limit: number;
}

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
    public  currentBsFmList_LocalFiles: localCurrentBsFmList, // @2024/03/31 Add for import Current Current BS Fault Messages List
    public  neList_LocalFiles: localNEList,                   // @2024/03/27 Add neList_LocalFiles 用於從 Local 文件獲取 NE 列表數據
  
  ) {

    //this.severitys = this.commonService.severitys;
    this.cmpsource = this.commonService.cmpsource;


    // 取得現在時間 @2024/04/01 Add
    const nowTime = this.commonService.getNowTime();
    console.log("getNowTime: ", nowTime);
    
    // @2024/04/01 Add
    // 創建一個新的 Date 物件，代表當前時間
    const currentDate = new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`);
    
    // @2024/04/01 Add
    // 創建一個新的 Date 物件，並將月份往回設置一個月
    const oneMonthAgoDate = new Date(currentDate);
    oneMonthAgoDate.setMonth(oneMonthAgoDate.getMonth() - 1);
    
    // 確保月份和日期是兩位數的格式，如 "02" 代表 2 月 @2024/04/01 Add
    const formattedMonth = ('0' + (oneMonthAgoDate.getMonth() + 1)).slice(-2);
    const formattedDay = ('0' + oneMonthAgoDate.getDate()).slice(-2);
    const formattedHour = ('0' + oneMonthAgoDate.getHours()).slice(-2);
    const formattedMinute = ('0' + oneMonthAgoDate.getMinutes()).slice(-2);

    // @2024/04/01 Add
    // 使用這些格式化後的值來更新 searchForm 控件的值
    this.searchForm = this.fb.group({
      'from': new FormControl( `${oneMonthAgoDate.getFullYear()}-${formattedMonth}-${formattedDay} ${formattedHour}:${formattedMinute}` ), 
      'to': new FormControl( `${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}` ),
      'severity': new FormControl( 'All' )
    });

    // 建立搜尋表單 
    this.createSearchForm();

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
      //this.bsCellCount = params['cellCount'];
      console.log('bsId: ' + this.bsID + ', bsName: ' + this.bsName +
                     ', bsType: ' + this.bsType + ', bsCellCount: ' + ',\nsend from /main/bs-mgr');
      
      // 建立 searchForm 的深層複本 ( Deep Copy )，以保留原始表單狀態，供後續搜尋使用。
      this.afterSearchForm = _.cloneDeep( this.searchForm );

      // 初入該頁面就取得此 BS 資訊               
      this.getQueryBsInfo();

      // @2024/03/27 Add
      // 取得基站資訊後，取得網元列表資訊並進行座標位置或軟體版本顯示資訊的相關處理 
      this.getNEList(); 

      // 取得此基站告警資訊 @2024/04/01 Add
      this.getCurrentBsFmList()
    });

    this.drawConnectingLines();
  }

  ngOnDestroy() {
    clearTimeout( this.refreshTimeout );
  }

  ngAfterViewInit() {

    this.canvas.nativeElement.width  = 1000; // 增加 Canvas 的寬度
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


// ↓ For Bs Parameters Page Control @2024/03/29 Add ↓

  bsParametersType: string = 'Basic';       // 預設選擇 "Basic"    @2024/03/29 Add 
  //bsParametersType: string = 'Advanced';  // 預設選擇 "Advanced" @2024/03/29 Add

  // @2024/03/29 Add
  // 變更 changeBsParametersType 視窗顯示類型的函數
  changeBsParametersType( e: MatButtonToggleChange ) {

    // 根據當前選擇的 Log 類型載入數據
    if ( e.value === 'Basic' ) {

      this.bsParametersType = 'Basic';

    } else if ( e.value === 'Advanced' ) {

      this.bsParametersType = 'Advanced';
    }

    // 更新當前類型，以便知道哪個 Bs Parameters 類型被選中
    this.bsParametersType = e.value;
    console.log( '頁面切換後，顯示的 Bs Parameters 類型:', this.bsParametersType+
                  '\nLog type displayed after tab switch:', this.bsParametersType );
  }

// ↑ For Bs Parameters Page Control @2024/03/29 Add ↑



  isLoadingBsInfo =  true;                            // 加載 BS 資訊狀態的標誌，初始設置為 true
  selectBsInfo:      BSInfo = {} as BSInfo;           // 用於存儲從服務器或 Local Files 獲取的一體式基站資訊
  selectBsInfo_dist: BSInfo_dist = {} as BSInfo_dist; // 用於存儲從服務器或 Local Files 獲取的分佈式基站資訊
  selectBsCellCount: number = 0;                      // 用於存儲當前選中的 BS Cell 數量
   selectBsPosition: string = "";                     // 用於存儲當前選中的一體式 BS 位置
  selectDistBsPosition: string = "";                  // 用於存儲當前選中的分佈式 BS 位置
  
  // 用於獲取基站資訊 @2024/04/12 Update - 更新計算分佈式 Cell 數方式，改跟基站主頁方法相同
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
        //this.selectBsCellCount = this.selectBsInfo_dist.info.length; // 每個 RU 代表一個 Cell
                   // 改用遍歷 components 計算 Cell 數量 @2024/04/12 Add
        // 如果 bstype 為 2，需要遍歷 components 物件算 Cell 數量，每個 RU 代表一個 Cell
        let cellCount = 0;
        for ( const compKey in this.selectBsInfo_dist.components ) {
          const compVal = this.selectBsInfo_dist.components[compKey];
          for ( const innerKey in compVal ) {
            // 取得內層陣列的長度，即 cell 數量
            cellCount += compVal[innerKey].length;
          }
        }
        // 使用 cellCount 設置 selectBsCellCount
        this.selectBsCellCount = cellCount;

      }

      console.log( `In local - BS Type ${ this.bsType } - Cell Count: ${ this.selectBsCellCount }` );

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
            //this.selectBsCellCount = this.selectBsInfo_dist.info.length; // 每個 RU 代表一個 Cell

            // 改用遍歷 components 計算 Cell 數量 @2024/04/12 Add
            // 如果 bstype 為 2，需要遍歷 components 物件算 Cell 數量，每個 RU 代表一個 Cell
            let cellCount = 0;
            for ( const compKey in this.selectBsInfo_dist.components ) {
              const compVal = this.selectBsInfo_dist.components[compKey];
              for ( const innerKey in compVal ) {
                // 取得內層陣列的長度，即 cell 數量
                cellCount += compVal[innerKey].length;
              }
            }
            // 使用 cellCount 設置 selectBsCellCount
            this.selectBsCellCount = cellCount;
          
          }
          
          console.log(`BS Type ${ this.bsType } - Cell Count: ${ this.selectBsCellCount }`);

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
  isLoadingNEList = true; // 控制加載 NE List 資訊狀態的標誌，初始設置為 true

  // @2024/03/29 Update
  // 用於取得 NE 列表資訊的函數
  getNEList() {
    console.log( 'getNEList() - Start' ); // 輸出開始取得 NE 列表的日誌

    this.isLoadingNEList = true;          // 開始加載數據，顯示進度指示器

    if ( this.commonService.isLocal ) {

      // 如果是本地模式
      // 從本地文件中獲取 NE 列表
      this.NEList = this.neList_LocalFiles.neList_local;

      // 處理獲取的 NE 列表,將 id 和 name 存儲到 neidNamePairs 中
      this.processNEList( this.NEList );

      // 篩選出於此 BS 內的網元 
      this.filterNEListByBSName();       

      this.isLoadingNEList = false; // Local 模式下，數據加載快速完成，直接設置為 false

      this.changeDetectorRef.detectChanges(); // 手動觸發變更檢測

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

          this.changeDetectorRef.detectChanges(); // 手動觸發變更檢測
          
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
          this.changeDetectorRef.detectChanges(); // 手動觸發變更檢測
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

  // @2024/03/28 Add
  // 用於儲存一體式基站的 NE ID，用於後續繪製拓樸圖
  allInOneNEID: string = "";

  // @2024/03/29 Update - 修改當 this.bsType === "2" 時的處理方式
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

      // console.log( "分佈式基站的 this.selectBsInfo_dist.info.length:", this.selectBsInfo_dist.info.length );

      // 檢查分佈式 BS 的 info 是否有值
      // if ( this.selectBsInfo_dist.info.length > 0 ) { // 有值時

      //   // 遍歷 selectBsInfo_dist.info 中的每個 Info 對象，對分佈式基站的網元軟體版本資訊進行處理
      //   this.if_BsInfo_dist_notNull( this.selectBsInfo_dist.info, neList );

      // } else { // 無值時

      //   console.log( "this.selectBsInfo_dist.info 無值，開始使用 if_BsInfo_dist_isNull() 進行處理" );

      //   this.if_BsInfo_dist_isNull( neList );
      // }

      // 都直接改呼叫此函數，
      // 從 this.componentArray 中去取得對應的軟體或位置資訊
      this.if_BsInfo_dist_isNull( neList );

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
          const position = Object.values( rus[i] )[0];

          this.componentArray.push( { type: 'ru', id: ruId, duid: duid, position: this.commonService.formatPosition( position ) } );
        }
      }
    }
  }

  // @2024/03/29 Add
  // 當於處理網元列表 processNEList(),，且 BsInfo_dist.info 沒有值時,
  // 用於對基站的網元軟體版本資訊進行處理 ( 分佈式用 )。
  if_BsInfo_dist_isNull( neList: NEList ) {
    // 遍歷 this.componentArray,對分佈式基站的網元軟體版本資訊進行處理
    for ( const component of this.componentArray ) {
      const correspondingNE = neList.components.find( ne => ne.id === component.id );
      
      // 如果找到對應的 NE
      if ( correspondingNE ) {
        const neType = component.type.toUpperCase(); // 轉換網元類型為大寫
        const neModel = `${correspondingNE.firm} / ${correspondingNE.modelname}`; // 構建網元型號字串
        const neSFversion = this.getActiveSoftwareVersion( correspondingNE.sm ) || 'None'; // 獲取活動軟體版本,如果沒有則設置為 'None'
        
        // 將軟體版本資訊存儲在 swVersionMap 中,以網元 ID 作為鍵
        this.swVersionMap[component.id] = { neName: correspondingNE.name, neType, neModel, neSFversion };
        
        // 如果是 RU 網元,將 NE 的名稱和位置存儲在 ruIdNamePositionMap 中,以 RU.id 作為鍵
        if ( component.type === 'ru' ) {
          this.ruIdNamePositionMap[component.id] = {
            name: correspondingNE.name, // NE 的名稱
            position: component.position // 從 componentArray 中獲取 RU 的位置資訊
          };
        }
      }
    }
  }

  // @2024/03/29 Add ( 目前改不使用此種方式 )
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

  // @2024/03/29 Add
  selectNEid: string = ""; // 用於存儲當前選中的網元ID

  


// ↓ 繪製拓樸圖區 @2024/03/28 Add ↓

  // 使用 @ViewChild 裝飾器獲取 canvas 元素的引用
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  // 獲取一體式基站的位置
  getAllInOnePosition(): { x: number, y: number } {
    const  canvasWidth = this.canvas.nativeElement.width; // 獲取畫布寬度
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
  

// ↓ 網元列表區 @2024/03/29 Add ↓

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

// ↑ 網元列表區 @2024/03/29 Add ↑




// ↓ 基站告警區 @2024/03/31 Add ↓

  p: number = 1;            // 當前頁數
  pageSize: number = 5;     // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  searchForm!: FormGroup;
  afterSearchForm!: FormGroup; // 用於儲存並顯示出篩選條件
  cmpsource: string[];
  fmsgList: FmsgList = {} as FmsgList;
  isSearch: boolean = false;
  filteredFmList: FaultMessages[] = [];

 // ↓ 用於儲存所有於此 BS 內的告警資訊 ↓
  currentBsFmList: CurrentBsFmList = {} as CurrentBsFmList;  
  isLoadingCurrentBsFmList = true; // 控制加載當前 Bs Fm List 資訊狀態的標誌,初始設置為 true
  filtered_CurrentBsFmList: FaultMessage[] = [];  // 用於儲存篩選後的基站告警資訊
  isSearch_currentBsFmList: boolean = false;      // 用於標記是否進行了搜尋

  // @2024/04/01 Add
  // 頁數切換時重新獲取告警資訊
  pageChanged( page: number ) {
    this.p = page;
    console.log("Current Page:", this.p);

    // 如非 Local 模式,切換每頁時才呼叫 API 取得告警資訊
    if (!this.commonService.isLocal) {
      this.getCurrentBsFmList();
    }
  }

  // @2024/04/01 Update
  // 取得指定基站的當前告警資訊
  getCurrentBsFmList() {
    console.log('getCurrentBsFmList() - Start');

    this.isLoadingCurrentBsFmList = true; // 設置加載旗標為 true,表示開始加載

    if ( this.commonService.isLocal ) {
      
      // Local Test
      this.currentBsFmList = this.currentBsFmList_LocalFiles.currentBsFmList_local;
      console.log('currentBsFmList:', this.currentBsFmList);

      // 將 processstatus 轉換為字串型態
      this.currentBsFmList.faultMessage.forEach(msg => {
        msg.processstatus = String( msg.processstatus );
      });

      this.totalItems = this.currentBsFmList.totalMessageNumber;

      console.log("In getCurrentBsFmList() not click search (Local mode) - msgToDisplay:", this.msgToDisplay);

      this.isLoadingCurrentBsFmList = false; // 設置加載旗標為 false,表示加載完成

    } else {

      // 只保留傳入日期的部分
      const formattedDate = this.commonService.dealPostDate( this.searchForm.controls['from'].value );
      const start = formattedDate.split(' ')[0]; // 獲取日期部分,例如 '2024-03-10'
      
      const formattedEnd = this.commonService.dealPostDate( this.searchForm.controls['to'].value );  
      const end = formattedEnd.split(' ')[0];    // 獲取日期部分,例如 '2024-03-10'

      const params: bsCurrentFmParams = {
        method: 'desc',
        start,           // 取得開始日期 - 目前後端無法篩選時分秒
        end,             // 取得結束日期 - 目前後端無法篩選時分秒

        offset: ( this.p - 1 ) * this.pageSize,
        limit: 5
      };

      // 獲取 bsCurrentFmControl 的控制元件
      const bsCurrentFmControl = this.searchForm.get('severity');

      // 判斷 severity 控制元件是否存在且有值
      if ( bsCurrentFmControl && bsCurrentFmControl.value !== 'All' ) {
        params.urgency = bsCurrentFmControl.value;
      }

      // 使用 API_BS 中的 queryCurrentBsFaultMessage() 發起 HTTP GET 請求
      this.API_BS.queryCurrentBsFaultMessage(this.bsID, params).subscribe({
        next: (res) => {    // 成功的 callback

          if (!this.isSearch_currentBsFmList) {
            // 如非點擊 Search 過
            console.log('In getCurrentBsFmList() not click search - res:', res);

            this.currentBsFmList = res; // 賦值響應至 currentBsFmList

            // 將 processstatus 轉換為字串型態
            this.currentBsFmList.faultMessage.forEach(msg => {
              msg.processstatus = String(msg.processstatus);
            });

            console.log('In getCurrentBsFmList() not click search - currentBsFmList:', this.currentBsFmList);

            this.totalItems = this.currentBsFmList.totalMessageNumber;
            console.log('In getCurrentBsFmList() not click search - Total Bs Fault Message Num:', this.totalItems);

            console.log("In getCurrentBsFmList() not click search - msgToDisplay:", this.msgToDisplay);

          } else {
            // 如點擊 Search 過
            console.log('In getCurrentBsFmList() click search - res:', res);

            // 傳回的數據 res 已是篩選過的,故直接放入 filtered_CurrentBsFmList
            this.filtered_CurrentBsFmList = res.faultMessage;

            // 將 processstatus 轉換為字串型態
            this.filtered_CurrentBsFmList.forEach(msg => {
              msg.processstatus = String(msg.processstatus);
            });

            this.totalItems = res.totalMessageNumber;     // 更新記錄的告警總數
            console.log("In getCurrentBsFmList() click search - msgToDisplay:", this.msgToDisplay);
          }

          this.isLoadingCurrentBsFmList = false; // 設置加載旗標為 false,表示加載完成
        },
        error: (error) => {  // 錯誤的 callback
          console.error('Error fetching current bs fault message:', error); // 顯示錯誤訊息

          this.isLoadingCurrentBsFmList = false; // 設置加載旗標為 false,表示加載出錯
        },
        complete: () => {    // 完成的 callback
          console.log('Current bs fault message fetch completed');   // 顯示完成訊息
        }
      });

    }

    console.log("getCurrentBsFmList() - End");
  }

  // 告警嚴重程度選項 @2024/04/01 Add
  severitys: string[] = ['CRITICAL', 'MAJOR', 'MINOR', 'WARNING'];
  
  // 搜尋基站告警 @2024/04/01 Add
  search_currentBsFmList() {
    console.log( 'search_currentBsFmList() - Start' );

    // currentBsFmList 是否已加載
    if ( !this.currentBsFmList || !this.currentBsFmList.faultMessage ) {
      console.error( 'currentBsFmList.faultMessage is not loaded yet.' );
      return;
    }

    // 更新顯示的搜尋條件
    this.afterSearchForm = this.searchForm.value;

    this.p = 1; // 當點擊搜尋時,將頁數預設為 1

    const from = this.searchForm.get( 'from' )?.value;
    const to = this.searchForm.get( 'to' )?.value;
    const severity = this.searchForm.get( 'severity' )?.value;
    
    console.log( 'the search severity is', severity );
    
    // 清除以前的搜尋結果
    this.filtered_CurrentBsFmList = [];
    this.isSearch_currentBsFmList = false;

    this.afterSearchForm = _.cloneDeep( this.searchForm );

    this.isLoadingCurrentBsFmList = true; // 設置加載旗標為 true,表示開始加載

    if ( this.commonService.isLocal ) {

      this.filtered_CurrentBsFmList = this.currentBsFmList.faultMessage.filter( msg => {

        const msgDate = new Date( msg.timestamp );
        const isAfterFrom = msgDate >= new Date( from );
        const isBeforeTo = msgDate <= new Date( to );
        const isSeverityMatch = severity === 'All' || msg.eventtype === severity;

        return isAfterFrom && isBeforeTo && isSeverityMatch;
      });

      // 將 filtered_CurrentBsFmList 中的 processstatus 轉換為字串型態
      this.filtered_CurrentBsFmList.forEach( msg => {
        msg.processstatus = String( msg.processstatus );
      });

      this.isSearch_currentBsFmList = true;  // Local Search 完畢,設置標記為 true

      this.totalItems = this.filtered_CurrentBsFmList.length; // 確保更新 totalItems 以反映搜尋結果的數量

      console.log( "In search_currentBsFmList() in Local mode - msgToDisplay:", this.msgToDisplay );

      this.isLoadingCurrentBsFmList = false; // 設置加載旗標為 false,表示加載完成

    } else {  // 如非在 Local 環境測試


      // 只保留傳入日期的部分
      const formattedDate = this.commonService.dealPostDate( this.searchForm.controls['from'].value );
      const start = formattedDate.split(' ')[0]; // 獲取日期部分,例如 '2024-03-10'
      
      const formattedEnd = this.commonService.dealPostDate( this.searchForm.controls['to'].value );  
      const end = formattedEnd.split(' ')[0];    // 獲取日期部分,例如 '2024-03-10'

      const params: bsCurrentFmParams = {
        method: 'desc',
        start,           // 取得開始日期 - 目前後端無法篩選時分秒
        end,             // 取得結束日期 - 目前後端無法篩選時分秒

        offset: ( this.p - 1 ) * this.pageSize,
        limit: 5
      };

      // 獲取 bsCurrentFmControl 的控制元件
      const bsCurrentFmControl = this.searchForm.get('severity');

      // 判斷 severity 控制元件是否存在且有值
      if ( bsCurrentFmControl && bsCurrentFmControl.value !== 'All' ) {
        params.urgency = bsCurrentFmControl.value;
      }

      // 使用 API_BS 中的 queryCurrentBsFaultMessage() 發起 HTTP GET 請求
      this.API_BS.queryCurrentBsFaultMessage( this.bsID, params ).subscribe({
        next: ( res ) => {    // 成功的 callback

          console.log( 'In search_currentBsFmList() - res:', res );
          
          // 傳回的數據 res 已是篩選過的,故直接放入 filtered_CurrentBsFmList
          this.filtered_CurrentBsFmList = res.faultMessage;

          // 將 filtered_CurrentBsFmList 中的 processstatus 轉換為字串型態
          this.filtered_CurrentBsFmList.forEach( msg => {
            msg.processstatus = String( msg.processstatus );
          });

          this.totalItems = res.totalMessageNumber;       // 更新記錄的告警總數
          this.isSearch_currentBsFmList = true;        // Search 完畢,設置標記為 true,以便 msgToDisplay 切換成顯示 filtered_CurrentBsFmList
          console.log( "In search_currentBsFmList() - msgToDisplay:", this.msgToDisplay );

          this.isLoadingCurrentBsFmList = false; // 設置加載旗標為 false,表示加載完成
        },
        error: ( error ) => {  // 錯誤的 callback
          console.error( 'Error searching current bs fault message:', error ); // 顯示錯誤訊息

          this.isLoadingCurrentBsFmList = false; // 設置加載旗標為 false,表示加載出錯
        }
      });

    }

    // // 更新顯示的搜尋條件
    // this.afterSearchForm.patchValue({
    //   'from': from,
    //   'to': to,
    //   'severity': severity
    // });

    // 檢查搜尋表單的值
    console.log('Search criteria for current bs fault message:', this.afterSearchForm.value);

    console.log("search_currentBsFmList() - End");
  }


  // 創建搜尋表單 @2024/04/01 Add
  createSearchForm() {
    const nowTime = this.commonService.getNowTime();

    // 創建當前時間的 Date 物件
    const now = new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`);

    // 創建往回推一個月的時間之 Date 物件
    const from = new Date(now);
    from.setMonth(from.getMonth() - 1);

    // 格式化日期時間以符合兩位數格式
    const paddedMonth = ('0' + (from.getMonth() + 1)).slice(-2);
    const paddedDay = ('0' + from.getDate()).slice(-2);
    const paddedHour = ('0' + from.getHours()).slice(-2);
    const paddedMinute = ('0' + from.getMinutes()).slice(-2);

    this.searchForm = this.fb.group({
      'from': new FormControl(`${from.getFullYear()}-${paddedMonth}-${paddedDay} ${paddedHour}:${paddedMinute}`), 
      'to': new FormControl(`${now.getFullYear()}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`),
      'severity': new FormControl('All') // 告警嚴重程度欄位
    });

    //this.afterSearchForm = _.cloneDeep(this.searchForm); // 深拷貝 searchForm 的值給 afterSearchForm
  }

  // 重置告警搜尋 @2024/03/31 Add  
  clear_search_currentBsFmList() {

    this.isSearch_currentBsFmList = false;

    this.searchForm.reset();  
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep( this.searchForm );
    
    this.p = 1; // 當點擊重置搜尋時,將顯示頁數預設為 1

    this.getCurrentBsFmList();
    
  }  

  // 用於顯示的基站告警數據 @2024/04/01 Add
  get msgToDisplay(): FaultMessage[] {

    // 檢查 this.currentBsFmList 是否存在，以及 this.currentBsFmList.faultMessage  是否為非空數組
    if ( this.currentBsFmList && Array.isArray( this.currentBsFmList.faultMessage ) ) {
      return this.isSearch_currentBsFmList ? this.filtered_CurrentBsFmList : this.currentBsFmList.faultMessage;
    }
    return []; // 如果數據還沒有載入，則返回一個空數組
  }

// ↑ 基站告警區 @2024/03/31 Add ↑


















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