import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Product } from '../bakingbella';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-productedit',
  templateUrl: './productedit.component.html',
  styleUrls: ['./productedit.component.css']
})
export class ProducteditComponent implements OnInit {
  form: FormGroup;
  cats: String[] = ['Cakes','Cookies','Donuts','Bread','Pizza','Shakes'];
  editP : Product = {
    _id:'',
    name:'',
    category: '',
    basePrice : 0,
    picture: '',
    quantity: 0
  };

  constructor(private ns: NotificationService, public bakingBellaService : BakingBellaDataService, private fb: FormBuilder,private router: Router, private route : ActivatedRoute) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],      
      quantity: ['', Validators.required],
      baseprice: ['', Validators.required],    
      picture: ['', Validators.required]      
    }); 
  }

  async ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id){
      //is Edit
      await this.bakingBellaService.getSingleProduct(id).then(foundProducts => this.editP = foundProducts);    
      
      this.form.controls['name'].setValue(this.editP.name);
      this.form.controls['baseprice'].setValue(this.editP.basePrice);
      this.form.controls['category'].setValue(this.editP.category);
      this.form.controls['picture'].setValue(this.editP.picture);
      this.form.controls['quantity'].setValue(this.editP.quantity);
    }
  }

  async onSubmit(){
    if (this.form.valid) {
      /*const password = this.form.get('password')?.value;
      const passwordconf = this.form.get('passwordconfirm')?.value;*/
      const name = this.form.get('name')?.value;
      const baseprice = this.form.get('baseprice')?.value;
      const category = this.form.get('category')?.value;
      const picture = this.form.get('picture')?.value;
      const quantity = this.form.get('quantity')?.value;
      
      //Create user structure
      this.editP.name = name;
      this.editP.basePrice = baseprice;
      this.editP.category = category;
      this.editP.picture = picture;
      this.editP.quantity = quantity;
      
      console.log(this.editP._id);
      if(this.editP._id){
        //is an edit
        await this.bakingBellaService.updateProduct(this.editP);
        this.ns.success('Product updated successfully'); 
      }else{
        //is new
        await this.bakingBellaService.createProduct(this.editP);
        this.ns.success('Product created successfully'); 
      }
      this.router.navigate(['/productlist']);          
    }
  }
}
