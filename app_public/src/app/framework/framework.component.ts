import { Location, } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  public constructor(private router: Router, private location : Location) { }

  ngOnInit(): void {
  }

  public scroll(str : string):void {
    if(location.pathname==='/'){
      var element = document.getElementById(str);
      element!.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }else{
      this.router.navigate([location.pathname],{fragment: str});  
    }
  }  
}
