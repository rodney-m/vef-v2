import { Injectable } from '@angular/core';

const  TOKEN = 'jwtToken'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  setToken(data:any){
    localStorage.setItem(TOKEN, data)
  }

  getToken() {
    return localStorage.getItem(TOKEN)
  }

  removeToken(){
    localStorage.removeItem(TOKEN);
  }
}
