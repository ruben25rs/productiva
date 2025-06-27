import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { appsettings } from '../../settings/appsettings';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-home',
  templateUrl: './homeA.component.html',
  styleUrls: ['./homeA.component.css']
})
export class HomeAComponent {

  private usuariosService = inject(UsuariosService);

  public usuarios: User[] = []
  public user: Array<any> = []
  public baseUrl: string = appsettings.urlImg;

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
          //this.router.navigateByUrl('/panel');
          //window.location.href="/panel";
         
          
          
        }
      })
  }

 
ngOnInit(): void {
    this.showUsuer();
    //this.cargar_table();
  }
  
}
