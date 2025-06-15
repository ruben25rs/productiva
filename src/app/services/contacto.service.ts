
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseContacto } from '../interfaces/ResponseContacto';
import { Observable } from 'rxjs';


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


    

}