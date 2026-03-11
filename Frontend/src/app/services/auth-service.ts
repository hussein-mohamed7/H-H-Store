import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  verificationStatus= signal(0);
  private _loggedIn=signal(false);
  private _isAdmin=signal(false);
  constructor(private client:HttpClient){
    this.verifyToken();
   }
  login(email:string,password:string) :Observable<any>
  {
      return this.client.post('http://localhost:8000/login',{email,password},{withCredentials:true});
  }
  signout()
  {
    this.client.get('http://localhost:8000/signout',{withCredentials:true}).subscribe((res)=>
    {
      this._loggedIn.set(false);
      this._isAdmin.set(false);
    });
  }
  verifyToken()
  {
      this.client.get(`http://localhost:8000/verify-token`,{withCredentials:true}).subscribe(
        (res:any)=>
        {
          this._loggedIn.set(res.verified);
          this._isAdmin.set(res.isAdmin);
          console.log(this._isAdmin());
          console.log(this._loggedIn());
        }
      )
  }
  get isLoggedIn()
  {
    return this._loggedIn;
  }
  get isAdmin()
  {
    return this._isAdmin;
  }

  verifyEmail(Token:string|null): Observable<any>
  {
    return this.client.get(`http://localhost:8000/verify-email/${Token}`);
  }
}
