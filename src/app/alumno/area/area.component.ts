import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from '../../interfaces/Cursos'; 
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

  public cursos: Cursos[] = []
  public baseUrl: string = appsettings.urlImg;

  constructor(private route: ActivatedRoute, private router: Router) {


  }


  listar(){
    this.cursosService.listaCursos(String(this.idArea)).subscribe({
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

  ngOnInit(){       
    this.idArea = String(this.route.snapshot.paramMap.get('id'));
    console.log(this.idArea)

    this.listar()
  }
}

