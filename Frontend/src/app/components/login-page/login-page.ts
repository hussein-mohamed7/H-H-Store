import { Component } from '@angular/core';
import { Navbar } from '../navbr/navbar';
import { CommonModule } from '@angular/common';
import { Footer } from '../footer/footer';
import { LoginForm } from '../login-form/login-form';

@Component({
  selector: 'app-login-page',
  imports: [Navbar, Footer,CommonModule,LoginForm],
  templateUrl: './login-page.html',
  styleUrl: './login-page.css',
})
export class LoginPage {

}
