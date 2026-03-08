import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ProductManager } from '../../services/product-manager';

@Component({
  selector: 'app-delete-card',
  imports: [],
  templateUrl: './deletecard.html',
  styleUrl: './deletecard.css',
})
export class Deletecard {
    constructor(private p:ProductManager,private c:ChangeDetectorRef){}

  @Input() cardImg!:string;
  @Input() cardText!:string;
  @Input() cardId!:string | undefined
    deleteProduct():void
  {
    const result = confirm("Are you sure you want to delete this product?");
    if(result == true){
    this.p.delete(this.cardId).subscribe((res)=>
      {
        console.log(res);
        alert("Product deleted successfully.");
        window.location.reload();
      });
    }
  }
}
