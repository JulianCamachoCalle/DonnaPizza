import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cartservicio/cart.service';
import { Cliente } from '../../../models/cliente.model';
import { NavbarComponent } from '../../../navbar/navbar.component';
import { PayPalService } from '../../../services/paypal/paypal.service'; // Servicio de PayPal
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

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
    private payPalService: PayPalService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getItems().map((item) => ({
      ...item,
      total: item.cantidad * item.precio,
    }));
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
    const total = this.cartItems
      .reduce((sum, item) => sum + item.precio * item.cantidad, 0)
      .toFixed(2);

    this.payPalService.makePayment(total).subscribe(
      (response) => {
        if (response.status === 'success') {
          window.location.href = response.redirect_url;
          alert('Pago con PayPal completado.');

          this.enviarDetallePedido(response.id_pedido);
          this.pagoCompletado = true;
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

  enviarDetallePedido(idPedido: number): void {
    this.cartItems.forEach((item) => {
      const detallePedido = {
        id_pedido: idPedido,
        id_pizza: item.tipo === 'pizza' && item.tamano === 'mediana' ? item.id : null,
        id_pizza_familiar: item.tipo === 'pizza' && item.tamano === 'familiar' ? item.id : null,
        id_pasta: item.tipo === 'pasta' ? item.id : null,
        id_entrada: item.tipo === 'entrada' ? item.id : null,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.cantidad * item.precio,
      };

      this.cartService.createDetallePedido(detallePedido).subscribe(
        (response) => {
          console.log('Detalle de pedido registrado:', detallePedido);
        },
        (error) => {
          console.error('Error al registrar el detalle del pedido:', error);
        }
      );
    });

    this.cartService.clearCart();
  }

  realizarPagoYape(): void {
    const total = this.cartItems
      .reduce((sum, item) => sum + item.precio * item.cantidad, 0)
      .toFixed(2);

    this.payPalService.makePayment(total).subscribe(
      (response) => {
        if (response.status === 'success') {
          alert('Pago con Yape completado.');

          const idPedido = response.id_pedido;
          this.enviarDetallePedido(idPedido);
          this.pagoCompletado = true;
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

  verificarPagoTarjeta(): void {
    if (this.tarjeta.numero && this.tarjeta.fechaVencimiento && this.tarjeta.cvv) {
      alert('Pago con tarjeta completado.');
      this.pagoCompletado = true;
    } else {
      alert('Por favor, ingresa los datos de la tarjeta correctamente.');
    }
  }

  descargarPDF(tipo: string): void {
    const doc = new jsPDF();
  
    // Ruta de la imagen dentro de 'assets'
    const logoPath = 'assets/img/logo.png';
  
    // Agregar logo al PDF
    doc.addImage(logoPath, 'PNG', 10, 10, 30, 20);
  
    // Información de encabezado
    doc.setFontSize(12);
    doc.text('EMPRESA PRUEBA', 50, 20);
    doc.text('R.U.C. N° 123456789', 50, 30);
    doc.text('BOLETA DE VENTA ELECTRÓNICA', 150, 20, { align: 'right' });
    doc.text(`B003-${Math.floor(1000 + Math.random() * 9000)}`, 150, 30, { align: 'right' });
  
    // Información del cliente
    doc.setFontSize(10);
    doc.text('Fecha emisión: 21/09/2023', 10, 50);
    doc.text('Señor(es): ' + this.cliente.nombre + ' ' + this.cliente.apellido, 10, 60);
    doc.text('DNI: -', 10, 70);
    doc.text('Dirección: ' + this.cliente.direccion, 10, 80);
  
    // Validar datos del carrito
    console.log('Contenido del carrito:', this.cartItems);
  
    // Generar filas para la tabla
    const rows = this.cartItems.map((item) => [
      item.nombre || 'Sin nombre',
      item.cantidad || 0,
      item.precio.toFixed(2) || '0.00',
      (item.cantidad * item.precio).toFixed(2) || '0.00'
    ]);
  
    console.log('Filas procesadas:', rows);
  
    // Encabezados de la tabla
    const columns = ['Producto', 'Cantidad', 'Precio Unitario', 'Total'];
  
    // Crear la tabla con autoTable
    (doc as any).autoTable({
      head: [columns],
      body: rows,
      startY: 90,
      theme: 'grid',
    });
  
    // Calcular totales
    const total = this.cartItems.reduce((sum, item) => sum + item.cantidad * item.precio, 0);
    const subtotal = (total / 1.18).toFixed(2);
    const igv = (total - parseFloat(subtotal)).toFixed(2);
  
    // Posición después de la tabla
    const finalY = (doc as any).lastAutoTable.finalY + 10;
    doc.text(`SUB TOTAL: S/ ${subtotal}`, 150, finalY, { align: 'right' });
    doc.text(`IGV (18%): S/ ${igv}`, 150, finalY + 10, { align: 'right' });
    doc.text(`TOTAL: S/ ${total.toFixed(2)}`, 150, finalY + 20, { align: 'right' });
  
    // Pie de página
    doc.setFontSize(8);
    doc.text('Representación impresa de la Factura electrónica.', 10, 280);
    doc.text('Consulte su documento en https://consulta.ejemplo.com', 10, 290);
  
    // Descargar PDF
    doc.save(`${tipo}.pdf`);
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