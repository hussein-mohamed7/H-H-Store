import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar implements OnInit {
  @ViewChild("searchInput") searchInput!:ElementRef
  constructor(private router:Router,private auth:AuthService){}
  menuOpen = false;
  isOpen = false;
  ngOnInit(): void {
      this.auth.verifyToken().subscribe(
        (res:any)=>
        {
          this.auth.loggedIn.set(res.verified);
          if(this.auth.loggedIn())
          {
            alert("User is logged in")
          }
          else
          {
            alert("User not logged in");
          }
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
}
