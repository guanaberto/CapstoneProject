import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Product, ProductCat, User } from './bakingbella';

@Injectable({
  providedIn: 'root'
})
export class BakingBellaDataService {
  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api';

  //ProductCat
  public getProductCats() : Promise<ProductCat[]>{
    const url: string = `${this.apiBaseUrl}/productcats/`;
    return this.http.get(url).toPromise().then(response => response as ProductCat[]).catch(this.handleError);
  }
  public getSingleProductCat(idProductCat) : Promise<ProductCat>{
    const url: string = `${this.apiBaseUrl}/productcats/${idProductCat}`;
    return this.http.get(url).toPromise().then(response => response as ProductCat).catch(this.handleError);
  }

  public updateProductCat(editProductCat: ProductCat) : Promise<ProductCat>{
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
  }
  
  //User
  public getUsers() : Promise<User[]>{
    const url: string = `${this.apiBaseUrl}/users/`;
    return this.http.get(url).toPromise().then(response => response as User[]).catch(this.handleError);
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
    return this.http.post(url, newUser).toPromise().then(response => response as User).catch(this.handleError);
  }

  public deleteUser(id) : Promise<void> {
    const url: string = `${this.apiBaseUrl}/users/${id}`;
    return this.http.delete(url).toPromise().then().catch(this.handleError);
  }

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong');
    return Promise.reject(error.message || error);
  }
}
