import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {Location} from '../../shared/domain/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createLocation(location: Location): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/locations`, location).pipe(
      tap(() => {
        alert("New location created!");
      }),
      catchError(error => {
        console.error('Error creating new location:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  checkIfLocationExistsByName(location: Location): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/check-name`, location).pipe(
      tap(() => {
        alert("Location found!");
      }),
      catchError(error => {
        console.error('Error searching for location:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    )
  };
}
