import {Component} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormGroup} from '@angular/forms';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation, MatStepperModule} from '@angular/material/stepper';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AsyncPipe, CommonModule} from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
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

@Component({
  selector: 'app-flight-booking',
  standalone: true,
  imports: [MatStepperModule,
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
    CommonModule
  ],
  templateUrl: './flight-booking.component.html',
  styleUrl: './flight-booking.component.scss'
})
export class FlightBookingComponent {

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  thirdFormGroup!: FormGroup;
  flightBooking: FlightBooking = new FlightBooking;
  errorMessage: any;
  departFlight: Flight = new Flight;
  returnFlight: Flight = new Flight;
  adults: any;
  extrabag: any;
  paymentTypes = Object.values(PaymentType); 
  passengers!: any[];
  
  payment: PaymentDTO = {
    paymentType: '',
    cardNumber: '',
    expiryDate: ''
  };

  constructor(private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
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

    console.log('Depart Flight:', this.departFlight);
    console.log('Return Flight:', this.returnFlight);

    this.firstFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });

    this.secondFormGroup = this._formBuilder.group({
      baggageWeight: ['', Validators.required]
    });

    this.thirdFormGroup = this._formBuilder.group({
      paymentType: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });

  }

  createFlightBooking() {
    const passenger = new Passenger();
    passenger.firstName = this.firstFormGroup.value.firstName;
    passenger.lastName = this.firstFormGroup.value.lastName;
    passenger.gender = this.firstFormGroup.value.gender;
    passenger.email = this.firstFormGroup.value.email;
    passenger.phoneNumber = this.firstFormGroup.value.phoneNumber;

    const document = new Document();
    document.type = this.firstFormGroup.value.documentType;
    document.number = this.firstFormGroup.value.documentNumber;
    passenger.documents = [document];

    // this.flightBooking.passengerList.push(passenger);
    this.passengers.push(passenger);
    this.flightBooking.departureFlight = new Flight(); // Populate this with real data
    this.flightBooking.returnFlight = new Flight(); // Populate this with real data

    this.addFlightBooking();
    
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
    this.flightBooking.passengerList=this.passengers;
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
          this.errorMessage =error.errorMessage;
        }
      );
    
  }




}
