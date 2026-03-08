import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Card } from '../card/card';
import { ProductManager } from '../../services/product-manager';
import { IProduct } from '../../interfaces/iproduct';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vertical-card-slider',
  imports: [Card,RouterModule],
  templateUrl: './vertical-card-slider.html',
  styleUrl: './vertical-card-slider.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class VerticalCardSlider implements OnInit {
  products = signal<IProduct[]>([]);
  page:number=0;
  constructor(private p:ProductManager,private c:ChangeDetectorRef){}
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts():void
  {
    this.p.getByPage(this.page).subscribe((res)=>
      {
        let newProducts = res as IProduct[];
        this.products.update((p)=>[...p,...newProducts]);
        this.page++;
      });
  }
}
