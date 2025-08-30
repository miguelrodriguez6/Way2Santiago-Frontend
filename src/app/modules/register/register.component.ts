import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';
import {RegisterInputData} from '../../shared/domain/register-input-data.model';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
})
export class RegisterComponent {

  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstName: string = '';
  lastName: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }


  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const registrationInputData: RegisterInputData = {
      username: this.username,
      email: this.email,
      password: this.password,
      password_confirmation: this.confirmPassword,
      first_name: this.firstName,
      last_name: this.lastName,
    };

    this.authService.register(registrationInputData).pipe(
      catchError(error => {
        this.errorMessage = error.error?.message || 'An error occurred during register';
        return throwError(() => error);
      })
    ).subscribe({
      next: (response) => {
        this.router.navigate(['/home']);
      }
    });
  }
}
