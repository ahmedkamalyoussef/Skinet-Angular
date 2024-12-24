import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountService);

  if (accountService.currentUser()) {
    return of(true);
  } else {
    return accountService.getAuthState().pipe(
      map(authState => {
        if (authState.isAuthenticated) {
          return true;
        } else {
          router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
          return false;
        }
      })
    );
  }
};
