import { Component, inject } from '@angular/core';
import { appsettings } from '../../settings/appsettings';
import { Usuarios } from '../../interfaces/Usuarios';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-capacitador',
  templateUrl: './capacitador.component.html',
  styleUrls: ['./capacitador.component.css']
})
export class CapacitadorComponent {

  //listar usuarios maestros
  private usuarioServices = inject(UsuariosService);

  public usuario: Usuarios[] = []
  
  listarU(){
    this.usuarioServices.listaU().subscribe({
     next: (data) =>{
      
      console.log(data['value'])

      if (data.value.length > 0) {
        this.usuario = data['value'].map((user: any) => ({
          ...user,
          profile: user.profile ?? '' // Asigna un valor por defecto si falta
        }))
      }
      

    }, error:(error) =>{
      console.log(error.message); 
    }
  })

  }

  ngOnInit(){       
     this.listarU();
  }

}
