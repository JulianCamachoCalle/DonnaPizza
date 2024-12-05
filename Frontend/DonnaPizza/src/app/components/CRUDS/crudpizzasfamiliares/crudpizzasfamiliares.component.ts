import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PizzaFamiliar } from '../../../models/pizzafamiliares.model';
import { PizzasFamiliaresService } from '../../../services/pizzasfamiliares/pizzasfamiliares.service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { DasbordnavComponent } from "../../dasbordnav/dasbordnav.component";

@Component({
  selector: 'app-crudpizzasfamiliares',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, DasbordnavComponent],
  templateUrl: './crudpizzasfamiliares.component.html',
  styleUrls: ['./crudpizzasfamiliares.component.css']
})
export class CRUDPizzasFamiliaresComponent implements OnInit {
  private pizzasFamiliaresService = inject(PizzasFamiliaresService);

  pizzasFamiliares: any[] = [];

  ngOnInit(): void {
    this.pizzasFamiliaresService.list().subscribe((pizzasFamiliares: any) => {
      this.pizzasFamiliares = pizzasFamiliares;
    });
  }

  loadAll() {
    this.pizzasFamiliaresService.list().subscribe(pizzasFamiliares => {
      this.pizzasFamiliares = pizzasFamiliares;
    });
  }

  deletePizzaFamiliar(pizzaFamiliar: PizzaFamiliar) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Deseas eliminar la pizza familiar "${pizzaFamiliar.nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pizzasFamiliaresService.delete(pizzaFamiliar.id_pizzasFamiliares).subscribe(() => {
          this.loadAll(); // Recarga la lista de pizzas familiares
          Swal.fire(
            '¡Eliminada!',
            `La pizza familiar "${pizzaFamiliar.nombre}" ha sido eliminada.`,
            'success'
          );
        }, (error) => {
          Swal.fire(
            'Error',
            'Hubo un problema al eliminar la pizza familiar. Inténtalo nuevamente.',
            'error'
          );
        });
      }
    });
  }

  generarReporteExcel() {
    const url = 'http://localhost:8080/excelpizzasfamiliares';
    window.open(url, '_blank');
  }
}
