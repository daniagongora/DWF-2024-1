import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { ItemComponent } from './components/item/item.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceLastComponent } from './components/invoice-last/invoice-last.component';
import { AppRoutingModule } from 'src/app/app-routing.module';

@NgModule({
  declarations: [
    CartComponent,
    InvoiceComponent,
    ItemComponent,
    InvoiceListComponent,
    InvoiceLastComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule
  ]
})
export class InvoiceModule { }
