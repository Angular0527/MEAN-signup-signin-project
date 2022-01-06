import { Component, OnInit,ElementRef,ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonService } from '../common.service';
import { ConfgService } from '../confg.service';
import { userModel } from '../userModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('myInput')
  private myInputVariable!: ElementRef;

  constructor(private ser:CommonService,private cer:ConfgService) { }

  BASE_URL = this.cer.BASE_URL;
  
   udata:userModel = new userModel();
   btn:string = "submit";
  user:any;
  error:any = '';
//.....................view data.............................//
  viewData()
  {
    this.ser.getdata().subscribe((res: userModel[]) => {
      this.user = res;
    },
    (err) => this.error = err);
  
  }
//.............................................................//



//.......................update...........................//
updatedata(uu:userModel)
{ 
     this.udata = uu;
     this.btn = 'update';
}
//.................................................................//


//........................file uploade...........................//

onchangeFile(e:any)
{
    let fileIn = e.target.files[0];
    this.udata.image = fileIn
    
}


//........................insert with update.....................//
inupData(f:any){

  var ds = this.ser.update(this.udata).subscribe((res:any) =>{

    if(res.msg)
    {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: res.msg,
        showConfirmButton: true,
        timer: 1500
      })

      
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

//...............................................................//

//..........................delete data..........................//
deleteData(f:userModel){

  
  var ds = this.ser.deleted(f).subscribe((res:any) =>{

    if(res.msg)
    {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: res.msg,
        showConfirmButton: true,
        timer: 1500
      })

      
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
    
   },
   (err) => this.error = err);
}

//.........................................................//
  ngOnInit(): void {
    this.viewData();
  }

}
