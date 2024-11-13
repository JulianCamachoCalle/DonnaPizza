import { Component, OnInit } from '@angular/core';
import { User } from '../../services/auth/user';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../services/auth/login.service';

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


  constructor(private userService: UserService, private formBuilder: FormBuilder, private loginService: LoginService) {
    // Escuchar el userId desde el LoginService
    this.loginService.userId.subscribe({
      next: (userId) => {
        if (userId !== null) {
          // Obtener datos del usuario al loguearse
          this.userService.getUser(Number(userId)).subscribe({
            next: (userData) => {
              this.user = userData;
              this.registerForm.controls['id_usuario'].setValue(userData.id_usuario.toString());
              this.registerForm.controls['username'].setValue(userData.username);
              this.registerForm.controls['nombre'].setValue(userData.nombre);
              this.registerForm.controls['apellido'].setValue(userData.apellido);
              this.registerForm.controls['telefono'].setValue(userData.telefono);
              this.registerForm.controls['direccion'].setValue(userData.direccion);
              this.registerForm.controls['password'].setValue(userData.password);
            },
            error: (errorData) => {
              this.errorMessage = errorData;
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

  get username() {
    return this.registerForm.controls['username'];
  }

  get nombre() {
    return this.registerForm.controls['nombre'];
  }

  get apellido() {
    return this.registerForm.controls['apellido'];
  }

  get telefono() {
    return this.registerForm.controls['telefono'];
  }

  get password() {
    return this.registerForm.controls['password'];
  }

  get direccion() {
    return this.registerForm.controls['direccion'];
  }

  savePersonalDetailsData() {
    if (this.registerForm.valid) {
      this.userService.updateUser(this.registerForm.value as unknown as User).subscribe({
        next: () => {
          this.editMode = false;
          this.user = this.registerForm.value as unknown as User;
        },
        error: (errorData) => console.error(errorData)
      })
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id_usuario: [''],
      username: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      telefono: ['', Validators.required],
      direccion: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

}
