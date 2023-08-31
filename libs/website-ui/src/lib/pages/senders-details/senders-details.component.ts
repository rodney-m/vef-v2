import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

enum Action {
  payment = 'PAYMENT',
  addAnother = 'ADD_ANOTHER',
}

@Component({
  selector: 'vef-senders-details',
  templateUrl: './senders-details.component.html',
  styleUrls: ['./senders-details.component.scss'],
})
export class SendersDetailsComponent implements OnInit {
  senderDetailsForm!: FormGroup;
  @Output() stepThreeNext : EventEmitter<any> = new EventEmitter()
  constructor(
    private fb: FormBuilder,
    private notification : NzNotificationService,
    private shopService : ShopService
    ) {}

  ngOnInit(): void {
    this.senderDetailsForm = this.fb.group({
      customerName: ['', [Validators.required]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPhone: ['', [Validators.required]],
      customerAddress: [''],
      anonymousDelivery: [false],
    });

    const cart : any = JSON.parse(this.shopService.getCart() ?? '')
    if(cart){
      this.prefillDetails(cart)
    }
  }

  prefillDetails(cart: any){
    
    this.senderDetailsForm.patchValue({
      customerName : cart?.customerName,
      customerEmail: cart?.customerEmail,
      customerPhone: cart?.customerPhone,
      customerAddress: cart?.customerAddress
    })
  }

  // continue(){
  //   this.stepThreeNext.emit(this.senderDetailsForm.value);
  // }

  addAnotherOne(){
    if(this.senderDetailsForm.invalid){
      this.notification.warning('Required fields','Fill in all required field marked with (*)', {nzAnimate : true, nzDuration : 4000});
      return;
    }
    this.stepThreeNext.emit({data: this.senderDetailsForm.value, action: Action.addAnother})
  }
  proceedToPayment(){
    if(this.senderDetailsForm.invalid){
      this.notification.warning('Required fields','Fill in all required field marked with (*)', {nzAnimate : true, nzDuration : 4000});
      return;
    }
    this.stepThreeNext.emit({data: this.senderDetailsForm.value, action: Action.payment})
  }

 
}


