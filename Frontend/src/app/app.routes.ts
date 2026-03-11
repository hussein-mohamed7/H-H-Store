import { Routes } from '@angular/router';
import { LoginPage } from './components/login-page/login-page';
import { HomePage } from './components/home-page/home-page';
import { NavFooterContainer } from './components/nav-footer-container/nav-footer-container';
import { SignupPage } from './components/signup-page/signup-page';
import { AddProduct } from './components/admin/add-product/add-product';
import { UpdateProduct } from './components/admin/update-product/update-product';
import { Users } from './components/admin/users/users';

import { VerifyEmail } from './components/verify-email/verify-email';
import { VerticalCardSlider } from './components/vertical-card-slider/vertical-card-slider';
import { CategoriesPage } from './components/categories-page/categories-page';
import { Updatesearch } from './components/admin/updatesearch/updatesearch';
import { Deleteproduct } from './components/admin/deleteproduct/deleteproduct';
import { SearchPage } from './components/search-page/search-page';
import { ConfirmLogin } from './components/confirm-login/confirm-login';
import { ProductDetails } from './components/product-details/product-details';
import { Cart } from './components/cart/cart';
import { userGuard } from './guards/user-guard';
import { AdminPage } from './components/admin/admin-page/admin-page';
import { adminGuard } from './guards/admin-guard';
export const routes: Routes = [
    {path:'admin',component:AdminPage,children:
      [
        {path:'',redirectTo:'add',pathMatch:"full"},
        {path:'add', component: AddProduct},
        {path:'update', component:Updatesearch },
        {path:'update/product/:id', component:UpdateProduct},
        {path:'delete',component:Deleteproduct},
        {path:'Users',component:Users}
      ],
      canActivate:[adminGuard]
    }

    ,
    { path: '', component: NavFooterContainer,children:
      [
        {path:'',component:HomePage},
        { path: 'login', component: LoginPage },
        {path:"signup",component: SignupPage},
        {path:"categories",component:CategoriesPage},
        {path:"search/:Gender/:Query",component:SearchPage},
        {path:"search/:Query",component:SearchPage},
        {path:'confirm',component : ConfirmLogin},
        {path : 'product/:id',component:ProductDetails},
        {path:'cartpage',component: Cart,canActivate:[userGuard]}
      ]
    },
    {
      path:'verify/:Token',component:VerifyEmail
    }
    ,
    {
      path:'test',
      loadComponent:()=>import("./components/vertical-card-slider/vertical-card-slider").then(c=>c.VerticalCardSlider),
      data:{preload:true}
    }

];
