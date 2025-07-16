// src/app/interceptors/token.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, public accesoService:AccesoService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("token");

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // El token no es válido o ha expirado
          //localStorage.removeItem('token'); // Limpia el token
          sessionStorage.clear()
          this.accesoService.logout()
          this.router.navigate(['/']); // Redirige al login
        }

        return throwError(() => error); // Lanza el error para que otros lo manejen si es necesario
      })
    );
  }
}
