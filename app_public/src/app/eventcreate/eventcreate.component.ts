import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Event } from '../bakingbella';
import { NotificationService } from '../notification.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventcreate',
  templateUrl: './eventcreate.component.html',
  styleUrls: ['./eventcreate.component.css']
})
export class EventcreateComponent implements OnInit {
  form: FormGroup;
  types: String[] = ['Anniversary','Baby Shower','Birthday','Business','Marriage'];
  minDate: string;
  maxDate: string;
  newEvent : Event = {
    _id:'',
    name:'',
    datetime: new Date(),
    type:'',
    status: 'Pending'
  }
  
  constructor(private authService:AuthService, public datepipe: DatePipe, private ns: NotificationService, public bakingBellaService : BakingBellaDataService, private fb: FormBuilder,public router : Router) { 
    //Date validation times
    const currentDate = new Date();
    this.minDate = this.datepipe.transform(currentDate.setDate(currentDate.getDate()+1), 'yyyy-MM-ddThh:mm');
    this.maxDate = this.datepipe.transform(currentDate.setMonth(currentDate.getMonth()+2), 'yyyy-MM-ddThh:mm');    
    
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: [this.minDate, Validators.required],      
      type: ['', Validators.required]      
    }); 

    
  }

  ngOnInit(): void {
  }

  async onSubmit(){
    if (this.form.valid) {
      const name = this.form.get('name')?.value;
      const date = this.form.get('date')?.value;
      const type = this.form.get('type')?.value;
      
      this.newEvent.name = name;
      this.newEvent.datetime = date;
      this.newEvent.type = type;
      this.newEvent.status = "Pending";

      await this.bakingBellaService.createEvent(this.authService.getToken(), this.newEvent);

      this.ns.success("Event created Successfully");

      this.router.navigate(['/eventlist']);      
    }
  }
}
