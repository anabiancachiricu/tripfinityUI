import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  public goToProfile(){
    this.router.navigate(['/profile']);
  }


  public goToHotelBookings(){
    this.router.navigate(['/hotel-booking-list']);
  }

  public goToFlightBookings(){
    this.router.navigate(['flight-booking-list'])
  }

  public goToFavourites(){
    this.router.navigate(['favourits']);
  }

  public goToWishlist(){
    this.router.navigate(['wishlistList']);
  }


}
