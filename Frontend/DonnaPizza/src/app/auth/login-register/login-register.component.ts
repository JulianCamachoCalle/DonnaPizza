import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/login.Request';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import Swal from 'sweetalert2';
import { emailValidator } from '../../validators/email.validators';
import { telefonoValidators } from '../../validators/telefonoValidators';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, FooterComponent, RouterLink],
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  errorMessage: string = "";
  loginError: string = "";

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private userService: UserService, private router: Router) { }
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      usernamelogin: ['', [Validators.required, Validators.email]],
      passwordlogin: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*.]).{8,}$/)]]
    });

    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
      username: ['', [Validators.required, Validators.email], [emailValidator(this.userService)]],
      telefono: ['', [Validators.required, Validators.pattern(/^9\d{8}$/)], [telefonoValidators(this.userService)]],
      direccion: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#$&*.]).{8,}$/)]]
    });

    const registerButton: HTMLElement | null = document.getElementById('register');
    const loginButton: HTMLElement | null = document.getElementById('login');
    const contenedor: HTMLElement | null = document.getElementById('contenedor');

    // Evento para cambiar a Registro
    if (registerButton) {
      registerButton.addEventListener('click', () => {
        if (contenedor) {
          contenedor.classList.add('active');
        }
      });
    }

    // Evento para cambiar a Inicio de Sesión
    if (loginButton) {
      loginButton.addEventListener('click', () => {
        if (contenedor) {
          contenedor.classList.remove('active');
        }
      });
    }
  }

  get usernamelogin() {
    return this.loginForm.get('usernamelogin');
  }

  get passwordlogin() {
    return this.loginForm.get('passwordlogin');
  }

  get nombre() {
    return this.registerForm.get('nombre');
  }

  get apellido() {
    return this.registerForm.get('apellido');
  }

  get username() {
    return this.registerForm.get('username');
  }

  get telefono() {
    return this.registerForm.get('telefono');
  }

  get direccion() {
    return this.registerForm.get('direccion');
  }

  get password() {
    return this.registerForm.get('password');
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.errorMessage = "Por favor complete todos los campos.";
      return;
    }

    this.userService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        // Muestra un mensaje de éxito usando SweetAlert2
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: response.message,  // Muestra el mensaje de la respuesta
          confirmButtonText: 'Aceptar'
        }).then(() => {
          // Redirige al login y recarga la página
          this.router.navigate(['/login']).then(() => {
            window.location.reload();
          });
        });
      },
      error: (errorData) => {
        console.log(errorData);
        this.loginError = errorData.error.message || 'Error al registrar el usuario';
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: this.loginError,
          confirmButtonText: 'Aceptar'
        });
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";

      // Llamamos al loginService y verificamos las credenciales
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          // Si el login es exitoso, mostramos mensaje de éxito
          Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: 'Bienvenido a Donna Pizza.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.router.navigateByUrl('/dashboard');
            this.loginForm.reset();
          });
        },
        error: (errorData) => {
          // Aquí capturamos el error
          console.log(errorData);
          this.loginError = 'Verifica tus datos';
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: this.loginError,
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      // Si el formulario no es válido, mostramos un mensaje de advertencia
      this.loginForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: '¡Campos inválidos!',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'Aceptar'
      });
    }
  }

}
