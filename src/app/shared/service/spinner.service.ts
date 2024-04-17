// Spinner Service @2024/04/17 Add

import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  constructor(private spinner: NgxSpinnerService) {}

  isLoading: boolean = true; // 用於控制整頁式 Spinner 顯示的文字 

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }
}
