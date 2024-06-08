import { Flight } from "./Flight";
import { Passenger } from "./Passenger";
import { PaymentDTO } from "./PaymentDto";

export class FlightBooking {
    departureFlight: Flight = new Flight;
    returnFlight: Flight = new Flight;
    passengerList!: Passenger[];
    payment!: PaymentDTO;
  }
  