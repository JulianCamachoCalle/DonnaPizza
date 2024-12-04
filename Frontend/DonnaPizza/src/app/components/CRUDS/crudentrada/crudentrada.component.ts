import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Entrada } from '../../../models/enrtrada.model';
import { EntradaService } from '../../../services/entrada/entrada.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DasbordnavComponent } from "../../dasbordnav/dasbordnav.component";

@Component({
  selector: 'app-crudentradas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, DasbordnavComponent],
  templateUrl: './crudentrada.component.html',
  styleUrl: './crudentrada.component.css'
})
export class CRUDEntradasComponent implements OnInit {
  private entradasService = inject(EntradaService);

  entradas: any[] = [];

  ngOnInit(): void {
    this.entradasService.list().subscribe((entradas: any) => {
      this.entradas = entradas;
    });
  }

  loadAll() {
    this.entradasService.list().subscribe(entradas => {
      this.entradas = entradas;
    });
  }

  deleteEntrada(entrada: Entrada) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la entrada "${entrada.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.entradasService.delete(entrada.id_entrada).subscribe(() => {
          this.loadAll(); // Recarga la lista de entradas
          Swal.fire(
            '¡Eliminada!',
            `La entrada "${entrada.nombre}" ha sido eliminada.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar la entrada. Inténtalo nuevamente.',
            'error'
          );
        });
      }
    });
  }

  generarReporteExcel() {
    const url = 'http://localhost:8080/excelentradas';
    window.open(url, '_blank');
  }
}
