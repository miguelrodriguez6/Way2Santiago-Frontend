import { Component } from '@angular/core';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-settings',
  standalone: false,

  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  user: any;
  constructor(protected readonly authService: AuthService) {
    this.user = authService.user;
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    };
    return new Date(date).toLocaleDateString('en-US', options);
  }
}
