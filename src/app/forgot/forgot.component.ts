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
  email = new FormControl('');
editForm=this.formBuilder.group({
    email:['',Validators.required]
  })
 constructor(private formBuilder:FormBuilder) { 
  }


  clickme() {
 

              this.usuarioServices.recoverypass((this.editForm.value)).subscribe({
              next: (data) =>{
              
                  //console.log(data['value'][0].tipousuario_id);
              
                  if (data.value.length > 0) {
                     console.log('Se envio un correo de validacion al corre:', this.email.value);
                  
                }
            }, error:(error) =>{
              console.log(error.message); 
            }
          })
  } 

  // onSubmit() {
  //   this.enviado = true;

  //   if (this.form.invalid) return;

  //   const email = this.form.value.email;

  //   this.usuarioServices.recoverypass(email).subscribe({
  //     next: () => this.mensaje = 'Se ha enviado un enlace de recuperación a tu correo.',
  //     error: () => this.mensaje = 'Error al enviar el enlace. Intenta más tarde.'
  //   });
  // }
}
