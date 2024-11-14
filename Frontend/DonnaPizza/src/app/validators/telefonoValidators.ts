import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, switchMap, tap } from 'rxjs/operators';
import { UserService } from '../services/user/user.service';

export function telefonoValidators(userService: UserService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const telefono = control.value;
    if (!telefono) return of(null);

    console.log("Iniciando validación para el teléfono:", telefono);

    return userService.checkTelefonoExistence(telefono).pipe(
      debounceTime(300),
      switchMap((exists) => {
        console.log("Respuesta de existencia del teléfono:", exists);
        return exists ? of({ phoneExists: true }) : of(null);
      }),
      catchError((error) => {
        console.error("Error durante la validación del teléfono:", error);
        return of(null);
      })
    );
  };
}
