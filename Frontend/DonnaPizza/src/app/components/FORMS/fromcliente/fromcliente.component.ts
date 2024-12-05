import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cartservicio/cart.service';
import { Cliente } from '../../../models/cliente.model';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { PayPalService } from '../../../services/paypal/paypal.service'; // Servicio de PayPal

@Component({
  selector: 'app-new-cliente',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
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

  cartItems: any[] = [];
  metodoPago: string = '';
  tarjeta = {
    numero: '',
    fechaVencimiento: '',
    cvv: '',
  };
  pagoCompletado: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private cartService: CartService,
    private payPalService: PayPalService, // Servicio de PayPal
    private router: Router
  ) {}

  ngOnInit(): void {
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

      // Crear cliente en el backend
      this.clienteService.create(newCliente).subscribe(
        (createdCliente: Cliente) => {
          alert('Cliente creado exitosamente');

          // Calcular el total del carrito
          const total = this.cartItems.reduce((sum, item) => sum + item.precio, 0);

          // Crear pedido asociado
          const newPedido = {
            id_usuario: null, // Se mantiene en null por ahora
            id_cliente: createdCliente.id_cliente,
            fecha: new Date().toISOString(),
            total: total,
          };

          this.createPedido(newPedido); // Llamar al método para crear el pedido
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

  createPedido(newPedido: any): void {
    this.cartService.createPedido(newPedido).subscribe(
      () => {
        alert('Pedido registrado exitosamente');
        this.router.navigate(['/pedidos']); // Redirige a la lista de pedidos
      },
      (error) => {
        alert('Hubo un problema al registrar el pedido');
        console.error(error);
      }
    );
  }

  realizarPagoPayPal(): void {
    const total = this.cartItems.reduce((sum, item) => sum + item.precio, 0).toFixed(2);

    this.payPalService.makePayment(total).subscribe(
      (response) => {
        if (response.status === 'success') {
          window.location.href = response.redirect_url; // Redirige a PayPal
        } else {
          alert('Error en el pago: ' + response.message);
        }
      },
      (error) => {
        console.error('Error: ', error);
        alert('Error al procesar el pago.');
      }
    );
  }

  realizarPagoYape(): void {
    alert('Por favor, escanea el código QR de Yape para completar el pago.');
    // Simulación de pago con Yape
    setTimeout(() => {
      this.pagoCompletado = true;
      alert('Pago con Yape completado.');
    }, 2000);
  }

  verificarPagoTarjeta(): void {
    const total = this.cartItems.reduce((sum, item) => sum + item.precio, 0);
    // Simulación de validación de tarjeta
    if (this.tarjeta.numero && this.tarjeta.fechaVencimiento && this.tarjeta.cvv) {
      this.pagoCompletado = true;
      alert('Pago con tarjeta completado.');
    } else {
      alert('Por favor, ingresa los datos de la tarjeta correctamente.');
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
