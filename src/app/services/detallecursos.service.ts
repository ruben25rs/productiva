import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseUsuarios } from '../interfaces/ResponseUsuarios';

import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { ResponseInscripcion } from '../interfaces/ResponseInscripcion';

@Injectable({
     providedIn: 'root'
})
export class DetallecursosService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    registrar(datos:ResponseInscripcion):Observable<any>{
        return this.http.post<any>(this.baseUrl+"inscripcionC",datos).pipe(
        tap( (incripcionData) => {
               
            console.log(incripcionData)
              
        }),
        map((incripcionData)=> incripcionData),
        catchError(this.handleError)
        );
    }

   

    private handleError(error:HttpErrorResponse){
          if(error.status===0){
               console.error('Se ha producio un error ', error.error);
          }
          else{
           console.error('Backend retornó el código de estado ', error);
          }
          return throwError(()=> new Error('Algo falló. Por favor intente nuevamente.'));
     }
    

}