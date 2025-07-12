import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.css']
})
export class HeaderAComponent {

  currentUrl: string = '';

  idUser: Number = Number(sessionStorage.getItem("id"))

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }


}
