import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartProduct, Product } from './bakingbella';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  counterBehavior : BehaviorSubject<number>;
  cartMap : Map<string, CartProduct> = new Map<string, CartProduct>();

  constructor() { 
    this.counterBehavior = new BehaviorSubject<number>(0);
  }

  //to get the cart number globally
  verifyCart() : Observable<number>{
    return this.counterBehavior.asObservable();
  }

  verifyProduct(id : string):number{
    var productInMap = this.cartMap.get(id);
    if(productInMap){
      return productInMap.quantitySel;
    }else{
      return 0;
    }
  }
  
  addToCart(product: Product) {
    this.counterBehavior.next(this.counterBehavior.getValue()+1);
    
    var actualValue = this.cartMap.get(product._id) ? this.cartMap.get(product._id) : null;
    
    if(actualValue){
      var actualQ = actualValue.quantitySel+1;
      this.cartMap.set(product._id, new CartProduct(product, actualQ, actualQ*product.basePrice));
    }else{
      this.cartMap.set(product._id, new CartProduct(product, 1, product.basePrice));
    }
  }

  removeFromCart(product: Product){
    this.counterBehavior.next(this.counterBehavior.getValue()-1);
    
    var productInMap = this.cartMap.get(product._id);
    
    if(productInMap.quantitySel===1){
      this.cartMap.delete(product._id);
    }else{
      productInMap.quantitySel = productInMap.quantitySel-1;
      productInMap.totalPrice = productInMap.quantitySel*product.basePrice;
      this.cartMap.set(product._id,productInMap);
    }

    console.log(this.cartMap);
  }

  getCartMap(){
    return this.cartMap;
  }

  clearCart() {
    this.cartMap = new Map<string, CartProduct>();
    this.counterBehavior.next(0);
    this.verifyCart();
    return this.cartMap;
  }
}
