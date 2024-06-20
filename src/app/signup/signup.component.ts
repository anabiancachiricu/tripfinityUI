import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, AbstractControl  } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from '../authService';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ONLY_LETTERS_REGEX } from '../validationConstants';

function dateWithinRangeValidator(minDate: Date, maxDate: Date) {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedDate = control.value;
    if (selectedDate) {
      if (selectedDate < minDate || selectedDate > maxDate) {
        return { 'dateOutOfRange': true };
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-signup',
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
    MatDatepickerModule,
    CommonModule,
    
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] // Corrected property name
})


export class SignupComponent implements OnInit {

  signupForm!:FormGroup;
  errorMessage: string = '';
  minDate: Date;
  maxDate: Date;
  allRequiredFieldsCompleted: boolean = false;
  hasError: boolean=false;
  
  constructor(private http: HttpClient, private router: Router, private formBuilder: FormBuilder) {
    this.minDate = new Date(1924, 0, 1); // January is month 0
    this.maxDate = new Date(2014, 11, 31);
  }
  
  areAllRequiredFieldsCompleted(): boolean {
    for (const controlName in this.signupForm.controls) {
      const control = this.signupForm.get(controlName);
      if (control 
        && (control.hasError('required') || control.hasError('email') || control.hasError('minLength') || control.hasError('dateOutOfRange'))
        && control.invalid) {
        return false;
      }
    }
    return true;
  }
  
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      // username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(ONLY_LETTERS_REGEX)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(ONLY_LETTERS_REGEX)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      birthDate: new FormControl('', [Validators.required, dateWithinRangeValidator(this.minDate, this.maxDate)]),
      profilePicture: new FormControl('')
    });

    this.allRequiredFieldsCompleted = false;
    this.signupForm.valueChanges.subscribe(_ => {
      this.allRequiredFieldsCompleted = this.areAllRequiredFieldsCompleted();
      console.log(this.allRequiredFieldsCompleted);
    });
  }


  signup() {
    const apiUrl = 'http://localhost:8080/auth/addNewUser';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080'
    });
    if(this.signupForm.valid){
      this.http.post(apiUrl, this.signupForm.value).subscribe(
        (response) => {
          this.router.navigate(['/hero-login']);
          console.log('Signup successful', response);
          this.signupForm.reset();
          
        },
        (error) => {
          console.error('Signup failed', error.errorMessage);
          this.hasError = true;
          this.errorMessage =error.errorMessage;
        }
      );
    }
    
  }

}
