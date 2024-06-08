import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingDetailsComponent } from './hotel-booking-details.component';

describe('HotelBookingDetailsComponent', () => {
  let component: HotelBookingDetailsComponent;
  let fixture: ComponentFixture<HotelBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelBookingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
