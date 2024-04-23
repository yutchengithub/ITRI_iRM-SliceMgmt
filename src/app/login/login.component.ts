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
  userRole: number | null = null;

  constructor(
    private router: Router,
    private http: HttpClient,
    private commonService: CommonService,
    public languageService: LanguageService
  ) { }

  ngOnInit(): void {

    // 語系預設
    if ( navigator.language === 'zh-TW' ) {
      this.languageService.language = 'TW';
    } else {
      this.languageService.language = 'EN';
    }
    this.languageService.setLanguage();

    // window.sessionStorage.setItem('401_error', 'logon.401');  // 測試 httpErrorMsg
    if ( window.sessionStorage.getItem('401_error') ) {
      this.showErrMssage( window.sessionStorage.getItem('401_error') as string )
    }
  }

  onLoggedin() {

    this.errorPorperty = '';
    window.sessionStorage.removeItem('401_error');

    if ( this.userId === '' || this.password === '' ) {
      this.showErrMssage('logon.required_error');     // 顯示"請輸入帳密"訊息
      return;
    }

    if ( this.commonService.isLocal ) {

      if ( this.userId.toLowerCase() === 'admin' && this.password.toLowerCase() === 'admin' ) {

        this.commonService.setSessionId('sessionId_test_0800'); // 預設的 local Session ID ( 無任何作用 )
        this.commonService.setUserId( this.userId );            // 設置使用者的登入名稱 ID @2024/04/22 Add
        
        this.router.navigate( ['/main/dashboard'] );
      } else {
        this.showErrMssage( this.languageService.i18n['logon.password_error'] );  // 顯示"輸入帳密錯誤"訊息
      }

    } else {

      //const url = `${this.commonService.restPath}/loginpage`;
      const url = `${this.commonService.restPath}/login`;   // 後端 router 為 '/login' @11/28 add by yuchen
      const body = {
        id: this.userId,
        key: this.password
      };

      // 調整為 RxJS 新版本 ( Observer ) 語法 @11/28 changed by yuchen
      this.http.post( url, JSON.stringify( body ) ).subscribe({
        next: ( res: any ) => {
          if ( res !== 'userID or password invalid' ) {

            this.commonService.setSessionId( res['session'] ); // 儲存 sessionId @11/28 sessionId -> session 以符合後端 API 的 Response
            console.log( res['session'] );

            this.commonService.setUserId( this.userId ); // 設置使用者的登入名稱 ID @2024/04/22 Add

            if( res.role === 1 ){
              this.router.navigate( ['/main/account-mgr'], { queryParams: { role: res.role } } );
            }
            else if ( res.role === 2 ){
              this.router.navigate( ['/main/dashboard'], { queryParams: { role: res.role } } ); // 導向主頁
            }      
          } else {
            this.showErrMssage( this.languageService.i18n['logon.password_error'] );  // 顯示"輸入帳密錯誤"訊息
          }
         // this.router.navigate(['/main/dashboard']);       // 導向主頁
        },
        error: ( err: ResponseMessage ) => {
          this.showErrMssage( err.respMsg as string );
        },
        complete: () => {
          console.log( 'Login request completed' );
        }
      });
    }
  }

  keypressHandler( event: any ) {
    if ( event.keyCode === 13 ) {
      this.onLoggedin();
    }
  }

  /**
   * @param property i18n key
   */
  showErrMssage( property: string ) {
    this.errorPorperty = property;
  }

}
