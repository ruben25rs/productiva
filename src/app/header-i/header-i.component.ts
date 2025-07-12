import { Component } from '@angular/core';

@Component({
  selector: 'app-header-i',
  templateUrl: './header-i.component.html',
  styleUrls: ['./header-i.component.css']
})
export class HeaderIComponent {

  idUser: Number = Number(sessionStorage.getItem("id"))

}
