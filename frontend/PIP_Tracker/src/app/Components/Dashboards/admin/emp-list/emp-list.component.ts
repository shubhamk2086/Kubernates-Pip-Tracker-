import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../services/employee.service';

@Component({
  selector: 'app-emp-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {
  hrEmployees: any[] = [];
  managerEmployees: any[] = [];
  normalEmployees: any[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    const token = localStorage.getItem('token') || '';
    this.employeeService.getAllEmployees(token).subscribe({
      next: (data: any[]) => {
        this.hrEmployees = data.filter(emp => emp.role?.toUpperCase() === 'HR');
        this.managerEmployees = data.filter(emp => emp.role?.toUpperCase() === 'MANAGER');
        this.normalEmployees = data.filter(emp => emp.role?.toUpperCase() === 'EMPLOYEE');
      },
      error: (err) => {
        console.error('❌ Failed to load employees', err);
      }
    });
  }
}
