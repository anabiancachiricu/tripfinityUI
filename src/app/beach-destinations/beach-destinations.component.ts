import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-beach-destinations',
  standalone: true,
  imports: [NavbarComponent, CommonModule],
  templateUrl: './beach-destinations.component.html',
  styleUrl: './beach-destinations.component.scss'
})
export class BeachDestinationsComponent {

  destinations = [
    {
      name: 'Maldives',
      image: '/assets/maldives.jpg',
      description: 'Experience the pristine beaches and crystal-clear waters of the Maldives, a paradise on Earth.'
    },
    {
      name: 'Bora Bora, French Polynesia',
      image: '/assets/bora_bora.jpg',
      description: 'Discover the stunning overwater bungalows and turquoise lagoons of Bora Bora.'
    },
    {
      name: 'Maui, Hawaii, USA',
      image: '/assets/maui.jpg',
      description: 'Enjoy the breathtaking beaches and vibrant culture of Maui, a top destination in Hawaii.'
    },
    {
      name: 'Seychelles',
      image: '/assets/seychelles.jpg',
      description: 'Explore the beautiful beaches and unique granite boulders of the Seychelles.'
    },
    {
      name: 'Santorini, Greece',
      image: '/assets/santorini.jpg',
      description: 'Relax on the picturesque beaches of Santorini, known for its stunning sunsets and white-washed buildings.'
    }
  ];



}
