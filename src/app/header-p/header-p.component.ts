import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';
import { AccesoService } from '../services/acceso.service';

@Component({
  selector: 'app-header-p',
  templateUrl: './header-p.component.html',
  styleUrls: [
    './header-p.component.css',
  ]
})
export class HeaderPComponent {
  userLoginOn:boolean=false;
  constructor(private router: Router, public accesoService:AccesoService) {
    
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
    console.log("Pnael P logout");
    this.accesoService.logout();
    this.router.navigate(['/'])
  }
  
}
