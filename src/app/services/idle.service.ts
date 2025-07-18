import { Injectable, NgZone, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from './usuarios.service';
import { AccesoService } from './acceso.service';
import {formatDate} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class IdleService {
  private timeout: any;
  private idleTime = 5 * 60 * 1000; // 5 minutos
  private usuarioServices = inject(UsuariosService);
  userId: Number = Number(sessionStorage.getItem("id"))

  constructor(private router: Router, private ngZone: NgZone, public accesoService:AccesoService) {
    this.startWatching();
  }

  private startWatching() {
    ['mousemove', 'keydown', 'click'].forEach(evt =>
      window.addEventListener(evt, () => this.resetTimer())
    );
    this.resetTimer();
  }

  private resetTimer() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.logoutUser(), this.idleTime);
  }

  private logout() {
    // Borra el token y redirige
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private logoutUser()
  {

    const token = sessionStorage.getItem('token');
    if (token) {
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
}
