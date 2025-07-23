import { Component, inject } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { Encuestas } from '../../interfaces/Encuestas';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent {


  private encuestaService = inject(EncuestaService);
  public encuestas: Encuestas[] = [];


  listar_enc(){
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


  ngOnInit(): void {
    this.listar_enc()
  }

}
