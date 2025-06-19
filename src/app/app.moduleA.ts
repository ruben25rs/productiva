import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModuleA } from './app-routing.moduleA';
import { AppComponentA} from './app.componentA';
import { AlumnoComponent } from './alumno/alumno.component';
import { InstructorComponent } from './instructor/instructor.component';
import { HeaderAComponent } from './header-a/header-a.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponentA,
    InstructorComponent,
    AlumnoComponent,
    HeaderAComponent,
    FooterComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModuleA
  ],
  providers: [],
  bootstrap: [AppComponentA]
})
export class AppModule { }
