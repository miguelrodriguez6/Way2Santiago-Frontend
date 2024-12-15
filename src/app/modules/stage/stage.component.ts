import {Component, OnInit} from '@angular/core';

interface Stage {
  name: string;
  description: string;
  start_datetime: string;
  end_datetime: string;
  distance: number;
  status: string;
  start_location: string;
  end_location: string;
  creator: string;
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

  }

}
