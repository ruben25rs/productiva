import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';
import { Recurso } from '../../interfaces/Recurso';
import { Pregunta } from '../../interfaces/Pregunta';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { appsettings } from '../../settings/appsettings';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {

  idCurso?: Number;
  idIntento?: Number;
  idUser: Number = Number(sessionStorage.getItem("id"))

  private examenService = inject(ExamenService);

  public examen: any = {}
  public respuestas?: any;

  formulario: FormGroup = this.fb.group({});

  respuestasSeleccionadas: { [preguntaId: number]: number } = {};
  errores: { [preguntaId: number]: boolean } = {};

  constructor(private route: ActivatedRoute, private router:Router, private fb:FormBuilder) { 
  }

  enviar() {
    // Construir arreglo a enviar
    const respuestas = this.examen.preguntas.map((p: any) => ({
      pregunta_id: p.id,
      respuesta_id: this.formulario.get('respuesta_' + p.id)?.value
    }));
    
    if (this.formulario.valid) {
     

      this.examenService.registrar(respuestas, Number(this.idIntento)).subscribe({
        next: (data) => {
          console.log('Calificación recibida:', data.calificacion);

          
        },
        error: (error) => {
          console.error('Error al enviar respuestas:', error);
        },
        complete: () => {
          window.open('/alumno/resultados/' + this.idIntento, '_blank');
          
          this.router.navigate(['/alumno/homeA/'+this.idUser]);
        }
      });

      

    }else{
      this.formulario.markAllAsTouched();
    }
    console.log('Enviando respuestas:', respuestas);


    
  }

  seleccionarRespuesta(preguntaId: number, respuestaId: number) {
    this.respuestasSeleccionadas[preguntaId] = respuestaId;

    console.log(this.respuestasSeleccionadas)
  }


  listarExamenp(){
    

  }


  ngOnInit(): void {
    this.idCurso = Number(this.route.snapshot.paramMap.get('cursoId'));
    this.idIntento = Number(this.route.snapshot.paramMap.get('intentoId'));

    this.examenService.listarExamen(Number(this.idCurso)).subscribe({
      next: (data) =>{

        this.examen = data
        this.respuestas = this.examen['preguntas']

        // Genera el formulario dinámicamente
        this.examen.preguntas.forEach((p: any) => {
          this.formulario.addControl(
            'respuesta_' + p.id,
            this.fb.control('', Validators.required)
          );
        });
        console.log(data)
        

      }, error:(error) =>{
        console.log(error.message); 
      }
    })

    

    console.log(this.idCurso +"-"+ this.idIntento)
    
  }  


}
