import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { RouterModule, Route } from '@angular/router';
import { SwiperModule } from 'swiper/angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ApiService, ShopService } from '@vef/core';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './pages/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { AddOnsModalComponent } from './components/add-ons-modal/add-ons-modal.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AllBouquetsInfiniteScrollComponent } from './components/all-bouquets-infinite-scroll/all-bouquets-infinite-scroll.component';
import { ProductsFilteringPageComponent } from './pages/products-filtering-page/products-filtering-page.component';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'bouquet/:id',
    component: ProductPageComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
  },
  {
    path: 'all-bouquets',
    component: ProductsFilteringPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    FormsModule,
    NzNotificationModule,
    NgxUiLoaderModule,
    NzSelectModule,
    NzModalModule,
    NzIconModule,
    NzDatePickerModule,
    NzInputModule,
    NzRadioModule,
    InfiniteScrollModule,
  ],
  declarations: [
    HomePageComponent,
    ProductPageComponent,
    CartComponent,
    CheckoutPageComponent,
    AddOnsModalComponent,

    AllBouquetsInfiniteScrollComponent,
    ProductsFilteringPageComponent,
  ],
  providers: [ApiService, HttpClientModule, ShopService, NzNotificationService],
})
export class WebsiteUiModule {}
