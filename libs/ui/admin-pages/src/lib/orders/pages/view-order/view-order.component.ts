import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ApiService, OrderStatus } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
    private notification : NzNotificationService,
    private uiLoader : NgxUiLoaderService
    ){}
  order! :any;
  rejectionReason = ''
  statusChangeLoading = false;
  selectedStatus = null;
  statuses :any[] = []
  ngOnInit(){
    const orderId = this.activatedRoute.snapshot.params['id']
    this.getOrderDetail(orderId)

    this.statuses = this.enumToKeyValue(OrderStatus);
    console.log(this.statuses)
  }

  changeOrderStatus(event : any){
    console.log(event)
  }

  enumToKeyValue(enumObj :any){
    const enumArray :any[]= [];

    for (const key of Object.keys(enumObj)) {
      if (isNaN(parseInt(key))) {
        const value = enumObj[key];
        const pair = { key, value };
        enumArray.push(pair);
      }
    }
  
    return enumArray
  }

  getValue(element : HTMLSelectElement | any){
    return element.value
  }

  approve(orderItem : number){
    this.statusChangeLoading = true;
    this.service.updateToUrl(`/Order/orderItem/${orderItem}/status?status=1`,{}).subscribe({
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

  updateStatus(data: any){

    const status = data.element.value
    const orderItem = data.orderItem

    this.statusChangeLoading = true;
    this.service.updateToUrl(`/Order/orderItem/${orderItem}/status?status=${status}${status === 6 ? '&reason='+this.rejectionReason : ''}`,{}).subscribe({
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
    this.uiLoader.start();
    this.service.getFromUrl(`/Order/${id}`).subscribe({
      next: (res) => {
        this.order = res.data
        this.order = {
          ...this.order,
          dateOrdered: new Date(this.order.dateOrdered)
        }
        this.uiLoader.stop();
      },
      error: (err) => {
        this.notification.error('Error', err?.error?.message ? err?.error?.message:  'Failed to get order information', {nzAnimate: true, nzDuration: 4000})
        this.uiLoader.stop();        
      },
      complete: () => {
        this.uiLoader.stop()
      }
    })
  }

}
