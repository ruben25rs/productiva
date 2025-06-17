import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.moduleP';
import { AppComponent} from './app.componentP';
import { HeaderPComponent } from './header-p/header-p.component';
import { FooterComponentP } from './footerP/footerP.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    HeaderPComponent,
    FooterComponentP
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
