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
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
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
        (response) => {
          this.router.navigate(['/profile']);
          console.log('Login successful', response);
         
        },
        (error) => {
          console.error('Login failed', error);
          this.errorMessage = "Must complete with another username."
        }
      );
    }
    
  }
  
}
