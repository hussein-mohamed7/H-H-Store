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
  getByPage(page:number)
  {
    return this.client.get(`http://localhost:8000/products/${page}`);
  }
  delete(id:string | undefined):Observable<any>
  {
    return this.client.delete(`http://localhost:8000/product/${id}`);
  }
}
