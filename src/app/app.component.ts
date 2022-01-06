import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { userModel } from './userModel';
import { CommonService } from './common.service';
import { ConfgService } from './confg.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  


 constructor(private _router:Router){
   this._router.navigate(['/register']);
 }
  ngOnInit()
  {
    
  }


  
}
