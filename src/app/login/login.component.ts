import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonService } from '../common.service';
import { loginModel } from '../loginModel';
import { userModel } from '../userModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  // constructor(private ser1:CommonService,private router:Router) 
  // { }

  // list:any;
  // error:any = '';
   
  // logindata(dataa:any,lres:any)
  // {
  //      var flag = true;
  //      for(var i=0;i<this.list.length;i++)
  //      {
  //          if(dataa.lemail == this.list[i].email && dataa.lpwd == this.list[i].password)
  //          {
               
  //              Swal.fire({
  //               position: 'top',
  //               icon: 'success',
  //               title: "login succesfully",
  //               showConfirmButton: true,
  //               timer: 3000
  //             })
               
  //             this.router.navigate(['/table'])
  //              flag = false;
  //              break;
  //          }
           
  //      }
        
  //      if(flag)
  //      {
         
  //       Swal.fire({  
  //         title: "Ooops!",
  //         text: "Somthing went Wrong..!",
  //         icon: "warning",
  //         timer:3000
  //       }) 
  //      }
  // }

  //   getMDdata()
  //   {
  //     this.ser1.getdata().subscribe((res: userModel[]) => {
  //       this.list = res;
  //     },
  //     (err) => this.error = err);
  //   }
  //  ngOnInit(): void {
      
  //   this.getMDdata();
  // }

  logged:loginModel = new loginModel();
  lsuccess :any='';
  error:any='';
constructor(private serr: CommonService,private router: Router)
{

}
  logindata(l:any)
  {
     var tt = this.serr.loginsert(this.logged).subscribe((res:any) =>{

      if(res.lmsg !== null)
      {
        Swal.fire({
          position: 'top',
          icon: 'warning',
          title: res.lmsg,
          showConfirmButton: true,
          timer: 3000
         })
      }
      else
      {
        localStorage.setItem('auth',JSON.stringify(res.idd));
        this.router.navigate(['/home']);
      }
     
    
     },
     (err:any) => {
      
       
      Swal.fire({
            title: err,
             icon: "warning",
             timer:3000
       })

     });


     
  }
    ngOnInit(): void {
      
  
   }

}
