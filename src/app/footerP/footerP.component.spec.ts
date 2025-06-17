import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponentP } from './footerP.component';

describe('FooterComponentP', () => {
  let component: FooterComponentP;
  let fixture: ComponentFixture<FooterComponentP>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponentP]
    });
    fixture = TestBed.createComponent(FooterComponentP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
