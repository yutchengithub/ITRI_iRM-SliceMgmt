import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { LanguageService } from 'src/app/shared/service/language.service';

export interface PerformanceList {
  id: string;
  name: string;
  cpuLoading: string;
  memoryUsage: string;
  diskUsage: string;
  networkThroughput: string;
}

@Component({
  selector: 'app-o-cloud-performance',
  templateUrl: './o-cloud-performance.component.html',
  styleUrls: ['./o-cloud-performance.component.scss']
})
export class OCloudPerformanceComponent implements OnChanges, OnInit {
  @Input() refreshTimeout!: any;
  @Input() refreshTime!: number;
  @Input() ocloudId!: string;
  @Input() ocloudName!: string;
  @Input() afterAdvancedForm!: FormGroup;
  @Input() isSettingAdvanced = false;
  performanceList: PerformanceList[] = [];
  createForm!: FormGroup;
  selectperformance!: PerformanceList;
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  constructor(
    private router: Router,
    private commonService: CommonService,
    public languageService: LanguageService
  ) { }

  ngOnChanges() {
    console.log('OCloudPerformanceComponent.isSettingAdvanced=' + this.isSettingAdvanced);
    if (this.isSettingAdvanced) {
      this.getOcPmAdvanceSearchList();
    } else {
      this.getPerformanceManagementList();
    }
  }

  ngOnInit(): void { }

  getPerformanceManagementList() {
    console.log('queryPerformanceList params:');
    console.log(`ocloudId=${this.ocloudId}`);
    console.log(`ocloudName=${this.ocloudName}`);
    clearTimeout(this.refreshTimeout);
    // this.p = 1;
    if (this.commonService.isLocal) {
      /* local file test */
      this.performanceList = this.commonService.performanceList;
      this.performanceListDeal();

    } else {
      this.commonService.queryPerformanceList(this.ocloudId, this.ocloudName).subscribe(
        res => {
          console.log('queryPerformanceList:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.performanceList = JSON.parse(str);
          //this.ocloudList = res as OCloudList[];
          this.performanceListDeal();
        }
      );
    }
  }

  performanceListDeal() {
    this.totalItems = this.performanceList.length;
    // console.log(this.performanceList);
    // for (let i = 0; i < this.performanceList.length; i++) {
    //   if (
    //     this.performanceList[i].cpuLoading != 'N/A' ||
    //     this.performanceList[i].memoryUsage != 'N/A' ||
    //     this.performanceList[i].diskUsage != 'N/A' ||
    //     this.performanceList[i].networkThroughput != 'N/A'
    //   ) {
    //     this.performanceList[i].cpuLoading += ' %';
    //     this.performanceList[i].memoryUsage += ' GB';
    //     this.performanceList[i].diskUsage += ' MB';
    //     this.performanceList[i].networkThroughput += ' Kbps';
    //   }
    // }
    // refresh
    this.refreshTimeout = window.setTimeout(() => this.getPerformanceManagementList(), this.refreshTime * 1000);
  }

  getOcPmAdvanceSearchList() {
    console.log('queryOcPmAdvanceSearch afterAdvancedForm:');
    console.log(this.afterAdvancedForm.value);
    // console.log('this.ocloudId=' + this.ocloudId);
    clearTimeout(this.refreshTimeout);
    // this.p = 1;
    if (this.commonService.isLocal) {
      /* local file test */
      this.performanceList = this.commonService.ocPmAdvanceSearchList;
      this.ocPmAdvanceSearchListDeal();

    } else {
      this.commonService.queryOcPmAdvanceSearch(this.afterAdvancedForm).subscribe(
        res => {
          console.log('queryPerformanceList:');
          console.log(res);
          const str = JSON.stringify(res);
          this.performanceList = JSON.parse(str);
          this.ocPmAdvanceSearchListDeal();
        }
      );
    }
  }

  ocPmAdvanceSearchListDeal() {
    this.totalItems = this.performanceList.length;
    this.refreshTimeout = window.setTimeout(() => this.getOcPmAdvanceSearchList(), this.refreshTime * 1000);
  }

  viewPage(performanceList: PerformanceList) {
    this.router.navigate(['/main/o-cloud-performance-info', performanceList.id, performanceList.name]);
  }

  pageChanged(page: number) {
    this.p = page;
  }

}
