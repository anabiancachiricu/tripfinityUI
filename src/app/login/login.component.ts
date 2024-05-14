import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule}  from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';  
import {MatIconRegistry, MatIconModule} from '@angular/material/icon';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../authService';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatCardModule,
    MatButtonModule,
    MatSelectModule, 
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatIconModule,
    HttpClientModule,
    RouterModule,
    CommonModule
    
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent implements OnInit{

  loginForm!:FormGroup;
  errorMessage: string = '';
  allRequiredFieldsCompleted: boolean = false;
  
  constructor(private http: HttpClient,   private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
  }

  areAllRequiredFieldsCompleted(): boolean {
    for (const controlName in this.loginForm.controls) {
      const control = this.loginForm.get(controlName);
      if (control 
        && control.hasError('required')
        && control.invalid) {
        return false;
      }
    }
    return true;
  }



  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
     
    });

    this.allRequiredFieldsCompleted = false;
    this.loginForm.valueChanges.subscribe(_ => {
      this.allRequiredFieldsCompleted = this.areAllRequiredFieldsCompleted();
      console.log(this.allRequiredFieldsCompleted);
    });
  }

  login() {
    const apiUrl = 'http://localhost:8080/auth/generateToken';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    });
    if(this.loginForm.valid){
      this.http.post(apiUrl, this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Login successful', response);

          this.authService.setAuthToken(response.message.toString());
          console.log("token: " + this.authService.getAuthToken())
          setTimeout(() => {
            console.log('Login successful', response);
          }, 3000);
          
          this.router.navigate(['/profile']);

        },
        (error) => {
          console.error('Login failed', error);
          console.log("token: " + this.authService.getAuthToken())
          this.errorMessage = "Must complete with another username."
        }
      );
    }
    
  }

  

  loginWithGoogle() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    });
    // Make a POST request to the backend endpoint
    this.http.post<any>('http://localhost:8080/auth/login/google', {}).subscribe(
      response => {
        // Redirect the user to the authorization URL returned by the backend
        window.location.href = response.authorizationUrl;
      },
      error => {
        console.error('Error logging in with Google:', error);
        // Handle error
      }
    );
  }
  
}
