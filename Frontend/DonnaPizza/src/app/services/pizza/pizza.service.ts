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

  getPizzas(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(environment.urlApi + 'pizzas');
  }

  getPizzaById(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(`${environment.urlApi}pizzas/${id}`);
  }
}
