import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/common.service';
import { LanguageService } from 'src/app/shared/service/language.service';

export interface NfPerformanceList {
  nfname: string;
  nfId: string;
  ocloudId: string;
  ocloudName: string;
  cpuLoading: string;
  memoryUsage: string;
  diskUsage: string;
  networkThroughput: string;
}

@Component({
  selector: 'app-nf-performance',
  templateUrl: './nf-performance.component.html',
  styleUrls: ['./nf-performance.component.scss']
})
export class NfPerformanceComponent implements OnChanges, OnInit {
  @Input() refreshTimeout!: any;
  @Input() refreshTime!: number;
  @Input() ocloudId!: string;
  @Input() ocloudName!: string;
  @Input() nfId!: string;
  @Input() nfName!: string;
  @Input() afterAdvancedForm!: FormGroup;
  @Input() isSettingAdvanced = false;
  nfPerformanceList: NfPerformanceList[] = [];
  selectperformance!: NfPerformanceList;
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數

  constructor(
    private router: Router,
    private commonService: CommonService,
    public languageService: LanguageService
  ) { }

  ngOnChanges() {
    console.log('NfPerformanceComponent.isSettingAdvanced=' + this.isSettingAdvanced);
    if (this.isSettingAdvanced) {
      this.getNfPmAdvanceSearchList();
    } else {
      this.getNfPerformanceList();
    }
  }

  ngOnInit(): void { }

  getNfPerformanceList() {
    console.log('queryNfPerformanceList params:');
    console.log(`ocloudId=${this.ocloudId}`);
    console.log(`ocloudName=${this.ocloudName}`);
    console.log(`nfId=${this.nfId}`);
    console.log(`nfName=${this.nfName}`);
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.nfPerformanceList = this.commonService.nfPerformanceList;
      this.performanceListDeal();

    } else {
      this.commonService.queryNfPerformanceList(this.ocloudId, this.ocloudName, this.nfId, this.nfName).subscribe(
        res => {
          console.log('queryNfPerformanceList:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.nfPerformanceList = JSON.parse(str);
          this.performanceListDeal();
        }
      );
    }
  }

  performanceListDeal() {
    this.totalItems = this.nfPerformanceList.length;
    this.refreshTimeout = window.setTimeout(() => this.getNfPerformanceList(), this.refreshTime * 1000);      // refresh
  }

  getNfPmAdvanceSearchList() {
    console.log('queryNfPmAdvanceSearch afterAdvancedForm:');
    console.log(this.afterAdvancedForm.value);
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.nfPerformanceList = this.commonService.nfPmAdvanceSearchList;
      this.nfPmAdvanceSearchListDeal();

    } else {
      this.commonService.queryNfPmAdvanceSearch(this.afterAdvancedForm).subscribe(
        res => {
          console.log('queryNfPmAdvanceSearchList:');
          console.log(res);
          const str = JSON.stringify(res);
          this.nfPerformanceList = JSON.parse(str);
          this.nfPmAdvanceSearchListDeal();
        }
      );
    }
  }

  nfPmAdvanceSearchListDeal() {
    this.totalItems = this.nfPerformanceList.length;
    this.refreshTimeout = window.setTimeout(() => this.getNfPmAdvanceSearchList(), this.refreshTime * 1000);      // refresh
  }

  viewPage(nfPerformanceList: NfPerformanceList) {
    this.router.navigate(['/main/nf-performance-info', nfPerformanceList.nfId, nfPerformanceList.nfname]);
  }

  pageChanged(page: number) {
    this.p = page;
  }

}
