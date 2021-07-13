import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './bakingbella';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: BehaviorSubject<boolean>;
  private type: BehaviorSubject<String>;

  constructor(private router: Router, private ns : NotificationService) { 
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
    this.type = new BehaviorSubject<String>('user');
  }

  verifyLogin() : Observable<boolean> {
    this.isLoggedIn.next(localStorage.getItem('isLoggedIn')==="true");
    return this.isLoggedIn.asObservable();
  }

  verifyLoginRedirectMain(){
    if(!this.verifyLogin()){
      this.router.navigate(['/login']);       
      this.ns.error('You are not logged in');
    }
  }

  getToken(): string{
    return localStorage.getItem("token");
  }

  getType(): Observable<String>{
    return this.type.asObservable();
  }

  login(us: User): void {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", us._id.toString());
    this.isLoggedIn.next(true);
    this.type.next(us.type);
    this.redirect(us);
  }

  redirect(us: User){
    if(us.type==="administrator"){
      this.router.navigate(['/productlist']);//.then(a=>window.location.reload());        
    }else{
      this.router.navigate(['/shoppinglist']);//.then(a=>window.location.reload());        
    }    
  }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");

    this.router.navigate(['/login']);//.then(a=>window.location.reload()); 
    
  } 
}
