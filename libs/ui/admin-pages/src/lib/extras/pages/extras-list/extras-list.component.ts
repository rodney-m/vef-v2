import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-extras-list',
  templateUrl: './extras-list.component.html',
  styleUrls: ['./extras-list.component.scss'],
})
export class ExtrasListComponent implements OnInit {
  extrasList: any[] = [];
  size = 10;
  page = 0;
  totalItems = 0;
  currentPage = 0;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
      this.getExtras(this.size, this.page)
  }

  getExtras(size: number, page: number) {
    this.service
      .getPaginated({ size: size, page: page }, '/AddOn/paged')
      .subscribe({
        next: (res: any) => {
          this.extrasList = res.data.items;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
        },
      });
  }

  pageIndexChange(index: number) {
    this.getExtras(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getExtras(size, this.page);
  }

}
