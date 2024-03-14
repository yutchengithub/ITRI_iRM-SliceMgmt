// BS 頁面會用到的 API 都於此 ( 還未移動完整 ) @2024/03/14 Add

import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { Injectable }    from '@angular/core';
import { Observable }    from 'rxjs';
import { CommonService } from '../common.service'; // @2024/01/08 Add by yuchen

import { BSInfo }      from '../interfaces/BS/For_queryBsInfo_BS';       // @2024/02/05 Add
import { BSInfo_dist } from '../interfaces/BS/For_queryBsInfo_dist_BS';  // @2024/02/05 Add

@Injectable({
  providedIn: 'root'
})
export class apiForBSMgmt {

  constructor(
    private http: HttpClient,
    private commonService: CommonService 
  ) {}
  
  restPath = this.commonService.restPath;         // Get the root path  @2024/01/08
  sessionId = this.commonService.getSessionId();  // Get the Session ID @2024/01/08

  // 取得指定 id 基站所有資訊
  queryBsInfo( bsId: string ): Observable< BSInfo | BSInfo_dist >  {
    const url = `${this.restPath}/queryBsInfo/${this.sessionId}/${bsId}`;
    return this.http.get< BSInfo >( url ); // 告訴 HttpClient 期望的響應類型是 BSInfo
  }

  // Get a list of BSs that are not limited to being within the specified field
  queryBsList(): Observable<any> {
    
    // 構建 API URL
    const url = `${this.restPath}/queryBsList/${this.sessionId}`;
  
    // 發起 HTTP GET 請求
    return this.http.get( url );
  }

  // For Updating Configurations of All-in-one BS
  updateBs( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

  // For Updating Configurations of Distributed BS
  updateDistributedBs( body: {} ): Observable<any> {

    const url = `${this.restPath}/updateDistributedBs`;
    
    const bodyStr = JSON.stringify( body );
    
    return this.http.post( url, bodyStr );
  }

}
