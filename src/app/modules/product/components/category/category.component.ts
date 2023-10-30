import { Component } from '@angular/core';
import { Category } from '../../_models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../_services/category.service';

import Swal from'sweetalert2'; // sweetalert

declare var $: any; // jquery

@Component({
  selector: 'app-customer',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  categories: Category[] = []; // lista de categorias
  categoryUpdated: number = 0; // id de la región a actualizar

  // formulario de registro
  form = this.formBuilder.group({
    category: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private formBuilder: FormBuilder, // formulario
    private categoryService: CategoryService // servicio region de API
  ){}

  // primera función que se ejecuta
  ngOnInit(){
    this.getCategories();
  }

  // CRUD region

  enableCategory(id: number){
    this.categoryService.enableCategory(id).subscribe(
      res => {
        // mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          title: '¡Éxito!',
          text: 'Se ha quitado la entrega',
          showConfirmButton: false,
          timer: 2000,
          background: '#F8F9FA',
        });
        

        this.getCategories(); // consulta regiones con los cambios realizados
      },
      err => {
        // mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F3969A',
          timer: 2000
        });
      }
    );
  }

  disableCategory(id: number){
    this.categoryService.disableCategory(id).subscribe(
      res => {
        // mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          title: '¡Éxito!',
          text: 'El postre se ha entregado',
          showConfirmButton: false,
          timer: 2000,
          background: '#F8F9FA',
        });

        this.getCategories(); // consulta regiones con los cambios realizados
      },
      err => {
        // mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F3969A',
          timer: 2000
        });
      }
    );
  }

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categories = res; // asigna la respuesta de la API a la lista de categorias
      },
      err => {
        // mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F3969A',
          timer: 2000
        });
      }
    );
  }

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    // ejecuta la función crear o actualizar según corresponda
    if(this.categoryUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.categoryService.createCategory(this.form.value).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          title: '¡Éxito!',
          text: 'La categoria ha sido registrada',
          showConfirmButton: false,
          timer: 2000,
          background: '#F8F9FA',
        });

        this.getCategories(); // consulta regiones con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F3969A',
          timer: 2000
        });
      }
    );
  }

  onSubmitUpdate(){
    this.categoryService.updateCategory(this.form.value, this.categoryUpdated).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          title: '¡Éxito!',
          text: 'La categoria ha sido actualizada',
          showConfirmButton: false,
          timer: 2000,
          background: '#F8F9FA',
        });

        this.getCategories(); // consulta regiones con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro

        this.categoryUpdated = 0; // resetea el id de la región que se actualiza a 0
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F3969A',
          timer: 2000
        });
      }
    );
  }

  updateCategory(category: Category){
    this.categoryUpdated = category.category_id;
    
    this.form.reset();
    this.form.controls['code'].setValue(category.code);
    this.form.controls['category'].setValue(category.category);

    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  // modals 

  showModalForm(){
    this.form.reset();
    this.categoryUpdated = 0;
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
