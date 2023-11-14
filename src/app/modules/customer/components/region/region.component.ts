import { Component } from '@angular/core';
import { Region } from '../../_models/region';
import { FormBuilder, Validators } from '@angular/forms';
import { RegionService } from '../../_services/region.service';

import Swal from'sweetalert2'; // sweetalert

declare var $: any; // jquery

@Component({
  selector: 'app-customer',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})
export class RegionComponent {
  regions: Region[] = []; // lista de regiones
  regionUpdated: number = 0; // id de la región a actualizar

  // formulario de registro
  form = this.formBuilder.group({
    region: ["", [Validators.required]],
    code: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private formBuilder: FormBuilder, // formulario
    private regionService: RegionService // servicio region de API
  ){}

  // primera función que se ejecuta
  ngOnInit(){
    this.getRegions();
  }

  // CRUD region

  disableRegion(id: number){
    this.regionService.disableRegion(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La región ha sido desactivada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getRegions(); // consulta regiones con los cambios realizados
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

  enableRegion(id: number){
    this.regionService.enableRegion(id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La región ha sido activada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getRegions(); // consulta regiones con los cambios realizados
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

  onSubmit(){
    // valida el formulario
    this.submitted = true;
    if(this.form.invalid) return;
    this.submitted = false;

    // ejecuta la función crear o actualizar según corresponda
    if(this.regionUpdated == 0){
      this.onSubmitCreate();
    }else{
      this.onSubmitUpdate();
    }
  }

  onSubmitCreate(){
    this.regionService.createRegion(this.form.value).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La región ha sido registrada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getRegions(); // consulta regiones con los cambios realizados
    
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

  onSubmitUpdate(){
    this.regionService.updateRegion(this.form.value, this.regionUpdated).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La región ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        this.getRegions(); // consulta regiones con los cambios realizados
    
        $("#modalForm").modal("hide"); // oculta el modal de registro

        this.regionUpdated = 0; // resetea el id de la región que se actualiza a 0
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

  updateRegion(region: Region){
    this.regionUpdated = region.region_id;
    
    this.form.reset();
    this.form.controls['region'].setValue(region.region);
    this.form.controls['code'].setValue(region.code);
    
    this.submitted = false;
    $("#modalForm").modal("show");
  }

  // modals 

  showModalForm(){
    this.form.reset();
    this.regionUpdated = 0;
    this.submitted = false;
    $("#modalForm").modal("show");
  }
}
