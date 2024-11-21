import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../../models/cliente.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlApiCliente = environment.urlApiCliente; // URL del endpoint para clientes

  constructor(private http: HttpClient) {}

  list(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlApiCliente);
  }

  get(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlApiCliente}/${id}`);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlApiCliente, cliente);
  }

  update(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.urlApiCliente}/${id}`, cliente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.urlApiCliente}/${id}`);
  }
}
