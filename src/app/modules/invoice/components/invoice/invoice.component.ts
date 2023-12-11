import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../_services/ invoice.service';
import { Invoice } from '../../_models/ invoice';
import { Customer } from 'src/app/modules/customer/_models/customer';
import { Region } from 'src/app/modules/customer/_models/region';
import { CustomerService } from 'src/app/modules/customer/_services/customer.service';
import { RegionService } from 'src/app/modules/customer/_services/region.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit{ 

  public rfc: string = 'SAAI920101A01';
  public invoice: any | Invoice = new Invoice();
  public id: any;
  public customer: any | Customer = new Customer(); 
  public region: any | Region = new Region(); 
  

  constructor(
    private invoiceService: InvoiceService,
    private route : ActivatedRoute,
    ) {
  }

  ngOnInit():void{
    this.id = this.route.snapshot.paramMap.get("id");
    this.getInvoices();
  }

  
  getInvoices() {
    this.invoiceService.getInvoice(this.id).subscribe(
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

}
