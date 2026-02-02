import { Component } from '@angular/core';
import { AddashboardComponent } from './addashboard/addashboard.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDirComponent } from './employee-dir/employee-dir.component';
import { ManagersComponent } from './managers/managers.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AssignManagerComponent } from "./assign-manager/assign-manager.component";
import { FormsModule } from '@angular/forms';
import { AddToPipComponent } from "./add-to-pip/add-to-pip.component";


@Component({
  selector: 'app-hr',
  standalone: true,
  imports: [AddashboardComponent, FormsModule, AddEmployeeComponent, EmployeeDirComponent, ManagersComponent, CommonModule, AssignManagerComponent, AddToPipComponent],
  templateUrl: './hr.component.html',
  styleUrl: './hr.component.css'
})
export class HRComponent {
  currentView = "Dashboard"

  today: Date = new Date();
  showToast: boolean | undefined;

  constructor(private router: Router) { }

  logout() {
    this.showToast = true;
  
    
    setTimeout(() => {
      this.router.navigate(['/hero']);
    }, 2000); 
  }
  
  goBackToLogin() {
    throw new Error('Method not implemented.');
  }
}
