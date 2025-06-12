import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from '../../interfaces/Cursos';
import { CursosService } from '../../services/cursos.service';
import { appsettings } from '../../settings/appsettings';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: [
    './listar-cursos.component.css',
    '../../../assets/css/nicepage.css'
  ]
})
export class ListarCursosComponent {

  idArea?: number

  private cursosService = inject(CursosService);

  public cursos: Cursos[] = []
  public baseUrl: string = appsettings.urlImg;

  constructor(private route: ActivatedRoute) {}


  listar(){
    this.cursosService.listaCursos("productividad-laboral").subscribe({
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
    this.idArea = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.idArea)

    this.listar()
  }
}
