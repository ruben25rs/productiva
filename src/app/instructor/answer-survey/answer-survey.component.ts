import { Component, inject, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup} from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { EncuestaService } from '../../services/encuesta.service';
import { ResponseQuestions } from '../../interfaces/ResponseQuestions';
import { Questions } from '../../interfaces/Questions';
import { Encuestas } from '../../interfaces/Encuestas';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { minOptionsRequired } from './options.valid';

@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.css']
})
export class AnswerSurveyComponent {

 iddEncuesta?: number

 private questionService = inject(QuestionService);
 private encuestaService = inject(EncuestaService);
 public questions: Questions[] = [];

 public encuesta?: Encuestas;

 userId: Number = Number(sessionStorage.getItem("id"))

 questionForm: FormGroup = this.formBuilder.group({});

 respuestas: { [key: number]: any } = {};
 formularioEnviado = false;


 constructor(private formBuilder:FormBuilder, private route: ActivatedRoute, private cd: ChangeDetectorRef, private router:Router) { 
 }


 listar(id:number){
  this.questionService.listarQuestions(id).subscribe({
    next: (data) =>{
      console.log(data['value'])
      if (data.value.length > 0) {
        this.questions = data['value']
      }
      this.encuesta = data['value_enc']

    }, error:(error) =>{
      console.log(error.message); 
    }
  })

}

trackByPreguntaId(index: number, pregunta: any) {
  return pregunta.id;
}

get question()
{
  return this.questionForm.get('question');
} 
get type()
{
  return this.questionForm.get('type');
} 
get options()
{
  return this.questionForm.get('options');
} 

get opciones(): FormArray {
  return this.questionForm.get('options') as FormArray;
}
get answer_id(): FormArray{
  return this.questionForm.get('answer_id') as FormArray;
}


enviar(){
  this.formularioEnviado = true;

    // Validar todas las preguntas
  const faltantes = this.questions.filter((p) => {
    const r = this.respuestas[p.id];
    if (p.type === 'checkbox') {
      return !r || r.length === 0;
    }
    return !r || r === '';
  });

  if (faltantes.length > 0) {

    return;
  }

    // Transformar respuestas
  const respuestasArray = Object.entries(this.respuestas).map(([pregunta_id, respuesta]) => ({
    pregunta_id: +pregunta_id,
    respuesta
  }));

  console.log('Respuestas listas para enviar:', respuestasArray);
    // Aquí POST a tu API

  this.encuestaService.respuestasEnc(respuestasArray, Number(this.iddEncuesta)).subscribe({
    next: (data) => {

      console.log(data);

    },
    error: (error) => {
      console.error('Error al enviar respuestas:', error);
    },
    complete: () => {
       
      this.router.navigate(['/instructor']);
      
    }
  });
}

onChangeRespuesta(preguntaId: number, valor: any) {
  this.respuestas[preguntaId] = valor;

  console.log(preguntaId+" ---- "+valor)
}

onChangeCheckbox(preguntaId: number, opcion: string, event: Event) {
  if (!this.respuestas[preguntaId]) {
    this.respuestas[preguntaId] = [];
  }
  const checked = (event.target as HTMLInputElement).checked;
  if (checked) {
    this.respuestas[preguntaId].push(opcion);
  } else {
    this.respuestas[preguntaId] = this.respuestas[preguntaId].filter((o: string) => o !== opcion);
  }
  console.log(preguntaId+" ---- "+opcion)

}


ngOnInit(){  
  this.iddEncuesta = Number(this.route.snapshot.paramMap.get('id'));
  
  
  

  this.listar(this.iddEncuesta)
}

}
