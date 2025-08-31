import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {StageService} from '../service/stage.service';
import {Stage} from '../../../shared/domain/new-stage-input-data.model';
import {LocationService} from '../../../core/services/location.service';
import {Location} from '../../../shared/domain/location.model';
import {NominatimGeoService} from '../../../core/services/nominatim-geo.service';
import {catchError, forkJoin, map, of, switchMap, throwError} from 'rxjs';
import {AuthService} from '../../../core/services/auth.service';
import {UserService} from '../../../core/services/user.service';

export interface StageDto {
  name: string;                 // required, max 255
  description: string;          // required, max 1000
  start_datetime: string;       // required, ISO date string
  end_datetime: string;         // required, ISO date string
  distance: number;             // required, numeric
  status: string;  // enum limitado
  user_id_creator: number;      // required, id del usuario
  start_location_id: number;    // required, id de la ubicación inicial
  end_location_id: number;      // required, id de la ubicación final
}

@Component({
  selector: 'app-new-stage',
  standalone: false,

  templateUrl: './new-stage.component.html',
})
export class NewStageComponent {
  stageForm: FormGroup;
  stage: Stage;
  startLocationId: number = 0;
  endLocationId: number = 0;
  statuses = ['COMPLETED', 'PLANNED', 'AWAITING'];
  errorMessage: string = '';
  stageToCreate!: StageDto;
  userId: number = 0;

  constructor(private fb: FormBuilder,
              private stageService: StageService,
              private locationService: LocationService,
              private nominatimGeoService: NominatimGeoService,
              private userService: UserService,
              private authService: AuthService) {
    this.stageForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      description: ['', Validators.required],
      start_datetime: ['', Validators.required],
      end_datetime: ['', Validators.required],
      distance: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      start_location: ['', Validators.required],
      end_location: ['', Validators.required]
    });

    this.stage = this.stageForm.value;
    this.userId = this.authService.getAuthenticatedUserId();
  }

  onSubmit() {
    if (!this.stageForm.valid) {
      console.log('Form is invalid');
      return;
    }

    this.stage = this.stageForm.value;

    const startLocation: Location = {
      name: this.stage.start_location,
      latitude: null,
      longitude: null
    };

    const endLocation: Location = {
      name: this.stage.end_location,
      latitude: null,
      longitude: null
    };

    // Observable para obtener o crear la ubicación de inicio
    const start$ = this.locationService.checkIfLocationExistsByName(startLocation).pipe(
      switchMap(response => {
        if (response.exists) {
          console.log("Start location already exists, ID:", response.id);
          return of(Number(response.id ?? 0));
        }
        return this.locationService.createLocation(startLocation).pipe(
          map(id => Number(id ?? 0))
        );
      })
    );

    // Observable para obtener o crear la ubicación final
    const end$ = this.locationService.checkIfLocationExistsByName(endLocation).pipe(
      switchMap(response => {
        if (response.exists) {
          console.log("End location already exists, ID:", response.id);
          return of(Number(response.id ?? 0));
        }
        return this.locationService.createLocation(endLocation).pipe(
          map(id => Number(id ?? 0))
        );
      })
    );

    forkJoin([start$, end$]).subscribe({
      next: ([startId, endId]: [number, number]) => {  // aseguramos tipado number
        this.stageToCreate = {
          name: this.stage.name,
          description: this.stage.description,
          start_datetime: this.stage.start_datetime,
          end_datetime: this.stage.end_datetime,
          distance: this.stage.distance,
          status: this.stage.status,
          user_id_creator: this.userId,
          start_location_id: startId,
          end_location_id: endId
        };

        console.log("Creating stage with data:", this.stageToCreate);

        this.stageService.createStage(this.stageToCreate);
      },
      error: (err) => console.error("Error processing locations:", err)
    });
  }




}
