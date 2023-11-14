import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url = "http://localhost:8080";
  private route = "/cart";

  constructor(private http: HttpClient) { }

  addToCart(cart: any) {
    return this.http.post(this.url + this.route, cart);
  }

  deleteCart(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }

  /* REQUERIMIENTO 4. Implementar servicio Cart - función getCart() */
  getCart() {}

  /* REQUERIMIENTO 4. Implementar servicio Cart - función removeFromCart() */
  removeFromCart() {}
}
