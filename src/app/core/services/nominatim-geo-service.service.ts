import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, shareReplay, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NominatimGeoServiceService {

  private apiUrl = 'https://nominatim.openstreetmap.org/';

  constructor(private http: HttpClient) {}

  getCoordinatesByLocationName(locationName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search?q=${locationName}&format=jsonv2`).pipe(
      catchError(error => {
        console.error('Geocoding API Error:', error);
        return throwError(() => new Error('Something went wrong'));
      }),
      shareReplay(1)
    );
  }

  getLocationNameByCoordinates(lat: number, long: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reverse?lat=${lat}&lon=${long}&format=jsonv2`).pipe(
      catchError(error => {
        console.error('Geocoding API Error:', error);
        return throwError(() => new Error('Something went wrong'));
      }),
      shareReplay(1)
    );
  }
}
