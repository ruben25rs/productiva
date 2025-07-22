import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

@Component({
  selector: 'app-pdfjs-viewer',
  templateUrl: './pdfjs-viewer.component.html',
  styleUrls: ['./pdfjs-viewer.component.css']
})
export class PdfjsViewerComponent implements AfterViewInit {

  @ViewChild('pdfCanvas', { static: false }) pdfCanvas!: ElementRef<HTMLCanvasElement>;

  pdfUrl = 'https://tuservidor.com/ruta/del/pdf.pdf'; // URL del PDF
  pdfDoc: any = null;
  currentPage = 1;
  totalPages = 0;
  zoom = 1.0;

  ngAfterViewInit() {
    // Configurar el worker
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;
    this.loadPdf();
  }

  async loadPdf() {
    const loadingTask = pdfjsLib.getDocument(this.pdfUrl);
    this.pdfDoc = await loadingTask.promise;
    this.totalPages = this.pdfDoc.numPages;
    this.renderPage(this.currentPage);
  }

  async renderPage(pageNumber: number) {
    const page = await this.pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: this.zoom });

    const canvas = this.pdfCanvas.nativeElement;
    const context = canvas.getContext('2d')!;
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderContext = { canvasContext: context, viewport: viewport };
    await page.render(renderContext).promise;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.renderPage(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderPage(this.currentPage);
    }
  }

  zoomIn() {
    this.zoom += 0.2;
    this.renderPage(this.currentPage);
  }

  zoomOut() {
    if (this.zoom > 0.4) {
      this.zoom -= 0.2;
      this.renderPage(this.currentPage);
    }
  }
}
