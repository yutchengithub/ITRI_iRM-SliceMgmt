
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams  } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

import { OCloudList } from './../field-management/field-management.component';
import { OcloudInfo, OcloudPerformance } from '../field-management/field-info/field-info.component';
import * as _ from 'lodash';

import { Nf, OcloudDmsList } from '../nf-management/nf-management.component';

import { Observable } from 'rxjs';
import { DmsAvaliableCapacity, NfCapacityList, NfCapacitySummary, NfInfo, NfPerformance } 
          from '../nf-management/nf-info/nf-info.component';

import { Item } from './models/item';

// Interfaces of NE ( Component ) management 
import { ComponentList }   from '../component-management/component-management.component';
import { BsComponentInfo } from '../component-management/component-info/component-info.component';
import { ComponentInfosw } from '../component-management/component-info/component-info.component';

// Interfaces of Fault Management
import { FmsgList, FaultMessages, FmStatus } from '../fault-management/fault-management.component';

// Interfaces of Performance Management
import { PerformanceList } from '../performance-management/o-cloud-performance/o-cloud-performance.component';
import { NfPerformanceList } from '../performance-management/nf-performance/nf-performance.component';
import { NfCpuLoading, NfCpuUsage, NfDiskRate, NfDiskUsage, NfInterfaceUsage, NfMemoryUsage, NfNetworkThroughput, NfOverviewKpi, NfPower } 
          from '../performance-management/nf-performance-info/nf-performance-info.component';
import { OcloudCpuLoading, OcloudCpuUsage, OcloudDiskRate, OcloudDiskUsage, OcloudInterfaceUsage, OcloudMemoryUsage, OcloudNetworkThroughput, OcloudPower, OverviewKpi }
          from '../performance-management/o-cloud-performance-info/o-cloud-performance-info.component';

// Interfaces of Software Management
import { SoftwareList } from '../software-management/software-management.component';
import { SoftwareLists} from '../software-management/software-management.component';
import { SoftwareInfo } from '../software-management/software-info/software-info.component';

// Interfaces of Account Management
import { AccountLists} from '../account-management/account-management.component';
import { AccountInfo } from '../account-management/account-info/account-info.component';

export interface NowTime {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
  second: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

      isLocal !: boolean;
     restPath !: string;
      options = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };
    severitys: string[] = ['CRITICAL', 'MAJOR', 'MINOR', 'WARNING'];
  statusTypes: string[] = ['New', 'Cleared'];
   situations: string[] = ['Pending', 'Ended'];
    cmpsource: string[] = ['Startup', 'Running', 'Candidate'];

  // For Log Management @11/01 Add 
  UserLogType: string[] = ['GET', 'POST', 'DELETE'];
    NELogType: string[] = ['get', 'get-config', 'edit-config'];

  // Software Management
  nfTypeList: Item[] = [
    { displayName: 'CU', value: '0' },
    { displayName: `DU`, value: '1' },
    { displayName: `RU`, value: '2' },
    { displayName: `CU+DU+RU`, value: '3' }
  ];

  scaleFontSize: number = 20;
  rangeWidth: number = 10;
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
  statusMapDisplayName: Map<string, string> = new Map();
  typeMapDisplayName: Map<string, string> = new Map();

  constructor ( 
    
    private http: HttpClient
    
  ) {

    this.statusList.forEach(( row ) => {
      this.statusMapDisplayName.set(row.value, row.displayName);
    });

    this.TypeList.forEach(( row ) => {
      this.typeMapDisplayName.set(row.value, row.displayName);
    });

  }
  
  // 調整為 RxJS 新版本( Observer object )語法 @11/28 changed by yuchen
  loadConfig(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/config/connection.json').subscribe({
        next: (res: any) => {
          this.isLocal = res['local'];
          this.restPath = res['url'] + ':' + res['port'] + res['root'];
          resolve(true);
        },
        error: (error) => {
          console.error('Could not load config', error);
          reject(error);
        }
      });
    });
  }
  
  setSessionId(sessionId: string) {
    window.sessionStorage.setItem('sessionId', sessionId);
  }

  getSessionId(): string {
    return window.sessionStorage.getItem('sessionId') as string;
  }

  removeSessionId() {
    window.sessionStorage.removeItem('sessionId');
  }

  colorOne(): string {
    const styleType = window.sessionStorage.getItem('styleType');
    if (styleType === 'black') {
      return '#4FFF4F';
    } else {
      return '#27a327';
    }
  }

  colorTwo(): string {
    const styleType = window.sessionStorage.getItem('styleType');
    if (styleType === 'black') {
      return '#FFC14F';
    } else {
      return '#fc8f2a';
    }
  }

  colorThree(): string {
    const styleType = window.sessionStorage.getItem('styleType');
    if (styleType === 'black') {
      return '#FF3B3B';
    } else {
      return '#e90000';
    }
  }

  getNowTime(): NowTime {
    const d = new Date();
    const year = _.toString(d.getFullYear());
    const month = this.addZero(d.getMonth() + 1);
    const day = this.addZero(d.getDate());
    const hour = this.addZero(d.getHours());
    const minute = this.addZero(d.getMinutes());
    const second = this.addZero(d.getSeconds());
    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute,
      second: second
    }
  }

  addZero(t: number): string {
    const tStr = _.toString(t);
    if (tStr.length === 1) {
      return '0' + tStr;
    } else {
      return tStr;
    }
  }

  dealPostDate(time: any): string {
    const date = new Date(time);
    const year = date.getFullYear();
    const month = this.addZero(date.getMonth() + 1);
    const day = this.addZero(date.getDate());
    const hour = this.addZero(date.getHours());
    const minute = this.addZero(date.getMinutes());
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  severityText(severity: string): string {
    if (severity.toUpperCase() === 'CRITICAL') {
      return 'Critical';
    } else if (severity.toUpperCase() === 'MAJOR') {
      return 'Major';
    } else if (severity.toUpperCase() === 'MINOR') {
      return 'Minor';
    } else if (severity.toUpperCase() === 'WARNING') {
      return 'Warning';
    } else {
      return '';
    }
  }

  IRM_severityText(severity: string): string {
    // 將傳入的 severity 字串轉換成大寫，並檢查是否等於 'CRITICAL'
    if (severity.toUpperCase() === 'alarmCriticalNum') {
      // 如果是 'alarmCriticalNum'，則返回字串 'Critical'
      return 'Critical';
    } else if (severity.toUpperCase() === 'alarmMajorNum') {
      // 如果 severity 為 'alarmMajorNum'，則返回字串 'Major'
      return 'Major';
    } else if (severity.toUpperCase() === 'alarmMinorNum') {
      // 如果 severity 為 'alarmMinorNum'，則返回字串 'Minor'
      return 'Minor';
    } else if (severity.toUpperCase() === 'alarmWarningNum') {
      // 如果 severity 為 'alarmWarningNum'，則返回字串 'Warning'
      return 'Warning';
    } else {
      // 如果 severity 不是上述任何一個值，則返回空字串
      return '';
    }
  }


  details(status: number): string {
    return this.statusMapDisplayName.get(status.toString()) as string;
  }

  NFdetails(status: number): string {
    return this.typeMapDisplayName.get(status.toString()) as string;
  }

  /* 第一個字母大寫，其餘小寫 */
  textTransfer(text: string) {
    if (text) {
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    } else {
      return '';
    }
  }

  // @2024/03/22 Add
  // 格式化日期時間至此格式 'YYYYMMDD_HHmm' 
  formatDateForFileName( date: Date ): string {
    
    return date.getFullYear().toString() +
            (date.getMonth() + 1).toString().padStart(2, '0') +
            date.getDate().toString().padStart(2, '0') + '_' +
            date.getHours().toString().padStart(2, '0') +
            date.getMinutes().toString().padStart(2, '0');
  }

  // @2024/03/27 Add
  // 用於處理時間字符串，去掉秒後的小數部分
  formatTimeWithoutSecondsFraction( timeString: string ): string {
    return timeString.split('.')[0]; // 只保留小數點前的部分
  }

 // @2024/03/27 Add
 // 用於處理位置訊息的格式
 formatPosition( positionJson: string ): string {
    try {
      const positionArray = JSON.parse( positionJson );
      return `( ${positionArray[0]}, ${positionArray[1]} )`;
    } catch ( e ) {
      console.error( 'Error parsing position JSON:', e );
      return '';
    }
  }

  // @2024/03/22 Add
  // 用於解碼 Base64 字符串並轉換下載成 .xlsx 文件
  downloadExcelFromBase64( base64String: string, fileName: string ) {
    const link = document.createElement("a");

    if ( link.download !== undefined ) {

      // 支援 HTML5 download 屬性的瀏覽器
      link.setAttribute( "href", 'data:application/vnd.ms-excel;base64,' + base64String );
      link.setAttribute( "download", fileName );
      link.style.visibility = 'hidden';
      document.body.appendChild( link );
      link.click();
      document.body.removeChild( link );

    } else {

      // 不支援 HTML5 download 屬性的舊版瀏覽器時的處理
      console.error( "您的瀏覽器不支援自動下載文件" );
    }
  }


/* API */
//  loginpage(body: {}): Observable<any> {
//    const url = `${this.restPath}/ `;
//    const bodyStr = JSON.stringify(body);
//    return this.http.post(url, bodyStr);
//   }

  queryOcloudList(): Observable<any> {
    const url = `${this.restPath}/queryOcloudList/${this.getSessionId()}`;
    return this.http.get(url);
  }

  createOcloud(body: {}): Observable<any> {
    const url = `${this.restPath}/createOcloud/${this.getSessionId()}`;
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }

  deleteOcloud(id: string): Observable<any> {
    const url = `${this.restPath}/deleteOcloud/${this.getSessionId()}/${id}`;
    return this.http.delete(url);
  }

  queryOcloudInfo(cloudId: string): Observable<any> {
    const url = `${this.restPath}/queryOcloudInfo/${this.getSessionId()}/${cloudId}`;
    return this.http.get(url);
  }

  queryOcloudPerformance(cloudId: string): Observable<any> {
    const url = `${this.restPath}/queryOcloudPerformance/${this.getSessionId()}/${cloudId}`;
    return this.http.get(url);
  }

  querySystemSummary(): Observable<any> {
    const url = `${this.restPath}/querySystemSummary/${this.getSessionId()}`;
    return this.http.get(url);
  }

  applyOcloudSoftware(body: {}): Observable<any> {
    const url = `${this.restPath}/applyOcloudSoftware/${this.getSessionId()}`;
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }

  queryPerformanceList(ocloudId: string, ocloudname: string): Observable<any> {
    const url = `${this.restPath}/queryPerformanceList/${this.getSessionId()}?ocloudId=${ocloudId}&ocloudname=${ocloudname}`;
    return this.http.get(url);
  }

  queryOverviewKpi(cloudId: string): Observable<any> {
    const url = `${this.restPath}/queryOverviewKpi/${this.getSessionId()}/${cloudId}`;
    return this.http.get(url);
  }

  queryFaultMessage(cloudName: string, nfName: string, acknowledgeOwner: string, severity: string, start: string, end: string, offset: number, limit: number): Observable<any> {
    const url = `${this.restPath}/queryFaultMessage/${this.getSessionId()}?ocloudname=${cloudName}&nfname=${nfName}&acknowledgeOwner=${acknowledgeOwner}&start=${start}&end=${end}&severity=${severity}&offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  queryUploadFileList(): Observable<any> {
    const url = `${this.restPath}/queryUploadFileList/${this.getSessionId()}`;
    return this.http.get(url);
  }
  
  // softwareType: 0 = O-Cloud; 1= NF(CU); 2=NF(DU); 3=NF(CU+DU); All
  querySoftwareList(fileName: string, type: string, version: string): Observable<any> {
    const url = `${this.restPath}/querySoftwareList/${this.getSessionId()}?fileName=${fileName}&type=${type}&version=${version}`;
    return this.http.get(url);
  }

  createSoftware(body: any): Observable<any> {
    const url = `${this.restPath}/createSoftware/${this.getSessionId()}`;
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }

  deleteSoftware(id: string): Observable<any> {
    const url = `${this.restPath}/removeUploadFileInfo/${this.getSessionId()}/${id}`;
    return this.http.delete(url);
  }

  queryNfList(cloudId: string, cloudName: string, nfName: string, status: string): Observable<any> {
    const url = `${this.restPath}/queryNfList/${this.getSessionId()}/?cloudId=${cloudId}&ocloudname=${cloudName}&nfname=${nfName}&status=${status}`;
    return this.http.get(url);
  }

  actionNf(nfId: string, status: number): Observable<any> {
    const url = `${this.restPath}/actionNf/${this.getSessionId()}`;
    const bodyStr = JSON.stringify({ nfId: nfId, status: status });
    return this.http.post(url, bodyStr);
  }

  deleteNf(nfId: string, dmsId: string): Observable<any> {
    const url = `${this.restPath}/deleteNf/${this.getSessionId()}/${dmsId}/${nfId}`;
    return this.http.delete(url);
  }

  queryOcloudDmsList(cloudId: string): Observable<any> {
    const url = `${this.restPath}/queryOcloudDmsList/${this.getSessionId()}/${cloudId}`;
    return this.http.get(url);
  }

  createNf(body: any): Observable<any> {
    const url = `${this.restPath}/createNf/${this.getSessionId()}`;
    body['sessionid'] = this.getSessionId();
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }

  queryNfInfo(nfId: string): Observable<any> {
    const url = `${this.restPath}/queryNfInfo/${this.getSessionId()}/${nfId}`;
    return this.http.get(url);
  }

  queryNfPerformance(nfId: string): Observable<any> {
    const url = `${this.restPath}/queryNfPerformance/${this.getSessionId()}/${nfId}`;
    return this.http.get(url);
  }

  queryNfCapacitySummary(nfId: string): Observable<any> {
    const url = `${this.restPath}/queryNfCapacitySummary/${this.getSessionId()}/${nfId}`;
    return this.http.get(url);
  }

  queryNfCapacityList(nfId: string): Observable<any> {
    const url = `${this.restPath}/queryNfCapacityList/${this.getSessionId()}/${nfId}`;
    return this.http.get(url);
  }

  applyNfSoftware(body: any): Observable<any> {
    const url = `${this.restPath}/applyNfSoftware/${this.getSessionId()}`;
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }

  queryDmsAvaliableCapacity(dmsId: string): Observable<any> {
    const url = `${this.restPath}/queryDmsAvaliableCapacity/${this.getSessionId()}/${dmsId}`;
    return this.http.get(url);
  }

  createNfCapacity(body: any): Observable<any> {
    const url = `${this.restPath}/createNfCapacity/${this.getSessionId()}`;
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }

  deleteNfCapacity(dmsId: string, nfCapacityId: string): Observable<any> {
    const url = `${this.restPath}/deleteNfCapacity/${this.getSessionId()}/${dmsId}/${nfCapacityId}`;
    return this.http.delete(url);
  }

  queryNfOverviewKpi(nfId: string): Observable<any> {
    const url = `${this.restPath}/queryNfOverviewKpi/${this.getSessionId()}/${nfId}`;
    return this.http.get(url);
  }

  queryNfPerformanceList(ocloudId: string, ocloudName: string, nfId: string, nfName: string): Observable<any> {
    const url = `${this.restPath}/queryNfPerformanceList/${this.getSessionId()}?ocloudId=${ocloudId}&ocloudname=${ocloudName}&nfId=${nfId}&nfname=${nfName}`;
    return this.http.get(url);
  }

  queryOcPmAdvanceSearch(advancedForm: FormGroup): Observable<any> {
    const ocloudId = advancedForm.controls['globalId'].value;
    const ocloudName = advancedForm.controls['ocloudName'].value;
    const cpu = advancedForm.controls['cpu'].value;
    const memory = advancedForm.controls['memory'].value;
    const disk = advancedForm.controls['disk'].value;
    const network = advancedForm.controls['network'].value;
    const cpulimit = advancedForm.controls['cpulimit'].value;
    const memorylimit = advancedForm.controls['memorylimit'].value;
    const disklimit = advancedForm.controls['disklimit'].value;
    const networklimit = advancedForm.controls['networklimit'].value;
    const url = `${this.restPath}/queryOcPmAdvanceSearch/${this.getSessionId()}/&ocloudId=${ocloudId}&ocloudname=${ocloudName}&cpu=${cpu}&memory=${memory}&disk=${disk}&network=${network}&cpulimit=${cpulimit}&memorylimit=${memorylimit}&disklimit=${disklimit}&networklimit=${networklimit}`;
    return this.http.get(url);
  }

  queryNfPmAdvanceSearch(advancedForm: FormGroup): Observable<any> {
    const ocloudId = advancedForm.controls['globalId'].value;
    const ocloudName = advancedForm.controls['ocloudName'].value;
    const nfId = advancedForm.controls['nfId'].value;
    const nfName = advancedForm.controls['nfName'].value;
    const cpu = advancedForm.controls['cpu'].value;
    const memory = advancedForm.controls['memory'].value;
    const disk = advancedForm.controls['disk'].value;
    const network = advancedForm.controls['network'].value;
    const cpulimit = advancedForm.controls['cpulimit'].value;
    const memorylimit = advancedForm.controls['memorylimit'].value;
    const disklimit = advancedForm.controls['disklimit'].value;
    const networklimit = advancedForm.controls['networklimit'].value;
    const url = `${this.restPath}/queryNfPmAdvanceSearch/${this.getSessionId()}/&ocloudId=${ocloudId}&ocloudname=${ocloudName}}&nfId=${nfId}&nfname=${nfName}&cpu=${cpu}&memory=${memory}&disk=${disk}&network=${network}&cpulimit=${cpulimit}&memorylimit=${memorylimit}&disklimit=${disklimit}&networklimit=${networklimit}`;
    return this.http.get(url);
  }

  queryFMstatus(faultId: string): Observable<any> {
    const url = `${this.restPath}/queryFMstatus/${this.getSessionId()}/${faultId}`;
    return this.http.get(url);
  }

  queryFMstatusrecord(faultId: string): Observable<any> {
    const url = `${this.restPath}/queryFMstatusrecord/${this.getSessionId()}/${faultId}`;
    return this.http.get(url);
  }

  queryFMProcess(faultId: string, processStatus: number, processComment: string, acknowledgeOwner: string): Observable<any> {
    const url = `${this.restPath}/queryFMProcess/${this.getSessionId()}/${faultId}`;
    const bodyStr = JSON.stringify({
      processStatus: processStatus,
      processComment: processComment,
      acknowledgeOwner: acknowledgeOwner
    });
    return this.http.post(url, bodyStr, { observe: 'response' });
  }

  queryFMAdvanceSearch(globalId: string, cloudName: string, nfId: string, nfName: string, acknowledgeOwner: string, severity: string, start: string, end: string, offset: number, limit: number): Observable<any> {
    const url = `${this.restPath}/queryFMAdvanceSearch/${this.getSessionId()}/}?cloudId=${globalId}&cloudName=${cloudName}&nfId=${nfId}&nfname=${nfName}&start=${start}&end=${end}&severity=${severity}&acknowledgeOwner=${acknowledgeOwner}&offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  querySoftwareAdvanceSearch(firm: string, model: string, filename: string, start: string, end: string, offset: number, limit: number): Observable<any> {
    const url = `${this.restPath}/querySWAdvanceSearch/${this.getSessionId()}/}?firm=${firm}&model=${model}&start=${start}&end=${end}&filename=${filename}&offset=${offset}&limit=${limit}`;
    return this.http.get(url);
  }

  // Component Mgmt API
  queryBsComponentList(): Observable<any> {
    const url = `${this.restPath}/queryBsComponentList/${this.getSessionId()}`;
    return this.http.get(url);
  }
  createBsComponent(body: any): Observable<any> {
    const url = `${this.restPath}/createBsComponent/${this.getSessionId()}`;
    const bodyStr = JSON.stringify(body);
    return this.http.post(url, bodyStr);
  }
  queryBsComponentInfo(comId: string): Observable<any> {
    const url = `${this.restPath}/queryBsComponentInfo/${this.getSessionId()}/${comId}`;
    return this.http.get(url);
  }

// Local Files ↓

  ocloudList: OCloudList[] = [
    {
      id: "cloud000-0000-0000-0000-000000000000",
      name: "cloud0",
      imsEndpoint: "http://10.172.61.30:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 1,
      nfCount: 2,
      deployStatus: "Deploy Finished"
    },
    {
      id: "cloud000-0000-0000-0000-000000000001",
      name: "cloud1",
      imsEndpoint: "http://10.172.61.31:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 1,
      nfCount: 0,
      deployStatus: "Deploy MaaS"
    },
    {
      id: "cloud000-0000-0000-0000-000000000002",
      name: "cloud2",
      imsEndpoint: "http://10.172.61.32:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 2,
      nfCount: 0,
      deployStatus: "Register VM on MaaS"
    },
    {
      id: "cloud000-0000-0000-0000-000000000003",
      name: "cloud3",
      imsEndpoint: "http://10.172.61.33:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 1,
      nfCount: 0,
      deployStatus: "Commission VM"
    },
    {
      id: "cloud000-0000-0000-0000-000000000004",
      name: "cloud4",
      imsEndpoint: "http://10.172.61.34:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 2,
      nfCount: 0,
      deployStatus: "Deploy Machines"
    },
    {
      id: "cloud000-0000-0000-0000-000000000005",
      name: "cloud5",
      imsEndpoint: "http://10.172.61.35:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 1,
      nfCount: 0,
      deployStatus: "Set Environment for k8s"
    },
    {
      id: "cloud000-0000-0000-0000-000000000006",
      name: "cloud6",
      imsEndpoint: "http://10.172.61.36:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 2,
      nfCount: 0,
      deployStatus: "Create k8s clusters"
    }
    ,
    {
      id: "cloud000-0000-0000-0000-000000000007",
      name: "cloud7",
      imsEndpoint: "http://10.172.61.37:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 1,
      nfCount: 0,
      deployStatus: "Deploy Node-Agent on each node"
    },
    {
      id: "cloud000-0000-0000-0000-000000000008",
      name: "cloud8",
      imsEndpoint: "http://10.172.61.38:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 2,
      nfCount: 0,
      deployStatus: "Deploy IMS"
    },
    {
      id: "cloud000-0000-0000-0000-000000000009",
      name: "cloud9",
      imsEndpoint: "http://10.172.61.39:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 2,
      nfCount: 0,
      deployStatus: "Running"
    },
    {
      id: "cloud000-0000-0000-0000-000000000009",
      name: "cloud9",
      imsEndpoint: "http://10.172.61.39:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 2,
      nfCount: 0,
      deployStatus: "Running"
    },
    {
      id: "33ebda65-f3aa-457a-9f7b-f587cd0efcc7",
      name: "cloud9",
      imsEndpoint: "http://10.172.61.39:5005/o2ims_infrastructureInventory/v1/",
      dmsCount: 2,
      nfCount: 0,
      deployStatus: "Failed Deployment"
    }

  ];

  ocloudInfo: OcloudInfo = {
    id: "33ebda65-f3aa-457a-9f7b-f587cd0efcc7",
    name: "cloud1",
    imsEndpoint: "http://10.172.61.30:5005/o2ims_infrastructureInventory/v1/",
    callbackUri: "https://10.0.2.16/callback/33ebda65",
    softwareVersion: "1.1.0",
    dms: [
      {
        id: "98cd5e2a-e9d5-3aa5-afdd-2c05d2be8e46",
        name: "k8s-cluster0",
        dmsEndpoint: "http://10.172.61.30:5005/o2dms/v1/98cd5e2a-e9d5-3aa5-afdd-2c05d2be8e46/"
      },
    ],
    nf: [
      {
        id: "47574686-3503-49c4-82ea-1d3312323df5",
        name: "nf1",
        dmsName: "k8s-cluster0",
        status: 0
      },
      {
        id: "47574686-3503-49c4-82ea-1d3312324c86",
        name: "nf2",
        dmsName: "k8s-cluster0",
        status: 1
      },
      {
        id: "47574686-3503-49c4-82ea-1d3312324c86",
        name: "nf2",
        dmsName: "k8s-cluster0",
        status: 2
      },
      {
        id: "47574686-3503-49c4-82ea-1d3312324c86",
        name: "nf2",
        dmsName: "k8s-cluster0",
        status: 3
      }
    ],
    fault: {
      critical: 10,
      major: 10,
      minor: 10,
      warning: 10
    },
    resourcepool: [
      {
        poolId: "pool0000- 0000 - 0000 - 0000 - 000000000000",
        poolName: "pool_0",
        node: [
          {
            nodeId: "n0000001",
            nodeName: "node1",
            cpu: [
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU2",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU2",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              }
            ],
            memory: { name: "memory", size: "40GB" },
            nic: [
              {
                id: "nic0000001",
                name: "NIC1",
                product: "I350 Gigabit Network Connection",
                capacity: "1Gbit/s"
              },
              {
                id: "nic0000002",
                name: "NIC2",
                product: "Ethernet Controller X710 for 10GbE SFP+",
                capacity: "10Gbit/s"
              },
              {
                id: "nic0000001",
                name: "NIC1",
                product: "I350 Gigabit Network Connection",
                capacity: "1Gbit/s"
              },
              {
                id: "nic0000002",
                name: "NIC2",
                product: "Ethernet Controller X710 for 10GbE SFP+",
                capacity: "10Gbit/s"
              }
            ],
            storage: {
              total: "120GB",
              items: [
                {
                  id: "disk001",
                  name: "SanDisk1",
                  size: "80GB"
                },
                {
                  id: "disk002",
                  name: "SanDisk2",
                  size: "40GB"
                },
                {
                  id: "disk001",
                  name: "SanDisk1",
                  size: "80GB"
                },
                {
                  id: "disk002",
                  name: "SanDisk2",
                  size: "40GB"
                }
              ]
            }
          },
          {
            nodeId: "n0000001",
            nodeName: "node1",
            cpu: [
              {
                id: "c0000001",
                name: "CPU3",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU4",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              }
            ],
            memory: { name: "memory", size: "40GB" },
            nic: [
              {
              id: "nic0000001",
              name: "NIC1",
              product: "I350 Gigabit Network Connection",
              capacity: "1Gbit/s"
              },
              {
                id: "nic0000002",
                name: "NIC2",
                product: "Ethernet Controller X710 for 10GbE SFP+",
                capacity: "10Gbit/s"
              }
            ],
            storage: {
              total: "120GB",
              items: [{
                id: "disk001",
                name: "SanDisk1",
                size: "80GB"
              },
              {
                id: "disk002",
                name: "SanDisk2",
                size: "40GB"
              }]
            }
          }, {
            nodeId: "n0000001",
            nodeName: "node1",
            cpu: [
              {
                id: "c0000001",
                name: "CPU5",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU6",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              }
            ],
            memory: { name: "memory", size: "40GB" },
            nic: [{
              id: "nic0000001",
              name: "NIC1",
              product: "I350 Gigabit Network Connection",
              capacity: "1Gbit/s"
            },
            {
              id: "nic0000002",
              name: "NIC2",
              product: "Ethernet Controller X710 for 10GbE SFP+",
              capacity: "10Gbit/s"
            }
            ],
            storage: {
              total: "120GB",
              items: [{
                id: "disk001",
                name: "SanDisk1",
                size: "80GB"
              },
              {
                id: "disk002",
                name: "SanDisk2",
                size: "40GB"
              }]
            }
          }
        ]
      },
      {
        poolId: "pool0000- 0000 - 0000 - 0000 - 000000000000",
        poolName: "pool_1",
        node: [
          {
            nodeId: "n0000001",
            nodeName: "node1",
            cpu: [
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              }
            ],
            memory: { name: "memory", size: "40GB" },
            nic: [{
              id: "nic0000001",
              name: "NIC1",
              product: "I350 Gigabit Network Connection",
              capacity: "1Gbit/s"
            },
            {
              id: "nic0000002",
              name: "NIC2",
              product: "Ethernet Controller X710 for 10GbE SFP+",
              capacity: "10Gbit/s"
            }
            ],
            storage: {
              total: "120GB",
              items: [{
                id: "disk001",
                name: "SanDisk1",
                size: "80GB"
              },
              {
                id: "disk002",
                name: "SanDisk2",
                size: "40GB"
              }]
            }
          },
          {
            nodeId: "n0000001",
            nodeName: "node1",
            cpu: [
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              }
            ],
            memory: { name: "memory", size: "40GB" },
            nic: [{
              id: "nic0000001",
              name: "NIC1",
              product: "I350 Gigabit Network Connection",
              capacity: "1Gbit/s"
            },
            {
              id: "nic0000002",
              name: "NIC2",
              product: "Ethernet Controller X710 for 10GbE SFP+",
              capacity: "10Gbit/s"
            }
            ],
            storage: {
              total: "120GB",
              items: [{
                id: "disk001",
                name: "SanDisk1",
                size: "80GB"
              },
              {
                id: "disk002",
                name: "SanDisk2",
                size: "40GB"
              }]
            }
          },
          {
            nodeId: "n0000001",
            nodeName: "node1",
            cpu: [
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              },
              {
                id: "c0000001",
                name: "CPU1",
                product: "Intel(R) Xeon(R) CPU E5-2630 v4",
                capacity: "2200MHz"
              }
            ],
            memory: { name: "memory", size: "40GB" },
            nic: [{
              id: "nic0000001",
              name: "NIC1",
              product: "I350 Gigabit Network Connection",
              capacity: "1Gbit/s"
            },
            {
              id: "nic0000002",
              name: "NIC2",
              product: "Ethernet Controller X710 for 10GbE SFP+",
              capacity: "10Gbit/s"
            }
            ],
            storage: {
              total: "120GB",
              items: [{
                id: "disk001",
                name: "SanDisk1",
                size: "80GB"
              },
              {
                id: "disk002",
                name: "SanDisk2",
                size: "40GB"
              }]
            }
          }
        ]
      }
    ]
  };

  ocloudPerformance: OcloudPerformance = {
    // totalCpu: 20,
    // usedCpu: 18
    cpu: "17 %",
    memory: "26 GB",
    storage: "56.55 KBps",
    network: "0.123 KBps"
  }

  fmsgList: FmsgList = {
    totalMessageNumber: 12,
    faultMessages: [
      {
        fieldName: "field01",
        bsName: "BS_01",
        compname: "itri_10.0.2.7",        
        timestamp: "2023-02-21 09:28:01",
        count: 2,
        eventtype: "CRITICAL",
        probablecause: "主機錯誤",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        status: "Cleared",
        acknowledgeOwner: "Sam",
        createtime: "2022-02-21 09:28:00",
        updatetime: "2022-02-21 09:28:02",
        eDesc: "No external sync source",
        histories: [
          {
            timestamp: "2022-02-21 09:28:01",
            processStatus: 0,
            processComment: "",
            acknowledgeOwner: "Sam"
          }
        ]
      },
      {
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.5",        
        timestamp: "2023-05-20 10:23:01",
        count: 1,
        eventtype: "MAJOR",
        probablecause: "主機連線失敗",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-05-20 10:23:00",
        updatetime: "2023-05-20 10:23:02",
        eDesc: "Configuration file corrupted conflicting",
        histories: [
          {
            timestamp: "2023-05-20 10:23:01",
            processStatus: 1,
            processComment: "By sswu",
            acknowledgeOwner: "Sam"
          }
        ]
      },
      {
        fieldName: "field02",
        bsName: "BS_05",
        compname: "itri_10.0.2.15",        
        timestamp: "2023-07-23 08:23:01",
        count: 1,
        eventtype: "MINOR",
        probablecause: "無法連線到儲存空間",
        isCleared: true,
        processstatus: 1,
        processresult: "IO Changed",
        status: "Cleared",
        acknowledgeOwner: "Charles",
        createtime: "2023-07-23 08:23:00",
        updatetime: "2023-07-23 08:23:02",
        eDesc: "Ambient temperature violation",
        histories: [
          {
            timestamp: "2023-07-23 08:23:01",
            processStatus: 1,
            processComment: "IO Changed",
            acknowledgeOwner: "Charles"
          }
        ]
      },
      {
        fieldName: "field01",
        bsName: "BS_01",
        compname: "itri_10.0.2.7",        
        timestamp: "2023-11-23 15:12:10",
        count: 3,
        eventtype: "WARNING",
        probablecause: "結束待命錯誤",
        isCleared: true,
        processstatus: 0,
        processresult: "",
        status: "Cleared",
        acknowledgeOwner: "Kevin",
        createtime: "2020-11-23 15:12:00",
        updatetime: "2020-11-23 15:12:20",
        eDesc: "WARNING Fault Message",
        histories: [
          {
            timestamp: "2020-11-23 15:12:10",
            processStatus: 0,
            processComment: "",
            acknowledgeOwner: "Kevin"
          }
        ]
      },
      {
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.7",        
        timestamp: "2023-05-21 18:12:10",
        count: 3,
        eventtype: "CRITICAL",
        probablecause: "授權錯誤",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        status: "Cleared",
        acknowledgeOwner: "Kevin",
        createtime: "2021-05-21 18:12:00",
        updatetime: "2021-05-21 18:12:20",
        eDesc: "No external sync source",
        histories: [
          {
            timestamp: "2021-05-21 18:12:10",
            processStatus: 0,
            processComment: "",
            acknowledgeOwner: "Kevin"
          }
        ]
      },
      {
        fieldName: "field02",
        bsName: "BS_04",
        compname: "itri_10.0.2.5",        
        timestamp: "2023-08-11 18:15:01",
        count: 1,
        eventtype: "MAJOR",
        probablecause: "主機 CPU 使用量",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11 18:15:00",
        updatetime: "2023-08-11 18:15:02",
        eDesc: "Configuration file corrupted conflicting",
        histories: [
          {
            timestamp: "2023-08-11 18:15:01",
            processStatus: 1,
            processComment: "By sswu",
            acknowledgeOwner: "Sam"
          }
        ]
      },
      {
        fieldName: "field02",
        bsName: "BS_03",
        compname: "itri_10.0.2.8",        
        timestamp: "2023-08-11 17:22:01",
        count: 2,
        eventtype: "MINOR",
        probablecause: "網路連線中斷",
        isCleared: true,
        processstatus: 1,
        processresult: "IO Changed",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11 17:22:00",
        updatetime: "2023-08-11 17:22:02",
        eDesc: "Ambient temperature violation",
        histories: [
          {
            timestamp: "2023-08-11 17:22:01",
            processStatus: 1,
            processComment: "IO Changed",
            acknowledgeOwner: "Sam"
          }
        ]
      },
      {
        fieldName: "field03",
        bsName: "BS_09",
        compname: "itri_10.0.2.4",        
        timestamp: "2023-08-17 18:23:01",
        count: 2,
        eventtype: "WARNING",
        probablecause: "網路上行冗餘遺失",
        isCleared: true,
        processstatus: 0,
        processresult: "",
        status: "Cleared",
        acknowledgeOwner: "Kevin",
        createtime: "2023-08-17 18:23:00",
        updatetime: "2023-08-17 18:23:02",
        eDesc: "WARNING Fault Message",
        histories: [
          {
            timestamp: "2023-08-17 18:23:01",
            processStatus: 0,
            processComment: "",
            acknowledgeOwner: "Kevin"
          }
        ]
      },
      {
        fieldName: "field03",
        bsName: "BS_07",
        compname: "itri_10.0.2.6",        
        timestamp: "2023-11-15 20:48:01",
        count: 3,
        eventtype: "CRITICAL",
        probablecause: "網路上行冗餘已降級",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        status: "Cleared",
        acknowledgeOwner: "Charles",
        createtime: "2020-11-15 20:48:00",
        updatetime: "2020-11-15 20:48:02",
        eDesc: "No external sync source",
        histories: [
          {
            timestamp: "2020-11-15 20:48:01",
            processStatus: 0,
            processComment: "",
            acknowledgeOwner: "Charles"
          }
        ]
      },
      {
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.2",        
        timestamp: "2023-05-17 13:27:01",
        count: 1,
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11 18:15:00",
        updatetime: "2023-08-11 18:15:02",
        eDesc: "Configuration file corrupted conflicting",
        histories: [
          {
            timestamp: "2023-05-17 13:27:01",
            processStatus: 1,
            processComment: "By sswu",
            acknowledgeOwner: "Sam"
          }
        ]
      },
      {
        fieldName: "field02",
        bsName: "BS_05",
        compname: "itri_10.0.3.6",        
        timestamp: "2023-06-14 18:08:10",
        count: 1,
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        status: "New",
        acknowledgeOwner: "Charles",
        createtime: "2023-06-14 18:08:00",
        updatetime: "2023-06-14 18:08:20",
        eDesc: "Configuration file corrupted conflicting",
        histories: [
          {
            timestamp: "2023-06-14 18:08:10",
            processStatus: 1,
            processComment: "By sswu",
            acknowledgeOwner: "Charles"
          }
        ]
      },
      {
        fieldName: "field03",
        bsName: "BS_08",
        compname: "itri_10.0.2.8",        
        timestamp: "2023-03-19 09:16:21",
        count: 3,
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        status: "New",
        acknowledgeOwner: "Kevin",
        createtime: "2023-03-19 09:16:20",
        updatetime: "2023-03-19 09:16:22",
        eDesc: "Configuration file corrupted conflicting",
        histories: [
          {
            timestamp: "2022-02-21 09:28:01",
            processStatus: 1,
            processComment: "By sswu",
            acknowledgeOwner: "Kevin"
          }
        ]
      }
    ]
  };

  performanceList: PerformanceList[] = [
    {
      id: "12345678-ABCD-1000-A000-00000001",
      name: "cloud1",
      cpuLoading: "65 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000002",
      name: "cloud2",
      cpuLoading: "65 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000003",
      name: "cloud3",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000004",
      name: "cloud4",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000005",
      name: "cloud5",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000006",
      name: "cloud6",
      cpuLoading: "65 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000007",
      name: "cloud7",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000008",
      name: "cloud8",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000009",
      name: "cloud9",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-000000010",
      name: "cloud10",
      cpuLoading: "65 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-000000011",
      name: "cloud11",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-000000012",
      name: "cloud12",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-000000013",
      name: "cloud13",
      cpuLoading: "35 %",
      memoryUsage: "2410923KB",
      diskUsage: "15000MB",
      networkThroughput: "640235KBps"
    }
  ];
  ocPmAdvanceSearchList: PerformanceList[] = [
    {
      id: "12345678-ABCD-1000-A000-00000001",
      name: "cloud1",
      cpuLoading: "65%",
      memoryUsage: "2410923KB",
      diskUsage: "150000MB",
      networkThroughput: "640235KBps"
    },
    {
      id: "12345678-ABCD-1000-A000-00000002",
      name: "cloud2",
      cpuLoading: "35%",
      memoryUsage: "1720402KB",
      diskUsage: "150000MB",
      networkThroughput: "242012KBps"
    }
  ];

  softwareLists: SoftwareLists=
    {
      uploadinfos: [
        {
          id: '5c4ecc47c4da49b9ae36',
          firm: 'ITRI',
          modelname: 'A001',
          uploadtime: '2023-06-12 09:25:03',
          uploadtype: 1,
          uploadversion: '1.0.0',
          description: 'CU',
          uploadinfo: 'ITRI_1.0.0.img',
          uploadurl: 'sftp://140.96.102.47:22/home/k200/irm-itri-6565/irm-itri/server/uploadFolder/ftpFolder/ITRI_1.0.0.img',
        },
        {
          id: '12345cc47c4da49b9ae36',
          firm: 'ITRI2',
          modelname: 'A002',
          uploadtime: '2023-06-12 09:25:03',
          uploadtype: 2,
          uploadversion: '1.0.0',
          description: 'DU',
          uploadinfo: 'ITRI_2.0.0.img',
          uploadurl: 'sftp://140.96.102.47:22/home/k200/irm-itri-6565/irm-itri/server/uploadFolder/ftpFolder/ITRI_1.0.0.img',
        },
        {
          id: '12345cc47c4da49b9ae36',
          firm: 'ITRI3',
          modelname: 'A003',
          uploadtime: '2023-06-12 09:25:03',
          uploadtype: 3,
          uploadversion: '1.0.0',
          description: 'CU',
          uploadinfo: 'ITRI_3.0.0.img',
          uploadurl: 'sftp://140.96.102.47:22/home/k200/irm-itri-6565/irm-itri/server/uploadFolder/ftpFolder/ITRI_1.0.0.img',
        },
        {
          id: '12345cc47c4da49b9ae36',
          firm: 'ITRI4',
          modelname: 'A004',
          uploadtime: '2023-06-12 09:25:03',
          uploadtype: 0,
          uploadversion: '1.0.0',
          description: 'DU',
          uploadinfo: 'ITRI_4.0.0.img',
          uploadurl: 'sftp://140.96.102.47:22/home/k200/irm-itri-6565/irm-itri/server/uploadFolder/ftpFolder/ITRI_1.0.0.img',
        }
      ]
    };


    accountLists: AccountLists=
    {
      users: [
        {
          id: 'k200',
          role: '1',
        },
        {
          id: 'k300',
          role: '1',
        },
        {
          id: 'k100',
          role: '1',
        },
        {
          id: 'k200',
          role: '2',
        }
      ]
    };

    accountInfo: AccountInfo=
    {
      id: 'k200',
      key: 'abcd1234',
      role: '2',
      expiretime: '2023-06-02 20:12:37'
    };


  softwareList: SoftwareList[] = [
    {
      id: "s0011001",
      firm: "ITRI",
      model: "Os_image_2.tar",
      type: 0,
      version: "1.0.0",
      notes: "Os_image_2.tar",
      uploadTime: "2023-07-01 20:01:30",
      fileName: "fw-v1-0-0.zip"
    },
    {
      id: "s0011002",
      firm: "Compal",
      model: "Os_image_2.tar",
      type: 1,
      version: "1.0.0",
      notes: "Os_image_2.tar",
      uploadTime: "2023-07-01 20:01:30",
      fileName: "fw-v1-0-0.zip"
    }
  ];

  softwareInfo: SoftwareInfo = {
      id:"5c4ecc47c4da49b9ae36",
      firm:"ITRI",
      modelname:"A001",
      uploadtime:"2023-06-12 09:25:03",
      uploadtype:2,
      uploadversion:"1.0.0",
      description:"test",
      uploadinfo:"ITRI_1.0.0.img",
      uploadurl:"sftp://140.96.102.47:22/home/k200/irm-itri-6565/irm-itri/server/uploadFolder/ftpFolder/ITRI_1.0.0.img",
      ftpid:"k200",
      ftpkey:"k200123",
      checksum:"6c4d426bcdb914708c9e7b8019116ddf",
      size:10485760
    };
    //Component
    componentList: ComponentList =
    {
      components: [
      {
        "id": "0f03212c522b4c86abda",
        "bsId": "8e427f7c5ff34326a380",
        "bsName": "itri_10.0.2.10",
        "name": "BSCOM0",
        "ip": "10.0.2.10",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 1
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.11",
        "name": "BSCOM1",
        "ip": "10.0.2.11",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.12",
        "name": "BSCOM2",
        "ip": "10.0.2.12",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.13",
        "name": "BSCOM3",
        "ip": "10.0.2.13",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.14",
        "name": "BSCOM4",
        "ip": "10.0.2.14",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.15",
        "name": "BSCOM5",
        "ip": "10.0.2.15",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.16",
        "name": "BSCOM6",
        "ip": "10.0.2.16",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.16",
        "name": "BSCOM7",
        "ip": "10.0.2.17",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.18",
        "name": "BSCOM8",
        "ip": "10.0.2.18",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.19",
        "name": "BSCOM9",
        "ip": "10.0.2.19",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      },
      {
        "id": "28a6c246a4ca425aa8dc",
        "bsId": "1830b1015796405fb12e",
        "bsName": "itri_10.0.2.20",
        "name": "BSCOM10",
        "ip": "10.0.2.20",
        "port": "830",
        "account": "k200",
        "key": "k200123",
        "comtype": 5,
        "firm": "ITRI",
        "modelname": "v2.0",
        "status": 0
      }
    ]};

    bsComponentInfo: BsComponentInfo = {
      id: "c534ac5c21b7480bae3e", 
      name: "itri_10.0.2.7", 
      ip: "10.0.2.7", 
      port: "830", 
      account: "k200", 
      key: "k200123", 
      comtype: 1, 
      firm: "ITRI", 
      modelname: "A001", 
      status: 0,
      info: {
        data: `	<netconf-server xmlns="urn:ietf:params:xml:ns:yang:ietf-netconf-server">
        <listen>
          <endpoint>
            <name>default-ssh</name>
            <ssh>
              <tcp-server-parameters>
                <local-address>0.0.0.0</local-address>
                <local-port>11830</local-port>
                <keepalives>
                  <idle-time>1</idle-time>
                  <max-probes>10</max-probes>
                  <probe-interval>5</probe-interval>
                </keepalives>
              </tcp-server-parameters>
              <ssh-server-parameters>
                <server-identity>
                  <host-key>
                    <name>default-key</name>
                    <public-key>
                      <keystore-reference>genkey</keystore-reference>
                    </public-key>
                  </host-key>
                </server-identity>
                <client-authentication>
                  <supported-authentication-methods>
                    <publickey/>
                    <passsword/>
                    <other>interactive</other>
                  </supported-authentication-methods>
                  <users/>
                </client-authentication>
              </ssh-server-parameters>
            </ssh>
          </endpoint>
        </listen>
      </netconf-server>
      <keystore xmlns="urn:ietf:params:xml:ns:yang:ietf-keystore">
        <asymmetric-keys>
          <asymmetric-key>
            <name>genkey</name>
            <algorithm>rsa2048</algorithm>
            <public-key>MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuC0geCmiQYrqdP5dzTPn
    /3nMzQJlGSqiGysPOgq9Tm8T+oHO+kuZmXHbNZI8/EB8WyIbsVlnOUIkBJItf3I0
    c74uBU75mILh9CZahIJ0dsAbrGGEYWpuODJP3/i3oERcWBmrfb9mT/8FLW8/TSXv
    Yncg2TcOc6XVgfbYVHNacwAccshEcWvEVpxT8hG/8yYUyZFZMW18063ijv3mgkWR
    </public-key>
            <private-key>MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC4LSB4KaJBiup0
    /l3NM+f/eczNAmUZKqIbKw86Cr1ObxP6gc76S5mZcds1kjz8QHxbIhuxWWc5QiQE
    ki1/cjRzvi4FTvmYguH0JlqEgnR2wBusYYRham44Mk/f+LegRFxYGat9v2ZP/wUt
    bz9NJe9idyDZNw5zpdWB9thUc1pzABxyyERxa8RWnFPyEb/zJhTJkVkxbXzTreKO
    /eaCRZFsop2TgSXGm5G7DhpZmq3imCYjgNJ1hRZeI40+ayRkzOhE0rz7zer2N8dv
    ESvK55Aoq/2TnABe0rCV8v7IpdIFyOa2/VGaezZZ+QVbGMTSPuPQnXY2QmxV2Jd3
    </private-key>
          </asymmetric-key>
        </asymmetric-keys>
      </keystore>
      <nacm xmlns="urn:ietf:params:xml:ns:yang:ietf-netconf-acm">
        <enable-nacm>false</enable-nacm>
      </nacm>
      <interfaces xmlns="urn:ietf:params:xml:ns:yang:ietf-interfaces">
        <interface>
          <name>eth0</name>
          <description>1st RJ-45 ethernet interface</description>
          <type xmlns:ianaift="urn:ietf:params:xml:ns:yang:iana-if-type">ianaift:ethernetCsmacd</type>
          <mac-address xmlns="urn:o-ran:interfaces:1.0">1c:39:ef:d2:20:aa</mac-address>
          <port-reference xmlns="urn:o-ran:interfaces:1.0">
            <port-number>1</port-number>
          </port-reference>
          <l2-mtu xmlns="urn:o-ran:interfaces:1.0">1350</l2-mtu>
          <vlan-tagging xmlns="urn:o-ran:interfaces:1.0">true</vlan-tagging>
        </interface>
        <interface>
          <name>vlan0</name>
          <type xmlns:ianaift="urn:ietf:params:xml:ns:yang:iana-if-type">ianaift:l2vlan</type>
          <base-interface xmlns="urn:o-ran:interfaces:1.0">eth0</base-interface>
          <vlan-id xmlns="urn:o-ran:interfaces:1.0">1002</vlan-id>
          <mac-address xmlns="urn:o-ran:interfaces:1.0">66:10:2b:33:1c:b8</mac-address>
        </interface>
      </interfaces>
      <processing-elements xmlns="urn:o-ran:processing-element:1.0">
        <transport-session-type>ETH-INTERFACE</transport-session-type>
        <ru-elements>
          <name>ru-eth-1</name>
          <transport-flow>
            <interface-name>vlan0</interface-name>
            <eth-flow>
              <ru-mac-address>66:10:2b:33:1c:b8</ru-mac-address>
              <vlan-id>1002</vlan-id>
              <o-du-mac-address>e8:40:f2:f8:62:88</o-du-mac-address>
            </eth-flow>
          </transport-flow>
        </ru-elements>
      </processing-elements>
      <SMO xmlns="urn:rdns:com:itri:nr-smo:1.0">
        <ftpip>192.168.122.177</ftpip>
        <ftpid>k200</ftpid>
        <ftpkey>k200123</ftpkey>
        <ftppath>/home/k200/irm-itri/server/uploadFolder/ftpFolder/1ebfdbd887034b439104</ftppath>
        <file-upload-interval>900</file-upload-interval>
      </SMO>
      <ME xmlns="urn:3gpp:tsg:sa5:nrm:ngran">
        <objectClass>ME</objectClass>
        <objectInstance>0</objectInstance>
        <id>0</id>
        <userDefinedState>DRAFT</userDefinedState>
        <dnPrefix>gnb</dnPrefix>
        <userLabel>ME</userLabel>
        <locationName>BLR</locationName>
        <MeasurementControl>
          <id>0</id>
          <pMAdministrativeState>Unlocked</pMAdministrativeState>
          <defaultFileLocation>/opt/pm_log/</defaultFileLocation>
          <defaultFileBasedGP>300</defaultFileBasedGP>
          <defaultFileReportingPeriod>5</defaultFileReportingPeriod>
        </MeasurementControl>
        <FMControl>
          <id>0</id>
          <administrativeState>Unlocked</administrativeState>
        </FMControl>
        <GNBCUFunction>
          <id>0</id>
          <gNBCUName>cu1</gNBCUName>
          <gNBId>9</gNBId>
          <gNBIdLength>22</gNBIdLength>
          <objectClass>RNCFunction</objectClass>
          <objectInstance>0</objectInstance>
          <userLabel>GNBCUFunction</userLabel>
          <vnfParametersList>
            <vnfInstanceId>1</vnfInstanceId>
            <vnfdId>1</vnfdId>
            <flavourId>1</flavourId>
            <autoScalable>true</autoScalable>
          </vnfParametersList>
          <peeParametersList>
            <siteIdentification>bbb</siteIdentification>
            <siteLatitude>10.0001</siteLatitude>
            <siteLongitude>10.0001</siteLongitude>
            <siteDescription>aaa</siteDescription>
            <equipmentType>RRU</equipmentType>
            <environmentType>Indoor</environmentType>
            <powerInterface>AC</powerInterface>
          </peeParametersList>
          <vsDataContainer>
            <id>0</id>
            <objectClass>vsDataContainer</objectClass>
            <objectInstance>0</objectInstance>
            <vsDataType>2019-12-31</vsDataType>
            <vsDataFormatVersion>gnb_sctp_vs_config.yang</vsDataFormatVersion>
            <vsData>
           &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
             &lt;gnbCuConfig&gt;
             &lt;id&gt;0&lt;/id&gt;
                   &lt;numOutboundStreams&gt;2&lt;/numOutboundStreams&gt;
                   &lt;maxInboundStreams&gt;2&lt;/maxInboundStreams&gt;
                   &lt;maxInitAttempts&gt;5&lt;/maxInitAttempts&gt;
                   &lt;heartBeatIntervalInMs&gt;5000&lt;/heartBeatIntervalInMs&gt;
                   &lt;maxPathRetx&gt;1&lt;/maxPathRetx&gt;
             &lt;/gnbCuConfig&gt;
           &lt;/gnbvs&gt;
            </vsData>
          </vsDataContainer>
          <vsDataContainer>
            <id>1</id>
            <objectClass>vsDataContainer</objectClass>
            <objectInstance>1</objectInstance>
            <vsDataType>2019-12-31</vsDataType>
            <vsDataFormatVersion>gnb_log_vs_config.yang</vsDataFormatVersion>
            <vsData>
           &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
             &lt;gnbCuConfig&gt;
             &lt;id&gt;0&lt;/id&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;APP&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;COMMON&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;OAM_AGENT&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;GNB_MGR&lt;/moduleId&gt;
            &lt;logLevel&gt;TRC&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;CU_UP_MGR&lt;/moduleId&gt;
            &lt;logLevel&gt;TRC&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;RM&lt;/moduleId&gt;
            &lt;logLevel&gt;TRC&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;UE_CONN_MGR&lt;/moduleId&gt;
            &lt;logLevel&gt;TRC&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;BEARER_MGR&lt;/moduleId&gt;
            &lt;logLevel&gt;TRC&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;CODEC_COMMON&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;X2AP_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;F1AP_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;RRC_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;NGAP_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;XNAP_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;E1AP_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SCTP_COMMON&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SCTP_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SCTP_TX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SCTP_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_COMMON&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_UPPER_TX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_UPPER_RX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_UPPER_TX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_UPPER_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_LOWER_TX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_LOWER_RX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_LOWER_TX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_LOWER_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_COMMON&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_TX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_RX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_TX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_C_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_C_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PDCP_C_TX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;UDP_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;UDP_TX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;UDP_DL_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;UDP_UL_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;NRUP_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SDAP_COMMON&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SDAP_TX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SDAP_RX_CNTRL&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SDAP_TX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SDAP_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;SDAP_CODEC&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;TIMER&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;EGTPU_TIMER&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;CRYPTO_RX&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;PM&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
          &lt;cuLog&gt;
            &lt;moduleId&gt;FM&lt;/moduleId&gt;
            &lt;logLevel&gt;ERR&lt;/logLevel&gt;
          &lt;/cuLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;MEM&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;BUF&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;STATS&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;TIMER&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;STHREAD&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;CTHREAD&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;SYS&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;EXCP&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;COMM&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;SCTP&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;UDP&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;TCP&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;MSGQ&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;PRIOQ&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;WORKQ&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;ngpLog&gt;
                     &lt;moduleId&gt;PERF&lt;/moduleId&gt;
                     &lt;logLevel&gt;ERR&lt;/logLevel&gt;
                   &lt;/ngpLog&gt;
                   &lt;logFileName&gt;cu&lt;/logFileName&gt;
                   &lt;maxLogFileSize&gt;10000000&lt;/maxLogFileSize&gt;
                   &lt;maxLogFileCount&gt;5&lt;/maxLogFileCount&gt;
                   &lt;rrcWiresharkDisector&gt;
                   &lt;enableRrcWiresharkDisector&gt;true&lt;/enableRrcWiresharkDisector&gt;
                   &lt;localAddress&gt;192.168.120.42&lt;/localAddress&gt;
                   &lt;remoteAddress&gt;192.168.120.12&lt;/remoteAddress&gt;
                   &lt;remotePort&gt;9999&lt;/remotePort&gt;
                   &lt;/rrcWiresharkDisector&gt;
             &lt;/gnbCuConfig&gt;
           &lt;/gnbvs&gt;
            </vsData>
          </vsDataContainer>
          <vsDataContainer>
            <id>2</id>
            <objectClass>vsDataContainer</objectClass>
            <objectInstance>2</objectInstance>
            <vsDataType>2019-12-31</vsDataType>
            <vsDataFormatVersion>gnb_cu_vs_config.yang</vsDataFormatVersion>
            <vsData>
          &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
          &lt;gnbCuConfig&gt;
               &lt;id&gt;0&lt;/id&gt;
                   &lt;maxNumUe&gt;64&lt;/maxNumUe&gt;
                   &lt;caEnabled&gt;true&lt;/caEnabled&gt;
                   &lt;maxCellsInAggregate&gt;5&lt;/maxCellsInAggregate&gt;
                   &lt;dlDataSplitThresholdInBytes&gt;b100&lt;/dlDataSplitThresholdInBytes&gt;
                   &lt;dlDataSplitPrimaryPath&gt;PRIMARY_CELL_GROUP&lt;/dlDataSplitPrimaryPath&gt;
                   &lt;sliceManagerIpAddress&gt;172.27.36.101&lt;/sliceManagerIpAddress&gt;
                   &lt;sliceManagerPort&gt;4343&lt;/sliceManagerPort&gt;
                   &lt;tacSpecificConfig&gt;
                     &lt;tac&gt;0001&lt;/tac&gt;
                     &lt;plmnSpecificConfig&gt;
                       &lt;id&gt;0&lt;/id&gt;
                       &lt;MCC&gt;466&lt;/MCC&gt;
                       &lt;MNC&gt;66&lt;/MNC&gt;
                       &lt;sNSSAI&gt;16975369&lt;/sNSSAI&gt;
                     &lt;/plmnSpecificConfig&gt;
                   &lt;/tacSpecificConfig&gt;
          &lt;/gnbCuConfig&gt;
          &lt;/gnbvs&gt;
            </vsData>
          </vsDataContainer>
          <vsDataContainer>
            <id>3</id>
            <objectClass>vsDataContainer</objectClass>
            <objectInstance>3</objectInstance>
            <vsDataType>2019-12-31</vsDataType>
            <vsDataFormatVersion>gnb_egtp_vs_config.yang</vsDataFormatVersion>
            <vsData>
               &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
                  &lt;gnbCuConfig&gt;
                  &lt;id&gt;0&lt;/id&gt;
          &lt;sendUdpPortExtWithErrorInd&gt;true&lt;/sendUdpPortExtWithErrorInd&gt;
          &lt;endMarkerTimerInMs&gt;2000&lt;/endMarkerTimerInMs&gt;
          &lt;pathMgmtConfig&gt;
             &lt;echoT3ResponseInSec&gt;1&lt;/echoT3ResponseInSec&gt;
             &lt;echoN3Requests&gt;1&lt;/echoN3Requests&gt;
             &lt;echoIntervalInSec&gt;60&lt;/echoIntervalInSec&gt;
          &lt;/pathMgmtConfig&gt;
                  &lt;/gnbCuConfig&gt;
               &lt;/gnbvs&gt;
            </vsData>
          </vsDataContainer>
          <pLMNId>
            <MCC>466</MCC>
            <MNC>66</MNC>
          </pLMNId>
          <gNB-type>SA</gNB-type>
          <EP-NgC>
            <id>0</id>
            <objectClass>EP-NgC</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP-NgC</userLabel>
            <farEndEntity>1</farEndEntity>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_ngc_vs_config.yang</vsDataFormatVersion>
              <vsData>
          &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
            &lt;gnbCuConfig&gt;
             &lt;id&gt;0&lt;/id&gt;
                 &lt;gnbNgcVsConfig&gt;
                    &lt;id&gt;5&lt;/id&gt;
                    &lt;AMF-Region-id&gt;01111111&lt;/AMF-Region-id&gt;
                    &lt;AMF-Set-id&gt;0111111101&lt;/AMF-Set-id&gt;
                    &lt;AMF-Pointer&gt;011111&lt;/AMF-Pointer&gt;
                    &lt;ngcMsgRetryIntervalInSec&gt;1&lt;/ngcMsgRetryIntervalInSec&gt;
                    &lt;ngcMsgMaxRetryCount&gt;1&lt;/ngcMsgMaxRetryCount&gt;
                    &lt;pagingDrxRf&gt;rf32&lt;/pagingDrxRf&gt;
                 &lt;/gnbNgcVsConfig&gt;
            &lt;/gnbCuConfig&gt;
          &lt;/gnbvs&gt;
              </vsData>
            </vsDataContainer>
            <localAddress>
              <ip_addr>1.1.1.5</ip_addr>
              <vlan_id>1</vlan_id>
            </localAddress>
            <remoteAddress>1.1.2.5</remoteAddress>
          </EP-NgC>
          <EP_NgU>
            <id>0</id>
            <objectClass>EP_NgU</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP_NgU</userLabel>
            <farEndEntity>1</farEndEntity>
            <localAddress>
              <ip_addr>1.1.1.6</ip_addr>
              <vlan_id>1</vlan_id>
            </localAddress>
            <remoteAddress>1.1.2.6</remoteAddress>
          </EP_NgU>
          <EP-XnC>
            <id>0</id>
            <objectClass>EP-XnC</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP-XnC</userLabel>
            <farEndEntity>1</farEndEntity>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_xnc_vs_config.yang</vsDataFormatVersion>
              <vsData>
          &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
            &lt;gnbCuConfig&gt;
             &lt;id&gt;0&lt;/id&gt;
                 &lt;gnbXncVsConfig&gt;
                   &lt;id&gt;0&lt;/id&gt;
                   &lt;xncSctpAssocType&gt;SERVER&lt;/xncSctpAssocType&gt;
                   &lt;xncTimeToWaitInSec&gt;5&lt;/xncTimeToWaitInSec&gt;
                   &lt;nrNeighbourCellId&gt;
                     &lt;id&gt;0&lt;/id&gt;
                     &lt;MCC&gt;466&lt;/MCC&gt;
                     &lt;MNC&gt;66&lt;/MNC&gt;
                     &lt;gNBId&gt;3&lt;/gNBId&gt;
                     &lt;nrCellId&gt;4&lt;/nrCellId&gt;
                   &lt;/nrNeighbourCellId&gt;
                 &lt;/gnbXncVsConfig&gt;
            &lt;/gnbCuConfig&gt;
          &lt;/gnbvs&gt;
              </vsData>
            </vsDataContainer>
            <localAddress>
              <ip_addr>192.168.120.42</ip_addr>
              <vlan_id>1</vlan_id>
            </localAddress>
            <remoteAddress>192.168.120.100</remoteAddress>
          </EP-XnC>
          <EP_XnU>
            <id>0</id>
            <objectClass>EP_XnU</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP_XnU</userLabel>
            <farEndEntity>1</farEndEntity>
            <localAddress>
              <ip_addr>5.5.5.42</ip_addr>
              <vlan_id>1</vlan_id>
            </localAddress>
            <remoteAddress>5.5.5.100</remoteAddress>
          </EP_XnU>
          <X2C-EP>
            <objectClass>X2C-EP</objectClass>
            <objectInstance>0</objectInstance>
            <id>0</id>
            <userLabel>X2C-EP</userLabel>
            <farEndEntity>1</farEndEntity>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_x2c_vs_config.yang</vsDataFormatVersion>
              <vsData>
          &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
              &lt;gnbCuConfig&gt;
              &lt;id&gt;0&lt;/id&gt;
                   &lt;x2cSctpAssocType&gt;SERVER&lt;/x2cSctpAssocType&gt;
                   &lt;x2cTimeToWaitInSec&gt;5&lt;/x2cTimeToWaitInSec&gt;
                   &lt;neighbourCellId&gt;
                     &lt;id&gt;1&lt;/id&gt;
                     &lt;MCC&gt;466&lt;/MCC&gt;
                     &lt;MNC&gt;66&lt;/MNC&gt;
                     &lt;eNBIdType&gt;HOME_ENB_ID&lt;/eNBIdType&gt;
                     &lt;eNBID&gt;1&lt;/eNBID&gt;
                     &lt;eutraCellIdentifier&gt;2&lt;/eutraCellIdentifier&gt;
                   &lt;/neighbourCellId&gt;
              &lt;/gnbCuConfig&gt;
           &lt;/gnbvs&gt;
              </vsData>
            </vsDataContainer>
            <localAddress>
              <ip_addr>172.27.26.20</ip_addr>
              <vlan_id>1</vlan_id>
            </localAddress>
            <remoteAddress>1.1.1.1</remoteAddress>
          </X2C-EP>
          <EP_F1C>
            <id>0</id>
            <objectClass>EP_F1C</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP_F1C</userLabel>
            <farEndEntity>1</farEndEntity>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_f1c_vs_config.yang</vsDataFormatVersion>
              <vsData>
          &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
            &lt;gnbCuConfig&gt;
             &lt;id&gt;0&lt;/id&gt;
                 &lt;gnbF1cVsConfig&gt;
                    &lt;id&gt;0&lt;/id&gt;
                    &lt;duId&gt;1&lt;/duId&gt;
                    &lt;f1cTimeToWaitInSec&gt;5&lt;/f1cTimeToWaitInSec&gt;
                 &lt;/gnbF1cVsConfig&gt;
            &lt;/gnbCuConfig&gt;
           &lt;/gnbvs&gt;
              </vsData>
            </vsDataContainer>
            <localAddress>
              <ip_addr>1.1.1.1</ip_addr>
              <vlan_id>1</vlan_id>
            </localAddress>
            <remoteAddress>1.1.2.1</remoteAddress>
          </EP_F1C>
          <EP_F1U>
            <id>0</id>
            <objectClass>EP_F1U</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP_F1U</userLabel>
            <farEndEntity>1</farEndEntity>
            <localAddress>
              <ip_addr>1.1.1.3</ip_addr>
              <vlan_id>1</vlan_id>
            </localAddress>
            <remoteAddress>1.1.2.3</remoteAddress>
          </EP_F1U>
          <NRCellCU>
            <id>0</id>
            <objectClass>RNCFunction</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>NRCellCU</userLabel>
            <vnfParametersList>
              <vnfInstanceId>1</vnfInstanceId>
              <vnfdId>1</vnfdId>
              <flavourId>1</flavourId>
              <autoScalable>true</autoScalable>
            </vnfParametersList>
            <peeParametersList>
              <siteIdentification>bbb</siteIdentification>
              <siteLatitude>10.0101</siteLatitude>
              <siteLongitude>10.0101</siteLongitude>
              <siteDescription>aaa</siteDescription>
              <equipmentType>RRU</equipmentType>
              <environmentType>Indoor</environmentType>
              <powerInterface>AC</powerInterface>
            </peeParametersList>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_cell_cu_vs_config.yang</vsDataFormatVersion>
              <vsData>
    &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
    &lt;gnbCuConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;gnbCellCuVsConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;duId&gt;1&lt;/duId&gt;
    &lt;nRpCI&gt;1&lt;/nRpCI&gt;
    &lt;ueInactivityTimerSec&gt;day30&lt;/ueInactivityTimerSec&gt;
    &lt;eutraConfig&gt;
    &lt;eutraNeighbourCell&gt;
    &lt;eutraCellIdentifier&gt;2&lt;/eutraCellIdentifier&gt;
    &lt;MCC&gt;466&lt;/MCC&gt;
    &lt;MNC&gt;66&lt;/MNC&gt;
    &lt;enbIdType&gt;MACRO_ENB_ID&lt;/enbIdType&gt;
    &lt;enbId&gt;1&lt;/enbId&gt;
    &lt;/eutraNeighbourCell&gt;
    &lt;eutraQoSConfig&gt;
    &lt;configIndex&gt;1&lt;/configIndex&gt;
    &lt;qci&gt;1&lt;/qci&gt;
    &lt;snSizeDL&gt;12&lt;/snSizeDL&gt;
    &lt;snSizeUL&gt;12&lt;/snSizeUL&gt;
    &lt;ulDataSplitThresholdInBytes&gt;b100&lt;/ulDataSplitThresholdInBytes&gt;
    &lt;enableUlOutOfOrderDelivery&gt;false&lt;/enableUlOutOfOrderDelivery&gt;
    &lt;rlcMode&gt;RLC_UM&lt;/rlcMode&gt;
    &lt;rlcUmDir&gt;RLC_UM_DIR_BIDIRECTIONAL&lt;/rlcUmDir&gt;
    &lt;reorderingTimerMs&gt;500&lt;/reorderingTimerMs&gt;
    &lt;/eutraQoSConfig&gt;
    &lt;/eutraConfig&gt;
    &lt;nrConfig&gt;
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00001c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;152&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00004c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;146&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000040108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;153&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000018108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;140&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00002c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;154&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024002&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;159&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024003&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;137&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024004&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;155&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00003c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;160&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000014108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;142&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000030108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;141&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000050108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;150&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000004108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;139&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000044108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;143&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000028108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;157&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000034108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;144&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000010108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;149&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000020108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;145&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00000c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;151&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    &lt;/nrConfig&gt;
    &lt;ueCapabilityTriggerAfterSMCProc&gt;true&lt;/ueCapabilityTriggerAfterSMCProc&gt;
    &lt;/gnbCellCuVsConfig&gt;
    &lt;/gnbCuConfig&gt;
    &lt;/gnbvs&gt;
    </vsData>
            </vsDataContainer>
            <nCI>000024001</nCI>
            <pLMNId>
              <MCC>466</MCC>
              <MNC>66</MNC>
            </pLMNId>
            <rRMPolicyType>16</rRMPolicyType>
            <rRMPolicyNSSIId>NssidPolicy</rRMPolicyNSSIId>
            <rRMPolicyRatio>8</rRMPolicyRatio>
            <rRMPolicy>rRMPolicy</rRMPolicy>
            <rRMPolicyRatio2>
              <groupId>12</groupId>
              <sNSSAI>3</sNSSAI>
              <quotaType>float</quotaType>
              <rRMPolicyMaxRation>5</rRMPolicyMaxRation>
              <rRMPolicyMarginMaxRation>50</rRMPolicyMarginMaxRation>
              <rRMPolicyMinRation>15</rRMPolicyMinRation>
              <rRMPolicyMarginMinRation>55</rRMPolicyMarginMinRation>
            </rRMPolicyRatio2>
            <s-NSSAI>0</s-NSSAI>
          </NRCellCU>
          <NRCellCU>
            <id>1</id>
            <objectClass>RNCFunction</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>NRCellCU</userLabel>
            <vnfParametersList>
              <vnfInstanceId>1</vnfInstanceId>
              <vnfdId>1</vnfdId>
              <flavourId>1</flavourId>
              <autoScalable>false</autoScalable>
            </vnfParametersList>
            <peeParametersList>
              <siteIdentification>Tech Park</siteIdentification>
              <siteLatitude>12.9781</siteLatitude>
              <siteLongitude>77.6653</siteLongitude>
              <siteDescription>prestige tech park</siteDescription>
              <equipmentType>RRU</equipmentType>
              <environmentType>Outdoor</environmentType>
              <powerInterface>AC</powerInterface>
            </peeParametersList>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_cell_cu_vs_config.yang</vsDataFormatVersion>
              <vsData>
    &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
    &lt;gnbCuConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;gnbCellCuVsConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;duId&gt;1&lt;/duId&gt;
    &lt;nRpCI&gt;1&lt;/nRpCI&gt;
    &lt;ueInactivityTimerSec&gt;day30&lt;/ueInactivityTimerSec&gt;
    &lt;eutraConfig&gt;
    &lt;eutraNeighbourCell&gt;
    &lt;eutraCellIdentifier&gt;2&lt;/eutraCellIdentifier&gt;
    &lt;MCC&gt;466&lt;/MCC&gt;
    &lt;MNC&gt;66&lt;/MNC&gt;
    &lt;enbIdType&gt;MACRO_ENB_ID&lt;/enbIdType&gt;
    &lt;enbId&gt;1&lt;/enbId&gt;
    &lt;/eutraNeighbourCell&gt;
    &lt;eutraQoSConfig&gt;
    &lt;configIndex&gt;1&lt;/configIndex&gt;
    &lt;qci&gt;1&lt;/qci&gt;
    &lt;snSizeDL&gt;12&lt;/snSizeDL&gt;
    &lt;snSizeUL&gt;12&lt;/snSizeUL&gt;
    &lt;ulDataSplitThresholdInBytes&gt;b100&lt;/ulDataSplitThresholdInBytes&gt;
    &lt;enableUlOutOfOrderDelivery&gt;false&lt;/enableUlOutOfOrderDelivery&gt;
    &lt;rlcMode&gt;RLC_UM&lt;/rlcMode&gt;
    &lt;rlcUmDir&gt;RLC_UM_DIR_BIDIRECTIONAL&lt;/rlcUmDir&gt;
    &lt;reorderingTimerMs&gt;500&lt;/reorderingTimerMs&gt;
    &lt;/eutraQoSConfig&gt;
    &lt;/eutraConfig&gt;
    &lt;nrConfig&gt;
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00001c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;152&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00004c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;146&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000040108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;153&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000048108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;100&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000018108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;140&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00002c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;154&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024001&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;158&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024003&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;137&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024004&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;155&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00003c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;160&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000014108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;142&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000038108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;156&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000054108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;147&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000030108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;141&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000058108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;138&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000050108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;150&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000044108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;143&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000028108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;157&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000034108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;144&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000010108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;149&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000020108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;145&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00000c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;151&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    &lt;/nrConfig&gt;
    &lt;ueCapabilityTriggerAfterSMCProc&gt;true&lt;/ueCapabilityTriggerAfterSMCProc&gt;
    &lt;/gnbCellCuVsConfig&gt;
    &lt;/gnbCuConfig&gt;
    &lt;/gnbvs&gt;
    </vsData>
            </vsDataContainer>
            <nCI>000024002</nCI>
            <pLMNId>
              <MCC>466</MCC>
              <MNC>66</MNC>
            </pLMNId>
            <rRMPolicyType>16</rRMPolicyType>
            <rRMPolicyNSSIId>NssidPolicy</rRMPolicyNSSIId>
            <rRMPolicyRatio>8</rRMPolicyRatio>
            <rRMPolicy>rRMPolicy</rRMPolicy>
            <rRMPolicyRatio2>
              <groupId>12</groupId>
              <sNSSAI>3</sNSSAI>
              <quotaType>float</quotaType>
              <rRMPolicyMaxRation>5</rRMPolicyMaxRation>
              <rRMPolicyMarginMaxRation>50</rRMPolicyMarginMaxRation>
              <rRMPolicyMinRation>15</rRMPolicyMinRation>
              <rRMPolicyMarginMinRation>55</rRMPolicyMarginMinRation>
            </rRMPolicyRatio2>
            <s-NSSAI>1</s-NSSAI>
          </NRCellCU>
          <NRCellCU>
            <id>2</id>
            <objectClass>RNCFunction</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>NRCellCU</userLabel>
            <vnfParametersList>
              <vnfInstanceId>1</vnfInstanceId>
              <vnfdId>1</vnfdId>
              <flavourId>1</flavourId>
              <autoScalable>false</autoScalable>
            </vnfParametersList>
            <peeParametersList>
              <siteIdentification>Tech Park</siteIdentification>
              <siteLatitude>12.9781</siteLatitude>
              <siteLongitude>77.6653</siteLongitude>
              <siteDescription>prestige tech park</siteDescription>
              <equipmentType>RRU</equipmentType>
              <environmentType>Outdoor</environmentType>
              <powerInterface>AC</powerInterface>
            </peeParametersList>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_cell_cu_vs_config.yang</vsDataFormatVersion>
              <vsData>
    &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
    &lt;gnbCuConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;gnbCellCuVsConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;duId&gt;1&lt;/duId&gt;
    &lt;nRpCI&gt;1&lt;/nRpCI&gt;
    &lt;ueInactivityTimerSec&gt;day30&lt;/ueInactivityTimerSec&gt;
    &lt;eutraConfig&gt;
    &lt;eutraNeighbourCell&gt;
    &lt;eutraCellIdentifier&gt;2&lt;/eutraCellIdentifier&gt;
    &lt;MCC&gt;466&lt;/MCC&gt;
    &lt;MNC&gt;66&lt;/MNC&gt;
    &lt;enbIdType&gt;MACRO_ENB_ID&lt;/enbIdType&gt;
    &lt;enbId&gt;1&lt;/enbId&gt;
    &lt;/eutraNeighbourCell&gt;
    &lt;eutraQoSConfig&gt;
    &lt;configIndex&gt;1&lt;/configIndex&gt;
    &lt;qci&gt;1&lt;/qci&gt;
    &lt;snSizeDL&gt;12&lt;/snSizeDL&gt;
    &lt;snSizeUL&gt;12&lt;/snSizeUL&gt;
    &lt;ulDataSplitThresholdInBytes&gt;b100&lt;/ulDataSplitThresholdInBytes&gt;
    &lt;enableUlOutOfOrderDelivery&gt;false&lt;/enableUlOutOfOrderDelivery&gt;
    &lt;rlcMode&gt;RLC_UM&lt;/rlcMode&gt;
    &lt;rlcUmDir&gt;RLC_UM_DIR_BIDIRECTIONAL&lt;/rlcUmDir&gt;
    &lt;reorderingTimerMs&gt;500&lt;/reorderingTimerMs&gt;
    &lt;/eutraQoSConfig&gt;
    &lt;/eutraConfig&gt;
    &lt;nrConfig&gt;
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00002c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;154&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024002&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;159&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024001&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;158&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024004&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;155&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000014108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;142&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000030108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;141&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000044108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;143&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000028108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;157&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000010108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;149&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000020108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;145&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    &lt;/nrConfig&gt;
    &lt;ueCapabilityTriggerAfterSMCProc&gt;true&lt;/ueCapabilityTriggerAfterSMCProc&gt;
    &lt;/gnbCellCuVsConfig&gt;
    &lt;/gnbCuConfig&gt;
    &lt;/gnbvs&gt;
    </vsData>
            </vsDataContainer>
            <nCI>000024003</nCI>
            <pLMNId>
              <MCC>466</MCC>
              <MNC>66</MNC>
            </pLMNId>
            <rRMPolicyType>16</rRMPolicyType>
            <rRMPolicyNSSIId>NssidPolicy</rRMPolicyNSSIId>
            <rRMPolicyRatio>8</rRMPolicyRatio>
            <rRMPolicy>rRMPolicy</rRMPolicy>
            <rRMPolicyRatio2>
              <groupId>12</groupId>
              <sNSSAI>3</sNSSAI>
              <quotaType>float</quotaType>
              <rRMPolicyMaxRation>5</rRMPolicyMaxRation>
              <rRMPolicyMarginMaxRation>50</rRMPolicyMarginMaxRation>
              <rRMPolicyMinRation>15</rRMPolicyMinRation>
              <rRMPolicyMarginMinRation>55</rRMPolicyMarginMinRation>
            </rRMPolicyRatio2>
            <s-NSSAI>2</s-NSSAI>
          </NRCellCU>
          <NRCellCU>
            <id>3</id>
            <objectClass>RNCFunction</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>NRCellCU</userLabel>
            <vnfParametersList>
              <vnfInstanceId>1</vnfInstanceId>
              <vnfdId>1</vnfdId>
              <flavourId>1</flavourId>
              <autoScalable>false</autoScalable>
            </vnfParametersList>
            <peeParametersList>
              <siteIdentification>Tech Park</siteIdentification>
              <siteLatitude>12.9781</siteLatitude>
              <siteLongitude>77.6653</siteLongitude>
              <siteDescription>prestige tech park</siteDescription>
              <equipmentType>RRU</equipmentType>
              <environmentType>Outdoor</environmentType>
              <powerInterface>AC</powerInterface>
            </peeParametersList>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_cell_cu_vs_config.yang</vsDataFormatVersion>
              <vsData>
    &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
    &lt;gnbCuConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;gnbCellCuVsConfig&gt;
    &lt;id&gt;0&lt;/id&gt;
    &lt;duId&gt;1&lt;/duId&gt;
    &lt;nRpCI&gt;1&lt;/nRpCI&gt;
    &lt;ueInactivityTimerSec&gt;day30&lt;/ueInactivityTimerSec&gt;
    &lt;eutraConfig&gt;
    &lt;eutraNeighbourCell&gt;
    &lt;eutraCellIdentifier&gt;2&lt;/eutraCellIdentifier&gt;
    &lt;MCC&gt;466&lt;/MCC&gt;
    &lt;MNC&gt;66&lt;/MNC&gt;
    &lt;enbIdType&gt;MACRO_ENB_ID&lt;/enbIdType&gt;
    &lt;enbId&gt;1&lt;/enbId&gt;
    &lt;/eutraNeighbourCell&gt;
    &lt;eutraQoSConfig&gt;
    &lt;configIndex&gt;1&lt;/configIndex&gt;
    &lt;qci&gt;1&lt;/qci&gt;
    &lt;snSizeDL&gt;12&lt;/snSizeDL&gt;
    &lt;snSizeUL&gt;12&lt;/snSizeUL&gt;
    &lt;ulDataSplitThresholdInBytes&gt;b100&lt;/ulDataSplitThresholdInBytes&gt;
    &lt;enableUlOutOfOrderDelivery&gt;false&lt;/enableUlOutOfOrderDelivery&gt;
    &lt;rlcMode&gt;RLC_UM&lt;/rlcMode&gt;
    &lt;rlcUmDir&gt;RLC_UM_DIR_BIDIRECTIONAL&lt;/rlcUmDir&gt;
    &lt;reorderingTimerMs&gt;500&lt;/reorderingTimerMs&gt;
    &lt;/eutraQoSConfig&gt;
    &lt;/eutraConfig&gt;
    &lt;nrConfig&gt;
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00004c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;146&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000040108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;153&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00002c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;154&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024002&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;159&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024001&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;158&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000024003&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;137&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;66&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;00003c108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;160&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000030108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;141&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000050108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;150&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000044108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;143&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000028108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;157&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000010108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;149&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    
              &lt;NRNeighbourCell&gt;
                &lt;nrCellIdentifier&gt;000020108&lt;/nrCellIdentifier&gt;
                &lt;nrPci&gt;145&lt;/nrPci&gt;
                &lt;MCC&gt;466&lt;/MCC&gt;
                &lt;MNC&gt;55&lt;/MNC&gt;
                &lt;nrModeTdd&gt;
                  &lt;TDDInfo&gt;
                    &lt;nrArfcn&gt;0&lt;/nrArfcn&gt;
                  &lt;/TDDInfo&gt;
                &lt;/nrModeTdd&gt;
                &lt;nrArfcn&gt;4850&lt;/nrArfcn&gt;
                &lt;TAC&gt;111111&lt;/TAC&gt;
              &lt;/NRNeighbourCell&gt;
    &lt;/nrConfig&gt;
    &lt;ueCapabilityTriggerAfterSMCProc&gt;true&lt;/ueCapabilityTriggerAfterSMCProc&gt;
    &lt;/gnbCellCuVsConfig&gt;
    &lt;/gnbCuConfig&gt;
    &lt;/gnbvs&gt;
    </vsData>
            </vsDataContainer>
            <nCI>000024004</nCI>
            <pLMNId>
              <MCC>466</MCC>
              <MNC>66</MNC>
            </pLMNId>
            <rRMPolicyType>16</rRMPolicyType>
            <rRMPolicyNSSIId>NssidPolicy</rRMPolicyNSSIId>
            <rRMPolicyRatio>8</rRMPolicyRatio>
            <rRMPolicy>rRMPolicy</rRMPolicy>
            <rRMPolicyRatio2>
              <groupId>12</groupId>
              <sNSSAI>3</sNSSAI>
              <quotaType>float</quotaType>
              <rRMPolicyMaxRation>5</rRMPolicyMaxRation>
              <rRMPolicyMarginMaxRation>50</rRMPolicyMarginMaxRation>
              <rRMPolicyMinRation>15</rRMPolicyMinRation>
              <rRMPolicyMarginMinRation>55</rRMPolicyMarginMinRation>
            </rRMPolicyRatio2>
            <s-NSSAI>3</s-NSSAI>
          </NRCellCU>
          <EP_F1C>
            <id>1</id>
            <objectClass>EP_F1C</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP_F1C</userLabel>
            <farEndEntity>1</farEndEntity>
            <vsDataContainer>
              <id>0</id>
              <objectClass>vsDataContainer</objectClass>
              <objectInstance>0</objectInstance>
              <vsDataType>2019-12-31</vsDataType>
              <vsDataFormatVersion>gnb_f1c_vs_config.yang</vsDataFormatVersion>
              <vsData>
          &lt;gnbvs xmlns=&quot;urn:rdns:com:radisys:nr:gnb&quot;&gt;
            &lt;gnbCuConfig&gt;
             &lt;id&gt;0&lt;/id&gt;
                 &lt;gnbF1cVsConfig&gt;
                    &lt;id&gt;0&lt;/id&gt;
                    &lt;duId&gt;1&lt;/duId&gt;
                    &lt;f1cTimeToWaitInSec&gt;5&lt;/f1cTimeToWaitInSec&gt;
                 &lt;/gnbF1cVsConfig&gt;
            &lt;/gnbCuConfig&gt;
           &lt;/gnbvs&gt;
              </vsData>
            </vsDataContainer>
            <localAddress>
              <ip_addr>1.1.1.2</ip_addr>
              <vlan_id>2</vlan_id>
            </localAddress>
            <remoteAddress>1.1.2.2</remoteAddress>
          </EP_F1C>
          <EP_F1U>
            <id>1</id>
            <objectClass>EP_F1U</objectClass>
            <objectInstance>0</objectInstance>
            <userLabel>EP_F1U</userLabel>
            <farEndEntity>1</farEndEntity>
            <localAddress>
              <ip_addr>1.1.1.4</ip_addr>
              <vlan_id>2</vlan_id>
            </localAddress>
            <remoteAddress>1.1.2.4</remoteAddress>
          </EP_F1U>
        </GNBCUFunction>
        <NtfSubscriptionControl>
          <id>0</id>
          <attributes>
            <notificationRecipientAddress>http://140.96.102.173/irm/postVesEvent</notificationRecipientAddress>
            <notificationTypes>__NOTIFICATION_TYPES</notificationTypes>
            <scope>
              <scopeType>BASE_ALL</scopeType>
            </scope>
          </attributes>
          <HeartbeatControl>
            <id>0</id>
            <attributes>
              <heartbeatNtfPeriod>60</heartbeatNtfPeriod>
            </attributes>
          </HeartbeatControl>
        </NtfSubscriptionControl>
      </ME>`
      },
      sm: {
        softwareInventory: {
          softwareSlot: [
            {
              name: "slot-1",
              status: "VALID",
              active: "true",
              running: "true",
              access: "READ_ONLY",
              vendorCode: "K2",
              buildId: "b01",
              buildName: "product-default",
              buildVersion: "0.1.0",
              files: {
                name: "file-1",
                version: "0.2.3",
                localPath: "~/some_dir/",
                integrity: "OK"
              }
            },
            {
              name: "slot-2",
              status: "EMPTY",
              active: "false",
              running: "false",
              access: "READ_WRITE"
            },
            {
              name: "slot-3",
              status: "EMPTY",
              active: "false",
              running: "false",
              access: "READ_WRITE"
            },
            {
              name: "slot-4",
              status: "EMPTY",
              active: "false",
              running: "false",
              access: "READ_WRITE"
            },
            {
              name: "slot-5",
              status: "EMPTY",
              active: "false",
              running: "false",
              access: "TEST"
            }
          ]
        }
      }
    };

    componentInfosw: ComponentInfosw = {
      uploadinfos: [
        {
          id: "ff7c19b6c9384fba9e2d",
          firm: "ITRI",
          modelname: "A001",
          uploadtime: "2023-10-26 10:31:31",
          uploadtype: 1,
          uploadversion: "1.0.0",
          description: "test123",
          uploadinfo: "fw-v1-0-0.zip",
          uploadurl: "drive:C"
        }
      ]
    }

  nfList: Nf[] = [
    {
      globalId: "cloud000-0000-0000-0000-000000000001",
      nfId: "47574686-3503-49c4-82ea-1d3312323df5",
      nfname: "nf1",
      ocloudName: "cloud1",
      dmsId: 'aaa',
      status: 0,
    },
    {
      globalId: "cloud000-0000-0000-0000-000000000002",
      nfId: "47574686-3503-49c4-82ea-1d3312323df6",
      nfname: "nf2",
      ocloudName: "cloud2",
      dmsId: 'aaa',
      status: 1,
    },
    {
      globalId: "cloud000-0000-0000-0000-000000000003",
      nfId: "47574686-3503-49c4-82ea-1d3312323df7",
      nfname: "nf3",
      ocloudName: "cloud3",
      dmsId: 'aaa',
      status: 2,
    },
    {
      globalId: "cloud000-0000-0000-0000-000000000004",
      nfId: "47574686-3503-49c4-82ea-1d3312323df7",
      nfname: "nf4",
      ocloudName: "cloud4",
      dmsId: 'aaa',
      status: 3,
    }
  ];

  overviewKpi: OverviewKpi = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    cpuUsage: ["25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%"],
    cpuLoading: ["65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%"],
    memoryUsage: ["2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB"],
    diskUsage: ["150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB"],
    diskRate: ["6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps"],
    interfaceUsage: ["50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"],
    networkThroughput: ["640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps"],
    power: ["500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W"]
  };

  ocloudCpuUsage: OcloudCpuUsage = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-23 00:00",
    endTime: "2022-11-24 00:00",
    interval: 15,
    tickInterval: 60,
    cpuUsage: ["25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%"]
  };

  ocloudCpuLoading: OcloudCpuLoading = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    cpuLoading: ["65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%"]
  }

  ocloudMemoryUsage: OcloudMemoryUsage = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    memoryUsage: ["2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB"]
  }

  ocloudDiskUsage: OcloudDiskUsage = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    diskUsage: ["150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB"]
  }

  ocloudDiskRate: OcloudDiskRate = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    diskRate: ["6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps"]
  }

  ocloudInterfaceUsage: OcloudInterfaceUsage = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    interfaceUsage: ["50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"]
  }

  ocloudNetworkThroughput: OcloudNetworkThroughput = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    networkThroughput: ["640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps"]
  }

  ocloudPower: OcloudPower = {
    ocloudId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    power: ["500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W"]
  }

  ocloudDmsList: OcloudDmsList = {
    id: "cloud000-0000-0000-0000-00000000001",
    name: "cloud1",
    dms: [
      {
        id: "9f58-96cf07543c40",
        name: "k8s-cluster0",
        cpu: 100,
        memory: "1000 GB",
        storage: "100 GB",
        network: 100
      },
      {
        id: "9f58-96cf07543c41",
        name: "k8s-cluster0",
        cpu: 30,
        memory: "200 GB",
        storage: "20 GB",
        network: 35
      },
      {
        id: "9f58-96cf07543c42",
        name: "k8s-cluster1",
        cpu: 10,
        memory: "13 GB",
        storage: "20 GB",
        network: 8
      }
    ]
  }

  nfInfo: NfInfo = {
    globalId: "cloud000-0000-0000-0000-000000000000",
    nfname: "nf1",
    nfId: "nf12345-ABCD-1000",
    fault: { critical: 1, major: 1, minor: 8, warning: 4 },
    descriptor: "nf1-desc",
    ocloudName: "cloud1",
    dmsName: "k8s-cluster0",
    artifactRepoUrl: "https://ylhsiehitri.github.io/helm-repo1",
    artifactName: "cu",
    type: "CU",
    status: 2,
    softwareVersion: "1.0.0"
  };

  nfPerformance: NfPerformance = {
    send: "0.8 Kbps",
    receive: "56 Kbps",
    memoryUsed: "18 %",
    throughput: "500 Kbps"
  };

  nfCapacitySummary: NfCapacitySummary = {
    totalCpu: 3,
    totalMemory: "40 GB",
    totalStorage: "20 GB",
    totalInterface: 2
  }

  nfCapacityList: NfCapacityList[] = [
    {
      nfCapacityId: "nf-0001",
      name: "NF-capacity1",
      cpu: 1,
      memory: "10 GB",
      storage: "20 GB",
      network: 1
    },
    {
      nfCapacityId: "nf-0002",
      name: "NF-capacity2",
      cpu: 1,
      memory: "30 GB",
      storage: "0",
      network: 0
    },
    {
      nfCapacityId: "nf-0001",
      name: "NF-capacity3",
      cpu: 0,
      memory: "0",
      storage: "0",
      network: 1
    }
  ];

  dmsAvaliableCapacity: DmsAvaliableCapacity = {
    dmsId: "dms_1-0_id",
    dmsName: "k8s-cluster0",
    cpu: 0,
    memory: "32 GB",
    storage: "13 GB",
    network: 3
  }

  nfPerformanceList: NfPerformanceList[] = [
    {
      nfname: "nf1",
      nfId: "NF1",
      ocloudId: "12345678-ABCD-1000-A000-00000001",
      ocloudName: "cloud1",
      cpuLoading: "65%",
      memoryUsage: "2410923KB",
      diskUsage: "150000MB",
      networkThroughput: "640235KBps"
    },
    {
      nfname: "nf2",
      nfId: "NF2",
      ocloudId: "12345678-ABCD-1000-A000-00000002",
      ocloudName: "cloud2",
      cpuLoading: "35%",
      memoryUsage: "1720402KB",
      diskUsage: "20500MB",
      networkThroughput: "242012KBps"
    },
    {
      nfname: "nf1",
      nfId: "NF1",
      ocloudId: "12345678-ABCD-1000-A000-00000001",
      ocloudName: "cloud1",
      cpuLoading: "65%",
      memoryUsage: "2410923KB",
      diskUsage: "150000MB",
      networkThroughput: "640235KBps"
    },
    {
      nfname: "nf2",
      nfId: "NF2",
      ocloudId: "12345678-ABCD-1000-A000-00000002",
      ocloudName: "cloud2",
      cpuLoading: "35%",
      memoryUsage: "1720402KB",
      diskUsage: "20500MB",
      networkThroughput: "242012KBps"
    },
    {
      nfname: "nf1",
      nfId: "NF1",
      ocloudId: "12345678-ABCD-1000-A000-00000001",
      ocloudName: "cloud1",
      cpuLoading: "65%",
      memoryUsage: "2410923KB",
      diskUsage: "150000MB",
      networkThroughput: "640235KBps"
    },
    {
      nfname: "nf2",
      nfId: "NF2",
      ocloudId: "12345678-ABCD-1000-A000-00000002",
      ocloudName: "cloud2",
      cpuLoading: "35%",
      memoryUsage: "1720402KB",
      diskUsage: "20500MB",
      networkThroughput: "242012KBps"
    }
  ];

  nfPmAdvanceSearchList: NfPerformanceList[] = [
    {
      nfname: "nf1",
      nfId: "nf12345-ABCD-1000",
      ocloudId: "12345678-ABCD-1000-A000-00000001",
      ocloudName: "cloud1",
      cpuLoading: "65%",
      memoryUsage: "2410923KB",
      diskUsage: "150000MB",
      networkThroughput: "640235KBps"
    },
    {
      nfname: "nf2",
      nfId: "nf12345-ABCD-1001",
      ocloudId: "12345678-ABCD-1000-A000-00000002",
      ocloudName: "cloud2",
      cpuLoading: "35%",
      memoryUsage: "1720402KB",
      diskUsage: "20500MB",
      networkThroughput: "242012KBps"
    }
  ];

  nfOverviewKpi: NfOverviewKpi = {
    nfId: "47574686-3503-49c4-82ea-1d3312323df5",
    startTime: "2023-04-20 00:20",
    endTime: "2023-04-20 02:20",
    interval: 5,
    tickInterval: 30,
    cpuUsage: ["25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%"],
    cpuLoading: ["65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%"],
    memoryUsage: ["2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB"],
    diskUsage: ["150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB"],
    diskRate: ["6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps"],
    interfaceUsage: ["50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"],
    networkThroughput: ["640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps"],
    power: ["500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W"]
  };

  nfCpuUsage: NfCpuUsage = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-23 00:00",
    endTime: "2022-11-24 00:00",
    interval: 15,
    tickInterval: 60,
    cpuUsage: ["25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%", "25%"]
  };

  nfCpuLoading: NfCpuLoading = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    cpuLoading: ["65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%", "65%", "55%", "52%", "68%"]
  }

  nfMemoryUsage: NfMemoryUsage = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    memoryUsage: ["2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB", "2410923KB", "2382843KB", "2209998KB"]
  }

  nfDiskUsage: NfDiskUsage = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    diskUsage: ["150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB", "150000MB"]
  }

  nfDiskRate: NfDiskRate = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    diskRate: ["6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps", "6402KBps", "6218KBps", "6092KBps"]
  }

  nfInterfaceUsage: NfInterfaceUsage = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    interfaceUsage: ["50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%", "50%"]
  }

  nfNetworkThroughput: NfNetworkThroughput = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    networkThroughput: ["640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps", "640235KBps"]
  }

  nfPower: NfPower = {
    nfId: "12345678-ABCD-1000-A000-00000001",
    startTime: "2022-11-24 00:20",
    endTime: "2022-11-24 02:20",
    interval: 5,
    tickInterval: 30,
    power: ["500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W", "500W"]
  }

  fmStatus: FmStatus = {
    timestamp: "2022/07/01 20:01:30",
    cloudId: "cloud00000001",
    nfId: "nf000000002",
    severity: "MAJOR",
    context: "CPU Error",
    isCleared: true,
    processStatus: 1,
    processComment: "cpu lack of cores",
    acknowledgeOwner: "Sam"
  }

}
