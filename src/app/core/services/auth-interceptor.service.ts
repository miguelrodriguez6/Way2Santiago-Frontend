import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const authToken = this.getCookie('jwt'); // Obtener el token desde la cookie 'jwt'

    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}` // Setear el header de autorización
        }
      });

      return next.handle(authReq);
    }

    // Si no hay token, simplemente se pasa la solicitud sin modificar
    return next.handle(req);
  }

  // Función para obtener el valor de una cookie por su nombre
  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
      return match[2];
    }
    return null;
  }
}
