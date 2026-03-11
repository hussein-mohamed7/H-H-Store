import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchPage implements OnInit{
  @ViewChild('products') productsList!:VerticalCardSlider;
  gender: string = "";
  query: string = "";
  minValue: number = 0;
  maxValue: number = 5000;
  minPrice:number=0;
  maxPrice:number=5000;
  options: Options = {
    floor: 0,
    ceil: 5000,
    step: 1
  };

  constructor(
    private active: ActivatedRoute,
    private p: ProductManager,
    private c:ChangeDetectorRef
  ) {}

ngOnInit(): void {
  this.active.params.subscribe(params => {
    this.gender = params['Gender'] ?? "";
    this.query = params['Query'] ?? "";
  });
}



  sort(type: string) {
    console.log("Sort type:", type);
     this.productsList.changeSortType(Number(type));
  }
  applyPrice()
  {
    this.productsList.changePriceRange(this.minValue,this.maxValue);
  }
}
