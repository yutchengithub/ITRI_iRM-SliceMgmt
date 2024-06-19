import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService } from '../shared/service/spinner.service'; 
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

export interface ComponentList {
  components: Components[];
}

export interface Components {
  id: string;
  bsId: string;
  bsName: string;
  name: string;
  ip: string;
  port: string;
  account: string;
  key: string;
  comtype: number;
  firm: string;
  modelname: string;
  status: number;
}
interface FileObject {
  name: string;
}
interface ProvisionFile {
  provisioningFile: string;
}
@Component({
  selector: 'app-component-management',
  templateUrl: './component-management.component.html',
  styleUrls: ['./component-management.component.scss'],
})
export class ComponentManagementComponent implements OnInit {
  sessionId: string = '';
  componentList: ComponentList = {} as ComponentList;
  @ViewChild('createComponentModal') createComponentModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('provisionModal') provisionModal: any;
  @ViewChild('advancedModal') advancedModal: any;
  advancedModalRef!: MatDialogRef<any>;
  advancedForm!: FormGroup;
  afterAdvancedForm!: FormGroup;
  refreshTimeout!: any;
  isSettingAdvanced = true;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  provisionModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  provisionForm!: FormGroup;
  selectComponent!: Components;
  componentstatus: number=-1;
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
  provisionFile: ProvisionFile = {} as ProvisionFile;

  comtype: Item[] = [
    { displayName: 'CU', value: '1' },
    { displayName: `DU`, value: '2' },
    { displayName: `RU`, value: '3' },
    { displayName: `CU+DU`, value: '4' },
    { displayName: `CU+DU+RU`, value: '5' }
  ];
  componentId: string= '';
  showLoadingSpinner() {
    this.spinnerService.isLoading = true;
    this.spinnerService.show();
  }
  hideSpinner() {
    this.spinnerService.hide();
  }
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    public spinnerService: SpinnerService,
    public languageService: LanguageService
  ) {
    this.comtype.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep( this.searchForm );
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.getComponentList();
  }

  getComponentList() {
    clearTimeout(this.refreshTimeout);
    this.showLoadingSpinner();
    if (this.commonService.isLocal) {
      /* local file test */
      this.componentList = this.commonService.componentList;
      console.log(this.componentList);
      this.componentListDeal();
      this.hideSpinner();
    } else {
      this.commonService.queryBsComponentList().subscribe(
        res => {
          console.log('getBsComponent List:');
          console.log(res);
          this.hideSpinner();
          const str = JSON.stringify(res);//convert array to string
          this.componentList = JSON.parse(str);
          this.componentListDeal();
        }
      );
    }
  }

  getVersion(opt: any): string {
    if (opt.sm && opt.sm['software-inventory'] && opt.sm['software-inventory']['software-slot']) {
      const softwareSlots = opt.sm['software-inventory']['software-slot'];
      const activeSlot = softwareSlots.find((slot: any) => slot.active === 'true');
      return activeSlot ? activeSlot['build-version'] : 'N/A';
    }
    return 'N/A';
  }

  componentListDeal() {
    this.totalItems = this.componentList.components.length;
  }

  ngOnDestroy() {
    clearTimeout(this.refreshTimeout);
    if (this.querySoftwareScpt) this.querySoftwareScpt.unsubscribe();
    if (this.querySWAdvanceSearchScpt) this.querySWAdvanceSearchScpt.unsubscribe();
  }

  createSearchForm() {
    this.searchForm = this.fb.group({
      'comtype': new FormControl('All'),
    });
  }
  openCreateModal() {
    this.formValidated = false;
    this.createForm = this.fb.group({
      'session': this.sessionId,
      'name': new FormControl('', [Validators.required]),
      'ip': new FormControl('', [Validators.required]),
      'port': new FormControl('', [Validators.required]),
      'account': new FormControl('', [Validators.required]),
      'key': new FormControl('', [Validators.required]),
      'comtype': new FormControl('', [Validators.required]),
      'firm': new FormControl('', [Validators.required]),
      'modelname': new FormControl('', [Validators.required])
      
    });
    this.createModalRef = this.dialog.open(this.createComponentModal, { id: 'createComponentModal' });
    this.createModalRef.afterClosed().subscribe(() => {
      this.fileMsg = '';
      this.formValidated = false;
    });
  }

  fileChange(e: any) {
    // console.log(e);
    this.fileMsg = '';
    let passFile = null;
    const files = e.target.files;
    if ('0' in files) {
      if (files[0].name.indexOf('.xml') >= 0) {
        passFile = files[0];
      } else {
        this.fileMsg = '格式只允許[file].xml';
      }
    }
    if (passFile === null) {
      this.file = null;
      this.provisionForm.controls['fileName'].setValue('');
    } else {
      this.file = files[0];
      this.provisionForm.controls['fileName'].setValue(files[0].name);
    }
    // console.log(files);
  }
  
  create() {
    this.formValidated = true;
    if (!this.createForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.commonService.componentList.components.push(
        {
          id: "0f03212c522b4c86abda",
          bsId: "8e427f7c5ff34326a380",
          bsName: "itri_10.0.2.10",
          name: "itri_10.0.2.10",
          ip: "10.0.2.10",
          port: "830",
          account: "k200",
          key: "k200123",
          comtype: 2,
          firm: "ITRI",
          modelname: "v2.0",
          status: 1
        }
      );
      this.createModalRef.close();
      this.getComponentList();

    } else {
      const body = this.createForm.value;
      if (this.createForm.controls['comtype'].value === 'CU') {
        body['comtype'] = 1;
      } else if (this.createForm.controls['comtype'].value === 'DU') {
        body['comtype'] = 2;
      } else if (this.createForm.controls['comtype'].value === 'RU') {
        body['comtype'] = 3;
      } else if (this.createForm.controls['comtype'].value === 'CU+DU') {
        body['comtype'] = 4;  
      } else if (this.createForm.controls['comtype'].value === 'CU+DU+RU') {
        body['comtype'] = 5;
      }
      console.log(body);
      this.commonService.createBsComponent(body).subscribe(
        res => {
          console.log('createBsComponent:');
          console.log(res);
          this.createModalRef.close();
          this.getComponentList();
        }
      );
    }
  }
  
  openDeleteModal(componentList: Components) {
    this.selectComponent = componentList;
    this.componentstatus = componentList.status;
    console.log("test "+this.componentstatus);
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  openProvisionModal(componentList: Components) {
    this.formValidated = false;
    this.provisionForm = this.fb.group({
      'fileName': new FormControl('', [Validators.required])
    });
    this.componentId = componentList.id;
    this.selectComponent = componentList;
    this.provisionModalRef = this.dialog.open(this.provisionModal, { id: 'provisionModal' });
    this.provisionModalRef.afterClosed().subscribe(() => {
      this.fileMsg = '';
      this.formValidated = false;
    });
  }

  uploadProvisioning() {
    if (this.commonService.isLocal) {
        /* local file test */
    } else {
        if (this.file) {
            const uploadProvisioning = `${this.commonService.restPath}/uploadProvisioning/${this.sessionId}/${this.componentId}`;
            const formData = new FormData();
            formData.append('file', this.file);

            const headers = new HttpHeaders();
            this.http.post<ProvisionFile>(uploadProvisioning, formData, { headers }).subscribe(
                res => {
                    const provisioningFile = res.provisioningFile;
                    console.log(provisioningFile);
                    this.provisionModalRef.close();
                    const body: any = {
                        session: this.sessionId,
                        id: this.componentId,
                        provisioningFile: res.provisioningFile,
                    };
                    this.commonService.setProvisioning(body).subscribe(
                        () => console.log('setProvisioning Successful.')
                    );
                    this.provisionModalRef.close()
                    this.getComponentList();
                }
            );
        }
    }
    this.getComponentList();
}


  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.componentList.components.length; i++) {
        if (this.selectComponent.id === this.commonService.componentList.components[i].id) {
          this.commonService.componentList.components.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
      this.getComponentList();
    } else {
      const removeBsBody: any = {
        session: this.sessionId,
        id:this.selectComponent.id,
      };
      const httpOptions = {
        // 設定 HTTP 標頭
        headers: new HttpHeaders({
          'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
        }),
        body: removeBsBody // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
      };
      this.commonService.removeBsComponent(httpOptions).subscribe(
        res => {
          this.deleteModalRef.close();
          this.getComponentList();
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

  typeText(type: number): string {
    return this.typeMap.get(type) as string;
  }

  pageChanged(page: number) {
    this.p = page;
  }

  filtered_ComponentList: Components[] = []; 
  isSearch_componentList: boolean = false;
  search() {
    // 確認 scheduleList 是否已加載
    if ( !this.componentList || !this.componentList.components ) {
      console.error('componentList.components is not loaded yet.');
      return;
    }
  
    // 更新顯示的搜尋條件，使用 Deep Copy
    this.afterSearchForm = _.cloneDeep( this.searchForm ); 
    this.p = 1; // 當點擊搜尋時，將顯示頁數預設為 1
    
    // 清除以前的搜尋結果
    this.filtered_ComponentList = []; // 存儲篩選結果的陣列
    this.isSearch_componentList = false;
    
    // 從表單獲取篩選條件
    const selectedTypeValue = this.searchForm.get('comtype')?.value;
    console.log(selectedTypeValue);
    // 應用篩選條件
    this.filtered_ComponentList = this.componentList.components.filter(component => {
      const isStateMatch = selectedTypeValue === 'All' || component.comtype.toString() === selectedTypeValue;
      return isStateMatch;
    });

    this.isSearch_componentList = true; // 標記搜尋完成
    this.totalItems = this.filtered_ComponentList.length; // 確保更新 totalItems 以反映搜尋結果的數量
    console.log("篩選後的 filtered_ScheduleList :", this.filtered_ComponentList );
  }

  get componentListToDisplay(): Components[] {
    if (this.componentList && Array.isArray(this.componentList.components)) {
      return this.isSearch_componentList ? this.filtered_ComponentList : this.componentList.components;
    }
    return []; // If the data has not yet been loaded, return an empty array
  }

  viewPage(componentList: Components) {
    this.router.navigate(['/main/component-mgr/info', componentList.id]);
  }

  clearSetting() {
    this.searchForm.reset();
    this.isSearch_componentList = false;
    this.createSearchForm();
    this.afterSearchForm = _.cloneDeep(this.searchForm);
    this.p = 1; // 當點擊重置搜尋時，將顯示頁數預設為 1
    this.getComponentList();
  }

  exportToCSV(dataType: string) {
    let dataToExport: Components[] = [];
    const from = this.commonService.dealPostDate(this.searchForm.get('from')?.value);
    const to = this.commonService.dealPostDate(this.searchForm.get('to')?.value);
    const formattedFromDate = from.split(' ')[0];
    const formattedToDate = to.split(' ')[0];
    if (this.commonService.isLocal) {
      /* local file test */
      dataToExport = this.commonService.componentList.components;
    } else {//run iRM API
      dataToExport = this.componentList.components;
    }
    const csvData = this.convertToCSV(dataToExport);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const fileName = `filtered_component_list.csv`;

    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0]).join(',');
    const rows = data.map(row => {
      return Object.values(row).map(value => {
        const stringValue = typeof value === 'string' ? value : String(value);
        const escapedStringValue = stringValue.replace(/"/g, '""');
        return `"${escapedStringValue}"`;
      }).join(',');
    });
    return [header, ...rows].join('\n');
  }
}
