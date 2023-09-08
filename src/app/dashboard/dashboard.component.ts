import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from '../shared/common.service';
import * as _ from 'lodash';
import { Router } from '@angular/router';
																									
import { LanguageService } from '../shared/service/language.service';

export interface SystemSummary {
  ocloudCount: number;
  nfCount: number;
  totalCritical: number;
  totalMajor: number;
  totalMinor: number;
  totalWarning: number;
  avgCpu: string;
  totalMemory: string;
  avgStorage: string;
  avgNetwork: string;
}

export interface FieldSummary {
  fieldSummaryInfo: FieldSummaryInfo[];
}

export interface FieldSummaryInfo {
  bsNum: number;
  fieldNum: number;
  ueNum: string;
}

export interface FieldList {
  fields: Fields[];
}

export interface Fields {
  id: string;
  name: string;
  phone: string;
  fieldposition1: string;
  fieldposition2: string;
  fieldposition3: string;
  fieldposition4: string;
  bsinfo: Bsinfo[];
  bsNum: number;
  ueNum: string;
  coverage: string;
  accessibility: string;
  availability: string;
  mobility: string;
  retainability: string;
  energy: string;
  integrity: Integrity;
  utilization: Utilization;
  alarmCriticalNum: number;
  alarmMajorNum: number;
  alarmMinorNum: number;
  alarmWarningNum: number;
}

export interface Bsinfo {
  id: string;
  name: string;
}

export interface Integrity {
  downlinkDelay: string;
  uplinkDelay: string;
  downlinkThrouthput: string;
  uplinkThrouthput: string;
}

export interface Utilization {
  pdu: string;
  resourceProcess: string;
  resourceMemory: string;
  resourceDisk: string;
  maxPdu: string;
}

export interface OcloudSummary {
  id: string;
  name: string;
  dmsCount: number,
  nfCount: number,
  faultCount: number,
  ocloudSummary?: OcloudSummary
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sessionId: string = '';
  systemSummary: SystemSummary = {} as SystemSummary;
  fieldSummary: FieldSummary = {} as FieldSummary;
  fieldList: FieldList = {} as FieldList;
  ueNumList: string[] = [];
  ocloudSummary: OcloudSummary[] = [];
  // utilizationPercent: number = 0;
  resizeTime: any;
  circularHeight!: number;
  ueNum: string = '0';
					  
  showVircularGauge: boolean = false;
  /* CRITICAL,MAJOR,MINOR,WARNING */
  severitys: string[];

  // @HostListener('window:resize') onResize() {
  //   this.resize();
  // }

  constructor(private http: HttpClient, public commonService: CommonService, private router: Router, public languageService: LanguageService) {
    this.severitys = this.commonService.severitys;
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    // Field Summary
    this.getfieldSummaryInfo();
    this.getfieldListInfo();
    // Ocloud Summary
    this.getOcloudSummary();
  }

  getSystemSummary() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.systemSummary = this.commonService.systemSummary;
      this.systemSummaryDeal();
    } else {
      const url = `${this.commonService.restPath}/querySystemSummary/${this.sessionId}`;
      this.http.get(url).subscribe(
        res => {
          console.log('getSystemSummary:');
          console.log(res);
          this.systemSummary = res as SystemSummary;
          this.systemSummaryDeal();
        }
      );
    }
  }

  getfieldSummaryInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.fieldSummary = this.commonService.fieldSummary;
	    this.fieldSummary.fieldSummaryInfo.forEach(field => {
        this.ueNum = (field.ueNum.match(/\d+/)?.[0] || '0').toString();
      //field.ueNum = extractedNumber;
      });
      console.log('fieldSummaryInfo:', this.fieldSummary);				
      this.systemSummaryDeal();
    } else {
      const url = `${this.commonService.restPath}/queryFieldSummaryInfo/${this.sessionId}`;
      this.http.get(url).subscribe(
        res => {
          console.log('queryFieldSummaryInfo:');
          console.log(res);
          this.fieldSummary = res as FieldSummary;
          this.systemSummaryDeal();
        }
      );
    }
  }

  getfieldListInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.fieldList = this.commonService.fieldList;
      this.systemSummaryDeal();
    } else {
      const url = `${this.commonService.restPath}/queryFieldList/${this.sessionId}`;
      this.http.get(url).subscribe(
        res => {
          console.log('queryFieldList:');
          console.log(res);
          this.fieldList = res as FieldList;
          this.systemSummaryDeal();
        }
      );
    }
  }

  NumUes(inputString: string): string {
    const matches = inputString.match(/\d+/);
    return matches ? matches[0] : '0';
  }

  systemSummaryDeal() {
    // this.utilizationPercent = Math.floor((Number(this.systemSummary.usedNodes) / Number(this.systemSummary.totalNodes)) * 100);
    // window.setTimeout(() => {
    //   this.showVircularGauge = true;
    //   this.resize();
    // }, 0);
    // if (this.systemSummary.avgCpu != 'N/A' || this.systemSummary.avgStorage != 'N/A' ||
    //   this.systemSummary.totalMemory != 'N/A' || this.systemSummary.avgNetwork != 'N/A' ) {
    //     this.systemSummary.avgCpu += ' %';
    //     this.systemSummary.totalMemory += ' GB';
    //     this.systemSummary.avgStorage += ' MB';
    //     this.systemSummary.avgNetwork += ' Kbps';
    //   }
  }

  getOcloudSummary() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudSummary = this.commonService.ocloudSummary;
      this.ocloudSummaryDeal();
    } else {
      const url = `${this.commonService.restPath}/queryOcloudSummary/${this.sessionId}`;
      this.http.get(url).subscribe(
        res => {
          console.log('getOcloudSummary:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.ocloudSummary = JSON.parse(str);
          this.ocloudSummaryDeal();
        }
      );
    }
  }

  ocloudSummaryDeal() {
    this.ocloudSummary.forEach((row) => {
      row.ocloudSummary = row;
    });
  }

  view(fields: Fields) {
    //console.log(ocloudSummary);
    this.router.navigate(['/main/field-mgr/info', fields.id]);
  }

  viewMore() {
    this.router.navigate(['/main/fault-mgr', 'All','All']);
  }

  severityCount(severity: string): number {
    if (severity.toUpperCase() === this.severitys[0]) {
      return this.systemSummary.totalCritical;
    } else if (severity.toUpperCase() === this.severitys[1]) {
      return this.systemSummary.totalMajor;
    } else if (severity.toUpperCase() === this.severitys[2]) {
      return this.systemSummary.totalMinor;
    } else if (severity.toUpperCase() === this.severitys[3]) {
      return this.systemSummary.totalWarning;
    } else {
      return 0;
    }
  }

  severityText(severity: string): string {
    return this.commonService.severityText(severity);
  }

  // resize() {
  //   clearTimeout(this.resizeTime);
  //   this.resizeTime = window.setTimeout(() => {
  //     const nodeElement = document.querySelector('.nodes') as HTMLDivElement;
  //     const chartElement = document.querySelector('.chart') as HTMLDivElement;
  //     this.circularHeight = nodeElement.getBoundingClientRect().top + nodeElement.offsetHeight - chartElement.getBoundingClientRect().top;
  //     console.log('circularHeight = ' + this.circularHeight);
  //   }, 0);
  // }

}
