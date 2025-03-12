import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { CursosComponent } from './cursos/cursos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes: Routes = [
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
    path: 'nosotros',
    component: NosotrosComponent,
    data: { title: 'Nosotros' }
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