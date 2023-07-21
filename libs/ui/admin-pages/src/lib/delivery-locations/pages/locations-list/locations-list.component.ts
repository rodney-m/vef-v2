import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent implements OnInit {
  locationsList: any[] = [];
  size = 10;
  page = 0;
  totalItems = 0;
  currentPage = 0;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getLocations(this.size, this.page);
  }

  getLocations(size: number, page: number) {
    this.service
      .getPaginated({ size: size, page: page }, '/Location/paged')
      .subscribe({
        next: (res: any) => {
          this.locationsList = res.data.items;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
        },
      });
  }

  pageIndexChange(index: number) {
    this.getLocations(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getLocations(size, this.page);
  }

}
