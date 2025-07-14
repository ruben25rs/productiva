import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { appsettings } from '../../settings/appsettings';
import { RecursosService } from '../../services/recursos.service';
import { IntentosService } from '../../services/intentos.service';
import { Modulos } from '../../interfaces/Modulos';
import { Recurso } from '../../interfaces/Recurso';
import { Cursos } from '../../interfaces/Cursos';
import { Intento } from '../../interfaces/Intento';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detallecurso',
  templateUrl: './detallecurso.component.html',
  styleUrls: ['./detallecurso.component.css']
})
export class DetallecursoComponent {

  idCurso?: Number;
  idUser: Number = Number(sessionStorage.getItem("id"))

  private recursosService = inject(RecursosService);
  private intentosService = inject(IntentosService);

  public modulos: Modulos[] = [];
  public recursos: Recurso[] = [];
  public intento: Intento[] = [];
  public curso?: Cursos;
  public activarExamen = false;
  public banderaIntentos = false;

  constructor(private route: ActivatedRoute, private router:Router) { 
  }


  listarRecursos(){
    this.recursosService.listaRecursosId(Number(this.idCurso), this.idUser).subscribe({
      next: (data) =>{
        

        if (data.value.length > 0) {
          this.curso = data['value_c']
          this.modulos = data['value']
          this.activarExamen = data['examen']
          console.log(this.modulos)
          
        }
      console.log(this.curso)
      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  visto_recurso(idRecurso:any){
    
    this.recursosService.vistoRecursoId(idRecurso, this.idUser).subscribe({
      next: (data) =>{
        console.log(data)
        this.listarRecursos()
        window.open('/alumno/recurso/' + idRecurso, '_blank');
      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  validar_intento(){
    this.intentosService.validarIntento(Number(this.idCurso), this.idUser).subscribe({
      next: (data) =>{
        console.log(data)
        if (data['intento']!=true) {
          this.router.navigateByUrl('/alumno/evaluacion/'+this.idCurso);
        }else{
          this.banderaIntentos = data['intento']
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
