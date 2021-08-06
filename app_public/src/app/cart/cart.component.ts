import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from '../auth.service';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { CartProduct, Order, Product, ShoppingList, User } from '../bakingbella';
import { BakingBellaVars } from '../bakingbellavars';
import { CartService } from '../cart.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  displayedColumns: string[] = ['picture','name', 'quantity', 'price', 'totalprice'];
  dataSource : CartProduct[] = [];
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  loggedUser : User;
  couponInvalid : boolean=false;
  couponDiscount : number=0;
  tax : number= 0.13;
  finished : boolean = false;

  @ViewChild("stepper", { static: false }) stepper: MatStepper;

  orderObject : Order = new Order();  

  constructor(private ns:NotificationService, private authService : AuthService, private bakingBellaService : BakingBellaDataService, private cart : CartService, private fb: FormBuilder) { 
    
  }

  async ngOnInit() {
    //redirects if the user is not logged in
    this.authService.verifyLoginRedirectMain();
    //get user information
    var usId = this.authService.getToken();
    await this.bakingBellaService.getSingleUserById(usId).then(u=>this.loggedUser=u);

    var cartmap = this.cart.getCartMap();
    cartmap.forEach((v,k) => {
      this.dataSource.push(v);
    });
    
    //Form
    this.secondFormGroup = this.fb.group({
      country : ['Canada', Validators.required],
      phone : ['', Validators.required],
      email : [this.loggedUser.username, Validators.required],
      cityAddress : ['', Validators.required],
      companyName : [''],
      firstName : [this.loggedUser.firstName, Validators.required],
      lastName : [this.loggedUser.lastName, Validators.required],
      postalCode : ['', Validators.required],
      streetAddress : ['', Validators.required],
      provinceAddress : ['Ontario', Validators.required]
    });

    //Coupon Form
    this.thirdFormGroup = this.fb.group({
      coupon : ['']
    });
  }

  getTotalCost() {
    return this.dataSource.map(t => t.totalPrice).reduce((acc, value) => acc + value, 0);
  }

  getTotalWithTaxes(){
    return this.getTotalCost()*this.tax;
  }

  getTotalWithCoupons(){
    return this.getTotalCost()+this.getTotalWithTaxes()-((this.getTotalCost()+this.getTotalWithTaxes())*this.couponDiscount);
  }

  checkCoupon(){
    this.couponInvalid = false;
    const coupon = this.thirdFormGroup.get('coupon')?.value;
    if(coupon){
      //validate if coupon exists and decide
      if(BakingBellaVars.defaultCoupon===coupon && BakingBellaVars.defaultCouponDueDate>new Date()){
        this.stepper.next()
        this.ns.success("Coupon Added Successfully");
        this.couponDiscount = BakingBellaVars.defaultCouponDiscount;
      }else{
        this.couponInvalid = true;
        this.ns.error("Coupon Invalid");
        this.couponDiscount = 0;
      }
    }else{
      //If no coupon is added, then next step
      this.stepper.next();
      this.couponDiscount = 0;
    }    
  }

  async checkout(){
    if(!confirm('Do you want to submit your order??'))
      return;

    if (this.thirdFormGroup.valid) {
      this.orderObject = new Order();
      this.orderObject.shoppinglists = [];
      this.orderObject.status = "Created";
      this.orderObject.user_id = this.loggedUser._id;
      this.orderObject.datetime = new Date();

      this.orderObject.country = this.secondFormGroup.get('country')?.value;
      this.orderObject.phone = this.secondFormGroup.get('phone')?.value;
      this.orderObject.email = this.secondFormGroup.get('email')?.value;
      this.orderObject.cityAddress = this.secondFormGroup.get('cityAddress')?.value;
      this.orderObject.companyName = this.secondFormGroup.get('companyName')?.value;
      this.orderObject.firstName = this.secondFormGroup.get('firstName')?.value;
      this.orderObject.lastName = this.secondFormGroup.get('lastName')?.value;
      this.orderObject.postalCode = this.secondFormGroup.get('postalCode')?.value;
      this.orderObject.streetAddress = this.secondFormGroup.get('streetAddress')?.value;
      this.orderObject.provinceAddress = this.secondFormGroup.get('provinceAddress')?.value;
      this.orderObject.total = this.getTotalWithCoupons();
      this.orderObject.taxes = this.getTotalWithTaxes();
      

      //Create Order
      await this.bakingBellaService.createOrder(this.orderObject).then(o=>this.orderObject=o);
      
      //Create related shoppinglists
      this.dataSource.forEach(cp => {
        //Decrease the quantity of the actual product
        cp.prod.quantity = cp.prod.quantity - cp.quantitySel;
        if(cp.prod.quantity<0){
          cp.prod.quantity = 0;
        }
        this.bakingBellaService.updateProduct(cp.prod);

        var sl = new ShoppingList();
        sl.product_id = cp.prod._id;
        sl.quantity = cp.quantitySel;
        sl.totalprice = cp.totalPrice;

        //Create Shoppinglists
        this.bakingBellaService.createShoppingList(this.orderObject._id, sl);

      });
      
      //Send email to customer 
      //var body = "<style>#order{font-family:Arial,Helvetica,sans-serif;border-collapse:collapse;width:100%}#order td,#order th{border:1px solid #ddd;padding:8px}#order tr:nth-child(even){background-color:#f2f2f2}#order tr:hover{background-color:#ddd}#order th{padding-top:12px;padding-bottom:12px;text-align:left;background-color:#424242;color:#fff}</style>";
      var body ="<p>Your order request has been Received, here the information:</p>";
      body +="<p><b>First Name: </b>"+this.orderObject.firstName+"<br>";
      body +="<b>Last Name: </b>"+this.orderObject.lastName+"<br>";
      body += this.orderObject.companyName ? "<b>Last Name: </b>"+this.orderObject.companyName+"<br>" : "";
      body +="<b>Country: </b>"+this.orderObject.country+"<br>";
      body +="<b>Street: </b>"+this.orderObject.streetAddress+"<br>";
      body +="<b>City: </b>"+this.orderObject.cityAddress+"<br>";
      body +="<b>Province: </b>"+this.orderObject.provinceAddress+"<br>";
      body +="<b>Postal Code: </b>"+this.orderObject.postalCode+"<br>";
      body +="<b>Phone: </b>"+this.orderObject.phone+"<br>";
      body +="<b>Email: </b>"+this.orderObject.email+"<br></p>";
      
      body +="<table id='order'>";
      body +="<thead>";
      body +="  <tr>";
      //body +="    <th>Picture</th>";
      body +="    <th style='border: 1px solid rgb(221, 221, 221);'>Name</th>";
      body +="    <th style='border: 1px solid rgb(221, 221, 221);'>Quantity</th>";
      body +="    <th style='border: 1px solid rgb(221, 221, 221);'>Price</th>";
      body +="    <th style='border: 1px solid rgb(221, 221, 221);'>Total Price</th>";
      body +="  </tr>";
      body +="</thead>";
      body +="<tbody>";
      
      //for each product
      this.dataSource.forEach(cp => {
        body +="  <tr>";
        //body +="    <td><img src="/assets/pics/redvelvet.jpg"></td>";
        body +="    <td style='border: 1px solid rgb(221, 221, 221);'>"+cp.prod.name+"</td>";
        body +="    <td style='border: 1px solid rgb(221, 221, 221);'>"+cp.quantitySel+"</td>";
        body +="    <td style='border: 1px solid rgb(221, 221, 221);'>$"+cp.prod.basePrice+"</td>";
        body +="    <td style='border: 1px solid rgb(221, 221, 221);'>$"+cp.totalPrice+"</td>";
        body +="  </tr>";      
      });
      
      body +="</tbody>";
      body +="</table>";
      
      body +="<p><b>Subtotal: </b>"+this.getTotalCost().toFixed(2)+"%<br>";
      body +="<b>Taxes("+this.tax*100+"%): </b>"+this.orderObject.taxes.toFixed(2)+"%<br>";
      body +=this.couponDiscount ? "<b>Discount("+this.couponDiscount*100+"%): </b>"+(this.couponDiscount*(this.getTotalCost()+this.getTotalWithTaxes())).toFixed(2)+"%<br>" : "";
      body +="<br><b>Total: </b>"+this.orderObject.total.toFixed(2)+"%</p>";
      
      console.log("Email body: "+body);
      body = encodeURI(body);      
      await this.bakingBellaService.sendEmail(this.orderObject.email, BakingBellaVars.defaultOrderSubject, body);


      this.ns.success("Order created Successfully!");
      this.finished = true;

      this.dataSource = [];
      this.cart.clearCart();
    }
  }
}
