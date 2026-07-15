import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { firstValueFrom } from 'rxjs';

export const authenticatedGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const authenticated = await firstValueFrom(authService.checkStatus());

  if (!authenticated) {
    router.navigateByUrl('/auth');
    return false
  }

  return true;
};
