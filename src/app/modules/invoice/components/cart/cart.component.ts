import { Component, OnInit } from '@angular/core';
import { CartService } from '../../_services/cart.service';
import { Product } from 'src/app/modules/product/_models/product';
import { DtoCartDetails } from '../../_dtos/dto-cart-details';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: DtoCartDetails[] = []; // Array de elementos del carrito
  rfc = 'SAAI920101A01'; // ID estático del cliente

  constructor(private cartService: CartService) {}

  ngOnInit(){
    this.getCart();
  }

  getCart() {
    this.cartService.getCart(this.rfc).subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.cartItems = response as DtoCartDetails[];
        } else {
          // Manejo de error o lógica adicional si es necesario
          console.error('Error al obtener el carrito. Respuesta inesperada:', response);
        }
      },
      (error: any) => {
        // Manejo de errores
        console.error('Error al obtener el carrito:', error);
      }
    );
  }
  

  addToCart(product: Product) {
    this.cartService.addToCart(this.rfc).subscribe(() => {
      this.getCart();
    });
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id).subscribe(() => {
      this.getCart();
    });
  }

  clearCart(id: number) {
    this.cartService.deleteCart(id).subscribe(() => {
      this.cartItems = [];
    });
  }
}
