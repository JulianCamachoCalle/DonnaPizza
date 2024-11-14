import { Component, inject, OnInit } from '@angular/core';
import { PizzaService } from '../../services/pizza/pizza.service';
import { CommonModule } from '@angular/common';
import { Pizza } from '../../models/pizza.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pizza-list-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pizza-list-component.component.html',
  styleUrl: './pizza-list-component.component.css'
})
export class PizzaListComponentComponent implements OnInit {
  private pizzasService = inject(PizzaService)

  pizzas: Pizza[] = [];

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.pizzasService.list().subscribe(pizzas => {
        this.pizzas = pizzas;
      })
  }

  onImageError(event: any): void {
    event.target.src = 'assets/img/pizzas/predeterminada.jpg';
  }
}
