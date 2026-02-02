import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../../../services/employee.service';
@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {
  managerList: any[] = [];
  selectedManager: any = null;
  viewTeam: boolean = false;
  token: string | null = null;
  // apiUrl: string = this.empService.apiUrl;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.loadManagers();
    }
  }

  loadManagers(): void {
    this.empService.getEmployeesByRole('MANAGER', this.token!)
      .subscribe({
        next: (res) => this.managerList = res,
        error: (err) => console.error('❌ Manager list error:', err)
      });
  }
  showTeam(manager: any): void {
  console.log('👤 Manager selected:', manager);
  console.log('📎 Manager ID:', manager.id); // 👈 Check this!

  if (!manager.id) {
    console.error('❌ Manager ID missing! Cannot fetch team.');
    return;
  }

  this.empService.getTeam(manager.id, this.token!)
    .subscribe({
      next: (res) => {
        this.selectedManager = { ...manager, team: res };
        this.viewTeam = true;
      },
      error: (err) => console.error('❌ Team fetch error:', err)
    });
}

  // showTeam(manager: any): void {
  //   this.empService.getTeam(manager.id, this.token!)
  //     .subscribe({
  //       next: (res) => {
  //         this.selectedManager = {
  //           ...manager,
  //           team: res
  //         };
  //         this.viewTeam = true;
  //       },
  //       error: (err) => console.error('❌ Team fetch error:', err)
  //     });
  // }

  backToOverview(): void {
    this.selectedManager = null;
    this.viewTeam = false;
  }
}
