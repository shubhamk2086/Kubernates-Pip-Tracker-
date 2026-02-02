import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-records',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update-records.component.html',
  styleUrls: ['./update-records.component.css']
})
export class UpdateRecordsComponent implements OnInit {
  employeeList: any[] = [];
  selectedEmployee: any = null;
  showUpdateForm: boolean = false;
  showSuccessPopup: boolean = false;

  constructor(private empService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  // ✅ Load all employees
  loadEmployees(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('❌ No token found');
      return;
    }

    this.empService.getAllEmployees(token).subscribe({
      next: (res: any[]) => {
        this.employeeList = res.sort((a, b) => (a?.name ?? '').localeCompare(b?.name ?? ''));
      },
      error: (err) => {
        console.error('❌ Failed to load employees:', err);
      }
    });
  }

  // ✅ Click on Edit or Update
  onUpdateClick(emp: any): void {
    this.selectedEmployee = { ...emp };
    this.showUpdateForm = true;
    console.log('🔁 Update clicked:', emp);
  }

  onEditClick(emp: any): void {
    this.onUpdateClick(emp);
  }

  // update-records.component.ts file mein
onDeleteClick(id: string): void {
  const token = localStorage.getItem('token');
  console.log('✅ Token found:', token); 
  console.log('✅ ID to delete:', id); // <-- Yeh line add karein
  
  if(!token || !id) {
    console.error('❌ Token or ID missing. Please login again.');
    return;
  }

    this.empService.deleteEmployee(id, token).subscribe({
      next: () => {
        alert('✅ Employee deleted successfully!');
        this.loadEmployees();
      },
      error: (err) => {
        console.error('❌ Delete failed:', err);
        alert('❌ Failed to delete employee.');
      }
    });
  }

  // ✅ Submit update form
  submitUpdate(): void {
    const token = localStorage.getItem('token');
    const employeeId = this.selectedEmployee?.employeeId;

    if(!token || !employeeId) {
      console.error('❌ Token or employee ID missing');
      return;
    }

    this.empService.updateEmployee(employeeId, this.selectedEmployee, token).subscribe({
      next: (res) => {
        console.log('✅ Employee updated:', res);
        this.showSuccessPopup = true;
        this.showUpdateForm = false;
        this.loadEmployees();

        setTimeout(() => {
          this.showSuccessPopup = false;
        }, 3000);
      },
      error: (err) => {
        console.error('❌ Update failed:', err);
        alert('❌ Failed to update employee.');
      }
    });
  }
}