import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { LanguageService } from '../shared/service/language.service';
import { Item } from '../shared/models/item';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import * as _ from 'lodash';


export interface AccountLists {
  users: Users[];
}

export interface Users {
  id: string;
  role: string;
}

export interface CreateUsers {
  session: string;
  id: string;
  key: string;
  role: string;
}

export interface AccountInfo {
  id: string;
  key: string;
  role: string;
  expiretime: string;
}

@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent implements OnInit {
  sessionId: string = '';
  accountLists: AccountLists = {} as AccountLists;
  accountInfo: AccountInfo = {} as AccountInfo;
  @ViewChild('createAccountModal') createAccountModal: any;
  @ViewChild('createModal') createModal: any;
  @ViewChild('deleteModal') deleteModal: any;
  @ViewChild('advancedModal') advancedModal: any;
  isSettingAdvanced = false;
  createModalRef!: MatDialogRef<any>;
  deleteModalRef!: MatDialogRef<any>;
  createForm!: FormGroup;
  deleteForm!: FormGroup;
  selectUser!: Users;
  file: any;
  typeMap: Map<number, string> = new Map();
  p: number = 1;            // 當前頁數
  pageSize: number = 10;    // 每頁幾筆
  totalItems: number = 0;   // 總筆數
  fileMsg: string = '';
  cloudId: string = '';
  formValidated = false;
  searchForm!: FormGroup;
  @ViewChild('accInfoModal') accInfoModal: any;
  updateModalRef!: MatDialogRef<any>;
  updateForm!: FormGroup;
  role = 'upload';
  userTypeList: Item[] = [
    { displayName: 'Administrator', value: '1' },
    { displayName: `Manager`, value: '2' },
    { displayName: `Monitor`, value: '3' }
  ];
  accInfoRefreshTimeout!: any;
  accInfoRefreshTime: number = 2;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private commonService: CommonService,
    private http: HttpClient,
    private fb: FormBuilder,
    public languageService: LanguageService,
    private route: ActivatedRoute
  ) {
    this.userTypeList.forEach((row) => this.typeMap.set(Number(row.value), row.displayName));
    this.searchForm = this.fb.group({
      'fileName': new FormControl(''),
      'type': new FormControl('All'),
      'version': new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.sessionId = this.commonService.getSessionId();
    this.getAccountList();
  }

  getAccountList() {
    if (this.commonService.isLocal) {
      /* local file test */
      this.accountLists = this.commonService.accountLists;
      console.log(this.accountLists);
      this.accountListDeal();
    } else {
      this.commonService.queryUserList().subscribe(
        res => {
          console.log('Get User list:');
          console.log(res);
          this.accountLists = res as AccountLists;
          this.accountListDeal();
        }
      );
    }
  }

  accountListDeal() {
    this.totalItems = this.accountLists.users.length;
  }

  openCreateModal() {
    this.formValidated = false;
    this.createForm = this.fb.group({
      'id': new FormControl('', [Validators.required]),
      'key': new FormControl('',  [Validators.required]),
      'role': new FormControl('', [Validators.required]),
      'session': this.sessionId
    });
    this.createModalRef = this.dialog.open(this.createAccountModal, { id: 'createAccountModal' });
    this.createModalRef.afterClosed().subscribe(() => {
      this.fileMsg = '';
      this.formValidated = false;
    });
  }

  create() {
    // 先呼叫createSoftware、然後利用return softwareId呼叫uploadSoftwar
    this.formValidated = true;
    if (!this.createForm.valid) {
      return;
    }
    if (this.commonService.isLocal) {
      /* local file test */
      this.createModalRef.close();
      this.getAccountList();
    } else {
      console.log(this.createForm.controls['role'].value);
      const body = this.createForm.value;
      if (this.createForm.controls['role'].value === '1') {
        body['role'] = 1;
      } else if (this.createForm.controls['role'].value === '2') {
        body['role'] = 2;
      } else if (this.createForm.controls['role'].value === '3') {
        body['role'] = 3;
      } else {
        body['role'] = 0;
      }
      body['session'] = this.sessionId;
      this.commonService.createUser(body).subscribe(
        (res: any) => {
          console.log('createUser:');
          console.log(res);
          this.createModalRef.close();
          this.getAccountList();
        }
      );
    }
  }

  openDelectModal(accountLists: Users) {
    this.selectUser = accountLists;
    this.deleteModalRef = this.dialog.open(this.deleteModal, { id: 'deleteModal' });
  }

  delete() {
    if (this.commonService.isLocal) {
      /* local file test */
      for (let i = 0; i < this.commonService.accountLists.users.length; i++) {
        if (this.selectUser.id === this.commonService.accountLists.users[i].id) {
          this.commonService.accountLists.users.splice(i, 1);
          break;
        }
      }
      this.deleteModalRef.close();
      this.getAccountList();
    } else {
      const removeBsBody = {
        id: this.selectUser.id,
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
      this.commonService.removeUser(httpOptions).subscribe(
        res => {
          console.log('deleteOcloud:');
          console.log(this.selectUser.id);
          this.deleteModalRef.close();
          this.getAccountList();
        }
      );
    }
  }

  typeText(role: number): string {
    return this.typeMap.get(role) as string;
  }

  pageChanged(page: number) {
    this.p = page;
  }

  viewPage(accountwareList: Users) {
    this.router.navigate(['/main/account-mgr/info', accountwareList.id, accountwareList.role]);
  }

  getAccountInfo(userid: string) {
    if (this.commonService.isLocal) {
      /* local file test */
      this.accountInfo = this.commonService.accountInfo;
    } else {
      this.commonService.queryUserInfo(userid).subscribe(
        res => {
          console.log('getAccountInfo:');
          console.log('tt'+userid);
          const str = JSON.stringify(res);//convert array to string
          this.accountInfo = JSON.parse(str);
          this.accountInfo = res as AccountInfo;
        }
      );
    }
  }
  
  accInfoPage(Users: Users) {
    this.updateModalRef = this.dialog.open(this.accInfoModal, { id: 'accInfoModal' });
    //console.log(Users.id);
    this.getAccountInfo(Users.id);
    this.updateModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
  }

  openUpdateModel() {
    this.formValidated = false;
    this.updateModalRef = this.dialog.open(this.accInfoModal, { id: 'updateModal' });
    this.updateModalRef.afterClosed().subscribe(() => {
      this.formValidated = false;
    });
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
      this.getAccountList();
      this.nfRefresh();
    }
  }

  nfRefresh() {
    // refresh
    this.accInfoRefreshTimeout = window.setTimeout(() => this.getAccountList(), this.accInfoRefreshTime * 1000);
  }
}
