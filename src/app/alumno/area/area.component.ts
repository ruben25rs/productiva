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

    public totalcursos: number = 0;
    public nombrearea: string = '';
     public idarea: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {


  }


  listar(){
    this.cursosService.listaCursos(String(this.idArea)).subscribe({
      next: (data) =>{

        console.log(data['value'])
        if (data.value.length > 0) {
         this.cursos = data['value']
            this.nombrearea = data['value'][0].areacurso_nombre;
        }
        

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }
  chunk(arr: any[], size: number): any[] {
    const chunked_arr = [];
    for (let i = 0; i < arr.length; i++) {
      const last = chunked_arr[chunked_arr.length - 1];
      if (!last || last.length === size) {
        chunked_arr.push([arr[i]]);
      } else {
        last.push(arr[i]);
      }
    }
    return chunked_arr;
  }


  ngOnInit(){       
    this.idArea = String(this.route.snapshot.paramMap.get('id'));
    console.log(this.idArea)

    this.listar()
  }
}

