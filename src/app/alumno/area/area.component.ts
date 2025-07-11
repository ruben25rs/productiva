import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Inscripcion } from 'src/app/interfaces/Inscripcion';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { CInscrito } from 'src/app/interfaces/CInscrito';

import { AreacursosService } from 'src/app/services/areacursos.service';
import { Areacursos } from '../../interfaces/Areacursos';

import { Cursos } from 'src/app/interfaces/Cursos';
import { CursosService } from 'src/app/services/cursos.service';
import { appsettings } from 'src/app/settings/appsettings';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent {
  public urlTree: any;
  public idcurso: number = 0;

    private inscripcionService = inject(InscripcionService);
    private areacursosService = inject(AreacursosService);
    private cursosService = inject(CursosService);

    public cursos: Cursos[] = []
      public AreaCurso: Areacursos[] = []
public baseUrl: string = appsettings.urlImg;

    public Inscripcion: Inscripcion[] = [];
    public cInscrito: CInscrito[] = [];

    idUser: Number = Number(sessionStorage.getItem("id"))
    public inscrito : boolean = false;

    constructor(private route: ActivatedRoute) {}

      cursoxalumno(){ 
    
        this.cursosService.listaCursosId(this.idcurso).subscribe({
        next: (data) =>{  
              
          this.cursos = data['value']

          console.log(data['value'])
          
          if (data.value.length > 0) {
            this.cursos = data['value']
          }
        }, error:(error) =>{
            console.log(error.message);   
        }
      })
     }

     detallarCurso(){
        this.areacursosService.listaC().subscribe({
        next: (detallecurso) =>{
          
          console.log(detallecurso['value'])

          if (detallecurso.value.length > 0) {
            this.AreaCurso = detallecurso['value']
            
      }
      

    }, error:(error) =>{
      console.log(error.message); 
    }
  })

  }
 
  ngOnInit(): void {
    

   this.idcurso = Number(this.route.snapshot.paramMap.get('id'));

   this.cursoxalumno();
    this.detallarCurso();
    console.log("curso...."+this.idcurso)
  }

}
