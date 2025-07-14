import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent {

  idCurso?: Number;

  constructor(private route: ActivatedRoute, private router:Router) { 
  }


  ngOnInit(): void {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));



    console.log(this.idCurso)
    
  }  


}
