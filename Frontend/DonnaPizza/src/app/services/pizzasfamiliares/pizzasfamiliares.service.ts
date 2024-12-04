import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PizzaFamiliar } from '../../models/pizzafamiliares.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PizzasFamiliaresService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<PizzaFamiliar[]>(environment.urlApiPizzasFamiliares);
  }

  get(id: number) {
    return this.http.get<PizzaFamiliar>(`${environment.urlApiPizzasFamiliares}/${id}`);
  }

  create(pizzaFamiliar: PizzaFamiliar) {
    return this.http.post<PizzaFamiliar>(environment.urlApiPizzasFamiliares, pizzaFamiliar);
  }

  update(id: number, pizzaFamiliar: PizzaFamiliar) {
    return this.http.put<PizzaFamiliar>(`${environment.urlApiPizzasFamiliares}/${id}`, pizzaFamiliar);
  }

  delete(id: number) {
    return this.http.delete<void>(`${environment.urlApiPizzasFamiliares}/${id}`);
  }

  exportarExcel(): void {
    window.location.href = '/excelpizzasfamiliares';
  }
}
