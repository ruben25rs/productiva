import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamenService } from '../../services/examen.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-resultado',
  templateUrl: './resultado.component.html',
  styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent {

  idIntento?: Number;
  idCurso?: Number;


  private examenService = inject(ExamenService);

  public resultados: any = {}

  constructor(private route: ActivatedRoute, private router:Router, private location: Location) { 
  }


  resultadosI(){
    this.examenService.resultadosI(Number(this.idIntento)).subscribe({
      next: (data) => {
        this.resultados = data;
        console.log(data);
        this.idCurso = data.curso_id
          
      },
      error: (error) => {
        console.error('Error al enviar respuestas:', error);
      }
    });
  }



  ngOnInit(): void {
    this.idIntento = Number(this.route.snapshot.paramMap.get('intentoId'));

    this.resultadosI()

    
  }

}
