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
     listarQuestion(id:any) : Observable<any>{
          return  this.http.get<any>(`${this.baseUrl}question/listar/`+id)
     }
     listarQuestions(id:any) : Observable<ResponseQuestions>{
          return  this.http.get<ResponseQuestions>(`${this.baseUrl}questions/listar/`+id)
     }
     listarQuestionsEnc(id:any) : Observable<ResponseQuestions>{
          return  this.http.get<ResponseQuestions>(`${this.baseUrl}questions/listarenc/`+id)
     }
     eliminarQuestion(id:any) : Observable<ResponseQuestions>{
          return  this.http.get<ResponseQuestions>(`${this.baseUrl}question/eliminar/`+id)
     }
     actualizar(request:any):Observable<any>{
        return this.http.put<any>(this.baseUrl+"question/update", request).pipe(
        tap( (questionData) => {
               
            console.log(questionData)
              
        }),
        map((encuestaData)=> encuestaData),
        catchError(this.handleError)
        );
    }
   
     registrar(datos:ResponseQuestions):Observable<any>{
          return this.http.post<any>(this.baseUrl+"question",datos).pipe(
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