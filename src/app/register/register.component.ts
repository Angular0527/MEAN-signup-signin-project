import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { CommonService } from '../common.service';


import { userModel } from '../userModel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('myInput')
 private myInputVariable!: ElementRef;
  register:userModel = new userModel();
  user:any;

 
  ngOnInit()
  {
    
  }


  constructor(private ser:CommonService,private router:Router)
  {

  }

  sucess:any = '';
  error:any = '';
  RegisterData(f:any)
  {
    
     var ds = this.ser.insert(this.register).subscribe((res:any) =>{

      if(res.msg)
      {
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: res.msg,
          showConfirmButton: true,
          timer: 1500
        })

        this.router.navigate(['/login']);
      }

      else
      {
        Swal.fire({  
          title: "Ooops!",
          text: res.msg2,
          icon: "warning",
          timer:1500 
        }) 
        
      }
      f.reset();
      this.myInputVariable.nativeElement.value = "";

      
     },
     (err) => this.error = err);
  }

  onchangeFile(e:any)
  {
      let fileIn = e.target.files[0];
      console.log(fileIn);
      this.register.image = fileIn
      
  }



}
