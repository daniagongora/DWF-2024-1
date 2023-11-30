import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../_models/product';
import { ProductService } from '../../_services/product.service';
import { CartService } from 'src/app/modules/invoice/_services/cart.service';
import Swal from'sweetalert2'; // sweetalert
import { FormBuilder, Validators } from '@angular/forms';
import { Category } from '../../_models/category';
import { CategoryService } from '../../_services/category.service';
import { NgxPhotoEditorService } from 'ngx-photo-editor';
import { ProductImageService } from '../../_services/product-images.service';
import { ProductImage } from '../../_models/product-image';

declare var $: any; // jquery

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css']
})
export class ProductImageComponent {

  product: any | Product = new Product(); // cliente consultado
  gtin: any | string = ""; // gtin del cliente consultado
  productImages: ProductImage[] = [];
  categorys: Category[] = []; // lista de categoryes
  category: any | Category = new Category(); // datos de la región del cliente
  selectedQuantity: number = 1;
  quantityOptions: number[] = [1, 2, 3, 4, 5]; 

  // formulario de actualización
  form = this.formBuilder.group({
    product: ["", [Validators.required]],
    gtin: ["", [Validators.required, Validators.pattern('^[0-9]{13}$')]],
    description: ["", [Validators.required]],
    price: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    stock: ["", [Validators.required, Validators.pattern('^[0-9]*$')]],
    category_id: ["", [Validators.required]],
  });

  submitted = false; // indica si se envió el formulario

  constructor(
    private productService: ProductService, // servicio product de API
    public ProductImageService: ProductImageService, // servicio product image de API
    private formBuilder: FormBuilder, // formulario
    private categoryService: CategoryService, // servicio category de API
    private route: ActivatedRoute, // recupera parámetros de la url
    private router: Router, // redirigir a otro componente
    private cartService: CartService,

    private service: NgxPhotoEditorService
  ){}
  ngOnInit() {
    this.gtin = this.route.snapshot.paramMap.get('gtin');
    if (this.gtin) {
      this.getProduct();
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        toast: true,
        showConfirmButton: false,
        text: 'GTIN de producto inválido',
        background: '#F8E8F8',
        timer: 2000
      });
    }
  }
  
  addToCart(product: any, quantity: number) {
    const cart = {
      art_id: 0, // Reemplaza con el ID del carrito, si es necesario
      gtin: product.gtin, // Reemplaza con el GTIN del producto
      image: product.image, // Reemplaza con la URL de la imagen del producto, si es necesario
      product: {
        // Aquí incluye los detalles del producto que se espera en el cuerpo de la solicitud
        category_id: product.category_id,
        description: product.description,
        // ... otros campos del producto
      },
      quantity: quantity, // Ejemplo: se está agregando una unidad del producto al carrito
      rfc: "SAAI920101A01" // Reemplaza con el RFC del cliente proporcionado
    };

    this.cartService.addToCart(cart).subscribe(
      () => {
        // Mensaje de éxito al agregar al carrito
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'Producto agregado al carrito',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 1000
        });
      },
      (err) => {
        // Mensaje de error si falla al agregar al carrito
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'Error al agregar al carrito',
          background: '#F8E8F8',
          timer: 2000
        });
        console.error('Error al agregar al carrito:', err);
      }
    );
  }
  

  getProduct() {
    this.productService.getProduct(this.gtin).subscribe(
      (res) => {
        this.product = res; // asigna la respuesta de la API a la variable de producto
        this.getCategory(this.product.category_id);
        console.log('Producto obtenido:', this.product);
        this.visualizeImage(this.product.product_id);
      },
      (err) => {
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

    this.productService.updateProduct(this.form.value, this.product.product_id).subscribe(
      res => {
        // muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'El producto ha sido actualizado',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });

        if(this.form.controls['gtin'].value != this.gtin){
          this.gtin = this.form.controls['gtin'].value!; // actualizamos el gtin

          // sustituimos en la url el nuevo gtin
          let currentUrl = this.router.url.split("/");
          currentUrl.pop();
          currentUrl.push(this.gtin);
          
          // actualizamos la url con el nuevo gtin
          this.redirect(currentUrl);
        }

        this.getProduct(); // consulta el cliente con los cambios realizados
    
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

  updateProduct() {
    this.form.reset();
    this.submitted = false;
    this.getCategories();
  
    // Asignar valores a los campos del formulario
    this.form.patchValue({
      product: this.product.product,
      gtin: this.product.gtin,
      description: this.product.description,
      price: this.product.price,
      stock: this.product.stock,
      category_id: this.product.category_id,
    });
  
    $("#modalForm").modal("show");
  }
  

  // product image
  updateProductImage(image: string){
    let productImage: ProductImage = new ProductImage();
    productImage.product_id = this.product.product_id; // Asigna el product_id del producto actual
    productImage.image = image;
  
    this.ProductImageService.uploadProductImage(productImage).subscribe(
      res => {
        // Muestra mensaje de confirmación
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'La imagen ha sido actualizada',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
  
        this.getProduct(); // Consulta el producto con los cambios realizados
  
        $("#modalForm").modal("hide"); // Oculta el modal de registro
      },
      err => {
        // Muestra mensaje de error
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
  
  visualizeImage(productId: number) {
    this.ProductImageService.getProductImage(productId).subscribe(
      (productImages: ProductImage[]) => {
        productImages.forEach(image => {
          // Construye la URL completa de la imagen
          image.image = `assets/imagenes/imagenes/${image.image}`;
        });
        this.productImages = productImages;
        console.log('Imágenes del producto:', productImages);
        
      },
      err => {
        // Muestra mensaje de error
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
  
  deleteImage(productId: number) {
    this.ProductImageService.deleteProductImage(productId).subscribe(
      (response) => {
        // Image has been successfully deleted.
        console.log('Imagen eliminada:', response);
        
        // Remove the image from the carousel
        this.productImages.splice(this.productImages.findIndex((image) => image.product_image_id === productId), 1);
        
      },
      err => {
        // Muestra mensaje de error
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

  getCategories(){
    this.categoryService.getCategories().subscribe(
      res => {
        this.categorys = res; // asigna la respuesta de la API a la lista de categoryes
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

  getCategory(id: number){
    this.categoryService.getCategory(id).subscribe(
      res => {
        this.category = res; // asigna la respuesta de la API a la lista de categoryes
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

  saveChanges() {
    // Valida el formulario
    this.submitted = true;
    if (this.form.invalid) return;
    this.submitted = false;
  
    // Llama a la función onSubmit para guardar los cambios
    this.onSubmit();
  }
  
  fileChangeHandler($event: any) {
    this.service.open($event, {
      aspectRatio: 4 / 4,
      autoCropArea: 1,
      resizeToWidth: 360,
      resizeToHeight: 360,
    }).subscribe(data => {
      console.log(data);
      this.updateProductImage(data.base64!);
    });
  }

  
  redirect(url: string[]){
    this.router.navigate(url);
  }
}
