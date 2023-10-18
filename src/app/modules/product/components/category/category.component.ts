import { Component, OnInit } from '@angular/core';
import { Category } from '../../_models/category'; // Importa la clase Category
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = []; // Declarar un arreglo de objetos Category
  categoryUpdated: number = 0;
  
  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
  ){}

  ngOnInit() {
    this.getCategories();
  }

  enableCategory(id: number){
    for(let category of this.categories){
      if(category.category_id == id){
        category.status = 1;
        
        alert("Se ha quitado la entrega");
        break;
      }
    }
    console.log("SALIR")
  }

  disableCategory(id: number){
    for(let category of this.categories){
      if(category.category_id == id){
        category.status = 0;
        alert("Postre entregado");
        break;
      }
    }
  }

  getCategories() {
    // Agrega tres objetos Category con datos dummy al arreglo categories
    let category1 = new Category(1087, "50192404", 'Pastel', 1);
    let category2 = new Category(3456, "50182002", 'Brownie', 0);
    let category3 = new Category(3346, "50182001", 'Muffin', 1);
    let category4 = new Category(3345, "50182000", 'Carlota', 0);
    let category5 = new Category(5679, "50181906", 'Flan', 1);

    // Agrega los objetos Category al arreglo categories
    this.categories.push(category1);
    this.categories.push(category2);
    this.categories.push(category3);
    this.categories.push(category4);
    this.categories.push(category5);
  }

  onSubmit(){
    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate() {
    this.submitted = true;
  
    if (this.form.invalid) return;
  
    this.submitted = false;
  
    // Para guardar el ID unico para encontrar y editar
    let maxCategoryID = 0;
    for (let category of this.categories) {
      if (category.category_id > maxCategoryID) {
        maxCategoryID = category.category_id;
      }
    }
  
    // Se crea el objeto con el id unico, no solo se pone en el html
    let category = new Category(maxCategoryID + 1, this.form.controls['code'].value!, this.form.controls['category'].value!, 1);
  
    this.categories.push(category);
  
    $("#modalForm").modal("hide");
  
    alert("Postre guardado exitosamente!");
  }
  
  

  onSubmitUpdate(){
    this.submitted = true;

    if(this.form.invalid) return;

    this.submitted = false;

    for(let category of this.categories){
      if(category.category_id == this.categoryUpdated){
        category.code = this.form.controls['code'].value!;
        category.category = this.form.controls['category'].value!;
        break;
      }
    }
    
    $("#modalForm").modal("hide");

    //alert("Postre actualizado exitosamente!")
    Swal.fire({
      title: 'Postre actualizado exitosamente!',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })

    this.categoryUpdated = 0;

  }

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    
    this.form.reset();
    this.form.controls['code'].setValue(category.code);
    this.form.controls['category'].setValue(category.category);

    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  showModalForm(){
    this.form.reset();
    this.categoryUpdated = 0;
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  
}
