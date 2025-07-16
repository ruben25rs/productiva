import { Component, inject } from '@angular/core';
import { AccesoService } from './services/acceso.service';
import { UsuariosService } from './services/usuarios.service';
import { Usuarios } from './interfaces/Usuarios';
import { Token } from '@angular/compiler';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
  ]
})
export class AppComponent {
  title = 'productiva';

  userLoginOn:boolean=false;
  userData: String = "";
  banderaInvitado:boolean=false;
  tipoUser:number = 0;

  mostrarHeaderFooter: boolean = true;

  constructor(private router: Router, public accesoService:AccesoService) {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd) // 👈 Filtro con tipado
      )
      .subscribe((event) => {
        const ruta = event.urlAfterRedirects;

        // 👉 Agrega aquí las rutas donde quieras ocultar header/footer
        this.mostrarHeaderFooter = !(
          ruta.includes('/recurso')||
          ruta.includes('/certificado')
        );
      });
  }

  private usuarioServices = inject(UsuariosService);
  public usuario: Usuarios[] = []


  ngOnInit(): void {
    this.accesoService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {

        this.userLoginOn=userLoginOn;

        if (this.userLoginOn==true) {
          this.tipoUser = Number(sessionStorage.getItem("tipoUser"))
        }
        
      }
    });


  }
}
