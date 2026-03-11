import { Injectable } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductManager {
  constructor(private client:HttpClient){}
  add(product:IProduct):Observable<any>
  {
    return this.client.post("http://localhost:8000/addProduct",{product:product});
  }
  getAll():Observable<any>
  {
    return this.client.get("http://localhost:8000/products");
  }
  getAllCategories():Observable<any>
  {
    return this.client.get("http://localhost:8000/categories");
  }

  getByPage(page:number,query:string="",minPrice:number=0,maxPrice:number=5000)
  {
    return this.client.post(`http://localhost:8000/products`,{page,query,minPrice,maxPrice});
  }
  getByCategory(page:number,category:string,gender:string,minPrice:number=0,maxPrice:number=5000)
  {
    return this.client.post(`http://localhost:8000/products-by-category`,{page,category,gender,minPrice,maxPrice});
  }
  getByID(id:string | undefined):Observable<any>
  {
    return this.client.get(`http://localhost:8000/product/${id}`);
  }
  delete(id:string | undefined):Observable<any>
  {
    return this.client.delete(`http://localhost:8000/product/${id}`);
  }
  update(id:string | undefined,product:IProduct):Observable<any>
  {
    return this.client.put(`http://localhost:8000/update/product/${id}`,{product:product});
  }


  // For cart
addToCart(id:string)
{
  return this.client.post(`http://localhost:8000/cart/${id}`,{},{
    withCredentials:true
  });
}

getCart(): Observable<any> {
    return this.client.get("http://localhost:8000/cart", { withCredentials: true });
}

removeFromCart(id:string)
{
  return this.client.delete(`http://localhost:8000/cart/${id}`,{
    withCredentials:true
  });
}


}
