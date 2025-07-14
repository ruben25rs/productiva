import { HttpClient } from '@angular/common/http'; // peticiones a la api
import { Injectable, inject } from '@angular/core';
import { ResponseExamenes } from '../interfaces/ResponseExamenes';
import { appsettings } from '../settings/appsettings'; //archivo d
import { Observable } from 'rxjs';

@Injectable({
     providedIn: 'root'
})
export class ExamenService {
    private http = inject(HttpClient);
    private baseUrl: string = appsettings.apiUrl;
     
    constructor() { }

    listarExamen(idcurso:number) : Observable<any>{
            return  this.http.get<any>(`${this.baseUrl}examen/preguntas/`+idcurso)
        }   
    

}