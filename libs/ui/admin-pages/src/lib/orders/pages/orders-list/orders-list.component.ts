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
  page = 1;
  totalItems = 0;
  currentPage = 0;
  loading = false;
  searchText = '';

  constructor(private service  :ApiService){}

  ngOnInit(): void {
      this.getOrders(this.size, this.page)
  }

  changeInput(e : any){
      if (e.target.value === ''){
        this.size = 10 ;
        this.page = 0 ;
        this.getOrders(this.size, this.page)
      }
  }

  filter(){
    this.loading = true
    this.service
      .getFromUrl(`/Order/search?query=${this.searchText}`)
      .subscribe({
        next: (res: any) => {
          this.ordersList = res.data;
          this.loading = false
          this.size = 1000
        },
        error: () => {
          this.loading = false
        },
        complete: ()=> this.loading = false
      });
  }

  getOrders(size : number, page : number){
    this.loading = true
    this.service
      .getPaginated({ size: size, page: page, searchParam: this.searchText }, '/Order/paged')
      .subscribe({
        next: (res: any) => {
          this.ordersList = res.data.items;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
          this.loading = false
        },
        error: () => {
          this.loading = false
        },
        complete: ()=> this.loading = false
      });
  }

  pageIndexChange(index: number) {
    this.getOrders(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getOrders(size, this.page);
  }
}
