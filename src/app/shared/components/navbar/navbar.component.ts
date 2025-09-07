import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Output() toggleSidenav = new EventEmitter<void>();
  @Output() dashboardToggle = new EventEmitter<boolean>();
  dashboardActive = false;

  onDashboardClick(){
    this.dashboardActive = !this.dashboardActive;
    this.dashboardToggle.emit(this.dashboardActive);
  }

  onToggleSidebar() {
    this.toggleSidenav.emit();
  }
}
