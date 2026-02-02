

import { Component, inject } from '@angular/core';
import {
  FormBuilder, FormGroup, Validators,
  ReactiveFormsModule, AbstractControl, ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../services/employee.service';
 
@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  showPassword = false;
 
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeService);
 
  employeeForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), this.passwordValidator]],
    role: ['MANAGER', Validators.required],
    department: ['', [Validators.required, Validators.minLength(2)]],
    designation: ['', [Validators.required, Validators.minLength(2)]],
    skills: ['', [Validators.required, Validators.pattern(/^(.+\s*,\s*)*(.+)$/)]],
    managerId: ['', [Validators.pattern(/^[\w\d-]{36}$/)]],
    joiningDate: [this.getCurrentDateTimeLocal(), Validators.required],
    status: ['ACTIVE', Validators.required]
  });
 
  get passwordControl(): AbstractControl | null {
    return this.employeeForm?.get('password') ?? null;
  }
get nameControl(): AbstractControl {
  return this.employeeForm.get('name')!;
}
 
get emailControl(): AbstractControl {
  return this.employeeForm.get('email')!;
}
 
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
 
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasLetter = /[A-Za-z]/.test(value);
    const hasDigit = /\d/.test(value);
    return hasLetter && hasDigit ? null : { passwordComplexity: true };
  }
 
  getCurrentDateTimeLocal(): string {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }
 
  onSubmit(): void {
    if (!this.employeeForm.valid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
 
    const token = localStorage.getItem('token');
    if (!token) {
      alert('❌ Token not found! Please login again.');
      return;
    }
 
    const rawForm = this.employeeForm.value;
    const payload = {
      ...rawForm,
      joiningDate: new Date(rawForm.joiningDate).toISOString()
    };
 
    if (!payload.managerId || payload.managerId.trim().length !== 36) {
      delete payload.managerId;
    }
 
    this.employeeService.addEmployee(payload, token).subscribe({
      next: () => {
        alert('✅ Employee added successfully!');
        this.employeeForm.reset();
      },
      error: (err) => {
        console.error('❌ Error while adding employee:', err);
        const errorMsg = err?.status === 403
          ? 'HR is not authorized to create this role.'
          : 'Failed to add employee. Please try again.';
        alert(errorMsg);
      }
    });
  }
}
 