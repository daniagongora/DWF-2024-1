import { Component } from '@angular/core';
import { DtoCustomerList } from '../../_dtos/dto-customer-list';
import { Region } from '../../_models/region';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../_services/customer.service';
import { RegionService } from '../../_services/region.service';

import Swal from'sweetalert2'; // sweetalert
import { Router } from '@angular/router';

declare var $: any; // jquery

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {
  customers: DtoCustomerList[] = []; // lista de clientes
  regions: Region[] = []; // lista de regiones

  // formulario de registro
  form = this.formBuilder.group({
    name: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    surname: ["", [Validators.required, Validators.pattern("^[a-zA-ZÀ-ÿ][a-zA-ZÀ-ÿ ]+$")]],
    rfc: ["", [Validators.required, Validators.pattern("^[ñA-Z]{3,4}[0-9]{6}[0-9A-Z]{3}$")]],
    mail: ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    region_id: ["", [Validators.required]],
    address: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private customerService: CustomerService, // servicio customer de API
    private formBuilder: FormBuilder, // formulario
    private regionService: RegionService, // servicio region de API
    private router: Router, // redirigir a otro componente
  ){}

  // primera función que se ejecuta
  ngOnInit(){
    this.getCustomers();
  }

  // CRUD customer

  disableCustomer(id: number){
    this.customerService.disableCustomer(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido desactivado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCustomers(); // consulta clientes con los cambios realizados
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  enableCustomer(id: number){
    this.customerService.enableCustomer(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido activado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCustomers(); // consulta clientes con los cambios realizados
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe(
      res => {
        this.customers = res; // asigna la respuesta de la API a la lista de clientes
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    this.customerService.createCustomer(this.form.value).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido registrado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCustomers(); // consulta clientes con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  showCustomer(rfc: string){
    this.router.navigate(['customer/' + rfc]);
  }

  // catalogues

  getRegions(){
    this.regionService.getRegions().subscribe(
      res => {
        this.regions = res; // asigna la respuesta de la API a la lista de regiones
      },
      err => {
        // muestra mensaje de error
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: err.error.message,
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  // modals 

  showModalForm(){
    this.form.reset();
    this.submitted = false;
    this.getRegions();
    $("#modalForm").modal("show");
  }

}
