import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import { PersonalDetailsComponent } from "../../UTILS/personal-details/personal-details.component";
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "../../../navbar/navbar.component";
import { FooterComponent } from "../../../footer/footer.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, PersonalDetailsComponent, NavbarComponent, FooterComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userLoginOn: boolean = false;
  isAdmin: boolean = false;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!userLoginOn) {
          this.router.navigate(['/login']);
        } else {
          // Verifica si el usuario tiene rol ADMIN
          this.isAdmin = this.loginService.getUserRole() === 'ADMIN';
        }
      }
    });
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
}
