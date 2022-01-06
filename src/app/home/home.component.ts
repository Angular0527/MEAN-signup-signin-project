import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { userModel } from '../userModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  admin :any;
  user:userModel[]=[];
  
  error:any = '';
  
   
  constructor(private ser:CommonService) { }

  

  
 
  viewData()
  {
    this.ser.getdata().subscribe((res:userModel[]) => {
      this.user = res;
    },
    (err) => this.error = err);

  
  }





  ngOnInit(): void {

     this.admin = localStorage.getItem('auth');
     console.log(this.admin);
    
     this.viewData();
     

    

    
}

}