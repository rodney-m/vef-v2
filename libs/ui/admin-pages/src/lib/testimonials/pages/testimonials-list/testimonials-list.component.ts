import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-testimonials-list',
  templateUrl: './testimonials-list.component.html',
  styleUrls: ['./testimonials-list.component.scss'],
})
export class TestimonialsListComponent implements OnInit {
  occasionsList: any[] = [];
  size = 10;
  page = 1;
  totalItems = 0;
  currentPage = 0;
  tableLoading = false;

  constructor(private service: ApiService, private notification : NzNotificationService) {}

  ngOnInit(): void {
      this.getTestimonials(this.size, this.page)
  }

  getTestimonials(size: number, page: number) {
    this.tableLoading = true
    this.service
      .getPaginated({size, page}, '/Customer/testimonials/paged')
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

  confirmDelete(id : number){
    this.tableLoading =true;
    this.service
      .delete('/Customer/testimonials/'+id)
      .subscribe({
        next: () => {
          this.notification.success('Success', 'Testimonial deleted');
          this.getTestimonials(this.size, this.page)
        },
        error: () => {
          this.tableLoading = false;
        },
        complete: () => this.tableLoading = false
      });
  }

  pageIndexChange(index: number) {
    this.getTestimonials(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getTestimonials(size, this.page);
  }
}
