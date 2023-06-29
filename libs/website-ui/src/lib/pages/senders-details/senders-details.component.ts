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
      customerAddress: ['', [Validators.required]],
    });
  }

  // continue(){
  //   this.stepThreeNext.emit(this.senderDetailsForm.value);
  // }

  addAnotherOne(){
    this.stepThreeNext.emit({data: this.senderDetailsForm.value, action: Action.addAnother})
  }
  proceedToPayment(){
    this.stepThreeNext.emit({data: this.senderDetailsForm.value, action: Action.payment})
  }

 
}


