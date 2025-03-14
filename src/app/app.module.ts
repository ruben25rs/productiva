import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { CursosComponent } from './cursos/cursos.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { FooterComponent } from './footer/footer.component';
<<<<<<< HEAD
import { IngresarComponent } from './ingresar/ingresar.component';
=======
import { ContactoComponent } from './contacto/contacto.component';

>>>>>>> origin/master
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    HeaderComponent,
    CursosComponent,
    NosotrosComponent,
    FooterComponent,
<<<<<<< HEAD
    IngresarComponent
=======
    ContactoComponent
>>>>>>> origin/master
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
