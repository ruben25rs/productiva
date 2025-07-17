import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header-p',
  templateUrl: './header-p.component.html',
  styleUrls: [
    './header-p.component.css',
  ]
})
export class HeaderPComponent {
  userLoginOn:boolean=false;
 

  constructor(private router: Router, public accesoService:AccesoService) {}



  ngOnInit(): void {
    this.accesoService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) => {
          this.userLoginOn=userLoginOn;
        }
      }
    )
  }


  logout()
  {
    this.accesoService.logout();
    this.router.navigate(['/'])
  }

}
