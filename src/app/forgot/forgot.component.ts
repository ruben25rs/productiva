import { Component, inject } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormControl } from '@angular/forms';
import { AccesoService } from '../services/acceso.service';
import { Usuarios } from '../interfaces/Usuarios';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
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
    const emailValue: string = this.editForm.get('email')?.value ?? '';
    this.usuarioServices.getDatosLogin(emailValue).subscribe({
      next: (data) => {
        //this.usuario = data;
        console.log('Datos de usuario obtenidos:', data.value.length);
        if (data.value.length > 0) {

            this.usuarioServices.recoverypass((this.editForm.value)).subscribe({
                          next: (data) =>{
                          
                              if (data.value.length > 0) {
                               
                                console.log('Se envio un correo de validacion al correo:', this.email.value);
                                
                                Swal.fire({
                                        title: "Correo enviado",
                                         text: "Se envio un correo de validacion al correo: "+this.email.value,
                                        icon: "success",
                                        draggable: true
                                      });
                                   
                              
                            }
                        }, error:(error) =>{
                          console.log(error.message); 
                        }
                      }) 
          
        }else {
                Swal.fire({
                          toast: true,
                          position: 'top-end',
                          icon: 'error',
                          title: 'No se encontraron datos de usuario para el correo: '+ emailValue,
                          showConfirmButton: false,
                          timer: 3000
                        });
          console.log('No se encontraron datos de usuario para el correo:', emailValue);
        }
        
      },
      error: (error) => {   

        console.error('Error al obtener los datos de login:', error);
      }
    });
               
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
