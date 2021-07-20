import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { User } from '../bakingbella';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid = false; 

  constructor(private ns: NotificationService, private fb: FormBuilder,private router: Router,private bakingBellaService : BakingBellaDataService, private authService:AuthService){
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    //If the user is logged in, redirect to the main page of the user type
    if(this.authService.verifyLogin() && this.authService.getToken()){
      var us : User;
      await this.bakingBellaService.getSingleUserById(this.authService.getToken()).then(foundUser => us = foundUser);
      this.authService.redirect(us);
    }
  }

  async onSubmit(): Promise<void>{
    this.loginInvalid = false;
    
    if (this.form.valid) {
      var us : User;
      const username = this.form.get('username')?.value;
      const password = this.form.get('password')?.value;
      
      await this.bakingBellaService.getSingleUser(username, password).then(foundUser => us = foundUser);
      
      if(!us){
        this.loginInvalid = true;
        this.ns.error('Login Invalid');        
      }else{
        this.ns.success('Login successful');  

        this.authService.login(us);
      }
    }
  }
}
