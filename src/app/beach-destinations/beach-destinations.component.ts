import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../authService';
import { AppRoutingModule } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beach-destinations',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatButtonModule],
  templateUrl: './beach-destinations.component.html',
  styleUrl: './beach-destinations.component.scss'
})
export class BeachDestinationsComponent {

  constructor(
    private location: Location,
    private authService: AuthService,
    private router:Router
  ){}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    }
    else{
        console.log("is logged in"  + this.authService.isLoggedIn());
        console.log("is logged in with token"  + this.authService.getAuthToken());
    }
  }

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

  public goBack(): void {
    this.location.back();
  }



}
