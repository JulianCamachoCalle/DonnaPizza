import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cartservicio/cart.service';
import { Cliente } from '../../../models/cliente.model';


@Component({
  selector: 'app-new-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './fromcliente.component.html',
  styleUrls: ['./fromcliente.component.css'],
})
export class NewClienteComponent {
  cliente = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
  };

  cartItems: any[] = []; // Aquí se almacenarán los datos del carrito

  constructor(
    private clienteService: ClienteService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtén los ítems del carrito al inicializar el componente
    this.cartItems = this.cartService.getItems();
  }

  saveCliente(): void {
    if (this.isValid()) {
      const newCliente: Cliente = {
        id_cliente: null as any,
        nombre: this.cliente.nombre,
        apellido: this.cliente.apellido,
        email: this.cliente.email,
        telefono: this.cliente.telefono,
        direccion: this.cliente.direccion,
      };

      this.clienteService.create(newCliente).subscribe(
        () => {
          alert('Cliente creado exitosamente');
          this.router.navigate(['/clientes']);
        },
        (error) => {
          alert('Hubo un problema al crear el cliente');
          console.error(error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
  }

  isValid(): boolean {
    return (
      this.cliente.nombre.trim() !== '' &&
      this.cliente.apellido.trim() !== '' &&
      this.cliente.email.includes('@') &&
      this.cliente.telefono.trim() !== '' &&
      this.cliente.direccion.trim() !== ''
    );
  }
}
