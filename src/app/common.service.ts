import { Injectable } from '@angular/core';
import { ConfgService } from './confg.service';
import { userModel } from './userModel';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';
import { loginModel } from './loginModel';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http:HttpClient,private conf:ConfgService) { }

  BASE_URL = this.conf.BASE_URL+'registration/';
  BASE_URL_log = this.conf.BASE_URL+'login/';
  BASE_URL_UPDATE = this.conf.BASE_URL+'display/';
  BASE_URL_DELETE = this.conf.BASE_URL+'errase/'; 


  //........................insert data.......................//

  insert(user:userModel):Observable<any>
  {

      var filedata = new FormData();
      
       filedata.append('fname',user.fname);
       filedata.append('number',user.number.toString());
       filedata.append('email',user.email);
       filedata.append('password',user.password);
       filedata.append('image',user.image);
   
        console.log(filedata);
     return this.http.post(`${this.BASE_URL}insert`,filedata).pipe(
       map((res) =>{
            console.log('aaa=',res);
            return res;
       }),
       catchError(this.handleError));
  }

  private handleError(error:HttpErrorResponse)
  {
    return throwError('Error! something went wrong.');
  }

  //.........................update data ......................//

  update(uu:userModel):Observable<any>
  {

    var upddata = new FormData();
    upddata.append('_id',uu._id);  
    upddata.append('fname',uu.fname);
    upddata.append('number',uu.number.toString());
    upddata.append('email',uu.email);
    upddata.append('password',uu.password);
    upddata.append('image',uu.image);

     console.log(upddata);
  return this.http.post(`${this.BASE_URL_UPDATE}update`,upddata).pipe(
    map((res) =>{
         console.log('aaa=',res);
         return res;
    }),
    catchError(this.handleError));

  }

  //..........................deleted data.......................//
  
  deleted(tt:userModel):Observable<any>
  {
       
    var dpddata = new FormData();
    dpddata.append('_id',tt._id);  
     
    

     console.log(dpddata);
  return this.http.post(`${this.BASE_URL_DELETE}delete`,dpddata).pipe(
    map((res) =>{
         console.log('aaa=',res);
         return res;
    }),
    catchError(this.handleError));
  }

  //......................display data......................//


getdata():Observable<userModel[]>
{
    return this.http.get(`${this.BASE_URL}get`).pipe(map((res:any)=>{
      return res;
    }),
    catchError(this.handleError));
}


//............................login..................................//
loginsert(luser:loginModel):Observable<any>
{ 
    return this.http.post(`${this.BASE_URL_log}cheack`,luser).pipe(
      map((res) =>{
        console.log('aaa=',res);
        return res;
      }),
      catchError(this.handleError));
}


}
