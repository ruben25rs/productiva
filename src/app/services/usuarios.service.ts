import { HttpClient } from '@angular/common/http'; // peticiones a la api
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseUsuarios } from '../interfaces/ResponseUsuarios';
import { User } from '../interfaces/User';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class UsuariosService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    listaUsers() : Observable<ResponseUsuarios>{
        return  this.http.get<ResponseUsuarios>(`${this.baseUrl}usuarios/listar`)
    }

    getUsers(id:number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}usuario/listar/`+id)
    }

    

}