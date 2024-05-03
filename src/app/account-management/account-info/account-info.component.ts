import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from './../../shared/common.service';
import { SoftwareList } from './../../software-management/software-management.component';
import { AccountLists } from './../../account-management/account-management.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as _ from 'lodash';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { SystemSummary } from 'src/app/dashboard/dashboard.component';
import { LanguageService } from 'src/app/shared/service/language.service';

// @2024/05/03 Add
import { Location } from '@angular/common';  // 引入 Location 服務，用於控制瀏覽器的歷史記錄導航

export interface AccountInfo {
  id: string;
  key: string;
  role: string;
  expiretime: string;
}
export class Item {
  displayName!: string;
  value!: string;
}
@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})

export class AccountInfoComponent implements OnInit {
  sessionId: string = '';
  cloudId: string = '';
  cloudName: string = '';
  file: any;
  fileMsg: string = '';
  createForm!: FormGroup;
  // utilizationPercent: number = 0;
  accountInfo: AccountInfo = {} as AccountInfo;
  systemSummary: SystemSummary = {} as SystemSummary;;
  fileNameMapSoftware: Map<string, SoftwareList> = new Map();
  typeMap: Map<number, string> = new Map();
  faultColors: string[] = ['#FF0000', '#FFA042', '	#FFFF37', '#00FFFF'];
  nfTypeList: string[] = ['CU', 'DU', 'CU+DU'];
  showTooltipCpu: any = {};
  showTooltipStorage: any = {};
  showTooltipNic: any = {};
  uploadType = 'upload';
  userTypeList: Item[] = [
    { displayName: 'Administrator', value: '1' },
    { displayName: `Manager`, value: '2' },
    { displayName: `Monitor`, value: '3' }
  ];
  roleMapDisplayName: Map<string, string> = new Map();
  showDropdown = false;

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
  @ViewChild('updateModal') updateModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  accInfoRefreshTimeout!: any;
  accInfoRefreshTime: number = 2;
  formValidated = false;
  /* CRITICAL,MAJOR,MINOR,WARNING */
  severitys: string[];

  tooltipOptions = {
    theme: 'light',     // 'dark' | 'light'
    hideDelay: 250
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public commonService: CommonService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private       location: Location,      // @2024/05/03 Add
    public languageService: LanguageService
  ) {
    this.severitys = this.commonService.severitys;
    this.userTypeList.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
  }

  Accountroledetails(status: number): string {
    return this.roleMapDisplayName.get(status.toString()) as string;
  }
  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.route.params.subscribe((params) => {
      this.cloudId = params['cloudId'];
      this.cloudName = params['cloudName'];
      this.cloudId = params['cloudId'];
      this.cloudName = params['cloudName'];
      console.log('cloudId=' + this.cloudId + ', cloudName=' + this.cloudName);
      this.getAccountInfo();
    });
  }

  // @2024/05/03 Update
  // 返回使用的上個頁面
  back() {
    this.location.back();
    // this.router.navigate(['/main/account-mgr']); // 返回 account 主頁
  }

  roleDisplayName(role: string): string {
    const userType = this.userTypeList.find(item => item.value === role);
    return userType ? userType.displayName : '';
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
      console.log('1');
      this.file = null;
      this.createForm.controls['inputParams'].setValue('');
      this.createForm.controls['fileName'].setValue('');
    } else {
      console.log('2');
      this.file = files[0];
      this.createForm.controls['fileName'].setValue(files[0].name);
      var reader = new FileReader();
      reader.readAsText(files[0], "UTF-8");
      reader.onload = (evt: any) => {
        console.log(evt.target.result);
        this.createForm.controls['inputParams'].setValue(evt.target.result);
      }
    }
  }
  
  getAccountInfo() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.accountInfo = this.commonService.accountInfo;
    } else {
      this.commonService.queryUserInfo(this.cloudId).subscribe(
        res => {
          console.log('getAccountInfo:');
          console.log(res);
          const str = JSON.stringify(res);//convert array to string
          this.accountInfo = JSON.parse(str);
          this.accountInfo = res as AccountInfo;
        }
      );
    }
  }

  update() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.updateModalRef.close();
    } else {
      const body: any = {
        id: this.accountInfo.id,
        key: this.accountInfo.key,
        role: this.accountInfo.role,
        session: this.sessionId
      };
      this.commonService.updateUser(body).subscribe(
        () => console.log('Update Successful.')
      );
      this.updateModalRef.close();
      this.getAccountInfo();
      this.nfRefresh();
    }
    this.getAccountInfo();
  }
  nfRefresh() {
    // refresh
    this.accInfoRefreshTimeout = window.setTimeout(() => this.getAccountInfo(), this.accInfoRefreshTime * 1000);
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

}
