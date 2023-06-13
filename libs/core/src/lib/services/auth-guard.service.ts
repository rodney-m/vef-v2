import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router  :Router,
    private localstorageService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    const token = this.localstorageService.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(!this._tokenExpired(tokenDecode.exp)) return true;
    }
    this.router.navigate(['/auth', 'login'])
    return false;
  }

  private _tokenExpired(expiration : any) : boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
