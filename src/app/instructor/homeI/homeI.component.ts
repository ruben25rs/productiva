import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { appsettings } from '../../settings/appsettings';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';
import { DetalleencuestaService } from '../../services/detalleencuesta.service';
import { ResponseDetalleencuestas } from '../../interfaces/ResponseDetalleencuestas';
import { Encuestas } from '../../interfaces/Encuestas';
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

  idUser: Number = Number(sessionStorage.getItem("id"))

  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  imgForm=this.formBuilder.group({
    id:[this.idUser],
    profile:[null],
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

        }
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

  ngOnInit(): void {

    console.log(this.idUser+"0000")

    this.showUsuer();
    this.listar_enc()

  }
}
