import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token){
    req = req.clone({
      withCredentials: false,
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
  }

  return next(req);
};
