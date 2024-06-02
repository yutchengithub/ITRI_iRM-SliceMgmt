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

  // 取得所有告警資訊用 @2024/06/03 Add
  queryCurrentAllFaultMessage( params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    const url = `${this.restPath}/queryCurrentAllFaultMessage/${sessionId}`;
    return this.http.get( url, { params } );  // 將參數物件傳遞給 HTTP GET 請求
  }

}