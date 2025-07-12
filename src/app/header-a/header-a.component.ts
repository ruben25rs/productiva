import { Component } from '@angular/core';

@Component({
  selector: 'app-header-a',
  templateUrl: './header-a.component.html',
  styleUrls: ['./header-a.component.css']
})
export class HeaderAComponent {

  idUser: Number = Number(sessionStorage.getItem("id"))
}
