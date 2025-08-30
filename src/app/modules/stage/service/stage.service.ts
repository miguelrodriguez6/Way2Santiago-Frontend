import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';
import {environment} from '../../../../environment/environment';
import {Stage} from '../../../shared/domain/new-stage-input-data.model';
import {StageDto} from '../new-stage/new-stage.component';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createStage(stage: StageDto): void {
    this.http.post<any>(`${this.apiUrl}/stages`, stage).pipe(
      tap(() => {
        alert("New stage created!");
        console.log("Stage created");
      }),
      catchError(error => {
        console.error('Error creating new stage:', error);
        console.log(JSON.stringify(error.error.errors));
        return throwError(() => new Error('Something went wrong'));
      })
    ).subscribe();
  }

  getAllStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(`${this.apiUrl}/stages`);
  }
}
