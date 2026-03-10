import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-verify-email',
  imports: [],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.css',
})
export class VerifyEmail implements OnInit {
  constructor(private route:ActivatedRoute,private auth:AuthService,private router:Router){}

  ngOnInit(): void {
      const Token = this.route.snapshot.paramMap.get("Token");
      this.auth.verifyEmail(Token).subscribe((res)=>
      {
        if(res.verified)
        {
          this.auth.verificationStatus.set(3);
          this.router.navigateByUrl("/login");
        }

      });
  }
}
