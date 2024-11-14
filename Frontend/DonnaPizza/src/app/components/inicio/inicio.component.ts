import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PizzasDetailsComponent } from "../pizzas-details/pizzas-details.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, PizzasDetailsComponent, NavbarComponent, FooterComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
