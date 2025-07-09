
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


  public totalinscritos : number = 0;
  public totalterminados: number = 0;
  public totalmodulos: number = 0;
  public totalrecursos: number = 0;


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

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.imgForm.patchValue({ profile: file });
       
    }
  }

inscritosCurso(){

  this.areacursosService.listaC().subscribe({
     next: (data) =>{
      
      for (let i = 1; i < data.value.length; i++) {

       this.inscripcionService.inscritosCurso(data['value'][i].id, this.idUser).subscribe({
        next: (inscritos) =>{
              
          //this.Inscripcion = inscritos['value']
          this.totalmodulos= inscritos['value'].length;

         
        }, error:(error) =>{
          console.log(error.message); 
        }
      })
     
      
       this.inscripcionService.inscritosRecursos(data['value'][i].id, this.idUser).subscribe({
        next: (terminados) =>{  
          
          this.totalrecursos = terminados['value'].length;
         // console.log("total RECURSOS.."+this.totalrecursos)
        }
        , error:(error) =>{
          console.log(error.message); 
        } 
      })

    }//final for

      if (this.totalmodulos== this.totalrecursos) {
        this.totalterminados = this.totalterminados + 1;
    
      }
      //Final  CURSOS
    }, error:(error) =>{
      console.log(error.message); 
    }
  })
  


}
cursoxalumno(){ 
 
  this.inscripcionService.cursosxalumno(this.idUser).subscribe({
    next: (cursosinscritos) =>{  
       this.totalinscritos = this.totalinscritos +1
      this.cInscrito = cursosinscritos['value']

     console.info("Cursos inscritos: " + cursosinscritos['value']);

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
 /*  obtenerparametro() {
      this.route.params.subscribe(params => {
      this.id=params['id'];
          console.log('ID recibido:', this.id);
        });
  } */
 
ngOnInit(): void {
   
    this.showUsuer();
    this.inscritosCurso()
    this.cursoxalumno();
 
  }
  
}
