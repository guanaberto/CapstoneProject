import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Event } from '../bakingbella';

@Component({
  selector: 'app-eventlist',
  templateUrl: './eventlist.component.html',
  styleUrls: ['./eventlist.component.css']
})
export class EventlistComponent implements OnInit {
  displayedColumns: string[] = ['name','datetime', 'type'];
  dataSource : Event[];

  
  constructor(private authService:AuthService, public bakingBellaService : BakingBellaDataService, public router : Router) {

  }

  async ngOnInit() {
    await this.bakingBellaService.getSingleUserById(this.authService.getToken()).then(foundUser => this.dataSource = foundUser.events);   
    console.log(this.authService.getToken());
    console.log(this.dataSource);
  }

  async create(){
    this.router.navigate(['/eventcreate']);
  }
}
