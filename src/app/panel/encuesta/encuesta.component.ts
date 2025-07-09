import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { ResponseEncuestas } from '../../interfaces/ResponseEncuestas';
import { Encuestas } from '../../interfaces/Encuestas';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {

  idEncuesta?: number

  private encuestaService = inject(EncuestaService);
  public encuestas: Encuestas[] = [];

  userId: Number = Number(sessionStorage.getItem("id"))

  encForm = this.formBuilder.group({
      id:[''],
      titulo:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      start_date:['',[Validators.required]],
      end_date:['',[Validators.required]],
      user_id:[this.userId]
    })


  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute, private router:Router) { 
  }


  listar(){
    this.encuestaService.listarEncuestas().subscribe({
      next: (data) =>{
        //console.log(data['value'])
        if (data.value.length > 0) {
          this.encuestas = data['value']
        }

      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }

  listar_encuesta(){
    this.encuestaService.listarEncuesta(this.idEncuesta).subscribe({
      next: (data) =>{
        
          console.log(data)

          this.encForm.controls.id.setValue(data.value.id)
          this.encForm.controls.titulo.setValue(data.value.titulo)
          this.encForm.controls.descripcion.setValue(data.value.descripcion)
          this.encForm.controls.start_date.setValue(data.value.start_date)
          this.encForm.controls.end_date.setValue(data.value.end_date)
         
      
      }, error:(error) =>{
        console.log(error.message); 
      }
    })
  }


  actualizar_encuesta(){
    if(this.encForm.valid){
      this.encuestaService.actualizar(this.encForm.value).subscribe({
        next: (encuesta) =>{
          console.log(encuesta)
          

        }, error:(error) =>{
          console.log(error.message); 
        },
        complete: () => {
          console.info("Update completo");
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Encuesta actualizada',
            showConfirmButton: false,
            timer: 3000
          });
          this.router.navigateByUrl('/panel/administrar');
        }
      })
    }else{
      this.encForm.markAllAsTouched();
    }
  }

  registrar_encuesta(){
    if(this.encForm.valid){
      this.encuestaService.registrar(this.encForm.value as ResponseEncuestas).subscribe({
        next: (encuesta) =>{
          //console.log(encuesta)

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

  
  get id()
  {
    return this.encForm.controls.id;
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
   
    this.idEncuesta = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idEncuesta!=0) {
      
      this.listar_encuesta();
    }

    console.log(this.idEncuesta+"existe")
    
  }  
  

}
