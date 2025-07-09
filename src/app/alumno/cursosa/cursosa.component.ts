import { Component, inject } from '@angular/core';
import { AreacursosService } from '../../services/areacursos.service';
import { Areacursos } from '../../interfaces/Areacursos';
import { AccesoService } from '../../services/acceso.service';
import { appsettings } from '../../settings/appsettings';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursosa.component.html',
  styleUrls: ['./cursosa.component.css']
})
export class CursosaComponent {
    private areacursosService = inject(AreacursosService);
    public cursos: Areacursos[] = []
    public baseUrl: string = appsettings.urlImg;
  
     imgOver(img:any, urlimg: any){
      img.target.src = this.baseUrl+"img/imgareacursos/"+urlimg
      }
    imgOverOut(img:any, urlimg: any){
      img.target.src = this.baseUrl+"img/imgareacursos/"+urlimg
    }

     listar(){
    this.areacursosService.listaC().subscribe({
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
    this.listar();
  }



}
