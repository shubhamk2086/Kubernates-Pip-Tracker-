import { Component, OnInit } from '@angular/core';

import { HttpHeaders } from '@angular/common/http';



import { EmployeeService } from '../../../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({

  selector: 'app-feedback',

  standalone: true,

  imports: [CommonModule,FormsModule],

  templateUrl: './feedback.component.html',

  styleUrls: ['./feedback.component.css']

})

export class FeedbackComponent implements OnInit {

  employees: any[] = [];

  selectedEmployeeId: string | null = null;

  comment = '';

  rating = 5;
employeeList: any;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {

    const token = localStorage.getItem('token');

    console.log('Token on Init:', token);

    this.fetchAssignedEmployees();

  }

  fetchAssignedEmployees() {

    this.employeeService.getAssignedEmployees().subscribe({

      next: (res: any[]) => {

        console.log('✅ Assigned employees:', res);

        this.employees = res;

      },

      error: (err: any) => {

        console.error('❌ Error fetching employees:', err);

        alert('⚠️ Unauthorized or failed to fetch assigned employees');

      }

    });

  }

  submitFeedback() {

    console.log('Selected Employee ID:', this.selectedEmployeeId);

    if (!this.selectedEmployeeId) {

      alert('❗ Please select a valid employee before submitting.');

      return;

    }

    const token = localStorage.getItem('token') || '';

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const feedbackData = {

      toUserId: this.selectedEmployeeId,

      feedbackType: 'MANAGER',

      comments: this.comment,

      rating: this.rating,

      isAnonymous: false

    };

    console.log(' Submitting Feedback:', feedbackData);

    this.employeeService.submitFeedback(feedbackData, headers).subscribe({

      next: (res) => {

        console.log('✅ Feedback submitted:', res);

        alert(' Feedback submitted successfully!');

        this.comment = '';

        this.rating = 5;

        this.selectedEmployeeId = null;

        this.fetchAssignedEmployees(); // Optional refresh

      },

      error: (err) => {

        console.error('❌ Error submitting feedback:', err);

        alert('Failed to submit feedback.');

      }

    });

  }

}

