import { Component, inject } from '@angular/core';
import { RecursosService } from '../../services/recursos.service';
import { Recurso } from '../../interfaces/Recurso';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { appsettings } from '../../settings/appsettings';

import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-recurso',
  templateUrl: './recurso.component.html',
  styleUrls: ['./recurso.component.css']
})
export class RecursoComponent {

  idRecurso?: Number;

  private recursosService = inject(RecursosService);

  public recurso?: Recurso;

  public baseUrl: string = appsettings.urlImg;

  public rutaRecurso: string = "";

  pdfUrl!: string;
  // pdfUrl!: SafeResourceUrl;
  // pdfApiUrl!: string;
  pdfApiUrl!: string;
  // pdfApiUrl = 'https://api.carasoftweb.com/public/img/cursos/recurso/recurso4.pdf';

  constructor(private route: ActivatedRoute, private router:Router, private sanitizer: DomSanitizer) { 
  }

  listarRecurso(){
    this.recursosService.listaRecursoId(Number(this.idRecurso)).subscribe({
      next: (data) =>{
        this.recurso = data['value'];
        
        if (this.recurso?.archivo === "pdf") {
          // Si el PDF viene como blob desde el backend
          this.pdfApiUrl = this.baseUrl + this.recurso?.ruta;
        } else {
          this.rutaRecurso = this.baseUrl + this.recurso?.ruta; // string
        }
        console.log(this.pdfApiUrl)
      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }


  ngOnInit(): void {
    this.idRecurso = Number(this.route.snapshot.paramMap.get('id'));

    this.listarRecurso()


    
  }  
}
