import { Component, inject, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup} from '@angular/forms';
import { QuestionService } from '../../services/question.service';
import { ResponseQuestions } from '../../interfaces/ResponseQuestions';
import { Questions } from '../../interfaces/Questions';
import { Encuestas } from '../../interfaces/Encuestas';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { minOptionsRequired } from './options.valid';

declare var $: any;


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


  
  questionForm!: FormGroup;


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
  agregar_preg(){
    if(this.questionForm.valid){
      this.questionService.registrar(this.questionForm.value as ResponseQuestions).subscribe({
        next: (questionData) =>{
          console.log(questionData)

        }, error:(error) =>{
          console.log(error.message); 
        },
        complete: () => {
          console.info("Registro completo");
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Pregunta Agregada',
            showConfirmButton: false,
            timer: 3000
          });
          this.listar(Number(this.idEncuesta))
          this.questionForm.reset()
          this.opciones.clear()
          this.cerrarModal()
        }
      })
    }else{
      this.questionForm.markAllAsTouched();
    }
  }
  actualizar_preg(){
    if(this.questionForm.valid){
      this.questionService.actualizar(this.questionForm.value as ResponseQuestions).subscribe({
        next: (questionData) =>{
          console.log(questionData)

        }, error:(error) =>{
          console.log(error.message); 
        },
        complete: () => {
          console.info("Actualizacion completo");
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Pregunta actualizada',
            showConfirmButton: false,
            timer: 3000
          });
          this.listar(Number(this.idEncuesta))
          this.questionForm.reset()
          this.opciones.clear()
          $('#pregunta_edit').modal('hide');
        }
      })
    }else{
      this.questionForm.markAllAsTouched();
    }
  }
  eliminar_preg(id:any){
    Swal.fire({
      title: '¿Estás seguro de eliminar la pregunta?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.eliminarQuestion(id).subscribe({
          next: (questionData) =>{
            console.log(questionData)

          }, error:(error) =>{
            console.log(error.message); 
          },
          complete: () => {
            console.info("Delete completo");
            Swal.fire('¡Borrado!', 'El registro ha sido eliminado.', 'success');
            console.log(id)
            this.listar(Number(this.idEncuesta))
            
          }
        })
        
      }
    });
  }
  mostrar_preg(id:any){
    this.questionService.listarQuestion(id).subscribe({
      next: (questionData) =>{
        console.log(questionData)
        this.questionForm.get('id')?.setValue(questionData.value.id);
        this.questionForm.get('question')?.setValue(questionData.value.question);
        this.questionForm.get('type')?.setValue(questionData.value.type);

        this.opciones.clear(); // Limpia cualquier opción anterior

        questionData.value.options.forEach((op: string) => {
          this.opciones.push(this.formBuilder.control(op, Validators.required));
        });

          
      }, error:(error) =>{
        console.log(error.message); 
      },
      complete: () => {
        

      }
    })
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

  esConOpciones(): boolean {
    const tipo = this.questionForm.get('type')?.value;
    return tipo === 'radio' || tipo === 'checkbox';
  }

  agregarOpcion() {
    this.opciones.push(this.formBuilder.control('', Validators.required));
    this.cd.detectChanges();
  }

  eliminarOpcion(index: number) {
    this.opciones.removeAt(index);
    this.cd.detectChanges();
  }

  cerrarModal() {
    $('#pregunta').modal('hide');
  }


  ngOnInit(){  
    this.idEncuesta = Number(this.route.snapshot.paramMap.get('id'));
    this.questionForm=this.formBuilder.group({
      id:[''],
      question:['',[Validators.required]],
      type:['',[Validators.required]],
      options: this.formBuilder.array([],minOptionsRequired(() => this.questionForm?.get('type')?.value)),
      encuesta_id:[this.idEncuesta],
    })     

    // Cuando cambia el tipo, limpiamos o revalidamos
    this.questionForm.get('type')?.valueChanges.subscribe(() => {
      const tipo = this.questionForm.get('type')?.value;

      if (tipo === 'radio' || tipo === 'checkbox') {
        if (this.opciones.length === 0) this.agregarOpcion();
      } else {
        this.opciones.clear();
      }

      this.opciones.updateValueAndValidity();
    });

    this.listar(this.idEncuesta)
  }

}
