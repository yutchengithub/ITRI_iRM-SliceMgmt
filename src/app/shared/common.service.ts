import { Injectable } from '@angular/core';
import { OCloudList } from './../field-management/field-management.component';
import { SystemSummary } from '../dashboard/dashboard.component';
import { OcloudSummary } from '../dashboard/dashboard.component';
import { FieldSummary } from '../dashboard/dashboard.component';
import { FieldList } from '../dashboard/dashboard.component';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { OcloudInfo, OcloudPerformance } from '../field-management/field-info/field-info.component';
import { FaultMessage, FaultMessages, FmStatus, FmStatusRecord } from '../fault-management/fault-management.component';
import * as _ from 'lodash';
import { PerformanceList } from '../performance-management/o-cloud-performance/o-cloud-performance.component';
import { SoftwareList } from '../software-management/software-management.component';
import { SoftwareLists} from '../software-management/software-management.component';
import { AccountLists} from '../account-management/account-management.component';
import { SoftwareInfo } from '../software-management/software-info/software-info.component';
import { MainComponent } from '../main/main.component';
import { Nf, OcloudDmsList } from '../nf-management/nf-management.component';
import { OcloudCpuLoading, OcloudCpuUsage, OcloudDiskRate, OcloudDiskUsage, OcloudInterfaceUsage, OcloudMemoryUsage, OcloudNetworkThroughput, OcloudPower, OverviewKpi } from '../performance-management/o-cloud-performance-info/o-cloud-performance-info.component';
import { Observable } from 'rxjs';
import { DmsAvaliableCapacity, NfCapacityList, NfCapacitySummary, NfInfo, NfPerformance } from '../nf-management/nf-info/nf-info.component';
import { NfPerformanceList } from '../performance-management/nf-performance/nf-performance.component';
import { NfCpuLoading, NfCpuUsage, NfDiskRate, NfDiskUsage, NfInterfaceUsage, NfMemoryUsage, NfNetworkThroughput, NfOverviewKpi, NfPower } from '../performance-management/nf-performance-info/nf-performance-info.component';
import { Item } from './models/item';
import { FormGroup } from '@angular/forms';
import { AccountInfo } from '../account-management/account-info/account-info.component';
import { UserLogsList } from '../log-management/log-management.component'; // Add by yutchen @10/27
import { NELogsList } from '../log-management/log-management.component'; // Add by yutchen @10/27


export interface NowTime {
  year: string;
  month: string;
  day: string;
  hour: string;
  minute: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  isLocal!: boolean;
  restPath!: string;
  options = { headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }) };
  severitys: string[] = ['CRITICAL', 'MAJOR', 'MINOR', 'WARNING'];

  // @11/01 add by yuchen "類別需再調查"
  UserLogType: string[] = ['GET', 'POST', 'DELETE'];
  NELogType: string[] = ['get', 'get-config', 'edit-config'];

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

  constructor(private http: HttpClient) {
    this.statusList.forEach((row) => {
      this.statusMapDisplayName.set(row.value, row.displayName);
    });

    this.TypeList.forEach((row) => {
      this.typeMapDisplayName.set(row.value, row.displayName);
    });
  }

  loadConfig(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get('./assets/config/connection.json').subscribe(
        (res: any) => {
          this.isLocal = true;
          this.restPath = 'http://140.96.102.202:8080/o2_smo/webresources/ocloud';
          // this.isLocal = res['local'];
          //this.restPath = res['url'] + ':' + res['port'] + res['root'];
          resolve(true);
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
    return {
      year: year,
      month: month,
      day: day,
      hour: hour,
      minute: minute
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

  /* API */
  // loginpage(body: {}): Observable<any> {
  //   const url = `${this.restPath}/loginpage`;
  //   const bodyStr = JSON.stringify(body);
  //   return this.http.post(url, bodyStr);
  // }

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

  // softwareType: 0 = O-Cloud; 1= NF(CU); 2=NF(DU); 3=NF(CU+DU); All
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

  /* local file */
  systemSummary: SystemSummary = {
    ocloudCount: 2,
    nfCount: 10,
    totalCritical: 20,
    totalMajor: 10,
    totalMinor: 15,
    totalWarning: 30,
    avgCpu: "15%",
    totalMemory: "72 GB",
    avgStorage: "70.123 KBps",
    avgNetwork: "3.475 KBps"
  };

  fieldSummary: FieldSummary = {
    fieldSummaryInfo: [
      {
        "bsNum": 1,
        "fieldNum": 2,
        "ueNum": "itri 13"
      }
    ]
  };

  fieldList: FieldList = {
    fields: [
      {
        "id": "a542f7ab40a24ec48e84",
        "name": "f1",
        "phone": "0912345678",
        "fieldposition1": "[121.570381,25.033778]",
        "fieldposition2": "[121.560381,25.033778]",
        "fieldposition3": "[121.560381,25.023778]",
        "fieldposition4": "[121.570381,25.023778]",
        bsinfo: [
          {
            "id": "fd005824997144b987d5",
            "name": "bs_1x2x4"
          }
        ],
        "bsNum": 1,
        "ueNum": "fake 0",
        "coverage": "15",
        "accessibility": "DRB Accessibility:14",
        "availability": "string",
        "mobility": "NG-RAN handover success rate:78.21",
        "retainability": "DRB Retainability:0.36",
        "energy": "NG-RAN data Energy Efficiency:27.67",
        integrity: {
          "downlinkDelay": "6504264",
          "uplinkDelay": "6507722",
          "downlinkThrouthput": "1617437",
          "uplinkThrouthput": "1629079"
        },
        utilization: {
          "pdu": "1627179",
          "resourceProcess": "29.1",
          "resourceMemory": "60.43",
          "resourceDisk": "3.05",
          "maxPdu": "1674863"
        },
        "alarmCriticalNum": 36106,
        "alarmMajorNum": 289582,
        "alarmMinorNum": 557217,
        "alarmWarningNum": 18212
      },
      {
        "id": "a542f7ab40a24ec48e84",
        "name": "f2",
        "phone": "0912345678",
        "fieldposition1": "[121.570381,25.033778]",
        "fieldposition2": "[121.560381,25.033778]",
        "fieldposition3": "[121.560381,25.023778]",
        "fieldposition4": "[121.570381,25.023778]",
        bsinfo: [
          {
            "id": "fd005824997144b987d5",
            "name": "bs_1x2x4"
          }
        ],
        "bsNum": 2,
        "ueNum": "itri 2",
        "coverage": "10",
        "accessibility": "DRB Accessibility:23",
        "availability": "string",
        "mobility": "NG-RAN handover success rate:81.36",
        "retainability": "DRB Retainability:0.33",
        "energy": "NG-RAN data Energy Efficiency:25.35",
        integrity: {
          "downlinkDelay": "6502345",
          "uplinkDelay": "6506657",
          "downlinkThrouthput": "1617241",
          "uplinkThrouthput": "1626573"
        },
        utilization: {
          "pdu": "1626024",
          "resourceProcess": "31.2",
          "resourceMemory": "72.15",
          "resourceDisk": "5.31",
          "maxPdu": "1674863"
        },
        "alarmCriticalNum": 100,
        "alarmMajorNum": 200,
        "alarmMinorNum": 300,
        "alarmWarningNum": 100
      },
      {
        "id": "a542f7ab40a24ec48e84",
        "name": "f3",
        "phone": "0912345678",
        "fieldposition1": "[121.570381,25.033778]",
        "fieldposition2": "[121.560381,25.033778]",
        "fieldposition3": "[121.560381,25.023778]",
        "fieldposition4": "[121.570381,25.023778]",
        bsinfo: [
          {
            "id": "fd005824997144b987d5",
            "name": "bs_1x2x4"
          }
        ],
        "bsNum": 2,
        "ueNum": "itri 3",
        "coverage": "10",
        "accessibility": "DRB Accessibility:51",
        "availability": "string",
        "mobility": "NG-RAN handover success rate:77.38",
        "retainability": "DRB Retainability:0.32",
        "energy": "NG-RAN data Energy Efficiency:29.56",
        integrity: {
          "downlinkDelay": "6487754",
          "uplinkDelay": "6495574",
          "downlinkThrouthput": "1606875",
          "uplinkThrouthput": "1618045"
        },
        utilization: {
          "pdu": "1605781",
          "resourceProcess": "25.3",
          "resourceMemory": "52.78",
          "resourceDisk": "2.85",
          "maxPdu": "1678754"
        },
        "alarmCriticalNum": 100,
        "alarmMajorNum": 200,
        "alarmMinorNum": 300,
        "alarmWarningNum": 100
      }
    ]
  };

  ocloudSummary: OcloudSummary[] = [
    {
      id: "cloud000-0000-0000-0000-000000000000",
      name: "cloud0",
      dmsCount: 1,
      nfCount: 2,
      faultCount: 20
    },
    {
      id: "cloud000-0000-0000-0000-000000000001",
      name: "cloud1",
      dmsCount: 1,
      nfCount: 0,
      faultCount: 0
    },
    {
      id: "cloud000-0000-0000-0000-000000000002",
      name: "cloud2",
      dmsCount: 2,
      nfCount: 0,
      faultCount: 0
    },
    {
      id: "cloud000-0000-0000-0000-000000000003",
      name: "cloud3",
      dmsCount: 1,
      nfCount: 0,
      faultCount: 0
    },
    {
      id: "cloud000-0000-0000-0000-000000000004",
      name: "cloud4",
      dmsCount: 2,
      nfCount: 0,
      faultCount: 0
    },
    {
      id: "cloud000-0000-0000-0000-000000000005",
      name: "cloud5",
      dmsCount: 1,
      nfCount: 0,
      faultCount: 0
    },
    {
      id: "cloud000-0000-0000-0000-000000000006",
      name: "cloud6",
      dmsCount: 2,
      nfCount: 0,
      faultCount: 0
    }
    ,
    {
      id: "cloud000-0000-0000-0000-000000000007",
      name: "cloud7",
      dmsCount: 1,
      nfCount: 0,
      faultCount: 0
    },
    {
      id: "cloud000-0000-0000-0000-000000000008",
      name: "cloud8",
      dmsCount: 2,
      nfCount: 0,
      faultCount: 0
    },
    {
      id: "cloud000-0000-0000-0000-000000000009",
      name: "cloud9",
      dmsCount: 2,
      nfCount: 0,
      faultCount: 0
    }
  ];

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

  faultMessage: FaultMessage = {
    totalMessageNumber: 12,
    faultMessages: [
      {
        faultId: '1',
        fieldName: "field01",
        bsName: "BS_01",
        compname: "itri_10.0.2.7",        
        timestamp: "2022-02-21T09:28:01Z",
        count: 2,
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "CRITICAL",
        probablecause: "主機錯誤",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        nfName: "nf1",
        status: "Cleared",
        acknowledgeOwner: "Sam",
        createtime: "2022-02-21T09:28:00Z",
        updatetime: "2022-02-21T09:28:02Z",
        eDesc: "No external sync source"
      },
      {
        faultId: '2',
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.5",        
        timestamp: "2023-05-20T10:23:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機連線失敗",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-05-20T10:23:00Z",
        updatetime: "2023-05-20T10:23:02Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '3',
        fieldName: "field02",
        bsName: "BS_05",
        compname: "itri_10.0.2.15",        
        timestamp: "2023-07-23T08:23:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MINOR",
        probablecause: "無法連線到儲存空間",
        isCleared: true,
        processstatus: 1,
        processresult: "IO Changed",
        nfName: "nf2",
        status: "Cleared",
        acknowledgeOwner: "Charles",
        createtime: "2023-07-23T08:23:00Z",
        updatetime: "2023-07-23T08:23:02Z",
        eDesc: "Ambient temperature violation"
      },
      {
        faultId: '4',
        fieldName: "field01",
        bsName: "BS_01",
        compname: "itri_10.0.2.7",        
        timestamp: "2020-11-23T15:12:10Z",
        count: 3,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "WARNING",
        probablecause: "結束待命錯誤",
        isCleared: true,
        processstatus: 0,
        processresult: "",
        nfName: "nf2",
        status: "Cleared",
        acknowledgeOwner: "Kevin",
        createtime: "2020-11-23T15:12:00Z",
        updatetime: "2020-11-23T15:12:20Z",
        eDesc: "WARNING Fault Message"
      },
      {
        faultId: '5',
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.7",        
        timestamp: "2021-05-21T18:12:10Z",
        count: 3,
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "CRITICAL",
        probablecause: "授權錯誤",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        nfName: "nf2",
        status: "Cleared",
        acknowledgeOwner: "Kevin",
        createtime: "2021-05-21T18:12:00Z",
        updatetime: "2021-05-21T18:12:20Z",
        eDesc: "No external sync source"
      },
      {
        faultId: '6',
        fieldName: "field02",
        bsName: "BS_04",
        compname: "itri_10.0.2.5",        
        timestamp: "2023-08-11T18:15:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機 CPU 使用量",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11T18:15:00Z",
        updatetime: "2023-08-11T18:15:02Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '7',
        fieldName: "field02",
        bsName: "BS_03",
        compname: "itri_10.0.2.8",        
        timestamp: "2023-08-11T17:22:01Z",
        count: 2,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MINOR",
        probablecause: "網路連線中斷",
        isCleared: true,
        processstatus: 1,
        processresult: "IO Changed",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11T17:22:00Z",
        updatetime: "2023-08-11T17:22:02Z",
        eDesc: "Ambient temperature violation"
      },
      {
        faultId: '8',
        fieldName: "field03",
        bsName: "BS_09",
        compname: "itri_10.0.2.4",        
        timestamp: "2023-08-17T18:23:01Z",
        count: 2,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "WARNING",
        probablecause: "網路上行冗餘遺失",
        isCleared: true,
        processstatus: 0,
        processresult: "",
        nfName: "nf2",
        status: "Cleared",
        acknowledgeOwner: "Kevin",
        createtime: "2023-08-17T18:23:00Z",
        updatetime: "2023-08-17T18:23:02Z",
        eDesc: "WARNING Fault Message"
      },
      {
        faultId: '9',
        fieldName: "field03",
        bsName: "BS_07",
        compname: "itri_10.0.2.6",        
        timestamp: "2020-11-15T20:48:01Z",
        count: 3,
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "CRITICAL",
        probablecause: "網路上行冗餘已降級",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        nfName: "nf2",
        status: "Cleared",
        acknowledgeOwner: "Charles",
        createtime: "2020-11-15T20:48:00Z",
        updatetime: "2020-11-15T20:48:02Z",
        eDesc: "No external sync source"
      },
      {
        faultId: '10',
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.2",        
        timestamp: "2023-05-17T13:27:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11T18:15:00Z",
        updatetime: "2023-08-11T18:15:02Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '11',
        fieldName: "field02",
        bsName: "BS_05",
        compname: "itri_10.0.3.6",        
        timestamp: "2023-06-14T18:08:10Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Charles",
        createtime: "2023-06-14T18:08:00Z",
        updatetime: "2023-06-14T18:08:20Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '12',
        fieldName: "field03",
        bsName: "BS_08",
        compname: "itri_10.0.2.8",        
        timestamp: "2023-03-19T09:16:21Z",
        count: 3,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Kevin",
        createtime: "2023-03-19T09:16:20Z",
        updatetime: "2023-03-19T09:16:22Z",
        eDesc: "Configuration file corrupted conflicting"
      }
    ]
  };

  /* Original example
  faultMessage: FaultMessage = {
    //totalMessageNumber: 1000,
     totalMessageNumber: 0,
    faultMessages: [
      {
        faultId: '1',
        timestamp: "2022/07/01 20: 00: 00",
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "Critical",
        context: "主機錯誤",
        isCleared: false,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud1",
        nfName: "nf1",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        severity: "Major",
        context: "主機連線失敗",
        isCleared: true,
        processStatus: 1,
        processComment: "By sswu",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '3',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        severity: "Minor",
        context: "無法連線到儲存空間",
        isCleared: true,
        processStatus: 1,
        processComment: "IO Changed",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '4',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        severity: "Warning",
        context: "結束待命錯誤",
        isCleared: true,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022/07/01 20: 00: 00",
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        severity: "Critical",
        context: "授權錯誤",
        isCleared: false,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        severity: "Major",
        context: "主機 CPU 使用量",
        isCleared: true,
        processStatus: 1,
        processComment: "By sswu",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        severity: "Minor",
        context: "網路連線中斷",
        isCleared: true,
        processStatus: 1,
        processComment: "IO Changed",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        severity: "Warning",
        context: "網路上行冗餘遺失",
        isCleared: true,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022/07/01 20: 00: 00",
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        severity: "Critical",
        context: "網路上行冗餘已降級",
        isCleared: false,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        severity: "Major",
        context: "主機錯誤",
        isCleared: true,
        processStatus: 1,
        processComment: "By sswu",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      }
    ]
  }; 

  fmAdvanceSearch: FaultMessage = {
    totalMessageNumber: 2023,
    // totalMessageNumber: 0,
    faultMessages: [
      {
        faultId: '1',
        timestamp: "2022/07/01 20: 00: 00",
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "Critical",
        context: "主機錯誤",
        isCleared: false,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud10",
        nfName: "nf1",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "Major",
        context: "主機連線失敗",
        isCleared: true,
        processStatus: 1,
        processComment: "By sswu",
        cloudName: "cloud9",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '3',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "Minor",
        context: "無法連線到儲存空間",
        isCleared: true,
        processStatus: 1,
        processComment: "IO Changed",
        cloudName: "cloud8",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '4',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "Warning",
        context: "結束待命錯誤",
        isCleared: true,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud7",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022/07/01 20: 00: 00",
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "Critical",
        context: "授權錯誤",
        isCleared: false,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud6",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "Major",
        context: "主機 CPU 使用量",
        isCleared: true,
        processStatus: 1,
        processComment: "By sswu",
        cloudName: "cloud5",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "Minor",
        context: "網路連線中斷",
        isCleared: true,
        processStatus: 1,
        processComment: "IO Changed",
        cloudName: "cloud4",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "Warning",
        context: "網路上行冗餘遺失",
        isCleared: true,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud3",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022/07/01 20: 00: 00",
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "Critical",
        context: "網路上行冗餘已降級",
        isCleared: false,
        processStatus: 0,
        processComment: "",
        cloudName: "cloud2",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      },
      {
        faultId: '2',
        timestamp: "2022 / 07 / 01 20: 01: 30",
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "Major",
        context: "主機錯誤",
        isCleared: true,
        processStatus: 1,
        processComment: "By sswu",
        cloudName: "cloud1",
        nfName: "nf2",
        acknowledgeOwner: "Sam"
      }
    ]
  }; */

  fmAdvanceSearch: FaultMessage = {
    totalMessageNumber: 2023,
    faultMessages: [
      {
        faultId: '1',
        fieldName: "field01",
        bsName: "BS_01",
        compname: "itri_10.0.2.7",        
        timestamp: "2022-02-21T09:28:01Z",
        count: 2,
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "CRITICAL",
        probablecause: "主機錯誤",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        //cloudName: "cloud1",
        nfName: "nf1",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2022-02-21T09:28:00Z",
        updatetime: "2022-02-21T09:28:02Z",
        eDesc: "No external sync source"
      },
      {
        faultId: '2',
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.5",        
        timestamp: "2023-05-20T10:23:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機連線失敗",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        //cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-05-20T10:23:00Z",
        updatetime: "2023-05-20T10:23:02Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '3',
        fieldName: "field02",
        bsName: "BS_05",
        compname: "itri_10.0.2.15",        
        timestamp: "2023-07-23T08:23:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MINOR",
        probablecause: "無法連線到儲存空間",
        isCleared: true,
        processstatus: 1,
        processresult: "IO Changed",
        //cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Charles",
        createtime: "2023-07-23T08:23:00Z",
        updatetime: "2023-07-23T08:23:02Z",
        eDesc: "Ambient temperature violation"
      },
      {
        faultId: '4',
        fieldName: "field01",
        bsName: "BS_01",
        compname: "itri_10.0.2.7",        
        timestamp: "2020-11-23T15:12:10Z",
        count: 3,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "WARNING",
        probablecause: "結束待命錯誤",
        isCleared: true,
        processstatus: 0,
        processresult: "",
       // cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Kevin",
        createtime: "2020-11-23T15:12:00Z",
        updatetime: "2020-11-23T15:12:20Z",
        eDesc: "WARNING Fault Message"
      },
      {
        faultId: '5',
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.7",        
        timestamp: "2021-05-21T18:12:10Z",
        count: 3,
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "CRITICAL",
        probablecause: "授權錯誤",
        isCleared: false,
        processstatus: 0,
        processresult: "",
        //cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Kevin",
        createtime: "2021-05-21T18:12:00Z",
        updatetime: "2021-05-21T18:12:20Z",
        eDesc: "No external sync source"
      },
      {
        faultId: '6',
        fieldName: "field02",
        bsName: "BS_04",
        compname: "itri_10.0.2.5",        
        timestamp: "2023-08-11T18:15:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機 CPU 使用量",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        //cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11T18:15:00Z",
        updatetime: "2023-08-11T18:15:02Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '7',
        fieldName: "field02",
        bsName: "BS_03",
        compname: "itri_10.0.2.8",        
        timestamp: "2023-08-11T17:22:01Z",
        count: 2,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MINOR",
        probablecause: "網路連線中斷",
        isCleared: true,
        processstatus: 1,
        processresult: "IO Changed",
       // cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11T17:22:00Z",
        updatetime: "2023-08-11T17:22:02Z",
        eDesc: "Ambient temperature violation"
      },
      {
        faultId: '8',
        fieldName: "field03",
        bsName: "BS_09",
        compname: "itri_10.0.2.4",        
        timestamp: "2023-08-17T18:23:01Z",
        count: 2,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "WARNING",
        probablecause: "網路上行冗餘遺失",
        isCleared: true,
        processstatus: 0,
        processresult: "",
        //cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Kevin",
        createtime: "2023-08-17T18:23:00Z",
        updatetime: "2023-08-17T18:23:02Z",
        eDesc: "WARNING Fault Message"
      },
      {
        faultId: '9',
        fieldName: "field03",
        bsName: "BS_07",
        compname: "itri_10.0.2.6",        
        timestamp: "2020-11-15T20:48:01Z",
        count: 3,
        cloudId: "cloud00000000",
        nfId: "nf000000001",
        eventtype: "CRITICAL",
        probablecause: "網路上行冗餘已降級",
        isCleared: false,
        processstatus: 0,
        processresult: "",
       // cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Charles",
        createtime: "2020-11-15T20:48:00Z",
        updatetime: "2020-11-15T20:48:02Z",
        eDesc: "No external sync source"
      },
      {
        faultId: '10',
        fieldName: "field01",
        bsName: "BS_02",
        compname: "itri_10.0.2.2",        
        timestamp: "2023-05-17T13:27:01Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
       // cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Sam",
        createtime: "2023-08-11T18:15:00Z",
        updatetime: "2023-08-11T18:15:02Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '11',
        fieldName: "field02",
        bsName: "BS_05",
        compname: "itri_10.0.3.6",        
        timestamp: "2023-06-14T18:08:10Z",
        count: 1,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
       // cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Charles",
        createtime: "2023-06-14T18:08:00Z",
        updatetime: "2023-06-14T18:08:20Z",
        eDesc: "Configuration file corrupted conflicting"
      },
      {
        faultId: '12',
        fieldName: "field03",
        bsName: "BS_08",
        compname: "itri_10.0.2.8",        
        timestamp: "2023-03-19T09:16:21Z",
        count: 3,
        cloudId: "cloud00000001",
        nfId: "nf000000002",
        eventtype: "MAJOR",
        probablecause: "主機錯誤",
        isCleared: true,
        processstatus: 1,
        processresult: "By sswu",
        //cloudName: "cloud2",
        nfName: "nf2",
        status: "New",
        acknowledgeOwner: "Kevin",
        createtime: "2023-03-19T09:16:20Z",
        updatetime: "2023-03-19T09:16:22Z",
        eDesc: "Configuration file corrupted conflicting"
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

  fmStatusRecordList: FmStatusRecord[] = [
    {
      timestamp: "2022/07/01 20: 01: 30",
      processStatus: 1,
      processComment: "cpu lack of cores",
      acknowledgeOwner: "Edith"
    },
    {
      timestamp: "2022/07/06 20: 01: 30",
      processStatus: 0,
      processComment: "added cpu cores",
      acknowledgeOwner: "Sam"
    },
    {
      timestamp: "2022/07/02 20: 01: 30",
      processStatus: 0,
      processComment: "added cpu cores",
      acknowledgeOwner: "Sam"
    },
    {
      timestamp: "2022/07/03 20: 01: 30",
      processStatus: 1,
      processComment: "cpu lack of cores",
      acknowledgeOwner: "Edith"
    },
    {
      timestamp: "2022/07/04 20: 01: 30",
      processStatus: 0,
      processComment: "added cpu cores",
      acknowledgeOwner: "Sam"
    },
    {
      timestamp: "2022/07/05 20: 01: 30",
      processStatus: 1,
      processComment: "cpu lack of cores",
      acknowledgeOwner: "Edith"
    }
  ];

  // User logs files @10/27 add by yutchen
  UserLogsList: UserLogsList = {
  
    logNumber: 15,  // number
    UserLogsinfo: [
      {
        userlogID: '1',   // string
        userid: "k200",   // string
        logtype: "POST",  // string
        loglevel: 20,     // number
        logmsg: "k200 login success session: irm_session_0309079f",  // string
        logtime: "2023-06-14 13:59:46"  // string
      },
      {
        userlogID: '2',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k200",
        logtime: "2023-10-27 17:44:19"
      },
      {
        userlogID: '3',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryJobTicketList success",
        logtime: "2023-10-27 17:21:04"
      },
      {
        userlogID: '4',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "QueryBsList success field Id: k200",
        logtime: "2023-09-27 16:48:34"
      },
      {
        userlogID: '5',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 QueryBsComponentList Success",
        logtime: "2023-09-27 16:48:34"
      },
      {
        userlogID: '6',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryFieldList success",
        logtime: "2023-09-27 16:48:34"
      },
      {
        userlogID: '7',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryFieldList success",
        logtime: "2023-09-27 16:48:37"
      },
      {
        userlogID: '8',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k200",
        logtime: "2023-09-27 16:48:38"
      },
      {
        userlogID: '9',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryJobTicketList success",
        logtime: "2023-09-27 16:48:39"
      },
      {
        userlogID: '10',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 QueryBsComponentList Success",
        logtime: "2023-09-27 16:48:47"
      },
      {
        userlogID: '11',
        userid: "k200",
        logtype: "DELETE",
        loglevel: 20,
        logmsg: "RemoveField success field Id: 1a933410af39457eb2c8",
        logtime: "2023-10-31 16:35:52"
      },
      {
        userlogID: '12',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "k200 queryFieldList success",
        logtime: "2023-10-31 16:35:53"
      },
      {
        userlogID: '13',
        userid: "k200",
        logtype: "GET",
        loglevel: 20,
        logmsg: "QueryBsList success field Id: k200",
        logtime: "2023-10-31 16:35:54"
      },
      {
        userlogID: '14',
        userid: "k200",
        logtype: "DELETE",
        loglevel: 20,
        logmsg: "RemoveBs success Id: k200",
        logtime: "2023-10-31 16:35:59"
      },
      {
        userlogID: '15',
        userid: "k200",
        logtype: "POST",
        loglevel: 20,
        logmsg: "queryUploadFileList success field Id: k200",
        logtime: "2023-10-31 16:40:19"
      }
    ]
  };

  // NE logs files @10/27 add by yutchen
  NELogsList: NELogsList = {
    
    logNumber: 15,
    NELogsinfo: [
      {
        NElogID: '1',               // string
        userid: "itri_10.0.2.17",             // string
        operation: "get-config",    // string
        // string
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        // string
        resp_data: "<?xml version=\"1.0\" ?>\n<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n\t<software-inventory xmlns=\"urn:itri-software-management\">\n\t\t<software-slot>\n\t\t\t<name>slot-1</name>\n\t\t\t<status>VALID</status>\n\t\t\t<active>true</active>\n\t\t\t<running>true</running>\n\t\t\t<access>READ_ONLY</access>\n\t\t\t<vendor-code>K2</vendor-code>\n\t\t\t<build-id>b01</build-id>\n\t\t\t<build-name>product-default</build-name>\n\t\t\t<build-version>0.1.0</build-version>\n\t\t\t<files>\n\t\t\t\t<name>file-1</name>\n\t\t\t\t<version>0.2.3</version>\n\t\t\t\t<local-path>~/some_dir/</local-path>\n\t\t\t\t<integrity>OK</integrity>\n\t\t\t</files>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-2</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-3</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-4</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t</software-inventory>\n</data>\n",
        logtime: "2023-06-14 13:59:46"   // string
      },
      {
        NElogID: '2',               
        userid: "itri_10.0.2.17",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?>\n<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">",
        logtime: "2023-10-27 17:44:19"   // string
      },
      {
        NElogID: '3', 
        userid: "itri_10.0.2.17",
        operation: "get-config",
        req_data: "",
        resp_data: "<?xml version=\"1.0\" ?>\n<data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\">\n\t<software-inventory xmlns=\"urn:o-ran:software-management:1.0\">\n\t\t<software-slot>\n\t\t\t<name>slot-1</name>\n\t\t\t<status>VALID</status>\n\t\t\t<active>true</active>\n\t\t\t<running>true</running>\n\t\t\t<access>READ_ONLY</access>\n\t\t\t<vendor-code>K2</vendor-code>\n\t\t\t<build-id>b01</build-id>\n\t\t\t<build-name>product-default</build-name>\n\t\t\t<build-version>0.1.0</build-version>\n\t\t\t<files>\n\t\t\t\t<name>file-1</name>\n\t\t\t\t<version>0.2.3</version>\n\t\t\t\t<local-path>~/some_dir/</local-path>\n\t\t\t\t<integrity>OK</integrity>\n\t\t\t</files>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-2</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-3</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t\t<software-slot>\n\t\t\t<name>slot-4</name>\n\t\t\t<status>EMPTY</status>\n\t\t\t<active>false</active>\n\t\t\t<running>false</running>\n\t\t\t<access>READ_WRITE</access>\n\t\t</software-slot>\n\t</software-inventory>\n</data>\n",
        logtime: "2023-10-27 17:21:04"   // string
      },
      {
        NElogID: '4',
        userid: "itri_10.0.2.17",
        operation: "edit-config",
        req_data: "<config> <SMO xmlns=\"urn:rdns:com:itri:nr-smo:1.0\"> <ftpip>10.0.2.16</ftpip> <ftpid>k200</ftpid> <ftpkey>k200123</ftpkey> <ftppath>/home/k200/irm-itri/server/uploadFolder/ftpFolder/46a315326d5b4ac2a3a7</ftppath> <file-upload-interval>60</file-upload-interval> </SMO> </config>",
        resp_data: "1",
        logtime: "2023-10-31 17:10:23.979271"
      },
      {
        NElogID: '5',
        userid: "itri_10.0.2.17",
        operation: "edit-config",
        req_data: "<config> <SMO xmlns=\"urn:rdns:com:itri:nr-smo:1.0\"> <ftpip>10.0.2.16</ftpip> <ftpid>k200</ftpid> <ftpkey>k200123</ftpkey> <ftppath>/home/k200/irm-itri/server/uploadFolder/ftpFolder/635778a42e854c17a4c2</ftppath> <file-upload-interval>60</file-upload-interval> </SMO> </config>",
        resp_data: "1",
        logtime: "2023-10-31 17:10:22.793374"
      },
      {
        NElogID: '6',
        userid: "itri_10.0.2.17",
        operation: "edit-config",
        req_data: "<config> <SMO xmlns=\"urn:rdns:com:itri:nr-smo:1.0\"> <ftpip>10.0.2.16</ftpip> <ftpid>k200</ftpid> <ftpkey>k200123</ftpkey> <ftppath>/home/k200/irm-itri/server/uploadFolder/ftpFolder/614de0d30d1845129f02</ftppath> <file-upload-interval>60</file-upload-interval> </SMO> </config>",
        resp_data: "1",
        logtime: "2023-10-31 17:10:21.286927"
      },
      {
        NElogID: '7',
        userid: "itri_10.0.2.17",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\"><GNBCUFunction><id>0</id><NRCellCU><id>1</id><vsDataContainer><id>0</id><vsData><![CDATA[ <gnbvs xmlns=\"urn:rdns:com:radisys:nr:gnb\"> <gnbCuConfig> <id>0</id> <gnbCellCuVsConfig> <id>0</id> <duId>1</duId> <nRpCI>1</nRpCI> <ueInactivityTimerSec>day30</ueInactivityTimerSec> <eutraConfig> <eutraNeighbourCell> <eutraCellIdentifier>2</eutraCellIdentifier> <MCC>466</MCC> <MNC>66</MNC> <enbIdType>MACRO_ENB_ID</enbIdType> <enbId>1</enbId> </eutraNeighbourCell> <eutraQoSConfig> <configIndex>1</configIndex> <qci>1</qci> <snSizeDL>12</snSizeDL> <snSizeUL>12</snSizeUL> <ulDataSplitThresholdInBytes>b100</ulDataSplitThresholdInBytes> <enableUlOutOfOrderDelivery>false</enableUlOutOfOrderDelivery> <rlcMode>RLC_UM</rlcMode> <rlcUmDir>RLC_UM_DIR_BIDIRECTIONAL</rlcUmDir> <reorderingTimerMs>500</reorderingTimerMs> </eutraQoSConfig> </eutraConfig> <nrConfig> <NRNeighbourCell> <nrCellIdentifier>000004108</nrCellIdentifier> <nrPci>100</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> <NRNeighbourCell> <nrCellIdentifier>000050108</nrCellIdentifier> <nrPci>160</nrPci> <MCC>466</MCC> <MNC>55</MNC> <nrModeTdd> <TDDInfo> <nrArfcn>0</nrArfcn> </TDDInfo> </nrModeTdd> <nrArfcn>4850</nrArfcn> <TAC>111111</TAC> </NRNeighbourCell> </nrConfig> <ueCapabilityTriggerAfterSMCProc>true</ueCapabilityTriggerAfterSMCProc> </gnbCellCuVsConfig> </gnbCuConfig> </gnbvs> ]]></vsData></vsDataContainer></NRCellCU></GNBCUFunction></ME></config>",
        resp_data: "1",
        logtime: "2023-10-31 17:08:08.866697"
      },
      {
        NElogID: '8',
        userid: "itri_10.0.2.17",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>false</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>VALID</status> <active>true</active> <running>false</running> <access>READ_WRITE</access> <vendor-code>WN</vendor-code> <build-id>1</build-id> <build-name>WNC-official-build</build-name> <build-version>1-0-0</build-version> <files> <name>fw-v1-0-0.bin</name> <version>1.0.0</version> <local-path>/sw_inventory/slot_3/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2023-10-31 17:15:31.669459"
      },
      {
        NElogID: '9',
        userid: "itri_10.0.2.17",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>true</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2023-10-31 17:15:11.961997"
      },
      {
        NElogID: '10',
        userid: "itri_10.0.2.17",
        operation: "get-config",
        req_data: "<ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\"></ME>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"/>",
        logtime: "2023-10-31 17:10:36.391256"
      },
      {
        NElogID: '11',
        userid: "itri_10.0.2.17",
        operation: "get-config",
        req_data: "<filter><software-inventory xmlns=\"urn:itri-software-management\"><software-slot></software-slot></software-inventory></filter>",
        resp_data: "<?xml version=\"1.0\" ?> <data xmlns=\"urn:ietf:params:xml:ns:netconf:base:1.0\"> <software-inventory xmlns=\"urn:itri-software-management\"> <software-slot> <name>slot-1</name> <status>VALID</status> <active>true</active> <running>true</running> <access>READ_ONLY</access> <vendor-code>K2</vendor-code> <build-id>b01</build-id> <build-name>product-default</build-name> <build-version>0.1.0</build-version> <files> <name>file-1</name> <version>0.2.3</version> <local-path>~/some_dir/</local-path> <integrity>OK</integrity> </files> </software-slot> <software-slot> <name>slot-2</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-3</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> <software-slot> <name>slot-4</name> <status>EMPTY</status> <active>false</active> <running>false</running> <access>READ_WRITE</access> </software-slot> </software-inventory> </data>",
        logtime: "2023-10-31 17:09:41.933556"
      },
      {
        NElogID: '12',
        userid: "itri_10.0.2.17",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBDUFunction><id>0</id><NRCellDU><id>0</id><bWP>1</bWP></NRCellDU></GNBDUFunction></ME></config>",
        resp_data: "1",
        logtime: "2023-10-31 17:03:27.174804"
      },
      {
        NElogID: '13',
        userid: "itri_10.0.2.17",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBDUFunction><id>0</id><NRCellDU><id>0</id><NRSectorCarrier>0</NRSectorCarrier></NRCellDU></GNBDUFunction></ME></config>",
        resp_data: "1",
        logtime: "2023-10-31 17:03:25.265801"
      },
      {
        NElogID: '14',
        userid: "itri_10.0.2.17",
        operation: "edit-config",
        req_data: "<config><ME xmlns=\"urn:3gpp:tsg:sa5:nrm:ngran\" ><GNBCUFunction><id>0</id><NRCellCU><id>0</id><s-NSSAI>0</s-NSSAI></NRCellCU></GNBCUFunction></ME></config>",
        resp_data: "1",
        logtime: "2023-10-31 17:02:15.773772"
      },
      {
        NElogID: '15',
        userid: "itri_10.0.2.17",
        operation: "get-config",
        req_data: "",
        resp_data: "<active-alarm-list xmlns=\"urn:o-ran:fm:1.0\"> <active-alarms> <fault-id>1</fault-id> <fault-source>fault-source_1</fault-source> <affected-objects> <name>affected-objects_1-1</name> </affected-objects> <affected-objects> <name>affected-objects_1-2</name> </affected-objects> <fault-severity>MAJOR</fault-severity> <is-cleared>false</is-cleared> <fault-text>fault-text_1</fault-text> <event-time>2020-01-01T00:00:00Z</event-time> </active-alarms> <active-alarms> <fault-id>2</fault-id> <fault-source>fault-source_2</fault-source> <affected-objects> <name>affected-objects_2-1</name> </affected-objects> <affected-objects> <name>affected-objects_2-2</name> </affected-objects> <fault-severity>MINOR</fault-severity> <is-cleared>false</is-cleared> <fault-text>fault-text_2</fault-text> <event-time>2020-01-11T00:00:00Z</event-time> </active-alarms> <active-alarms> <fault-id>3</fault-id> <fault-source>fault-source_3</fault-source> <affected-objects> <name>affected-objects_3-1</name> </affected-objects> <affected-objects> <name>affected-objects_3-2</name> </affected-objects> <fault-severity>CRITICAL</fault-severity> <is-cleared>false</is-cleared> <fault-text>fault-text_3</fault-text> <event-time>2020-01-01T00:00:00Z</event-time> </active-alarms> </active-alarm-list>",
        logtime: "2023-10-31 17:03:04.549773"
      }
    ]
  };
}
