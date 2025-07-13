import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InscripcionService } from '../../services/inscripcion.service';
import { Cursos } from '../../interfaces/Cursos'; 
import { Inscripcion } from '../../interfaces/Inscripcion';
import { CursosService } from '../../services/cursos.service';
import { appsettings } from '../../settings/appsettings';
import { Router } from '@angular/router';


@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent {

  idArea?: String
  

  private cursosService = inject(CursosService);
  private inscripcionService = inject(InscripcionService);

  public cursos: Cursos[] = []
  public inscripcion: Inscripcion[] = [];
  public baseUrl: string = appsettings.urlImg;

  idUser: Number = Number(sessionStorage.getItem("id"))

  constructor(private route: ActivatedRoute, private router: Router) {


  }


  listar(){
    this.cursosService.listaCursosa(String(this.idArea), this.idUser).subscribe({
      next: (data) =>{

        console.log(data['value'])
        if (data.value.length > 0) {
          this.cursos = data['value']
        }
        

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  inscribirse(id:any){

    this.inscripcionService.inscribirse(id, this.idUser).subscribe({
      next: (data) =>{
        console.log(data)
        this.listar()

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

  ngOnInit(){       
    this.idArea = String(this.route.snapshot.paramMap.get('id'));
    console.log(this.idArea)

    this.listar()
  }
}

