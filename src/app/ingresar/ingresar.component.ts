import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.css']
})
export class IngresarComponent implements AfterViewInit{


  @ViewChild("loginBtn") loginBtn!: ElementRef;
  @ViewChild("registerBtn") registerBtn!: ElementRef;
  @ViewChild("loginform") loginform!: ElementRef;
  @ViewChild("registerform") registerform!: ElementRef;
  @ViewChild("loginregister") loginregister!: ElementRef;
  @ViewChild("forgot") forgot!: ElementRef;

  constructor (){

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
  }



  ngOnInit(){       

  }

  ngAfterViewInit(){

  }

  


}
