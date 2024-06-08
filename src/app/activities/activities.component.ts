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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activities',
  standalone: true,
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
    MatProgressSpinnerModule
  ],
  templateUrl: './activities.component.html',
  styleUrl: './activities.component.scss'
})
export class ActivitiesComponent {

  activities : any =[];
  dests : any=[];
  city: string = '';
  originAirport: string = '';
  hasActivities: boolean =false;
  isPending:boolean = false;
  errorMessage: string = '';

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

  searchActivities() {
    this.isPending=true;
    const apiUrl = `http://localhost:8080/activities/search`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    let params = new HttpParams();
    params = params.append('city', this.city);
  
    this.http.get<any[]>(apiUrl, { headers, params }).subscribe(
      (response: any) => {
        this.activities = response;
        this.hasActivities = true;
        this.isPending=false;
      },
      (error) => {
        console.error('Error fetching data:', error);
        this.isPending=false;
      }
    );
  }

  viewDetails(activityId: string, city: string) {
    this.router.navigate([`/activities/${activityId}/${city}`]);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


  public addToFavourites(activity: any){
    const apiUrl = `http://localhost:8080/favourite/addToFavouritesForUser`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    const params = new HttpParams()
      .set('activityId', activity.activityId)
      .set('city', this.city)
      .set('activityName', activity.name);

    this.http.post(apiUrl, {}, { headers, params }).subscribe(
      (response: any) => {
        console.log('Added to favourites successful', response);
        this.openSnackBar("Added to favourites", "OK");
      },
      (error) => {
        console.error('Add to favourites failed', error.errorMessage);
        this.errorMessage = error.errorMessage;
        this.openSnackBar("Already added to favourites", "OK");
      }
    );
  }

}
