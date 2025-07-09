import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { EncuestaService } from '../../services/encuesta.service';
import { ResponseEncuestas } from '../../interfaces/ResponseEncuestas';
import { Encuestas } from '../../interfaces/Encuestas';
import Swal from 'sweetalert2';
import  * as functRS  from '../../../assets/js/funcionesrs';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent {

  private encuestaService = inject(EncuestaService);
  public encuestas: Encuestas[] = [];

  listar(){
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


  eliminar(id:any){

    Swal.fire({
      title: '¿Estás seguro de eliminar la encuesta?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.encuestaService.eliminarEncuesta(id).subscribe({
          next: (encuesta) =>{
            console.log(encuesta)

          }, error:(error) =>{
            console.log(error.message); 
          },
          complete: () => {
            console.info("Delete completo");
            Swal.fire('¡Borrado!', 'El registro ha sido eliminado.', 'success');
            console.log(id)
            this.listar()
            
          }
        })
        
      }
    });

    
  }

  ngOnInit(): void {
    //this.cargar_table()
    this.listar()
    functRS.encuestadatatable();
  }  

}
