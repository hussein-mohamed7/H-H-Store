import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { ProductManager } from '../../services/product-manager';
import { Signout } from '../signout/signout';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule,Signout],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  @ViewChild("searchInput") searchInput!:ElementRef
  constructor(private router:Router,private auth:AuthService,private p:ProductManager){}
  menuOpen = false;
  isOpen = false;

  categories:any[] = [];
  himCategories:any[] = [];
  herCategories:any[] = [];

  ngOnInit(): void {

      console.log(this.auth.isAdmin())
      console.log(this.auth.isLoggedIn())
      this.p.getAllCategories().subscribe(
        (res:any)=>
        {
          this.categories = res;
          this.himCategories = this.categories.filter((category)=>{return category.gender=="m"});
          this.herCategories = this.categories.filter((category)=>{return category.gender=="f"});
        }
      );
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }
  search()
  {
    const query = this.searchInput.nativeElement.value;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([`/search/${query}`]);
    });

  }
  categoryClick(gender:string,category:string)
  {
     this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigateByUrl(`/search/${gender}/${category}`);
    });
  }
}
