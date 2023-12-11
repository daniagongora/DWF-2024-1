import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './modules/product/components/category/category.component';
import { ProductComponent } from './modules/product/components/product/product.component';
import { ProductImageComponent } from './modules/product/components/product-image/product-image.component';
import { RegionComponent } from './modules/customer/components/region/region.component';
import { CustomerComponent } from './modules/customer/components/customer/customer.component';
import { CustomerImageComponent } from './modules/customer/components/customer-image/customer-image.component';
import { MainViewComponent } from './modules/intro/main-view/main-view.component';
import { InvoiceComponent } from './modules/invoice/components/invoice/invoice.component';
import { CartComponent } from './modules/invoice/components/cart/cart.component';
import { ItemComponent } from './modules/invoice/components/item/item.component';
import { InvoiceLastComponent } from './modules/invoice/components/invoice-last/invoice-last.component';
import { InvoiceListComponent } from './modules/invoice/components/invoice-list/invoice-list.component';
const routes: Routes = [
  // Otras rutas pueden estar presentes aquí

  // Agrega la ruta "category" que apunta al componente "CategoryComponent"
  { path: "main-view", component: MainViewComponent},
  { path: 'category', component: CategoryComponent },
  { path: "product", component: ProductComponent },
  { path: "product/:gtin", component: ProductImageComponent },
  { path: "region", component: RegionComponent },
  { path: "customer", component: CustomerComponent },
  { path: "customer/:rfc", component: CustomerImageComponent },
  { path: "invoice", component: InvoiceComponent},
  { path: "invoice/:id", component: InvoiceComponent},
  { path: "invoice-last", component: InvoiceLastComponent},
  { path: "invoice-list", component: InvoiceListComponent},
  { path: "cart", component: CartComponent},
  { path: "item", component: ItemComponent},

  // Otras rutas pueden estar presentes aquí
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
