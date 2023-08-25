import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
/* models */
import { SoftwareList } from 'src/app/software-management/software-management.component';
/* service */
import { CommonService } from './../../shared/common.service';
/* kit */
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { LanguageService } from 'src/app/shared/service/language.service';

export interface NfInfo {
  globalId: string;
  nfname: string;
  nfId: string;
  fault: Fault;
  descriptor: string;
  ocloudName: string;
  dmsName: string;
  artifactRepoUrl: string;
  artifactName: string;
  type: string;
  status: number;
  softwareVersion: string;
}

export interface Fault {
  critical: number;
  major: number;
  minor: number;
  warning: number
}

export interface NfPerformance {
  send: string;
  receive: string;
  memoryUsed: string;
  throughput: string;
}

export interface NfCapacitySummary {
  totalCpu: number;
  totalMemory: string;
  totalStorage: string;
  totalInterface: number
}

export interface NfCapacityList {
  nfCapacityId: string;
  name: string;
  cpu: number;
  memory: string;
  storage: string;
  network: number;
}

export interface DmsAvaliableCapacity {
  // name: string;
  dmsId: string;
  dmsName: string;
  cpu: number;
  memory: string;
  memoryNum?: number;
  storage: string;
  storageNum?: number;
  network: number;
}

@Component({
  selector: 'app-nf-info',
  templateUrl: './nf-info.component.html',
  styleUrls: ['./nf-info.component.scss']
})
export class NfInfoComponent implements OnInit {
  sessionId: string = '';
  nfId: string = '';
  dmsId: string = '';
  nfInfo: NfInfo = {} as NfInfo;
  typeMapSoftwareType: Map<string, string> = new Map();
  softwareList: SoftwareList[] = [];
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  nfPerformance: NfPerformance = {} as NfPerformance;
  severitys: string[];    // CRITICAL,MAJOR,MINOR,WARNING
  @ViewChild('updateModal') updateModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;
  nfCapacitySummary: NfCapacitySummary = {} as NfCapacitySummary;
  nfCapacityList: NfCapacityList[] = [];
  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('errorModal') errorModal: any;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  // createForm!: FormGroup;
  selectNfCapacityList: NfCapacityList = {} as NfCapacityList;
  dmsAvaliableCapacity: DmsAvaliableCapacity = {} as DmsAvaliableCapacity;
  cpuMin = 0;
  cpuMax = 0;
  memoryMin = 0;
  memoryMax = 0;
  storageMin = 0;
  storageMax = 0;
  networkMin = 0;
  networkMax = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public languageService: LanguageService
  ) {
    this.typeMapSoftwareType.set('CU', '1').set('DU', '2').set('CU+DU', '3');
    this.severitys = this.commonService.severitys;
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.nfId = params['nfId'];
      this.dmsId = params['dmsId'];
      this.getNfInfo();
      this.getNfPerformance();
      this.getNfCapacitySummary();
      this.getNfCapacityList();
    });
  }

  back() {
    this.router.navigate(['/main/nf-mgr']);
  }

  getNfInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.nfInfo = this.commonService.nfInfo;
      this.nfInfoDeal();
    } else {
      this.commonService.queryNfInfo(this.nfId).subscribe(
        res => {
          console.log('getNfInfo:');
          console.log(res);
          this.nfInfo = res as NfInfo;
          this.nfInfoDeal();
        }
      );
    }
  }

  nfInfoDeal() {
    this.getSoftwareList();
  }

  getSoftwareList() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareList = this.commonService.softwareList;
      this.softwareDeal();
    } else {
      const softwareType = this.typeMapSoftwareType.get(this.nfInfo.type) as string;
      this.commonService.querySoftwareList('', softwareType, '').subscribe(
        res => {
          console.log('getSoftwareList:');
          console.log(res);
          this.softwareList = res as SoftwareList[];
          this.softwareDeal();
        }
      );
    }
  }

  softwareDeal() {
    this.fileNameMapSoftware = new Map();
    this.softwareList.forEach((row) => {
      this.fileNameMapSoftware.set(row.fileName, row);
    });
  }

  getNfPerformance() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.nfPerformance = this.commonService.nfPerformance;
    } else {
      this.commonService.queryNfPerformance(this.nfId).subscribe(
        res => {
          console.log('getNfPerformance:');
          console.log(res);
          this.nfPerformance = res as NfPerformance;
        }
      );
    }
  }

  goPerformanceMgr() {
    this.router.navigate(['/main/performance-mgr', 'nf', this.nfInfo.globalId, this.nfId]);
  }

  severityText(severity: string): string {
    return this.commonService.severityText(severity);
  }

  severityCount(severity: string): number {
    if (severity.toUpperCase() === this.severitys[0]) {
      return this.nfInfo.fault.critical;
    } else if (severity.toUpperCase() === this.severitys[1]) {
      return this.nfInfo.fault.major;
    } else if (severity.toUpperCase() === this.severitys[2]) {
      return this.nfInfo.fault.minor;
    } else if (severity.toUpperCase() === this.severitys[3]) {
      return this.nfInfo.fault.warning;
    } else {
      return 0;
    }
  }

  goFaultMgr() {
    this.router.navigate(['/main/fault-mgr', this.nfInfo.ocloudName, this.nfInfo.nfname]);
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

  update() {
    this.formValidated = true;
    if (!this.updateForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.updateModalRef.close();
    } else {
      const body: any = {
        ocloud: this.nfInfo.globalId,
        nfId: this.nfId
      };
      if (this.updateForm.controls['type'].value === 'imageUrl') {
        const imageUrlSplit = this.updateForm.controls['imageUrl'].value.split('/');
        body['fileName'] = imageUrlSplit[imageUrlSplit.length - 1];
      } else {
        body['fileName'] = this.updateForm.controls['fileName'].value;
        body['version'] = this.softwareVersion();
      }
      this.commonService.applyNfSoftware(body).subscribe(
        () => console.log('Update Successful.')
      );
      this.updateModalRef.close();
      this.getNfInfo();
    }
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

  getNfCapacitySummary() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.nfCapacitySummary = this.commonService.nfCapacitySummary;
    } else {
      this.commonService.queryNfCapacitySummary(this.nfId).subscribe(
        res => {
          console.log('getNfCapacitySummary:');
          console.log(res);
          this.nfCapacitySummary = res as NfCapacitySummary;
        }
      );
    }
  }

  getNfCapacityList() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.nfCapacityList = this.commonService.nfCapacityList;
    } else {
      this.commonService.queryNfCapacityList(this.nfId).subscribe(
        res => {
          console.log('getNfCapacityList:');
          console.log(res);
          this.nfCapacityList = res as NfCapacityList[];
        }
      );
    }
  }

  openCreateModal() {
    this.formValidated = false;
    this.dmsAvaliableCapacity = {} as DmsAvaliableCapacity;
    this.createModalRef = this.dialog.open(this.createModal, { id: 'nfInfoCreateModal' });
    this.createModalRef.afterClosed().subscribe(() => this.formValidated = false);
    this.getDmsAvaliableCapacity();
  }

  getDmsAvaliableCapacity() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.dmsAvaliableCapacityDeal(_.cloneDeep(this.commonService.dmsAvaliableCapacity));
    } else {
      this.commonService.queryDmsAvaliableCapacity(this.dmsId).subscribe(
        res => {
          console.log('getDmsAvaliableCapacity:');
          console.log(res);
          this.dmsAvaliableCapacityDeal(res as DmsAvaliableCapacity);
        }
      );
    }
  }

  dmsAvaliableCapacityDeal(dmsAvaliableCapacity: DmsAvaliableCapacity) {
    this.dmsAvaliableCapacity = {
      dmsId: dmsAvaliableCapacity.dmsId,
      dmsName: dmsAvaliableCapacity.dmsName,
      cpu: 0,
      memory: "0 GB",
      memoryNum: 0,
      storage: "0 GB",
      storageNum: 0,
      network: 0
    }
    this.cpuMax = dmsAvaliableCapacity.cpu;
    this.memoryMax = Number(dmsAvaliableCapacity.memory.replace(' GB', ''));
    this.storageMax = Number(dmsAvaliableCapacity.storage.replace(' GB', ''));
    this.networkMax = dmsAvaliableCapacity.network;

  }

  changeMemory() {
    this.dmsAvaliableCapacity.memory = `${this.dmsAvaliableCapacity.memoryNum} GB`;
    // console.log(this.dmsAvaliableCapacity);
  }

  changeStorage() {
    this.dmsAvaliableCapacity.storage = `${this.dmsAvaliableCapacity.storageNum} GB`;
    // console.log(this.dmsAvaliableCapacity);
  }

  keyupRange(type: 'cpu' | 'memory' | 'storage' | 'network') {
    console.log(type);
    // if (type === 'cpu') {
    //   if (this.dmsAvaliableCapacity.cpu === null) {
    //     this.dmsAvaliableCapacity.cpu = this.cpuMin;
    //   } else if (this.dmsAvaliableCapacity.cpu < this.cpuMin) {
    //     this.dmsAvaliableCapacity.cpu = this.cpuMin;
    //   } else if (this.dmsAvaliableCapacity.cpu > this.cpuMax) {
    //     this.dmsAvaliableCapacity.cpu = this.cpuMax;
    //   }
    // } else if (type === 'memory') {
    //   if (this.dmsAvaliableCapacity.memory === null) {
    //     this.dmsAvaliableCapacity.memoryNum = this.memoryMin;
    //   } else if (<number>this.dmsAvaliableCapacity.memoryNum < this.memoryMin) {
    //     this.dmsAvaliableCapacity.memoryNum = this.memoryMin;
    //   } else if (<number>this.dmsAvaliableCapacity.memoryNum > this.memoryMax) {
    //     this.dmsAvaliableCapacity.memoryNum = this.memoryMax;
    //   }
    //   this.changeMemory();
    // } else if (type === 'storage') {
    //   if (this.dmsAvaliableCapacity.storageNum === null) {
    //     this.dmsAvaliableCapacity.storageNum = this.storageMin;
    //   } else if (<number>this.dmsAvaliableCapacity.storageNum < this.storageMin) {
    //     this.dmsAvaliableCapacity.storageNum = this.storageMin;
    //   } else if (<number>this.dmsAvaliableCapacity.storageNum > this.storageMax) {
    //     this.dmsAvaliableCapacity.storageNum = this.storageMax;
    //   }
    //   this.changeStorage();
    // } else if (type === 'network') {
    //   if (this.dmsAvaliableCapacity.network === null) {
    //     this.dmsAvaliableCapacity.network = this.networkMin;
    //   } else if (this.dmsAvaliableCapacity.network < this.networkMin) {
    //     this.dmsAvaliableCapacity.network = this.networkMin;
    //   } else if (this.dmsAvaliableCapacity.network > this.networkMax) {
    //     this.dmsAvaliableCapacity.network = this.networkMax;
    //   }
    // }

    if (type === 'cpu') {
      if (this.dmsAvaliableCapacity.cpu > this.cpuMax) {
        this.openErrorModal();
      }
    } else if (type === 'memory') {
      if (<number>this.dmsAvaliableCapacity.memoryNum > this.memoryMax) {
        this.openErrorModal();
      }
    } else if (type === 'storage') {
      if (<number>this.dmsAvaliableCapacity.storageNum > this.storageMax) {
        this.openErrorModal();
      }
    } else if (type === 'network') {
      if (this.dmsAvaliableCapacity.network > this.networkMax) {
        this.openErrorModal();
      }
    }
  }

  openErrorModal() {
    this.dialog.open(this.errorModal, { id: 'errorModal' });
  }

  create() {
    this.formValidated = true;
    if (this.commonService.isLocal) {
      /* local file test */
      this.commonService.nfCapacityList.push({
        nfCapacityId: "nf-0001",
        name: "NF-capacity" + (this.commonService.nfCapacityList.length + 1),
        cpu: this.dmsAvaliableCapacity.cpu,
        memory: this.dmsAvaliableCapacity.memory,
        storage: this.dmsAvaliableCapacity.storage,
        network: this.dmsAvaliableCapacity.network
      });
      this.createModalRef.close();

    } else {
      const body = {
        globalId: this.nfInfo.globalId,
        nfId: this.nfInfo.nfId,
        // dmsId: this.dmsAvaliableCapacity.dmsId,
        dmsId: this.dmsId,
        nfName: this.nfInfo.nfname,
        cpu: this.dmsAvaliableCapacity.cpu,
        memory: this.dmsAvaliableCapacity.memory,
        storage: this.dmsAvaliableCapacity.storage,
        network: this.dmsAvaliableCapacity.network
      }
      this.commonService.createNfCapacity(body).subscribe(
        res => {
          console.log('createNfCapacity:');
          console.log(res);
          this.createModalRef.close();
          this.getNfCapacityList();
        }
      );
    }
  }

  openDelectModal(nfCapacityList: NfCapacityList) {
    this.selectNfCapacityList = nfCapacityList;
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }


  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.nfCapacityList.length; i++) {
        if (this.selectNfCapacityList.nfCapacityId === this.commonService.nfCapacityList[i].nfCapacityId) {
          this.commonService.nfCapacityList.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();

    } else {
      const dmsId = this.dmsId;
      const nfCapacityId = this.selectNfCapacityList.nfCapacityId;
      this.commonService.deleteNfCapacity(dmsId, nfCapacityId).subscribe(
        res => {
          console.log('deleteNfCapacity:');
          console.log(res);
          this.deleteModalRef.close();
          this.getNfCapacityList();
        }
      );
    }
  }

}
