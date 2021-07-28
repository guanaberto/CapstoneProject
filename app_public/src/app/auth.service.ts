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
  private isAdmin: BehaviorSubject<boolean>;

  constructor(private router: Router, private ns : NotificationService) { 
    this.isLoggedIn = new BehaviorSubject<boolean>(false);
    this.isAdmin = new BehaviorSubject<boolean>(false);
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

  verifyAdmin(): Observable<boolean>{
    this.isAdmin.next(localStorage.getItem('isAd')==="administrator" ? true : false);
    return this.isAdmin.asObservable();
  }

  login(us: User): void {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("token", us._id.toString());
    localStorage.setItem("isAd", ""+us.type);
    this.isLoggedIn.next(true);
    this.isAdmin.next(us.type==="administrator" ? true : false);

    this.redirect(us);
  }

  redirect(us: User){
    if(us.type==="administrator"){
      this.router.navigate(['/productlist']);
    }else{
      this.router.navigate(['/shoppinglist']);
    }    
  }

  logout(): void {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("token");
    localStorage.removeItem("isAd");
      
    this.verifyAdmin();

    this.router.navigate(['/login']);
    
  } 
}
