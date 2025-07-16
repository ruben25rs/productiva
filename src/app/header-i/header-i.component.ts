import { Component } from '@angular/core';
import { AccesoService } from '../services/acceso.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-i',
  templateUrl: './header-i.component.html',
  styleUrls: ['./header-i.component.css']
})
export class HeaderIComponent {

  idUser: Number = Number(sessionStorage.getItem("id"))
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
