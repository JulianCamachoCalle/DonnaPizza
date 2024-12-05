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

  tipoComprobante: string = ''; // Nueva propiedad para almacenar boleta o factura

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
  
      this.clienteService.create(newCliente).subscribe(
        (createdCliente: Cliente) => {
          alert('Cliente creado exitosamente');
  
          const total = this.cartItems.reduce((sum, item) => sum + item.precio, 0);
  
          const newPedido = {
            id_usuario: null,
            id_cliente: createdCliente.id_cliente,
            fecha: new Date().toISOString(),
            total: total,
          };
  
          this.createPedido(newPedido);
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
        
        // Redirigir según el tipo de comprobante seleccionado
        if (this.tipoComprobante === 'boleta') {
          this.router.navigate(['fromclientes/boleta']);
        } else if (this.tipoComprobante === 'factura') {
          this.router.navigate(['fromclientes/factura']);
        }
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
          alert('Pago con PayPal completado.');
          this.pagoCompletado = true; // Habilitar el botón de realizar pedido
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
    setTimeout(() => {
      alert('Pago con Yape completado.');
      this.pagoCompletado = true; // Habilitar el botón de realizar pedido
    }, 2000);
  }
  
  verificarPagoTarjeta(): void {
    if (this.tarjeta.numero && this.tarjeta.fechaVencimiento && this.tarjeta.cvv) {
      alert('Pago con tarjeta completado.');
      this.pagoCompletado = true; // Habilitar el botón de realizar pedido
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
