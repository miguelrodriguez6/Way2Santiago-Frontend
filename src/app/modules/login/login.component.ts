import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
})
export class LoginComponent {

  constructor(private authService: AuthService, private router: Router) {
  }

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  onSubmit() {
    this.authService.login(this.email, this.password).pipe(
      catchError(error => {
        this.errorMessage = error.error?.message || 'An error occurred during login';
        return throwError(() => error);
      })
    ).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      }
    });
  }
}
