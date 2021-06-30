import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { ProductCat } from './bakingbella';

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

  private handleError(error: any): Promise<any>{
    console.error('Something has gone wrong');
    return Promise.reject(error.message || error);
  }
}
