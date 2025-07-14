import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DetalleencuestaService } from '../../services/detalleencuesta.service';
import { Encuestas } from '../../interfaces/Encuestas';
import { appsettings } from '../../settings/appsettings';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.css']
})
export class AnswerSurveyComponent {
    public idencuesta: string = '';
    private detalleencuestaService = inject(DetalleencuestaService);
    public encuestas: Encuestas[] = [];
    public baseUrl: string = appsettings.urlImg;

    public title: string = '';
    public description: string = '';
    public start_date: string = '';
    public end_date: string = '';
    public questions: any[] = [];
    public answers: any[] = [];

   constructor(private route: ActivatedRoute, private router: Router) {
  }

      listar_enc(){
          this.detalleencuestaService.listarEncuesta(this.idencuesta).subscribe({
            next: (data) =>{
              //console.log(data['value'])
              if (data.value.length > 0) {
                this.title = data['value'][0].titulo;
                this.description = data['value'][0].descripcion;
                this.start_date = data['value'][0].fecha_inicio;
                this.end_date = data['value'][0].fecha_fin;
              }

            }, error:(error) =>{
              console.log(error.message); 
            }
          })
        }

   ngOnInit(){       
    this.idencuesta = String(this.route.snapshot.paramMap.get('id'));
    console.log("Id encuesta es-:"+this.idencuesta)

    
  }
}
