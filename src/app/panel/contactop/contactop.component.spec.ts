import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactopComponent } from './contactop.component';

describe('ContactopComponent', () => {
  let component: ContactopComponent;
  let fixture: ComponentFixture<ContactopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactopComponent]
    });
    fixture = TestBed.createComponent(ContactopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
