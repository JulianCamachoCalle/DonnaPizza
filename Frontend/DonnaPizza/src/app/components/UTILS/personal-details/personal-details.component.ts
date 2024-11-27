import { Component, OnInit } from '@angular/core';
import { User } from '../../../services/auth/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/auth/login.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personal-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.css'
})
export class PersonalDetailsComponent implements OnInit {
  errorMessage: String = "";
  user?: User;
  userLoginOn: boolean = false;
  editMode: boolean = false;
  registerForm!: FormGroup;


  constructor(private userService: UserService, private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { }

  get nombre() {
    return this.registerForm.get('nombre');
  }

  get apellido() {
    return this.registerForm.get('apellido');
  }

  get direccion() {
    return this.registerForm.get('direccion');
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next: () => {
          // Cambiar el estado de editMode a false, ya que los cambios se guardaron
          this.editMode = false;
          // Actualizar el objeto user con los nuevos valores del formulario
          this.user = this.registerForm.value as unknown as User;

          // Mostrar mensaje de éxito con SweetAlert2
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Los datos se han actualizado correctamente.',
            confirmButtonText: 'Aceptar'
          });
        },
        error: (errorData) => {
          console.error(errorData);
          // Mostrar mensaje de error si algo sale mal
          Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un problema al actualizar los datos.',
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      // Si el formulario no es válido, muestra un mensaje para que el usuario lo complete
      this.registerForm.markAllAsTouched();
      Swal.fire({
        icon: 'warning',
        title: '¡Campos inválidos!',
        text: 'Por favor, completa todos los campos correctamente.',
        confirmButtonText: 'Aceptar'
      });
    }
  }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id_usuario: [''],
      nombre: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/)]],
      direccion: ['', Validators.required],
    });

    // Escuchar el userId desde el LoginService
    this.loginService.userId.subscribe({
      next: (userId) => {
        if (userId !== null) {
          this.userService.getUser(Number(userId)).subscribe({
            next: (userData) => {
              this.user = userData;
              this.registerForm.patchValue({
                id_usuario: userData.id_usuario,
                username: userData.username,
                nombre: userData.nombre,
                apellido: userData.apellido,
                telefono: userData.telefono,
                direccion: userData.direccion,
                password: userData.password,
              });
            },
            error: (errorData) => {
              this.errorMessage = 'Error al cargar los datos del usuario. Inténtalo de nuevo más tarde.';
              console.error(errorData);
            },
            complete: () => {
              console.log("User Data ok");
            }
          });
        }
      }
    });

    // Escuchar si el usuario está logueado
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
      }
    });
  }

  logOut() {
    this.loginService.logOut();
    this.router.navigate(['/login'])
  }
}
