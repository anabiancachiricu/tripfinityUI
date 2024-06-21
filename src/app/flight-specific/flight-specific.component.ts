import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { Observable, debounceTime, map, startWith, switchMap } from 'rxjs';
import { AuthService } from '../authService';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';
import { Flight } from '../model/Flight';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-flight-specific',
  standalone: true,
  templateUrl: './flight-specific.component.html',
  styleUrl: './flight-specific.component.scss',
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
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule
  ]
})
export class FlightSpecificComponent {
  flights : any =[];
  dests : any=[];
  searchControl = new FormControl();
  destinationControl = new FormControl();
  filteredOptions: Observable<{ iataCode: string; city: string; airportName: string; }[]> | undefined;
  filteredOptionsDest: Observable<{ iataCode: string; cityName: string; }[]> | undefined;
  originAirport: string = '';
  destAirport: string='';
  hasFlights: boolean =false;
  // filteredOptionsDest: any=[];
  departDate: any;
  returnDate:any;
  adults:any;
  departFlight: Flight = new Flight;
  returnFlight: Flight = new Flight;
  isPending:boolean = false;
  hasError:boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private datePipe: DatePipe
  ) {}
  
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    }
    else{
        console.log("is logged in"  + this.authService.isLoggedIn());
        console.log("is logged in with token"  + this.authService.getAuthToken());
  
        this.filteredOptions = this.searchControl.valueChanges.pipe(
          debounceTime(200),
          startWith(''),
          switchMap(value => this.searchAirports(value))
        );

    }
    
  }

  onOptionOriginSelected(event: any) {
    this.originAirport = event.option.value;
    this.searchDestinations(this.originAirport);

  }

  onOptionDestSelected(event: any) {
    this.destAirport = event.option.value;
  }

  onDestMenuChange(selected :any){
    console.log('Selected dest:', selected);
    // this.getAllProductsFromShop(selected);
  }


  searchAirports(term: string): Observable<{iataCode: string, city: string, airportName: string}[]> {
    const apiUrl = `http://localhost:8080/flights/api/origin_airport_search?term=${term}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
  
    return this.http.get<{iataCode: string, city: string, airportName: string}[]>(apiUrl, { headers });
  }

  searchFlights() {
    const apiUrl = `http://localhost:8080/flights/search_specific_flight`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    
    this.isPending = true;
    let params = new HttpParams();
    params = params.append('origin', this.originAirport);
    params = params.append('destination', this.destAirport);
    this.departDate = this.formatDate(this.departDate);
    params = params.append('departureDate', this.departDate);
    this.returnDate = this.formatDate(this.returnDate);
    params = params.append('returnDate', this.returnDate);
    params = params.append('adults', this.adults)

    this.http.get<any[]>(apiUrl, { headers, params}).subscribe(
      (response: any) => {
        this.isPending = false;
        this.flights = response;
        this.hasFlights = true;
        this.hasError = false;
      },
      (error) => {
        this.isPending = false;
        this.hasError = true;
        this.hasFlights = false;
        console.error('Error fetching data:', error);
      }
    );
  }


  searchDestinations(originAirport:string) {
    const apiUrl = `http://localhost:8080/flights/search_direct_destinations`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('airportCode', this.originAirport);
    
    this.http.get<any[]>(apiUrl, { headers, params}).subscribe(
      (response: any) => {
        this.dests = response;
       
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    
  }

  formatDate(date: Date): string | null {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  bookFlight(flight :any){
    this.departFlight.duration = flight.duration;
    this.departFlight.departTerminal = flight.departTerminal;
    this.departFlight.departIataCode= flight.departIataCode;
    this.departFlight.departTime=flight.departTime;
    this.departFlight.arrilvalIataCode=flight.departArrilvalIataCode;
    this.departFlight.arrivalTime=flight.departArrivalTime;
    this.departFlight.carrierCode = flight.departCarrierCode;
    this.departFlight.flightNumber = flight.departFlightNumber;
    this.departFlight.price = flight.totalPrice;

    this.returnFlight.duration = flight.duration;
    this.returnFlight.departTerminal = flight.returnTerminal;
    this.returnFlight.departIataCode= flight.returnIataCode;
    this.returnFlight.departTime=flight.returnTime;
    this.returnFlight.arrilvalIataCode=flight.returnArrilvalIataCode;
    this.returnFlight.arrivalTime=flight.returnArrivalTime;
    this.returnFlight.carrierCode = flight.returnCarrierCode;
    this.returnFlight.flightNumber = flight.returnFlightNumber;
    this.returnFlight.price = flight.totalPrice;

    this.router.navigate(['flight-booking'], {
      state: {
        departFlight: this.departFlight,
        returnFlight: this.returnFlight,
        adults :this.adults
      }
    });

  }
  
}
