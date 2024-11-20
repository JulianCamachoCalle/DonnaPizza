import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pizza } from '../../../models/pizza.model';
import { PizzaService } from '../../../services/pizza/pizza.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crudpizzas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './crudpizzas.component.html',
  styleUrl: './crudpizzas.component.css'
})
export class CRUDPizzasComponent implements OnInit {
  private pizzasService = inject(PizzaService)

  pizzas: any[] = [];

  ngOnInit(): void {
    this.pizzasService.list().subscribe((pizzas: any) => {
      this.pizzas = pizzas;
    })
  }

  loadAll() {
    this.pizzasService.list().subscribe(pizzas => {
      this.pizzas = pizzas;
    })
  }

  deletePizza(pizza: Pizza) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la pizza "${pizza.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pizzasService.delete(pizza.id_pizza).subscribe(() => {
          this.loadAll(); // Recarga la lista de pizzas
          Swal.fire(
            '¡Eliminada!',
            `La pizza "${pizza.nombre}" ha sido eliminada.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar la pizza. Inténtalo nuevamente.',
            'error'
          );
        });
      }
    });
  }

  generarReporteExcel() {
    const url = 'http://localhost:8080/excelpizzas';
    window.open(url, '_blank');
  }
}
