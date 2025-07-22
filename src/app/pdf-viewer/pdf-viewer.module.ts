import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerComponent } from './pdf-viewer.component';

@NgModule({
  declarations: [PdfViewerComponent],
  imports: [CommonModule],
  exports: [PdfViewerComponent]
})
export class PdfViewerModule {}
