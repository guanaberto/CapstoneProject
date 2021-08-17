import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RouterEvent } from '@angular/router';
import { AuthService } from '../auth.service';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { CartProduct, Order, Product } from '../bakingbella';
import { OrdermanagerDialog } from '../ordermanager/ordermanager.component';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  displayedColumns: string[] = ['name','datetime', 'total', 'status'];
  dataSource : Order[];
  mapProducts : Map<string, Product> = new Map<string, Product>();

  constructor(public dialog: MatDialog,private authService:AuthService, public bakingBellaService : BakingBellaDataService) { }

  async ngOnInit(){
    await this.bakingBellaService.getOrdersByUser(this.authService.getToken()).then(foundOrders => this.dataSource = foundOrders);   
    this.dataSource.sort(this.compare);

    //generate map of products
    this.dataSource.forEach(ds=>{
      ds.shoppinglists.forEach(sl=>{
        //check the values in the db and add it to the map of products
        this.bakingBellaService.getSingleProduct(sl.product_id).then(p=>{
          this.mapProducts.set(p._id, p);
        });
      });
    });
  }

  //Sorter by status
  compare( a, b ) {
    if ( a.datetime < b.datetime ){
      return 1;
    }
    if ( a.datetime > b.datetime ){
      return -1;
    }
    return 0;
  }  

  openDialog (o : Order) {
    this.dialog.open(OrdermanagerDialog, {
      width: '80%',
      data: { order : o, map : this.mapProducts },
    });
  }
}