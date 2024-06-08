import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingListComponent } from './flight-booking-list.component';

describe('FlightBookingListComponent', () => {
  let component: FlightBookingListComponent;
  let fixture: ComponentFixture<FlightBookingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightBookingListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
