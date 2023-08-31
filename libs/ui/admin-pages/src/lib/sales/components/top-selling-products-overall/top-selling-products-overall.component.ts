import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { error } from 'console';


@Component({
  selector: 'vef-top-selling-products-overall',
  templateUrl: './top-selling-products-overall.component.html',
  styleUrls: ['./top-selling-products-overall.component.scss'],
})
export class TopSellingProductsOverallComponent implements OnInit {
  sales : any[] = [];
  loading =false;

  constructor(private service : ApiService){}

  ngOnInit(): void {
      this.getSales();
  }

  getSales() {
    this.loading = true;
    this.service
    .getFromUrl('/Sales')
    .subscribe({
      next: (res: any) => {
        this.sales = res?.data
        this.loading = false;
        },
        error: () => {
          this.loading = false
        },
        complete: ()=> this.loading =false
      },
      );
  }

  
}
