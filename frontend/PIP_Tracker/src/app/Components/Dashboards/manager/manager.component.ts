import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ManagerDashboardComponent } from './manager-dashboard/manager-dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { FeedbackComponent } from "./feedback/feedback.component";
import { AddEmployeeComponent } from '../hr/add-employee/add-employee.component';
import { SkillGapFormComponent } from "./skill-gap-form/skill-gap-form.component";
import { SubmitPerformanceReviewComponent } from "./submit-performance-review/submit-performance-review.component";
import { Router } from '@angular/router';



@Component({
  selector: 'app-manager',
  standalone: true,
  imports: [
    CommonModule,
    EmployeeListComponent,
    ManagerDashboardComponent,
    HttpClientModule,
    FeedbackComponent,
    SubmitPerformanceReviewComponent,
    AddEmployeeComponent,
    SkillGapFormComponent,
    SubmitPerformanceReviewComponent
],

  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ManagerComponent {
  currentView = 'Manager-dashboard';
  isDarkMode = false;
  showToast = false;

  constructor(private router: Router) {}

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const html = document.documentElement;
    const body = document.body;
    html.classList.toggle('dark', this.isDarkMode);
    body.classList.toggle('dark', this.isDarkMode);
  }

  logout() {
    this.showToast = true;

    // Fade out toast before redirect
    setTimeout(() => {
      this.showToast = false;
    }, 1800);

    // Navigate after toast is shown
    setTimeout(() => {
      this.router.navigate(['/hero']);
    }, 2000);
  }
}
