import { Component, OnInit, ViewChild } from '@angular/core';
import { PizzaService } from '../../services/pizza/pizza.service';
import { Pizza } from '../../models/pizza.model';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-pizza-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza-list-component.component.html',
  styleUrl: './pizza-list-component.component.css'
})
export class PizzaListComponentComponent implements OnInit {
  pizzas: Pizza[] = [];
  selectedPizza?: Pizza;

  constructor(private pizzaService: PizzaService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas(): void {
    this.pizzaService.getPizzas().subscribe((data: Pizza[]) => {
      this.pizzas = data;
    });
  }

  openPizzaModal(pizzaId: number, content: any): void {
    this.pizzaService.getPizzaById(pizzaId).subscribe((pizza: Pizza) => {
      this.selectedPizza = pizza;
      this.modalService.open(content);
    });
  }

  onImageError(event: any): void {
    event.target.src = 'assets/img/pizzas/predeterminada.jpg';
  }
}
