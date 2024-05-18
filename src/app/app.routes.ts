import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { HeroLoginComponent } from './hero-login/hero-login.component';
import { ProfileComponent } from './profile/profile.component';
import { ErrorComponent } from './error/error.component';
import { FlightsComponent } from './flights/flights.component';
import { FlightSpecificComponent } from './flight-specific/flight-specific.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'hero-login', component:HeroLoginComponent},
    {path: 'profile', component:ProfileComponent},
    {path: 'error', component:ErrorComponent},
    {path:'flights', component:FlightsComponent},
    {path:'flights-specific', component:FlightSpecificComponent},
    {path:'update-profile', component: UpdateProfileComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }