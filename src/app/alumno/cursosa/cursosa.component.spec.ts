import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosaComponent } from './cursosa.component';

describe('CursosComponent', () => {
  let component: CursosaComponent;
  let fixture: ComponentFixture<CursosaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosaComponent]
    });
    fixture = TestBed.createComponent(CursosaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
