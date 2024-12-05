import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Pasta } from '../../../models/pastas.model';
import { PastaService } from '../../../services/pastas/pastas.service';
import Swal from 'sweetalert2';
import { DasbordnavComponent } from "../../dasbordnav/dasbordnav.component";

@Component({
  selector: 'app-crudpastas',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, DasbordnavComponent],
  templateUrl: './crudpastas.component.html',
  styleUrls: ['./crudpastas.component.css']
})
export class CRUDPastasComponent implements OnInit {
  private pastaService = inject(PastaService);

  pastas: any[] = [];

  ngOnInit(): void {
    this.pastaService.list().subscribe((pastas) => {
      this.pastas = pastas;
    });
  }

  loadAll(): void {
    this.pastaService.list().subscribe(pastas => {
      this.pastas = pastas;
    });
  }

  deletePasta(pasta: Pasta): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la pasta "${pasta.descripcion}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pastaService.delete(pasta.id_pasta).subscribe(() => {
          this.loadAll();
          Swal.fire(
            '¡Eliminada!',
            `La pasta "${pasta.descripcion}" ha sido eliminada.`,
            'success'
          );
        }, () => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar la pasta. Inténtalo nuevamente.',
            'error'
          );
        });
      }
    });
  }

  generarReporteExcel() {
    const url = 'http://localhost:8080/excelpastas'; // Ajusta la ruta según tu API
    window.open(url, '_blank');
  }
}
