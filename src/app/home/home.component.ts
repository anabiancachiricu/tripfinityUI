import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  goToSignup(){
    this.router.navigate(['/hero-login']);
  }
  
}
