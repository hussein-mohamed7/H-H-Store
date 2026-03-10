import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerticalCardSlider } from '../vertical-card-slider/vertical-card-slider';
import { ProductManager } from '../../services/product-manager';
import { Options } from "@angular-slider/ngx-slider";
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-search-page',
  imports: [VerticalCardSlider, NgxSliderModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage implements OnInit {

  gender: string = "";
  query: string = "";

  productsList: any[] = [];

  minValue: number = 0;
  maxValue: number = 5000;

  options: Options = {
    floor: 0,
    ceil: 5000,
    step: 1
  };

  constructor(
    private active: ActivatedRoute,
    private p: ProductManager
  ) {}

ngOnInit(): void {
  this.active.params.subscribe(params => {
    this.gender = params['Gender'] ?? "";
    this.query = params['Query'] ?? "";
    this.loadProducts(this.gender, this.query);
  });
}

  loadProducts(gender: string, query: string) {

    this.p.getByCategory(1, query, gender)
  .subscribe((res:any)=>{
  this.productsList = res;
});

  }

  sort(type: string) {
    console.log("Sort type:", type);
  }

}