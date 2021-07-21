import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { BakingBellaVars } from '../bakingbellavars';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private bakingBellaService : BakingBellaDataService, private ns : NotificationService) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.email],     
      message: ['', Validators.required]     
    }); 
  }

  ngOnInit(): void {
  }

  async onSubmit(){
    if (this.form.valid) {
      if(!confirm('Do you want to send the message??'))
        return;

      const name = this.form.get('name')?.value;
      const email = this.form.get('email')?.value;
      const message = this.form.get('message')?.value;

      const body = encodeURI("<p>A new contact form message has been received, here the details:</p><b>Name: </b>"+name+"<br><b>Email: </b>"+email+"<br><p><b>Message: </b>"+message+"</p>");

      await this.bakingBellaService.sendEmail(BakingBellaVars.defaultEmail, BakingBellaVars.defaultContactSubject, body);
      
      this.ns.success('Thank you for contacting Us!'); 
      //Empty the fields
      this.form.get("name").setValue("");   
      this.form.get("email").setValue("");   
      this.form.get("message").setValue("");     
    }
  }
}
