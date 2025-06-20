import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAComponent } from './homeA.component';

describe('HomeAComponent', () => {
  let component: HomeAComponent;
  let fixture: ComponentFixture<HomeAComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeAComponent]
    });
    fixture = TestBed.createComponent(HomeAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
