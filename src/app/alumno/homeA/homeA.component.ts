import { Component, inject } from '@angular/core';

import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './homeA.component.html',
  styleUrls: ['./homeA.component.css']
})
export class HomeAComponent {

previewUrl: string | ArrayBuffer | null = null;
  private usuariosService = inject(UsuariosService);

  public usuarios: User[] = []
  public user: Array<any> = []

   showUsuer(){
    this.usuariosService.showUserProfile(7).subscribe({
     next: (data) =>{

        //console.log(data['value'])
        //console.log(data.value.length)
      if (data.value.length > 0) {
        this.usuarios = data['value']
      }
    }, error:(error) =>{
        //console.log(error.message); 
    }
  })
  }

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }
}

ngOnInit(): void {
    this.showUsuer();
    //this.cargar_table();
  }
  
}
