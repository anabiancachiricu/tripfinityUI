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
  selector: 'app-hotel-booking-list',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidenavComponent,
    MatCardModule,
    MatButton,
    MatSidenavModule,
    CommonModule
  ],
  templateUrl: './hotel-booking-list.component.html',
  styleUrl: './hotel-booking-list.component.scss'
})
export class HotelBookingListComponent {
  errorMessage: string = '';
  profile: any ={};
  hotelBookings : any =[];
  hasBookings : boolean= false;

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
        this.getHotelBookings();
    }
  }

  getHotelBookings(){
    const apiUrl = 'http://localhost:8080/api/hotel/getBookingByEmail';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (response: any) => {
        this.hotelBookings = response;
        this.hasBookings = true;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  public viewBookingDetails(hbook:any){
    console.log("HBOOK: ", hbook)
    this.router.navigate(['hotel-booking-details'], {
      state: {
        hotelBooking: hbook
      }
    });
  }


  
}
