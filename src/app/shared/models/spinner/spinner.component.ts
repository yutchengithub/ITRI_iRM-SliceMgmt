import { Component, OnDestroy } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { LanguageService } from '../../service/language.service';
import { SpinnerService } from '../../service/spinner.service';

import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {
  cancelScpt?: Subscription;
  
  //isLoading: boolean = true; // 用於控制整頁式 Spinner 顯示的文字 

  constructor(
    
    public http: HttpClient,
    public languageService: LanguageService,
    public spinnerService: SpinnerService, // 注入 SpinnerService
    public spinner: NgxSpinnerService

  ) {

    // 假設您要訂閱某些可觀察物件（Observable），例如：
    // this.cancelScpt = this.someObservable.subscribe(data => { ... });

  }

  ngOnDestroy() {
    if ( this.cancelScpt ) this.cancelScpt.unsubscribe();
    
    // 確保取消訂閱來避免記憶體泄漏
    this.cancelScpt?.unsubscribe(); // 使用選擇鏈（optional chaining）操作符避免 null 檢查
  }

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }

}
