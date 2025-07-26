import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';
import { EncuestaService } from '../../services/encuesta.service';
import { CursosService } from '../../services/cursos.service';
import { ResponseEncuestas } from '../../interfaces/ResponseEncuestas';
import { DetalleencuestaService } from '../../services/detalleencuesta.service';
import { DetallecursosService } from '../../services/detallecursos.service';
import { ResponseDetalleencuestas } from '../../interfaces/ResponseDetalleencuestas';
import { ResponseInscripcion } from '../../interfaces/ResponseInscripcion';
import { Encuestas } from '../../interfaces/Encuestas';
import { Cursos } from '../../interfaces/Cursos'; 
import { Empresa } from '../../interfaces/Empresa';
import { appsettings } from '../../settings/appsettings';

import  * as functRS  from '../../../assets/js/funcionesrs';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-capacitador',
  templateUrl: './capacitador.component.html',
  styleUrls: ['./capacitador.component.css']
})
export class CapacitadorComponent {

  private usuariosService = inject(UsuariosService);
  private encuestaService = inject(EncuestaService);
  private cursosService = inject(CursosService);
  private detalleencuestaService = inject(DetalleencuestaService);
  private detallecursosService = inject(DetallecursosService);
  
  public encuestas: Encuestas[] = [];
  public cursos: Cursos[] = [];
  public usuarios: User[] = []
  public user: Array<any> = []
  public empresas: Empresa[] = []
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

  detEncForm=this.formBuilder.group({
    id:[''],
    encuesta_id:['',[Validators.required]],
    usuario_id:['']
  })


  cursoForm=this.formBuilder.group({
    id:[''],
    curso_id:['',[Validators.required]],
    user_id:[''],
  })

  constructor(private formBuilder:FormBuilder) { 
  }


  cargar_table(){

    document.addEventListener("DOMContentLoaded", () => {

    });

  }

  listar(){
    this.usuariosService.listaUsersC().subscribe({
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
        this.editForm.controls.empresa_id.setValue(user.value.empresa_id)

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  editarU(id:number){
    this.getUser(id)
  }
  encuestaUser(id:number){
    this.detEncForm.controls.usuario_id.setValue(String(id))
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

  estatus(id:any){
    this.usuariosService.userEstatus(id).subscribe({
      next: (user) =>{
        location.reload()
      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }


  listar_enc(){
    this.encuestaService.listarEncuestas().subscribe({
      next: (data) =>{
        console.log(data['value'])
        if (data.value.length > 0) {
          this.encuestas = data['value']
        }

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  actualizar_enc(){
    if(this.detEncForm.valid){
      this.detalleencuestaService.registrar(this.detEncForm.value as ResponseDetalleencuestas).subscribe({
        next: (detalleEnc) =>{
          console.log(detalleEnc)
          

        }, error:(error) =>{
          console.log(error.messageper); 
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'info',
            title: error.messageper,
            showConfirmButton: false,
            timer: 3500
          });
        },
        complete: () => {
          console.info("Update completo");
          //this.router.navigateByUrl('/panel');
          //window.location.href="/panel";
          $('#encuestamodal').modal('hide');
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Encuesta Agregada',
            showConfirmButton: false,
            timer: 3000
          });
          
          
          
        }
      })
    }else{
      this.detEncForm.markAllAsTouched();
    }
  }

  asignarUser(id:any){
    this.cursoForm.controls.user_id.setValue(id)

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

  agregarCurso(){
    if(this.cursoForm.valid){
      this.detallecursosService.registrar(this.cursoForm.value as ResponseInscripcion).subscribe({
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

  getEmpresas(){
    this.usuariosService.getEmpresas().subscribe({
      next: (data) =>{
        this.empresas = data['value']
        console.log(data)
      }, error:(error) =>{
          //console.log(error.message); 
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
  get encuesta_id()
  {
    return this.detEncForm.controls.encuesta_id;
  }

  get curso_id()
  {
    return this.cursoForm.controls.curso_id;
  }
  

  ngOnInit(): void {
    //this.cargar_table()
    this.getEmpresas()
    this.listar()
    this.listar_enc()
    functRS.hola()
    console.log(functRS.capdatatable())
  }


}
