
import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { appsettings } from '../../settings/appsettings';
import { UsuariosService } from '../../services/usuarios.service';
import { User } from '../../interfaces/User';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './homeA.component.html',
  styleUrls: ['./homeA.component.css']
})

export class HomeAComponent {
/* 
constructor(private route: ActivatedRoute) {} */

  private usuariosService = inject(UsuariosService);

  public usuarios: User[] = []
  public user: Array<any> = []
  public baseUrl: string = appsettings.urlImg;
  public  id:number =1; 


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

        console.log("original-->"+data['value'])
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
          console.log("rs-->"+user)
          

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
 /*  obtenerparametro() {
      this.route.params.subscribe(params => {
      this.id=params['id'];
          console.log('ID recibido:', this.id);
        });
  } */
 
ngOnInit(): void {
    //this.obtenerparametro();
    this.showUsuer();

    //this.cargar_table();
  }
  
}
