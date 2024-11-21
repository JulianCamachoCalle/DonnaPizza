import { Injectable } from '@angular/core';
import { LoginRequest } from './login.Request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");
  currentUserId: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  currentUserRole: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private router: Router) {
    const token = sessionStorage.getItem("token");
    if (token) {
      this.initializeUser(token);
    }
  }

  private initializeUser(token: string): void {
    this.currentUserLoginOn.next(true);
    const decodedToken = this.jwtHelper.decodeToken(token);
    console.log(decodedToken)
    this.currentUserData.next(token);
    this.currentUserId.next(decodedToken.userId);
    this.currentUserRole.next(decodedToken.rol);
  }

  login(credentials: LoginRequest): Observable<any> {
    return this.http.post<any>(`${environment.urlHost}auth/login`, credentials).pipe(
      tap((userData) => {
        sessionStorage.setItem("token", userData.token);
        this.initializeUser(userData.token);
      }),
      map((userData) => userData.token),
      catchError(this.handleError)
    );
  }

  getUserRole(): string | null {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.rol;
    }
    return null;
  }

  logOut(): void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
    this.currentUserId.next(null);
    this.currentUserRole.next(null);
    this.router.navigate(['/login']);
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error:', error);
    return throwError(() => new Error('Algo salió mal: ' + error.message));
  }

  get userData(): Observable<String> {
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
