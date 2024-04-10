import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/login.service';
import { AnuncioServiceService } from '../services/anuncio-service.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService)

  if (authService.usuarioEstaAutenticado()){
    const token = authService.obterToken();
    req = req.clone({
      withCredentials: false,
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  }


  return next(req);
};
