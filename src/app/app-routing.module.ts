import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/components/category/category.component';

const routes: Routes = [
  // Otras rutas pueden estar presentes aquí

  // Agrega la ruta "category" que apunta al componente "CategoryComponent"
  { path: 'category', component: CategoryComponent },

  // Otras rutas pueden estar presentes aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
