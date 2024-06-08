import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authService';
import { CommonModule, DatePipe, Location  } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
import { GoogleMapsModule } from '@angular/google-maps';
import {  } from '@google/maps';
import { HotelOfferDTO } from '../model/HotelOfferDto';



@Component({
  selector: 'app-hotel-details',
  standalone: true,
  providers: [DatePipe],
  imports: [
    NavbarComponent,
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
    GoogleMapsModule
  ],
  templateUrl: './hotel-details.component.html',
  styleUrl: './hotel-details.component.scss'
})
export class HotelDetailsComponent {
  google: any;
  // hotel: any;
  hotel! : HotelOfferDTO;
  city: string ='';
  hotelId: string ='';
  check_in: any;
  check_out: any;
  adults: any;
  visibleImages: string[] = [];
  images: string[]=[];
  errorMessage: string = '';
  lat: any;
  long: any;

  center!: google.maps.LatLngLiteral;
  zoom = 10;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private location: Location,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private ngZone:NgZone
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in"  + this.authService.isLoggedIn());
      console.log("is logged in with token"  + this.authService.getAuthToken());
      this.hotelId = this.route.snapshot.paramMap.get('id')!;
      this.check_in = this.route.snapshot.paramMap.get('check-in')!;
      this.check_out = this.route.snapshot.paramMap.get('check-out')!;
      this.adults = this.route.snapshot.paramMap.get('adults')!;
      const lat = parseFloat(this.route.snapshot.paramMap.get('lat')!);
      const lng = parseFloat(this.route.snapshot.paramMap.get('long')!);

      console.log("hotelId", this.hotelId);
      console.log("In: ", this.check_in);
      console.log("Out:", this.check_out);
      console.log("Adults:", this.adults);
      console.log("Lat:", this.lat);
      console.log("Long:", this.long);

      this.getHotelDetails();
      this.loadGoogleMaps();
      // this.initMap();
    }
  }

  loadGoogleMaps(): void {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCGNh5odE3MP9uorykGtN3B9ZxS_NYPyXk`;
    script.async = true;
    script.defer = true;
    script.onload = () => this.ngZone.run(() => this.initMap());
    document.head.appendChild(script);
  }

  initMap(): void {
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom
    });
  }

  getHotelDetails() {
    const apiUrl = `http://localhost:8080/hotels/searchById`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('hotelId', this.hotelId);
    this.check_in = this.formatDate(this.check_in);
    params = params.append('checkIn', this.check_in);
    this.check_out = this.formatDate(this.check_out);
    params = params.append('checkOut', this.check_out);
    params = params.append('adults', this.adults)

    this.http.get<any>(apiUrl, { headers, params}).subscribe(
      (response: any) => {
        this.hotel = response[0];
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  public goBack(): void {
    this.location.back();
  }

  public bookHotel(){
    this.router.navigate(['hotel-booking'], {
      state: {
        hotel: this.hotel,
        city: this.city
      }
    });
  }
 

  
}



