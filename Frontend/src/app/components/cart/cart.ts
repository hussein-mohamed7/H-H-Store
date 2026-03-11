import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductManager } from '../../services/product-manager';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  imports: [FormsModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Cart implements OnInit {
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private p: ProductManager, private c: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.p.getCart().subscribe({
      next: (cart: any[]) => {
        this.cartItems = cart;
        this.calculateTotal();
        this.c.markForCheck();
      },
      error: (err) => console.error("Failed to load cart:", err)
    });
  }

  removeItem(index: number) {
    const item = this.cartItems[index];
    this.p.removeFromCart(item.productId._id).subscribe({
      next: () => {
        this.cartItems.splice(index, 1);
        this.calculateTotal();
        this.c.markForCheck();
      },
      error: (err) => console.error(err)
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => {
      return sum + (item.quantity || 1) * (item.productId?.price || 0);
    }, 0);
  }
}