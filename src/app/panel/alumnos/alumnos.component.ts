import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';
import { appsettings } from '../../settings/appsettings';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  private usuariosService = inject(UsuariosService);

  public usuarios: User[] = []
  public user: Array<any> = []
  public baseUrl: string = appsettings.urlImg;

  editForm=this.formBuilder.group({
    id:[''],
    nombre:['',[Validators.required]],
    apellido_p:['',Validators.required],
    apellido_m:['',Validators.required],
    email:['',Validators.required],
    password:['',Validators.required],
    telefono:['',Validators.required],
    genero:['',Validators.required],
    fecha_alta:['',Validators.required],
    empresa:['',Validators.required],
  })

  constructor(private formBuilder:FormBuilder) { 
  }


  cargar_table(){

    document.addEventListener("DOMContentLoaded", () => {
      
    });
 
  }

  listar(){
    this.usuariosService.listaUsers().subscribe({
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

  getUser(id:number){
    this.usuariosService.getUsers(id).subscribe({
       next: (user) =>{
        console.log(user)
        this.editForm.controls.id.setValue(user.value.id)
        this.editForm.controls.nombre.setValue(user.value.nombre)
        this.editForm.controls.apellido_p.setValue(user.value.apellido_p)
        this.editForm.controls.apellido_m.setValue(user.value.apellido_m)
        this.editForm.controls.email.setValue(user.value.email)
        this.editForm.controls.telefono.setValue(user.value.telefono)
        this.editForm.controls.genero.setValue(user.value.genero.toString())
        this.editForm.controls.fecha_alta.setValue(user.value.fecha_alta)
        this.editForm.controls.empresa.setValue(user.value.empresa)
        
      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  editarU(id:number){
    this.getUser(id)
  }
  

  ngOnInit(): void {
    //this.cargar_table()
    this.listar()
  }
}
