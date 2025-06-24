import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseUsuarios } from '../interfaces/ResponseUsuarios';
import { User } from '../interfaces/User';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class UsuariosService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    listaU() : Observable<ResponseUsuarios>{
          return  this.http.get<ResponseUsuarios>(`${this.baseUrl}usuarios/capacitadorlist`);
    }

    listaUsers() : Observable<ResponseUsuarios>{
        return  this.http.get<ResponseUsuarios>(`${this.baseUrl}usuarios/listar`)
    }
    showUserProfile(id:number) : Observable<ResponseUsuarios>{
            return  this.http.get<ResponseUsuarios>(`${this.baseUrl}usuarios/showUserProfile/`+id)
        }
    getUsers(id:number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}usuario/listar/`+id)
    }

    editUser(request:any):Observable<any>{
        return this.http.put<any>(this.baseUrl+"usuario/update/", request).pipe(
        tap( (userData) => {
               
            console.log(userData)
              
        }),
        map((userData)=> userData),
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

     getDatosLogin(email:string) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}usuarios/getDatosLogin/`+email)
    }
    

}