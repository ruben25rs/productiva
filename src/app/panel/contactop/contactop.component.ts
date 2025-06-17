import { Component, inject } from '@angular/core';
import { Contacto } from '../../interfaces/Contacto';
import { contactoService } from '../../services/contacto.service';

@Component({
  selector: 'app-contactop',
  templateUrl: './contactop.component.html',
  styleUrls: ['./contactop.component.css']
})
export class ContactopComponent {
private contactoServices = inject(contactoService);

  public contactos: Contacto[] = []
  
  listarC(){
    this.contactoServices.listaC().subscribe({
     next: (data) =>{
      
      console.log(data['value'])

      if (data.value.length > 0) {
        this.contactos = data['value'].map((user: any) => ({
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
     this.listarC();
  }



}
