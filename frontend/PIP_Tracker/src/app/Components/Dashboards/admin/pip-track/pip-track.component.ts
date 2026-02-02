import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

import { EmployeeService } from '../../../../services/employee.service';
 
@Component({

  selector: 'app-pip-track',

  standalone: true,

  imports: [CommonModule, RouterModule],

  templateUrl: './pip-track.component.html',

  styleUrls: ['./pip-track.component.css']

})

export class PIPTrackComponent implements OnInit {

  pipList: any[] = [];

  loading = false;

  errorMessage = '';
 
  constructor(private employeeService: EmployeeService) {}
 
  ngOnInit(): void {

    this.fetchPIPData();

  }
 
  fetchPIPData(): void {

    this.loading = true;

    const token = localStorage.getItem('token') || '';
 
    this.employeeService.getAllPipEntries(token).subscribe({

      next: (res) => {

        console.log('✅ PIP response:', res);

        this.pipList = res;

        this.loading = false;

      },

      error: (err) => {

        console.error('❌ Error fetching PIP data:', err);

        this.errorMessage = 'Failed to load PIP data. No PIP entries found.';

        this.loading = false;

      }

    });

  }

}

 