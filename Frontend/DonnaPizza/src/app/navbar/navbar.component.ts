import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { JwtInterceptorService } from '../services/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from '../services/auth/error-interceptor.service';
import { LoginService } from '../services/auth/login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true }
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  userLoginOn: boolean = false;
  constructor(private loginService: LoginService, private router: Router) { }

  title = 'Vigilando-Por-Ti';

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    })
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/'])
  }
}
