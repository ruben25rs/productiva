import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeIComponent } from './homeI.component';

describe('HomeComponent', () => {
  let component: HomeIComponent;
  let fixture: ComponentFixture<HomeIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeIComponent]
    });
    fixture = TestBed.createComponent(HomeIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
