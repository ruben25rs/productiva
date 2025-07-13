import { HttpClient } from '@angular/common/http'; // peticiones a la api
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseRecursos } from '../interfaces/ResponseRecursos';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class RecursosService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    listaRecursoId(idRecurso:Number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}recurso/listar/`+idRecurso)
    }
    vistoRecursoId(idRecurso:Number, idUser:Number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}recursov/`+idRecurso+'/'+idUser)
    }
    listaRecursosId(idCurso:Number, idUser:Number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}recursos/`+idCurso+'/'+idUser)
    }
    listaCursosAll() : Observable<ResponseRecursos>{
        return  this.http.get<ResponseRecursos>(`${this.baseUrl}cursos/listar/`)
    }

    

}