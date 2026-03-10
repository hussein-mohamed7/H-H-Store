import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductManager } from '../../services/product-manager';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ProductDetails implements OnInit {
  product !: IProduct;
  constructor(private p:ProductManager,private activate:ActivatedRoute, private c:ChangeDetectorRef){}
getID(){
  return this.activate.snapshot.paramMap.get('id')!;
}
  ngOnInit(): void {
    const id = this.getID();
    this.p.getByID(id).subscribe(res=> {
      this.product=res[0];
      this.c.markForCheck();
      console.log(this.product);
  });
  }
}

