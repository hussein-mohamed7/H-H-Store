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
}
