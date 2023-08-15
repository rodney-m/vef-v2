import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-expenses-bouquets-list',
  templateUrl: './expenses-bouquets-list.component.html',
  styleUrls: ['./expenses-bouquets-list.component.scss'],
})
export class ExpensesBouquetsListComponent implements OnInit {
  size = 12;
  page = 0;
  totalItems = 0;
  currentPage = 0;
  loading = false;
  
  productsList: any[] = [];

  constructor(private service: ApiService) {}

  ngOnInit(): void {
      this.getProducts(this.size, this.page);
  }

  
  getProducts(size: number, page: number) {
    this.loading = true;
    this.service
      .getPaginated({ size: size, page: page }, '/Bouquet/paged')
      .subscribe({
        next: (res: any) => {
          this.productsList = this.transcateDescription(res.data.items);
          this.totalItems = res.data.totalItemCount;
          this.currentPage = res.data.page;
          this.size = res.data.pageSize;
          this.loading = false;
        },
        complete: () => {
          this.loading = false
        }
      });
  }

  transcateDescription(data: any[]) {
    const transformedText = data.map((product) => {
      product.shortDescription =
        product.description?.length > 100
          ? `${product.description.substring(0, 100)}...`
          : product?.description;
      return {
        ...product,
      };
    });
    return transformedText;
  }

  pageIndexChange(index: number) {
    this.getProducts(this.size, index--);
  }
  pageSizeChange(size: number) {
    this.getProducts(size, this.page);
  }
}
