import { Routes } from '@angular/router';
import { HeroComponent } from './Components/hero/hero.component';
import { LoginComponent } from './Components/login/login.component';
import { EmpdashboardComponent } from './Components/Dashboards/empdashboard/empdashboard.component';
import { ManagerComponent } from './Components/Dashboards/manager/manager.component';
import { AdminComponent } from './Components/Dashboards/admin/admin.component';
import { HRComponent } from './Components/Dashboards/hr/hr.component';
import { forgotPasswordRoutes } from './Components/forgot-password/forgot-password.route';

export const routes: Routes = [
  { path: '', redirectTo: 'hero', pathMatch: 'full' },
  { path: 'hero', component: HeroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'empdashboard', component: EmpdashboardComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'hr', component: HRComponent },

  // 🔐 Forgot Password Routes
  {
    path: 'forgot-password',
    children: forgotPasswordRoutes,
    pathMatch: 'prefix'
  }
];
