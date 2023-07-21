import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService, ShopService } from '@vef/core';

@Component({
  selector: 'vef-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  bestSellingProducts: any[] = [];
  bestSellingProductsLoading = true;

  bestSellingCategories: any[] = [];
  bestSellingCategoriesLoading = true;

  allCategories: any[] = [];
  allCategoriesLoading = true;

  isVisible = false;

  searchText = '';

  constructor(
    private service: ApiService,
    private shopService: ShopService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBestSellingProducts();
    this.getBestSellingCategories();
    this.getAllCategories();

    console.log(this.router.url);
  }

  toggleMobileMenu() {
    this.isVisible = !this.isVisible;
  }

  get CurrentCartTotal() {
    let total = 0;
    if (this.shopService.getCart()) {
      const cart: any = JSON.parse(this.shopService.getCart() ?? '').cart;
      total = cart?.length;

      isNaN(total) ? (total = 0) : '';
    }

    return total;
  }

  getBestSellingProducts() {
    this.service.getFromUrl('/Sales/bestselling').subscribe({
      next: (res: any) => {
        this.bestSellingProductsLoading = false;
        this.bestSellingProducts = res.data;
      },
    });
  }
  getBestSellingCategories() {
    this.service.getFromUrl('/Sales/bestselling/occasions').subscribe({
      next: (res: any) => {
        this.bestSellingCategoriesLoading = false;
        this.bestSellingCategories = res.data;
      },
    });
  }

  getAllCategories() {
    this.service.getFromUrl('/Occasion').subscribe({
      next: (res: any) => {
        this.allCategoriesLoading = false;
        this.allCategories = res.data;
      },
    });
  }

  search() {
    this.router.navigate([`all-bouquets`], {
      queryParams: { search: this.searchText },
    });
  }
}
