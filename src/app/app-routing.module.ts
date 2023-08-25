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
import { AuthGuard } from './shared/guard/auth.guard';

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
      { path: 'fault-mgr/:cloudName/:nfName', component: FaultManagementComponent },
      { path: 'performance-mgr', component: PerformanceManagementComponent },
      { path: 'o-cloud-performance-info/:cloudId/:name', component: OCloudPerformanceInfoComponent },
      { path: 'nf-performance-info/:nfId/:name', component: NfPerformanceInfoComponent },
      { path: 'software-mgr', component: SoftwareManagementComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
