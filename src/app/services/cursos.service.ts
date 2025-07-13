import { HttpClient } from '@angular/common/http'; // peticiones a la api
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings'; //archivo de configurtacion de la ruta del servidor api
import { ResponseCursos } from '../interfaces/ResponseCursos';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class CursosService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    listaCursos(slug:string) : Observable<ResponseCursos>{
        return  this.http.get<ResponseCursos>(`${this.baseUrl}curso/listarslug/`+slug)
    }
    listaCursosa(slug:string, iduser:any) : Observable<ResponseCursos>{
        return  this.http.get<ResponseCursos>(`${this.baseUrl}cursosa/`+slug+'/'+iduser)
    }
    
    listaCursosId(id:Number) : Observable<ResponseCursos>{
        return  this.http.get<ResponseCursos>(`${this.baseUrl}curso/listar/`+id)
    }
    listaCursosAll() : Observable<ResponseCursos>{
        return  this.http.get<ResponseCursos>(`${this.baseUrl}cursos/listar/`)
    }

    inscritoU(idcurso:Number, iduser:Number) : Observable<any>{
        return  this.http.get<any>(`${this.baseUrl}cursosi/`+idcurso+'/'+iduser)
    }

    

}