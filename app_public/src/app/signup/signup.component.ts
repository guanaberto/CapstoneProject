import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BakingBellaDataService } from '../baking-bella-data.service';
import { Event, ShoppingList, User } from '../bakingbella';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  minDate: Date;
  maxDate: Date;

  form: FormGroup;
  public passwordinvalid = false;  
  
  newevent : Event = {
    _id: '',
    name: '',
    type: '',
    status: '',
    datetime: new Date()
  }
  newshoppinglist : ShoppingList = {
    _id: '',
    quantity : 0,
    totalprice: 0,
    product_id: '',
  }
  newus : User= {
    _id : '',
    firstName : '',
    lastName : '',
    DOB : new Date(),
    username : '',
    password : '',
    type : "user",
    events : [this.newevent]
  }

  
  constructor(private ns: NotificationService, private fb: FormBuilder,private router: Router,private bakingBellaService : BakingBellaDataService) {
    this.form = this.fb.group({
      firstname : ['', Validators.required],
      lastname : [''],
      dob: ['', Validators.required],
      username: ['', Validators.email],
      password: ['', Validators.required],
      passwordconfirm: ['', Validators.required]
    });

    //DOB validation times
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date();
  }

  async ngOnInit(): Promise<void>{    
  }

  async onSubmit(): Promise<void> {
    this.passwordinvalid = false;
    if (this.form.valid) {
      const password = this.form.get('password')?.value;
      const passwordconf = this.form.get('passwordconfirm')?.value;
      if(password!==passwordconf){
        this.passwordinvalid = true;
      }else{
        const firstname = this.form.get('firstname')?.value;
        const lastname = this.form.get('lastname')?.value;
        const dob = this.form.get('dob')?.value;
        const username = this.form.get('username')?.value;
        
        //Create user structure
        this.newus.firstName = firstname;
        this.newus.lastName = lastname;
        this.newus.DOB = dob;
        this.newus.username = username;
        this.newus.password = password;
        this.newus.type = "user";        
        
        //Call the service
        await this.bakingBellaService.createUser(this.newus).catch(error=>this.handleError(error, this.ns));
        this.ns.success('User created successfully'); 
        this.router.navigate(['/login']);    
      }
    }
  }

  public handleError(error: any, ns) : Promise<any>{
    console.error('Something has gone wrong Error: '+error.type);
    ns.error('There is an error on the User creation, try with a different username'); 
    return Promise.reject(error.message || error);
  }
}
