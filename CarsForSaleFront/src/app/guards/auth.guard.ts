import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/login.service';
import { AlertService } from '../services/alert.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const alertService = inject(AlertService);

  if (authService.usuarioEstaAutenticado()) {
    return true;
  }

  alertService.alert('Sua sessão expirou!', "Você será redirecionado para a página de login.", 'warning').then((isConfirmed) => {
    if (isConfirmed){
      router.navigate(['/login']);
    }
  });
  
  return false;
}
