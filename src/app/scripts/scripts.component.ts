import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent {

  userLoginOn:boolean=false;
  banderaInvitado:boolean=true;

  constructor(private accesoService:AccesoService) { 
  }

  activar_class(){

    let elem = document.getElementsByClassName('iniciomn')

    let path = location.pathname

    if(path=="/"){


      elem[0].className ="headermenu iniciomn active-link";

    }else{
      elem[0].className ="headermenu iniciomn initext";
    }

    console.log(path)
  }


  ngOnInit(){       
    this.activar_class();

    this.accesoService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
        console.log(this.userLoginOn)

        if(location.pathname=="/panel"){
          this.banderaInvitado= false
          this.userLoginOn=true
        }
      }
    });
  }
}
