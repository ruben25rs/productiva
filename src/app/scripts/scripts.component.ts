import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccesoService } from '../services/acceso.service';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent {

  userLoginOn:boolean=false;
  banderaInvitado:boolean=true;

  tipouser: Number = Number(sessionStorage.getItem("tipoUser"))

  constructor(private accesoService:AccesoService, private router:Router) { 
  }

  activar_class(){

    let elem = document.getElementsByClassName('iniciomn')

    let path = location.pathname

    if (this.tipouser==0||this.tipouser==null) {

      if(path=="/"||path=="/inicio"){


        elem[0].className ="headermenu iniciomn active-link";

      }else{
        elem[0].className ="headermenu iniciomn initext";
      }
    }
    if (this.tipouser==3) {
      this.router.navigate(['/alumno/homeA']);
    }
    if (this.tipouser==1) {
      this.router.navigate(['/panel']);
    }

    


    console.log(path)
  }


  ngOnInit(){       
    this.activar_class();

    this.accesoService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
        

        
      }
    });




    
  }
}
