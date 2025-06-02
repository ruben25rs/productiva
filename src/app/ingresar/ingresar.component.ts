import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';
import { LoginResponse } from '../interfaces/LoginResponse';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements AfterViewInit{

  private accesoService = inject(AccesoService);

  loginError:string="";

  loginForm=this.formBuilder.group({
    email:['rubend@gmail.comoo',[Validators.required,Validators.email]],
    password: ['',Validators.required],
  })

  @ViewChild("loginBtn") loginBtn!: ElementRef;
  @ViewChild("registerBtn") registerBtn!: ElementRef;
  @ViewChild("loginform") loginform!: ElementRef;
  @ViewChild("registerform") registerform!: ElementRef;
  @ViewChild("loginregister") loginregister!: ElementRef;
  @ViewChild("forgot") forgot!: ElementRef;

  constructor (private formBuilder:FormBuilder, private router:Router){

  }


  registerBtnclick() {
    this.registerform.nativeElement.style.left='0px';
    this.registerform.nativeElement.style.opacity='1';
    this.loginform.nativeElement.style.left='-500px';
    this.loginform.nativeElement.style.opacity='0';
    this.forgot.nativeElement.style.left='-500px';
    this.forgot.nativeElement.style.opacity='0';
    this.registerBtn.nativeElement.classList.add('active');
    this.loginBtn.nativeElement.classList.remove('active');
    this.loginregister.nativeElement.style.backgroundColor='#2E49C1';
  }

  loginBtnclick(){
    this.loginform.nativeElement.style.left='0px';
    this.loginform.nativeElement.style.opacity='1';
    this.forgot.nativeElement.style.left='0px';
    this.forgot.nativeElement.style.opacity='1';
    this.registerform.nativeElement.style='500px';
    this.loginBtn.nativeElement.classList.add('active');
    this.registerBtn.nativeElement.classList.remove('active');
    this.registerform.nativeElement.style.opacity='0';   
    this.loginregister.nativeElement.style.backgroundColor='#872362';         
  }

  login(){
    if(this.loginForm.valid){
      this.loginError="";
      this.accesoService.login(this.loginForm.value as ResponseAcceso).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
          alert(errorData)
        },
        complete: () => {
          console.info("Login completo");
          this.router.navigateByUrl('/ingresar');
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }


  get email(){
    return this.loginForm.controls.email;
  }

  get password()
  {
    return this.loginForm.controls.password;
  }



  ngOnInit(){       

  }

  ngAfterViewInit(){

  }

  


}
