import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../shared/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OCloudList } from '../field-management/field-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LanguageService } from '../shared/service/language.service';

export interface Nf {
  globalId: string;
  nfId: string;
  dmsId: string;
  nfname: string;
  ocloudName: string;
  status: number;
}

export interface OcloudDmsList {
  id: string;
  name: string;
  dms: Dms[];
}

export interface Dms {
  id: string;
  name: string;
  cpu: number;
  memory: string;
  storage: string;
  network: number
}

@Component({
  selector: 'app-nf-management',
  templateUrl: './nf-management.component.html',
  styleUrls: ['./nf-management.component.scss']
})
export class NfManagementComponent implements OnInit, OnDestroy {
  sessionId: string = '';
  nfList: Nf[] = [];
  ocloudList: OCloudList[] = [];
  nfTypeList = ['CU', 'DU', 'CU+DU'];
  searchForm!: FormGroup;
  refreshTimeout!: any;
  refreshTime: number = 30;
  @ViewChild('createModal') createModal: any;
  @ViewChild('actionModal') actionModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  createModalRef!: MatDialogRef<any>;
  actionModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  formValidated = false;
  selectNf!: Nf;
  ocloudDmsList: OcloudDmsList = {} as OcloudDmsList;
  dmsList: Dms[] = [];
  idMapDms: Map<string, Dms> = new Map();
  selectDms: Dms = {} as Dms;
  file: any;
  fileMsg: string = '';

  constructor(
    public commonService: CommonService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router,
    public languageService: LanguageService
  ) {
    this.searchForm = this.fb.group({
      'cloudId': new FormControl(''),
      'cloudName': new FormControl(''),
      'nfName': new FormControl(''),
      'status': new FormControl('All')
    });
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      // if (params['cloudId']) {
      //   this.searchForm.controls['cloudId'].setValue(params['cloudId']);
      // }
      // console.log('cloudId=' + params['cloudId']);
    });
    this.getNfList();
    this.getOcloudList();
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
  }

  getNfList() {
    const cloudId = this.searchForm.controls['cloudId'].value;
    const cloudName = this.searchForm.controls['cloudName'].value;
    const nfName = this.searchForm.controls['nfName'].value;
    const status = this.searchForm.controls['status'].value;
    console.log('queryNfList params: ' + `cloudId=${cloudId},cloudName=${cloudName} , nfName=${nfName} ,status=${status}`);
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.nfList = this.commonService.nfList;
      this.nfListDeal();

    } else {
      //queryNfList
      this.commonService.queryNfList(cloudId,cloudName, nfName, status).subscribe(
        res => {
          console.log('getNfList:');
          console.log(res);
          this.nfList = res as Nf[];
          this.nfListDeal();
        }
      );
    }
  }

  nfListDeal() {
    // refresh
    this.refreshTimeout = window.setTimeout(() => this.getNfList(), this.refreshTime * 1000);
  }

  getOcloudList() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudList = this.commonService.ocloudList;

    } else {
      this.commonService.queryOcloudList().subscribe(
        res => {
          console.log('getOcloudList:');
          console.log(res);
          this.ocloudList = res as OCloudList[];
        }
      );
    }
  }

  search() {
    this.getNfList();
  }

  pageChanged(page: number) {
    this.p = page;
  }

  viewPage(nf: Nf) {
    this.router.navigate(['/main/nf-mgr/info', nf.nfId, nf.dmsId]);
  }

  openCreateModal() {
    this.formValidated = false;
    this.createForm = this.fb.group({
      'globalId': new FormControl('', [Validators.required]),
      'dmsId': new FormControl('', [Validators.required]),
      'dmsName': new FormControl('', [Validators.required]),
      'nfName': new FormControl('', [Validators.required]),
      'descriptorName': new FormControl(''),
      'artifactRepoUrl': new FormControl('', [Validators.required]),
      'artifactName': new FormControl('', [Validators.required]),
      'type': new FormControl('', [Validators.required]),
      'inputParams': new FormControl(''),
      'fileName': new FormControl('', [Validators.required])
    });
    this.createModalRef = this.dialog.open(this.createModal, { id: 'createModal' });
    this.createModalRef.afterClosed().subscribe(() => {
      this.fileMsg = '';
      this.formValidated = false;
    });
  }

  queryOcloudDmsList() {
    const cloudId = this.createForm.controls['globalId'].value;
    console.log('queryOcloudDmsList: cloudId=' + cloudId);
    if (this.commonService.isLocal) {
      /* local file test */
      this.ocloudDmsList = this.commonService.ocloudDmsList;
      this.ocloudDmsListDeal();
    } else {
      this.commonService.queryOcloudDmsList(cloudId).subscribe(
        res => {
          console.log('queryOcloudDmsList:');
          console.log(res);
          this.ocloudDmsList = res as OcloudDmsList;
          this.ocloudDmsListDeal();
        }
      );
    }
  }

  ocloudDmsListDeal() {
    // console.log(this.ocloudDmsList);
    this.dmsList = this.ocloudDmsList.dms;
    this.idMapDms = new Map();
    this.dmsList.forEach((r) => this.idMapDms.set(r.id, r));
  }

  changeOcloud() {
    this.createForm.controls['dmsId'].setValue('');
    this.queryOcloudDmsList();
  }

  changeDMS() {
    const dmsId = this.createForm.controls['dmsId'].value;
    this.selectDms = this.idMapDms.get(dmsId) as Dms;
    this.createForm.controls['dmsName'].setValue(this.selectDms.name);
  }

  fileChange(e: any) {
    // console.log(e);
    this.fileMsg = '';
    let passFile = null;
    const files = e.target.files;
    if ('0' in files) {
      if (files[0].name.indexOf('.txt') >= 0) {
        passFile = files[0];
      } else {
        this.fileMsg = '格式只允許[file].txt';
      }
    }
    if (passFile === null) {
      this.file = null;
      this.createForm.controls['inputParams'].setValue('');
      this.createForm.controls['fileName'].setValue('');
    } else {
      this.file = files[0];
      this.createForm.controls['fileName'].setValue(files[0].name);
      var reader = new FileReader();
      reader.readAsText(files[0], "UTF-8");
      reader.onload = (evt: any) => {
        this.createForm.controls['inputParams'].setValue(evt.target.result);
      }
    }
  }

  create() {
    console.log('createForm:');
    console.log(this.createForm.value);
    this.formValidated = true;
    if (!this.createForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.commonService.nfList.push(
        {
          globalId: "cloud000-0000-0000-0000-000000000999",
          nfId: "47574686-3503-49c4-82ea-1d3312323999",
          nfname: "nf999",
          ocloudName: "cloud999",
          dmsId: 'aaa',
          status: 1,
        },
      );
      this.createModalRef.close();
      this.getNfList();

    } else {
      const body = this.createForm.value;
      this.commonService.createNf(body).subscribe(
        (res: any) => {
          console.log('createNf:');
          console.log(res);
          this.createModalRef.close();
          this.getNfList();
        }
      );
    }
  }

  openActionModal(nf: Nf) {
    this.selectNf = nf;
    this.actionModalRef = this.dialog.open(this.actionModal, { id: 'actionModal' });
  }


  openDelectModal(nf: Nf) {
    this.selectNf = nf;
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  actionOk() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.actionModalRef.close();
      window.setTimeout(() => {
        this.selectNf.status = (this.selectNf.status === 2 || this.selectNf.status === 3) ? 0 : 3;
        this.getNfList();
      }, 100);
    } else {
      // 0 running      -> 0
      // 1 deploying    -> 0
      // 2 fail deploy  -> 1
      // 3 stopped      -> 1
      let status = 0;
      if (this.selectNf.status === 2 || this.selectNf.status === 3) {
        status = 1;
      }
      this.commonService.actionNf(this.selectNf.nfId, status).subscribe(
        res => {
          this.actionModalRef.close();
          this.getNfList();
        }
      );
    }
  }

  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.nfList.length; i++) {
        if (this.selectNf.nfId === this.commonService.nfList[i].nfId) {
          this.commonService.nfList.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
      this.getNfList();
    } else {
      this.commonService.deleteNf(this.selectNf.nfId, this.selectNf.dmsId).subscribe(
        res => {
          this.deleteModalRef.close();
          this.getNfList();
        }
      );
    }
  }
}
