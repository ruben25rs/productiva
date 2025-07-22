import { Component, Input, AfterViewInit, ElementRef, ViewChildren, QueryList, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as pdfjsLib from 'pdfjs-dist';
import * as pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

@Component({
  selector: 'app-pdfjs-viewer',
  templateUrl: './pdfjs-viewer.component.html',
  styleUrls: ['./pdfjs-viewer.component.css']
})
export class PdfjsViewerComponent implements AfterViewInit {

  @Input() apiUrl: string = ''; // URL de la API
  @ViewChildren('pageCanvas') pageCanvases!: QueryList<ElementRef<HTMLCanvasElement>>;

  pdfDoc: any = null;
  totalPages = 0;
  zoom = 1.0;
  isLoading = true;
  pages: number[] = [];

  private observer!: IntersectionObserver;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngAfterViewInit() {
    (pdfjsLib as any).GlobalWorkerOptions.workerSrc = pdfjsWorker;
    if (this.apiUrl) {
      this.loadPdfFromApi(this.apiUrl);
    }
  }

  /** Descarga PDF como Blob */
  loadPdfFromApi(url: string) {
    this.http.get(url, { responseType: 'blob' })
      .subscribe(blob => {
        const blobUrl = URL.createObjectURL(blob);
        this.loadPdf(blobUrl);
      }, error => {
        console.error('Error cargando PDF:', error);
        this.isLoading = false;
      });
  }

  /** Carga documento PDF.js */
  async loadPdf(url: string) {
    const loadingTask = pdfjsLib.getDocument(url);
    this.pdfDoc = await loadingTask.promise;
    this.totalPages = this.pdfDoc.numPages;
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.isLoading = false;

    // Configura lazy loading
    this.setupLazyLoading();
  }

  /** Configura IntersectionObserver para cargar páginas al hacer scroll */
  setupLazyLoading() {
    const options = { root: null, rootMargin: '100px', threshold: 0.1 };
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const canvas = entry.target as HTMLCanvasElement;
          const pageNum = Number(canvas.getAttribute('data-page'));
          this.renderPage(pageNum, canvas);
          this.observer.unobserve(canvas);
        }
      });
    }, options);

    setTimeout(() => {
      this.pageCanvases.forEach(canvas => {
        this.observer.observe(canvas.nativeElement);
      });
    }, 300);
  }

  /** Renderiza una página en un canvas específico */
  async renderPage(pageNumber: number, canvas: HTMLCanvasElement) {
    const page = await this.pdfDoc.getPage(pageNumber);

    // Usa la escala de zoom
    const viewport = page.getViewport({ scale: this.zoom });

    // Ajusta el tamaño del canvas a la escala real
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    const context = canvas.getContext('2d')!;
    const renderContext = { canvasContext: context, viewport };
    await page.render(renderContext).promise;
  }



  zoomIn() {
    this.zoom += 0.5;
    this.reRenderAll();
  }

  zoomOut() {
    if (this.zoom > 0.4) {
      this.zoom -= 0.36;
      this.reRenderAll();
    }
  }

  reRenderAll() {
    this.pageCanvases.forEach(canvasRef => {
      const canvas = canvasRef.nativeElement;
      const pageNum = Number(canvas.getAttribute('data-page'));
      this.renderPage(pageNum, canvas);
    });
  }

}
