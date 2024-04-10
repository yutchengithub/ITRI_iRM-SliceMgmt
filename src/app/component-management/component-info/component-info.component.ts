import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../shared/common.service';
import { SoftwareList } from './../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';
import { FmsgList } from './../../fault-management/fault-management.component';
import { FaultMessages } from './../../fault-management/fault-management.component';
import { Subscription } from 'rxjs';
import { XMLParser } from "fast-xml-parser";
import * as xmlJs from 'xml-js';

//component Info
export interface ComponentInfo {
  id: string;
  name: string;
  ip: string;
  port: string;
  account: string;
  key: string;
  comtype: number;
  firm: string;
  modelname: string;
  status: number;
  info: Info;
  sm: {
    "software-inventory": {
      "software-slot": SoftwareSlot[];
    };
  };
}
export interface Uploadinfos {
  id: string;
  firm: string;
  modelname: string;
  uploadtime: string;
  uploadtype: number;
  uploadversion: string;
  description: string;
  uploadinfo: string;
  uploadurl: string;
}

export interface ComponentInfosw{
  uploadinfos: Uploadinfos[];
}

export interface Info {
  data: string;
}

interface SoftwareSlot {
  name: string;
  status: string;
  active?: string;
  running?: string;
  access?: string;
  "vendor-code"?: string;
  "build-id"?: string;
  "build-name"?: string;
  "build-version"?: string;
  files?: Files;
}
interface Files {
  name: string;
  version: string;
  localPath: string;
  integrity: string;
}

export interface UploadFileList {
  session: string;
  firm: string;
  modelname: string;
  uploadtype: number;
}
interface JsonObject {
  [key: string]: any;
}
interface TreeNode {
  key: string;
  value: any;
  type: string;
  children?: TreeNode[];
}
@Component({
  selector: 'app-component-info',
  templateUrl: './component-info.component.html',
  styleUrls: ['./component-info.component.scss']
})


export class ComponentInfoComponent implements OnInit {
  sessionId: string = '';
  cloudId: string = '';
  cloudName: string = '';
  newip: string = '';
  comId: string = '';
  // utilizationPercent: number = 0;
  componentInfo: ComponentInfo = {} as ComponentInfo;
  softwareList: SoftwareList[] = [];
  componentInfosw: ComponentInfosw = {} as ComponentInfosw;
  systemSummary: SystemSummary = {} as SystemSummary;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  RunRefreshTimeout!: any;
  RunRefreshTime: number = 3;
  refreshTimeout!: any;
  ListRefreshTime: number = 5;
  @ViewChild('updateModal') updateModal: any;
  @ViewChild('updateIPModal') updateIPModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateIPModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;
  uploadinfos: Uploadinfos[] = [];
  /* CRITICAL,MAJOR,MINOR,WARNING */
  severitys: string[];
  cmpsource: string[];
  fmsgList: FmsgList = {} as FmsgList;
  searchForm!: FormGroup;
  p: number = 1;            // 當前頁數
  pageSize: number = 5;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  queryFaultMessageScpt!: Subscription;
  nullList: string[] = [];  // 給頁籤套件使用
  timeSort: '' | 'asc' | 'desc' = '';
  isSearch: boolean = false;
  filteredFmList: FaultMessages[] = [];
  isActive = false;
  jsonData: any = {};
  xmlString: string = '';
  treeData: TreeNode[] = [];
  treeKey: string = '';
  treeValue: any;
  json = {
    // "netconf-server": {
    //   "listen": {
    //     "endpoint": {
    //       "name": "default-ssh",
    //       "ssh": {
    //         "tcp-server-parameters": {
    //           "local-address": "0.0.0.0",
    //           "local-port": 11830,
    //           "keepalives": {
    //             "idle-time": 1,
    //             "max-probes": 10,
    //             "probe-interval": 5
    //           }
    //         },
    //         "ssh-server-parameters": {
    //           "server-identity": {
    //             "host-key": {
    //               "name": "default-key",
    //               "public-key": {
    //                 "keystore-reference": "genkey"
    //               }
    //             }
    //           },
    //           "client-authentication": {
    //             "supported-authentication-methods": {
    //               "publickey": "",
    //               "passsword": "",
    //               "other": "interactive"
    //             },
    //             "users": ""
    //           }
    //         }
    //       }
    //     }
    //   },
    //   "xmlns": "urn:ietf:params:xml:ns:yang:ietf-netconf-server"
    // },
    "keystore": {
      "asymmetric-keys": {
        "asymmetric-key": {
          "name": "genkey",
          "algorithm": "rsa2048",
          "public-key": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuC0geCmiQYrqdP5dzTPn\n    /3nMzQJlGSqiGysPOgq9Tm8T+oHO+kuZmXHbNZI8/EB8WyIbsVlnOUIkBJItf3I0\n    c74uBU75mILh9CZahIJ0dsAbrGGEYWpuODJP3/i3oERcWBmrfb9mT/8FLW8/TSXv\n    Yncg2TcOc6XVgfbYVHNacwAccshEcWvEVpxT8hG/8yYUyZFZMW18063ijv3mgkWR",
          "private-key": "MIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQC4LSB4KaJBiup0\n    /l3NM+f/eczNAmUZKqIbKw86Cr1ObxP6gc76S5mZcds1kjz8QHxbIhuxWWc5QiQE\n    ki1/cjRzvi4FTvmYguH0JlqEgnR2wBusYYRham44Mk/f+LegRFxYGat9v2ZP/wUt\n    bz9NJe9idyDZNw5zpdWB9thUc1pzABxyyERxa8RWnFPyEb/zJhTJkVkxbXzTreKO\n    /eaCRZFsop2TgSXGm5G7DhpZmq3imCYjgNJ1hRZeI40+ayRkzOhE0rz7zer2N8dv\n    ESvK55Aoq/2TnABe0rCV8v7IpdIFyOa2/VGaezZZ+QVbGMTSPuPQnXY2QmxV2Jd3"
        }
      },
      "xmlns": "urn:ietf:params:xml:ns:yang:ietf-keystore"
    }
  };
  activeMap: any = {
    box1 : true,
    box2 : false,
    box3 : false,
    box4 : false,
    box5 : false
  };

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };
  isObject(value: any): boolean {
    return typeof value === 'object' && value !== null;
  }
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public languageService: LanguageService
  ) {
    this.severitys = this.commonService.severitys;
    this.cmpsource = this.commonService.cmpsource;
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.comId = params['id'];
      this.getComponentInfo();
      //this.getFaultMessage();
      this.search();
      
    });
  }
  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
  }
  getComponentInfo() {
    const parseOption = {
      cdataTagName: "![CDATA[",
      cdataPositionChar: "\\c",
      attributeNamePrefix: "",
      attrNodeName: "attr",
      textNodeName: "#text",
      ignoreAttributes: false,
      ignoreNameSpace: false,
      allowBooleanAttributes: false,
      parseNodeValue: false,
      parseAttributeValue: false,
      trimValues: true,
      parseTrueNumberOnly: false,
      numParseOptions: {
        hex: true,
        leadingZeros: true,
      },
      arrayMode: false,
      stopNodes: ["parse-me-as-string"],
      alwaysCreateTextNode: false,
    };
    if (this.commonService.isLocal) {
      /* local file test */
      this.componentInfo = this.commonService.componentInfo;
      this.cmpsource = this.commonService.cmpsource;
      const xmldata = this.commonService.bsComponentInfo.info.data;
      const parser = new XMLParser(parseOption);
      const output = parser.parse(xmldata);
      //console.log('Json output: ',output);
      //console.log('Json output: ', JSON.stringify(output, null, 2));
    } else {
      this.cmpsource = this.commonService.cmpsource;
      this.commonService.queryBsComponentInfo(this.comId).subscribe(
        (res: ComponentInfo) => {
          console.log('queryComponentInfo:', res);
          this.componentInfo = res;
          const xmldata = this.commonService.bsComponentInfo.info.data;
          const parser = new XMLParser(parseOption);
          const output = parser.parse(xmldata);
          this.jsonData = output;
          const xmlData = xmlJs.js2xml(this.jsonData, { compact: true, ignoreComment: true, spaces: 4 });
          this.getfilterQueryUploadFileList();
          const jsonstr = JSON.stringify(output, null, 2);//get in string
          //console.log('Json string: ',jsonstr);
          //this.treeData = this.buildTree(this.jsonData);
          this.treeData = this.buildTree(this.jsonData);
          //console.log('Tree Data:', this.treeData);
          console.log(xmlData);
          console.log('Json output: ', this.jsonData);
        },
        (error: any) => {
          console.error('Error loading ComponentInfo:', error);
        }
      );
    }
  }
  
  buildTree(obj: any): TreeNode[] {
    return Object.entries(obj).map(([key, value]) => {
      const node: TreeNode = { key, value, type: this.checkType(value) };
      if (node.type === 'object') {
        node.children = this.buildTree(value);
      }
      return node;
    });
    
  }
  mapUploadType(uploadType: number): string {
    switch (uploadType) {
        case 1:
            return 'CU';
        case 2:
            return 'DU';
        case 3:
            return 'RU';
        case 4:
            return 'CU+DU';
        case 5:
            return 'CU+DU+RU';
        default:
            return 'Unknown';
    }
  }
  checkType(obj: any): string {
    if (typeof obj === 'object' && obj !== null) {
      return 'object';
    } else {
      return typeof obj;
    }
  }
  loopThroughJSON(obj: any) {
    for (let key in obj) {
      if (typeof obj[key] === 'object') {
        if (Array.isArray(obj[key])) {
          // loop through array
          for (let i = 0; i < obj[key].length; i++) {
            this.loopThroughJSON(obj[key][i]);
          }
        } else {
          // call function recursively for object
          this.loopThroughJSON(obj[key]);
        }
      } else {
        // do something with value
        console.log(key + ': ' + obj[key]);
      }
    }
  }
  
  getfilterQueryUploadFileList() {
    this.formValidated = true;
    if (this.commonService.isLocal) {
      /* local file test */
      console.log('getfilterQueryUploadFileList');
    } else {
      const body = {
        session: this.sessionId,
        firm: this.componentInfo.firm,
        modelname: this.componentInfo.modelname,
        uploadtype: this.componentInfo.comtype
      };
      this.commonService.filterQueryUploadFileList(body).subscribe(
        (res: any) => {
          console.log('filterQueryUploadFileList:');
          console.log(res);
          this.uploadinfos = res.uploadinfos;
        }
      );
    }
  }
  
  // Getter to get the first item in the softwareSlot array or undefined if the array is empty
  get firstSoftwareSlot(): SoftwareSlot | undefined {
    return this.componentInfo?.sm['software-inventory']['software-slot'][0];
  }

   // 建立搜尋表單
   createSearchForm() {
    const nowTime = this.commonService.getNowTime();
    const compName = this.commonService.bsComponentInfo.name;

    this.searchForm = this.fb.group({
      'compName': new FormControl(compName),
      'severity': new FormControl('All'),
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)),   // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`))  // [Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]
    });
    this.severitys = this.commonService.severitys;
  }

  getFaultMessage() {
    //console.log('getFaultMessage:');
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.fmsgList = this.commonService.fmsgList;
      this.faultMessageDeal();
    } else {
      const emptyvalue = '';
      const severity = this.searchForm.controls['severity'].value;
      // const start = this.commonService.dealPostDate(this.searchForm.controls['from'].value);
      // const end = this.commonService.dealPostDate(this.searchForm.controls['to'].value);
      const offset = (this.p - 1) * this.pageSize;
      const limit = 10;
      if (this.queryFaultMessageScpt) this.queryFaultMessageScpt.unsubscribe();
      this.queryFaultMessageScpt = this.commonService.queryFaultMessage(emptyvalue, emptyvalue, emptyvalue, severity, '', '', offset, limit).subscribe(
        res => {
          console.log('getFaultMessage:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.fmsgList = JSON.parse(str);
          this.fmsgList = res as FmsgList;
          this.faultMessageDeal();
        }
      );
    }
  }
  faultMessageDeal() {
    //this.p = 1;
    this.totalItems = this.fmsgList.faultMessages.length;
    this.nullList = new Array(this.totalItems);
    //this.refreshTimeout = window.setTimeout(() => this.getFaultMessage(), this.ListRefreshTime * 1000);
    this.refreshTimeout = window.setTimeout(() => {
      if (this.p === 1) {
        //console.log(`page[${this.p}] ===> refresh.`);
        // if (this.isSettingAdvanced) {
        //   this.getFMAdvanceSearch();
        // } else {
          this.getFaultMessage();
        // }

      } else {
        console.log(`page[${this.p}] ===> no refresh.`);
      }
    }, this.ListRefreshTime * 1000); //timeout 1000ms
  }

  search() {
    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1
    const comp_name = 'itri_10.0.2.7';
    const severity_lv = this.searchForm.get('severity')?.value;
    const from = this.searchForm.get('from')?.value;
    const to = this.searchForm.get('to')?.value;
    // 格式化日期為所需的格式
    const formattedFrom = this.commonService.dealPostDate(from);
    const formattedTo = this.commonService.dealPostDate(to);

    // 清除以前的搜尋結果
    this.filteredFmList = [];
    this.isSearch = false;

    if (this.commonService.isLocal) {
      /* local file test */
      this.filteredFmList = this.fmsgList.faultMessages.filter(msg => {
        const isCompMatch = !comp_name || msg.compname.includes(comp_name);
        const isSeverityMatch = severity_lv === 'All' || msg.eventtype === severity_lv;
        const msgDate = new Date(msg.timestamp);
        const isAfterFrom = msgDate >= new Date(formattedFrom);
        const isBeforeTo = msgDate <= new Date(formattedTo);

        return isCompMatch && isSeverityMatch && isAfterFrom && isBeforeTo;
      });
      this.isSearch = true; // Local Search 完畢，設置標記為 true
      this.totalItems = this.filteredFmList.length; // 確保更新 totalItems 以反映搜尋結果的數量
    } else {

    }
  }

  clear_search() {
    this.createSearchForm();
    this.isSearch = false;
  }  
  get msgToDisplay(): FaultMessages[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    // 否則，顯示全部 this.fmsgList.faultMessages
    return this.isSearch ? this.filteredFmList : this.fmsgList.faultMessages;
  }

  pageChanged(page: number) {
    this.p = page;
    this.getFaultMessage();
  }

  openUpdateModal(nodeKey: string, nodeValue: any) {
    this.treeKey = nodeKey;
    this.treeValue = nodeValue;
    this.updateModalRef = this.dialog.open(this.updateModal, { id: 'updateModal' });
  }
  update() {
    const nodeKey = this.treeKey;
    const nodeValue = this.treeValue;
    if (this.commonService.isLocal) {
      /* local file test */
    } else {
      const parseOption = {
        compact: true,
        ignoreComment: true,
        ignoreDeclaration: true,
        ignoreInstruction: true,
        ignoreAttributes: false,
        attributesKey: "attr",
      };
      const convert = require('xml-js');
      const jsonObject: { [key: string]: any } = { [nodeKey]: nodeValue };
      const jsonString: string = JSON.stringify(jsonObject, null, 4);
      const { xmlns, ...rest } = jsonObject[nodeKey];
      const adjustedData = {[nodeKey]: {"attr": { "xmlns": xmlns },...rest}};
      //console.log(adjustedData);
      //const dd = {"netconf-server":{"attr":{"xmlns":"urn:ietf:params:xml:ns:yang:ietf-netconf-server"},"listen":{"endpoint":{"name":"default-ssh","ssh":{"tcp-server-parameters":{"local-address":"0.0.0.0","keepalives":{"idle-time":"1","max-probes":"10","probe-interval":"5"}},"ssh-server-parameters":{"server-identity":{"host-key":{"name":"default-key","public-key":{"keystore-reference":"genkey"}}},"client-authentication":{"supported-authentication-methods":{"publickey":"","passsword":"","other":"interactive"},"users":""}}}}}}};
      //console.log(jsonObject);
      console.log(jsonString);
      console.log(adjustedData);
      this.xmlString = convert.js2xml(adjustedData, parseOption);
      console.log(this.xmlString);
      //this.xmlString = xmlJs.js2xml(dd, { compact: true, spaces: 4 });
      // const tt = JSON.parse(jsonString);
      // const ok = xmlJs.js2xml(tt, { compact: true, spaces: 2 });
      // console.log(ok);
      // //this.xmlString = this.xmlString.replace(/\n\s*/g, '');
      // console.log(this.xmlString);
      const body: any = {
        session: this.sessionId,
        id: this.componentInfo.id,
        name: this.componentInfo.name,
        ip: this.componentInfo.ip,
        port: this.componentInfo.port,
        account: this.componentInfo.account,
        key: this.componentInfo.key,
        comtype: this.componentInfo.comtype,
        firm: this.componentInfo.firm,
        modelname: this.componentInfo.modelname,
        info: {
          data: this.xmlString
        }
      };
      console.log(body);
      //console.log(nodeKey);
      //console.log(nodeValue);
      this.commonService.updateBsComponent(body).subscribe(
        () => console.log('Update Successful.')
      );
      this.getComponentInfo();
      this.refresh();
    }
    this.getComponentInfo();
  }
  refresh() {
    clearTimeout(this.refreshTimeout);
    this.RunRefreshTimeout = window.setTimeout(() => this.getComponentInfo(), this.RunRefreshTime * 1000);
  }

  softwareDeal() {
    this.fileNameMapSoftware = new Map();
    this.softwareList.forEach((row) => {
      this.fileNameMapSoftware.set(row.fileName, row);
    });
  }

  softwareVersion(): string {
    const fileName = this.updateForm.controls['fileName'].value;
    if (fileName === '') {
      return '';
    } else {
      const software = this.fileNameMapSoftware.get(fileName) as any;
      return software.version;
    }
  }

  severityText(severity: string): string {
    return this.commonService.severityText(severity);
  }

  back() {
    this.router.navigate(['/main/component-mgr']);
  }

  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.cloudName, 'All']);
  }

  openUpdateModel() {
    this.formValidated = false;
    this.updateForm = this.fb.group({
      'type': new FormControl('imageUrl'),
      'imageUrl': new FormControl('', [Validators.required]),
      'fileName': new FormControl('')
    });
    this.updateModalRef = this.dialog.open(this.updateModal, { id: 'updateModal' });
    this.updateModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

  updateBasicError: boolean = false;
  openUpdateIPModel() {
    this.formValidated = false;
    this.updateForm = this.fb.group({
      newip: ['',],
    });
    this.updateIPModalRef = this.dialog.open(this.updateIPModal, { id: 'updateIPModal' });
    this.updateIPModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

  changeType(e: MatButtonToggleChange) {
    this.formValidated = false;
    if (e.value === 'imageUrl') {
      this.updateForm.controls['imageUrl'].setValidators([Validators.required]);
      this.updateForm.controls['fileName'].setValidators(null);
      this.updateForm.controls['fileName'].setValue('');
    } else {
      this.updateForm.controls['imageUrl'].setValidators(null);
      this.updateForm.controls['imageUrl'].setValue('');
      this.updateForm.controls['fileName'].setValidators([Validators.required]);
    }
    this.updateForm.controls['imageUrl'].updateValueAndValidity();
    this.updateForm.controls['fileName'].updateValueAndValidity();
  }


  updateNFSuccessful: boolean | null = null; 
  hideUpdateIcon() {
    setTimeout(() => {
      this.updateNFSuccessful = null;
    }, 3000);
  }

  
  clickBox(key: string) {
    Object.keys(this.activeMap).forEach((k) => {
      console.log(k)
      this.activeMap[k] = false;
    });
    this.activeMap[key] = true;
  }
 

}
