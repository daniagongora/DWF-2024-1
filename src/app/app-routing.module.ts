import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/components/category/category.component';
import { ProductComponent } from './modules/product/components/product/product.component';
import { ProductImageComponent } from './modules/product/components/product-image/product-image.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component';


const routes: Routes = [
  // Otras rutas pueden estar presentes aquí

  // Agrega la ruta "category" que apunta al componente "CategoryComponent"
  { path: 'category', component: CategoryComponent },
  { path: "product", component: ProductComponent },
  { path: "product/:gtin", component: ProductImageComponent },
  { path: "region", component: RegionComponent },
  { path: "customer", component: CustomerComponent },
  { path: "customer/:rfc", component: CustomerImageComponent },
  // Otras rutas pueden estar presentes aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
