import { Component, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { ResponseQuestions } from '../../interfaces/ResponseQuestions';
import { Questions } from '../../interfaces/Questions';
import { Encuestas } from '../../interfaces/Encuestas';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-encuesta',
  templateUrl: './ver-encuesta.component.html',
  styleUrls: ['./ver-encuesta.component.css']
})
export class VerEncuestaComponent {

  idEncuesta?: number

  private questionService = inject(QuestionService);
  public questions: Questions[] = [];
  public encuesta?: Encuestas;

  userId: Number = Number(sessionStorage.getItem("id"))

  questionForm=this.formBuilder.group({
    question:['',[Validators.required]],
    type:['',[Validators.required]],
    options:['',[Validators.required]],
    encuesta_id:[this.userId],
  })

  constructor(private formBuilder:FormBuilder, private route: ActivatedRoute) { 
  }


  listar(id:number){
    this.questionService.listarQuestions(id).subscribe({
      next: (data) =>{
        console.log(data['value'])
        if (data.value.length > 0) {
          this.questions = data['value']
          this.encuesta = data['value_enc']
          console.log(data)
          console.log(this.encuesta.id)
        }

      }, error:(error) =>{
        console.log(error.message); 
      }
    })

  }


  ngOnInit(){       
    this.idEncuesta = Number(this.route.snapshot.paramMap.get('id'));
  

    this.listar(this.idEncuesta)
  }

}
