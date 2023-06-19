import { Injectable } from '@angular/core';


const  CART = 'vefCart'

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }

  addToCart(data:any){
    sessionStorage.setItem(CART, data)
  }

  getCart() {
    return sessionStorage.getItem(CART)
  }

  clearCart(){
    sessionStorage.removeItem(CART);
  }
}
