// 場域頁面會用到的 API 都於此 ( 還未移動完整 ) @2024/01/16

import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonService } from '../common.service'; // @2024/01/08 Add by yuchen

@Injectable({
  providedIn: 'root'
})
export class apiForField {

  restPath = this.commonService.restPath;         // Get the root path  @2024/01/08
  sessionId = this.commonService.getSessionId();  // Get the Session ID @2024/01/08

  constructor(
    private http: HttpClient,
    private commonService: CommonService 
  ) {}
  
  // Get Lists of Field @11/30 Add by yuchen
  queryFieldList(): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldList/${this.sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // Get Information of Fields @12/05 Add by yuchen
  queryFieldInfo(fieldId: string): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldInfo/${this.sessionId}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
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
    const removeFieldBody = {
      fieldid: fieldId,
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