import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-hrlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hrlist.component.html',
  styleUrl: './hrlist.component.css'
})
export class HrlistComponent {
  hrList = [
    { name: 'Anjali Mehta', email: 'anjali@corp.com', employeeId: 'HR1023', department: 'Talent Acquisition' },
    { name: 'Rajiv Kapoor', email: 'rajiv@corp.com', employeeId: 'HR1057', department: 'Compensation' },
    { name: 'Swati Sharma', email: 'swati@corp.com', employeeId: 'HR1089', department: 'Compliance' }
    // Extend or fetch from backend later
  ];
}
