import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { HeroLoginComponent } from './hero-login/hero-login.component';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'hero-login', component:HeroLoginComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }