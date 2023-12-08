import { Component } from '@angular/core';
import { InvoiceService } from '../../_services/ invoice.service';
import { Invoice } from '../../_models/ invoice';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent { 

  constructor(private invoiceService: InvoiceService ) {


  }

  invoices : Invoice[] = [];
  getInvoices() {
    this.invoiceService.getInvoices("SAAI920101A01").subscribe(
      (res: any) => {
        this.invoices = res; // Convierte las propiedades del objeto en un array
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
}
