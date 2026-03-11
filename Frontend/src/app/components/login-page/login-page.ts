import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { EmailVerificationPopup } from '../email-verification-popup/email-verification-popup';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,RouterLink,EmailVerificationPopup,ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {
  verificationStatus!:number;
  loginForm!:FormGroup;
  @ViewChildren('pop1, pop2, pop3, pop4') popups!:QueryList<ElementRef>;
  constructor(private auth:AuthService,private c:ChangeDetectorRef,private builder:FormBuilder,private router:Router){}
  ngOnInit(): void {

      // this.verificationStatus = this.auth.verificationStatus();
      if(this.auth.isAdmin())
      {
        this.router.navigateByUrl("/admin");
      }
      else if(this.auth.isLoggedIn())
      {
        this.router.navigateByUrl('/');
      }
      this.loginForm = this.builder.group(
        {
          email:["",[Validators.email,Validators.required]],
          password:["",[Validators.required]]
        }
      );
      this.verificationStatus = this.auth.verificationStatus();
      this.c.markForCheck();
  }
  get email()
  {
    return this.loginForm.get("email");
  }
  get password()
  {
    return this.loginForm.get("password");
  }
  login()
  {
    this.auth.login(this.email?.value,this.password?.value).subscribe(
      (res)=>
      {
        console.log(res);
        if(res.success)
        {
            // Login success
            this.auth.verifyToken();
            this.router.navigateByUrl("/");
        }
        else
        {
          this.verificationStatus=res.code;
          this.c.markForCheck()
        }
      }
    )
  }
  showPopup()
  {

  }
  closePopup()
  {
    this.auth.verificationStatus.set(0);
    this.verificationStatus=0;
  }
}
