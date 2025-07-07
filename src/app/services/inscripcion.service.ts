import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseUsuarios } from '../interfaces/ResponseUsuarios';
import { Inscripcion } from '../interfaces/Inscripcion';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';
import { ResponseInscripcion } from '../interfaces/ResponseInscripcion';

@Injectable({
     providedIn: 'root'
})
export class InscripcionService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    inscritosCurso(id:Number, idalumno:Number) : Observable<ResponseInscripcion>{
            return  this.http.get<ResponseInscripcion>(`${this.baseUrl}inscripcion/inscritosCurso/`+{id}+`/`+{idalumno})
        }


   inscritosRecursos(id:Number, idalumno:Number) : Observable<ResponseInscripcion>{
            return  this.http.get<ResponseInscripcion>(`${this.baseUrl}inscripcion/inscritosRecursos/`+{id}+`/`+{idalumno})
        }
   
cursosxalumno(id:Number) : Observable<ResponseInscripcion>{
            return  this.http.get<ResponseInscripcion>(`${this.baseUrl}inscripcion/cursosxalumno/`+{id})
        }
    

}