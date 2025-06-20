import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { Contacto } from '../interfaces/Contacto';
import { contactoService } from './../services/contacto.service';
import { ResponseContacto } from '../interfaces/ResponseContacto';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {

  private contactoService = inject(contactoService);

  regForm=this.formBuilder.group({
    nombre:['',[Validators.required]],
    apellidos:['',Validators.required],
    email:['',[Validators.required,Validators.email]],
    telefono:['',Validators.required],
  })

  constructor(private formBuilder:FormBuilder) { 
  }

  register(){
      if(this.regForm.valid){
        this.contactoService.register(this.regForm.value as ResponseContacto).subscribe({
          next: (userData) => {
            console.log(userData);
          },
          error: (errorData) => {
            console.error(errorData);
            alert(errorData)
          },
          complete: () => {
            console.info("Register completo");
            //this.router.navigateByUrl('/panel');
            //window.location.href="/panel";
            this.regForm.reset();
          }
        })
      }else{
        this.regForm.markAllAsTouched();
        console.log("error registerform")
      }
    }
  get nombre()
  {
    return this.regForm.controls.nombre;
  }
  get apellidos()
  {
    return this.regForm.controls.apellidos;
  }
  get email()
  {
    return this.regForm.controls.email;
  }
  get telefono()
  {
    return this.regForm.controls.telefono;
  }
  
  

}

