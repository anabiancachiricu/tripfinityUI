import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingDetailsComponent } from './flight-booking-details.component';

describe('FlightBookingDetailsComponent', () => {
  let component: FlightBookingDetailsComponent;
  let fixture: ComponentFixture<FlightBookingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightBookingDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightBookingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
