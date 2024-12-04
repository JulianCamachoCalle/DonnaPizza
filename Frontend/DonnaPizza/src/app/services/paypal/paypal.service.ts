import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PayPalService {
  private apiUrl = 'http://localhost:8080/api/v1/paypal';

  constructor(private http: HttpClient) {}

  makePayment(total: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/pay`, { total });
  }
}
