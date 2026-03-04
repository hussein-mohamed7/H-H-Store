import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbr',
  imports: [CommonModule],
  templateUrl: './navbr.html',
  styleUrl: './navbr.css',
})
export class Navbr {
menuOpen = false;
isOpen = false;

toggleMenu() {
  this.menuOpen = !this.menuOpen;
}

toggleDropdown() {
  this.isOpen = !this.isOpen;
}
}
