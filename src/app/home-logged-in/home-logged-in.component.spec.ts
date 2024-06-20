import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeLoggedInComponent } from './home-logged-in.component';

describe('HomeLoggedInComponent', () => {
  let component: HomeLoggedInComponent;
  let fixture: ComponentFixture<HomeLoggedInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeLoggedInComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomeLoggedInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
