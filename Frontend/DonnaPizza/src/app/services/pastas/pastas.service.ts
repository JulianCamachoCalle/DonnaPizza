import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pasta } from '../../models/pastas.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PastaService {

  constructor(private http: HttpClient) { }

  list(): Observable<Pasta[]> {
    return this.http.get<Pasta[]>(`${environment.urlApiPastas}`);
  }

  get(id: number): Observable<Pasta> {
    return this.http.get<Pasta>(`${environment.urlApiPastas}/${id}`);
  }

  create(pasta: Pasta): Observable<Pasta> {
    return this.http.post<Pasta>(`${environment.urlApiPastas}`, pasta);
  }

  update(id: number, pasta: Pasta): Observable<Pasta> {
    return this.http.put<Pasta>(`${environment.urlApiPastas}/${id}`, pasta);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.urlApiPastas}/${id}`);
  }

  exportarExcel(): void {
    window.location.href = `${environment.urlApiPastas}/excel`;
  }
}
