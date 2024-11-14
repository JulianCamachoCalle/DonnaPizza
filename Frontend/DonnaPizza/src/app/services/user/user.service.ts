import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
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
}
