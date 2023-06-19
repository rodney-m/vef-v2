import { Component, OnInit } from '@angular/core';
import { ApiService, ShopService } from '@vef/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AddOnsModalComponent } from '../../components/add-ons-modal/add-ons-modal.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';

@Component({
  selector: 'vef-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit {
  cart: any[] = [];
  addOns: any[] = [];

  cities = [
    {
      id: 17,
      name: 'Beitbridge',
    },
    {
      id: 16,
      name: 'Bindura',
    },
    {
      id: 2,
      name: 'Bulawayo',
    },
    {
      id: 14,
      name: 'Chegutu',
    },
    {
      id: 10,
      name: 'Chinhoyi',
    },
    {
      id: 25,
      name: 'Chipinge',
    },
    {
      id: 22,
      name: 'Chiredzi',
    },
    {
      id: 3,
      name: 'Chitungwiza',
    },
    {
      id: 5,
      name: 'Epworth',
    },
    {
      id: 26,
      name: 'Gokwe',
    },
    {
      id: 6,
      name: 'Gweru',
    },
    {
      id: 1,
      name: 'Harare',
    },
    {
      id: 20,
      name: 'Hwange',
    },
    {
      id: 8,
      name: 'Kadoma',
    },
    {
      id: 23,
      name: 'Kariba',
    },
    {
      id: 24,
      name: 'Karoi',
    },
    {
      id: 7,
      name: 'Kwekwe',
    },
    {
      id: 12,
      name: 'Marondera',
    },
    {
      id: 9,
      name: 'Masvingo',
    },
    {
      id: 4,
      name: 'Mutare',
    },
    {
      id: 11,
      name: 'Norton',
    },
    {
      id: 18,
      name: 'Redcliff',
    },
    {
      id: 21,
      name: 'Rusape',
    },
    {
      id: 13,
      name: 'Ruwa',
    },
    {
      id: 27,
      name: 'Shurugwi',
    },
    {
      id: 19,
      name: 'Victoria Falls',
    },
    {
      id: 15,
      name: 'Zvishavane',
    },
  ];

  paymentDetailsForm!: FormGroup;

  constructor(
    private shopService: ShopService,
    private service: ApiService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private uiLoader : NgxUiLoaderService,
    private router : Router,
  ) {}

  ngOnInit(): void {
    this.cart = JSON.parse(this.shopService.getCart() ?? '');
    this.innitializeForm();
  }

  innitializeForm() {
    this.paymentDetailsForm = this.fb.group({
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      paymentMethod: ['', Validators.required],
    });
  }

  placeOrder() {
    const orderedProducts = this.cart.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
      };
    });
    const orderedAddOns = this.addOns.map((product) => {
      return {
        addonId: product.id,
        quantity: product.quantity,
      };
    });

    const orderRequest = {
      products : orderedProducts,
      addons: orderedAddOns,
      ...this.paymentDetailsForm.value
    }

    this.processOrder(orderRequest)

    
  }

  processOrder(orderDetails: any){

    this.uiLoader.start()
    this.service.postToUrl('/Order/checkout', orderDetails).subscribe({
      next: () => {
        const successModal = this.modal.success({
          nzTitle: 'Order Created',
          nzContent: 'Progress on your order will be sent to your contact details',          
        })
        this.uiLoader.stop();
        successModal.afterClose.subscribe(() => {
          this.router.navigate(['/'])
        })        
      },
      error: (err) => {
        this.modal.error({
          nzTitle:'Error',
          nzContent : err?.error?.message ? err?.error?.message:  'Failed to place order'
        })
        this.uiLoader.stop()
      },
      complete: () => {
        this.uiLoader.stop()
      }
      
    })
  }

  get totalPrice() {
    let total = 0;

    if (this.cart.length > 0){
      this.cart.map((product) => {
        total += product?.quantity * product?.price;
      });
    }

    if(this.addOns.length > 0){
      this.addOns.map((product) => {
        total += product?.quantity * product?.price;
      });
    }

    return total;
  }

  openAddOnModal() {
    const addOnModal = this.modal.create({
      nzContent: AddOnsModalComponent,
      nzTitle: 'Add Ons',
      nzBodyStyle: { height: '350px', overflow: 'auto' },
    });

    addOnModal.afterClose.subscribe((data) => {
      
      if(data)
        this.addOns = [...this.addOns, data];
    });
  }
}
