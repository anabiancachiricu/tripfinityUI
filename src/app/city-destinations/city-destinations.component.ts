import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-destinations',
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatButtonModule],
  templateUrl: './city-destinations.component.html',
  styleUrl: './city-destinations.component.scss'
})
export class CityDestinationsComponent {

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router
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
      name: 'Tokyo, Japan',
      image: '/assets/tokyo.jpg',
      description: 'Discover the bustling metropolis of Tokyo, where modernity meets tradition in the most fascinating ways.'
    },
    {
      name: 'Paris, France',
      image: '/assets/paris.jpg',
      description: 'Experience the romantic charm and rich history of Paris, the city of lights and love.'
    },
    {
      name: 'New York City, USA',
      image: '/assets/new_york.jpg',
      description: 'Explore the vibrant neighborhoods and iconic landmarks of New York City, the city that never sleeps.'
    },
    {
      name: 'Sydney, Australia',
      image: '/assets/sydney.jpg',
      description: 'Enjoy the stunning harbor views and vibrant culture of Sydney, a top destination in Australia.'
    },
    {
      name: 'Barcelona, Spain',
      image: '/assets/barcelona.jpg',
      description: 'Discover the unique architecture and lively atmosphere of Barcelona, a city full of art and energy.'
    }
  ];
  
  public goBack(): void {
    this.location.back();
  }

}
