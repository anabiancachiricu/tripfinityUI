import { Component } from '@angular/core';
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
export class SuggestionsComponent {

  constructor(
    private router: Router,
    private authService:AuthService
  ){}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    }
    else{
        console.log("is logged in"  + this.authService.isLoggedIn());
        console.log("is logged in with token"  + this.authService.getAuthToken());
        setInterval(() => this.nextCard(), 5000); // change card every 5 seconds
    }
   
  }

  cards = [
    { name: 'Discover the Ultimate Beach Getaways: Your Dream Vacation Awaits!', image: '/assets/beach_books.jpg' , text:'Are you yearning for the sun-kissed shores and the gentle caress of ocean breezes? Look no further! Embark on an unforgettable journey to the world’s most breathtaking beach destinations, where turquoise waters meet golden sands, and paradise comes to life.', function: 'goToSea' },
    { name: 'Unveil the Majesty of Mountain Retreats: Your Dream Adventure Awaits!', image: '/assets/mountain_backpack.jpg', text:'Are you craving the crisp mountain air and the thrill of alpine vistas? Look no further! Embark on an unforgettable journey to the world’s most breathtaking mountain destinations, where majestic peaks meet tranquil valleys, and adventure comes to life.', function: 'goToMountains' },
    { name: 'Discover the Vibrancy of Urban Escapes: Your Dream City Adventure Awaits!', image: '/assets/city.jpg', text: 'Are you longing for the excitement of bustling streets and the allure of urban sophistication? Look no further! Embark on an unforgettable journey to the world’s most dynamic city destinations, where culture, history, and modernity converge to create the ultimate urban experience.', function: 'goToCity' }
  ];
  currentCardIndex = 0;


  nextCard() {
    this.currentCardIndex = (this.currentCardIndex + 1) % this.cards.length;
    console.log(this.currentCardIndex);
  }

  onButtonClick() {
    const actions = [
      this.actionForCard0.bind(this),
      this.actionForCard1.bind(this),
      this.actionForCard2.bind(this)
    ];
    actions[this.currentCardIndex]();
  }

  actionForCard0() {
    console.log("Action for card 0");
    this.router.navigate(['/beachDestinations']);
  }

  actionForCard1() {
    console.log("Action for card 1");
    this.router.navigate(['/mountainDestinations']);
  }

  actionForCard2() {
    console.log("Action for card 2");
    this.router.navigate(['/cityDestinations']);
  }

}
