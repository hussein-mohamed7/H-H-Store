import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {loadStripe,Stripe, StripeElements, StripeCardNumberElement, StripeCardCvcElement, StripeCardExpiryElement} from '@stripe/stripe-js'
import { ProductManager } from '../../services/product-manager';
import { Router } from '@angular/router';
@Component({
  selector: 'app-payment-page',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './payment-page.html',
  styleUrl: './payment-page.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class PaymentPage implements OnInit{
  checkoutForm!:FormGroup;
  stripe!:Stripe|null;
  stripeElements!:StripeElements|undefined;
  cardNumber!:StripeCardNumberElement|undefined;
  validNumber:boolean=false;
  cardCVC!:StripeCardCvcElement|undefined;
  validCVC:boolean=false;
  cardDate!:StripeCardExpiryElement|undefined;
  validDate:boolean=false;
  subTotal:number=0;
  total:number=0;
  shipping:number=30;
  tax!:number;
  paymentFailed:boolean=false;
  cartItems: any[] = [];
  constructor(private builder:FormBuilder,private client:HttpClient,private p:ProductManager,private c:ChangeDetectorRef,private router:Router){}
  get expDate()
  {
    return this.checkoutForm.get("expDate");
  }
  get cvv()
  {
    return this.checkoutForm.get("cvv");
  }
  get providence()
  {
    return this.checkoutForm.get("providence");
  }
  get area()
  {
    return this.checkoutForm.get("area");
  }
  get street()
  {
    return this.checkoutForm.get("street");
  }
  get instructions()
  {
    return this.checkoutForm.get("instructions");
  }
  get selectedMethod()
  {
    return this.checkoutForm.get("selectedMethod");
  }
  ngOnInit(): void {

      this.checkoutForm = this.builder.group(
        {
          providence:["",[Validators.required]],
          area:["",[Validators.required]],
          street:["",[Validators.required]],
          instructions:[""],
          selectedMethod:["card"]
        }
      );
      this.calculateTotal();
      this.setupPaymentForm();


  }
  calculateTotal()
  {
     this.p.getCart().subscribe({
      next: (cart: any[]) => {
        this.cartItems = cart;
        this.subTotal = cart.reduce((sum, item) => {
          return sum + (item.quantity || 1) * (item.productId?.price || 0);
        }, 0);
        this.total+=this.subTotal+this.shipping
        this.tax = Number((this.subTotal*0.05).toFixed(2));
        this.subTotal= Number((this.subTotal*0.95).toFixed(2));
        this.c.markForCheck();
      },
      error: (err) => console.error("Failed to load cart:", err)
    });
  };
  async setupPaymentForm()
  {
    // Replace key with value from backend.
      this.stripe = await loadStripe("pk_test_51TA1Uc2KVMsuyWuRfLGu3IBvzvFVtk4PQtW78fGbNL9paoWsN4DcXSS9FHOOb5Mt8YP5cyCiLXzY97NrG5d71Aj600MOa5aFBQ");
      if(this.stripe)
      {
        this.stripeElements = await this.stripe?.elements();
        this.cardNumber = await this.stripeElements?.create("cardNumber");
        this.cardCVC = await this.stripeElements?.create("cardCvc");
        this.cardDate = await this.stripeElements?.create("cardExpiry");

        this.cardNumber?.mount('#stripe-card-number')
        this.cardCVC?.mount('#stripe-card-cvc')
        this.cardDate?.mount('#stripe-card-date')

        this.cardNumber.on("change",(event)=>
        {
          this.validNumber=event.complete;
        });
        this.cardCVC.on("change",(event)=>
        {
          this.validCVC = event.complete;
        });
        this.cardDate.on("change",(event)=>
        {
          this.validDate=event.complete;
        });


        }
  }
  toggleCoD()
  {
    if(this.selectedMethod?.value=="cod")
    {
      this.total+=10;
    }
    else
    {
      this.total-=10;
    }
    this.c.markForCheck();
  }
  pay()
  {
    if(this.selectedMethod?.value=="card")
    {
       this.client.post("http://localhost:8000/checkout",{total:this.total},{withCredentials:true}).subscribe(
        async (res:any)=>
        {
          // Complete Payment
          const result = await this.stripe?.confirmCardPayment(res.secret, {
            payment_method: {
              card: this.cardNumber as StripeCardNumberElement //
            },
          });
          // Fail
          if(result?.error)
          {
            this.paymentFailed=true;
            this.c.markForCheck();
          }
          else // Success
          {
            for(let item of this.cartItems)
            {
                this.p.removeFromCart(item.productId._id).subscribe();
            }
            this.router.navigateByUrl('/');
          }
        }
      )
    }
    else // CoD
    {
        console.log(this.cartItems);
        for(let item of this.cartItems)
        {
            this.p.removeFromCart(item.productId._id).subscribe();
        }
        this.router.navigateByUrl('/');
    }

  }

}
