import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeachDestinationsComponent } from './beach-destinations.component';

describe('BeachDestinationsComponent', () => {
  let component: BeachDestinationsComponent;
  let fixture: ComponentFixture<BeachDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeachDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeachDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
