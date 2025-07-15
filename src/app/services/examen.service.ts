import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseExamenes } from '../interfaces/ResponseExamenes';
import { appsettings } from '../settings/appsettings'; //archivo d
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class ExamenService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;

    constructor() { }

    listarExamen(idcurso:number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}examen/preguntas/`+idcurso)
    }   

    registrar(respuestas: any[], intentoId: number):Observable<any>{
        return this.http.post<any>(this.baseUrl+"examen",{intento_id: intentoId, respuestas: respuestas }).pipe(
          tap((examendata) => {



        }),
        map((examendata)=> examendata),
          catchError(this.handleError)
        );
    }

    resultadosI(intentoId: number):Observable<any>{
        return this.http.get<any>(this.baseUrl+"examen/resultados/"+intentoId)
    }

    certificadoBlob(idCurso:Number, idUser:Number): Observable<Blob> {
        return this.http.get(`${this.baseUrl}reconocimiento/`+idCurso+"/"+idUser, {
            responseType: 'blob'  // 
        });
    }
    certificadoPdf(idCurso:Number, idUser:Number): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}reconocimiento/`+idCurso+"/"+idUser);
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