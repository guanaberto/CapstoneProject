import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Product } from '../bakingbella';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  products : Product[];
  originalProducts : Product[];

  constructor(public dialog: MatDialog, private authService : AuthService, private bakingBellaService : BakingBellaDataService, private route : ActivatedRoute) { }

  async ngOnInit() {
    await this.bakingBellaService.getProducts().then(findProducts => this.originalProducts = findProducts);
    
    //Get filter parameters
    const cat = this.route.snapshot.paramMap.get('cat');
    
    if(cat){
      //Filtered results
      this.products = this.originalProducts.filter(d=> d.category.toLowerCase() == cat.toLowerCase());
    }else{
      //unfiltered results
      this.products = this.originalProducts;      
    } 
  }

  openDialog (p : Product) {
    this.dialog.open(ShoppinglistDialog, {
      data: p
    });
  }
}

//Dialogbox class
@Component({
  selector: 'shoppinglist-dialog',
  templateUrl: 'shoppinglist-dialog.html',
})
export class ShoppinglistDialog {
  form: FormGroup;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Product, private fb : FormBuilder, public dialogRef: MatDialogRef<ShoppinglistDialog>, private cart : CartService) {
    
    this.form = this.fb.group({
      quantity: [1, Validators.required]
    });
  }  

  addtocart(){
    if (this.form.valid) {
      const quantity = this.form.get('quantity')?.value;
      
      for(var i=0; i<quantity; i++){
        this.cart.addToCart(this.data);
      }

      this.dialogRef.close();
    }
  }
}
