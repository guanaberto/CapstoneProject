import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { User } from '../bakingbella';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false; 

  constructor(private fb: FormBuilder,private router: Router,private bakingBellaService : BakingBellaDataService){
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    /*if (await this.authService.checkAuthenticated()) {
      await this.router.navigate([this.returnUrl]);
    }*/
  }

  async onSubmit(): Promise<void>{
    this.loginInvalid = false;
    if (this.form.valid) {
      var us : User;
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      
      await this.bakingBellaService.getSingleUser(username, password).then(foundUser => us = foundUser);
      
      console.log(us);
      if(!us){
        this.loginInvalid = true;
      }else {
        console.log(us.type);
        //TODO Decide where to go
        this.router.navigate(['/shoppinglist']);
      }
    }
  }
}
