import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from '../../services/auth/login.Request';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      passwordlogin: ['', [Validators.required, Validators.minLength(8)]],
    })

    this.registerForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      direccion: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

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
        alert(response.message);
        this.router.navigate(['/login']);
      },
      error: (errorData) => {
        console.log(errorData);
        this.loginError = errorData.error.message || 'Error al iniciar sesión';
      }
    });
  }

  login() {
    if (this.loginForm.valid) {
      this.loginError = "";
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          console.log(userData);
        },
        error: (errorData) => {
          console.log(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          console.info("Login Completo");
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert("error al ingresar los datos");
    }
  }
}
