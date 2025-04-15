import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Assuming your auth service is in this location
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [NgIf, RouterModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  showLogoutModal: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  // Check if user is authenticated (e.g., based on the presence of a token)
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated(); // Assuming this is implemented in AuthService
  }

  // Trigger the Log Out confirmation modal
  onLogout(): void {
    this.showLogoutModal = true;
  }

  // Handle log out confirmation
  logoutConfirmed(): void {
    this.authService.logout(); // Assuming logout method clears the token from localStorage or similar
    this.showLogoutModal = false;
    this.router.navigate(['/auth']); // Navigate to login page after logout
  }

  // Cancel the logout
  cancelLogout(): void {
    this.showLogoutModal = false;
  }
}
