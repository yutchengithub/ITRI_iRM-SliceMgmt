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
  sessionId = this.commonService.getSessionId();  // Get the Session ID @2024/01/08

  // Get a list of BSs that are not limited to being within the specified field
  queryBsList(): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryBsList/${this.sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // 取得指定 id 的基站所有資訊
  queryBsInfo( bsId: string ): Observable< BSInfo | BSInfo_dist >  {
    const url = `${this.restPath}/queryBsInfo/${this.sessionId}/${bsId}`;
    return this.http.get< BSInfo >( url ); // 告訴 HttpClient 期望的響應類型是 BSInfo
  }

  // For Updating Configurations of All-in-one BS
  updateBs( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  // For Updating Configurations of Distributed BS
  updateDistributedBs( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateDistributedBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  // Remove BS of selection @2024/03/22 Add
  removeBs( bsId: string ): Observable<any> { 
    
    // 構建 API URL
    const url = `${this.restPath}/removeBs`;
    
    // 準備請求體(JSON)，包含所有後端所需的參數
    const removeBsBody = {
      id: bsId,
      session: this.sessionId
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

  // Get a list of NEs  @2024/03/27 Add
  queryBsComponentList(): Observable<any> {
  
    // 構建 API URL
    const url = `${this.restPath}/queryBsComponentList/${this.sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // @2024/03/29
  // 取得 BS 中指定 id 的 NE 所有資訊
  queryBsComponentInfo( neId: string ): Observable< any >  {

    // 構建 API URL
    const url = `${this.restPath}/queryBsComponentInfo/${this.sessionId}/${neId}`;

    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  /** @2024/03/31 Add
    * 取得指定基站的當前告警資訊
    * @param bsId 基站 ID
    * @param params 其他查詢參數
    * @returns 返回一個 Observable 物件，發出 API 返回的資料
    */
  queryCurrentBsFaultMessage( bsId: string, params: any ): Observable<any> {

    // 組合 API 的 URL，包含 session ID 和基站 ID
    const url = `${this.restPath}/queryCurrentBsFaultMessage/${this.sessionId}/${bsId}`;
    
    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

}
