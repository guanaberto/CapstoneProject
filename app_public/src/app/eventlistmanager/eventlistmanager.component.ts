import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { EventUser } from '../bakingbella';
import { BakingBellaVars } from '../bakingbellavars';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-eventlistmanager',
  templateUrl: './eventlistmanager.component.html',
  styleUrls: ['./eventlistmanager.component.css']
})
export class EventlistmanagerComponent implements OnInit {
  displayedColumns: string[] = ['client','name','datetime', 'type', 'status', 'action'];
  dataSource : MatTableDataSource<EventUser>;
  @ViewChild('paginator') paginator : MatPaginator;

    
  constructor(public datepipe: DatePipe, public ns: NotificationService,public bakingBellaService : BakingBellaDataService, public router : Router) {    
  }

  async ngOnInit() {
    //this.dataSource = [];
    await this.bakingBellaService.getEventUsers().then(e => this.dataSource = new MatTableDataSource(e.sort(this.compare)));        
    this.dataSource.paginator = this.paginator
  }

  //Sorter by status
  compare( a, b ) {
    if ( a.event.datetime < b.event.datetime ){
      return 1;
    }
    if ( a.event.datetime > b.event.datetime ){
      return -1;
    }
    return 0;
  }  
  

  async reject(eu : EventUser){
    if(!confirm('Do you want to reject the event??'))
      return;

    var ev = eu.event;
    ev.status = "Rejected";

    await this.bakingBellaService.updateEvent(eu.user._id, ev);

    //Send email to customer 
    const body = encodeURI("<p>Your event request has been <b>Rejected</b>, here the information:</p><p><b>Name: </b>"+ev.name+"<br><b>Date: </b>"+this.datepipe.transform(ev.datetime, 'yyyy-MM-dd hh:mm')+"<br><b>Type: </b>"+ev.type+"<br></p>");
    await this.bakingBellaService.sendEmail(eu.user.username, BakingBellaVars.defaultRejectedEventSubject, body);

    this.ns.success('Event rejected successfully'); 
  }

  async approve(eu : EventUser){
    if(!confirm('Do you want to approve the event??'))
      return;

    var ev = eu.event;
    ev.status = "Approved";

    await this.bakingBellaService.updateEvent(eu.user._id, ev);

    //Send email to customer 
    const body = encodeURI("<p>Your event request has been <b>Approved</b>, here the information:</p><p><b>Name: </b>"+ev.name+"<br><b>Date: </b>"+this.datepipe.transform(ev.datetime, 'yyyy-MM-dd hh:mm')+"<br><b>Type: </b>"+ev.type+"<br></p>");
    await this.bakingBellaService.sendEmail(eu.user.username, BakingBellaVars.defaultApprovedEventSubject, body);

    this.ns.success('Event approved successfully');     
  }
}
