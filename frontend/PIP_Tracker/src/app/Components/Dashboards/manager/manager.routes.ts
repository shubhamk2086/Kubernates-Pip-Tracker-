import { Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
// import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { SettingsComponent } from './settings.component';
import { PerformanceReviewComponent } from './performance-review/performance-review.component';

export const managerRoutes: Routes = [
  // { path: 'manager-dashboard', component: ManagerDashboardComponent },
  { path: 'employees-list', component: EmployeeListComponent },
  { path: 'performance-review', component: PerformanceReviewComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: 'manager-dashboard', pathMatch: 'full' }
];

