import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { HomePage } from './components/home-page/home-page';
import { NavFooterContainer } from './components/nav-footer-container/nav-footer-container';
import { SignupPage } from './components/signup-page/signup-page';
import { VerifyEmail } from './components/verify-email/verify-email';
export const routes: Routes = [
    { path: '', component: NavFooterContainer,children:
      [
        {path:'',component:HomePage},
        { path: 'login', component: LoginPage },
        {path:"signup",component: SignupPage}
      ]
    },
    {
      path:'verify/:Token',component:VerifyEmail
    }

];
