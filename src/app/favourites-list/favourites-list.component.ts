import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-favourites-list',
    standalone: true,
    templateUrl: './favourites-list.component.html',
    styleUrl: './favourites-list.component.scss',
    imports: [NavbarComponent, 
      SidenavComponent,
      MatCardModule,
      MatButton,
      MatSidenavModule,
      CommonModule]
})
export class FavouritesListComponent {
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
        this.getFavourites();
    }
    // this.getProfile();
  }

  getFavourites(){
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
