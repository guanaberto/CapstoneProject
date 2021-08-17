import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { CartProduct, Order, Product } from '../bakingbella';
import { BakingBellaVars } from '../bakingbellavars';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-ordermanager',
  templateUrl: './ordermanager.component.html',
  styleUrls: ['./ordermanager.component.css']
})
export class OrdermanagerComponent implements OnInit {
  displayedColumns: string[] = ['name','datetime', 'total', 'status', 'action'];
  dataSource : MatTableDataSource<Order>;
  mapProducts : Map<string, Product> = new Map<string, Product>();
  @ViewChild('paginator') paginator : MatPaginator;

  constructor(public dialog: MatDialog, public ns: NotificationService,public bakingBellaService : BakingBellaDataService, public router : Router) 
  { }

  async ngOnInit() {
    await this.bakingBellaService.getOrders().then(o => this.dataSource = new MatTableDataSource(o.sort(this.compare)));        
    this.dataSource.paginator = this.paginator;

    //generate map of products
    this.dataSource.data.forEach(ds=>{
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

  async complete(o : Order){
    if(!confirm('Do you want to mark this order as completed??'))
      return;

    o.status = "Complete";
    await this.bakingBellaService.updateOrder(o);

    //Send email to customer 
    var body ="<p>Your order request has been Completed, here the information:</p>";
    body +="<p><b>First Name: </b>"+o.firstName+"<br>";
    body +="<b>Last Name: </b>"+o.lastName+"<br>";
    body += o.companyName ? "<b>Last Name: </b>"+o.companyName+"<br>" : "";
    body +="<b>Country: </b>"+o.country+"<br>";
    body +="<b>Street: </b>"+o.streetAddress+"<br>";
    body +="<b>City: </b>"+o.cityAddress+"<br>";
    body +="<b>Province: </b>"+o.provinceAddress+"<br>";
    body +="<b>Postal Code: </b>"+o.postalCode+"<br>";
    body +="<b>Phone: </b>"+o.phone+"<br>";
    body +="<b>Email: </b>"+o.email+"<br></p>";
    
    
    body +="<p><b>Taxes: </b>"+o.taxes.toFixed(2)+"%<br>";
    body +="<b>Total: </b>"+o.total.toFixed(2)+"%</p>";
    
    body = encodeURI(body);
    await this.bakingBellaService.sendEmail(o.email, BakingBellaVars.defaultOrderCompleteSubject, body);

    this.ns.success('Order Completed successfully');     
  }
}


//Dialogbox class 
@Component({
  selector: 'ordermanager-dialog',
  templateUrl: 'ordermanager-dialog.html',
})
export class OrdermanagerDialog {
  displayedColumns: string[] = ['picture','name', 'quantity', 'price','total'];
  dataProd : CartProduct[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: {order: Order, map : Map<string, Product>}, public dialogRef: MatDialogRef<OrdermanagerDialog>, public bakingbellaservice : BakingBellaDataService) {
    
  } 
  
  async ngOnInit(){
    this.dataProd = [];
    
    this.data.order.shoppinglists.forEach(sl=>{
      this.dataProd.push(new CartProduct(this.data.map.get(sl.product_id),sl.quantity, sl.totalprice));
    });    
  }
}