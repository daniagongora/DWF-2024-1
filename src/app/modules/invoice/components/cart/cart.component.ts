import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/modules/invoice/_services/cart.service';
import Swal from 'sweetalert2';
import { FormBuilder } from '@angular/forms';
import { CartInteractionService } from 'src/app/modules/product/_services/cart-interaction.service';
import { Subscription } from 'rxjs';

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

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private cartInteractionService: CartInteractionService
  ) {
    // Subscribe to the refreshCart$ observable
    this.cartInteractionSubscription = this.cartInteractionService.refreshCart$.subscribe(() => {
      // This will be called whenever the cart needs to be refreshed
      this.getCart();
    });
  }

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
    // Reinicia el total
    this.total = 0;

    // Suma los precios de los productos en el carrito
    this.cart.forEach(item => {
      this.total += item.product.price;
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
}
