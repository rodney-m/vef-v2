import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-top-selling-categories',
  templateUrl: './top-selling-categories.component.html',
  styleUrls: ['./top-selling-categories.component.scss'],
})
export class TopSellingCategoriesComponent implements OnInit {
  sales : any[] = [];
  loading = false;
  
  constructor(private service : ApiService){}
  
  ngOnInit(): void {
    this.getSales();
  }
  
  getSales() {
    this.loading = true;
    this.service
      .getFromUrl('/Sales/bestselling/occasions')
      .subscribe({
        next: (res: any) => {
          this.sales = res?.data;
          this.loading = false
        },
        error: () => {
          this.loading = false
        },
        complete: () => this.loading =false
      });
  }

}
