import { Component, OnInit } from '@angular/core';
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
  constructor(private authService : AuthService, private bakingBellaService : BakingBellaDataService) { }

  async ngOnInit() {
    this.authService.verifyLoginRedirectMain();

    this.authService.getType().subscribe(value => console.log(value));
    
    await this.bakingBellaService.getProducts().then(findProducts => this.products = findProducts);

  }

}
