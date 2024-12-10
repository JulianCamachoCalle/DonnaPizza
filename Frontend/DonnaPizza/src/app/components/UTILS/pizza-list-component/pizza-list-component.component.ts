import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
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
export class PizzaListComponentComponent implements OnInit, OnChanges {
  private pizzasService = inject(PizzaService);
  private cartService = inject(CartService); // Inyecta el servicio del carrito

  @Input() searchQuery: string = ''; // Recibe el texto del buscador

  pizzas: Pizza[] = [];
  filteredPizzas: Pizza[] = [];
  selectedPizza: Pizza | null = null;
  selectedSize: string = 'Mediana'; // El tamaño seleccionado por defecto

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] && !changes['searchQuery'].firstChange) {
      this.applyFilter();
    }
  }

  loadAll() {
    this.pizzasService.list().subscribe(pizzas => {
      this.pizzas = pizzas;
      this.applyFilter(); // Aplica el filtro inicial
    });
  }

  applyFilter() {
    const query = this.searchQuery.toLowerCase();
    this.filteredPizzas = this.pizzas.filter(pizza =>
      pizza.nombre.toLowerCase().includes(query)
    );
  }

  onImageError(event: any): void {
    event.target.src = 'assets/img/pizzas/predeterminada.jpg';
  }

  openModal(pizza: Pizza): void {
    this.selectedPizza = pizza;
  }

  addToCart(): void {
    if (this.selectedPizza) {
      this.cartService.addItem({
        id: this.selectedPizza.id_pizza, // ID de la pizza
        nombre: this.selectedPizza.nombre,
        precio: this.selectedPizza.precio,
        tamano: this.selectedSize, // Tamaño seleccionado
        tipo: 'pizza', // Tipo del producto (pizza en este caso)
        cantidad: 1 // La cantidad predeterminada
      });
      console.log('Producto añadido al carrito:', this.selectedPizza.nombre, this.selectedSize);
    }
    this.selectedPizza = null; // Cierra el modal
  }
}
