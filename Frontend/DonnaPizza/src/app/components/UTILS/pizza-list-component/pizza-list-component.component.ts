import { Component, inject, OnInit } from '@angular/core';
import { PizzaService } from '../../../services/pizza/pizza.service';
import { CommonModule } from '@angular/common';
import { Pizza } from '../../../models/pizza.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cartservicio/cart.service'; // Importa el servicio del carrito

@Component({
  selector: 'app-pizza-list-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pizza-list-component.component.html',
  styleUrls: ['./pizza-list-component.component.css']
})
export class PizzaListComponentComponent implements OnInit {
  private pizzasService = inject(PizzaService);
  private cartService = inject(CartService); // Inyecta el servicio del carrito

  pizzas: Pizza[] = [];
  selectedPizza: Pizza | null = null;
  selectedSize: string = 'Mediana';

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.pizzasService.list().subscribe(pizzas => {
      this.pizzas = pizzas;
    });
  }

  onImageError(event: any): void {
    event.target.src = 'assets/img/pizzas/predeterminada.jpg';
  }

  openModal(pizza: Pizza): void {
    this.selectedPizza = pizza;
  }

  addToCart(): void {
    if (this.selectedPizza) {
      // Añadir el producto al carrito
      this.cartService.addItem({
        nombre: this.selectedPizza.nombre,
        precio: this.selectedPizza.precio,
        tamano: this.selectedSize
      });
      console.log('Producto añadido al carrito:', this.selectedPizza.nombre, this.selectedSize);
    }
    this.selectedPizza = null; // Cierra el modal
  }
}
