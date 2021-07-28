import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Product } from '../bakingbella';

@Component({
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
})
export class ShoppinglistComponent implements OnInit {
  products : Product[];
  originalProducts : Product[];

  constructor(private authService : AuthService, private bakingBellaService : BakingBellaDataService, private route : ActivatedRoute) { }

  async ngOnInit() {
    this.authService.verifyLoginRedirectMain();

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
}
