import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerImage } from '../_models/customer-image';

@Injectable({
  providedIn: 'root'
})
export class CustomerImageService {

  private url = "http://localhost:8080";
  private route = "/customer-image";

  constructor(private http: HttpClient) { }

  updateCustomerImage(customer_image: CustomerImage) {
    return this.http.put(this.url + this.route, customer_image);
  }
}
