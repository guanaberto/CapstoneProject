import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route : ActivatedRoute) { }

  ngOnInit(): void {
    /*var container = document.getElementById('matsidenavcontent'); 
    this.route.fragment.subscribe((fragment: string) => 
    {
      var container = document.getElementById(fragment); 
      container.scrollTo({
        top: container.offsetTop,
        behavior: 'smooth'
      });
      console.log('Holi' + fragment);  
    })*/
  }
}
