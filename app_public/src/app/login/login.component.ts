import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private _sb: MatSnackBar, private fb: FormBuilder,private router: Router,private bakingBellaService : BakingBellaDataService){
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
        this._sb.open('Login Invalid','', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });        
      }else {
        console.log(us.type);
        //TODO Decide where to go (also remember to set the SessionStorage variable)
        this._sb.open('Login successful','', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });  
        this.router.navigate(['/shoppinglist']);        
      }
    }
  }
}
