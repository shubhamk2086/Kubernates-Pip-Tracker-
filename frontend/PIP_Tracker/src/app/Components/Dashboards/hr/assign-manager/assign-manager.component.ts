import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assign-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assign-manager.component.html',
  styleUrls: ['./assign-manager.component.css']
})
export class AssignManagerComponent implements OnInit {
  employeeList: any[] = [];
  managerList: any[] = [];
  selectedEmployeeId: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.loadManagers();
  }

  loadEmployees(): void {
    const token = localStorage.getItem('token') || '';
    this.employeeService.getAllEmployees(token).subscribe({
      next: (data: any[]) => {
        this.employeeList = data.filter(emp =>
          emp.role?.toLowerCase().includes('employee')
        );
        console.log('📦 Employees:', this.employeeList);
      },
      error: (err: any) => console.error('❌ Failed to load employees', err)
    });
  }

  loadManagers(): void {
    const token = localStorage.getItem('token') || '';
    this.employeeService.getAllEmployees(token).subscribe({
      next: (data: any[]) => {
        this.managerList = data
          .filter(emp => emp.role?.toLowerCase().includes('manager'))
          .map(mgr => ({
            ...mgr,
            assigned: mgr.isAssigned || false // You can replace this with actual backend field
          }));
        console.log('📦 Managers:', this.managerList);
        // console.log('📦 First manager object:', data[0]); // ✅ Keep it here inside `next`
      },
      error: (err: any) => console.error('❌ Failed to load managers', err)
    });
    
  }

  assignManagerToEmployee(managerId: string): void {
    console.log('🟡 Selected Employee:', this.selectedEmployeeId);
    console.log('🟡 Manager to assign:', managerId);
  const token = localStorage.getItem('token') || '';

  if (!this.selectedEmployeeId) {
    alert('⚠️ add First Employee चुनें!');
    return;
  }

  console.log('Selected Employee ID:', this.selectedEmployeeId);
  console.log('Manager ID to Assign:', managerId);

  this.employeeService.assignManager(this.selectedEmployeeId, managerId, token).subscribe({
  next: res => {
    alert('🎉 Manager assigned successfully!');
    this.loadManagers();
    this.selectedEmployeeId = '';
  },
  error: err => {
    alert('❌ Failed to assign. Try again!');
    console.error(err);
  }
});

}

}
