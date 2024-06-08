import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [ NavbarComponent,
    MatButtonModule,
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
    MatInputModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss'
})
export class HotelComponent {

  hotels : any =[];
  dests : any=[];
  city: string = '';
  originAirport: string = '';
  hasHotels: boolean =false;
  isPending:boolean = false;
  errorMessage: string = '';
  check_in: any;
  check_out: any;
  adults:any;
  lat: any;
  long: any;
  

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in"  + this.authService.isLoggedIn());
      console.log("is logged in with token"  + this.authService.getAuthToken());
    }
  }

  searchHotels() {
    this.isPending=true;
    const apiUrl = `http://localhost:8080/hotels/search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('city', this.city);
  
    this.http.get<any[]>(apiUrl, { headers, params }).subscribe(
      (response: any) => {
        this.hotels = response;
        this.hasHotels = true;
        this.isPending=false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isPending=false;
      }
    );
  }

  viewDetails(hotelId: string, check_in: string, check_out:string,adults: any, lat:any, long: any ) {
    this.router.navigate([`/hotels/${hotelId}/${check_in}/${check_out}/${adults}/${lat}/${long}`]);
  }



  
}
