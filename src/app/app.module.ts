import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { CursosComponent } from './cursos/cursos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { FooterComponent } from './footer/footer.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DetallecursoComponent } from './detallecurso/detallecurso.component';
import { ScriptsComponent } from './scripts/scripts.component';

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
    ScriptsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
