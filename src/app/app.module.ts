import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import * as $ from 'jquery';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { CursosComponent } from './cursos/cursos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { FooterComponent } from './footer/footer.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ScriptsComponent } from './scripts/scripts.component';
import { HeaderPComponent } from './header-p/header-p.component';
import { PanelComponent } from './panel/panel.component';
import { HomeComponent } from './panel/home/home.component';
import { UsuariosComponent } from './panel/usuarios/usuarios.component';
import { AlumnosComponent } from './panel/alumnos/alumnos.component';
import { EncuestaComponent } from './panel/encuesta/encuesta.component';
import { AdministrarComponent } from './panel/administrar/administrar.component';
import { ContactopComponent } from './panel/contactop/contactop.component';
import { CapacitadorComponent } from './panel/capacitador/capacitador.component';
import { ListarCursosComponent } from './cursos/listar-cursos/listar-cursos.component';

import { AlumnoComponent } from './alumno/alumno.component';
import { HomeAComponent } from './alumno/homeA/homeA.component';
import { HeaderAComponent } from './header-a/header-a.component';
import { DetallecursoComponent } from './alumno/detallecurso/detallecurso.component';
import { InstructorComponent } from './instructor/instructor.component';
import { CursosaComponent } from './alumno/cursosa/cursosa.component';
import { HomeIComponent } from './instructor/homeI/homeI.component';
import { VerEncuestaComponent } from './panel/ver-encuesta/ver-encuesta.component';
import { AreaComponent } from './alumno/area/area.component';
import { TemarioComponent } from './alumno/temario/temario.component';
import { HeaderIComponent } from './header-i/header-i.component';

import { AnswerSurveyComponent } from './instructor/answer-survey/answer-survey.component';

import { RecursoComponent } from './alumno/recurso/recurso.component';
import { EvaluacionComponent } from './alumno/evaluacion/evaluacion.component';
<<<<<<< HEAD
import { InfocursosComponent } from './cursos/infocursos/infocursos.component';
=======
import { ResultadoComponent } from './alumno/resultado/resultado.component';
>>>>>>> origin/master


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    CursosComponent,
    NosotrosComponent,
    FooterComponent,
    IngresarComponent,
    ContactoComponent,
    DetallecursoComponent,
    ScriptsComponent,
    HeaderPComponent,
    PanelComponent,
    HomeComponent,
    UsuariosComponent,
    AlumnosComponent,
    EncuestaComponent,
    AdministrarComponent,
    ContactopComponent,
    CapacitadorComponent,
    ListarCursosComponent,
    AlumnoComponent,
    HomeAComponent,
    CursosaComponent,
    HeaderAComponent,
    InstructorComponent,
    HomeIComponent,
    VerEncuestaComponent,
    AreaComponent,
    TemarioComponent,
    HeaderIComponent,
    AnswerSurveyComponent,
    RecursoComponent,
    EvaluacionComponent,
<<<<<<< HEAD
    InfocursosComponent,
=======
    ResultadoComponent,
>>>>>>> origin/master
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
