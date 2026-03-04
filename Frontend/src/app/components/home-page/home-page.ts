import { Component } from '@angular/core';
import { Navbr } from "../navbr/navbr";
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, Navbr, Footer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
