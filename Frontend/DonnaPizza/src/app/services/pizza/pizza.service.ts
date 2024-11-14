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

  list() {
    return this.http.get<Pizza[]>(environment.urlApiPizzas);
  }

  get(id: number) {
    return this.http.get<Pizza>(`${environment.urlApiPizzas}/${id}`);
  }

  create(pizza: Pizza) {
    return this.http.post<Pizza>(environment.urlApiPizzas, pizza)
  }

  update(id: number, pizza: Pizza) {
    return this.http.put<Pizza>(`${environment.urlApiPizzas}/${id}`, pizza);
  }

  delete(id: number) {
    return this.http.delete<void>(`${environment.urlApiPizzas}/${id}`);
  }

  exportarExcel(): void {
    window.location.href = '/excelpizzas';
  }
}
