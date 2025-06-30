import { Component, ElementRef, ViewChild, AfterViewInit, inject } from '@angular/core'; 
import { FormBuilder, Validators, AbstractControl, FormControl, FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import { AccesoService } from '../services/acceso.service';
import { LoginResponse } from '../interfaces/LoginResponse';
import { ResponseAcceso } from '../interfaces/ResponseAcceso';
import { Usuarios } from '../interfaces/Usuarios';
import { UsuariosService } from './../services/usuarios.service';


@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements AfterViewInit{

  private accesoService = inject(AccesoService);

  loginError:string="";
  tipouser: Number = Number(sessionStorage.getItem("tipoUser"))

  password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  password2 = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
  ]);


  c_password = new FormControl(null, [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  nombre = new FormControl(null, [(c: AbstractControl) => Validators.required(c)]);

  empresa = new FormControl(null, [(c: AbstractControl) => Validators.required(c)]);

  terminos = new FormControl(null, [(c: AbstractControl) => Validators.requiredTrue(c)]);

  email = new FormControl(null, [(c: AbstractControl) => Validators.required(c), (c: AbstractControl) => Validators.email(c)]);

  loginForm=this.formBuilder.group({
    email:this.email,
    password: this.password2,
  })

  regForm=this.formBuilder.group(
    {
      nombre: this.nombre,
      empresa:this.empresa,
      email:this.email,
      terminos: this.terminos,
      tipousuario_id: [3],
      password: this.password,
      c_password: this.c_password,
    },
    {
      validator: this.ConfirmedValidator('password', 'c_password'),
    }
  )

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
    this.registerform.nativeElement.style.zIndex='9999';
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


  //listar usuarios maestros
private usuarioServices = inject(UsuariosService);
public usuario: Usuarios[] = []



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


          
          this.usuarioServices.getDatosLogin(String(this.email.value)).subscribe({
            next: (data) =>{
             
            console.log(data['value'][0].tipousuario_id);
              if (data.value.length > 0) {
               // this.usuario = data['value']
               switch (data['value'][0].tipousuario_id) {
                 case 1:
                   this.router.navigateByUrl('/panel');
                   break;
                 case 2: 
                    this.router.navigate(["/intructor/homeI", data['value'][0].id]); 
                   break; 
                  case 3: 
                      this.router.navigate(["/alumno/homeA", data['value'][0].id]); 
                    break; 
                  default:
                      this.router.navigate(["/alumno/homeA", data['value'][0].id]); 
                    break;
               }
                 
              }
            }, error:(error) =>{
              console.log(error.message); 
            }
          })
        
          this.loginForm.reset();
        }
      })

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  register(){
    if(this.regForm.valid){
      this.accesoService.register(this.regForm.value as ResponseAcceso).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError=errorData;
          alert(errorData)
        },
        complete: () => {
          console.info("Register completo");
          //this.router.navigateByUrl('/panel');
          //window.location.href="/panel";
          this.regForm.reset();
        }
      })
    }else{
      this.regForm.markAllAsTouched();
      console.log("error registerform")
    }
  }




 
 


  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }


  ngOnInit(){    

  

  }

  ngAfterViewInit(){

  }

  


}
