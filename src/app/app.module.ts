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
import { FieldInfoComponent } from './field-management/field-info/field-info.component';
import { NfManagementComponent } from './nf-management/nf-management.component';
import { FaultManagementComponent } from './fault-management/fault-management.component';
import { PerformanceManagementComponent } from './performance-management/performance-management.component';
import { SoftwareManagementComponent } from './software-management/software-management.component';
import { AccountManagementComponent } from './account-management/account-management.component';
import { AccountInfoComponent } from './account-management/account-info/account-info.component';
import { SoftwareInfoComponent } from './software-management/software-info/software-info.component';
import { ScheduleManagementComponent } from './schedule-management/schedule-management.component';    // @11/20 Add by yuchen 
import { ScheduleInfoComponent } from './schedule-management/schedule-info/schedule-info.component';  // @11/20 Add by yuchen 
import { LogManagementComponent } from './log-management/log-management.component';                   // @10/25 Add by yuchen 
import { MainComponent } from './main/main.component';
import { DxCircularGaugeModule } from 'devextreme-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule, MatIconRegistry } from '@angular/material/icon'; // @12/06 Add MatIconRegistry by yuchen 
import { DomSanitizer } from '@angular/platform-browser';                // @12/06 Add by yuchen

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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

import { GoogleMapsModule } from '@angular/google-maps';  // @12/10 Add by yuchen for googlemaps


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ComponentManagementComponent,
    ComponentInfoComponent,
    LoginComponent,
    FieldManagementComponent,
    FieldInfoComponent,           // @11/30 Add by yuchen
    NfManagementComponent,
    FaultManagementComponent,
    PerformanceManagementComponent,
    SoftwareManagementComponent,
    SoftwareInfoComponent,
    AccountManagementComponent,
    AccountInfoComponent,
    ScheduleManagementComponent,  // @11/20 Add by yuchen 
    ScheduleInfoComponent,        // @11/20 Add by yuchen 
    LogManagementComponent,       // @10/25 Add by yuchen 
    TruncatePipe,                 // @11/16 Add by yuchen 
    MainComponent,
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
    MatSlideToggleModule,
    GoogleMapsModule,     // @12/10 Add by yuchen 
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
export class AppModule { 

// 在 Angular 服務中註冊自定義圖標 @12/06 Add by yuchen
constructor(
  private matIconRegistry: MatIconRegistry, // 注入 Material 圖標註冊服務
  private domSanitizer: DomSanitizer        // 使用 DomSanitizer ( DOM 淨化服務 ) 確保自定義 SVG 圖標的 URL 安全，預防 XSS 攻擊

) {

  // 添加自定義圖標 'export_to_xlsx'，並設置其路徑
  this.matIconRegistry.addSvgIcon(
    'export_to_xlsx', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/xlsx.svg')
  );

  // 添加自定義圖標 'export_to_csv'，並設置其路徑
  this.matIconRegistry.addSvgIcon(
    'export_to_csv', 
    this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/csv.svg')
  );
}

}
