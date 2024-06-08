// In your module file (e.g., app.module.ts or a custom module)
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {ThemePalette} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HttpClientModule} from "@angular/common/http";
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HeroLoginComponent } from './hero-login/hero-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { GoogleMapsModule } from '@angular/google-maps';
import {  } from '@google/maps';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatSelectModule, 
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatToolbarModule,
    HttpClientModule,
    SignupComponent,
    LoginComponent,
    HeroLoginComponent,
    NavbarComponent,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    MatListModule,
    MatDialogModule,
    GoogleMapsModule
  ],
  bootstrap: [AppModule]
})
export class AppModule { }
