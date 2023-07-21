import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'vef-thank-you-page',
  templateUrl: './thank-you-page.component.html',
  styleUrls: ['./thank-you-page.component.scss'],
})
export class ThankYouPageComponent implements OnInit {
  constructor(private modalRef : NzModalRef){}
  @Input() order:any = null
  ngOnInit(): void {
      console.log(this.order)
  }

  close(){
    this.modalRef.close()
  }
  
}
