import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authService';
import { Location } from '@angular/common';

@Component({
  selector: 'app-flight-booking-details',
  standalone: true,
  imports: [ 
    NavbarComponent, 
    SidenavComponent,
    MatCardModule,
    MatButton,
    MatSidenavModule,
    CommonModule
  ],
  templateUrl: './flight-booking-details.component.html',
  styleUrl: './flight-booking-details.component.scss'
})
export class FlightBookingDetailsComponent {

  flightBooking: any;
  flightId: any;
  flightBookingResponse:any;

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
      this.flightBooking = navigation.extras.state['flightBooking'];
      this.flightId = this.flightBooking.flightBookingId;

      console.log("flightBooking: ", this.flightBooking);
      console.log("flightBookingId: ", this.flightId);
    }
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in"  + this.authService.isLoggedIn());
      console.log("is logged in with token"  + this.authService.getAuthToken());
      this.getFlightBookingDetails();
      
    }
  }

  getFlightBookingDetails() {
    const apiUrl = `http://localhost:8080/flightBooking/getFlightBookingByEmailAndId`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('flightBookingId', this.flightId);
    

    this.http.get<any>(apiUrl, { headers, params}).subscribe(
      (response: any) => {
        this.flightBookingResponse = response;
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
