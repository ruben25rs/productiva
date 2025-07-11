import { HttpClient } from '@angular/common/http'; // peticiones a la api
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseModulos } from '../interfaces/ResponseModulos';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class ModulosService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    listarModulosId(id:number) : Observable<ResponseModulos>{
            return  this.http.get<ResponseModulos>(`${this.baseUrl}modulo/listar/`+id)
        }   
    

}