import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-wishlist-list',
  standalone: true,
  imports: [
    NavbarComponent, 
    CommonModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    SidenavComponent
  ],
  templateUrl: './wishlist-list.component.html',
  styleUrl: './wishlist-list.component.scss'
})
export class WishlistListComponent {

  @ViewChild(MatAccordion) accordion!: MatAccordion;
  errorMessage: string = '';
  profile: any ={};
  wishlistList : any =[];
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
        this.getWishlistList();
    }
  }

  getWishlistList(){
    const apiUrl = 'http://localhost:8080/wishlist/getWishlistsByUser';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    this.http.get<any[]>(apiUrl, { headers }).subscribe(
      (response: any) => {
        this.wishlistList = response;
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
