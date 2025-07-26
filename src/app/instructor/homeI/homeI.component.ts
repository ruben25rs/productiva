import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { appsettings } from '../../settings/appsettings';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';
import { DetalleencuestaService } from '../../services/detalleencuesta.service';
import { ResponseDetalleencuestas } from '../../interfaces/ResponseDetalleencuestas';
import { Encuestas } from '../../interfaces/Encuestas';
import { Empresa } from '../../interfaces/Empresa';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './homeI.component.html',
  styleUrls: ['./homeI.component.css']
})
export class HomeIComponent {

  private usuariosService = inject(UsuariosService);

  private detalleencuestaService = inject(DetalleencuestaService);
  
  public encuestas: Encuestas[] = [];

  public baseUrl: string = appsettings.urlImg;
  public rutatemp : string="";
  public usuarios: User[] = []
  public empresas: Empresa[] = []

  idUser: Number = Number(sessionStorage.getItem("id"))

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  imgForm=this.formBuilder.group({
    id:[this.idUser],
    profile:[null],
  })

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

  constructor(private formBuilder:FormBuilder) { 

  }

  listar_enc(){
    this.detalleencuestaService.listarEncuesta(this.idUser).subscribe({
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


  showUsuer(){
    this.usuariosService.showUserProfile(this.idUser).subscribe({
      next: (data) =>{
        this.rutatemp = this.baseUrl + data['value'][0].profile;
        
        if (data.value.length > 0) {
          this.usuarios = data['value']
          console.log(this.usuarios[0].id)
          this.editForm.controls.id.setValue(String(this.usuarios[0].id))
          this.editForm.controls.nombre.setValue(String(this.usuarios[0].nombre))
          this.editForm.controls.apellido_p.setValue(String(this.usuarios[0].apellido_p))
          this.editForm.controls.apellido_m.setValue(String(this.usuarios[0].apellido_m))
          this.editForm.controls.email.setValue(String(this.usuarios[0].email))
          this.editForm.controls.telefono.setValue(String(this.usuarios[0].telefono))
          this.editForm.controls.genero.setValue(String(this.usuarios[0].genero))
          this.editForm.controls.fecha_alta.setValue(String(this.usuarios[0].fecha_alta))
          this.editForm.controls.empresa_id.setValue(String(this.usuarios[0].empresa_id))

        }
      }, error:(error) =>{
          //console.log(error.message); 
      }
    })
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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imgForm.patchValue({ profile: file });

    }
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

  ngOnInit(): void {

    console.log(this.idUser+"0000")
    this.getEmpresas();
    this.showUsuer();
    this.listar_enc()

  }
}
