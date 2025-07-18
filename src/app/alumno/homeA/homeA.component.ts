import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { appsettings } from '../../settings/appsettings';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';
import { ActivatedRoute } from '@angular/router';

import { AreacursosService } from '../../services/areacursos.service';
import { Areacursos } from '../../interfaces/Areacursos';

import { Inscripcion } from 'src/app/interfaces/Inscripcion';
import { InscripcionService } from 'src/app/services/inscripcion.service';
import { CInscrito } from 'src/app/interfaces/CInscrito';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './homeA.component.html',
  styleUrls: ['./homeA.component.css']
})

export class HomeAComponent {
/* 
constructor(private route: ActivatedRoute) {} */

  private usuariosService = inject(UsuariosService);
  private inscripcionService = inject(InscripcionService);
  private areacursosService = inject(AreacursosService);
  public cursos: Areacursos[] = []
  public usuarios: User[] = []
  public user: Array<any> = []
  public Inscripcion: Inscripcion[] = [];
  public cInscrito: CInscrito[] = [];

  public baseUrl: string = appsettings.urlImg;
  public  id:number =1; 
  public rutatemp : string="";


  public cursostotal : any = {};


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


  idUser: Number = Number(sessionStorage.getItem("id"))

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  imgForm=this.formBuilder.group({
    id:[this.idUser],
    profile:[null],
  })

  constructor(private formBuilder:FormBuilder) { 

  }


  showUsuer(){
    this.usuariosService.showUserProfile(this.idUser).subscribe({
      next: (data) =>{
        this.rutatemp = this.baseUrl + data['value'][0].profile;
        
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
  
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imgForm.patchValue({ profile: file });

    }
  }


  cursoxalumno(){ 

    this.inscripcionService.cursosxalumno(this.idUser).subscribe({
      next: (cursosinscritos) =>{  

        this.cInscrito = cursosinscritos['value']
        this.cursostotal = cursosinscritos['value_totales']

        console.info(cursosinscritos);

      }, error:(error) =>{
        console.log(error.message);   
      }
    })
  }

  
  subirimagen(){

    const formData = new FormData();
    formData.append('id', String(this.idUser));
    formData.append('profile', this.selectedFile!);

    this.usuariosService.subirImage(formData).subscribe({
      next: (user) =>{
        console.log(user)


      }, error:(error) =>{
        console.log(error.message); 
      },
      complete: () => {
        console.info("Update completo");

        this.showUsuer();

      }
    })
  }

  eliminarcurso_alumno(idinscripcion:any){

    Swal.fire({
      title: '¿Estás seguro de eliminar el curso?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscripcionService.eliminarInscripcion(idinscripcion).subscribe({
          next: (encuesta) =>{
            
          }, error:(error) =>{
          },
          complete: () => {
            this.cursoxalumno();
          }
        })
        
      }
    });

  }
  

  ngOnInit(): void {

    console.log(this.idUser)

    this.showUsuer();
    this.cursoxalumno();
    //this.guardarsesionInicio()

  }
  
}
