import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../models/cliente.model';
import { ClienteService } from '../../../services/cliente/cliente.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DasbordnavComponent } from "../../dasbordnav/dasbordnav.component";

@Component({
  selector: 'app-crudclientes',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, DasbordnavComponent],
  templateUrl: './crudcliente.component.html',
  styleUrls: ['./crudcliente.component.html']
})
export class CRUDClientesComponent implements OnInit {
  private clientesService = inject(ClienteService);

  clientes: any[] = [];

  ngOnInit(): void {
    this.clientesService.list().subscribe((clientes: any) => {
      this.clientes = clientes;
    });
  }

  loadAll() {
    this.clientesService.list().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  deleteCliente(cliente: Cliente) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar al cliente "${cliente.nombre} ${cliente.apellido}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientesService.delete(cliente.id_cliente).subscribe(() => {
          this.loadAll(); // Recarga la lista de clientes
          Swal.fire(
            '¡Eliminado!',
            `El cliente "${cliente.nombre} ${cliente.apellido}" ha sido eliminado.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar al cliente. Inténtalo nuevamente.',
            'error'
          );
        });
      }
    });
  }

  generarReporteExcel() {
    const url = 'http://localhost:8080/excelclientes'; // Ajusta la ruta según tu API
    window.open(url, '_blank');
  }
}
