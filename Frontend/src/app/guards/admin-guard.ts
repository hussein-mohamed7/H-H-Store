import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth-service';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = async  (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const [isLoggedIn,isAdmin]= await auth.verifyToken();
  if(isAdmin)
  {
    return true;
  }
  return router.createUrlTree(['/'])
};
