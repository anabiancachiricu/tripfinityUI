import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityDestinationsComponent } from './city-destinations.component';

describe('CityDestinationsComponent', () => {
  let component: CityDestinationsComponent;
  let fixture: ComponentFixture<CityDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
