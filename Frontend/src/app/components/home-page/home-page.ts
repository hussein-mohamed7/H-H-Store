import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardSlider } from "../card-slider/card-slider";
import { RouterLink } from '@angular/router';
import { ProductManager } from '../../services/product-manager';
import { ICategory } from '../../interfaces/icategory';



@Component({
  selector: 'app-home-page',
  imports: [CommonModule,CardSlider,RouterLink ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnInit {
  categories!:ICategory[]
  constructor(private p:ProductManager, private c:ChangeDetectorRef){}
  ngOnInit(): void {
      window.scrollTo(0,0);
      this.p.getAllCategories().subscribe(
        (res)=>
        {
          this.categories = res.sort(() => Math.random() - 0.5).slice(0, 19);
          this.c.markForCheck();
        }
      );
  }

}
