import {Component, OnInit} from '@angular/core';
import {Accommodation, AccommodationsService} from '../../core/services/accommodations.service';

@Component({
  selector: 'app-accommodations',
  standalone: false,

  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.css'
})
export class AccommodationsComponent implements OnInit {
  accommodations: Accommodation[] = [];
  currentIndex = 0;
  activeAccommodation?: Accommodation;

  constructor(private accommodationsService: AccommodationsService) {}

  ngOnInit(): void {
    this.loadAccommodations();
  }

  loadAccommodations(): void {
    this.accommodationsService.getAccommodations().subscribe({
      next: (data) => {
        this.accommodations = data;
        this.currentIndex = 0;
        this.updateActiveAccommodation(); // inicializar el activo
      },
      error: (err) => console.error(err)
    });
  }

  prevSlide(): void {
    if (this.accommodations.length > 0) {
      this.currentIndex =
        (this.currentIndex - 1 + this.accommodations.length) %
        this.accommodations.length;
      this.updateActiveAccommodation();
    }
  }

  nextSlide(): void {
    if (this.accommodations.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.accommodations.length;
      this.updateActiveAccommodation();
    }
  }

  updateActiveAccommodation(): void {
    this.activeAccommodation = this.accommodations[this.currentIndex];
  }
}
