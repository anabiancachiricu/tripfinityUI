import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../authService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mountain-destinations',
  standalone: true,
  imports: [
    NavbarComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './mountain-destinations.component.html',
  styleUrl: './mountain-destinations.component.scss'
})
export class MountainDestinationsComponent {

  constructor(
    private location: Location,
    private authService:AuthService,
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
      name: 'Swiss Alps, Switzerland',
      image: 'assets/swiss_alps.jpg',
      description: 'Experience the breathtaking beauty of the Swiss Alps, with their snow-capped peaks and picturesque villages.'
    },
    {
      name: 'Rocky Mountains, USA',
      image: '/assets/rocky_mountains.jpg',
      description: 'Explore the majestic Rocky Mountains, home to stunning landscapes and abundant wildlife.'
    },
    {
      name: 'Himalayas, Nepal',
      image: '/assets/himalayas.jpg',
      description: 'Embark on an adventure in the Himalayas, the highest mountain range in the world, offering unparalleled trekking experiences.'
    },
    {
      name: 'Andes, South America',
      image: '/assets/andes.jpg',
      description: 'Discover the Andes, the longest continental mountain range, known for its diverse ecosystems and ancient cultures.'
    },
    {
      name: 'Southern Alps, New Zealand',
      image: '/assets/southern_alps.jpg',
      description: 'Visit the Southern Alps of New Zealand, a paradise for nature lovers with its stunning fjords and alpine scenery.'
    }
  ];

  public goBack(): void {
    this.location.back();
  }

}
