import {Component, OnInit} from '@angular/core';

interface Stage {
  name: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  distance: number;
  status: string;
  user_id_creator: number;
  start_location_id: number;
  end_location_id: number;
}

@Component({
  selector: 'app-stage',
  standalone: false,

  templateUrl: './stage.component.html',
  styleUrl: './stage.component.css'
})
export class StageComponent implements OnInit{

  completedStages: Stage[] = [];

  constructor() {}

  ngOnInit(): void {
    // Simulación de datos obtenidos (reemplazar con un servicio real)
    this.completedStages = [
      {
        name: 'Stage 1',
        description: 'Completed stage through beautiful landscapes.',
        start_datetime: '2024-12-01 08:00:00',
        end_datetime: '2024-12-01 10:00:00',
        distance: 20.5,
        status: 'COMPLETED',
        user_id_creator: 1,
        start_location_id: 1,
        end_location_id: 2
      },
      {
        name: 'Stage 2',
        description: 'A challenging stage with stunning views.',
        start_datetime: '2024-12-02 08:30:00',
        end_datetime: '2024-12-02 11:30:00',
        distance: 25.3,
        status: 'COMPLETED',
        user_id_creator: 1,
        start_location_id: 2,
        end_location_id: 3
      }
    ];
  }

}
