import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetallePedido } from '../../../models/detallepedido.model';
import { DetallePedidoService } from '../../../services/detallepedido/detallepedido.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DasbordnavComponent } from "../../dasbordnav/dasbordnav.component";

@Component({
  selector: 'app-detallepedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, DasbordnavComponent],
  templateUrl: './cruddetallespedidos.component.html',
  styleUrls: ['./cruddetallespedidos.component.css'] // En plural
})
export class DetallePedidosComponent implements OnInit {
  private detallePedidoService = inject(DetallePedidoService);

  detallePedidos: any[] = [];

  ngOnInit(): void {
    this.loadAll(); // Carga todos los detalles de pedidos al inicio
  }

  loadAll() {
    this.detallePedidoService.list().subscribe((detalles: DetallePedido[]) => {
      this.detallePedidos = detalles;
    });
  }

  deleteDetallePedido(detallePedido: DetallePedido) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar el detalle del pedido con ID: ${detallePedido.id_detalle}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.detallePedidoService.delete(detallePedido.id_detalle).subscribe(() => {
          this.loadAll(); // Recarga la lista de detalles de pedidos
          Swal.fire(
            '¡Eliminado!',
            `El detalle del pedido con ID: ${detallePedido.id_detalle} ha sido eliminado.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar el detalle del pedido. Inténtalo nuevamente.',
            'error'
          );
        });
      }
    });
  }

  generarReporteExcel() {
    const url = 'http://localhost:8080/exceldetallepedidos';
    window.open(url, '_blank');
  }
}
