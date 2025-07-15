import { Component, inject } from '@angular/core';
import { ExamenService } from '../../services/examen.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-certificado',
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css']
})
export class CertificadoComponent {

  private examenService = inject(ExamenService);

  idCurso?: Number;
  pdfUrl!: SafeResourceUrl;

  idUser: Number = Number(sessionStorage.getItem("id"))

  constructor(private route: ActivatedRoute, private router:Router, private sanitizer: DomSanitizer) { 
  }

  certificado(){
    // this.examenService.certificadoBlob(Number(this.idCurso), this.idUser).subscribe(blob => {
    //   const blobUrl = URL.createObjectURL(blob);
    //   this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
    // });
    this.examenService.certificadoPdf(Number(this.idCurso), this.idUser).subscribe(data => {
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.ruta);

      console.log(data)
    });
  }


  ngOnInit(): void {
    this.idCurso = Number(this.route.snapshot.paramMap.get('id'));

    this.certificado()
    

    
  } 

}
