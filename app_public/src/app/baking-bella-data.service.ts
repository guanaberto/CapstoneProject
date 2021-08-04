import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Product, /*ProductCat*/Order, User, Event, ShoppingList, EventUser} from './bakingbella';

@Injectable({
  providedIn: 'root'
})
export class BakingBellaDataService {
  private apiBaseUrl;

  constructor(private http: HttpClient) {
    //Solve heroku problems with API
    if(window.location.hostname==="localhost"){
      this.apiBaseUrl = 'http://localhost:3000/api';
    }else{
      this.apiBaseUrl = window.location.origin+"/api";
    }
  }

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

  //Product Categories
  /*public getProductCats() : Promise<ProductCat[]>{
    const url: string = `${this.apiBaseUrl}/productcats/`;
    return this.http.get(url).toPromise().then(response => response as ProductCat[]).catch(this.handleError);
  }
  public getSingleProductCat(idProductCat) : Promise<ProductCat>{
    const url: string = `${this.apiBaseUrl}/productcats/${idProductCat}`;
    return this.http.get(url).toPromise().then(response => response as ProductCat).catch(this.handleError);
  }

  public updateProductCat(editProductCat: ProductCat) : Promise<Product>{
    const url: string = `${this.apiBaseUrl}/productcats/${editProductCat._id}`;
    return this.http.put(url,editProductCat).toPromise().then(response => response as ProductCat).catch(this.handleError);
  }
  
  public createProductCat(newProductCat: ProductCat): Promise<void | ProductCat>{
    const url: string = `${this.apiBaseUrl}/productcats/`;
    return this.http.post(url, newProductCat).toPromise().then(response => response as ProductCat).catch(this.handleError);
  }

  public deleteProductCat(id) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/productcats/${id}`;
    return this.http.delete(url).toPromise().then().catch(this.handleError);
  }*/
  
  //Orders
  public getOrders() : Promise<Order[]>{
    const url: string = `${this.apiBaseUrl}/orders/`;
    return this.http.get(url).toPromise().then(response => response as Order[]).catch(this.handleError);
  }
  public getSingleOrder(idOrder) : Promise<Order>{
    const url: string = `${this.apiBaseUrl}/orders/${idOrder}`;
    return this.http.get(url).toPromise().then(response => response as Order).catch(this.handleError);
  }

  public updateOrder(editOrder: Order) : Promise<Order>{
    const url: string = `${this.apiBaseUrl}/orders/${editOrder._id}`;
    return this.http.put(url,editOrder).toPromise().then(response => response as Order).catch(this.handleError);
  }
  
  public createOrder(newOrder: Order): Promise<void | Order>{
    const url: string = `${this.apiBaseUrl}/orders/`;
    return this.http.post(url, newOrder).toPromise().then(response => response as Order).catch(this.handleError);
  }

  public deleteOrder(id) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/orders/${id}`;
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
  async getEventUsers() : Promise<EventUser[]>{
    const url: string = `${this.apiBaseUrl}/users`;
    return this.http.get(url).toPromise().then(response => this.getEv(response as User[])).catch(this.handleError);
  }

  dataSource : EventUser[];
  
  getEv(us : User[]) : EventUser[]{
    this.dataSource = [];
    us.forEach(
      u => u.events.forEach(
          e => {
            this.dataSource.push(new EventUser(e,u));          
          }
      )
    );
    return this.dataSource;
  }

  async getSingleEvent(userId: string, eventId: string) : Promise<Event>{
    const url: string = `${this.apiBaseUrl}/users/${userId}/events/${eventId}`;
    return this.http.get(url).toPromise().then(response => response[0] as Event).catch(this.handleError);
  }

  public updateEvent(userId: String, editEvent: Event) : Promise<Event>{
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
  async getSingleShoppingList(orderId: string, shoppingListId: string) : Promise<ShoppingList>{
    const url: string = `${this.apiBaseUrl}/orders/${orderId}/shoppinglists/${shoppingListId}`;
    return this.http.get(url).toPromise().then(response => response[0] as ShoppingList).catch(this.handleError);
  }

  public updateShoppingList(orderId: string, editShoppingList: ShoppingList) : Promise<ShoppingList>{
    const url: string = `${this.apiBaseUrl}/orders/${orderId}/shoppinglists/${editShoppingList._id}`;
    return this.http.put(url,editShoppingList).toPromise().then(response => response as ShoppingList).catch(this.handleError);
  }
  
  public createShoppingList(orderId: string, newShoppingList: ShoppingList): Promise<void | ShoppingList>{
    const url: string = `${this.apiBaseUrl}/orders/${orderId}/shoppinglists/`;
    return this.http.post(url, newShoppingList).toPromise().then(response => response as ShoppingList).catch(this.handleError);
  }

  public deleteShoppingList(orderId: string, shoppingListId :string) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/orders/${orderId}/shoppinglists/${shoppingListId}`;
    return this.http.delete(url).toPromise().then().catch(this.handleError);
  }

  //Email Service
  public sendEmail(to: String, subject: string, body: string) : Promise<string>{
    const url: string = `${this.apiBaseUrl}/email/${to}/${subject}/${body}`;
    return this.http.get(url).toPromise().then(response => response as string).catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong');
    return Promise.reject(error.message || error);
  }
}
