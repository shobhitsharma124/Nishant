import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new Headers({ "Content-Type": "application/json" })
};

@Injectable({ providedIn: 'root' })
export class UserService {

    public static BaseUrl = "http://localhost:6565/";

    constructor(private http: HttpClient) { }

    postfitnessdata(data:any):Observable<any> {
      return this.http.post<any>(UserService.BaseUrl+'allfriends',data);
    }
    getfitnessdata() {
      return this.http.get(UserService.BaseUrl+'allfriends');
    }
    editfitnessdata(id:number,data:any):Observable<any>{
      return this.http.put(UserService.BaseUrl+'allfriends/'+id,data);
    }
    deletefitnessdata(id:number):Observable<any>{
      return this.http.delete(UserService.BaseUrl+'allfriends/'+id,{responseType:'text'});
    }
    getfitnessdatabyid(id:number){
      return this.http.get(UserService.BaseUrl+'allfriends/'+id);
    }
}