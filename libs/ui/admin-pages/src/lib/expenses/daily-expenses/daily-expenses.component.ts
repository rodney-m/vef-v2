import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-daily-expenses',
  templateUrl: './daily-expenses.component.html',
  styleUrls: ['./daily-expenses.component.scss'],
})
export class DailyExpensesComponent implements OnInit {
  sales: any[] = [];
  size = 10;
  page = 1;
  totalItems = 0;
  currentPage = 0;
  tableLoading = false;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
      this.getOcassions(this.size, this.page)
  }

  getOcassions(size: number, page: number) {
    this.tableLoading = true
    this.service
      .getPaginated({size, page}, '/Sales/daily/paged')
      .subscribe({
        next: (res: any) => {
          this.sales = res.data.items;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
        },
        error: () => {
          this.tableLoading = false;
        },
        complete: () => this.tableLoading = false
      });
  }

  pageIndexChange(index: number) {
    this.getOcassions(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getOcassions(size, this.page);
  }
}
