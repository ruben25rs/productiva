import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { User } from '../interfaces/User';
import { AccesoService } from '../services/acceso.service';

import { UsuariosService } from './../services/usuarios.service';
@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.css']
})
export class HeaderAComponent {

  currentUrl: string = '';
  public user: Array<any> = []
  userLoginOn:boolean=false;

  idUser: Number = Number(sessionStorage.getItem("id"))
  //listar usuarios maestros
private usuarioServices = inject(UsuariosService);
  constructor(private router: Router, public accesoService:AccesoService) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }


  guardarsesionFinal(){
     
       const date = new Date();
       const formattedDate:string = date.toString();
      let fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US')
       console.log("sesion final = " +fecha);
      
      const formData = new FormData();
      formData.append('id', this.idUser.toString());
      formData.append('final_sesion',fecha);
  
     
  
      this.usuarioServices.sesionfinal(formData).subscribe({
        next: (data) => { 
          console.log(data);
     
        }
        , error:(error) =>{
          console.log(error.message); 
        } 
    })
    } 

  ngOnInit(): void {
    this.accesoService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }


  logout()
  {
    this.guardarsesionFinal();
    this.accesoService.logout();
    this.router.navigate(['/'])
  }
  

}
