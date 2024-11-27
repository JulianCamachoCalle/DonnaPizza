import { Component } from '@angular/core';
import { ForgotPasswordService } from '../../services/auth/forgot-password.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { FooterComponent } from "../../footer/footer.component";
import { NavbarComponent } from "../../navbar/navbar.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, FooterComponent, NavbarComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  step = 1;
  email = '';
  otp!: number;
  password = '';
  repeatPassword = '';
  forgotPassword!: FormGroup;

  constructor(private authService: ForgotPasswordService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.forgotPassword = this.formBuilder.group({
      emailvalidar: ['', [Validators.required, Validators.email]]
    });
  }

  enviarEmail() {
    Swal.fire({
      title: 'Enviando correo...',
      html: '<img src="assets/gif/pizza-loading.gif" alt="Cargando..." style="width: 100px; height: 100px;">',
      allowOutsideClick: false,
      showConfirmButton: false,
    });
    this.authService.verificarEmail(this.email).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Correo enviado!',
          text: 'Por favor, revisa tu bandeja de entrada para obtener tu TOKEN.',
        });
        this.step = 2;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.error || 'Error al enviar el email.',
        });
      },
    });
  }


  verificarOTP() {
    Swal.fire({
      title: 'Verificando TOKEN...',
      text: 'Por favor espera unos segundos.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService.verificarOTP(this.otp, this.email).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡TOKEN Verificado!',
          text: 'Puedes continuar con el cambio de contraseña.',
        });
        this.step = 3;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error.error || 'TOKEN incorrecto o expirado.',
        });
      },
    });
  }

  cambiarContrasena() {
    this.authService
      .cambiarContrasena(this.email, { password: this.password, repeatPassword: this.repeatPassword })
      .subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Contraseña cambiada!',
            text: 'Ahora puedes iniciar sesión con tu nueva contraseña.',
            timer: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000);
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.error.error || 'Error al cambiar la contraseña.',
          });
        },
      });
  }

  get emailvalidar() {
    return this.forgotPassword.get('email');
  }
}
