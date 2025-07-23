import { Component, inject } from '@angular/core';
import { QuestionService } from '../../services/question.service';
import { EncuestaService } from '../../services/encuesta.service';
import { Encuestas } from '../../interfaces/Encuestas';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reporte-encuesta',
  templateUrl: './reporte-encuesta.component.html',
  styleUrls: ['./reporte-encuesta.component.css']
})
export class ReporteEncuestaComponent {


  idEncuesta?: number


  private questionService = inject(QuestionService);
  private encuestaService = inject(EncuestaService);
  public encuesta?: Encuestas;


  estadisticas: any = {};
  reporte: any = {};
  loading = true;


  constructor(private route: ActivatedRoute,  private router:Router) { 
  }





  listar(id:number){
    this.questionService.listarQuestionsEnc(id).subscribe({
      next: (data) =>{
        this.encuesta = data['value_enc']

      }, error:(error) =>{
        console.log(error.message); 
      }
    })

  }

  cargarEstadisticas(encuestaId: number): void {
    this.encuestaService.getEstadisticas(encuestaId).subscribe({
      next: (data) => {
        this.estadisticas = data;
        this.loading = false;

        console.log(this.estadisticas)
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }



  ngOnInit(){  
    this.idEncuesta = Number(this.route.snapshot.paramMap.get('id'));
    

    this.listar(this.idEncuesta)
    this.cargarEstadisticas(this.idEncuesta)
  }

}
