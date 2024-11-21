import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponentComponent } from '../../UTILS/pizza-list-component/pizza-list-component.component';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { CartService } from '../../../services/cartservicio/cart.service'; // Importa el servicio del carrito
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, PizzaListComponentComponent, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent {
  isCartVisible: boolean = false;

  constructor(private cartService: CartService) {}

  toggleCart(): void {
    this.isCartVisible = !this.isCartVisible;
  }

  get cartItems() {
    return this.cartService.getItems(); // Obtén los productos del carrito
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
