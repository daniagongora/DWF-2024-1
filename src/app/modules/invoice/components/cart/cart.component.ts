import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/modules/invoice/_services/cart.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { CartInteractionService } from 'src/app/modules/product/_services/cart-interaction.service';
import { ProductImageService } from 'src/app/modules/product/_services/product-images.service';
import { Subscription } from 'rxjs';
import { ProductImage } from 'src/app/modules/product/_models/product-image';
import { Customer } from 'src/app/modules/customer/_models/customer';
import { CustomerImage } from 'src/app/modules/customer/_models/customer-image';
import { DtoItem } from '../../_dtos/dto-item';
import { DtoInvoiceList } from '../../_dtos/dto-invoice-list';
import { InvoiceService } from '../../_services/ invoice.service';

declare var $: any; // jquery

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnDestroy {
  cart: any[] = []; // array del carrito
  rfc: string = ""; // RFC del cliente
  form = this.formBuilder.group({});
  submitted = false; // indica si se envió el formulario
  total: number = 0; // variable para almacenar el total del carrito
  private cartInteractionSubscription: Subscription;
  productImages: ProductImage[] = [];
  imageUrl: string = "";

  constructor(
    private cartService: CartService,
    private invoiceService: InvoiceService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cartInteractionService: CartInteractionService,
    private productImageService: ProductImageService
  ) {
    // Subscribe to the refreshCart$ observable
    this.cartInteractionSubscription = this.cartInteractionService.refreshCart$.subscribe(() => {
      // This will be called whenever the cart needs to be refreshed
      this.getCart();
    });
  }

  public customer: Customer = {
    image: new CustomerImage(),
    customer_id: 1,
    name: 'Iván',
    surname: 'Saavedra',
    rfc: 'SAAI920101A01',
    mail: 'ivan.saavedra@ciencias.unam.mx',
    address: 'Av. Universidad 3000',
    status: 1,
    region_id: 1
  };

  getCart() {
    this.cartService.getCart("SAAI920101A01").subscribe(
      (res: any) => {
        this.cart = res; // Convierte las propiedades del objeto en un array
        this.calculateTotal(); // Calcula el total al obtener el carrito
        console.log('Carrito obtenido:', this.cart);
      },
      (err) => {
        // Muestra mensaje de error detallado
        console.error('Error al obtener el carrito:', err);
        
        // Muestra mensaje de error al usuario
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'Error al obtener el carrito',
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  calculateTotal() {
    this.total = 0;
  
    this.cart.forEach(item => {
      this.total += item.product.price * item.quantity; // Multiplica el precio por la cantidad
    });
  }
  

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    this.cartInteractionSubscription.unsubscribe();
  }

  checkout() {
    this.getCart();
    this.router.navigate(['/payment']);
  }

  getObjectKeys(obj: any): any[] {
    return Object.keys(obj).map(key => ({ key, value: obj[key] }));
  }

  removeFromCart(cartId: number) {
    this.cartService.removeFromCart(cartId).subscribe(
      (res: any) => {
        // Elimina el elemento del carrito local después de eliminarlo del servidor
        this.cart = this.cart.filter(item => item.cart_id !== cartId);
        this.calculateTotal();
        console.log('Elemento eliminado del carrito con cart_id:', cartId);

        // Alerta de éxito
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'Producto eliminado del carrito',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
      },
      (err) => {
        console.error('Error al eliminar el elemento del carrito:', err);
        // Muestra mensaje de error al usuario si es necesario
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text: 'Error al eliminar el elemento del carrito',
          background: '#F8E8F8',
          timer: 2000
        });
      }
    );
  }

  clearCart() {
    const rfcCliente = "SAAI920101A01"; // RFC del cliente cuyo carrito se limpiará
    this.cartService.cleanCart(rfcCliente).subscribe(
      (res: any) => {
        this.cart = []; 
        this.total = 0; 
        console.log('Carrito limpiado para el cliente con RFC:', rfcCliente);

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'Carrito vacío',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
      },
      (err) => { 
        console.error('Error al limpiar el carrito:', err);
        // Muestra mensaje de error al usuario si es necesario
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          text: 'Error al limpiar el carrito',
          background: '#F8E8F8',
          showConfirmButton: false,
          timer: 2000
        });
      }
    );
  }

  ConstruirItems(){
      const items : DtoItem[] =[];
      this.cart.forEach(producto => {
        //const total : number = producto.quantity * producto.item.unit_price;
        const total : number = 0;
        let item : DtoItem = {
          //gtin: producto.item.gtin,
          gtin: "se va a cambiar",
          quantity: producto.quantity,
          subtotal: total,
          taxes: 0,
          total: total,
         // unit_price: producto.item.unit_price
         unit_price: 0
        } 
        items.push(item);
      });
      return items;
  }

  Crearfactura(){
      const items : DtoItem[]= this.ConstruirItems();
      const factura : DtoInvoiceList = {
        rfc: this.customer.rfc,
        taxes: 0,
        subtotal: 0,
        total: 0,
        customer: this.customer,
        items: items
      }
      this.invoiceService.generateInvoice(this.customer.rfc, factura).subscribe(res => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          toast: true,
          text: 'Se completo la compra!',
          background: '#E8F8F8',
          showConfirmButton: false,
          timer: 2000
        });
      },
      err => {
        console.log(err)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          toast: true,
          showConfirmButton: false,
          text:  'Hubo un erro al realizar la compra: ${err}',
          background: '#F8E8F8',
          timer: 2000
        });
      })
  }


}
