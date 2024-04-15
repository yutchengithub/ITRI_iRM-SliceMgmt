import { Component, OnDestroy } from '@angular/core';
import { BaseService } from 'src/app/service/base.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {
  cancelScpt: Subscription;

  constructor(
    public spinner: NgxSpinnerService,
    public baseService: BaseService,
    public http: HttpClient
  ) {

  }

  ngOnDestroy() {
    if (this.cancelScpt) this.cancelScpt.unsubscribe();
  }

  show() {
    this.spinner.show();
  }

  hide() {
    this.spinner.hide();
  }

}
