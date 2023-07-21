import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrdersListComponent implements OnInit {
  ordersList :any[] =[]
  size = 10;
  page = 0;
  totalItems = 0;
  currentPage = 0;

  constructor(private service  :ApiService){}

  ngOnInit(): void {
      this.getOrders(this.size, this.page)
  }

  getOrders(size : number, page : number){
    this.service
      .getPaginated({ size: size, page: page }, '/Order/paged')
      .subscribe({
        next: (res: any) => {
          this.ordersList = res.data.items;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
        },
      });
  }

  pageIndexChange(index: number) {
    this.getOrders(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getOrders(size, this.page);
  }
}
