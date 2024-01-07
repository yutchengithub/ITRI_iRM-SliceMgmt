import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class apiForField {

  restPath!: string;

  statusList: Item[] = [
    { displayName: 'All', value: 'All' },
    { displayName: 'Running', value: '0' },
    { displayName: 'Deploying', value: '1' },
    { displayName: 'Fail Deploy', value: '2' },
    { displayName: 'Stopped', value: '3' }
  ];
  TypeList: Item[] = [
    { displayName: 'All', value: 'All' },
    { displayName: 'CU', value: '0' },
    { displayName: 'DU', value: '1' },
    { displayName: 'CU+DU', value: '2' },
    { displayName: 'CU+DU+RU', value: '3' }
  ];

  setSessionId(sessionId: string) {
    window.sessionStorage.setItem('sessionId', sessionId);
  }

  getSessionId(): string {
    return window.sessionStorage.getItem('sessionId') as string;
  }

  statusMapDisplayName: Map<string, string> = new Map();
  typeMapDisplayName: Map<string, string> = new Map();

  constructor(
    private http: HttpClient
  ) {
   
  }

    
  // Field Management API  @11/30 Add by yuchen
  queryFieldList(): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldList/${this.getSessionId()}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  queryFieldInfo(fieldId: string): Observable<any> {  // @12/05 Add by yuchen
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldInfo/${this.getSessionId()}/${fieldId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

  // get the Field Image @2024/01/02 Add by yuchen
  queryFieldImage(fieldId: string): Observable<any> { 
    
    // 構建 API URL
    const url = `${this.restPath}/queryFieldImage/${this.getSessionId()}/${fieldId}`;
  
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
      session: this.getSessionId(),
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
  
  updateBs( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

}