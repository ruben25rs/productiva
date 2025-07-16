import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { AccesoService } from '../services/acceso.service';

@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.css']
})
export class HeaderAComponent {

  currentUrl: string = '';
  public user: Array<any> = []
  userLoginOn:boolean=false;

  idUser: Number = Number(sessionStorage.getItem("id"))

  constructor(private router: Router, public accesoService:AccesoService) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

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
