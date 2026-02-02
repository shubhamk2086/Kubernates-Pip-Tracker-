import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { LearningResourcesComponent } from './learning-resources/learning-resources.component';
import { FeedbackNotesComponent } from './feedback-notes/feedback-notes.component';
import { EmpSettingsComponent } from './settings/settings.component';
import { SkillAnalyticsComponent } from "./skill-analytics/skill-analytics.component";
import { PerformanceReviewComponent } from "./performance-review/performance-review.component";
import { ReportComponent } from "../admin/report/report.component";

@Component({
  selector: 'app-empdashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeedbackNotesComponent,
    LearningResourcesComponent,
    EmpSettingsComponent,
    SkillAnalyticsComponent,
    PerformanceReviewComponent,
    ReportComponent,
],
  templateUrl: './empdashboard.component.html',
  styleUrls: ['./empdashboard.component.css']
})
export class EmpdashboardComponent implements OnInit {
  currentView: string = 'dashboard';
  showLogoutToast: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const segments = event.urlAfterRedirects.split('/');
        this.currentView = segments[segments.length - 1] || 'dashboard';
      }
    });
  }

  logout(): void {
    localStorage.clear();
    this.showLogoutToast = true;

    // Hide toast after 2 seconds
    setTimeout(() => {
      this.showLogoutToast = false;
    }, 1800);

    // Navigate after toast is shown
    setTimeout(() => {
      this.router.navigate(['/hero']);
    }, 2000);
  }
}
