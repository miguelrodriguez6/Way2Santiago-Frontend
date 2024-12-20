import { Injectable } from '@angular/core';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedIn = false;
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const body = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body).pipe(
      tap(() => {
        this.isLoggedIn = true;
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
      }),
      catchError(error => {
        console.error('Error logging in:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
