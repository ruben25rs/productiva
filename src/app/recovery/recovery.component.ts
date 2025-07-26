import { Component, inject } from '@angular/core';
import { UsuariosService } from '../services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  token?: string | null;
  private usuarioServices = inject(UsuariosService);

editForm=this.formBuilder.group({
    token:[''],
    email:['',Validators.required],
    password:['', Validators.required],
    password_confirmation:['',Validators.required]
  })
  
   constructor(private route: ActivatedRoute, private router:Router,private formBuilder:FormBuilder) { 
    
    }

actualizarPass() {
const datosParaGuardar = this.editForm.value;
  
       this.usuarioServices.changepass(this.editForm.value).subscribe({
                    next: (data) =>{
                      Swal.fire({
                                  title: "Contraseña Actualizada",
                                    text: "Se actualizo correctamente",
                                  icon: "success",
                                  draggable: true
                                });
                               
                               this.router.navigateByUrl('/ingresar'); 
                                
                      
                    }, error:(error) =>{
                        console.log(error.message); 
                    }
      })  
                              

}


    ngOnInit(): void {
    //this.cargar_table()
    this.token = this.route.snapshot.paramMap.get('token');
    
  this.editForm.controls.token.setValue(this.token)
    
  }  
}
