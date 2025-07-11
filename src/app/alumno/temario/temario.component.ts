import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cursos } from 'src/app/interfaces/Cursos';
import { CursosService } from 'src/app/services/cursos.service';
import { AreacursosService } from 'src/app/services/areacursos.service';
import { appsettings } from 'src/app/settings/appsettings';
import { Modulos } from '../../interfaces/Modulos';
import { ModulosService } from 'src/app/services/modulos.service';


@Component({
  selector: 'app-temario',
  templateUrl: './temario.component.html',
  styleUrls: ['./temario.component.css']
})
export class TemarioComponent {
    
    public idcurso: number = 0
    public nombrearea: string = '';
     public ruta2: string = '';
    public nombrecurso: string = '';
    public descripcion: string = '';

    private areacursosService = inject(AreacursosService);
    private cursosService = inject(CursosService);
    public cursos: Cursos[] = []
    public baseUrl: string = appsettings.urlImg;

    private modulosService = inject(ModulosService);
    public modulos: Modulos[] = [];

    constructor(private route: ActivatedRoute) {}
  
 cursoxalumno(){ 
    
        this.cursosService.listaCursosId(this.idcurso).subscribe({
        next: (data) =>{  
              
          if (data.value.length > 0) {

            this.cursos = data['value']
            this.nombrearea = data['value'][0].areacurso_nombre;
            this.nombrecurso = data['value'][0].nombrecurso;
            this.descripcion = data['value'][0].descripcion;
            this.ruta2 = data['value'][0].ruta2;
          }
        }, error:(error) =>{
            console.log(error.message);   
        }
      })
     }

     listarModuloid(){
      this.modulosService.listarModulosId(this.idcurso).subscribe({
        next: (modulos) => {
          if (modulos.value.length > 0) {
            this.modulos = modulos['value'];
          }
        },
        error: (error) => {
          console.log(error.message);
        }
      });
     }

      ngOnInit(): void {
        
        
         this.idcurso = Number(this.route.snapshot.paramMap.get('id'));
          this.cursoxalumno()
      }


}
