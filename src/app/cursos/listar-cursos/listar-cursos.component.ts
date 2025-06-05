import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: [
    './listar-cursos.component.css',
    '../../../assets/css/nicepage.css'
  ]
})
export class ListarCursosComponent {

  idArea?: number

  constructor(private route: ActivatedRoute) {}

  ngOnInit(){       
    this.idArea = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.idArea)
  }
}
