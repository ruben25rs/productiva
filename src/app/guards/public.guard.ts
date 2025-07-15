import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const tipoUsuario = sessionStorage.getItem('tipoUser');
    const idUser = sessionStorage.getItem('id');

    if (tipoUsuario) {
      if (tipoUsuario === '1') {
        this.router.navigate(['/panel']);
      } else if (tipoUsuario === '2') {
        this.router.navigate(['/instructor']);
      } else if (tipoUsuario === '3') {
        this.router.navigate(['/alumno/homeA/' + idUser]);
      } else {
        this.router.navigate(['/']); // Por si es un tipo desconocido
      }

      return false; // Bloquea acceso a la ruta pública
    }

    return true; // ✅ Permite acceso si no hay sesión
  }
}
