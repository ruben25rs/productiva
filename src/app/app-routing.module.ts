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
      { enableTracing: false } // <-- debugging purposes only
      )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}