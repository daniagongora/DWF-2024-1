
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../_services/ invoice.service';
import { Invoice } from '../../_models/ invoice';
import { Customer } from 'src/app/modules/customer/_models/customer';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice-last',
  templateUrl: './invoice-last.component.html',
  styleUrls: ['./invoice-last.component.css']
})
export class InvoiceLastComponent {

  public rfc: string = 'SAAI920101A01';
  public invoice: any | Invoice = new Invoice();
  public id: any;
  public customer: any | Customer = new Customer(); 
cart: any;

  constructor(
    private invoiceService: InvoiceService,
    private route : ActivatedRoute,
    ) {
  }

  ngOnInit():void{
      this.getInvoices();
  }

  
  getInvoice(id: number) {
    this.invoiceService.getInvoice(id).subscribe(
      (res: any) => {
        this.invoice = res; // Convierte las propiedades del objeto en un array
        this.rfc = this.invoice.rfc;
      },
      (err) => {
        // Muestra mensaje de error detallado
        console.error('Error al obtener las facturas:', err);
        
        // Muestra mensaje de error al usuario
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'Error al obtener la factura',
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }
 

  getInvoices(){
      this.invoiceService.getInvoices(this.rfc).subscribe(
        (res: any) => {
          this.id = res[0].invoice_id;
          this.getInvoice(this.id);
        },
        (err) => {
          // Muestra mensaje de error detallado
          console.error('Error al obtener las facturas:', err);
          
          // Muestra mensaje de error al usuario
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            toast: true,
            showConfirmButton: false,
            text: 'Error al obtener la factura',
            background: '#F8E8F8',
            timer: 2000
          });
        }
      )
  }
}
