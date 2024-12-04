import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { PastaService } from '../../../services/pastas/pastas.service';
import { CommonModule } from '@angular/common';
import { Pasta } from '../../../models/pastas.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../services/cartservicio/cart.service'; // Servicio del carrito

@Component({
  selector: 'app-pastas-list-component',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pastas-list-component.component.html',
  styleUrls: ['./pastas-list-component.component.css']
})
export class PastasListComponentComponent implements OnInit, OnChanges {
  private pastaService = inject(PastaService);
  private cartService = inject(CartService); // Inyecta el servicio del carrito

  @Input() searchQuery: string = ''; // Ahora es un @Input para recibir datos del componente padre

  pastas: Pasta[] = [];
  filteredPastas: Pasta[] = [];
  selectedPasta: Pasta | null = null;

  ngOnInit(): void {
    this.loadAll();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchQuery'] && !changes['searchQuery'].firstChange) {
      this.applyFilter();
    }
  }

  loadAll() {
    this.pastaService.list().subscribe(pastas => {
      this.pastas = pastas;
      this.applyFilter(); // Aplica el filtro inicial
    });
  }

  applyFilter(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredPastas = this.pastas.filter(pasta =>
      pasta.nombre.toLowerCase().includes(query)
    );
  }

  onImageError(event: any): void {
    event.target.src = 'assets/img/pastas/predeterminada.jpg';
  }

  openModal(pasta: Pasta): void {
    this.selectedPasta = pasta;
  }

  addToCart(): void {
    if (this.selectedPasta) {
      // Añadir el producto al carrito
      this.cartService.addItem({
        nombre: this.selectedPasta.nombre,
        precio: this.selectedPasta.precio,
        tamano: 'Único' // Valor por defecto
      });
      console.log('Producto añadido al carrito:', this.selectedPasta.nombre);
    }
    this.selectedPasta = null; // Cierra el modal
  }
}
