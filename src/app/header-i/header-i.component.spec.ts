import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderIComponent } from './header-i.component';

describe('HeaderIComponent', () => {
  let component: HeaderIComponent;
  let fixture: ComponentFixture<HeaderIComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderIComponent]
    });
    fixture = TestBed.createComponent(HeaderIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
