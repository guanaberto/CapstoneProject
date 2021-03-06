import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Product } from '../bakingbella';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {
  displayedColumns: string[] = ['picture','name', 'quantity', 'basePrice', 'category', 'action'];
  dataSource : MatTableDataSource<Product>;
  @ViewChild('paginator') paginator : MatPaginator;

  constructor(public bakingBellaService : BakingBellaDataService, public router : Router) { }

  async ngOnInit(){
    await this.bakingBellaService.getProducts().then(foundProducts => this.dataSource = new MatTableDataSource(foundProducts));    
    this.dataSource.paginator = this.paginator;
  }

  async delete(productid : string){
    if(!confirm('Do you want to delete the product??'))
      return;

    await this.bakingBellaService.deleteProduct(productid);
    //window.location.reload();
    //refresh the products
    await this.bakingBellaService.getProducts().then(foundProducts => this.dataSource = new MatTableDataSource(foundProducts));    
    this.router.navigate(['/productlist/']);
  }

  

  async edit(productid : string){
    this.router.navigate(['/productedit/'+productid]);
  }

  async create(){
    this.router.navigate(['/productedit']);
  }
}
