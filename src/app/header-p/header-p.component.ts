import { Component, inject } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { Router } from '@angular/router';
import {formatDate} from '@angular/common';
import { UsuariosService } from './../services/usuarios.service';


@Component({
  selector: 'app-header-p',
  templateUrl: './header-p.component.html',
  styleUrls: [
    './header-p.component.css',
  ]
})
export class HeaderPComponent {
  userLoginOn:boolean=false;
 
  userId: Number = Number(sessionStorage.getItem("id"))

  private usuarioServices = inject(UsuariosService);

  constructor(private router: Router, public accesoService:AccesoService) {}



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
    const date = new Date();
    const formattedDate:string = date.toString();
    let fecha = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss', 'en-US')
    console.log("Date inciio session = " +fecha);
    
    const formData = new FormData();
    formData.append('id', String(this.userId));
    formData.append('final_sesion',fecha);

    

    this.usuarioServices.sesionfinal(formData).subscribe({
      next: (data) => { 
        console.log(data);
        
      }
      , error:(error) =>{
        console.log(error.message); 
      } 
    })
    this.accesoService.logout();
    this.router.navigate(['/'])
  }

}
