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

  inicio_sesion: Date= new Date
  idUser: number = Number(sessionStorage.getItem("id"))
  public tiempo_conexion=0;
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
        this.usuarioServices.showUserProfile(this.idUser).subscribe({
        next: (data) =>{
        
          console.log("inicio sesion = " + data['value'][0].inicio_sesion);
          
          if (data.value.length > 0) {
            this.inicio_sesion = new Date(data['value'][0].inicio_sesion);

             //Obtener la diferencia en milisegundos
            const diferenciaMs = new Date(fecha).getTime() - this.inicio_sesion.getTime();
            // Convertir milisegundos a horas
            const diferenciaHoras = diferenciaMs / (1000 * 60 * 60);
            this.tiempo_conexion=diferenciaHoras;
            formData.append('tiempo_conexion', this.tiempo_conexion.toString());
            console.log("tiempo de conexion: " + this.tiempo_conexion);
             
               this.usuarioServices.sesionfinal(formData).subscribe({
                next: (data) => { 
                  console.log(data);

                }
                , error:(error) =>{
                  console.log(error.message); 
                } 
            }) 
        
          }

        }, error:(error) =>{
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
