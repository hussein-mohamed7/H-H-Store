import { Component } from '@angular/core';
import { Navbar } from "../navbr/navbar";
import { Footer } from "../footer/footer";
import { CommonModule } from '@angular/common';
import { ProductCategories } from "../product-categories/product-categories";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, Navbar, Footer, ProductCategories ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
