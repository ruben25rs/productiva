import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { appsettings } from '../../settings/appsettings';
import { RecursosService } from '../../services/recursos.service';
import { CursosService } from '../../services/cursos.service';
import { Modulos } from '../../interfaces/Modulos';
import { Recurso } from '../../interfaces/Recurso';
import { InscripcionService } from '../../services/inscripcion.service';
import { Inscripcion } from '../../interfaces/Inscripcion';
import { Cursos } from '../../interfaces/Cursos';
import { Areacursos } from '../../interfaces/Areacursos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-infocursos',
  templateUrl: './infocursos.component.html',
  styleUrls: ['./infocursos.component.css']
})
export class InfocursosComponent {
    
  idCurso?: Number;

  private recursosService = inject(RecursosService);
  private cursosService = inject(CursosService);

  public modulos: Modulos[] = [];
  public recursos: Recurso[] = [];
  public curso?: Cursos;
  public areacurso?: Areacursos;
  public activarInscripcion = false;

  public baseUrl: string = appsettings.urlImg;

  constructor(private route: ActivatedRoute, private router:Router) { 
  }


  listarRecursos(){
    this.recursosService.listaRecursos(Number(this.idCurso)).subscribe({
      next: (data) =>{
        
        

        if (data.value.length > 0) {
          this.curso = data['value_c']
          this.areacurso = data['value_a']
          this.modulos = data['value']
          
          console.log(this.curso)
          console.log(this.areacurso)
        }

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }




  ngOnInit(): void {
    //this.cargar_table()
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));

    this.listarRecursos()

    
  }  

}
