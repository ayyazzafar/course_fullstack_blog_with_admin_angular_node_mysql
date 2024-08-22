import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.session?.accessToken;

  if(token){
    const cloneReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloneReq)
  }

  return next(req);
};
