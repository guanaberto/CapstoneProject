import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Product, ProductCat, User, Event, ShoppingList} from './bakingbella';

@Injectable({
  providedIn: 'root'
})
export class BakingBellaDataService {
  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api';

  //Product
  public getProducts() : Promise<Product[]>{
    const url: string = `${this.apiBaseUrl}/products/`;
    return this.http.get(url).toPromise().then(response => response as Product[]).catch(this.handleError);
  }
  public getSingleProduct(idProduct) : Promise<Product>{
    const url: string = `${this.apiBaseUrl}/products/${idProduct}`;
    return this.http.get(url).toPromise().then(response => response as Product).catch(this.handleError);
  }

  public updateProduct(editProduct: Product) : Promise<Product>{
    const url: string = `${this.apiBaseUrl}/products/${editProduct._id}`;
    return this.http.put(url,editProduct).toPromise().then(response => response as Product).catch(this.handleError);
  }
  
  public createProduct(newProduct: Product): Promise<void | Product>{
    const url: string = `${this.apiBaseUrl}/products/`;
    return this.http.post(url, newProduct).toPromise().then(response => response as Product).catch(this.handleError);
  }

  public deleteProduct(id) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/products/${id}`;
    return this.http.delete(url).toPromise().then().catch(this.handleError);
  }
  
  //User
  public getUsers() : Promise<User[]>{
    const url: string = `${this.apiBaseUrl}/users/`;
    return this.http.get(url).toPromise().then(response => response as User[]).catch(this.handleError);
  }
  async getSingleUserById(id : string) : Promise<User>{
    const url: string = `${this.apiBaseUrl}/users/${id}`;
    return this.http.get(url).toPromise().then(response => response as User).catch(this.handleError);
  }
  async getSingleUser(username : string, password : string) : Promise<User>{
    const url: string = `${this.apiBaseUrl}/users/${username}/${password}`;
    return this.http.get(url).toPromise().then(response => response[0] as User).catch(this.handleError);
  }

  public updateUser(editUser: User) : Promise<User>{
    const url: string = `${this.apiBaseUrl}/users/${editUser._id}`;
    return this.http.put(url,editUser).toPromise().then(response => response as User).catch(this.handleError);
  }
  
  public createUser(newUser: User): Promise<void | User>{
    const url: string = `${this.apiBaseUrl}/users/`;
    return this.http.post(url, newUser).toPromise().then(response => response as User);/*.catch(this.handleError);*/
  }

  public deleteUser(id) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/users/${id}`;
    return this.http.delete(url).toPromise().then().catch(this.handleError);
  }

  //Event
  public getEvents(userId: string) : Promise<Event[]>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/events/`;
    return this.http.get(url).toPromise().then(response => response as Event[]).catch(this.handleError);
  }
  async getSingleEvent(userId: string, eventId: string) : Promise<Event>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/events/${eventId}`;
    return this.http.get(url).toPromise().then(response => response[0] as Event).catch(this.handleError);
  }

  public updateEvent(userId: string, editEvent: Event) : Promise<Event>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/events/${editEvent._id}`;
    return this.http.put(url,editEvent).toPromise().then(response => response as Event).catch(this.handleError);
  }
  
  public createEvent(userId: string, newEvent: Event): Promise<void | Event>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/events/`;
    return this.http.post(url, newEvent).toPromise().then(response => response as Event).catch(this.handleError);
  }

  public deleteEvent(userId: string, eventId :string) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/users/${userId}/events/${eventId}`;
    return this.http.delete(url).toPromise().then().catch(this.handleError);
  }

  //Shopping List
  public getShoppingList(userId: string) : Promise<ShoppingList[]>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/shoppinglists/`;
    return this.http.get(url).toPromise().then(response => response as ShoppingList[]).catch(this.handleError);
  }
  async getSingleShoppingList(userId: string, shoppingListId: string) : Promise<ShoppingList>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/shoppinglists/${shoppingListId}`;
    return this.http.get(url).toPromise().then(response => response[0] as ShoppingList).catch(this.handleError);
  }

  public updateShoppingList(userId: string, editShoppingList: ShoppingList) : Promise<ShoppingList>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/shoppinglists/${editShoppingList._id}`;
    return this.http.put(url,editShoppingList).toPromise().then(response => response as ShoppingList).catch(this.handleError);
  }
  
  public createShoppingList(userId: string, newShoppingList: ShoppingList): Promise<void | ShoppingList>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/shoppinglists/`;
    return this.http.post(url, newShoppingList).toPromise().then(response => response as ShoppingList).catch(this.handleError);
  }

  public deleteShoppingList(userId: string, shoppingListId :string) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/users/${userId}/shoppinglists/${shoppingListId}`;
    return this.http.delete(url).toPromise().then().catch(this.handleError);
  }


  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong');
    return Promise.reject(error.message || error);
  }
}
