// Schedule 頁面會用到的 API 都於此 @2024/03/14 Add

import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs';
import { CommonService } from '../common.service';

@Injectable({
  providedIn: 'root'
})
export class apiForScheduleMgmt {

  constructor(
    private http: HttpClient,
    private commonService: CommonService 
  ) {}

  restPath = this.commonService.restPath;         // Get the root path 
  sessionId = this.commonService.getSessionId();  // Get the Session ID 

  // 取得現有的 Schedule List 用
  queryJobTicketList(): Observable<any> {    

    // 構建 API URL
    const url = `${this.restPath}/queryJobTicketList/${this.sessionId}`;

    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // 建立 Schedule 用
  createJobTicket( body: any ): Observable<any> {     

    const url = `${this.restPath}/createJobTicket`;

    const bodyStr = JSON.stringify( body );

    return this.http.post( url, bodyStr );
  }

  // 移除現有 Schedule 用
  removeJobTicket( jobId: string ): Observable<any> { 

    const url = `${this.restPath}/removeJobTicket`;

    // 準備請求體(JSON)，包含所有後端所需的參數
    const removeJobBody = {
      id: jobId,
      session: this.sessionId
    };

    // 定義 HTTP 請求選項
    const httpOptions = {
      // 設定 HTTP 標頭
      headers: new HttpHeaders({
        'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
      }),
      body: removeJobBody // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
    };
    
    // 發起 HTTP DELETE 請求
    return this.http.delete( url, httpOptions );
  }

  // 下載 Schedule 報表用
  getReportFile( jobId: string ): Observable<any> { 

    // 構建 API URL
    const url = `${this.restPath}/getReportFile/${this.sessionId}/${jobId}`;
    
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // 取得現有對應到的 Schedule 資訊用
  queryJobTicketInfo( jobId: string ): Observable<any> { 

    // 構建 API URL
    const url = `${this.restPath}/queryJobTicketInfo/${this.sessionId}/${jobId}`;

    // 發起 HTTP GET 請求
    return this.http.get(url);
  }

}