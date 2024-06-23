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
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { SpinnerService } from '../shared/service/spinner.service';    // 用於控制顯示 Spinner


export interface ComponentList {
  components: Components[];
}

export interface Components {
  id: string;
  bsId?: string;
  bsName?: string;
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

  // Show Spinner of Processing Title
  showProcessingSpinner() {
    this.spinnerService.isLoading = false;
    this.spinnerService.show();
  }
  
  constructor(
    private dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private fb: FormBuilder,
    private    commonService: CommonService,
    public   languageService: LanguageService,
    public    spinnerService: SpinnerService

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
          console.log( res );

          const str = JSON.stringify( res );//convert array to string
          this.componentList = JSON.parse( str );
          
          this.componentListDeal();

          this.hideSpinner();
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
      'name': new FormControl(''),
      'ipaddress': new FormControl(''),
      'port': new FormControl(''),
      'comtype': new FormControl('All')
    });
  }
  // openCreateModal() {
  //   this.formValidated = false;
  //   this.createForm = this.fb.group({
  //     'session': this.sessionId,
  //     'name': new FormControl('', [Validators.required]),
  //     'ip': new FormControl('', [Validators.required]),
  //     'port': new FormControl('', [Validators.required]),
  //     'account': new FormControl('', [Validators.required]),
  //     'key': new FormControl('', [Validators.required]),
  //     'comtype': new FormControl('', [Validators.required]),
  //     'firm': new FormControl('', [Validators.required]),
  //     'modelname': new FormControl('', [Validators.required])
      
  //   });
  //   this.createModalRef = this.dialog.open(this.createComponentModal, { id: 'createComponentModal' });
  //   this.createModalRef.afterClosed().subscribe(() => {
  //     this.fileMsg = '';
  //     this.formValidated = false;
  //   });
  // }

  openCreateModal() {
    
    this.formValidated = false;
    this.createForm = this.fb.group({
      'session': this.sessionId,
      'name': new FormControl('comp-all-15', [Validators.required]),
      'ip': new FormControl('60.250.213.43', [Validators.required]),
      'port': new FormControl('30125', [Validators.required]),
      'account': new FormControl('root', [Validators.required]),
      'key': new FormControl('root', [Validators.required]),
      'comtype': new FormControl( 5, [Validators.required]), // 預設選擇 "CU+DU+RU"
      'firm': new FormControl('ITRI', [Validators.required]),
      'modelname': new FormControl('A001', [Validators.required])
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
    if ( passFile === null ) {
      this.file = null;
      this.provisionForm.controls['fileName'].setValue('');
    } else {
      this.file = files[0];
      this.provisionForm.controls['fileName'].setValue(files[0].name);
    }
    // console.log(files);
  }
  
  // 06/24 update by yuchen
  create() {

    this.showProcessingSpinner();

    this.formValidated = true;
    if ( !this.createForm.valid ) {
      return;
    }

    const body = this.createForm.value;

    // if ( this.createForm.controls['comtype'].value === 'CU' ) {
    //   body['comtype'] = 1;
    // } else if ( this.createForm.controls['comtype'].value === 'DU' ) {
    //   body['comtype'] = 2;
    // } else if ( this.createForm.controls['comtype'].value === 'RU' ) {
    //   body['comtype'] = 3;
    // } else if ( this.createForm.controls['comtype'].value === 'CU+DU' ) {
    //   body['comtype'] = 4;  
    // } else if ( this.createForm.controls['comtype'].value === 'CU+DU+RU' ) {
    //   body['comtype'] = 5;
    // }

    body['comtype'] = Number( body['comtype'] );
    console.log("The post json for create NE:", body);

    if ( this.commonService.isLocal ) {

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

      //this.hideSpinner();

    } else {

      this.commonService.createBsComponent( body ).subscribe(
        res => {
          console.log('createBsComponent:');
          console.log( res );
          this.createModalRef.close();
          this.getComponentList();

          //this.hideSpinner();
        }
      );
    }
  }

  
  
  // @2024/06/23 Add by yuchen
  @ViewChild('deleteComponent_ConfirmWindow') deleteComponent_ConfirmWindow: any;
  @ViewChild('bsInUsePromptWindow') bsInUsePromptWindow: any;

  // @2024/06/23 Add by yuchen
  deleteComponent_ConfirmWindowRef!: MatDialogRef<any>;
  bsInUsePromptWindowRef!: MatDialogRef<any>;

  selectComponent!: Components;
  componentstatus: number = -1;

  // @2024/06/23 update by yuchen
  openDeleteModal( componentList: Components ) {

    this.selectComponent = componentList;
    this.componentstatus = componentList.status;
    console.log("Component status: " + this.componentstatus);

    if ( this.selectComponent.bsName ) {

      // If there's a BS name, show the prompt that it's in use
      this.bsInUsePromptWindowRef = this.dialog.open(
        this.bsInUsePromptWindow, { id: 'bsInUsePromptWindow' }
      );

      this.bsInUsePromptWindowRef.afterClosed().subscribe(result => {
        console.log('The BS in use dialog was closed');
      });
    } else {

      // If there's no BS name, show the normal delete confirmation window
      this.deleteComponent_ConfirmWindowRef = this.dialog.open(
        this.deleteComponent_ConfirmWindow, { id: 'deleteComponent_ConfirmWindow' }
      );

      this.deleteComponent_ConfirmWindowRef.afterClosed().subscribe(confirm => {
        // Handle the user's action after closing the dialog
      });
    }
  }

  // @2024/06/23 Add by yuchen
  confirmDeleteComponent() {
    // Implement your delete logic here
    this.delete();
  }

  // delete() {
  //   if (this.commonService.isLocal) {
  //     /* local file test */
  //     for (let i = 0; i < this.commonService.componentList.components.length; i++) {
  //       if (this.selectComponent.id === this.commonService.componentList.components[i].id) {
  //         this.commonService.componentList.components.splice(i, 1);
  //         break;
  //       }
  //     }
  //     this.deleteModalRef.close();
  //     this.getComponentList();
  //   } else {
  //     const removeBsBody: any = {
  //       session: this.sessionId,
  //       id:this.selectComponent.id,
  //     };
  //     const httpOptions = {
  //       // 設定 HTTP 標頭
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json' // 指定內容類型為 JSON，告知伺服器正文格式
  //       }),
  //       body: removeBsBody // 在 DELETE 請求中包含正文，雖然不常見但有些後端設計需要
  //     };
  //     this.commonService.removeBsComponent(httpOptions).subscribe(
  //       res => {
  //         this.deleteModalRef.close();
  //         this.getComponentList();
  //       }
  //     );
  //   }
  // }

  // @2024/06/23 update by yuchen
  delete() {

    // 輸出將要刪除的網元名稱
    console.log("Deleted component name: ", this.selectComponent.name);

    this.showProcessingSpinner();  // 顯示 spinner

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
      
      //this.hideSpinner();  // 隱藏 spinner

    } else {

      const removeBsBody: any = {
        session: this.sessionId,
        id: this.selectComponent.id,
      };

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        }),
        body: removeBsBody
      };

      this.commonService.removeBsComponent(httpOptions).subscribe({
        next: ( response ) => {
          // 刪除成功的回調

          console.log('Component removed successfully', response);
          this.deleteModalRef.close();
          
          this.getComponentList();

          //this.hideSpinner();  // 隱藏 spinner

        },
        error: (error) => {
          // 刪除失敗的回調
          console.error('Failed to remove component:', error);
          //this.hideSpinner();  // 出錯時隱藏 spinner
        },
        complete: () => {
          // 請求完成後的回調，不管成功或失敗都會執行
          //this.hideSpinner();  // 隱藏 spinner
        }
      });
    }
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
    const ipaddressValue = this.searchForm.get('ipaddress')?.value;
    const portValue = this.searchForm.get('port')?.value;
    const nameValue = this.searchForm.get('name')?.value;
    console.log(nameValue);
    // 應用篩選條件
    this.filtered_ComponentList = this.componentList.components.filter(component => {
      const isTypeMatch = selectedTypeValue === 'All' || component.comtype.toString() === selectedTypeValue;
      const isNameMatch = !nameValue || component.name.includes(nameValue);
      const isIpAddressMatch = !ipaddressValue || component.ip.includes(ipaddressValue);
      const isPortMatch = !portValue || component.port.toString() === portValue;
      return isTypeMatch && isNameMatch && isIpAddressMatch && isPortMatch;
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
    console.log(dataType);
    let dataToExport: Components[] = [];
    if (this.commonService.isLocal) {
      /* local file test */
      dataToExport = this.commonService.componentList.components;
    } else { //run iRM API
      dataToExport = this.isSearch_componentList ? this.filtered_ComponentList : this.componentList.components;
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
    if (data.length === 0) {
      return '';
    }
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
