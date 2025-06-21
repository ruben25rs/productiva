import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './homeA.component.html',
  styleUrls: ['./homeA.component.css']
})
export class HomeAComponent {

previewUrl: string | ArrayBuffer | null = null;

onFileSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = e => this.previewUrl = reader.result;
    reader.readAsDataURL(file);
  }
}
  
}
