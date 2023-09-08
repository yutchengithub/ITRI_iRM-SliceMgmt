import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../shared/common.service';
import { ResponseMessage } from '../shared/models/ResponseMessage';
import { LanguageService } from '../shared/service/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userId: string = '';
  password: string = '';
  errorPorperty: string = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonService: CommonService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {
    /* default語系 */
    if (navigator.language === 'zh-TW') {
      this.languageService.language = 'TW';
    } else {
      this.languageService.language = 'EN';
    }
    this.languageService.setLanguage();

    // window.sessionStorage.setItem('401_error', 'logon.401');  // 測試 httpErrorMsg
    if (window.sessionStorage.getItem('401_error')) {
      this.showErrMssage(window.sessionStorage.getItem('401_error') as string)
    }
  }

  onLoggedin() {
    this.errorPorperty = '';
    window.sessionStorage.removeItem('401_error');
    if (this.userId === '' || this.password === '') {
      this.showErrMssage('logon.required_error');
      return;
    }

    if (this.commonService.isLocal) {

      if (this.userId.toLowerCase() === 'admin' && this.password.toLowerCase() === 'admin') {
        this.commonService.setSessionId('sessionId_test_0800');
        this.router.navigate(['/main/dashboard']);
      } else {
        this.showErrMssage('logon.password_error');
      }

    } else {
      const url = `${this.commonService.restPath}/loginpage`;
      const body = {
        id: this.userId,
        key: this.password
      };
      this.http.post(url, JSON.stringify(body)).subscribe(
        (res: any) => {
          // if (res !== 'userID or password invalid') {
          //   this.router.navigate(['/main/dashboard']);
          // } else {
          //   this.errMsg = this.languageService.i18n['logon.password_error'];;
          // }

          this.commonService.setSessionId(res['sessionId']);  // 儲存 sessiondId
          this.router.navigate(['/main/dashboard']);    // 導向主頁

        }, (err: ResponseMessage) => {
          this.showErrMssage(err.respMsg as string);
        }
      );
    }
  }

  keypressHandler(event: any) {
    if (event.keyCode === 13) {
      this.onLoggedin();
    }
  }

  /**
   * @param property i18n key
   */
  showErrMssage(property: string) {
    this.errorPorperty = property;
  }

}
