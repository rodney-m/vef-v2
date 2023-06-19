import { Component, OnInit } from '@angular/core';
import { ApiService, ShopService } from '@vef/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit{
  cart : any[] = [];
  constructor(
    private shopService : ShopService,
    private notification : NzNotificationService,
    private modal : NzModalService,
    ){}

  ngOnInit(): void {
    this.getCartItems()
  }
  
  getCartItems(){    
    this.cart = JSON.parse(this.shopService.getCart() ?? '');         
  }

  get totalPrice(){
    let total = 0
    this.cart.map(product => {
      total +=product.quantity * product.price
    })
    return total
  }

  update(data : any){
    const currentCart :any[] =  JSON.parse(this.shopService.getCart() ?? '');

    const filteredCart = currentCart.filter((item) => item.id !== data.id)
    const updatedCart = [...filteredCart, data]
    
    this.shopService.addToCart(JSON.stringify(updatedCart));
  }

  deleteItem(id: string | number){
    const currentCart :any[] =  JSON.parse(this.shopService.getCart() ?? '');

    const filteredCart = currentCart.filter((item) => item.id !== id)
    this.shopService.addToCart(JSON.stringify(filteredCart));
    this.notification.success('Deleted', 'Product removed from cart')
    this.getCartItems()
  }

  showConfirm(id: string | number): void {
    this.modal.confirm({
      nzTitle: 'Delete product from cart',
      nzContent: 'Are you sure you want to delete this product from cart',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnOk: () => this.deleteItem(id)
    });
  }
}
