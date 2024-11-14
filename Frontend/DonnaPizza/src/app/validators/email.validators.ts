import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../services/user/user.service'; // Ajusta la ruta según tu estructura de carpetas

export function emailValidator(userService: UserService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const email = control.value;
    if (!email) return of(null);

    console.log("Iniciando validación para:", email); // Asegura que se muestra este log

    return userService.checkUsernameExistence(email).pipe(
      debounceTime(300),
      switchMap((exists) => {
        console.log("Respuesta de existencia del email:", exists); // Revisa si este log aparece
        return exists ? of({ emailExists: true }) : of(null);
      }),
      catchError((error) => {
        console.error("Error durante la validación del email:", error);
        return of(null);
      })
    );
  };
}
