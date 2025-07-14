import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfocursosComponent } from './infocursos.component';

describe('InfocursosComponent', () => {
  let component: InfocursosComponent;
  let fixture: ComponentFixture<InfocursosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfocursosComponent]
    });
    fixture = TestBed.createComponent(InfocursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
