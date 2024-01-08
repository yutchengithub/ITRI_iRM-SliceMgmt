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
  
  // Field Management API  @11/30 Add by yuchen
  queryFieldList(): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldList/${this.sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // @12/05 Add by yuchen
  queryFieldInfo(fieldId: string): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldInfo/${this.sessionId}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // get the Field Image @2024/01/02 Add by yuchen
  queryFieldImage(fieldId: string): Observable<any> { 
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldImage/${this.sessionId}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
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