import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IProduct } from '../../interfaces/iproduct';
import { ProductManager } from '../../services/product-manager';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
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

ADD() {
    if(!this.product?._id) return;

    this.p.addToCart(this.product._id).subscribe({
        next: (res) => {
            console.log("Added to cart:", res);
            alert("Product added to cart.");

            // تحديث الكارت فورًا
            this.p.getCart().subscribe(cart => {
                console.log("Current Cart:", cart);
            });
        },
        error: (err) => {
            console.error("Failed to add to cart:", err);
            alert("Failed to add to cart. Make sure you are logged in.");
        }
    });
}
}


