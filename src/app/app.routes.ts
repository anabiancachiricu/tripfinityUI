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
import { ActivitiesComponent } from './activities/activities.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelBookingComponent } from './hotel-booking/hotel-booking.component';
import { FavouritesListComponent } from './favourites-list/favourites-list.component';
import { HotelBookingListComponent } from './hotel-booking-list/hotel-booking-list.component';
import { HotelBookingDetailsComponent } from './hotel-booking-details/hotel-booking-details.component';
import { FlightBookingListComponent } from './flight-booking-list/flight-booking-list.component';
import { FlightBookingDetailsComponent } from './flight-booking-details/flight-booking-details.component';
import { HomeComponent } from './home/home.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { MountainDestinationsComponent } from './mountain-destinations/mountain-destinations.component';
import { BeachDestinationsComponent } from './beach-destinations/beach-destinations.component';
import { CityDestinationsComponent } from './city-destinations/city-destinations.component';
import { WishlistListComponent } from './wishlist-list/wishlist-list.component';
import { HomeLoggedInComponent } from './home-logged-in/home-logged-in.component';
import { ChatComponent } from './chat/chat.component';

export const routes: Routes = [
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'hero-login', component:HeroLoginComponent},
    {path: 'profile', component:ProfileComponent},
    {path: 'error', component:ErrorComponent},
    {path: 'flights', component:FlightsComponent},
    {path: 'flights-specific', component:FlightSpecificComponent},
    {path: 'update-profile', component: UpdateProfileComponent},
    {path: 'activities', component: ActivitiesComponent},
    {path: 'activities/:id/:city', component: ActivityDetailsComponent },
    {path: 'flight-booking', component:FlightBookingComponent},
    {path: 'hotels', component: HotelComponent},
    {path: 'hotels/:id/:check-in/:check-out/:adults/:lat/:long', component:HotelDetailsComponent},
    {path: 'hotels/:check-in/:check-out/:adults', component:HotelComponent},
    {path: 'hotel-booking', component:HotelBookingComponent},
    {path: 'favourits', component:FavouritesListComponent},
    {path: 'hotel-booking-list', component:HotelBookingListComponent},
    {path: 'hotel-booking-details', component:HotelBookingDetailsComponent},
    {path: 'flight-booking-list', component:FlightBookingListComponent},
    {path: 'flight-booking-details', component:FlightBookingDetailsComponent},
    {path: 'home', component:HomeComponent},
    {path: 'suggestions', component:SuggestionsComponent},
    {path: 'mountainDestinations', component:MountainDestinationsComponent},
    {path: 'beachDestinations', component:BeachDestinationsComponent},
    {path: 'cityDestinations', component:CityDestinationsComponent},
    {path: 'wishlistList', component:WishlistListComponent},
    {path: 'home-logged-in', component:HomeLoggedInComponent},
    {path: 'chatAi', component:ChatComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }