import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { HomePage } from './components/home-page/home-page';
import { NavFooterContainer } from './components/nav-footer-container/nav-footer-container';
import { SignupPage } from './components/signup-page/signup-page';
<<<<<<< HEAD
import { AddProduct } from './components/admin/add-product/add-product';
import { UpdateProduct } from './components/admin/update-product/update-product';
import { Users } from './components/admin/users/users';

=======
import { VerifyEmail } from './components/verify-email/verify-email';
>>>>>>> 38532b4d4e94c1882bb6312263eb2f96922a06ad
export const routes: Routes = [
    {path:'add', component: AddProduct},
    {path:'update', component:UpdateProduct },
    {path:'Users',component:Users},
    { path: '', component: NavFooterContainer,children:
      [
        {path:'',component:HomePage},
        { path: 'login', component: LoginPage },
        {path:"signup",component: SignupPage}
      ]
<<<<<<< HEAD
=======
    },
    {
      path:'verify/:Token',component:VerifyEmail
>>>>>>> 38532b4d4e94c1882bb6312263eb2f96922a06ad
    }

];
