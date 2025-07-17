import { AccesoService } from '../services/acceso.service'; 

import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router, private accesoService: AccesoService) {}

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    const tipoUsuario = sessionStorage.getItem('tipoUser')!;
    const idUser = sessionStorage.getItem('id')!;
    const rolEsperado = route.data['rol'];


    

    if (tipoUsuario && tipoUsuario === rolEsperado) {
      
      
      return true;
    }

    const ruta = this.accesoService.getRutaPorRol(tipoUsuario, idUser);
    //this.router.navigate([ruta]);

    this.router.navigate([ruta]);  
    return false
    //return false; // ✅ Permite acceso si no hay sesión
  }
}
