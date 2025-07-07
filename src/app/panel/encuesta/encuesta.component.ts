import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { ResponseEncuestas } from '../../interfaces/ResponseEncuestas';
import { Encuestas } from '../../interfaces/Encuestas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  private encuestaService = inject(EncuestaService);
  public encuesta: Encuestas[] = [];

  userId: Number = Number(sessionStorage.getItem("id"))


  encForm=this.formBuilder.group({
    titulo:['',[Validators.required]],
    descripcion:['',[Validators.required]],
    start_date:['',[Validators.required]],
    end_date:['',[Validators.required]],
    user_id:[this.userId],
  })

  constructor(private formBuilder:FormBuilder) { 
  }


  listar(){
    this.encuestaService.listarEncuestas().subscribe({
      next: (data) =>{
        console.log(data['value'])
        if (data.value.length > 0) {
          this.encuesta = data['value']
        }

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  registrar_encuesta(){
    if(this.encForm.valid){
      this.encuestaService.registrar(this.encForm.value as ResponseEncuestas).subscribe({
        next: (encuesta) =>{
          console.log(encuesta)

        }, error:(error) =>{
          console.log(error.message); 
        },
        complete: () => {
          console.info("Update completo");
          Swal.fire('¡Hola!', 'Encuesta registrado exitosamente', 'success');

          //this.router.navigateByUrl('/panel');
          //window.location.href="/panel";

          
          
        }
      })
    }else{
      this.encForm.markAllAsTouched();
    }
  }

  
  get titulo()
  {
    return this.encForm.controls.titulo;
  }  
  get descripcion()
  {
    return this.encForm.controls.descripcion;
  }  
  get start_date()
  {
    return this.encForm.controls.start_date;
  }  
  get end_date()
  {
    return this.encForm.controls.end_date;
  }


  ngOnInit(): void {
    //this.cargar_table()
    
  }  
  

}
