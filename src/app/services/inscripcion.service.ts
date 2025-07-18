import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseUsuarios } from '../interfaces/ResponseUsuarios';
import { ResponseCInscritos } from '../interfaces/ResponseCInscritos';
import { CInscrito } from '../interfaces/CInscrito';

import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { ResponseInscripcion } from '../interfaces/ResponseInscripcion';

@Injectable({
     providedIn: 'root'
})
export class InscripcionService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }


    registrar(datos:ResponseInscripcion):Observable<any>{
        return this.http.post<any>(this.baseUrl+"inscripcion",datos).pipe(
        tap( (incripcionData) => {
               
            console.log(incripcionData)
              
        }),
        map((incripcionData)=> incripcionData),
        catchError(this.handleError)
        );
    }

    inscribirse(id:Number, idalumno:Number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}inscripcionc/`+id+`/`+idalumno)
    }

    eliminarInscripcion(id:Number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}inscripcion/eliminar/`+id)
    }

    inscritosCurso(id:Number, idalumno:Number) : Observable<ResponseInscripcion>{
        return  this.http.get<ResponseInscripcion>(`${this.baseUrl}inscripcion/inscritosCurso/`+{id}+`/`+{idalumno})
    }


    inscritosRecursos(id:Number, idalumno:Number) : Observable<ResponseInscripcion>{
        return  this.http.get<ResponseInscripcion>(`${this.baseUrl}inscripcion/inscritosRecursos/`+{id}+`/`+{idalumno})
    }
   
    cursosxalumno(id:Number) : Observable<ResponseCInscritos>{
        return  this.http.get<ResponseCInscritos>(`${this.baseUrl}inscripcion/cursosxalumno/`+id)
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