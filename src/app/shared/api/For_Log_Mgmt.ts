// Log 頁面會用到的 API 都於此 @2024/03/14 Add

import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class apiForLogMgmt {

  constructor(
    private http: HttpClient,
    private commonService: CommonService 
  ) {}

  restPath = this.commonService.restPath;         // Get the root path 
  //sessionId = this.commonService.getSessionId();  // Get the Session ID 

  // 取得 User Logs 用 @2024/04/24 Update
  queryLogList( params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/queryLogList/${sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // @2024/04/24 Update
  // 下載 User Logs 用 ( 後端無 keyword 選項可篩選下載 )
  getDumpLogList( params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/getDumpLogList/${sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // 取得 NE Logs 用 @2024/04/24 Update
  queryUserNetconfLog( params: any ): Observable<any> { 

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/queryUserNetconfLog/${sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // 下載 NE Logs 用 @2024/04/24 Update
  getDumpUserNetconfLog( params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();
    
    const url = `${this.restPath}/getDumpUserNetconfLog/${sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // 取得 NE 列表用 @2024/04/24 Update
  queryBsComponentList(): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/queryBsComponentList/${sessionId}`;
    return this.http.get( url );
  }

}