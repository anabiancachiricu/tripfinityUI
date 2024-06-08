import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authService';
import { Location } from '@angular/common';
import { CommonModule } from '@angular/common'; // Add necessary imports
import { MatButton, MatButtonModule } from '@angular/material/button'; // Add necessary imports
import { MatCardModule } from '@angular/material/card'; // Add necessary imports
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
@Component({
  selector: 'app-hotel-booking-details',
  standalone: true,
  imports: [
    NavbarComponent, 
    SidenavComponent,
    MatCardModule,
    MatButton,
    MatSidenavModule,
    CommonModule
  ],
  templateUrl: './hotel-booking-details.component.html',
  styleUrl: './hotel-booking-details.component.scss'
})
export class HotelBookingDetailsComponent implements OnInit{

  hotelBooking: any;
  bookingId: any;
  hotelBookingResponse:any;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.hotelBooking = navigation.extras.state['hotelBooking'];
      this.bookingId = this.hotelBooking.bookingId;

      console.log("hotelBooking: ", this.hotelBooking);
      console.log("bookingId: ", this.bookingId);
    }
  }


  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in"  + this.authService.isLoggedIn());
      console.log("is logged in with token"  + this.authService.getAuthToken());
      this.getHotellBookingDetails();
      
    }
  }

  getHotellBookingDetails() {
    const apiUrl = `http://localhost:8080/api/hotel/getBookingByEmailAndId`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('bookingId', this.bookingId);
    

    this.http.get<any>(apiUrl, { headers, params}).subscribe(
      (response: any) => {
        this.hotelBookingResponse = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

   public goBack(): void {
    this.location.back();
  }

}
