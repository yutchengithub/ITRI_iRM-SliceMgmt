import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './../../shared/common.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { reduce, size } from 'lodash';
import { LanguageService } from 'src/app/shared/service/language.service';

export interface Tabs {
  index: number;
  diplayName: string;
  value: 'all' | 'cpuUsage' | 'cpuLoading' | 'memoryUsage' | 'diskUsage' | 'diskRate' | 'interfaceUsage' | 'networkThroughput' | 'power';
  loacalDataStr?: string;
  apiUrl?: string;
  intervalType?: 'real-time' | '1-day' | '7-day' | '30-day' | 'custom';
  from?: Date;
  to?: Date;
  chartData?: any;    // big chart data
  chartOption?: any;  // big chart option
  yLabel?: string;
  yChartMax?: number;
  show?: boolean;
}

export interface NfOverviewKpi {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  cpuUsage: string[];
  cpuLoading: string[];
  memoryUsage: string[];
  diskUsage: string[];
  diskRate: string[];
  interfaceUsage: string[];
  networkThroughput: string[];
  power: string[];
  all?: string[];
}

export interface NfCpuUsage {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  cpuUsage: string[];
}

export interface NfCpuLoading {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  cpuLoading: string[];
}

export interface NfMemoryUsage {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  memoryUsage: string[];
}

export interface NfDiskUsage {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  diskUsage: string[];
}

export interface NfDiskRate {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  diskRate: string[];
}

export interface NfInterfaceUsage {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  interfaceUsage: string[];
}

export interface NfNetworkThroughput {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  networkThroughput: string[];
}

export interface NfPower {
  nfId: string;
  startTime: string;
  endTime: string;
  interval: number;
  tickInterval: number;
  power: string[];
}

@Component({
  selector: 'app-nf-performance-info',
  templateUrl: './nf-performance-info.component.html',
  styleUrls: ['./nf-performance-info.component.scss']
})
export class NfPerformanceInfoComponent implements OnInit {

  sessionId: string = '';
  nfId: string = '';
  name: string = '';
  refreshTimeout!: any;
  refreshTime: number = 300;
  activeIndex: number = 0;
  nfOverviewKpi: NfOverviewKpi = {} as NfOverviewKpi;
  tabs: Tabs[] = [
    {
      index: 0,
      diplayName: 'Overview',
      value: 'all'
    },
    {
      index: 1,
      diplayName: 'CPU Usage (%)',
      value: 'cpuUsage',
      yLabel: 'CPU Usage (%)',
      yChartMax: 100,
      apiUrl: 'queryNfCpuUsage',
      loacalDataStr: 'nfCpuUsage'
    },
    {
      index: 2,
      diplayName: 'CPU Loading (%)',
      value: 'cpuLoading',
      yLabel: 'CPU Loading (%)',
      yChartMax: 100,
      apiUrl: 'queryNfCpuLoading',
      loacalDataStr: 'nfCpuLoading'
    },
    {
      index: 3,
      diplayName: 'Memory Usage (GB)',
      value: 'memoryUsage',
      yLabel: 'Memory (GB)',
      apiUrl: 'queryNfMemoryUsage',
      loacalDataStr: 'nfMemoryUsage'
    },
    {
      index: 4,
      diplayName: 'Disk Usage (MB)',
      value: 'diskUsage',
      yLabel: 'Disk Usage (MB)',
      apiUrl: 'queryNfDiskUsage',
      loacalDataStr: 'nfDiskUsage'
    },
    {
      index: 5,
      diplayName: 'Disk Rate (KBps)',
      value: 'diskRate',
      yLabel: 'Disk Rate (KBps)',
      apiUrl: 'queryNfDiskRate',
      loacalDataStr: 'nfDiskRate'
    },
    {
      index: 6,
      diplayName: 'Interface Usage (%)',
      value: 'interfaceUsage',
      yLabel: 'Interface (%)',
      yChartMax: 100,
      apiUrl: 'queryNfInterfaceUsage',
      loacalDataStr: 'nfInterfaceUsage'
    },
    {
      index: 7,
      diplayName: 'Network Throughput (Kbps)',
      value: 'networkThroughput',
      yLabel: 'Network Throughput (Kbps)',
      apiUrl: 'queryNfNetworkThroughput',
      loacalDataStr: 'nfNetworkThroughput'
    },
    {
      index: 8,
      diplayName: 'Power (W)',
      value: 'power',
      yLabel: 'Power (W)',
      apiUrl: 'queryNfPower',
      loacalDataStr: 'nfPower'
    }
  ];
  indexMapTab: Map<number, Tabs> = new Map();
  valueMapTab: Map<string, Tabs> = new Map();
  nfOverviewChart: any = { chartList: [] };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    public languageService: LanguageService
  ) {
    const nowTime = this.commonService.getNowTime();
    this.tabs.forEach((row) => {
      this.indexMapTab.set(row.index, row);
      this.valueMapTab.set(row.value, row);
      row.chartData = {};
      row.chartOption = {};
      row.intervalType = 'real-time';
      row.from = new Date(`${nowTime.year}-${nowTime.month}-01 00:00`);
      row.to = new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`);
    });
    // console.log('tabs:');
    // console.log(this.tabs);
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.nfId = params['nfId'];
      this.name = params['name'];
      this.getNfOverviewKpi();
    });
  }
  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
  }

  getNfOverviewKpi() {
    console.log('Do getNfOverviewKpi.');
    if (this.commonService.isLocal) {
      /* local file test */
      window.setTimeout(() => {
        this.nfOverviewKpi = this.commonService.nfOverviewKpi;
        this.dealOverviewKpi();
      });
    } else {
      this.commonService.queryNfOverviewKpi(this.nfId).subscribe(
        res => {
          console.log('getNfOverviewKpi:');
          console.log(res);
          this.nfOverviewKpi = res as NfOverviewKpi;
          this.dealOverviewKpi();
        }
      );
    }
  }

  dealOverviewKpi() {
    this.nfOverviewChart = { chartList: [] };
    const startTime = this.nfOverviewKpi.startTime;
    const endTime = this.nfOverviewKpi.endTime;
    const interval = this.nfOverviewKpi.interval;
    const tickInterval = this.nfOverviewKpi.tickInterval;
    const labels = this.getChartLabels(startTime, endTime, interval, tickInterval);
    this.tabs.forEach((row) => {
      const value = row.value;
      const data: number[] = [];
      if (value !== 'all') {
        this.nfOverviewKpi[value].forEach((v) => {
          const rep = this.dataReplaceStr(v);
          data.push(Number(v.replace(rep, '')));
        });
        // small chart
        this.nfOverviewChart.chartList.push(value);
        this.nfOverviewChart[value] = {
          data: {
            labels: labels,
            datasets: [
              {
                data: data,
                fill: false,
                borderColor: '#3B82F6',
                //borderColor: '#1d61a1',
                borderWidth: 1
              }
            ],
          },
          options: this.smallChartOpts(row.yChartMax as number)
        }
      }
    });
    // console.log(this.overviewChart);
    // console.log(this.tabs);
    // refresh
    this.refreshTimeout = window.setTimeout(() => this.getNfOverviewKpi(), this.refreshTime * 1000);
  }

  chartTitle(value: string): string {
    const row = this.valueMapTab.get(value) as Tabs;
    return row.diplayName;
  }

  changeTab(value: string) {
    const row = this.valueMapTab.get(value) as Tabs;
    this.activeIndex = row.index;
    if (row.value === 'all') {
      this.getNfOverviewKpi();
    } else {
      this.query(value);
    }
  }

  intervalText(): string {
    const interval = this.tabs[this.activeIndex]['intervalType'];
    if (interval === 'real-time') {
      return '- Data for last 2 hours';
    } else if (interval === '1-day') {
      return '- Data for last 1 day';
    } else if (interval === '7-day') {
      return '- Data for last 7 days';
    } else if (interval === '30-day') {
      return '- Data for last 30 days';
    } else {
      return '';
    }
  }

  showDateError(): boolean {
    const tab = this.tabs[this.activeIndex];
    const startDate = moment(tab.from);
    const endDate = moment(tab.to);
    // 計算兩者差異年數
    const years = endDate.diff(startDate, 'years');
    if (years >= 3) {
      return true;
    } else {
      return false;
    }
  }

  query(value: string) {
    clearTimeout(this.refreshTimeout);
    const tab = this.valueMapTab.get(value) as Tabs;
    // console.log(tab);
    let timeStr = '';
    if (tab.intervalType === 'custom') {
      if (this.showDateError()) return;
      const start = this.commonService.dealPostDate(tab.from);
      const end = this.commonService.dealPostDate(tab.to);
      timeStr = `&start=${start}&end=${end}`;
    }
    console.log('Do query.');
    if (this.commonService.isLocal) {
      /* local file test */
      window.setTimeout(() => {
        const loacalDataStr = tab.loacalDataStr as string;
        this.dealQuery(tab, (this.commonService as any)[loacalDataStr]);    // 動態取commonService屬性data
      });
    } else {
      let url = `${this.commonService.restPath}/${tab.apiUrl}/${this.sessionId}/${this.nfId}&type=${tab.intervalType}`;
      if (tab.intervalType === 'custom') {
        url += timeStr;
      }
      this.http.get(url).subscribe(
        res => {
          console.log('query:');
          console.log(res);
          this.dealQuery(tab, res);
        }
      );
    }
  }

  dealQuery(tab: Tabs, res: any) {
    // console.log(tab)
    // console.log(res);
    const intervalType = this.tabs[this.activeIndex]['intervalType'];
    const values = this.tabs[this.activeIndex]['value'];
    const startTime = res.startTime;
    const endTime = res.endTime;
    const interval = res.interval;
    const tickInterval = res.tickInterval;
    const labels = this.getChartLabels(startTime, endTime, interval, tickInterval);
    const list: string[] = res[tab.value];
    const data: number[] = [];
    list.forEach((v) => {
      const rep = this.dataReplaceStr(v);
      data.push(Number(v.replace(rep, '')));
    });
    // console.log(data);
    // console.log(labels);
    //Single Charts
    tab.chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          fill: false,
          borderColor: '#3B82F6',
          //borderColor: '#1d61a1',
          borderWidth: 2
        }
      ],
    }
    tab.chartOption = this.bigChartOpts(tab.yLabel as string, tab.yChartMax as number);
    //console.log(intervalType);
    if (intervalType === 'real-time') {
      this.refreshTimeout = window.setTimeout(() => this.query(values), 15000);// 5 mins 300000
    } else if (intervalType === '1-day') {
      this.refreshTimeout = window.setTimeout(() => this.query(values), 15000);//15 mins 900000
    } else if (intervalType === '7-day') {
      this.refreshTimeout = window.setTimeout(() => this.query(values), 15000);// 60 mins 3600000
    } else if (intervalType === '30-day') {
      this.refreshTimeout = window.setTimeout(() => this.query(values), 15000);// 6 hours 21600000
    }
  }

  linechartcolor(): string {
    // console.log('linechartcolor');
    const styleType = window.sessionStorage.getItem('styleType');
    if (styleType === 'black') {
      return 'white';
    } else {
      return 'black';
    }
  }

  smallChartOpts(yChartMax: number): {} {
    // console.log('smallChartOpts');
    return {
      animation: false,
      elements: {
        point: {
          radius: 0
        }
      },
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: this.linechartcolor(),
            //color: '#495057',
            //autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          },
          grid: {
            display: false,
            color: '#ebedef',
            borderColor: this.linechartcolor()
            //borderColor: '#696b6b'
          }
        },
        y: {
          max: yChartMax,
          beginAtZero: true,
          display: true,
          ticks: {
            color: this.linechartcolor()
          },
          grid: {
            display: false,
            borderColor: this.linechartcolor()
            //borderColor: '#696b6b'
          }
        }
      }
    }
  }

  bigChartOpts(yLabel: string, yChartMax: number) {
    console.log('bigChartOpts');
    return {
      animation: false,
      elements: {
        point: {
          radius: 0
        }
      },
      //line chart dot
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          ticks: {
            color: this.linechartcolor(),
            //color: '#696b6b',
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0
          },
          grid: {
            display: false,
            color: '#ebedef',
            borderColor: this.linechartcolor()
            //borderColor: '#696b6b'
          },
          title: {
            color: this.linechartcolor(),
            display: true,
            text: 'Time'
          }
        },
        y: {
          max: yChartMax,
          ticks: {
            color: this.linechartcolor(),
            //color: '#696b6b',
          },
          grid: {
            display: false,
            color: this.linechartcolor(),
            //color: '#696b6b',
            borderColor: this.linechartcolor()
            //borderColor: '#ffffff'
          },
          // display: false,
          beginAtZero: true,
          title: {
            color: this.linechartcolor(),
            display: true,
            text: yLabel,
          },
        }
      }
    }
  }

  dataReplaceStr(v: string): string {
    let rep = '';
    if (v.indexOf('%') >= 0) {
      rep = '%';
    } else if (v.indexOf('MB') >= 0) {
      rep = 'MB';
    } else if (v.indexOf('KBps') >= 0) {
      rep = 'KBps';
    } else if (v.indexOf('W') >= 0) {
      rep = 'W';
    } else if (v.indexOf('KB') >= 0) {
      rep = 'KB';
    }
    return rep;
  }

  getChartLabels(startTime: string, endTime: string, interval: number, tickInterval: number): any[] {
    const rangeInterval = tickInterval / interval;
    const rangeMin = minRange(startTime, endTime);
    const rangeIdx = (rangeMin) / tickInterval;
    //console.log("startTime ---> " +startTime);
    //console.log("endTime ---> " +endTime);
    //console.log("rangeMin ---> " +rangeMin);
    //console.log("rangeIdx ---> " +rangeIdx);
    const labels: any[] = [];
    for (let i = 0; i < rangeIdx + 1; i++) {
      const time: Date = addMinutes(i * tickInterval, startTime);
      const m = time.getMonth();
      const d = time.getDate();
      const hour = time.getHours();
      const min = time.getMinutes();
      if (i !== 0) {
        for (let j = 1; j < rangeInterval; j++) {
          labels.push([]);
        }
      }
      labels.push([`${addZero(hour)}:${addZero(min)}`, `${addZero(m + 1)}/${addZero(d)}`]);
    }
    return labels;
  }

  back() {
    this.router.navigate(['/main/performance-mgr', 'nf', 'All', 'All']);
  }

  drawColorChange() {
    // console.log(this);
    const linechartcolor = this.linechartcolor();
    if (this.activeIndex === 0) {
      const chartList: string[] = this.nfOverviewChart.chartList;
      chartList.forEach((c) => {
        this.nfOverviewChart[c].options.scales.x.ticks.color = linechartcolor;
        this.nfOverviewChart[c].options.scales.x.grid.borderColor = linechartcolor;
        this.nfOverviewChart[c].options.scales.y.ticks.color = linechartcolor;
        this.nfOverviewChart[c].options.scales.y.grid.borderColor = linechartcolor;
      });
    } else {
      const yLabel = this.tabs[this.activeIndex].yLabel as string;
      const yChartMax = this.tabs[this.activeIndex].yChartMax as number;
      this.tabs[this.activeIndex].chartOption = this.bigChartOpts(yLabel, yChartMax);
    }
  }
}

function minRange(start: string, end: string): number {
  var beginDate: any = new Date(start);
  var endDate: any = new Date(end);
  return (endDate - beginDate) / (1000 * 60);
}

function addMinutes(numOfMinutes: number, dateStr: string) {
  const date = new Date(dateStr);
  date.setMinutes(date.getMinutes() + numOfMinutes);
  return date;
}

function addZero(num: number): string {
  const numStr = num.toString();
  if (numStr.length === 1) {
    return `0${numStr}`;
  } else {
    return numStr;
  }
}

