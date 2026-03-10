import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, signal } from '@angular/core';
import { Card } from '../card/card';
import { ProductManager } from '../../services/product-manager';
import { IProduct } from '../../interfaces/iproduct';
import { Subject, takeUntil } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vertical-card-slider',
  imports: [Card,RouterModule],
  templateUrl: './vertical-card-slider.html',
  styleUrl: './vertical-card-slider.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class VerticalCardSlider implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @Input() query:string="";
  @Input() gender:string="";
  @Input() cardRouteBaseLink!:string;
  products = signal<IProduct[]>([]);
  page:number=0;
  sortType:number=0;
  constructor(private p:ProductManager,private c:ChangeDetectorRef){}
  ngOnInit(): void {
    this.loadProducts();
  }
  loadProducts():void
  {
    console.log(this.page);
    console.log(this.query);
    console.log(this.gender);
    if(this.gender=="")
    {
      this.p.getByPage(this.page,this.query)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res)=>
        {
          let newProducts = res as IProduct[];
          this.products.update((p)=>[...p,...newProducts]);
          this.page++;
          this.sort();
          console.log(this.products())
        });
    }
    else
    {
      this.p.getByCategory(this.page,this.query,this.gender)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res)=>
      {
          console.log("searching by category.");
          let newProducts = res as IProduct[];
          this.products.update((p)=>[...p,...newProducts]);
          this.page++;
          this.sort();
          console.log(this.products())
      })
    }


  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  changeSortType(type:number)
  {
    this.sortType=type;
    this.sort();
  }
  sort()
  {
    if(this.sortType==1) // Highest to lowest
    {
      console.log("sorting highest to lowest");
      this.products.update((p)=>{return p.sort((a,b)=>{return b.price-a.price});})
      this.c.markForCheck();
    }
    else if (this.sortType==2) // Lowest to highest
    {
      this.products.update((p)=>{return p.sort((a,b)=>{return a.price-b.price});})
      this.c.markForCheck();
    }

  }
}
