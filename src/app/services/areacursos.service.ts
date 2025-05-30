import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseAreacursos } from '../interfaces/ResponseAreacursos';
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class AreacursosService {
     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;
     
     constructor() { }

     listaC() : Observable<ResponseAreacursos>{
          return  this.http.get<ResponseAreacursos>(`${this.baseUrl}cursos/listar`)
     }

    

}