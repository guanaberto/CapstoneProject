import {Component, OnInit} from '@angular/core';

export class Event{
    _id : String;
    name : String;
    datetime : Date;
    type : String;
}

export class ShoppingList{
    quantity : Number;
    totalprice : Number;
    product_id : String;
}

export class User{
    firstName : String;
    lastName : String;
    password : String;
    DOB : Date;
    type : String;
    events : Event[];
    shoppinglists : ShoppingList[];
}

export class ProductCat{
    name : String;
}

export class Product {
    name : String;
    picture : String;
    basePrice : Number;
    category : String;//Check if we could add ProductCat directly
}