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

  // 建立 Schedule 用
  createJobTicket( body: any ): Observable<any> {        
    const url = `${this.restPath}/createJobTicket/${this.sessionId}`;
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }

  // 移除現有 Schedule 用
  removeJobTicket( jobId: string ): Observable<any> {    
    const url = `${this.restPath}/removeJobTicket/${this.sessionId}/${jobId}`;
    return this.http.delete(url);
  }

  // 取得現有 Schedule 資訊用
  queryJobTicketInfo( jobId: string ): Observable<any> { 
    const url = `${this.restPath}/queryJobTicketInfo/${this.sessionId}/${jobId}`;
    return this.http.get(url);
  }

  // 下載 Schedule 報表用
  getReportFile( jobticketId: string ): Observable<any> { 
    const url = `${this.restPath}/getReportFile/${this.sessionId}/${jobticketId}`;
    return this.http.get(url);
  }

  // 取得現有的 Schedule List 用
  queryJobTicketList(): Observable<any> {               
    const url = `${this.restPath}/queryJobTicketList/${this.sessionId}`;
    return this.http.get(url);
  }

}