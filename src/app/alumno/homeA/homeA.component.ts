import { Component, inject  } from '@angular/core';
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

constructor(private route: ActivatedRoute) {}

  private usuariosService = inject(UsuariosService);

  public usuarios: User[] = []
  public user: Array<any> = []
  public baseUrl: string = appsettings.urlImg;
   public  id:number =1; 
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;


   showUsuer(){
    this.usuariosService.showUserProfile(this.id).subscribe({
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
    this.selectedFile = file;

    // Vista previa (opcional)
    const reader = new FileReader();
    reader.onload = () => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }
}

  uploadImage() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    this.usuariosService.uploadImage(formData).subscribe({
      next: (res) => console.log('Imagen subida', res),
      error: (err) => console.error('Error al subir imagen', err)
    });
  }
  obtenerparametro() {
      this.route.params.subscribe(params => {
      this.id=params['id'];
          console.log('ID recibido:', this.id);
        });
  }
 
ngOnInit(): void {
    this.obtenerparametro();
    this.showUsuer();

    //this.cargar_table();
  }
  
}
