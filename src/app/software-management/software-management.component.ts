import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

// Services
import { CommonService }   from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService }  from '../shared/service/spinner.service';

export interface SoftwareList {
  id: string;
  firm: string;
  model: string;
  type: number;
  version: string;
  notes: string;
  uploadTime: string;
  fileName: string;
}

export interface SoftwareLists {
  uploadinfos: Uploadinfos[];
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


@Component({
  selector: 'app-software-management',
  templateUrl: './software-management.component.html',
  styleUrls: ['./software-management.component.scss'],
})
export class SoftwareManagementComponent implements OnInit {
  sessionId: string = '';
  //softwareList: SoftwareList[] = [];
  softwareLists: SoftwareLists = {} as SoftwareLists;
  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  afterAdvancedForm!: FormGroup;
  refreshTimeout!: any;
  isSettingAdvanced = false;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  fileForm!: FormGroup;
  selectSoftware!: Uploadinfos;
  file: any;
  typeMap: Map<number, string> = new Map();
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  fileMsg: string = '';
  formValidated = false;
  searchForm!: FormGroup;
  afterSearchForm!: FormGroup;
  updateForm!: FormGroup;
  isSearch: boolean = false;
  querySoftwareScpt!: Subscription;
  querySWAdvanceSearchScpt!: Subscription;
  filteredSwList: Uploadinfos[] = [];

  uploadtypeList: Item[] = [
    { displayName: 'CU', value: '1' },
    { displayName: `DU`, value: '2' },
    { displayName: `RU`, value: '3' },
    { displayName: `CU+DU`, value: '4' },
    { displayName: `CU+DU+RU`, value: '5' }
  ];

  // @2024/06/22 Add
  // Show Spinner of Loading Title 
  showLoadingSpinner() {
    this.spinnerService.isLoading = true;
    this.spinnerService.show();
  }

  // @2024/06/22 Add
  // Show Spinner of Processing Title
  showProcessingSpinner() {
    this.spinnerService.isLoading = false;
    this.spinnerService.show();
  }
  
  // @2024/06/22 Add
  // Hide Spinner
  hideSpinner() {
    this.spinnerService.hide();
  }

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,

    public   commonService: CommonService,
    public  languageService: LanguageService,
    public   spinnerService: SpinnerService,

  ) {
    this.uploadtypeList.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
    this.uploadtypeList = this.commonService.nfTypeList;
  }

  ngOnInit(): void {
    this.createSearchForm();
    this.sessionId = this.commonService.getSessionId();
    this.afterSearchForm = _.cloneDeep(this.searchForm);

    this.getSoftwareList();
  }

  getSoftwareList() {
    
    this.showLoadingSpinner();  // 顯示 spinner

    const firm = this.searchForm.controls['firm'].value;
    const uploadtype = this.searchForm.controls['uploadtype'].value;
    const model = this.searchForm.controls['model'].value;
    console.log('querySoftwareList params:')
    console.log(`fileName=${firm}`);
    console.log(`uploadtype=${uploadtype}`);
    console.log(`model=${model}`);
    clearTimeout( this.refreshTimeout );

    if ( this.commonService.isLocal ) {

      /* local file test */
      this.softwareLists = this.commonService.softwareLists;
      console.log( this.softwareLists );

      this.softwareListDeal();

      this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

    } else {

      this.commonService.queryUploadFileList().subscribe(
        res => {
          console.log('Get software list:');
          console.log( res );
          this.softwareLists = res as SoftwareLists;
          this.softwareListDeal();

          this.hideSpinner();  // 完成後隱藏 spinner
        }
      );
    }
  }

  get msgToDisplay(): Uploadinfos[] {
    // 如 isSearch 為 true，則表示已經進行了搜尋，應該顯示 
    return this.isSearch ? this.filteredSwList : this.softwareLists.uploadinfos;
  }

  softwareListDeal() {
    this.totalItems = this.softwareLists.uploadinfos.length;
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
    if (this.querySoftwareScpt) this.querySoftwareScpt.unsubscribe();
    if (this.querySWAdvanceSearchScpt) this.querySWAdvanceSearchScpt.unsubscribe();
  }

  createSearchForm() {
    const nowTime = this.commonService.getNowTime();
    this.searchForm = this.fb.group({
      'firm': new FormControl(''),
      'model': new FormControl(''),
      'uploadtype': new FormControl('All'),
      'uploadversion': new FormControl(''),
      'from': new FormControl(new Date(`${nowTime.year}-01-01 00:00`)),
      'to': new FormControl(new Date(`${nowTime.year}-${nowTime.month}-${nowTime.day} ${nowTime.hour}:${nowTime.minute}`)),
      'fileName': new FormControl(''),
    });
    this.uploadtypeList = this.commonService.nfTypeList;
  }
  
  openCreateModal() {
    this.formValidated = false;
    this.createForm = this.fb.group({
      'firm': new FormControl(''),
      'modelname': new FormControl(''),
      'uploadtype': new FormControl(''),
      'uploadversion': new FormControl('', [Validators.required]),
      'method': new FormControl('upload'),
      'description': new FormControl(''),
      'ftpid': new FormControl(''),
      'ftpkey': new FormControl(''),
      'uploadinfo': new FormControl(''),
      'uploadurl': new FormControl(''),
      'session': this.sessionId
    });
    this.fileForm = this.fb.group({
      'method': new FormControl('upload'),
      'fileName': new FormControl(''),
      'session': this.sessionId
    });
    this.createModalRef = this.dialog.open(this.createModal, { id: 'softCreateModal' });
    this.createModalRef.afterClosed().subscribe(() => {
      this.fileMsg = '';
      this.formValidated = false;
    });
  }

  fileChange(e: any) {
    this.fileMsg = '';
    let passFile = null;
    const files = e.target.files;
    if ('0' in files) {
      if (files[0].name.indexOf('.zip') >= 0 || files[0].name.indexOf('.tar') >= 0) {
        passFile = files[0];
      } else {
        this.fileMsg = '格式只允許[file].zip 和.tar';
      }
    }
    if (passFile === null) {
      this.file = null;
      this.fileForm.controls['fileName'].setValue('');
      this.createForm.controls['uploadinfo'].setValue('');
    } else {
      this.file = files[0];
      this.fileForm.controls['fileName'].setValue(files[0].name);
      this.createForm.controls['uploadinfo'].setValue(files[0].name);
    }
  }

  create() {
    this.formValidated = true;
    if (!this.createForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.commonService.softwareList.push(
        {
          id: "s0011009",
          firm: "ITRI",
          model: "Os_image_2.tar",
          type: 0,
          version: "1.0.0",
          notes: "Os_image_2.tar",
          uploadTime: "2023-07-01 20: 01: 30",
          fileName: "fw-v1-0-0.zip"
        }
      );
      this.createModalRef.close();
      this.getSoftwareList();
    } else {
      const { method, ...body } = this.createForm.value;
      //const body = this.createForm.value;
      body['session'] = this.sessionId;
      this.commonService.uploadFileInfo(body).subscribe(
        (res: any) => {
          console.log('uploadFileInfo:');
          console.log(res);
          const softwareId = res['id'];
          const uploadFirmware = `${this.commonService.restPath}/uploadFirmware/${this.sessionId}/${softwareId}`;
          const formData = new FormData();
          formData.append('file', this.file);
          const headers = new HttpHeaders();
          this.http.post(uploadFirmware, formData, {headers}).subscribe(
            () => {
              this.createModalRef.close();
              this.getSoftwareList();
            }
          );
          this.createModalRef.close();
          this.getSoftwareList();
        }
      );
      
      // this.commonService.uploadFileInfo(body).subscribe(
      //   (res: any) => {
      //     console.log('uploadFileInfo:');
      //     console.log(res);
      //     this.createModalRef.close();
      //     this.getSoftwareList();
      //   }
      // );
      // this.commonService.uploadFileInfo(body).subscribe(
      //   (res: any) => {
      //     console.log('uploadFileInfo:');
      //     console.log(res);
      //     const uploadUrl = `${this.commonService.restPath}/uploadFileInfo`;
      //     const options = this.commonService.options;
      //     const formData = new FormData();
      //     formData.append('file', this.file);
      //     this.http.post(uploadUrl, formData, options).subscribe(
      //       () => {
      //         this.createModalRef.close();
      //         this.getSoftwareList();
      //       }
      //     );
      //     this.createModalRef.close();
      //     this.getSoftwareList();
      //   }
      // );
    }
  }

  openDelectModal(softwareList: Uploadinfos) {
    this.selectSoftware = softwareList;
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.softwareLists.uploadinfos.length; i++) {
        if (this.selectSoftware.id === this.commonService.softwareLists.uploadinfos[i].id) {
          this.commonService.softwareLists.uploadinfos.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
      this.getSoftwareList();
    } else {
      const removeBsBody = {
        id: this.selectSoftware.id,
        session: this.sessionId
      };
      // 定義 HTTP 請求選項
      const httpOptions = {
        // 設定 HTTP 標頭
        headers: new HttpHeaders({
          'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
        }),
        body: removeBsBody // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
      };
      this.commonService.removeUploadFileInfo(httpOptions).subscribe(
        res => {
          console.log('deleteOcloud:');
          console.log(this.selectSoftware.id);
          this.deleteModalRef.close();
          this.getSoftwareList();
        }
      );
    }
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

  // createAdvancedForm() {
  //   this.advancedForm = this.fb.group({
  //     'firm': new FormControl(''),
  //     'model': new FormControl(''),
  //     'uploadtype': new FormControl(''),
  //     'version': new FormControl(''),
  //     'from': new FormControl(''),
  //     'to': new FormControl(''),
  //     'fileName': new FormControl('')
  //   });
  // }
  // openAdvancedModal() {
  //   const orgAdvancedForm = _.cloneDeep(this.advancedForm);
  //   this.advancedForm.controls['firm'].setValue(this.searchForm.controls['firm'].value);
  //   this.advancedForm.controls['model'].setValue(this.searchForm.controls['model'].value);
  //   this.advancedForm.controls['uploadtype'].setValue(this.searchForm.controls['uploadtype']?.value);
  //   this.advancedForm.controls['from'].setValue(this.searchForm.controls['from'].value);
  //   this.advancedForm.controls['to'].setValue(this.searchForm.controls['to'].value);
  //   this.advancedForm.controls['fileName'].setValue(this.searchForm.controls['fileName'].value);
  //   this.advancedModalRef = this.dialog.open(this.advancedModal, { id: 'faultAdvancedModal' });
  //   this.advancedModalRef.afterClosed().subscribe((result) => {
  //     if (result === 'OK') {
  //       this.isSettingAdvanced = true;
  //       this.isSearch = true;
  //       this.searchForm.controls['firm'].setValue(this.advancedForm.controls['firm'].value);
  //       this.searchForm.controls['model'].setValue(this.advancedForm.controls['model'].value);
  //       this.searchForm.controls['uploadtype'].setValue(this.advancedForm.controls['uploadtype']?.value);
  //       this.searchForm.controls['from'].setValue(this.advancedForm.controls['from'].value);
  //       this.searchForm.controls['to'].setValue(this.advancedForm.controls['to'].value);
  //       this.searchForm.controls['fileName'].setValue(this.advancedForm.controls['fileName'].value);
  //       this.afterAdvancedForm = _.cloneDeep(this.advancedForm);
  //       this.afterSearchForm = _.cloneDeep(this.advancedForm);
  //       this.p = 1;
  //       this.getFMAdvanceSearch();
  //     } else {
  //       this.advancedForm = orgAdvancedForm;
  //     }
  //   });
  // }

  getFMAdvanceSearch() {
    const firm = this.afterAdvancedForm.controls['firm'].value;
    const model = encodeURIComponent(this.afterAdvancedForm.controls['model'].value);
    const uploadtype = this.afterAdvancedForm.controls['uploadtype'].value;
    const start = this.commonService.dealPostDate(this.afterAdvancedForm.controls['from'].value);
    const end = this.commonService.dealPostDate(this.afterAdvancedForm.controls['to'].value);
    const fileName = this.afterAdvancedForm.controls['fileName'].value;
    const offset = (this.p - 1) * this.pageSize;
    console.log('getFMAdvanceSearch:');
    console.log(`firm=${firm}, model=${model}, start=${start}, end=${end}, fileName=${fileName}, offset=${offset}`);
    console.log(`uploadtype=${uploadtype}`);
    clearTimeout(this.refreshTimeout);
    if (this.commonService.isLocal) {
      /* local file test */
      this.softwareLists = this.commonService.softwareLists;
      console.log(this.softwareLists);
      this.softwareListDeal();
    } else {
      const firm = this.afterAdvancedForm.controls['firm'].value;
      const model = encodeURIComponent(this.afterAdvancedForm.controls['model'].value);
      const fileName = this.afterAdvancedForm.controls['fileName'].value;
      const uploadtype = this.afterAdvancedForm.controls['uploadtype'].value;
      const start = this.commonService.dealPostDate(this.afterAdvancedForm.controls['from'].value);
      const end = this.commonService.dealPostDate(this.afterAdvancedForm.controls['to'].value);
      const offset = (this.p - 1) * this.pageSize;
      const limit = 10;
      if (this.querySWAdvanceSearchScpt) this.querySWAdvanceSearchScpt.unsubscribe();
      this.querySWAdvanceSearchScpt = this.commonService.querySoftwareAdvanceSearch(firm, model, fileName, start, end, offset, limit).subscribe(
        res => {
          console.log('getFMAdvanceSearch:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.softwareLists = JSON.parse(str);
        }
      );
     }
  }

  typeText(type: number): string {
    return this.typeMap.get(type) as string;
  }

  pageChanged(page: number) {
    this.p = page;
  }

  search() {
    const firm = this.searchForm.get('firm')?.value || '';
    const model = this.searchForm.get('model')?.value || '';
    const uploadtype = this.searchForm.get('uploadtype')?.value || '';
    const uploadversion = this.searchForm.get('uploadversion')?.value || '';
    const start = this.searchForm.get('from')?.value;
    const end = this.searchForm.get('to')?.value;
    const numericUploadtype: number = parseInt(uploadtype, 10);  

    // 格式化日期為所需的格式
    const formattedFrom = this.commonService.dealPostDate(start);
    const formattedTo = this.commonService.dealPostDate(end);

    // 清除以前的搜尋結果
    this.filteredSwList = [];
    this.isSearch = false;
    if (this.commonService.isLocal) {
      /* local file test */
      this.filteredSwList = this.softwareLists.uploadinfos.filter(msg => {
        const isFirm = !firm || msg.firm.includes(firm);
        const isModel = !model || msg.modelname.includes(model);
        const isUploadtype = uploadtype === 'All' || msg.uploadtype === numericUploadtype;
        const isUploadversion = !uploadversion || msg.uploadversion.includes(uploadversion);
        const msgDate = new Date(msg.uploadtime);
        const isAfterFrom = msgDate >= new Date(formattedFrom);
        const isBeforeTo = msgDate <= new Date(formattedTo);
        console.log(firm+" "+model+" "+uploadtype+" "+uploadversion+" "+formattedFrom+" "+formattedTo);
        console.log(isFirm+" "+isModel+" "+isUploadtype+" "+isUploadversion+" "+isAfterFrom+" "+isBeforeTo);
        return isFirm && isModel && isUploadtype && isUploadversion && isAfterFrom && isBeforeTo;
      });
      this.isSearch = true; // Local Search 完畢，設置標記為 true
    } else {

    }
  }

  clear_search() {
    this.createSearchForm();
    this.isSearch = false;
  }  
  debug() {
    const body = this.createForm.value;
    if (this.createForm.controls['uploadtype'].value === 'CU') {
      body['uploadtype'] = 1;
    } else if (this.createForm.controls['uploadtype'].value === 'DU') {
      body['uploadtype'] = 2;
    } else if (this.createForm.controls['uploadtype'].value === 'CU+DU') {
      body['uploadtype'] = 3;
    } else {
      body['uploadtype'] = 0;
    }
    body['sessionid'] = this.sessionId;
    console.log(body);
  }

  viewPage(softwareList: Uploadinfos) {
    this.router.navigate(['/main/software-mgr/info', softwareList.id, softwareList.uploadinfo]);
  }

  clearSetting() {
    this.isSearch = false;
    this.createSearchForm();
    //this.createAdvancedForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getSoftwareList();
  }
}
