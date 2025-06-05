import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapacitadorComponent } from './capacitador.component';

describe('CapacitadorComponent', () => {
  let component: CapacitadorComponent;
  let fixture: ComponentFixture<CapacitadorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapacitadorComponent]
    });
    fixture = TestBed.createComponent(CapacitadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
