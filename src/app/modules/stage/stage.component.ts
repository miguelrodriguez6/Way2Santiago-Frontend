import {Component, OnInit} from '@angular/core';
import {StageService} from './service/stage.service';
import {UserService} from '../../core/services/user.service';

interface Stage {
  name: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  distance: number;
  status: string;
  start_location: Location;
  end_location: Location;
  user_id_creator: number;
  creator: string;
}

interface Location {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'app-stage',
  standalone: false,
  templateUrl: './stage.component.html'
})
export class StageComponent implements OnInit{

  stages: Stage[] = [];

  constructor(private stageService: StageService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.stageService.getAllStages().subscribe({
      next: (data: any) => {
        this.stages = data.data;

        this.stages.forEach((stage) => {
          this.userService.getUserById(stage.user_id_creator).subscribe(
            (user) => {
              stage.creator = user.username;
            },
            (error) => console.error('Error al obtener user:', error)
          );
        });
      },
      error: (err) => {
        console.error('Error al obtener las stages', err);
      }
    });
  }

}
