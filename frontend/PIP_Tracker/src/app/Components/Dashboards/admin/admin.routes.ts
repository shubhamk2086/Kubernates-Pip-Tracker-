import { Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddhrComponent } from './addhr/addhr.component';
import { DashComponent } from './dash/dash.component';
import { ReportComponent } from './report/report.component';
import { HrlistComponent } from './hrlist/hrlist.component';
import { EmpListComponent } from './emp-list/emp-list.component';



export const branchManagerRoutes: Routes = [
  { path: '', redirectTo: 'addhr', pathMatch: 'full' }, // 👈 Redirect to addhr on login
  {path:'',component:DashComponent},
  {path:'addhr',component: AddhrComponent},
  {path:'report',component:ReportComponent}, // Default view
  {path:'hrlist',component:HrlistComponent}, // Default view
  {path:'emp-list',component:EmpListComponent},



];
