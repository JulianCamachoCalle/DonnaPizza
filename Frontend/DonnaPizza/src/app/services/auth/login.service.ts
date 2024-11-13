import { Injectable } from '@angular/core';
import { LoginRequest } from './login.Request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);

  constructor(private http: HttpClient) {
    const helper = new JwtHelperService();
    const token = sessionStorage.getItem("token");
    if (token) {
      this.currentUserLoginOn.next(true);
      const decodedToken = helper.decodeToken(token);
      this.currentUserData.next(token);
      this.currentUserId.next(decodedToken.userId);
    }
  }

  login(credentials: LoginRequest): Observable<any> {
    const helper = new JwtHelperService();
    return this.http.post<any>(environment.urlHost + "auth/login", credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.currentUserData.next(userData.token);
        const decodedToken = helper.decodeToken(userData.token);
        const userId = Number(decodedToken.userId);
        this.currentUserId.next(userId);
        this.currentUserLoginOn.next(true);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  logOut():void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this.currentUserId.next(null);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log("Se ha producido un error", error.error)
    } else {
      console.log('Retorno', error)
    }
    return throwError(() => new Error('Algo salio mal'))
  }

  get userData():Observable<String> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userId(): Observable<number | null> {
    return this.currentUserId.asObservable();
  }

  get userToken(): String {
    return this.currentUserData.value
  }
}
