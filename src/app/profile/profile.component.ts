import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  standalone: true,
  imports: [
    NavbarComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    SidenavComponent
  ],
})
export class ProfileComponent implements OnInit {
  errorMessage: string = '';
  profile: any ={};
  favourites : any =[];
  hasFavourites : boolean= false;

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
        this.getProfile();
    }
    // this.getProfile();
  }

  getProfile() {
    const apiUrl = 'http://localhost:8080/auth/user/userProfile';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    
    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (response: any) => {
        this.profile = response;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  goToUpdateProfile(){
    this.router.navigate(['/update-profile']);
  }

  viewFavourites(){
    const apiUrl = 'http://localhost:8080/favourite/getFavouritesForUser';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (response: any) => {
        this.favourites = response;
        this.hasFavourites = true;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  viewDetails(activityId: string, city: string) {
    this.router.navigate([`/activities/${activityId}/${city}`]);
  }
}
