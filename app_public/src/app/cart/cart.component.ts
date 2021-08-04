import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { CartProduct, Order, Product } from '../bakingbella';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  displayedColumns: string[] = ['picture','name', 'quantity', 'price', 'totalprice'];
  dataSource : CartProduct[] = [];
  secondFormGroup: FormGroup;

  orderObject : Order = {
    _id : "",
    datetime : new Date(),
    status : "",
    country : "",
    phone : "",
    email : "",
    user_id : "",
    total : 0,
    taxes : 0,
    cityAddress : "",
    companyName : "",
    firstName : "",
    lastName : "",
    postalCode : "",
    streetAddress : "",
    provinceAddress : "",
    shoppinglists : []
  };
  

  constructor(private bakingBellaService : BakingBellaDataService, private cart : CartService, private fb: FormBuilder) { 

  }

  ngOnInit(): void {
    var cartmap = this.cart.getCartMap();
    cartmap.forEach((v,k) => {
      this.dataSource.push(v);
    });
    
    //Form
    this.secondFormGroup = this.fb.group({
      country : ['', Validators.required],
      phone : ['', Validators.required],
      email : ['', Validators.required],
      cityAddress : ['', Validators.required],
      companyName : [''],
      firstName : ['', Validators.required],
      lastName : ['', Validators.required],
      postalCode : ['', Validators.required],
      streetAddress : ['', Validators.required],
      provinceAddress : ['', Validators.required]
    });
  }

  getTotalCost() {
    return this.dataSource.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  }

  async checkout(){

  }
}
