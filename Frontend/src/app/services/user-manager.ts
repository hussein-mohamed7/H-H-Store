import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserManager {
  constructor(private client:HttpClient){}
  getUsersForAdmin():Observable<any>
  {
    return this.client.get("http://localhost:8000/users-for-admin",{withCredentials:true});
  }
  changeUserStatus(isActive:boolean,email:string):Observable<any>
  {
    return this.client.patch("http://localhost:8000/change-user-status",{isActive,email},{withCredentials:true});
  }
}
