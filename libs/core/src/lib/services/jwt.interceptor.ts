import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { API } from '../data/API';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private AuthService : AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.AuthService.getToken();
    const isAPIUrl = request.url.startsWith(API.BaseUrl)

    if(token && isAPIUrl){
      request = request.clone({
        setHeaders : {
          Authorization : `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}
