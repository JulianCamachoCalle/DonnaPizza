import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pizza } from '../../models/pizza.model';
import { PizzaService } from '../../services/pizza/pizza.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crudpizzas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './crudpizzas.component.html',
  styleUrl: './crudpizzas.component.css'
})
export class CRUDPizzasComponent {
  
}
