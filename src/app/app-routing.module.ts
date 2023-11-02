import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';   // 主畫面
import { FieldManagementComponent } from './field-management/field-management.component';    // O-Cloud管理
import { OCloudInfoComponent } from './field-management/field-info/field-info.component';
import { NfManagementComponent } from './nf-management/nf-management.component';      // NF管理
import { NfInfoComponent } from './nf-management/nf-info/nf-info.component';
import { FaultManagementComponent } from './fault-management/fault-management.component';   // 故障管理
import { PerformanceManagementComponent } from './performance-management/performance-management.component';   // 效能管理
import { OCloudPerformanceInfoComponent } from './performance-management/o-cloud-performance-info/o-cloud-performance-info.component';
import { NfPerformanceInfoComponent } from './performance-management/nf-performance-info/nf-performance-info.component';
import { SoftwareManagementComponent } from './software-management/software-management.component';      // 軟體管理
import { AccountManagementComponent } from './account-management/account-management.component';      // 帳號管理
import { AuthGuard } from './shared/guard/auth.guard';
import { SoftwareInfoComponent } from './software-management/software-info/software-info.component';
import { AccountInfoComponent } from './account-management/account-info/account-info.component';
import { LogManagementComponent } from './log-management/log-management.component';      // 日誌管理 add by yutchen @10/25


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      {
        path: 'field-mgr',
        children: [
          { path: '', component: FieldManagementComponent },
          { path: 'info/:cloudId/:cloudName', component: OCloudInfoComponent }
        ]
      },
      {
        path: 'nf-mgr', children: [
          { path: '', component: NfManagementComponent },
          { path: 'info/:nfId/:dmsId', component: NfInfoComponent },
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
        path: 'account-mgr',
        children: [
          { path: '', component: AccountManagementComponent },
          { path: 'info/:cloudId/:cloudName', component: AccountInfoComponent }
        ]
      },
      { // add by yutchen @10/25
        path: 'log-mgr', component: LogManagementComponent
        /*children: [
          { path: '', component: LogManagementComponent },
          { path: 'info/:cloudId/:cloudName', component: LogInfoComponent }
        ]*/
      },
      { path: 'fault-mgr/:cloudName/:nfName', component: FaultManagementComponent },
      { path: 'performance-mgr', component: PerformanceManagementComponent },
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
