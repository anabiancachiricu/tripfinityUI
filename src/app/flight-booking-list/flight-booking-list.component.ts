import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-flight-booking-list',
  standalone: true,
  imports: [NavbarComponent, 
    SidenavComponent,
    MatCardModule,
    MatButton,
    MatSidenavModule,
    CommonModule],
  templateUrl: './flight-booking-list.component.html',
  styleUrl: './flight-booking-list.component.scss'
})
export class FlightBookingListComponent {

  errorMessage: string = '';
  profile: any ={};
  flightBookings : any =[];
  hasFlightBookings : boolean= false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    }
    else{
        console.log("is logged in"  + this.authService.isLoggedIn());
        console.log("is logged in with token"  + this.authService.getAuthToken());
        this.getFlightBookings();
    }
  }

  getFlightBookings(){
    const apiUrl = 'http://localhost:8080/flightBooking/getFlightBookingsByEmail';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (response: any) => {
        this.flightBookings = response;
        this.hasFlightBookings = true;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  viewFlightBookingDetails(flight:any){
    console.log("flight: ", flight)
    this.router.navigate(['flight-booking-details'], {
      state: {
        flightBooking: flight
      }
    });
  }


}
