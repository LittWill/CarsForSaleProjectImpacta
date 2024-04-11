import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/login.service';
import { finalize } from 'rxjs';
import { SpinnerService } from '../services/spinner.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)
  const spinnerService = inject(SpinnerService)

  if (authService.usuarioEstaAutenticado()){
    const token = authService.obterToken();
    req = req.clone({
      withCredentials: false,
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  }

  spinnerService.exibir();
  return next(req).pipe(finalize(() => spinnerService.ocultar()));
};
