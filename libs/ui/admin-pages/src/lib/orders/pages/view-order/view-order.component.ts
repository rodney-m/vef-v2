import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  constructor(
    private service : ApiService, 
    private activatedRoute : ActivatedRoute, 
    private location : Location,
    private notification : NzNotificationService
    ){}
  order! :any;
  statusChangeLoading = false;
  selectedStatus = null;
  ngOnInit(){
    const orderId = this.activatedRoute.snapshot.params['id']
    this.getOrderDetail(orderId)
  }

  changeOrderStatus(event : any){
    console.log(event)
  }

  updateStatus(data: any){
    const status = data.element.value
    const orderItem = data.orderItem

    this.statusChangeLoading = true;
    this.service.updateToUrl(`/Order/orderItem/${orderItem}/status?status=${status}`,{}).subscribe({
      next: () => {
        this.notification.success('Success', 'Status updated successfully', {nzAnimate: true, nzDuration: 4000});
        this.getOrderDetail(this.order.id)
      },
      error: (err) => {
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to update status', {nzAnimate: true, nzDuration: 4000})
        this.statusChangeLoading = false;
      },
      complete: ()=> this.statusChangeLoading = false
    })
  }

  getOrderDetail(id : number){
    this.service.getFromUrl(`/Order/${id}`).subscribe({
      next: (res) => {
        this.order = res.data
        this.order = {
          ...this.order,
          dateOrdered: new Date(this.order.dateOrdered)
        }
      },
      error: (err) => {
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to get order information', {nzAnimate: true, nzDuration: 4000})
        
      }
    })
  }

}
