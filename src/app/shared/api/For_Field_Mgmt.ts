// Field 頁面會用到的 API 都於此 ( 還未移動完整 ) @2024/03/06 Update

import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs';
import { CommonService } from '../common.service'; // @2024/01/08 Add by yuchen

import { BSInfo }      from '../interfaces/BS/For_queryBsInfo_BS';       // @2024/02/05 Add
import { BSInfo_dist } from '../interfaces/BS/For_queryBsInfo_dist_BS';  // @2024/02/05 Add

@Injectable({
  providedIn: 'root'
})
export class apiForFieldMgmt {

  constructor(
    private http: HttpClient,
    private commonService: CommonService 
  ) {}
  
  restPath = this.commonService.restPath;         // Get the root path  @2024/01/08
  sessionId = this.commonService.getSessionId();  // Get the Session ID @2024/01/08


  // Get Lists of Field @11/30 Add by yuchen
  queryFieldList(): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldList/${this.sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // For create Field @2024/02/01 Add by yuchen
  createField( body: {} ): Observable<any> {

    const url = `${this.restPath}/createField`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  // Remove Field of selection @2024/01/29 Add by yuchen
  removeField( fieldId: string ): Observable<any> { 
      
    // 構建 API URL
    const url = `${this.restPath}/removeField`;
    
    // 準備請求體(JSON)，包含所有後端所需的參數
    const removeFieldBody = {
      id: fieldId,
      session: this.sessionId
    };

    // 定義 HTTP 請求選項
    const httpOptions = {
      // 設定 HTTP 標頭
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
      }),
      body: removeFieldBody // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
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


  // For create a snapshot of specific field  @2024/03/06 Add by yuchen
  createFieldSnapshot( fieldId: string ): Observable<any> {

    const url = `${this.restPath}/createFieldSnapshot`;

    // 準備請求體，包含所有後端所需的參數
    const bodyStr = {
      session: this.sessionId,
      fieldid: fieldId
    };
    
    return this.http.post( url, bodyStr );
  }

  // Get Snapshot's list of specific field @2024/03/06 Add by yuchen
  queryFieldSnapshotList( fieldId: string ): Observable<any> {
  
    // 構建 API URL
    const url = `${this.restPath}/queryFieldSnapshotList/${this.sessionId}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // Call to remove a snapshot of selection @2024/03/07 Update by yuchen
  removeFieldSnapshotInfo( SnapshotId: string ): Observable<any> { 
  
    // 構建 API URL
    const url = `${this.restPath}/removeFieldSnapshotInfo`;
    
    // 準備請求體(JSON)，包含所有後端所需的參數
    const removeFieldSnapshotInfoBody = {
      id: SnapshotId,
      session: this.sessionId
    };

    // 定義 HTTP 請求選項
    const httpOptions = {
      // 設定 HTTP 標頭
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
      }),
      body: removeFieldSnapshotInfoBody    // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
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

  // Download the specified snapshot as an .xlsx file @2024/03/06 Add by yuchen
  getDumpFieldSnapshot( snapshotId: string ): Observable<any> {

    // 構建 API URL
    const url = `${this.restPath}/getDumpFieldSnapshot/${this.sessionId}/${snapshotId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // For Saving the current snapshot @2024/03/06 Add by yuchen
  updateFieldSnapshot( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateFieldSnapshot`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }


  // Get Information of Fields @12/05 Add by yuchen
  queryFieldInfo( fieldId: string ): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldInfo/${this.sessionId}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // For Updating Field Configurations @2024/01/19 Add by yuchen
  updateField( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateField`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }


  // 取得指定 id 基站所有資訊 @2024/02/05 Add - 從 commonService.ts 移入
  queryBsInfo( bsId: string ): Observable< BSInfo | BSInfo_dist >  {
    const url = `${this.restPath}/queryBsInfo/${this.sessionId}/${bsId}`;
    return this.http.get< BSInfo >( url ); // 告訴 HttpClient 期望的響應類型是 BSInfo
  }

  // @2024/01/16 Add by yuchen
  // Get a list of BSs that are not limited to being within the specified field
  queryBsList(): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryBsList/${this.sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // Get Image of the Field  @2024/01/02 Add by yuchen
  queryFieldImage( fieldId: string ): Observable<any> { 
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldImage/${this.sessionId}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // Upload Field Image  @2024/01/18 Add by yuchen
  uploadFieldImage( fieldId: string, file: File ): Observable<any> {
    const url = `${this.restPath}/uploadFieldImage/${this.sessionId}/${fieldId}`;

    // 創建 FormData 物件並附加文件
    const formData: FormData = new FormData();
    formData.append( 'file', file, file.name );

    // 發起 HTTP POST 請求
    return this.http.post( url, formData );
  }

  // Call to remove the Field Image @2024/01/10 Add by yuchen
  removeFieldImage( fieldId: string ): Observable<any> { 
    
    // 構建 API URL
    const url = `${this.restPath}/removeFieldImage`;
    
    // 準備請求體(JSON)，包含所有後端所需的參數
    const removeFieldImageBody = {
      fieldid: fieldId,
      session: this.sessionId
    };

    // 定義 HTTP 請求選項
    const httpOptions = {
      // 設定 HTTP 標頭
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
      }),
      body: removeFieldImageBody // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
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

  // Get SINR or RSRP map @2024/01/04 Update by yuchen
  bsHeatMap( fieldId: string, leftLongitude: number, leftLatitude: number, rightLongitude: number,
             rightLatitude: number, mapType: number ): Observable<any> {
    
    // 構建 API URL，指向後端的 bsHeatMap 路徑
    const url = `${this.restPath}/bsHeatMap`;
  
    // 準備請求體，包含所有後端所需的參數
    const requestBody = {
      session: this.sessionId,
      fieldId: fieldId,
      'left-longitude': String(Math.round(leftLongitude * 1000000)),    // 轉為字符串
      'left-latitude': String(Math.round(rightLatitude * 1000000)),     // 轉為字符串
      'right-longitude': String(Math.round(rightLongitude * 1000000)),  // 轉為字符串
      'right-latitude': String(Math.round(leftLatitude * 1000000)),     // 轉為字符串
      maptype: mapType
    };
    
    console.log( "session:", requestBody.session, 
                  "\nfieldId:", requestBody.fieldId, 
                    "\nmaptype:", requestBody.maptype, 
                    '\nleft-latitude:', requestBody['left-latitude'],
                      '\nleft-longitude:', requestBody['left-longitude'], 
                      '\nright-latitude:', requestBody['right-latitude'], 
                        '\nright-longitude:', requestBody['right-longitude'] );

    console.log( "JSON to bsHeatMap:", requestBody );

    // 發起 HTTP POST 請求，並返回 Observable 以便訂閱和處理響應
    return this.http.post( url, requestBody );
  }


  // For Get PM Parameter Setting @2024/02/04 Add by yuchen
  queryPmFtpInfo( fieldId: string ): Observable< any > { 
  
    // 構建 API URL
    const url = `${this.restPath}/queryPmFtpInfo/${this.sessionId}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }
  
  // For Updating PM Parameter Setting @2024/02/04 Add by yuchen
  updatePmFtpInfo( body: {} ): Observable< any > {

    const url = `${this.restPath}/updatePmFtpInfo`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  // For Get SON parameters @2024/03/30 Add by yuchen
  querySonParameter(): Observable<any> {
      
    // 構建 API URL
    const url = `${this.restPath}/querySonParameter/${this.sessionId}`;

    // 發起 HTTP GET 請求
    return this.http.get( url );
  }
  
  /**
   * 用於發送參數給 SON 演算法計算的 API
   *
   * @param body 包含計算所需參數的物件
   * @returns 一個 Observable，代表 API 的響應結果
   */
  multiCalculateBs( body: {} ): Observable<any> {
    // 建立完整的 API URL
    const url = `${this.restPath}/multiCalculateBs`;

    // 將請求主體轉換為 JSON 字串
    const bodyStr = JSON.stringify( body );

    // 發送 HTTP POST 請求到指定的 URL，並將請求主體作為參數傳遞
    return this.http.post( url, bodyStr );
  }

  /** @2024/04/12 Add
    * 用於發送參數以套用 multiCalculateBs 返回的計算結果的 API
    *
    * @param body 包含套用計算結果所需參數的物件
    * @returns 一個 Observable,代表 API 的響應結果
    */
  multiOptimalBs(body: {}): Observable<any> {
    // 建立完整的 API URL
    const url = `${this.restPath}/multiOptimalBs`;

    // 將請求主體轉換為 JSON 字串
    const bodyStr = JSON.stringify(body);

    // 發送 HTTP POST 請求到指定的 URL,並將請求主體作為參數傳遞
    return this.http.post(url, bodyStr);
  }

  // For Updating Configurations of All-in-one BS @2024/01/05 Add by yuchen
  updateBs( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  // For Updating Configurations of Distributed BS @2024/01/08 Add by yuchen
  updateDistributedBs( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateDistributedBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

}