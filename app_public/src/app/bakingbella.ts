import {Component, OnInit} from '@angular/core';

export class Event{
    _id : string;
    name : string;
    datetime : Date;
    type : string;
    status: string;
}

export class ShoppingList{
    _id : string;
    quantity : number;
    totalprice : number;
    product_id : string;
}

export class User{
    _id : string;
    firstName : string;
    lastName : string;
    password : string;
    DOB : Date;
    type : string;
    username : string;
    events : Event[];
    shoppinglists : ShoppingList[];
}

export class ProductCat{
    _id : string;
    name : string;
}

export class Product {
    _id : string;
    name : string;
    picture : string;
    basePrice : number;
    category : string;
    quantity : number;
}

//Wrapper Object
export class EventUser {
    event : Event;
    user : User;

    constructor (ev:Event, us: User){
        this.event = ev;
        this.user = us;
    }
}