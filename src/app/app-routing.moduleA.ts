import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlumnoComponent } from './alumno/alumno.component';
import { InstructorComponent } from './instructor/instructor.component';
import { HomeComponent } from './alumno/home/home.component';
import { CursosComponent } from './alumno/cursos/cursos.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
  {

    path: 'alumno',
    component: AlumnoComponent,
    data: { title: 'Alumno' },
      children: [
        {
          path:'',
          component: HomeComponent
        },
        {
        path:'home',
        component: HomeComponent
        },
         {
        path:'cursos',
        component: CursosComponent
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
          component: HomeComponent
        },
        {
        path:'home',
        component: HomeComponent
        },
        ]
  },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}