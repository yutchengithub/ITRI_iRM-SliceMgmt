import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ComponentManagementComponent } from './component-management/component-management.component';
import { ComponentInfoComponent } from './component-management/component-info/component-info.component';
import { LoginComponent } from './login/login.component';
import { FieldManagementComponent } from './field-management/field-management.component';
import { NfManagementComponent } from './nf-management/nf-management.component';
import { FaultManagementComponent } from './fault-management/fault-management.component';
import { PerformanceManagementComponent } from './performance-management/performance-management.component';
import { SoftwareManagementComponent } from './software-management/software-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AccountInfoComponent } from './account-management/account-info/account-info.component';
import { SoftwareInfoComponent } from './software-management/software-info/software-info.component';
import { LogManagementComponent } from './log-management/log-management.component';   // @10/25 Add by yuchen 
import { MainComponent } from './main/main.component';
import { DxCircularGaugeModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { OCloudInfoComponent } from './field-management/field-info/field-info.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { CommonService } from './shared/common.service';
import { AuthGuard } from './shared/guard/auth.guard';
import { HttpErrorInterceptor } from './shared/http-error.interceptor';
import { DatePickerFormatDirective } from './shared/directive/date-picker-format.directive';
import { TruncatePipe } from './shared/pipes/truncate.pipe';  // @11/16 Add by yuchen 
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { CalendarModule } from 'primeng/calendar';
import { TooltipModule } from 'ng2-tooltip-directive';
import { TabViewModule } from 'primeng/tabview';
import { ChartModule } from 'primeng/chart';
import { NfInfoComponent } from './nf-management/nf-info/nf-info.component';
import { OCloudPerformanceComponent } from './performance-management/o-cloud-performance/o-cloud-performance.component';
import { NfPerformanceComponent } from './performance-management/nf-performance/nf-performance.component';
import { NfPerformanceInfoComponent } from './performance-management/nf-performance-info/nf-performance-info.component';
import { OCloudPerformanceInfoComponent } from './performance-management/o-cloud-performance-info/o-cloud-performance-info.component';
import { LanguageService } from './shared/service/language.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ComponentManagementComponent,
    ComponentInfoComponent,
    LoginComponent,
    FieldManagementComponent,
    NfManagementComponent,
    FaultManagementComponent,
    PerformanceManagementComponent,
    SoftwareManagementComponent,
    SoftwareInfoComponent,
    AccountManagementComponent,
    AccountInfoComponent,
    LogManagementComponent,    // @10/25 Add by yuchen 
    TruncatePipe,              // @11/16 Add by yuchen 
    MainComponent,
    OCloudInfoComponent,
    DatePickerFormatDirective,
    NfInfoComponent,
    OCloudPerformanceComponent,
    NfPerformanceComponent,
    NfPerformanceInfoComponent,
    OCloudPerformanceInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DxCircularGaugeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatMenuModule,
    MatDatepickerModule,
    MatMomentDateModule,
    CalendarModule,
    TooltipModule,
    TabViewModule,
    ChartModule,
    MatSlideToggleModule
  ],
  providers: [
    AuthGuard,
    LanguageService,
    CommonService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [CommonService],
      useFactory: (commonService: CommonService) => {
        return () => commonService.loadConfig();
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
