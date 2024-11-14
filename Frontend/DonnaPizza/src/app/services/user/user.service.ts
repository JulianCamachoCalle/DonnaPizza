import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { User } from '../auth/user';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  // Obtener usuario por ID
  getUser(id_usuario: number): Observable<User> {
    return this.http.get<User>(environment.urlApi + "user/" + id_usuario).pipe(
      catchError(this.handleError)
    )
  }

  // Actualizar usuario
  updateUser(userRequest: User): Observable<any> {
    return this.http.put(environment.urlApi + "user", userRequest).pipe(
      catchError(this.handleError)
    )
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error', error.error)
    } else {
      console.error('No retorno', error.status, error.error)
    }
    return throwError(() => new Error('Algo salio mal. Intenete nuevamente'))
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(environment.urlApi + "user", userData);
  }

  checkUsernameExistence(email: string): Observable<any> {
    console.log(`Verificando existencia del email: ${email}`);

    // Verifica la URL antes de enviar la solicitud
    const url = `${environment.urlApi}user/check-email/${email}`;
    console.log("URL de la API:", url);

    return this.http.get<any>(url).pipe(
      tap((exists) => console.log("Resultado de la verificación (respuesta de la API):", exists)),
      catchError((error) => {
        console.error("Error en la verificación del email:", error);
        return of(false); // Retorna false si hay un error
      })
    );
  }

  checkTelefonoExistence(telefono: string): Observable<any> {
    console.log(`Verificando existencia del telfono: ${telefono}`);

    // Verifica la URL antes de enviar la solicitud
    const url = `${environment.urlApi}user/check-telefono/${telefono}`;
    console.log("URL de la API:", url);

    return this.http.get<any>(url).pipe(
      tap((exists) => console.log("Resultado de la verificación (respuesta de la API):", exists)),
      catchError((error) => {
        console.error("Error en la verificación del telefono:", error);
        return of(false); // Retorna false si hay un error
      })
    );
  }
}
