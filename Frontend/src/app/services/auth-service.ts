import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  verificationStatus= signal(0);
  constructor(private client:HttpClient){}
  Login(email:string,password:string)
  {

  }
  VerifyToken()
  {

  }
  VerifyEmail(Token:string|null): Observable<any>
  {
    return this.client.get(`http://localhost:8000/verify/${Token}`);
  }
}
