import { Component, OnInit } from '@angular/core';
import { SignupComponent } from "../signup/signup.component";
import { LoginComponent } from "../login/login.component";
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
    selector: 'app-hero-login',
    standalone: true,
    templateUrl: './hero-login.component.html',
    styleUrl: './hero-login.component.css',
    imports: [SignupComponent, NavbarComponent, LoginComponent,MatCardModule,MatTabsModule,HttpClientModule, CommonModule
    ]
})
export class HeroLoginComponent {
   
}
