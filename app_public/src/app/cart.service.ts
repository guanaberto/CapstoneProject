import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct, Product } from './bakingbella';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  productBehavior : BehaviorSubject<Product[]>;
  cartMap : Map<string, CartProduct> = new Map<string, CartProduct>();

  constructor() { 
    this.productBehavior = new BehaviorSubject<Product[]>([]);
  }

  //to get the cart values globally
  verifyCart() : Observable<Product[]> {
    this.productBehavior.next(this.items);
    return this.productBehavior.asObservable();
  }
  
  addToCart(product: Product) {
    this.items.push(product);
    
    var actualValue = this.cartMap.get(product._id) ? this.cartMap.get(product._id) : null;
    
    if(actualValue){
      var actualQ = actualValue.quantitySel+1;
      this.cartMap.set(product._id, new CartProduct(product, actualQ, actualQ*product.basePrice));
    }else{
      this.cartMap.set(product._id, new CartProduct(product, 1, product.basePrice));
    }

    console.log(this.cartMap);
  }

  getItems() {
    return this.items;
  }

  getCartMap(){
    return this.cartMap;
  }

  clearCart() {
    this.items = [];
    this.cartMap = new Map<string, CartProduct>();
    this.verifyCart();
    return this.items;
  }
}
