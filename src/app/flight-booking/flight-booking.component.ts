import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  StepperOrientation,
  MatStepperModule,
} from '@angular/material/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FlightBooking } from '../model/FlightBooking';
import { Passenger } from '../model/Passenger';
import { Document } from '../model/Document';
import { Flight } from '../model/Flight';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../authService';
import { PaymentType } from '../model/PaymentType';
import { PaymentDTO } from '../model/PaymentDto';
import {
  ONLY_LETTERS_REGEX,
  ONLY_NUMBERS_REGEX,
  PHONE_NUMBER_REGEX,
} from '../validationConstants';

@Component({
  selector: 'app-flight-booking',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AsyncPipe,
    NavbarComponent,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './flight-booking.component.html',
  styleUrl: './flight-booking.component.scss',
})
export class FlightBookingComponent {
  firstFormGroup!: FormGroup;
  firstFormGroups: FormGroup[] = [];
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  flightBooking: FlightBooking = new FlightBooking();
  errorMessage: any;
  departFlight: Flight = new Flight();
  returnFlight: Flight = new Flight();
  adults: any;
  extrabag: any;
  paymentTypes = Object.values(PaymentType);
  passengers!: any[];

  payment: PaymentDTO = {
    paymentType: '',
    cardNumber: '',
    expiryDate: '',
  };

  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.flightBooking = new FlightBooking();
    this.flightBooking.passengerList = [];
    this.passengers = [];

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.departFlight = navigation.extras.state['departFlight'];
      this.returnFlight = navigation.extras.state['returnFlight'];
      this.adults = navigation.extras.state['adults'];
    }
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/error']);
    } else {
      console.log('is logged in' + this.authService.isLoggedIn());
      console.log('is logged in with token' + this.authService.getAuthToken());

      console.log('Depart Flight:', this.departFlight);
      console.log('Return Flight:', this.returnFlight);

      for (let i = 0; i < this.adults; i++) {
        this.firstFormGroups.push(
          this._formBuilder.group({
            firstName: [
              '',
              [Validators.required, Validators.pattern(ONLY_LETTERS_REGEX)],
            ],
            lastName: [
              '',
              [Validators.required, Validators.pattern(ONLY_LETTERS_REGEX)],
            ],
            gender: ['', Validators.required],
            documentType: ['', Validators.required],
            documentNumber: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: [
              '',
              [Validators.required, Validators.pattern(ONLY_NUMBERS_REGEX)],
            ],
          })
        );
      }

      this.secondFormGroup = this._formBuilder.group({
        baggageWeight: ['', Validators.required],
      });

      this.thirdFormGroup = this._formBuilder.group({
        paymentType: ['', Validators.required],
        cardNumber: [
          '',
          [
            Validators.required,
            Validators.pattern(ONLY_NUMBERS_REGEX),
            Validators.minLength(12),
            Validators.maxLength(12),
          ],
        ],
        expiryDate: ['', Validators.required],
      });
    }
  }

  createFlightBooking() {
    this.passengers = this.firstFormGroups.map((firstFormGroup) => {
      const passenger = new Passenger();
      passenger.firstName = firstFormGroup.value.firstName;
      passenger.lastName = firstFormGroup.value.lastName;
      passenger.gender = firstFormGroup.value.gender;
      passenger.email = firstFormGroup.value.email;
      passenger.phoneNumber = firstFormGroup.value.phoneNumber;

      const document = new Document();
      document.type = firstFormGroup.value.documentType;
      document.number = firstFormGroup.value.documentNumber;
      passenger.documents = [document];
      return passenger;
    });

    // this.flightBooking.passengerList.push(passenger);
    // this.passengers.push(passenger);
    this.flightBooking.departureFlight = new Flight(); // Populate this with real data
    this.flightBooking.returnFlight = new Flight(); // Populate this with real data

    this.addFlightBooking();
  }
  isLastPassengerStep(): boolean {
    return (
      this.firstFormGroups.length ===
      this.firstFormGroups.indexOf(
        this.firstFormGroups[this.firstFormGroups.length - 1]
      ) +
        1
    );
  }

  addFlightBooking() {
    const apiUrl = 'http://localhost:8080/flightBooking/add';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:8080',
      Authorization: 'Bearer ' + this.authService.getAuthToken(),
    });
    this.flightBooking.departureFlight = this.departFlight;
    this.flightBooking.returnFlight = this.returnFlight;
    this.flightBooking.passengerList = this.passengers;
    this.flightBooking.payment = this.thirdFormGroup.value;
    const options = { headers: headers };

    this.http.post(apiUrl, this.flightBooking, options).subscribe(
      (response) => {
        console.log('FlightBookingAdded', response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Update failed', error.errorMessage);
        // this.hasError = true;
        this.errorMessage = error.errorMessage;
      }
    );
  }
}
