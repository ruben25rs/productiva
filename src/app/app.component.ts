import { Component, inject } from '@angular/core';
import { AccesoService } from './services/acceso.service';
import { UsuariosService } from './services/usuarios.service';
import { Usuarios } from './interfaces/Usuarios';
import { Token } from '@angular/compiler';

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
  userData: String = "";
  banderaInvitado:boolean=false;
  tipoUser:number = 0;

  constructor(public accesoService:AccesoService) { 
  }

private usuarioServices = inject(UsuariosService);
public usuario: Usuarios[] = []


  ngOnInit(): void {
    this.accesoService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {

        this.userLoginOn=userLoginOn;

        if (this.userLoginOn==true) {
          this.tipoUser = Number(sessionStorage.getItem("tipoUser"))
        }
        console.log(sessionStorage.getItem("tipoUser")+"uuuu")

/*         this.accesoService.currentUserInfo.subscribe({
          next:(userData) => {
            this.userData=userData;
            console.log("userData--->"+this.userData)
          }
        }); */
        
        
      }
    });


  }
}
