import { Component } from '@angular/core';

@Component({
  selector: 'app-scripts',
  templateUrl: './scripts.component.html',
  styleUrls: ['./scripts.component.css']
})
export class ScriptsComponent {

  activar_class(){

    let elem = document.getElementsByClassName('iniciomn')

    let path = location.pathname

    if(path=="/"){


      elem[0].className ="headermenu iniciomn active-link";

    }else{
      elem[0].className ="headermenu iniciomn initext";
    }

    console.log(path)
  }


  ngOnInit(){       
    this.activar_class();
  }
}
