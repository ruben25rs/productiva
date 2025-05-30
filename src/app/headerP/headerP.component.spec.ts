import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponentP } from './headerP.component';

describe('HeaderComponentP', () => {
  let component: HeaderComponentP;
  let fixture: ComponentFixture<HeaderComponentP>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponentP]
    });
    fixture = TestBed.createComponent(HeaderComponentP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
