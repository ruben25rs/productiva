import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseEncuestas } from '../interfaces/ResponseEncuestas';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';



@Injectable({
providedIn: 'root'
})
export class EncuestaService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     constructor() { 
          
     }

     listarEncuestas() : Observable<ResponseEncuestas>{
          return  this.http.get<ResponseEncuestas>(`${this.baseUrl}encuesta/listar`)
     }
     eliminarEncuesta(id:any) : Observable<ResponseEncuestas>{
          return  this.http.get<ResponseEncuestas>(`${this.baseUrl}encuesta/eliminar/`+id)
     }

   
     registrar(datos:ResponseEncuestas):Observable<any>{
          return this.http.post<any>(this.baseUrl+"encuesta",datos).pipe(
          tap( (encuestaData) => {
               
               console.log(encuestaData)
              
          }),
          map((encuestaData)=> encuestaData),
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