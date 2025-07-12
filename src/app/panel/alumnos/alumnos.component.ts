import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { InscripcionService } from '../../services/inscripcion.service';
import { ResponseInscripcion } from '../../interfaces/ResponseInscripcion';
import { CursosService } from '../../services/cursos.service';
import { User } from '../../interfaces/User';
import { Inscripcion } from '../../interfaces/Inscripcion';
import { Cursos } from '../../interfaces/Cursos'; 
import { appsettings } from '../../settings/appsettings';
import  * as functRS  from '../../../assets/js/funcionesrs';

@Component({
  selector: 'app-alumnos',
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {

  private usuariosService = inject(UsuariosService);
  private cursosService = inject(CursosService);
  private inscripcionService = inject(InscripcionService);

  public usuarios: User[] = []

  public cursos: Cursos[] = [];
  public inscripcion: Inscripcion[] = [];
  public user: Array<any> = []
  public baseUrl: string = appsettings.urlImg;
  resultado:any



  editForm=this.formBuilder.group({
    id:[''],
    nombre:['',[Validators.required]],
    apellido_p:['',Validators.required],
    apellido_m:['',Validators.required],
    email:['',Validators.required],
    password:[''],
    telefono:['',Validators.required],
    genero:['',Validators.required],
    fecha_alta:['',Validators.required],
    empresa_id:[''],
  })

  cursoForm=this.formBuilder.group({
    id:[''],
    curso_id:['',[Validators.required]],
    alumno_id:[''],
  })

  constructor(private formBuilder:FormBuilder) { 
  }


  cargar_table(){

    document.addEventListener("DOMContentLoaded", () => {

    });

  }

  listar(){
    this.usuariosService.listaUsersA().subscribe({
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
        this.editForm.controls.empresa_id.setValue(user.value.empresa)

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }
  asignarUser(id:any){
    this.cursoForm.controls.alumno_id.setValue(id)

    this.cursosService.listaCursosAll().subscribe({
      next: (cursosData) =>{

        console.log(cursosData['value'])
        if (cursosData.value.length > 0) {
          this.cursos = cursosData['value']
        }

      }, error:(error) =>{
        console.log(error.message); 
      }
    })


  }

  editarU(id:number){
    this.getUser(id)
  }

  actualizar(){
    if(this.editForm.valid){
      this.usuariosService.editUser(this.editForm.value).subscribe({
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
          this.editForm.controls.empresa_id.setValue(user.value.empresa)

        }, error:(error) =>{
          console.log(error.message); 
        },
        complete: () => {
          console.info("Update completo");
          //this.router.navigateByUrl('/panel');
          //window.location.href="/panel";
          location.reload()
          
          
        }
      })
    }else{
      this.editForm.markAllAsTouched();
    }
  }
  agregarCurso(){
    if(this.cursoForm.valid){
      this.inscripcionService.registrar(this.cursoForm.value as ResponseInscripcion).subscribe({
        next: (cursosData) =>{
          console.log(cursosData)
          

        }, error:(error) =>{
          console.log(error.message); 
        },
        complete: () => {
          console.info("Inscripcion completo");
          //this.router.navigateByUrl('/panel');
          //window.location.href="/panel";
          location.reload()
          
          
        }
      })
    }else{
      this.cursoForm.markAllAsTouched();
    }
  }

  estatus(id:any){
    this.usuariosService.userEstatus(id).subscribe({
      next: (user) =>{
        location.reload()
      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  
  get nombre()
  {
    return this.editForm.controls.nombre;
  }
  get apellido_p()
  {
    return this.editForm.controls.apellido_p;
  }
  get apellido_m()
  {
    return this.editForm.controls.apellido_m;
  }
  get email()
  {
    return this.editForm.controls.email;
  }
  get telefono()
  {
    return this.editForm.controls.telefono;
  }
  get password()
  {
    return this.editForm.controls.password;
  }
  get genero()
  {
    return this.editForm.controls.genero;
  }
  get fecha_alta()
  {
    return this.editForm.controls.fecha_alta;
  }
  get curso_id()
  {
    return this.cursoForm.controls.curso_id;
  }
  

  ngOnInit(): void {
    //this.cargar_table()
    this.listar()
    functRS.hola()
    console.log(functRS.userdatatable())
  }


}
