import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MatButtonModule, NavbarComponent],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
  
  goToSignup(){
    this.router.navigate(['/hero-login']);
  }
}
