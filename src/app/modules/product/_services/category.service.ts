import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../_models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private url = "http://localhost:8080";
  private route = "/category";

  constructor(private http: HttpClient) { }

  createCategory(category: any) {
    return this.http.post(this.url + this.route, category);
  }

  enableCategory(id: number) {
    return this.http.put(this.url + this.route + "/" + id + "/activate", null);
  }

  disableCategory(id: number) {
    return this.http.delete(this.url + this.route + "/" + id);
  }

  getCategories() {
    return this.http.get<Category[]>(this.url + this.route);
  }

  updateCategory(category: any, id: number) {
    return this.http.put(this.url + this.route + "/" + id, category);
  }

  getCategory(id: number) {
    return this.http.get<Category[]>(this.url + this.route + "/" + id);
  }
}
