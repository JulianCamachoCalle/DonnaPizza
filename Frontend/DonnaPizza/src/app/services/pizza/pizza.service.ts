import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pizza } from '../../models/pizza.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }

  listarPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(environment.urlApiPizzas);
  }

  guardarPizza(pizza: Pizza): Observable<any> {
    return this.http.post(environment.urlApiPizzas, pizza);
  }

  cargarDatosPizza(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(`${environment.urlApiPizzas}/${id}`);
  }

  actualizarPizza(pizza: Pizza): Observable<any> {
    return this.http.put(`${environment.urlApiPizzas}/${pizza.id_pizza}`, pizza);
  }

  eliminarPizza(id: number): Observable<any> {
    return this.http.delete(`${environment.urlApiPizzas}/${id}`);
  }

  exportarExcel(): void {
    window.location.href = '/excelpizzas';
  }
}
