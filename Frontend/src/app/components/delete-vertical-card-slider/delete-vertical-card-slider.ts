import { ChangeDetectorRef, Component, Input, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../interfaces/iproduct';
import { ProductManager } from '../../services/product-manager';
import { Deletecard } from '../deletecard/deletecard';

@Component({
  selector: 'app-delete-slider',
  imports: [RouterModule,Deletecard],
  templateUrl: './delete-vertical-card-slider.html',
  styleUrl: './delete-vertical-card-slider.css',
})
export class DeleteCardSlider implements OnInit {
  @Input() query:string="";
 products = signal<IProduct[]>([]);
  productCount!:number;
  page:number=0;
  constructor(private p:ProductManager,private c:ChangeDetectorRef){}
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts():void
  {
    this.p.getByPage(this.page,this.query).subscribe((res)=>
      {
        let newProducts = res as any;
        this.products.update((p)=>[...p,...newProducts.products]);
        this.productCount=newProducts.count;
        this.page++;
      });
  }
  resetPages()
  {
    this.page=0;
    this.productCount=0;
    this.products.set([]);
    this.loadProducts();
  }
}
