import { HotelGuestDTO } from "./HotelGuestDto";
import { HotelOfferDTO } from "./HotelOfferDto";
import { PaymentDTO } from "./PaymentDto";


export class HotelBookingRequest {
  hotelOffer!: HotelOfferDTO;
  hotelGuest!: HotelGuestDTO;
  payment!: PaymentDTO;
}
