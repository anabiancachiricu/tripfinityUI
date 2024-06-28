import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-logged-in',
  standalone: true,
  imports: [
    MatButtonModule, 
    NavbarComponent,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './home-logged-in.component.html',
  styleUrl: './home-logged-in.component.scss'
})
export class HomeLoggedInComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    }
    else{
        console.log("is logged in"  + this.authService.isLoggedIn());
        console.log("is logged in with token"  + this.authService.getAuthToken());
      
    }
   
  }

  cards = [
    { id:0, name: 'Need inspirstion?', image: '/assets/card1home.jpg' , text:' Check our suggestions page  to find out about dreamy destinations! We offer a variety of ideas for you to find your oasis of relaxation.', function: 'goToSuggestions' },
    { id:1, name: 'Need to fly somewere?', image: '/assets/card2home.jpg', text:'Check our flights page to select the flight that fits your imagination. Escape for a while, we guarantee you won`t regret it!', function: 'goToFlights' },
    { id:2, name: 'Need accomodation?', image: '/assets/card3home.jpg', text: 'Are you looking for a place to enjoy your lazy stay, or a fancy appartment in the city center? Say no more, we got you!', function: 'goToHotels' },
    { id:3, name: 'Don`t know what to see?', image: '/assets/card4home.jpg', text: 'You want to explore the best sights of your destination, but don`t know where to start? Explore our findings and decide!', function: 'goToActivities' },
    
  ];
  currentCardIndex = 0;
  
  goToSignup(){
    this.router.navigate(['/hero-login']);
  }
  
  onButtonClick( id: any) {
    if(id ==0){
      this.router.navigate(['/suggestions']);
    }
    if(id==1){
      this.router.navigate(['/flights-specific']);
    }
    if(id==2){
      this.router.navigate(['/hotels']);
    }
    if(id==3){
      this.router.navigate(['/activities']);
    }
  }

}
