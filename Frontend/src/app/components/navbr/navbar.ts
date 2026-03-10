import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {
  @ViewChild("searchInput") searchInput!:ElementRef
  constructor(private router:Router){}
  menuOpen = false;
  isOpen = false;

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
