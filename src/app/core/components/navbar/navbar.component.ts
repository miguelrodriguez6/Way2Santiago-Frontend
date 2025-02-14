import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {catchError, throwError} from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen = false;
  isAccountMenuOpen = false;

  constructor(protected readonly authService: AuthService) {
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  errorMessage: string = '';

  logout(): void {
    this.authService.logout().pipe(
      catchError(error => {
        this.errorMessage = error.error?.message || 'An error occurred during login';
        return throwError(() => error);
      })
    ).subscribe();
  }

}
