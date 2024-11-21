import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePedido } from '../../models/detallepedido.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  private urlApiDetallePedido = environment.urlApiDetallePedido; 

  constructor(private http: HttpClient) {}

  list(): Observable<DetallePedido[]> {
    return this.http.get<DetallePedido[]>(this.urlApiDetallePedido);
  }

  get(id: number): Observable<DetallePedido> {
    return this.http.get<DetallePedido>(`${this.urlApiDetallePedido}/${id}`);
  }

  create(detalle: DetallePedido): Observable<DetallePedido> {
    return this.http.post<DetallePedido>(this.urlApiDetallePedido, detalle);
  }

  update(id: number, detalle: DetallePedido): Observable<DetallePedido> {
    return this.http.put<DetallePedido>(`${this.urlApiDetallePedido}/${id}`, detalle);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApiDetallePedido}/${id}`);
  }
}
