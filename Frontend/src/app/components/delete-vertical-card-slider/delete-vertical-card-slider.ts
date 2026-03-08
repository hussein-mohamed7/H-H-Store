import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
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
