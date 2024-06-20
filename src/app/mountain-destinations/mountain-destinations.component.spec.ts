import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MountainDestinationsComponent } from './mountain-destinations.component';

describe('MountainDestinationsComponent', () => {
  let component: MountainDestinationsComponent;
  let fixture: ComponentFixture<MountainDestinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MountainDestinationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MountainDestinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
