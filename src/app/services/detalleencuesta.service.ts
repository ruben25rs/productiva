import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseDetalleencuestas } from '../interfaces/ResponseDetalleencuestas';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';



@Injectable({
providedIn: 'root'
})
export class DetalleencuestaService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     constructor() { 
          

     }
     listarEncuesta(id:any) : Observable<any>{
          return  this.http.get<any>(`${this.baseUrl}detalleencuesta/listar/`+id)
     }

   
     registrar(datos:ResponseDetalleencuestas):Observable<any>{
          return this.http.post<any>(this.baseUrl+"detalleencuesta",datos).pipe(
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
          return throwError(()=> ({message:'Algo falló. Por favor intente nuevamente.', messageper:error.error.data.data}));
     }

    
     


}