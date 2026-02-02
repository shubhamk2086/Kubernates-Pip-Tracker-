import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, transition, animate, style } from '@angular/animations';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [
    trigger('fadeOutUp', [
      transition(':leave', [
        animate('300ms ease', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class LoginComponent {
  showLogin = true;
  email = '';
  password = '';
  errorMessage = '';
  role = 'ADMIN';
  isLoading = false;
  showPassword = false;
  showToast = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  login() {
    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (!email || !password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;

    this.employeeService.login(email, password).subscribe({
      next: (res: any) => {
        const role = res.employee.role?.toUpperCase();

        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.employee.id); 
        localStorage.setItem('email', res.employee.email);
        localStorage.setItem('role', role);
        localStorage.setItem('user', JSON.stringify(res.employee));

        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;
          switch (role) {
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
            case 'HR':
              this.router.navigate(['/hr']);
              break;
            case 'MANAGER':
              this.router.navigate(['/manager']);
              break;
            case 'EMPLOYEE':
              this.router.navigate(['/empdashboard']);
              break;
            default:
              this.errorMessage = 'Unknown role. Please contact admin.';
          }
        }, 1500);

        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Login failed: Invalid credentials or unauthorized.';
        console.error('❌ Login Error:', err);
        this.isLoading = false;
      }
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }

  navigatetoemp() {
    this.role = 'EMPLOYEE';
    this.errorMessage = '';
  }

  navigatetohr() {
    this.role = 'HR';
    this.errorMessage = '';
  }

  navigatetomanager() {
    this.role = 'MANAGER';
    this.errorMessage = '';
  }

  navigatetoadmin() {
    this.role = 'ADMIN';
    this.errorMessage = '';
  }

  onClose() {
    this.errorMessage = '';
  }
}