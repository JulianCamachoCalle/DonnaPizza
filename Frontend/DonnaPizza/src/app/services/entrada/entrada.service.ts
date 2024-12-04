import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrada } from '../../models/enrtrada.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EntradaService {

  constructor(private http: HttpClient) {}

  list(): Observable<Entrada[]> {
    return this.http.get<Entrada[]>(environment.urlApiEntradas);
  }

  get(id: number): Observable<Entrada> {
    return this.http.get<Entrada>(`${environment.urlApiEntradas}/${id}`);
  }

  create(entrada: Entrada): Observable<Entrada> {
    return this.http.post<Entrada>(environment.urlApiEntradas, entrada);
  }

  update(id: number, entrada: Entrada): Observable<Entrada> {
    return this.http.put<Entrada>(`${environment.urlApiEntradas}/${id}`, entrada);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.urlApiEntradas}/${id}`);
  }

  exportarExcel(): void {
    window.location.href = '/excelentradas';
  }
}
