import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizzas-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizzas-details.component.html',
  styleUrl: './pizzas-details.component.css'
})
export class PizzasDetailsComponent {
  pizzas: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarPizzas();
  }

  cargarPizzas(): void {
    this.http.get<any[]>(environment.urlApi + "pizzas").subscribe({
      next: (data) => {
        // Mezclar las pizzas y seleccionar 3 aleatorias
        const shuffledPizzas = data.sort(() => 0.5 - Math.random());
        this.pizzas = shuffledPizzas.slice(0, 3);
      },
      error: (error) => {
        console.error('Error al obtener las pizzas:', error);
      }
    });
  }
}
