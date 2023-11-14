import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtoProductList } from '../_dtos/dto-product-list';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080";
  private route = "/product";

  constructor(private http: HttpClient) { }

  createProduct(product: any) {
    return this.http.post(this.url + this.route, product);
  }
  
  enableProduct(id: number) {
    return this.http.put(this.url + this.route + "/" + id + "/activate", null);
  }
  
  disableProduct(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }
  
  getProduct(gtin: string) {
    return this.http.get(this.url + this.route + "/" + gtin);
  }
  
  getActiveProducts() {
    return this.http.get<DtoProductList[]>(this.url + this.route + "/active");
  }
  
  getProducts() {
    return this.http.get<DtoProductList[]>(this.url + this.route);
  }
  
  getProductsByCategory(category_id: number) {
    return this.http.get<DtoProductList[]>(this.url + this.route + "/" + category_id);
  }
  
  updateProduct(product: any, id: number) {
    return this.http.put(this.url + this.route + "/" + id, product);
  }
  
  updateProductStock(gtin: string, stock: number) {
    return this.http.put(this.url + this.route + "/gtin/" + gtin + "/stock/" + stock , null);
  }
}
