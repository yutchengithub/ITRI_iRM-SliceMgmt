import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SoftwareLists } from './../../software-management/software-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { Item } from 'src/app/shared/models/item';

// Services
import { CommonService }   from '../../shared/common.service';
import { LanguageService } from '../../shared/service/language.service';
import { SpinnerService }  from '../../shared/service/spinner.service'; // 用於控制顯示 Spinner

// @2024/05/03 Add
import { Location } from '@angular/common';  // 引入 Location 服務，用於控制瀏覽器的歷史記錄導航

export interface SoftwareInfo {
  id: string;
  firm: string;
  modelname: string;
  uploadtime: string;
  uploadtype: number;
  uploadversion: string;
  description: string;
  uploadinfo: string;
  uploadurl: string;
  ftpid: string;
  ftpkey: string;
  checksum: string;
  size: number;
}

interface FileObject {
  name: string;
}

@Component({
  selector: 'app-software-info',
  templateUrl: './software-info.component.html',
  styleUrls: ['./software-info.component.scss']
})

export class SoftwareInfoComponent implements OnInit {

  sessionId: string = '';
  cloudId: string = '';
  cloudName: string = '';

  file: any;
  fileMsg: string = '';

  createForm!: FormGroup;
  // utilizationPercent: number = 0;

  softwareInfo: SoftwareInfo = {} as SoftwareInfo;
  //softwareList: SoftwareList[] = [];

  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareInfo> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  nfTypeList: string[] = ['CU', 'DU', 'CU+DU'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  softwarecontent = 'upload';
  uploadType = 'upload';
  @ViewChild('updateModal') updateModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  formValidated = false;
  softwareInfoRefreshTimeout!: any;
  softwareInfoRefreshTime: number = 2;
  typeMap: Map<number, string> = new Map();

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };

  uploadtypeUI = [
    { displayName: 'CU', value: 1 },
    { displayName: 'DU', value: 2 },
    { displayName: 'RU', value: 3 },
    { displayName: 'CU+DU', value: 4 },
    { displayName: 'CU+DU+RU', value: 5 }
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
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private dialog: MatDialog,

    public    commonService: CommonService,
    public  languageService: LanguageService,
    public   spinnerService: SpinnerService,

    private location: Location,  // @2024/05/03 Add

  ) {
    this.uploadtypeUI.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.cloudId = params['cloudId'];
      this.cloudName = params['cloudName'];
      this.getSoftwareInfo();
    });
  }

  fileChange(e: any) {
    // console.log(e);
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
      this.createForm.controls['fileName'].setValue('');
    } else {
      this.file = files[0];
      this.createForm.controls['fileName'].setValue(files[0].name);
    }
     console.log(files);
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
  mapUpdateType(uploadtype: number): string {
    const selectedOption = this.uploadtypeUI.find(type => type.value === this.softwareInfo.uploadtype);
    return selectedOption ? selectedOption.displayName : '';
  }
  //selectedTypeName: string = '';
  // updateTypeName() {
  //   const selectedType = this.uploadtypeUI.find(type => type.value === this.softwareInfo.uploadtype);
  //   if (selectedType) {
  //     this.selectedTypeName = selectedType.displayName;
  //   }
  // }

  getSoftwareInfo() {

    this.showLoadingSpinner();  // 顯示 spinner

    if ( this.commonService.isLocal ) {

      /* local file test */
      this.softwareInfo = this.commonService.softwareInfo;

      this.hideSpinner();  // 因為 Local 模式數據加載通常很快，所以立即隱藏 spinner

    } else {
      this.commonService.queryUploadFileInfo( this.cloudId ).subscribe(
        res => {
          console.log('getSoftwareInfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string

          this.softwareInfo = JSON.parse(str);
          this.softwareInfo = res as SoftwareInfo;

          this.hideSpinner();  // 完成後隱藏 spinner
        }
      );
    }
  }

  softwareDeal() {
    this.fileNameMapSoftware = new Map();
    // this.softwareInfo.forEach((row) => {
    //   this.fileNameMapSoftware.set(row.fileName, row);
    // });
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

  // @2024/05/03 Update
  // 返回使用的前個頁面
  back() {
    this.location.back();
    //this.router.navigate( ['/main/software-mgr'] ); // 返回 software 主頁
  }

  update() {
    if ( this.commonService.isLocal ) {
      /* local file test */

      this.updateModalRef.close();

    } else {
      let fileName: string | null = null;

      if ( this.file ) {
        const file: FileObject = this.file;
        fileName = file.name;
      }

      const uploadinfo = this.file ? fileName : this.softwareInfo.uploadinfo; 
      const body: any = {
        id: this.softwareInfo.id,
        firm: this.softwareInfo.firm,
        modelname: this.softwareInfo.modelname,
        uploadtype: this.softwareInfo.uploadtype,
        description: this.softwareInfo.description,
        uploadinfo: uploadinfo,
        uploadurl: this.softwareInfo.uploadurl,
        ftpid: this.softwareInfo.ftpid,
        ftpkey: this.softwareInfo.ftpkey,
        uploadversion: this.softwareInfo.uploadversion,
        session: this.sessionId
      };

      console.log( body );
      this.commonService.updateUploadFileInfo( body ).subscribe(
        () => console.log('Update Successful.')
      );

      if ( this.file ){

        const uploadFirmware = `${this.commonService.restPath}/uploadFirmware/${this.sessionId}/${this.softwareInfo.id}`;
        const formData = new FormData();
        formData.append('file', this.file);
        const headers = new HttpHeaders();

        this.http.post( uploadFirmware, formData, {headers} ).subscribe(
          () => {
            this.updateModalRef.close();
            this.getSoftwareInfo();
          }
        );
      }
      this.updateModalRef.close();
      this.getSoftwareInfo();
    }
    this.getSoftwareInfo();
  }

  refresh() {
    this.softwareInfoRefreshTimeout = window.setTimeout( () => this.getSoftwareInfo(), this.softwareInfoRefreshTime * 1000 );
  }

  openUpdateModel() {

    this.formValidated = false;

    //this.softwareInfo = softwareInfo;

    this.updateForm = this.fb.group({
      'type': new FormControl('imageUrl'),
      'imageUrl': new FormControl('', [Validators.required]),
      'fileName': new FormControl('')
    });

    this.softwarecontent;

    this.updateModalRef = this.dialog.open( this.updateModal, { id: 'softUpdateModal' } );

    this.updateModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

}
