import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  public constructor() { }

  ngOnInit(): void {
  }

  public scroll(str : string):void {
    var element = document.getElementById(str);
    element!.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

}
