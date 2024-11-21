import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pedido } from '../../../models/pedidos.model'; // Asegúrate de tener este modelo creado
import { PedidoService } from '../../../services/pedidos/pedidos.service'; // Ruta al servicio
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DasbordnavComponent } from '../../dasbordnav/dasbordnav.component';

@Component({
  selector: 'app-crudpedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, DasbordnavComponent],
  templateUrl: './crudpedidos.component.html',
  styleUrls: ['./crudpedidos.component.css']
})
export class CRUDPedidosComponent implements OnInit {
  private pedidosService = inject(PedidoService);

  pedidos: any[] = [];

  ngOnInit(): void {
    this.pedidosService.list().subscribe((pedidos: any) => {
      this.pedidos = pedidos;
    })
  }

  loadAll() {
    this.pedidosService.list().subscribe(pedidos => {
      this.pedidos = pedidos;
    })
  }

  deletePedido(pedido: Pedido) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el pedido con ID ${pedido.id_pedido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidosService.delete(pedido.id_pedido).subscribe(() => {
          this.loadAll(); // Recarga la lista de pedidos
          Swal.fire(
            '¡Eliminado!',
            `El pedido con ID ${pedido.id_pedido} ha sido eliminado.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el pedido. Inténtalo nuevamente.',
            'error'
          );
        });
      }
    });
  }

  generarReporteExcel() {
    const url = 'http://localhost:8080/excelpedidos'; // Ajusta la ruta según tu API
    window.open(url, '_blank');
  }
}
