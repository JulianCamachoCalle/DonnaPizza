import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PizzaListComponentComponent } from '../../UTILS/pizza-list-component/pizza-list-component.component';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { FooterComponent } from '../../../footer/footer.component';

@Component({
  selector: 'app-carta',
  standalone: true,
  imports: [CommonModule, PizzaListComponentComponent, NavbarComponent, FooterComponent],
  templateUrl: './carta.component.html',
  styleUrl: './carta.component.css'
})
export class CartaComponent {
}
