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

  private examenService = inject(ExamenService);

  public examen: any = {}
  public respuestas?: any;

  formulario: FormGroup = this.fb.group({});

  respuestasSeleccionadas: { [preguntaId: number]: number } = {};
  errores: { [preguntaId: number]: boolean } = {};

  constructor(private route: ActivatedRoute, private router:Router, private fb:FormBuilder) { 
  }

  enviar() {
    // const preguntas = this.examen['preguntas']

    // // Resetear errores
    // this.errores = {};

    // let todoValido = true;

    // preguntas.forEach((p: Pregunta) => {
    //   if (!this.respuestasSeleccionadas[p.id]) {
    //     this.errores[p.id] = true;
    //     todoValido = false;
    //   }
    // });

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    // Construir arreglo a enviar
    const respuestas = this.examen.preguntas.map((p: any) => ({
      pregunta_id: p.id,
      respuesta_id: this.formulario.get('respuesta_' + p.id)?.value
    }));

    console.log('Enviando respuestas:', respuestas);

    // this.miServicio.enviarRespuestas(respuestas).subscribe(...)
  }

  seleccionarRespuesta(preguntaId: number, respuestaId: number) {
    this.respuestasSeleccionadas[preguntaId] = respuestaId;

    console.log(this.respuestasSeleccionadas)
  }


  listarExamenp(){
    

  }


  ngOnInit(): void {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));

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

    

    console.log(this.idCurso)
    
  }  


}
