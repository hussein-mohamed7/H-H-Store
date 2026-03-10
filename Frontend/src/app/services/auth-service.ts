import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  verificationStatus= signal(0);
  loggedIn=signal(false);
  constructor(private client:HttpClient){ }
  login(email:string,password:string) :Observable<any>
  {
      return this.client.post('http://localhost:8000/login',{email,password},{withCredentials:true});
  }
  verifyToken(): Observable<any>
  {
      return this.client.get(`http://localhost:8000/verify-token`,{withCredentials:true})
  }
  verifyEmail(Token:string|null): Observable<any>
  {
    return this.client.get(`http://localhost:8000/verify-email/${Token}`);
  }
}
