import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductImage } from '../_models/product-image';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

  private url = "http://localhost:8080";
  private route = "/product-image";  // Ruta para actualizar la imagen de producto

  constructor(private http: HttpClient) { }

  uploadProductImage(productImage: ProductImage) {
    return this.http.post(`${this.url}${this.route}`, productImage);
  }

  getProductImage(productId: number) {
    const apiUrl = `${this.url}/${this.route}/${productId}`;
    return this.http.get<ProductImage[]>(apiUrl); 
  }

}
