import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/User';

@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.css']
})
export class HeaderAComponent {

  currentUrl: string = '';
public user: Array<any> = []
  idUser: Number = Number(sessionStorage.getItem("id"))

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });

     window.addEventListener('beforeunload', () => {
      sessionStorage.clear();
    });

  }
  

}
