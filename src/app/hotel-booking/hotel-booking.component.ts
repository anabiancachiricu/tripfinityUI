import { Component } from '@angular/core';
import { HotelGuestDTO } from '../model/HotelGuestDto';
import { HotelOfferDTO } from '../model/HotelOfferDto';
import { PaymentDTO } from '../model/PaymentDto';
import { HotelBookingService } from '../service/HotelBookingService';
import { HotelBookingRequest } from '../model/HotelBookingRequest';
import { MatInput, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authService';
import { MatStepperModule } from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from '../navbar/navbar.component';
import { PaymentType } from '../model/PaymentType';
import { MatSelectModule } from '@angular/material/select';
import { ONLY_LETTERS_REGEX, ONLY_NUMBERS_REGEX } from '../validationConstants';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-hotel-booking',
  standalone: true,
  imports: [
    MatInputModule,
    CommonModule,
    FormsModule,
    MatStepperModule,
    ReactiveFormsModule,
    NavbarComponent,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './hotel-booking.component.html',
  styleUrl: './hotel-booking.component.scss'
})
export class HotelBookingComponent {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;

  hotelBooking : HotelBookingRequest = new HotelBookingRequest;
  paymentTypes = Object.values(PaymentType); // Get all values of the PaymentType enum


  city!: string;

  hotelOffer: HotelOfferDTO = {
    offerId: '',
    hotelId: '',
    dupeId: '',
    cityCode: '',
    hotelName: '',
    available: false,
    checkInDate: '',
    checkOutDate: '',
    description: '',
    roomCategory: '',
    bedType: '',
    noOfBeds: 0,
    noOfGuests: 0,
    price: '',
    currency: ''
  };

  hotelGuest: HotelGuestDTO = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    noOfAdditionalPeople: 0
  };

  payment: PaymentDTO = {
    paymentType: '',
    cardNumber: '',
    expiryDate: ''
  };
  errorMessage: any;

  constructor(private bookingService: HotelBookingService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.hotelOffer = navigation.extras.state['hotel'];
      this.city = navigation.extras.state['city'];

      console.log("hotelOffer: ", this.hotelOffer);
      console.log("city: ", this.city);
    }

    this.firstFormGroup = this._formBuilder.group({
      offerId: [{value: this.hotelOffer.offerId, disabled: true}, Validators.required],
      hotelName: [{value:this.hotelOffer.hotelName,disabled: true}, Validators.required],
      checkInDate: [{value: this.hotelOffer.checkInDate,disabled: true}, Validators.required],
      checkOutDate: [{value: this.hotelOffer.checkOutDate,disabled: true}, Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(ONLY_LETTERS_REGEX)]],
      lastName: ['', [Validators.required, Validators.pattern(ONLY_LETTERS_REGEX)]],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      noOfAdditionalPeople: ['']
    });

    this.thirdFormGroup = this._formBuilder.group({
      paymentType: ['', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(ONLY_NUMBERS_REGEX)]],
      expiryDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    }
    else{
        console.log("is logged in"  + this.authService.isLoggedIn());
        console.log("is logged in with token"  + this.authService.getAuthToken());
    }
  }

  createHotelBooking() {

    this.hotelGuest = this.secondFormGroup.value;
    this.payment = this.thirdFormGroup.value;

    const bookingRequest: HotelBookingRequest = {
      hotelOffer: this.hotelOffer,
      hotelGuest: this.hotelGuest,
      payment: this.payment
    };

    const apiUrl = 'http://localhost:8080/api/hotel/book';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });

    const options = { headers: headers };
    this.http.post(apiUrl,bookingRequest, options ).subscribe(
      (response) => {
        
        console.log('HotelBookingAdded', response);
        this.router.navigate(['/profile']);
        
      },
      (error) => {
        console.error('Update failed', error.errorMessage);
        // this.hasError = true;
        this.errorMessage =error.errorMessage;
      }
    );

  }

  
  

  
}
