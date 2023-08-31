import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'vef-add-ons-modal',
  templateUrl: './add-ons-modal.component.html',
  styleUrls: ['./add-ons-modal.component.scss'],
})
export class AddOnsModalComponent implements OnInit {
  addOns : any[] = [];
  loading = true;
  constructor(private service : ApiService, private modalRef :  NzModalRef ){}

  ngOnInit(): void {
      this.service.getFromUrl('/AddOn').subscribe({
        next: (res) => {
          this.addOns = res.data;
          this.addOns = this.addOns.map((data) => {
            return {
              ...data,
              quantity: 1
            }
          })
          this.loading = false;
        }
      })
  }

  add(product:any){
    this.modalRef.close(product)
  }
}
