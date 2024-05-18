import { Component , OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../authService';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [NavbarComponent,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    FormsModule,
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
    CommonModule,],
  templateUrl: './update-profile.component.html',
  styleUrl: './update-profile.component.scss'
})

export class UpdateProfileComponent implements OnInit{
  errorMessage: string = '';
  profile: any ={};
  profileForm!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    }
    else{
        console.log("is logged in"  + this.authService.isLoggedIn());
        console.log("is logged in with token"  + this.authService.getAuthToken());
        this.profileForm = this.fb.group({
          firstName: [this.profile.firstName, Validators.required],
          lastName: [this.profile.lastName, Validators.required],
          username: [{ value: this.profile.username, disabled: true }, Validators.required],
          email: [{value:this.profile.email,disabled: true}, [Validators.required, Validators.email]],
          birthDate: [this.profile.birthDate, Validators.required],
          description: [this.profile.description]
        });
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
        this.profileForm = this.fb.group({
          firstName: [this.profile.firstName, Validators.required],
          lastName: [this.profile.lastName, Validators.required],
          username: [{ value: this.profile.username, disabled: true }, Validators.required],
          email: [{value:this.profile.email,disabled: true}, [Validators.required, Validators.email]],
          birthDate: [this.profile.birthDate, Validators.required],
          description: [this.profile.description]
        });
      },
      (error) => {
        console.error('Error fetching data:', error);
        
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedProfile = this.profileForm.value;
      // Handle the updated profile data here, such as sending it to a server
      console.log('Profile updated:', updatedProfile);
      this.updateProfile();
    }
  }

  onCancel(){
    this.router.navigate(['/profile']);
  }

  updateProfile() {
    const apiUrl = 'http://localhost:8080/auth/user/updateUserProfile';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    if(this.profileForm.valid){
      this.http.post(apiUrl, this.profileForm.value).subscribe(
        (response) => {
          
          console.log('Update successful', response);
          this.router.navigate(['/profile']);
          this.profileForm.reset();
          
        },
        (error) => {
          console.error('Update failed', error.errorMessage);
          // this.hasError = true;
          this.errorMessage =error.errorMessage;
        }
      );
    }
  }

  

}
