import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  
  userLoginOn:boolean=false;
  banderaInvitado:boolean=false;

  constructor(private accesoService:AccesoService) { 
  }

  ngOnInit(): void {
    this.accesoService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
        //console.log(this.userLoginOn)


      }
    });

    this.banderaInvitado = this.accesoService.banderaPathname


  }


}
