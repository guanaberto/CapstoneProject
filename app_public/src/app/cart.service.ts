import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './bakingbella';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  productBehavior : BehaviorSubject<Product[]>;

  constructor() { 
    this.productBehavior = new BehaviorSubject<Product[]>([]);
  }

  verifyCart() : Observable<Product[]> {
    this.productBehavior.next(this.items);
    return this.productBehavior.asObservable();
  }
  
  addToCart(product: Product) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
