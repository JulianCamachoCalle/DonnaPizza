import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PizzasDetailsComponent } from "../pizzas-details/pizzas-details.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, PizzasDetailsComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
