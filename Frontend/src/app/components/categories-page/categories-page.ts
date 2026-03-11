import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardSlider } from '../card-slider/card-slider';
import { ProductManager } from '../../services/product-manager';
import { ICategory } from '../../interfaces/icategory';

@Component({
  selector: 'app-categories-page',
  imports: [CardSlider],
  templateUrl: './categories-page.html',
  styleUrl: './categories-page.css',
})
export class CategoriesPage implements OnInit{
  categoriesM!:ICategory[]
  categoriesF!:ICategory[]
  categories!:ICategory[]
  constructor(private p:ProductManager,private c:ChangeDetectorRef){}
  ngOnInit(): void {
    window.scrollTo(0,0);
    this.p.getAllCategories().subscribe(
      (res)=>
      {
        this.categories=res;
        console.log(this.categories);
        this.categoriesM = this.categories.filter((category)=>{return category.gender=="m"});
        this.categoriesF = this.categories.filter((category)=>{return category.gender=="f"});
        this.c.markForCheck();
      }
    )
  }
}
