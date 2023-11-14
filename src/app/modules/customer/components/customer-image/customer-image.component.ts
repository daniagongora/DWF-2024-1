import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../_models/customer';
import { CustomerService } from '../../_services/customer.service';

import Swal from'sweetalert2'; // sweetalert
import { FormBuilder, Validators } from '@angular/forms';
import { Region } from '../../_models/region';
import { RegionService } from '../../_services/region.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { CustomerImageService } from '../../_services/customer-image.service';
import { CustomerImage } from '../../_models/customer-image';

declare var $: any; // jquery

@Component({
  selector: 'app-customer-image',
  templateUrl: './customer-image.component.html',
  styleUrls: ['./customer-image.component.css']
})
export class CustomerImageComponent {

  customer: any | Customer = new Customer(); // cliente consultado
  rfc: any | string = ""; // rfc del cliente consultado

  regions: Region[] = []; // lista de regiones
  region: any | Region = new Region(); // datos de la región del cliente

  // formulario de actualización
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
    private customerImageService: CustomerImageService, // servicio customer image de API
    private formBuilder: FormBuilder, // formulario
    private regionService: RegionService, // servicio region de API
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente

    private service: NgxPhotoEditorService
  ){}

  ngOnInit(){
    this.rfc = this.route.snapshot.paramMap.get('rfc');
    if(this.rfc){
      this.getCustomer();
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'RFC de cliente inválido',
        background: '#F8E8F8',
        timer: 2000
      });
    }
  }

  // CRUD customer

  getCustomer(){
    this.customerService.getCustomer(this.rfc).subscribe(
      res => {
        this.customer = res; // asigna la respuesta de la API a la variable de cliente
        this.getRegion(this.customer.region_id);
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

    this.customerService.updateCustomer(this.form.value, this.customer.customer_id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El cliente ha sido actualizado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        if(this.form.controls['rfc'].value != this.rfc){
          this.rfc = this.form.controls['rfc'].value!; // actualizamos el rfc

          // sustituimos en la url el nuevo rfc
          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.rfc);
          
          // actualizamos la url con el nuevo rfc
          this.redirect(currentUrl);
        }

        this.getCustomer(); // consulta el cliente con los cambios realizados
    
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

  updateCustomer(){
    this.form.reset();
    this.submitted = false;
    this.getRegions();

    this.form.controls['name'].setValue(this.customer.name);
    this.form.controls['surname'].setValue(this.customer.surname);
    this.form.controls['rfc'].setValue(this.customer.rfc);
    this.form.controls['mail'].setValue(this.customer.mail);
    this.form.controls['region_id'].setValue(this.customer.region_id);
    this.form.controls['address'].setValue(this.customer.address);

    $("#modalForm").modal("show");
  }

  // customer image

  updateCustomerImage(image: string){
    let customerImage: CustomerImage = new CustomerImage();
    customerImage.customer_image_id = this.customer.image.customer_image_id;
    customerImage.image = image;

    this.customerImageService.updateCustomerImage(customerImage).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getCustomer(); // consulta el cliente con los cambios realizados
    
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

  // auxiliary functions

  getRegion(id: number){
    this.regionService.getRegion(id).subscribe(
      res => {
        this.region = res; // asigna la respuesta de la API a la lista de regiones
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

  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      console.log(data);
      this.updateCustomerImage(data.base64!);
    });
  }

  redirect(url: string[]){
    this.router.navigate(url);
  }
}
