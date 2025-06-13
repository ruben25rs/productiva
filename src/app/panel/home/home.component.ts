import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core'; 

import { AreacursosService } from '../../services/areacursos.service';
import { Areacursos } from '../../interfaces/Areacursos';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';
import { appsettings } from '../../settings/appsettings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  private usuariosService = inject(UsuariosService);
  private areacursosService = inject(AreacursosService);

  public cursos: Areacursos[] = []
  public usuarios: User[] = []
  public baseUrl: string = appsettings.urlImg;

  @ViewChild("users") usertable!: ElementRef;

  cargar_table(){

    document.addEventListener("DOMContentLoaded", () => {
      
    });
 
  }

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