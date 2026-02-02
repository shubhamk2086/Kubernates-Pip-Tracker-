import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class EmpSettingsComponent implements OnInit {
  currentView: string | undefined;
  showLogoutToast: boolean = false;

  darkMode: boolean = false;
  emailReminders: boolean = true;
  systemAlerts: boolean = false;
  greeting: string = 'Welcome, Rutuja!';

  ngOnInit(): void {
    const savedMode = localStorage.getItem('darkMode');
    this.darkMode = savedMode === 'true';
    this.applyDarkMode();
  }

  toggleDarkMode(): void {
    localStorage.setItem('darkMode', this.darkMode.toString());
    this.applyDarkMode();
  }

  private applyDarkMode(): void {
    const root = document.documentElement;
    if (this.darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }

  logout(): void {
    localStorage.clear();
    this.showLogoutToast = true;

    setTimeout(() => {
      this.showLogoutToast = false;
      // Navigate if needed: this.router.navigate(['/login']);
    }, 2000);
  }
}
