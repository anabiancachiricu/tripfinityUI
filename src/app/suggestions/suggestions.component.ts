import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [
    MatButtonModule,
    NavbarComponent,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    FormsModule,
  ],
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit, OnDestroy {
  
  private currentCardIndex: number = 0;
  private intervalId: any;
  visibleCards: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in "  + this.authService.isLoggedIn());
      console.log("is logged in with token "  + this.authService.getAuthToken());
      this.initializeVisibleCards();
      this.startCarousel();
    }
  }

  cards = [
    { id:0, dest:'beach', name: 'Discover the Ultimate Beach Getaways: Your Dream Vacation Awaits!', image: '/assets/beach_books.jpg', text: 'Are you yearning for the sun-kissed shores and the gentle caress of ocean breezes? Look no further! Embark on an unforgettable journey to the world’s most breathtaking beach destinations, where turquoise waters meet golden sands, and paradise comes to life.', function: 'goToSea' },
    { id:1, dest:'mountain',name: 'Unveil the Majesty of Mountain Retreats: Your Dream Adventure Awaits!', image: '/assets/mountain_backpack.jpg', text: 'Are you craving the crisp mountain air and the thrill of alpine vistas? Look no further! Embark on an unforgettable journey to the world’s most breathtaking mountain destinations, where majestic peaks meet tranquil valleys, and adventure comes to life.', function: 'goToMountains' },
    { id:2, dest:'city', name: 'Discover the Vibrancy of Urban Escapes: Your Dream City Adventure Awaits!', image: '/assets/city.jpg', text: 'Are you longing for the excitement of bustling streets and the allure of urban sophistication? Look no further! Embark on an unforgettable journey to the world’s most dynamic city destinations, where culture, history, and modernity converge to create the ultimate urban experience.', function: 'goToCity' }
  ];
  // currentCardIndex = 0;

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  initializeVisibleCards(): void {
    this.visibleCards = this.cards.slice(0, 3);
  }

  startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.moveCarousel();
    }, 3000); 
    
    // Change card every 3 seconds
  }

  moveCarousel(): void {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
    console.log("Current card index:", this.currentCardIndex);
    console.log(this.visibleCards[this.currentCardIndex].dest)
    this.updateVisibleCards();
  }

  updateVisibleCards(): void {
    const nextIndex = (this.currentCardIndex + 3) % this.cards.length;
    if (this.currentCardIndex <= this.cards.length - 3) {
      this.visibleCards = this.cards.slice(this.currentCardIndex, this.currentCardIndex + 3);
    } else {
      this.visibleCards = [
        ...this.cards.slice(this.currentCardIndex),
        ...this.cards.slice(0, nextIndex),
      ];
    }
  }

  onButtonClick( id: any) {
    if(id ==0){
      this.router.navigate(['/beachDestinations']);
    }
    if(id==1){
      this.router.navigate(['/mountainDestinations']);
    }
    if(id==2){
      this.router.navigate(['/cityDestinations']);
    }
    
  }
}
