import { Location, ViewportScroller, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  public constructor(private scroller: ViewportScroller, private router: Router, private location : Location, private authService : AuthService) { 
    
  }

  ngOnInit(): void {
    this.authService.verifyLogin().subscribe(value => this.isLoggedIn=value);    
    this.authService.verifyAdmin().subscribe(value => this.isAdmin=value);
  }

  public scroll(str : string) : void{
    if(location.pathname==='/' || str==='top'){
      var element = document.getElementById(str);
      
      var container = document.getElementById('matsidenavcontent'); 
      container.scrollTo({
                          top: element.offsetTop,
                          behavior: 'smooth'
                        });
    }else{
      this.router.navigate(['/'],{fragment: str});  
    }
  }  

  public logout(){
    if(!confirm('Do you want to close your session??'))
      return;
    
    this.authService.logout(); 
  }
}
