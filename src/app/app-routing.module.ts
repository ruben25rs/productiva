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
import { InfocursosComponent } from './cursos/infocursos/infocursos.component';
import { ResultadoComponent } from './alumno/resultado/resultado.component';
import { CertificadoComponent } from './alumno/certificado/certificado.component';
import { PublicGuard } from './guards/public.guard';
import { AuthGuard  } from './guards/auth.guard';



const routes: Routes = [
  //{ path: '',   redirectTo: '/inicio', pathMatch: 'full' },
  {
    path: '', 
    component: InicioComponent,
    canActivate: [PublicGuard],
    data: { title: 'Inicio' }
  },
  {
    path: 'cursos',
    component: CursosComponent,
    canActivate: [PublicGuard],
    data: { title: 'Cursos' }
  },
  {
    path: 'curso/:id',
    component: ListarCursosComponent,
    canActivate: [PublicGuard],
    data: { title: 'Listar Cursos' }
  },
  {
    path: 'infocursos/:id',
    component: InfocursosComponent,
    canActivate: [PublicGuard],
    data: { title: 'Información Cursos' }
    
  },
  {
    path: 'nosotros',
    component: NosotrosComponent,
    canActivate: [PublicGuard],
    data: { title: 'Nosotros' }
  },
  {
    path: 'contacto',
    component: ContactoComponent,
    canActivate: [PublicGuard],
    data: { title: 'Contacto' }
  },
  {
    path:'ingresar',
    component: IngresarComponent,
    canActivate: [PublicGuard],
    data: {title: 'Ingresar'}
  },
  {
    path: 'alumno',
    component: AlumnoComponent,
    canActivateChild: [AuthGuard],
    data: { title: 'Alumno', rol: '3' },
    children: [
      {
        path:'',
        component: HomeAComponent,
        data: { rol: '3'}
      },
      {
        path:'homeA/:id',
        component: HomeAComponent,
        data: { rol: '3'}
      },
      {
        path:'cursosa',
        component: CursosaComponent,
        data: { rol: '3'}
      },
      {
        path: 'area/:id',
        component: AreaComponent,
        data: { rol: '3'}
      },
      {
        path: 'temario/:id',
        component: TemarioComponent,
        data: { rol: '3'}
      },
      {
        path: 'detallecurso/:id',
        component: DetallecursoComponent,
        data: { rol: '3'}
      },
      {
        path: 'recurso/:id',
        component: RecursoComponent,
        data: { rol: '3'}
      },
      {
        path: 'evaluacion/:cursoId/:intentoId',
        component: EvaluacionComponent,
        data: { rol: '3'}
      },
      {
        path: 'resultados/:intentoId',
        component: ResultadoComponent,
        data: { rol: '3'}
      },
      {
        path: 'certificado/:id',
        component: CertificadoComponent,
        data: { rol: '3'}
      },
    ]
  },
  {
    path: 'instructor',
    component: InstructorComponent, 
    canActivateChild: [AuthGuard],
    data: { title: 'Instructor', rol:'2' },
    children: [
      {
        path:'',
        component: HomeIComponent,
        data: { rol: '2'}
      },
      {
        path: 'answer-survey/:id',
        component: AnswerSurveyComponent,
        data: { rol: '2'}
      },
    ]
  },
  {
    path:'panel',
    component: PanelComponent,
    canActivateChild: [AuthGuard],
    data: {title: 'Panel', rol:'1'},
    children: [
      {
        path:'',
        component: HomeComponent,
        data: { rol: '1'}
      },
      {
        path:'capacitador',
        component: CapacitadorComponent,
        data: { rol: '1'}
      },
      {
        path:'alumnos',
        component: AlumnosComponent,
        data: { rol: '1'}
      },
      {
        path:'encuesta',
        component: EncuestaComponent,
        data: { rol: '1'}
      },
      {
        path:'encuesta/:id',
        component: EncuestaComponent,
        data: { rol: '1'}
      },
      {
        path:'ver-encuesta/:id',
        component: VerEncuestaComponent,
        data: { rol: '1'}
      },
      {
        path:'administrar',
        component: AdministrarComponent,
        data: { rol: '1'}
      },
      {
        path:'contacto',
        component: ContactopComponent,
        data: { rol: '1'}
      },
    ]
  },
  {
    path: '**', 
    component: InicioComponent,
    canActivate: [PublicGuard],
  }
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