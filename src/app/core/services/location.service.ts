import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environment/environment';
import {catchError, map, Observable, tap, throwError} from 'rxjs';
import {Location} from '../../shared/domain/location.model';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createLocation(location: Location): Observable<number> {
    return this.http.post<any>(`${this.apiUrl}/locations`, location).pipe(
      tap(() => {
        alert("New location created!");
      }),
      map(response => {
        console.log("ID de la location creada:", response.data.id); // ahora sí
        return response.data.id;
      }),
      catchError(error => {
        console.error('Error creating new location:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }



  checkIfLocationExistsByName(location: Location): Observable<{ exists: boolean, id: number | null }> {
    return this.http.post<{ exists: boolean, id: number | null }>(
      `${this.apiUrl}/locations/check-name`,
      location
    ).pipe(
      tap(response => {
        if (response.exists) {
          console.log(`Location exists! ID: ${response.id}`);
        } else {
          console.log("Location does not exist.");
        }
      }),
      catchError(error => {
        console.error('Error searching for location:', error);
        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

}
