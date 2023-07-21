import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ShopService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-buying-process-page',
  templateUrl: './buying-process-page.component.html',
  styleUrls: ['./buying-process-page.component.scss'],
})
export class BuyingProcessPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private notification: NzNotificationService,
    private shopService: ShopService,
    private router: Router,
    private service: ApiService
  ) {}
  index = 1;
  orderItems : any []  = [];
  orderItem = {    
    productId: 0,
    product: null,
    quantity: 0,
    recipientName: '',
    recipientEmail: '',
    recipientPhone: '',
    deliveryAddress: '',
    deliveryInstruction: '',
    anonymousDelivery: false,
    deliveryDate: '',
    location: null,
    addons: [],
  
  }
  order : {
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    customerAddress: string,
    cart: any[]
  } = {
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    cart: []
  }

  ngOnInit(): void {
    this.orderItem.productId =
      this.activatedRoute.snapshot.queryParams['product'];
    this.orderItem.quantity =
      this.activatedRoute.snapshot.queryParams['quantity'];

    this.service
      .getFromUrl(
        `/Product/${this.activatedRoute.snapshot.queryParams['product']}`
      )
      .subscribe({
        next: (res) => {
          this.orderItem.product = res.data;
        },
      });
  }

  stepOneNext(data: any) {
    this.orderItem.addons = data.addons;
    console.log(this.order);
    this.next();
  }
  stepTwoNext(data: any) {
    console.log(data);
    this.orderItem.deliveryAddress = data.deliveryAddress;
    this.orderItem.recipientName = data.recipientName;
    this.orderItem.recipientEmail = data.recipientEmail;
    this.orderItem.recipientPhone = data.recipientPhone;
    this.orderItem.deliveryInstruction = data.deliveryInstruction;
    this.orderItem.deliveryDate = data.deliveryDate;
    this.orderItem.location = data.location;
    
    this.next();
  }
  
  stepThreeNext(orderDetail: any) {
    this.order.customerName = orderDetail['data'].customerName;
    this.order.customerEmail = orderDetail['data'].customerEmail;
    this.order.customerPhone = orderDetail['data'].customerPhone;
    this.order.customerAddress = orderDetail['data'].customerAddress;
    this.orderItem.anonymousDelivery = orderDetail['data'].anonymousDelivery;

    this.addToCart();
    if (orderDetail.action === 'PAYMENT') {
      this.router.navigateByUrl('/checkout');
    } else {
      this.router.navigateByUrl('/');
    }
  }

  addToCart() {
    const cartItems = this.shopService.getCart();

    if (!cartItems) {
      this.order.cart = [this.orderItem]
      const stringifiedCart = JSON.stringify(this.order);
      this.shopService.addToCart(stringifiedCart);
      this.notification.success(
        'Bouquet added to cart',
        'Bouquet added to cart successfully'
      );
    } else {
      let jsObjectOfCart: any = JSON.parse(cartItems);

      jsObjectOfCart = {
        customerName: this.order.customerName,
        customerEmail: this.order.customerEmail,
        customerPhone: this.order.customerPhone,
        customerAddress: this.order.customerAddress,
        cart: [...jsObjectOfCart.cart, this.orderItem]
      };
      this.shopService.addToCart(JSON.stringify(jsObjectOfCart));
      this.notification.success(
        'Bouquet added to cart',
        'Bouquet added to cart successfully'
      );
      // success
    }
  }

  next() {
    this.index++;
  }
  prev() {
    this.index--;
  }
}
