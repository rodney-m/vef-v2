import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-bouquets-list',
  templateUrl: './bouquets-list.component.html',
  styleUrls: ['./bouquets-list.component.scss'],
})
export class BouquetsListComponent implements OnInit {
  selectedCategory = '';
  selectedStatus = '';
  searchInput = '';
  displayData = [];

  productsList: any[] = [];
  occasionsList: any[] = [];
  size = 10;
  page = 0;
  totalItems = 0;
  currentPage = 0;
  loading = false;

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getProducts(this.size, this.page);
    this.getOccasions();
  }

  getProducts(size: number, page: number) {
    this.loading = true;
    this.service
      .getPaginated({ size: size, page: page }, '/Product/paged')
      .subscribe({
        next: (res: any) => {
          this.productsList = this.transcateDescription(res.data.items);
          // this.productsList = res.data.items;
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
  getOccasions() {
    this.service.getFromUrl('/Product/paged').subscribe({
      next: (res: any) => {
        this.occasionsList = res.data.items;
        
      },
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

  search(): void {
    // const data = this.productsList
    // this.displayData = this.tableSvc.search(this.searchInput, data )
  }

  categoryChange(value: string): void {
    // const data = this.productsList
    // value !== 'All'? this.displayData = data.filter(elm => elm.category === value) : this.displayData = data
  }

  statusChange(value: string): void {
    // const data = this.productsList
    // value !== 'All'? this.displayData = data.filter(elm => elm.status === value) : this.displayData = data
  }
}
