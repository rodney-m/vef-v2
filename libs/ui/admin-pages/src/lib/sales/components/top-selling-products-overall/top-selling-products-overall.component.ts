import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';


@Component({
  selector: 'vef-top-selling-products-overall',
  templateUrl: './top-selling-products-overall.component.html',
  styleUrls: ['./top-selling-products-overall.component.scss'],
})
export class TopSellingProductsOverallComponent implements OnInit {
  sales : any[] = [];

  constructor(private service : ApiService){}

  ngOnInit(): void {
      this.getSales();
  }

  getSales() {
    this.service
      .getFromUrl('/Sales')
      .subscribe({
        next: (res: any) => {
          this.sales = res?.data
        },
      });
  }

  
}
