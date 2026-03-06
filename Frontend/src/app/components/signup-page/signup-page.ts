import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { passwordMatched } from '../../validators/passwordMatch';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-signup-page',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './signup-page.html',
  styleUrl: './signup-page.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SignupPage implements OnInit {
  signupForm!:FormGroup;
  isDuplicate:boolean=false;
  constructor(private auth:AuthService,private builder:FormBuilder,private client:HttpClient,private c:ChangeDetectorRef,private router:Router){}
  ngOnInit(): void {
    this.signupForm=this.builder.group({
    username:["",[Validators.required]],
    email:["",[Validators.required,Validators.email]],
    password:["",[Validators.required,Validators.minLength(8)]],
    repassword:["",[Validators.required,Validators.minLength(8)]]
    },{validators:[passwordMatched()]});
  }
  get username()
  {
    return this.signupForm.get("username");
  }
  get email()
  {
    return this.signupForm.get("email");
  }
  get password()
  {
    return this.signupForm.get("password");
  }
  get repassword()
  {
    return this.signupForm.get("repassword");
  }
  signup()
  {
    const user = {user:this.username?.value,email:this.email?.value,password:this.password?.value};
    this.client.post("http://localhost:8000/signup",user).subscribe(
      (res:any)=>
      {
        if(res.isDuplicate)
        {
          this.isDuplicate=res.isDuplicate;
        }
        else
        {
          this.auth.verificationStatus.set(2);
          this.router.navigateByUrl("/login");
        }
        this.c.markForCheck();
      }
    );
  }
}
