import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { EmailVerificationPopup } from '../email-verification-popup/email-verification-popup';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule,RouterLink,EmailVerificationPopup],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LoginPage implements OnInit {
  verificationStatus!:number;
  constructor(private auth:AuthService,private c:ChangeDetectorRef){}
  ngOnInit(): void {
      this.verificationStatus = this.auth.verificationStatus();
      this.c.markForCheck();
  }
}
