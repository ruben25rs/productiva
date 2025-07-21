import { Component, inject } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormControl } from '@angular/forms';
import { AccesoService } from '../services/acceso.service';
import { Usuarios } from '../interfaces/Usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent {
 private accesoService = inject(AccesoService);
  private usuarioServices = inject(UsuariosService);
  public usuario: Usuarios[] = []
  miEmail: string = '';

  



  clickme() {
    alert('¡Función clickme() llamada!');

              this.usuarioServices.getDatosLogin(String(this.miEmail.valueOf)).subscribe({
            next: (data) =>{
             
            //console.log(data['value'][0].tipousuario_id);
             
              if (data.value.length > 0) {
               
              
            }
          }, error:(error) =>{
            console.log(error.message); 
          }
        })
  }
}
