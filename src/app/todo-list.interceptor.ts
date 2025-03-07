import { HttpInterceptorFn } from '@angular/common/http';

export const todoListInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
