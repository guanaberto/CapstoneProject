import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  images = [
    {path: '../../assets/carouselpics/1.jpg'},
    {path: '../../assets/carouselpics/2.jpg'},
    {path: '../../assets/carouselpics/3.jpg'},
    {path: '../../assets/carouselpics/4.jpg'},
    {path: '../../assets/carouselpics/5.jpg'},
    {path: '../../assets/carouselpics/6.jpg'},
    {path: '../../assets/carouselpics/7.jpg'},
    {path: '../../assets/carouselpics/8.jpg'},
    {path: '../../assets/carouselpics/9.jpg'}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
