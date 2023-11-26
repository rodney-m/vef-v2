import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-occassions-list',
  templateUrl: './occassions-list.component.html',
  styleUrls: ['./occassions-list.component.scss'],
})
export class OccassionsListComponent implements OnInit {
  occasionsList: any[] = [];
  size = 10;
  page = 0;
  totalItems = 0;
  currentPage = 0;
  tableLoading = false;

  constructor(private service: ApiService, private notification : NzNotificationService) {}

  ngOnInit(): void {
      this.getOcassions(this.size, this.page)
  }

  confirmDelete(id: number){
    console.log(id);
    this.tableLoading = true;

    this.service.delete(`/Occasion/${id}`).subscribe({
      next: () => {
        this.notification.success('Success', 'Deleted');

        this.getOcassions(this.size, this.page);
      },
   
    })
  }

  getOcassions(size: number, page: number) {
    this.tableLoading = true
    this.service
      .getPaginated({size, page}, '/Occasion/paged')
      .subscribe({
        next: (res: any) => {
          this.occasionsList = res.data.items;
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
