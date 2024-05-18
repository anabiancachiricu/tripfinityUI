import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightSpecificComponent } from './flight-specific.component';

describe('FlightSpecificComponent', () => {
  let component: FlightSpecificComponent;
  let fixture: ComponentFixture<FlightSpecificComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightSpecificComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlightSpecificComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
