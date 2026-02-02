import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { EmployeeService } from '../../../../services/employee.service';
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);

@Component({
  selector: 'app-addashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './addashboard.component.html',
  styleUrls: ['./addashboard.component.css']
})
export class AddashboardComponent implements AfterViewInit {
  totalEmployees = 0;
  pipCount = 0;
  inactiveCount = 0;
  token: string | null = null;

  constructor(private empService: EmployeeService) {}

  ngAfterViewInit(): void {
    this.token = localStorage.getItem('token');
    if (!this.token) {
      console.warn('⚠️ Token missing — cannot fetch HR dashboard data.');
      return;
    }

    // ✅ Total Employees
    this.empService.getAllEmployees(this.token).subscribe({
      next: (res: any[]) => {
        this.totalEmployees = res.length;
        console.log('✅ Total Employees:', this.totalEmployees);
      },
      error: err => console.error('❌ Total Employees fetch failed:', err)
    });

    // ✅ Under PIP
    this.empService.getEmployeesByStatus('PIP', this.token).subscribe({
      next: (res: any[]) => {
        this.pipCount = res.length;
        console.log('✅ Under PIP:', this.pipCount);
      },
      error: err => console.error('❌ PIP Count fetch failed:', err)
    });

    // ✅ Inactive Employees
    this.empService.getEmployeesByStatus('INACTIVE', this.token).subscribe({
      next: (res: any[]) => {
        this.inactiveCount = res.length;
        console.log('✅ Inactive Employees:', this.inactiveCount);
      },
      error: err => console.error('❌ Inactive Count fetch failed:', err)
    });

    // 📊 Dummy Chart — Static display only
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    if (!ctx) {
      console.warn('📊 Chart canvas not found.');
      return;
    }

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [{
          label: 'Employees',
          data: [30, 45, 60, 75], // Dummy data only
          backgroundColor: '#4f46e5',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Employees Over Months'
          }
        }
      }
    });
  }
}
