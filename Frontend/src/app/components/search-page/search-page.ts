import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VerticalCardSlider } from '../vertical-card-slider/vertical-card-slider';
import { ProductManager } from '../../services/product-manager';
import {Options} from "@angular-slider/ngx-slider";
import { NgxSliderModule } from '@angular-slider/ngx-slider';
@Component({
  selector: 'app-search-page',
  imports: [VerticalCardSlider,NgxSliderModule],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css',
})
export class SearchPage implements OnInit{
  @ViewChild("products") products!:VerticalCardSlider
  gender!:string;
  query!:string;
  minValue: number = 0;
  maxValue: number = 5000;
  options: Options = {
    floor: 0,
    ceil: 5000,
    step: 1
  };
  constructor(private active:ActivatedRoute,private p:ProductManager){}
  ngOnInit(): void {
    this.gender = this.active.snapshot.paramMap.get("Gender") ?? "";
    this.query = this.active.snapshot.paramMap.get("Query") ?? "";
  }
  sort(type:string)
  {
    this.products.changeSortType(Number(type));
  }
}
