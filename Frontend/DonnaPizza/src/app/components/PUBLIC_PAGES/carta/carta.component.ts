import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PizzaListComponentComponent } from '../../UTILS/pizza-list-component/pizza-list-component.component';
import { PastasListComponentComponent } from '../../UTILS/pastas-list-component/pastas-list-component.component';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';
import { CartService } from '../../../services/cartservicio/cart.service'; // Importa el servicio del carrito
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, PizzaListComponentComponent, FormsModule, NavbarComponent, FooterComponent, RouterModule, PastasListComponentComponent],
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent {
  isCartVisible: boolean = false;
  searchQuery: string = '';
  selectedCategory: string = '';

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

  applyFilters(): void {
    // Este método no requiere lógica porque usamos bindings en los componentes hijos.
  }
  
  increaseQuantity(index: number): void {
    this.cartService.updateQuantity(index, this.cartItems[index].cantidad + 1);
}

decreaseQuantity(index: number): void {
    if (this.cartItems[index].cantidad > 1) {
        this.cartService.updateQuantity(index, this.cartItems[index].cantidad - 1);
    }
}

}
