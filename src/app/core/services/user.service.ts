import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, throwError} from 'rxjs';
import {environment} from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${id}`);
  }

  getUserId(id: number): Observable<number> {
    return this.http.get<{ id: number }>(`${this.apiUrl}/users/${id}`).pipe(
      map(response => response.id),
      catchError(error => {
        console.error('Error fetching user id:', error);
        return throwError(() => new Error('Could not fetch user id'));
      })
    );
  }
}
