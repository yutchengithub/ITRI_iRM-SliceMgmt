// Fault Mgmt 頁面會用到的 API 都於此 @2024/06/03 Add

import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class apiForFaultMgmt {

  constructor(
    private http: HttpClient,
    private commonService: CommonService 
  ) {}

  restPath = this.commonService.restPath;         // Get the root path 
  //sessionId = this.commonService.getSessionId();  // Get the Session ID 

  // @2024/06/03 Add
  // 取得 "系統" 所有告警資訊用
  queryCurrentAllFaultMessage( params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/queryCurrentAllFaultMessage/${sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

  // @2024/06/16 Add
  // 取得 "指定場域" 所有告警資訊用 @2024/06/16 Add
  queryCurrentFieldFaultMessage( fieldId: string, params: any ): Observable< any > {
  
    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和場域 ID
    const url = `${this.restPath}/queryCurrentFieldFaultMessage/${sessionId}/${fieldId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

  // @2024/06/16 Add
  // 取得 "指定基站" 所有告警資訊用 @2024/06/16 Add
  queryCurrentBsFaultMessage( bsId: string, params: any ): Observable< any > {
  
    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和場域 ID
    const url = `${this.restPath}/queryCurrentBsFaultMessage/${sessionId}/${bsId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

  // @2024/06/16 Add
  // 取得 "指定基站網元" 所有告警資訊用
  queryCurrentBsComFaultMessage( neId: string, params: any ): Observable< any > {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和場域 ID
    const url = `${this.restPath}/queryCurrentBsFaultMessage/${sessionId}/${neId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

}