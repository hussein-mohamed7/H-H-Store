import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProductManager } from '../../../services/product-manager';
import { IProduct } from '../../../interfaces/iproduct';
import { ICategory } from '../../../interfaces/icategory';

@Component({
  selector: 'app-update-product',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css',
})
export class UpdateProduct implements OnInit{
  adminUpdateProduct!:FormGroup
  categoriesM!:ICategory[];
  categoriesF!:ICategory[];
  product !: IProduct
  id !: string
  constructor(private builder:FormBuilder,private p:ProductManager,private activate:ActivatedRoute,private router:Router){
  }


getID(){
  return this.activate.snapshot.paramMap.get('id')!;
}
  ngOnInit(): void {
      this.adminUpdateProduct = this.builder.group(
        {
          name:["",[Validators.required]],
          price:["",[Validators.required,Validators.pattern("[0-9][0-9]*")]],
          quantity:["",[Validators.required,Validators.pattern("[0-9][0-9]*")]],
          imageURL:["",[Validators.required]],
          category:["",[Validators.required]],
          gender:["",[Validators.required]],
          description:["",[Validators.required]]
        }
      );

      this.id = this.getID();
      this.p.getByID(this.id).subscribe(res=> { this.product=res[0];
            this.adminUpdateProduct.get('name')?.setValue(this.product.name);
            this.adminUpdateProduct.get('price')?.setValue(this.product.price);
            this.adminUpdateProduct.get('quantity')?.setValue(this.product.quantity);
            this.adminUpdateProduct.get('imageURL')?.setValue(this.product.imageURL);
            this.adminUpdateProduct.get('category')?.setValue(this.product.category);
            this.adminUpdateProduct.get('gender')?.setValue(this.product.gender);
            this.adminUpdateProduct.get('description')?.setValue(this.product.description);
      });
      this.p.getAllCategories().subscribe((res)=>
      {
        let categories:ICategory[]=res;
        this.categoriesM = categories.filter((category)=>category.gender=="m");
        this.categoriesF = categories.filter((category)=>category.gender=="f");
      });
  }
   get name()
  {
    return this.adminUpdateProduct.get("name");
  }
  get price()
  {
    return this.adminUpdateProduct.get("price");
  }
  get quantity()
  {
    return this.adminUpdateProduct.get("quantity");
  }
  get imageURL()
  {
    return this.adminUpdateProduct.get("imageURL");
  }
  get category()
  {
    return this.adminUpdateProduct.get("category");
  }
  get gender()
  {
    return this.adminUpdateProduct.get("gender");
  }
  get description()
  {
    return this.adminUpdateProduct.get("description");
  }

  update()
  {

    this.p.update(this.id,this.adminUpdateProduct.value).subscribe(
      (res)=>
      {
        alert("Product updated successfully.");
        this.router.navigate(['/update']);
      }
    );

  }

}
