import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
constructor(private router: Router) {}
currentYear: number = new Date().getFullYear();

onLoginClick() {
  this.router.navigate(['/login']);
}
}
