import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-boleta',
  templateUrl: './boleta.component.html',
  styleUrls: ['./boleta.component.css']
})
export class BoletaComponent implements OnInit {
  cliente: any;
  total: number = 0;
  fecha: string = new Date().toISOString();

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Simulación: los datos se pasarían mediante un servicio o parámetros
    this.cliente = history.state.cliente;
    this.total = history.state.total;
  }

  finalizar(): void {
    alert('Boleta generada exitosamente.');
    this.router.navigate(['/']); // Redirige al inicio
  }
}
