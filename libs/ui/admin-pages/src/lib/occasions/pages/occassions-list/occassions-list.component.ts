import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

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

  constructor(private service: ApiService) {}

  ngOnInit(): void {
      this.getOcassions(this.size, this.page)
  }

  getOcassions(size: number, page: number) {
    this.service
      .getFromUrl( '/Occasion')
      .subscribe({
        next: (res: any) => {
          this.occasionsList = res.data;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
        },
      });
  }

  pageIndexChange(index: number) {
    this.getOcassions(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getOcassions(size, this.page);
  }

}
