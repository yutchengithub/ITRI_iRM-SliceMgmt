// BS 頁面會用到的 API 都於此 ( 還未移動完整 ) @2024/03/14 Add

import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs';
import { CommonService } from '../common.service'; // @2024/01/08 Add by yuchen

import { BSInfo }      from '../interfaces/BS/For_queryBsInfo_BS';       // @2024/02/05 Add
import { BSInfo_dist } from '../interfaces/BS/For_queryBsInfo_dist_BS';  // @2024/02/05 Add

@Injectable({
  providedIn: 'root'
})
export class apiForBSMgmt {

  constructor(
    private http: HttpClient,
    private commonService: CommonService 
  ) {}
  
  restPath = this.commonService.restPath;         // Get the root path  @2024/01/08
  //sessionId = this.commonService.getSessionId();  // Get the Session ID @2024/01/08

  // @2024/04/24 Update
  // Get a list of BSs that are not limited to being within the specified field
  queryBsList(): Observable< any > {
    
    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();
    // 構建 API URL
    const url = `${this.restPath}/queryBsList/${sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // @2024/04/24 Add
  // 取得未被使用的網元列表
  queryUnusedNeList(): Observable< any > {
    
    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/queryUnusedNeList/${sessionId}`;
    return this.http.get( url );
  }

  // @2024/04/29 Add
  // For create Base Station
  createBs( body: {} ): Observable< any > {

    const url = `${this.restPath}/createBs`;

    const bodyStr = JSON.stringify( body );

    return this.http.post( url, bodyStr );
  }

  // @2024/04/29 Add
  // For create Distributed Base Station
  createDistributedBs( body: {} ): Observable< any > {

    const url = `${this.restPath}/createDistributedBs`;

    const bodyStr = JSON.stringify( body );

    return this.http.post( url, bodyStr );
  }

  /** @2024/04/24 Update
   *  取得指定 id 的基站所有資訊
   *  @method queryBsInfo
   *  @param { string } bsId - 基站的唯一識別碼
   *  @returns { Observable< BSInfo | BSInfo_dist > }
   *  @description
   *    - 根據基站ID獲取該基站的詳細資訊，包括標準資料和可能的擴展資料
   */
  queryBsInfo( bsId: string ): Observable< BSInfo | BSInfo_dist > {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/queryBsInfo/${sessionId}/${bsId}`;
    return this.http.get< BSInfo >( url ); // 告訴 HttpClient 期望的響應類型是 BSInfo
  }

  // For Updating Configurations of All-in-one BS
  updateBs( body: {} ): Observable< any > {

    const url = `${this.restPath}/updateBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  // For Updating Configurations of Distributed BS
  updateDistributedBs( body: {} ): Observable< any > {

    const url = `${this.restPath}/updateDistributedBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  /** @2024/05/04 Add
   *  這 API 用於基站資訊頁面，針對鄰居基站配置進行新增、編輯與刪除操作
   *  @method optimalBs
   *  @returns { Observable< any > }
   *  @description
   *    - 用於處理基站資訊頁面中鄰居基站的配置，包括新增、編輯或刪除
   */
  optimalBs( body: {} ): Observable< any > {

    const url = `${this.restPath}/optimalBs`;  // 組合 API 的 URL，使用 restPath 作為基底路徑

    const bodyStr = JSON.stringify( body ); // 將輸入的物件轉換為 JSON 字符串格式

    return this.http.post( url, bodyStr );  // 使用 HttpClient 的 POST 方法發送請求並返回 Observable
  }


  // Remove BS of selection @2024/04/24 Update
  removeBs( bsId: string ): Observable< any > { 

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();
    
    // 構建 API URL
    const url = `${this.restPath}/removeBs`;
    
    // 準備請求體(JSON)，包含所有後端所需的參數
    const removeBsBody = {
      id: bsId,
      session: sessionId
    };

    // 定義 HTTP 請求選項
    const httpOptions = {
      // 設定 HTTP 標頭
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
      }),
      body: removeBsBody // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
    };

    // 使用 HTTP 客戶端發送 DELETE 請求
    // 通常 DELETE 請求不會包含正文，因為它們被設計用於刪除資源而不是傳遞資訊
    // 但如果後端 API 規定需要在 DELETE 請求中包含正文，則必須在發送請求時提供 'body'
    // 這裏的 'httpOptions' 包含了我們想要隨著請求發送的標頭和正文
    // 請注意，並非所有的伺服器實現都支持在 DELETE 請求中包含正文
    // 如果你控制不了伺服器端的實現，那麼你需要確認伺服器支持你的這種做法

    // 發起 HTTP DELETE 請求
    return this.http.delete( url, httpOptions );
  }

  // Get a list of NEs  @2024/04/24 Update
  queryBsComponentList(): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();
  
    // 構建 API URL
    const url = `${this.restPath}/queryBsComponentList/${sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // @2024/04/24 Update
  // 取得 BS 中指定 id 的 NE 所有資訊
  queryBsComponentInfo( neId: string ): Observable< any >  {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 構建 API URL
    const url = `${this.restPath}/queryBsComponentInfo/${sessionId}/${neId}`;

    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  /** @2024/04/24 Upadte
    * 取得指定基站的當前告警資訊
    * @param bsId 基站 ID
    * @param params 其他查詢參數
    * @returns 返回一個 Observable 物件，發出 API 返回的資料
    */
  queryCurrentBsFaultMessage( bsId: string, params: any ): Observable< any > {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和基站 ID
    const url = `${this.restPath}/queryCurrentBsFaultMessage/${sessionId}/${bsId}`;
    
    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

}
