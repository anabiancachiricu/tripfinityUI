export interface HotelOfferDTO {
    offerId: string;
    hotelId: string;
    dupeId: string;
    cityCode: string;
    hotelName: string;
    available: boolean;
    checkInDate: string;
    checkOutDate: string;
    description: string;
    roomCategory: string;
    bedType: string;
    noOfBeds: number;
    noOfGuests: number;
    price: string;
    currency: string;
  }