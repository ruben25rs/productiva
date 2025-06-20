import { Component } from '@angular/core';
import { AccesoService } from './services/acceso.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
  title = 'productiva';

  userLoginOn:boolean=false;
  banderaInvitado:boolean=false;
  banderaAlumno:boolean=true;

  constructor(public accesoService:AccesoService) { 
  }

  ngOnInit(): void {
    this.accesoService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
        console.log(this.userLoginOn)
      }
    });


    this.banderaInvitado=this.accesoService.banderaPathname
    //this.banderaAlumno=this.accesoService.banderaAlumnoPathname;

  }
}
