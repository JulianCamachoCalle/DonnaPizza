import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private http: HttpClient) { }

  verificarEmail(email: string) {
    return this.http.post(`${environment.urlForgotPassword}/verificarEmail/${email}`, {}, { responseType: 'text' });
  }

  verificarOTP(otp: number, email: string): Observable<string> {
    return this.http.post<string>(
      `${environment.urlForgotPassword}/verificarOTP/${otp}/${email}`,
      {}
    );
  }

  cambiarContrasena(email: string, passwords: { password: string; repeatPassword: string }): Observable<string> {
    return this.http.post<string>(`${environment.urlForgotPassword}/changePassword/${email}`, passwords);
  }
}
