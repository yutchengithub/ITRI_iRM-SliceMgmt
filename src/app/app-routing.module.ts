import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/guard/auth.guard';
import { RouterModule, Routes } from '@angular/router';

// 底畫面 ( 網頁整體最下層 有 Bar 那塊 )
import { MainComponent } from './main/main.component';

// 登入畫面
import { LoginComponent } from './login/login.component';

// 主畫面 Portal
import { DashboardComponent } from './dashboard/dashboard.component';   // 主畫面

// 場域管理
import { FieldManagementComponent } from './field-management/field-management.component'; 
import { FieldInfoComponent }       from './field-management/field-info/field-info.component';

// 基站管理 頁     @12/27 Add by yuchen 
import { BSManagementComponent } from './bs-management/bs-management.component';                        
import { BSInfoComponent }       from './bs-management/bs-info/bs-info.component'; // 基站管理資訊  @12/27 Add by yuchen 

// 元件管理頁
import { ComponentManagementComponent } from './component-management/component-management.component';
import { ComponentInfoComponent }       from './component-management/component-info/component-info.component';

// 故障管理頁
import { FaultManagementComponent } from './fault-management/fault-management.component';  

// 效能管理 頁
import { PerformanceManagementComponent } from './performance-management/performance-management.component';  
import { OCloudPerformanceInfoComponent } from './performance-management/o-cloud-performance-info/o-cloud-performance-info.component';
import { NfPerformanceInfoComponent }     from './performance-management/nf-performance-info/nf-performance-info.component';

// 切片管理 頁 @2024/05/03 Add by Yuchen
import { SliceManagementComponent } from './slice-management/slice-management.component';     
import { SliceInfoComponent }       from './slice-management/slice-info/slice-info.component'; // 切片管理資訊頁

// 軟體管理 頁
import { SoftwareManagementComponent } from './software-management/software-management.component';     
import { SoftwareInfoComponent }       from './software-management/software-info/software-info.component';

// 排程管理 頁 @11/20 Add by yuchen
import { ScheduleManagementComponent } from './schedule-management/schedule-management.component';     
import { ScheduleInfoComponent }       from './schedule-management/schedule-info/schedule-info.component'; // 排程管理資訊  @11/20 Add by yuchen 

// 日誌管理 頁  @10/25 Add by yuchen 
import { LogManagementComponent }     from './log-management/log-management.component';   

// 帳號管理 頁
import { AccountManagementComponent } from './account-management/account-management.component';      
import { AccountInfoComponent }       from './account-management/account-info/account-info.component';

// O2 的 ( 最後刪掉 )
import { NfManagementComponent } from './nf-management/nf-management.component';   // NF 管理
import { NfInfoComponent }       from './nf-management/nf-info/nf-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', component: DashboardComponent 
      },
      { 
        // Field Management @11/30 Update by yuchen
        path: 'field-mgr',
        children: [
          { path: '', component: FieldManagementComponent },
          { path: 'info/:id/:name', component: FieldInfoComponent }
        ]
      },
      { 
        // BS Management @03/25 Update by yuchen
        path: 'bs-mgr',
        children: [
          { path: '', component: BSManagementComponent },
          { path: 'info/:id/:name/:type', component: BSInfoComponent }
        ]
      },
      {
        path: 'component-mgr',
        children: [
          { path: '', component: ComponentManagementComponent },
          // { path: 'info/:id/:name', component: ComponentInfoComponent },
          { path: 'info/:id', component: ComponentInfoComponent }
        ]
      },
      { 
        path: 'fault-mgr/:fieldName/:nfName', component: FaultManagementComponent
      },
      { 
        path: 'performance-mgr', component: PerformanceManagementComponent 
      },
      { 
        // Slice Management @2024/05/03 Add by Yuchen
        path: 'slice-mgr',
        children: [
          { path: '', component: SliceManagementComponent },
          { path: 'info/:id/:type', component: SliceInfoComponent }
        ]
      },
      {
        path: 'software-mgr',
        children: [
          { path: '', component: SoftwareManagementComponent },
          { path: 'info/:cloudId/:cloudName', component: SoftwareInfoComponent }
        ]
      },
      { 
        // Schedule Management @11/20 Add by yuchen
        path: 'schedule-mgr',
        children: [
          { path: '', component: ScheduleManagementComponent },
          { path: 'info/:id/:type', component: ScheduleInfoComponent }
        ]
      },
      { 
        // Log Management @10/25 Add by yuchen
        path: 'log-mgr', component: LogManagementComponent
      },
      {
        path: 'account-mgr',
        children: [
          { path: '', component: AccountManagementComponent },
          { path: 'info/:cloudId/:cloudName', component: AccountInfoComponent }
        ]
      },
      { 
        path: 'nf-mgr', children: [
          { path: '', component: NfManagementComponent },
          { path: 'info/:nfId/:dmsId', component: NfInfoComponent },
        ]
      },
      { path: 'o-cloud-performance-info/:cloudId/:name', component: OCloudPerformanceInfoComponent },
      { path: 'nf-performance-info/:nfId/:name', component: NfPerformanceInfoComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
