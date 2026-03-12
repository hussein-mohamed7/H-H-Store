import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-signout',
  imports: [],
  templateUrl: './signout.html',
  styleUrl: './signout.css',
})
export class Signout {
constructor(private router:Router,private auth:AuthService){}

signOut(){
  this.auth.signOut().subscribe(
    (res)=>
    {
      this.router.navigateByUrl("/");
    }
  );

}
}
