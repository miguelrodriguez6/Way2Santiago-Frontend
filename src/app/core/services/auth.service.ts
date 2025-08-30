import { Injectable } from '@angular/core';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {RegisterInputData} from '../../shared/domain/register-input-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  user: any;
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  verifyAuthentication(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/verify`, { withCredentials: true });  }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body, { withCredentials: true }).pipe(
      tap((response) => {
        this.isLoggedIn = true;
        this.user = response.user;
        alert("Logged in!");
      }),
      catchError(error => {
        console.error('Error logging in:', error);
        this.isLoggedIn=false;
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  logout(): Observable<any> {
    this.isLoggedIn = false;
    return this.http.post<any>(`${this.apiUrl}/auth/logout`, {}).pipe(
      tap(() => {
        this.isLoggedIn = false;
        this.user = null;
        alert("Logged out!");
      }),
      catchError(error => {
        console.error('Error logging out:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  register(registrationData: RegisterInputData): Observable<any> {

    const body: RegisterInputData = {
      username: registrationData.username,
      email: registrationData.email,
      password: registrationData.password,
      password_confirmation: registrationData.password_confirmation,
      first_name: registrationData.first_name,
      last_name: registrationData.last_name
    };

    return this.http.post<any>(`${this.apiUrl}/users/register`, body).pipe(
      tap(() => {
        this.isLoggedIn = false;
        alert("User registered!");
      }),
      catchError(error => {
        console.error('Error registering user:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getAuthenticatedUserId(): number {
    return this.user.id;
  }
}
