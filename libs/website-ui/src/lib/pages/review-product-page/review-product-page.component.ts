import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, ShopService } from '@vef/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'vef-review-product-page',
  templateUrl: './review-product-page.component.html',
  styleUrls: ['./review-product-page.component.scss'],
})
export class ReviewProductPageComponent implements OnInit {
  bouquet!: any;
  reviewProduct!: any;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiService,
    private shopService: ShopService,
    private notification: NzNotificationService,
    private uiLoader: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.reviewProduct = this.activatedRoute.snapshot.queryParams;
    this.getProductDetails(this.reviewProduct.productId);
    console.log(this.reviewProduct);
  }

  getProductDetails(id: string | number) {
    this.service.getFromUrl(`/Bouquet/${id}`).subscribe({
      next: (res) => {
        this.bouquet = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleLoading(){
    this.loading =  !this.loading
  }

  rate(rating: any) {
    this.toggleLoading()
    this.service.postToUrl('/Review', {
      productId: Number(this.reviewProduct.productId),
      email: this.reviewProduct.customerEmail,
      rating: rating,
    }).subscribe({
      next: () => {
        this.notification.success('Success', 'Thank you for rating this rating', {nzAnimate: true, nzDuration: 4000})
      },
      error: (err) => {
        this.notification.warning('Error occurred', err?.error?.message ? err?.error?.message : 'Failed to submit your rating', {nzAnimate: true, nzDuration: 4000} )
      },
      complete: () => this.toggleLoading()
    })
  }
}
