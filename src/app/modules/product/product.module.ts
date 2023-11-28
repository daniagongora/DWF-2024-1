import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './components/product/product.component';
import {NgxPhotoEditorModule} from "ngx-photo-editor";
import { ProductImageComponent } from './components/product-image/product-image.component';



@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
    ProductImageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    NgxPhotoEditorModule,
  ],
  exports: [
    CategoryComponent,
    ProductComponent,
    // CommonModule,
  ]
})
export class ProductModule { }
