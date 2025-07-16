import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { User } from '../interfaces/User';
import { LoginResponse } from '../interfaces/LoginResponse';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';
import { Observable, throwError, catchError, BehaviorSubject , tap, map} from 'rxjs';



@Injectable({
providedIn: 'root'
})
export class AccesoService {

     private http = inject(HttpClient);
     private baseUrl: string = appsettings.apiUrl;

     banderaPathname = false
     banderaAlumno = false
     //banderaAlumnoPathname = false;

     currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
     currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");

     constructor() { 
          this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
          this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");

          
     }

     login(credentials:ResponseAcceso):Observable<any>{
          return this.http.post<any>(this.baseUrl+"login",credentials).pipe(
          tap( (userData) => {
               
               sessionStorage.setItem("token", userData.data.token);
               sessionStorage.setItem("id", userData.data.id);
               sessionStorage.setItem("tipoUser", userData.data.tipouser);

               this.currentUserData.next(userData.data.token);

               const payload = JSON.parse(atob(userData.data.token.split('.')[1]));
               console.log(payload);
               this.currentUserLoginOn.next(true);
          }),
          map((userData)=> userData.data.token),
          catchError(this.handleError)
          );
     }

     getRutaPorRol(rol: string, idUser?: string): string {
       switch (rol) {
         case '1': return '/panel';
         case '2': return '/instructor';
         case '3': return `/alumno/homeA/${idUser}`;
         default: return '/ingresar';  // fallback
       }
     }
     register(credentials:ResponseAcceso):Observable<any>{
          return this.http.post<any>(this.baseUrl+"register",credentials).pipe(
          tap( (userData) => {
               
               console.log(userData)
              
          }),
          map((userData)=> userData.data.token),
          catchError(this.handleError)
          );
     }

     logout():void{
         sessionStorage.removeItem("token");
         sessionStorage.clear()
         this.currentUserLoginOn.next(false);
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

   

     get userData():Observable<String>{
         return this.currentUserData.asObservable();
     }

     get userLoginOn(): Observable<boolean>{
         return this.currentUserLoginOn.asObservable();
     }

     get userToken():String{
         return this.currentUserData.value;
     }
     


}