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
     //banderaAlumnoPathname = false;

     currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
     currentUserData: BehaviorSubject<String> =new BehaviorSubject<String>("");
     currentUserInfo: BehaviorSubject<String> = new BehaviorSubject<String>("");

     constructor() { 
          this.currentUserLoginOn=new BehaviorSubject<boolean>(sessionStorage.getItem("token")!=null);
          this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");
          this.currentUserInfo=new BehaviorSubject<String>(sessionStorage.getItem("token") || "");

          this.validarPathname();
     }

     login(credentials:ResponseAcceso):Observable<any>{
          return this.http.post<any>(this.baseUrl+"login",credentials).pipe(
          tap( (userData) => {
               
               console.log(userData.data.token)
               sessionStorage.setItem("token", userData.data.token);
               this.currentUserData.next(userData.data.token);
               this.currentUserLoginOn.next(true);
               this.currentUserInfo.next(userData.data.tipousuario_id);
          }),
          map((userData)=> userData.data.token),
          catchError(this.handleError)
          );
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

     validarPathname(){

          

          switch (location.pathname) {
               case "/panel":
               // code
                    this.banderaPathname=true
               break;
            case "/panel/alumnos":
               // code
                    this.banderaPathname=true
               break;
            case "/panel/capacitador":
               // code
                    this.banderaPathname=true
               break;
            case "/panel/encuesta":
               // code
                    this.banderaPathname=true
               break;
            case "/panel/administrar":
               // code
                    this.banderaPathname=true
               break;
            case "/panel/contacto":
               // code
                    this.banderaPathname=true
               break;
            
          }

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
     get banderaPath():boolean{
          return this.banderaPathname;
     }

}