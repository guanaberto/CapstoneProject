import {Component, OnInit} from '@angular/core';

export class Event{
    _id : String;
    name : String;
    datetime : Date;
    type : String;
}

export class ShoppingList{
    _id : String;
    quantity : Number;
    totalprice : Number;
    product_id : String;
}

export class User{
    _id : String;
    firstName : String;
    lastName : String;
    password : String;
    DOB : Date;
    type : String;
    username : String;
    events : Event[];
    shoppinglists : ShoppingList[];
}

export class ProductCat{
    _id : String;
    name : String;
}

export class Product {
    _id : String;
    name : String;
    picture : String;
    basePrice : Number;
    category : String;
    quantity : Number;
}