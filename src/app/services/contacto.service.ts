
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseContacto } from '../interfaces/ResponseContacto';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';


@Injectable({
     providedIn: 'root'
})
export class contactoService {
     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;///https://api.carasoftweb.com/api
     
     constructor() { }

     listaC() : Observable<ResponseContacto>{
          return  this.http.get<ResponseContacto>(`${this.baseUrl}contacto/listar`)
     }

    listaUsers() : Observable<ResponseContacto>{
        return  this.http.get<ResponseContacto>(`${this.baseUrl}contacto/listar`)
    }

    getUsers(id:number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}contacto/listar/`+id)
    }

    register(credentials:ResponseContacto):Observable<any>{
              return this.http.post<any>(this.baseUrl+"contacto/enviarContacto",credentials).pipe(
              tap( (userData) => {
                   
                   console.log(userData)
                  
              }),
              map((userData)=> userData.data.token),
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