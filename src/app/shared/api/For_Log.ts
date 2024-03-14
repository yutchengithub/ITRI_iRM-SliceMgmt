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
  sessionId = this.commonService.getSessionId();  // Get the Session ID 

  // 取得 User Logs 用
  queryLogList( params: any ): Observable<any> {
    const url = `${this.restPath}/queryLogList/${this.sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // 下載 User Logs 用
  getDumpLogList( params: any ): Observable<any> {
    const url = `${this.restPath}/getDumpLogList/${this.sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // 取得 NE Logs 用
  queryUserNetconfLog( params: any ): Observable<any> { 
    const url = `${this.restPath}/queryUserNetconfLog/${this.sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // 下載 NE Logs 用
  getDumpUserNetconfLog( params: any ): Observable<any> {
    const url = `${this.restPath}/getDumpUserNetconfLog/${this.sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

}