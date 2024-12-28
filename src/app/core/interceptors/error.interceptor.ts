import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { SnackbarService } from '../services/snackbar.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const snackbar = inject(SnackbarService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 400) {
        if (error.error.errors) {
          const modalStateErrors = [];
          for (const key in error.error.errors) {
            if (error.error.errors[key]) {
              modalStateErrors.push(error.error.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          snackbar.error(error.error.message || error.error.title);
        }
      }
      if (error.status === 401) router.navigateByUrl('account/login');
      if (error.status === 404) router.navigateByUrl('/not-found');
      if (error.status === 500) {
        const navigationExtras = { state: { error: error.error } };
        router.navigateByUrl('/server-error', navigationExtras);
      }
      return throwError(() => error);
    }
    ));
};
