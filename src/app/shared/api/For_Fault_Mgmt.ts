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

  /**
   * @2024/06/03 Add
   * 取得 "系統" 所有告警資訊用
   * @param params 查詢參數
   * @returns 返回一個 Observable 物件，發出 API 返回的資料
   */
  queryCurrentAllFaultMessage( params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID
    const url = `${this.restPath}/queryCurrentAllFaultMessage/${sessionId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

  /**
   * @2024/06/16 Add
   * 取得 "指定場域" 所有告警資訊用
   * @param fieldId 場域 ID
   * @param params 其他查詢參數
   * @returns 返回一個 Observable 物件，發出 API 返回的資料
   */
  queryCurrentFieldFaultMessage( fieldId: string, params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和場域 ID
    const url = `${this.restPath}/queryCurrentFieldFaultMessage/${sessionId}/${fieldId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

  /**
   * @2024/06/16 Add
   * 取得 "指定基站" 所有告警資訊用
   * @param bsId 基站 ID
   * @param params 其他查詢參數
   * @returns 返回一個 Observable 物件，發出 API 返回的資料
   */
  queryCurrentBsFaultMessage( bsId: string, params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和基站 ID
    const url = `${this.restPath}/queryCurrentBsFaultMessage/${sessionId}/${bsId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

  /**
   * @2024/06/16 Add
   * 取得 "指定基站網元" 所有告警資訊用
   * @param neId 網元 ID
   * @param params 其他查詢參數
   * @returns 返回一個 Observable 物件，發出 API 返回的資料
   */
  queryCurrentBsComFaultMessage( neId: string, params: any ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和網元 ID
    const url = `${this.restPath}/queryCurrentBsFaultMessage/${sessionId}/${neId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url, { params } );
  }

  /**
   * @2024/06/19 Add
   * 用於取得指定告警資訊的 "處理狀況" 歷史列表
   * @param faultId 告警 ID
   * @param params 其他查詢參數
   * @returns 返回一個 Observable 物件，發出 API 返回的資料
   */
  queryFaultAlarmProcessStatusList( faultId: string ): Observable<any> {

    // 每次調用 API 時都動態獲取最新的 sessionId
    const sessionId = this.commonService.getSessionId();

    // 組合 API 的 URL，包含 session ID 和告警 ID
    const url = `${this.restPath}/queryFaultAlarmProcessStatusList/${sessionId}/${faultId}`;

    // 發送 HTTP GET 請求到指定的 URL，並將 params 物件作為查詢參數傳遞給請求
    return this.http.get( url );
  }

  /**
   * @2024/06/19 Add
   * 用於更新指定告警資訊的 "處理狀況"
   * @param body 包含更新內容的物件
   * @returns 返回一個 Observable 物件，發出 API 返回的資料
   */
  updateFaultAlarmProcessStatus( body: {} ): Observable<any> {

    // 組合 API 的 URL
    const url = `${this.restPath}/updateFaultAlarmProcessStatus`;

    // 將 body 物件轉換為 JSON 字符串
    const bodyStr = JSON.stringify( body );

    // 發送 HTTP POST 請求到指定的 URL，並將 bodyStr 作為請求體傳遞給請求
    return this.http.post( url, bodyStr );
  }

}