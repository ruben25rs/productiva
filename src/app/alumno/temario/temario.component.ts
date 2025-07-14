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
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrls: ['./temario.component.css']
})
export class TemarioComponent {
    
  idCurso?: Number;
  idUser: Number = Number(sessionStorage.getItem("id"))

  private recursosService = inject(RecursosService);
  private cursosService = inject(CursosService);
  private inscripcionService = inject(InscripcionService);

  public inscripcion: Inscripcion[] = [];
  public modulos: Modulos[] = [];
  public recursos: Recurso[] = [];
  public curso?: Cursos;
  public areacurso?: Areacursos;
  public activarInscripcion = false;

  public baseUrl: string = appsettings.urlImg;

  constructor(private route: ActivatedRoute, private router:Router) { 
  }


  listarRecursos(){
    this.recursosService.listaRecursosId(Number(this.idCurso), this.idUser).subscribe({
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

  validar_inscripcion(){
    this.cursosService.inscritoU(Number(this.idCurso), this.idUser).subscribe({
      next: (data) =>{

        console.log(data['value'])
        this.activarInscripcion = data['value']
        

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  inscribirse(){

    this.inscripcionService.inscribirse(Number(this.idCurso), this.idUser).subscribe({
      next: (data) =>{
        console.log(data)
        this.validar_inscripcion()
      }, error:(error) =>{
        console.log(error.message); 
      },
      complete: () => {
        console.info("Inscripcion completo");
          //this.router.navigateByUrl('/panel');
          //window.location.href="/panel";
        


      }
    })
  }


  ngOnInit(): void {
    //this.cargar_table()
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));

    this.listarRecursos()
    this.validar_inscripcion()

    
  }  

}
