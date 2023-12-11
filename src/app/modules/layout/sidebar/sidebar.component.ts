import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartInteractionService } from 'src/app/modules/product/_services/cart-interaction.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(
    private cartInteractionService: CartInteractionService,
    private router: Router
  ) {}

}
