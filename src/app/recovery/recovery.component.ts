import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent {
  token?: string | null;

   constructor(private route: ActivatedRoute, private router:Router) { 
    }



    ngOnInit(): void {
    //this.cargar_table()
    this.token = this.route.snapshot.paramMap.get('token');
    console.log('token es igual'+this.token); 
    

    
  }  
}
