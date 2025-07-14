import { HttpClient } from '@angular/common/http'; // peticiones a la api
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseIntentos } from '../interfaces/ResponseIntentos';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class IntentosService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    
    validarIntento(idCurso:Number, idUser:Number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}intento/`+idCurso+'/'+idUser)
    }

    

}