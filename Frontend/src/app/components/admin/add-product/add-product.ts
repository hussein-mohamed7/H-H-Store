import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IProduct } from '../../../interfaces/iproduct';
import { ProductManager } from '../../../services/product-manager';
import { ICategory } from '../../../interfaces/icategory';


@Component({
  selector: 'app-add-product',
  imports: [RouterModule,ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct implements OnInit {
  adminAddProduct!:FormGroup;
  categoriesM!:ICategory[];
  categoriesF!:ICategory[];
  constructor(private builder:FormBuilder,private p:ProductManager){}

  ngOnInit(): void {
      this.adminAddProduct = this.builder.group(
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
      this.p.getAllCategories().subscribe((res)=>
      {
        let categories:ICategory[]=res;
        this.categoriesM = categories.filter((category)=>category.gender=="m");
        this.categoriesF = categories.filter((category)=>category.gender=="f");
      });
  }

  get name()
  {
    return this.adminAddProduct.get("name");
  }
  get price()
  {
    return this.adminAddProduct.get("price");
  }
  get quantity()
  {
    return this.adminAddProduct.get("quantity");
  }
  get imageURL()
  {
    return this.adminAddProduct.get("imageURL");
  }
  get category()
  {
    return this.adminAddProduct.get("category");
  }
  get gender()
  {
    return this.adminAddProduct.get("gender");
  }
  get description()
  {
    return this.adminAddProduct.get("description");
  }

  add()
  {
    const product:IProduct = {name:this.name?.value,price:this.price?.value,quantity:this.quantity?.value,
                    imageURL:this.imageURL?.value,category:this.category?.value,gender:this.gender?.value,description:this.description?.value};
    this.p.add(product).subscribe(
      (res)=>
      {
        console.log(res);
      }
    );

  }
}
