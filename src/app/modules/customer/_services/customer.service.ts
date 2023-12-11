import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DtoCustomerList } from '../_dtos/dto-customer-list';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url = "http://localhost:8080";
  private route = "/customer";

  constructor(private http: HttpClient) { }

  createCustomer(customer: any) {
    return this.http.post(this.url + this.route, customer);
  }

  enableCustomer(id: number) {
    return this.http.put(this.url + this.route + "/" + id + "/activate", null);
  }

  disableCustomer(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }

  getCustomer(rfc: string) {
    return this.http.get(this.url + this.route + "/" + rfc);
  }

  getCustomers() {
    return this.http.get<DtoCustomerList[]>(this.url + this.route);
  }

  updateCustomer(customer: any, id: number) {
    return this.http.put(this.url + this.route + "/" + id, customer);
  }
}
