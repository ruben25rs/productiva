import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CursosComponent } from './cursos/cursos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { PanelComponent } from './panel/panel.component';
import { HomeComponent } from './panel/home/home.component';
import { AlumnosComponent } from './panel/alumnos/alumnos.component';
import { EncuestaComponent } from './panel/encuesta/encuesta.component';
import { AdministrarComponent } from './panel/administrar/administrar.component';
import { ContactopComponent } from './panel/contactop/contactop.component';
import { CapacitadorComponent } from './panel/capacitador/capacitador.component';
import { ListarCursosComponent } from './cursos/listar-cursos/listar-cursos.component';

import { AlumnoComponent } from './alumno/alumno.component';
import { HomeAComponent } from './alumno/homeA/homeA.component';
import { CursosaComponent } from './alumno/cursosa/cursosa.component';
import { HomeIComponent } from './instructor/homeI/homeI.component';
import { InstructorComponent } from './instructor/instructor.component';
import { VerEncuestaComponent } from './panel/ver-encuesta/ver-encuesta.component';
import { AreaComponent } from './alumno/area/area.component';
import { TemarioComponent } from './alumno/temario/temario.component';
import { AnswerSurveyComponent } from './instructor/answer-survey/answer-survey.component';
import { DetallecursoComponent } from './alumno/detallecurso/detallecurso.component';
import { RecursoComponent } from './alumno/recurso/recurso.component';
import { EvaluacionComponent } from './alumno/evaluacion/evaluacion.component';
<<<<<<< HEAD
import { InfocursosComponent } from './cursos/infocursos/infocursos.component';
=======
import { ResultadoComponent } from './alumno/resultado/resultado.component';
>>>>>>> origin/master


const routes: Routes = [
  //{ path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: '', 
    component: InicioComponent,
    data: { title: 'Inicio' }
  },
  {
    path: 'cursos',
    component: CursosComponent,
    data: { title: 'Cursos' }
  },
  {
    path: 'curso/:id',
    component: ListarCursosComponent,
    data: { title: 'Listar Cursos' }
  },
  {
     path: 'infocursos/:id/nombrearea',
    component: InfocursosComponent,
    data: { title: 'Información Cursos' }
    
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
    data: { title: 'Nosotros' }
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    data: { title: 'Contacto' }
  },
  {
    path:'ingresar',
    component: IngresarComponent,
    data: {title: 'Ingresar'}
  },
  {
    path: 'alumno',
    component: AlumnoComponent,
    data: { title: 'Alumno' },
    children: [
      {
        path:'',
        component: HomeAComponent
      },
      {
        path:'homeA/:id',
        component: HomeAComponent
      },
      {
        path:'cursosa',
        component: CursosaComponent
      },
      {
        path: 'area/:id',
        component: AreaComponent,
      },
      {
        path: 'temario/:id',
        component: TemarioComponent,
      },
      {
        path: 'detallecurso/:id',
        component: DetallecursoComponent,
      },
      {
        path: 'recurso/:id',
        component: RecursoComponent,
      },
      {
        path: 'evaluacion/:cursoId/:intentoId',
        component: EvaluacionComponent,
      },
      {
        path: 'resultados/:intentoId',
        component: ResultadoComponent,
      },
    ]
  },
  {
    path: 'instructor',
    component: InstructorComponent, 
    data: { title: 'Instructor' },
    children: [
      {
        path:'',
        component: HomeIComponent
      },
      {
        path: 'answer-survey/:id',
        component: AnswerSurveyComponent
      },
    ]
  },
  {
    path:'panel',
    component: PanelComponent,
    data: {title: 'Panel'},
    children: [
      {
        path:'',
        component: HomeComponent
      },
      {
        path:'capacitador',
        component: CapacitadorComponent
      },
      {
        path:'alumnos',
        component: AlumnosComponent
      },
      {
        path:'encuesta',
        component: EncuestaComponent
      },
      {
        path:'encuesta/:id',
        component: EncuestaComponent
      },
      {
        path:'ver-encuesta/:id',
        component: VerEncuestaComponent
      },
      {
        path:'administrar',
        component: AdministrarComponent
      },
      {
        path:'contacto',
        component: ContactopComponent
      },
    ]
  },
  {
    path: '**', 
  component: InicioComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { 
        enableTracing: false,
        onSameUrlNavigation: 'reload' } // <-- debugging purposes only
        )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}