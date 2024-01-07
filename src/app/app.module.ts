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
import { BSManagementComponent } from './bs-management/bs-management.component'; // @12/27 Add by yuchen 
import { BSInfoComponent } from './bs-management/bs-info/bs-info.component';     // @12/27 Add by yuchen 
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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Spinner
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

import { GoogleMapsModule } from '@angular/google-maps';        // @12/10 Add by yuchen for google maps
import { NgCircleProgressModule } from 'ng-circle-progress';    // @12/11 Add by yuchen for 圓形進度條
import { MatButtonModule } from '@angular/material/button';     // @12/12 Add by yuchen for Button 樣式
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ToggleButtonModule } from 'primeng/togglebutton';

import { localBSinfo } from './shared/local-files/For_BS';       // @12/27 Add 
import { apiForField } from './shared/api/For_Field'; // @2024/01/04 Add 

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ComponentManagementComponent,
    ComponentInfoComponent,
    LoginComponent,
    FieldManagementComponent,
    FieldInfoComponent,           // @11/30 Add by yuchen
    BSManagementComponent,        // @12/27 Add by yuchen 
    BSInfoComponent,              // @12/27 Add by yuchen
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
    GoogleMapsModule,                 // @12/10 Add by yuchen for google maps
    NgCircleProgressModule.forRoot({  // @12/11 Add by yuchen for 圓形進度條
      maxPercent: 100,
      radius: 45,                  // 圓的半徑，單位:像素(px)。這會影響到圓形進度條的大小。
      outerStrokeWidth: 8,         // 圓形進度條外圈的線條寬度，單位:像素(px)。
      space: -8,
      innerStrokeWidth: 8,         // 圓形進度條內圈的線條寬度，單位:像素(px)。
      outerStrokeColor: "#39b3fe", // 定義圓形進度條外圈線條的顏色，可是任何合法的 CSS 顏色值。
      innerStrokeColor: "#b6d8fb", // 定義圓形進度條內圈線條的顏色，可是任何合法的 CSS 顏色值。
      animationDuration: 300,      // 定義動畫從 0% 到指定百分比的過渡時間，單位: 毫秒(ms)。
      titleColor: '#a3bfff',       // 標題文字顏色
      unitsColor: '#a3bfff',       // 單位文字顏色
      titleFontSize: '24',         // 標題文字大小
      unitsFontSize: '18',         // 單位文字大小 
      titleFontWeight: '750',      // 標題文字粗度
      unitsFontWeight: '900',      // 單位文字粗度
      showSubtitle: false          // 設定是否顯示副標題，true:顯示，false:隱藏。
    }),
    MatButtonModule,               // @12/12 Add by yuchen for Button 樣式
    MatListModule,                 // @12/12 Add by yuchen
    MatDividerModule,              // @12/12 Add by yuchen for Divider 
    ToggleButtonModule             // @12/13 Add by yuchen for Toggle Button
  ],
  providers: [
    AuthGuard,
    LanguageService,
    CommonService,
    localBSinfo,  // @12/27 Add for import BS Local files
    apiForField,  // @2024/01/04 Add for import API of Field Management 
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

    // 添加自定義圖標 'BaseStation'，並設置其路徑 @12/12 Add
    this.matIconRegistry.addSvgIcon(
      'BaseStation', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/img/base-station-signal.svg')
    );
  }

}
