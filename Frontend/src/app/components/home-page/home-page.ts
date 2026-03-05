import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategories } from "../product-categories/product-categories";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCategories ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
