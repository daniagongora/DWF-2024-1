import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './modules/product/product.module'; // Importa el módulo "ProductModule"
import { CustomerModule } from './modules/customer/customer.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { LayoutModule } from './modules/layout/layout.module';
import { NgxPayPalModule } from 'ngx-paypal';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule, // Agrega el módulo "ProductModule" a la lista de imports
    CustomerModule,
    LayoutModule, 
    InvoiceModule,
    NgxPayPalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
