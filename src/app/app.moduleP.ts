import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.moduleP';
import { AppComponentP} from './app.componentP';
import { HeaderPComponent } from './header-p/header-p.component';
import { FooterComponentP } from './footerP/footerP.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  declarations: [
    AppComponentP,
    PanelComponent,
    HeaderPComponent,
    FooterComponentP
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponentP]
})
export class AppModule { }
