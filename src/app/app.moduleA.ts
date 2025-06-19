import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.moduleP';
import { AppComponentP} from './app.componentP';
import { AlumnoComponent } from './alumno/alumno.component';
import { InstructorComponent } from './instructor/instructor.component';
import { HeaderAComponent } from './header-a/header-a.component';


@NgModule({
  declarations: [
    AppComponentP,
    InstructorComponent,
    AlumnoComponent,
    HeaderAComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponentP]
})
export class AppModule { }
