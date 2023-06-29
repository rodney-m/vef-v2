import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ShopService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit {
  bouquet !: any; 
  quantity = 1;
  constructor(
    private service : ApiService, 
    private activatedRoute : ActivatedRoute,
    private shopService : ShopService,
    private notification : NzNotificationService,
    private uiLoader : NgxUiLoaderService,
    private router : Router
    ){}

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
      this.getProductDetails(id);
  }

  getProductDetails(id:  string | number){
    this.service.getFromUrl(`/Product/${id}`).subscribe({
      next: (res) => {
        this.bouquet = res.data;
      },
      error : (err) => {
        console.log(err)
      }
    })
  }

  buy(){
    this.router.navigate(['/buy'], {queryParams: {product: this.bouquet.id, quantity: this.quantity}})
  }

  addToCart() {    
    
    const cartItems = this.shopService.getCart();
    console.log(cartItems)

    if (!cartItems){
      const stringifiedCart = JSON.stringify([{...this.bouquet, quantity: this.quantity }])
      this.shopService.addToCart(stringifiedCart);
      this.notification.success('Bouquet added to cart', 'Bouquet added to cart successfully')
    } else {
      let jsObjectOfCart : any[] = JSON.parse(cartItems);
      const dupplicate = jsObjectOfCart.find((product: any) => {
        return product.id === this.bouquet.id
      })

      if(dupplicate){
        // warning
        this.notification.warning('Bouquet already added', 'To change quantity go to cart page')
        return
      }

      jsObjectOfCart = [...jsObjectOfCart, {...this.bouquet, quantity : this.quantity}]
      this.shopService.addToCart(JSON.stringify(jsObjectOfCart) );
      this.notification.success('Bouquet added to cart', 'Bouquet added to cart successfully')
      // success
    }
  }

}
