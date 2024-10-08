import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  public goHome(){
    this.router.navigate(['home-logged-in']);
  };

  public logout(){
    this.authService.logout();
    this.router.navigate(['/hero-login']);
  }

  public goToProfile(){
    this.router.navigate(['/profile']);
  }

  public goToFlights(){
    this.router.navigate(['/flights']);
  }

  public goToFlightsSpecific(){
    this.router.navigate(['/flights-specific']);
  }

  public goToActivities(){
    this.router.navigate(['/activities']);
  }

  public goToHotels(){
    this.router.navigate(['/hotels']);
  }
  
  public goToSuggestions(){
    this.router.navigate(['/suggestions']);
  }
}
