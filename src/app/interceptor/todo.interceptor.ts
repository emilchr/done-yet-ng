import { HttpInterceptorFn } from '@angular/common/http';

export const todoInterceptor: HttpInterceptorFn = (req, next) => {
  const newRequest = req.clone({
    headers: req.headers.set('Content-Type', 'application/json'),
  });

  return next(newRequest);
};
