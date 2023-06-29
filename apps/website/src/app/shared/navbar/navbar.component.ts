import { Component, OnInit } from '@angular/core';
import { ApiService, ShopService } from '@vef/core';

@Component({
  selector: 'vef-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

  bestSellingProducts: any[] =[]
  bestSellingProductsLoading = true;

  bestSellingCategories: any[] =[]
  bestSellingCategoriesLoading = true;

  allCategories: any[] =[]
  allCategoriesLoading = true;

  isVisible = false;

  constructor(
    private service : ApiService,
    private shopService : ShopService
    ){}
    
    

  ngOnInit(): void {
      this.getBestSellingProducts();
      this.getBestSellingCategories();
      this.getAllCategories()
  }

  toggleMobileMenu(){
    this.isVisible = !this.isVisible
  }

  get CurrentCartTotal(){
    const cart : any[] = JSON.parse(this.shopService.getCart() ?? '').cart
    return cart.length
  }

  getBestSellingProducts() {
    this.service.getFromUrl('/Sales/bestselling').subscribe({
      next: (res : any) =>  {
        this.bestSellingProductsLoading =false;
        this.bestSellingProducts = res.data;
      }
    })
  }
  getBestSellingCategories() {                              
    this.service.getFromUrl('/Sales/bestselling/occasions').subscribe({
      next: (res : any) =>  {
        this.bestSellingCategoriesLoading =false;
        this.bestSellingCategories = res.data;
      }
    })
  }

  getAllCategories(){
    this.service.getFromUrl('/Occasion').subscribe({
      next: (res : any) =>  {
        this.allCategoriesLoading =false;
        this.allCategories = res.data;
      }
    })
  }
}
