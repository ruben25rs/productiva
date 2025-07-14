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
import { ModulosService } from '../../services/modulos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-infocursos',
  templateUrl: './infocursos.component.html',
  styleUrls: ['./infocursos.component.css']
})
export class InfocursosComponent {
   

  idCurso?: Number;
  nombrearea: string = "";
  idUser: Number = Number(sessionStorage.getItem("id"))
  public baseUrl: string = appsettings.urlImg;
  private recursosService = inject(RecursosService);
  public modulosService = inject(ModulosService);

  public inscripcion: Inscripcion[] = [];
  public modulos: Modulos[] = [];
  public recursos: Recurso[] = [];
  public curso?: Cursos;
  public areacurso?: Areacursos;
  public activarInscripcion = false;

  constructor(private route: ActivatedRoute, private router:Router) { 
    console.log("ENTRO A INFOCURSOS COMPONENTE")
  }
  
listarModulos(){
  this.modulosService.listarModulosId(Number(this.idCurso)).subscribe({
    next: (data) => {
      if (data.value.length > 0) {
        this.modulos = data.value;
        console.log(this.modulos);
      }
    } ,     
error: (error) => {
      console.log(error.message);
    }
  });

}
    ngOnInit(): void {
    //this.cargar_table()
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));
      this.nombrearea = this.route.snapshot.paramMap.get('nombrearea') || '';
 
   this.listarModulos()

    
  }  


}
