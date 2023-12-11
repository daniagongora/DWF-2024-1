import { Component } from '@angular/core';
import { InvoiceService } from '../../_services/ invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Invoice } from '../../_models/ invoice';
import { Cart } from '../../_models/ cart';
@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent {

  invoices: Invoice[]=[];
  public rfc: string = 'SAAI920101A01';

  constructor(
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private invoiceService : InvoiceService,
  ){}

  ngOnInit() {
    this.getInvoices();
  }
  
  getInvoices(){
    this.invoiceService.getInvoices(this.rfc).subscribe(
      (res: any) => {
        this.invoices = res;
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

showInvoice(id : number){
  this.router.navigate(['invoice/' + id]);
}
  
  redirect(url: string[]){
    this.router.navigate(url);
  }
}
