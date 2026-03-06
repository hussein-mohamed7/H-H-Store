import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategories } from "../product-categories/product-categories";
<<<<<<< HEAD
import { CardSlider } from "../card-slider/card-slider";

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCategories, CardSlider],
=======
import { CardSlider } from '../card-slider/card-slider';

@Component({
  selector: 'app-home-page',
  imports: [CommonModule, ProductCategories,CardSlider ],
>>>>>>> 38532b4d4e94c1882bb6312263eb2f96922a06ad
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
