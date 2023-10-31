import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductImage } from '../_models/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private url = "http://localhost:8080";
  private route = "/product-image";

  constructor(private http: HttpClient) { }

  updateProductImage(product_image: ProductImage) {
    return this.http.put(this.url + this.route, product_image);
  }
}
