import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfjsViewerComponent } from './pdfjs-viewer.component';

describe('PdfjsViewerComponent', () => {
  let component: PdfjsViewerComponent;
  let fixture: ComponentFixture<PdfjsViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfjsViewerComponent]
    });
    fixture = TestBed.createComponent(PdfjsViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
