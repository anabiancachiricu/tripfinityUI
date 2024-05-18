import { HttpClient, HttpClientModule, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatListItem } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { map, startWith, debounceTime, switchMap } from 'rxjs/operators';
import { OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-flights',
  standalone: true,
  templateUrl: './flights.component.html',
  styleUrl: './flights.component.scss',
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
    MatAutocompleteModule
  ]

})
export class FlightsComponent {

  flights : any =[];
  dests : any=[];
  searchControl = new FormControl();
  filteredOptions: Observable<{ iataCode: string; city: string; airportName: string; }[]> | undefined;
  originAirport: string = '';
  hasFlights: boolean =false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log("is logged in"  + this.authService.isLoggedIn());
      console.log("is logged in with token"  + this.authService.getAuthToken());
      // this.getFlights();
      // this.getDestinations();
      this.filteredOptions = this.searchControl.valueChanges.pipe(
        debounceTime(200),
        startWith(''),
        switchMap(value => this.searchAirports(value))
      );
    }
  }
  

  
  onOptionSelected(event: any) {
    console.log('Option selected:', event.option.value);
    this.originAirport = event.option.value;
    console.log("origin: "+ this.originAirport);
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
    const apiUrl = `http://localhost:8080/flights/search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('origin', this.originAirport);
  
    this.http.get<any[]>(apiUrl, { headers, params }).subscribe(
      (response: any) => {
        this.flights = response;
        this.hasFlights = true;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  
}
