import { Component, inject } from '@angular/core';
import { RecursosService } from '../../services/recursos.service';
import { Recurso } from '../../interfaces/Recurso';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { appsettings } from '../../settings/appsettings';

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

  pdfUrl!: SafeResourceUrl;

  constructor(private route: ActivatedRoute, private router:Router, private sanitizer: DomSanitizer) { 
  }

  listarRecurso(){
    this.recursosService.listaRecursoId(Number(this.idRecurso)).subscribe({
      next: (data) =>{
        this.recurso = data['value'];
        

        if (data['value'].archivo=="pdf") {
          this.recursosService.listaRecursoblobId(Number(this.idRecurso)).subscribe(blob => {
            const blobUrl = URL.createObjectURL(blob);
            this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
          });
        }else{
          this.rutaRecurso=this.baseUrl +(data['value'].ruta)
        }
        console.log(data)

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
