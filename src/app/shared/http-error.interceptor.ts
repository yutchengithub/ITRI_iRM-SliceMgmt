import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import { ResponseMessage } from './models/ResponseMessage';

export class HttpErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error) => {
          console.log('HttpErrorInterceptor:');
          console.log(error);
          const err = new ResponseMessage();
          if (error != null) {
            switch (error.status) {
              case 401:
                // 在login page, 如果Status code 401 前端error message 是 Session ID 已過期，請重新登錄
                err.respMsg = 'logon.401';    // i18n property
                window.sessionStorage.setItem('401_error', err.respMsg);
                window.sessionStorage.removeItem('sessionId');
                window.location.reload();
                break;
              case 403:
                // 在login page, 如果Status code 403 前端error message 是 帳號、密碼輸入錯誤
                err.respMsg = 'logon.403';    // i18n property
                break;
              case 404:
                // 在login page, 如果Status code 404 前端error message 是此賬號不存在
                err.respMsg = 'logon.404';    // i18n property
                break;
              default:

            }
          } else {
            err.respMsg = error.message ? error.message : error.toString();
          }
          return throwError(err);
        }
        )
      );
  }
}
