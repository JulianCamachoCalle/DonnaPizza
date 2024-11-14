import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza/pizza.service';
import { RouterModule } from '@angular/router';

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
    this.pizzasService.delete(pizza.id_pizza).subscribe(() => {
      this.loadAll();
    });
  }
}
