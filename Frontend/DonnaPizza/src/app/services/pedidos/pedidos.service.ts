import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../../models/pedidos.model'; // Modelo de Pedido
import { environment } from '../../../environments/environment.development'; // Archivo de configuración del entorno

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  // Obtener todos los pedidos
  list(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(environment.urlApiPedidos); // Ajusta 'urlApiPedidos' en tu archivo de entorno
  }

  // Obtener un pedido por ID
  get(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${environment.urlApiPedidos}/${id}`);
  }

  // Crear un nuevo pedido
  create(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(environment.urlApiPedidos, pedido);
  }

  // Actualizar un pedido existente
  update(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${environment.urlApiPedidos}/${id}`, pedido);
  }

  // Eliminar un pedido por ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.urlApiPedidos}/${id}`);
  }

  // Exportar pedidos a Excel
  exportarExcel(): void {
    window.location.href = '/excelpedidos'; // Ajusta esta ruta según tu API
  }
}
