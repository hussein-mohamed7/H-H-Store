import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategories } from "../product-categories/product-categories";
import { CardSlider } from "../card-slider/card-slider";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCategories, CardSlider],
import { CardSlider } from '../card-slider/card-slider';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCategories,CardSlider ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
