import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'vef-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.scss'],
})
export class LocationsListComponent implements OnInit {
  locationsList: any[] = [];
  size = 10;
  page = 1;
  totalItems = 0;
  currentPage = 0;
  loading = false;

  constructor(private service: ApiService, private notification : NzNotificationService) {}

  ngOnInit(): void {
    this.getLocations(this.size, this.page);
  }

  getLocations(size: number, page: number) {
    this.loading = true
    this.service
      .getPaginated({ size: size, page: page }, '/Location/paged')
      .subscribe({
        next: (res: any) => {
          this.locationsList = res.data.items;
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
          this.loading = false
        },
        error: () => {
          this.loading =false;
        },
        complete: ()=> this.loading =false
      });
  }

  confirmDelete(id: number){
    console.log(id);
    this.loading = true;

    this.service.delete(`/Location/${id}`).subscribe({
      next: () => {
        this.notification.success('Success', 'Location deleted');

        this.getLocations(this.size, this.page);
      },
   
    })
  }

  pageIndexChange(index: number) {
    this.getLocations(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getLocations(size, this.page);
  }

}
