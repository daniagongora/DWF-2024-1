import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category'; // Importa la clase Category

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = []; // Declarar un arreglo de objetos Category

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    // Agrega tres objetos Category con datos dummy al arreglo categories
    let category1 = new Category(1087, 50192404, 'Fluffy', 'Sent');
    let category2 = new Category(3456, 50182002, 'Butter', 'Confirmed');
    let category3 = new Category(3346, 50182001, 'Butter', 'Cancelled');
    let category4 = new Category(3345, 50182000, 'Fermented', 'Confirmed');
    let category5 = new Category(5679, 50181906, 'Oil', 'Sent');

    // Agrega los objetos Category al arreglo categories
    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
    this.categories.push(category4);
    this.categories.push(category5);
  }
}
