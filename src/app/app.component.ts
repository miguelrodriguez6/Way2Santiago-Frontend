import {Component, OnInit} from '@angular/core';
import {AuthService} from './core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Way2Santiago-Frontend';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.verifyAuthentication().subscribe({
      next: (response) => {
        this.authService.isLoggedIn = response.isAuthenticated;
        this.router.navigate(['/home']);

        if (this.authService.isLoggedIn) {
          this.authService.user = response.user;
        }
      },
      error: (error) => {
        this.authService.isLoggedIn = false;
        console.error('Error verifying authentication:', error);
      }
    });
  }
}
