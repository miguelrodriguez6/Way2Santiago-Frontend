import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environment/environment';

export interface Accommodation {
  id?: number;
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccommodationsService {
  private readonly apiUrl = environment.apiUrl + '/accommodations';

  constructor(private http: HttpClient) {}

  /**
   * Get all accommodations
   */
  getAccommodations(): Observable<Accommodation[]> {
    return this.http.get<Accommodation[]>(this.apiUrl);
  }

  /**
   * Create a new accommodation
   */
  createAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.http.post<Accommodation>(this.apiUrl, accommodation);
  }

  /**
   * Update an existing accommodation
   */
  updateAccommodation(id: number, accommodation: Partial<Accommodation>): Observable<Accommodation> {
    return this.http.put<Accommodation>(`${this.apiUrl}/${id}`, accommodation);
  }

  /**
   * Delete an accommodation
   */
  deleteAccommodation(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
