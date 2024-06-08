import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HotelBookingRequest } from '../model/HotelBookingRequest';

@Injectable({
    providedIn: 'root'
  })
  export class HotelBookingService {
    private apiUrl = 'http://localhost:8080/api/hotel/book';
    
  
    constructor(private http: HttpClient) {}
  
    createBooking(bookingRequest: HotelBookingRequest): Observable<any> {
      return this.http.post<any>(this.apiUrl, bookingRequest);
    }
  }