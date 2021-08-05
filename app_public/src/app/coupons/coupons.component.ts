import { Component, OnInit } from '@angular/core';
import { BakingBellaVars } from '../bakingbellavars';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit {
  coupon : string;
  couponDueDate : Date;
  couponDiscount : number;
  constructor() { }

  ngOnInit(): void {
    this.coupon = BakingBellaVars.defaultCoupon;
    this.couponDueDate = BakingBellaVars.defaultCouponDueDate;
    this.couponDiscount = BakingBellaVars.defaultCouponDiscount;
  }

}
