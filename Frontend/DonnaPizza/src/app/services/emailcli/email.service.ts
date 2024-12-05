import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  private apiUrl = 'http://localhost:8080/api/email'; // Cambiar al endpoint de tu backend

  constructor(private http: HttpClient) {}

  sendInvoice(emailData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/send`, emailData);
  }
}
