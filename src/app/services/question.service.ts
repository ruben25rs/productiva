import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseQuestions } from '../interfaces/ResponseQuestions';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';



@Injectable({
providedIn: 'root'
})
export class QuestionService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     constructor() { 
          
     }

     listarQuestions(id:any) : Observable<ResponseQuestions>{
          return  this.http.get<ResponseQuestions>(`${this.baseUrl}questions/listar/`+id)
     }
     eliminarQuestion(id:any) : Observable<ResponseQuestions>{
          return  this.http.get<ResponseQuestions>(`${this.baseUrl}question/eliminar/`+id)
     }

   
     registrar(datos:ResponseQuestions):Observable<any>{
          return this.http.post<any>(this.baseUrl+"encuesta",datos).pipe(
          tap( (questionData) => {
               
               console.log(questionData)
              
          }),
          map((questionData)=> questionData),
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