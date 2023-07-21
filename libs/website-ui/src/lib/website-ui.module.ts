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
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSwitchModule } from 'ng-zorro-antd/switch';


import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AllBouquetsInfiniteScrollComponent } from './components/all-bouquets-infinite-scroll/all-bouquets-infinite-scroll.component';
import { ProductsFilteringPageComponent } from './pages/products-filtering-page/products-filtering-page.component';
import { AddALittleExtraComponent } from './pages/add-a-little-extra/add-a-little-extra.component';
import { RecepientDetailsComponent } from './pages/recepient-details/recepient-details.component';
import { SendersDetailsComponent } from './pages/senders-details/senders-details.component';
import { BuyingProcessPageComponent } from './pages/buying-process-page/buying-process-page.component';
import { ThankYouPageComponent } from './pages/thank-you-page/thank-you-page.component';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { OrderTrackingPageComponent } from './pages/order-tracking-page/order-tracking-page.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FilterByCategoryComponent } from './pages/filter-by-category/filter-by-category.component';

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
    path: 'buy',
    component: BuyingProcessPageComponent,
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
    path: 'extras/:id',
    component: AddALittleExtraComponent,
  },
  {
    path: 'all-bouquets',
    component: ProductsFilteringPageComponent,
  },
  {
    path: 'receipient-details',
    component: RecepientDetailsComponent,
  },
  {
    path: 'order/track',
    component: OrderTrackingPageComponent,
  },
  {
    path: 'category/:id',
    component: FilterByCategoryComponent
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: 'page-not-found',
    pathMatch: 'full',
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
    NzAffixModule,
    NzResultModule,
    NzButtonModule,
    NzFormModule,
    NzSpinModule,
    NzSwitchModule
  ],
  declarations: [
    HomePageComponent,
    ProductPageComponent,
    CartComponent,
    CheckoutPageComponent,
    AddOnsModalComponent,

    AllBouquetsInfiniteScrollComponent,
    ProductsFilteringPageComponent,
    AddALittleExtraComponent,
    RecepientDetailsComponent,
    SendersDetailsComponent,
    BuyingProcessPageComponent,
    ThankYouPageComponent,
    OrderTrackingPageComponent,
    PageNotFoundComponent,
    FilterByCategoryComponent,
  ],
  providers: [ApiService, HttpClientModule, ShopService, NzNotificationService],
})
export class WebsiteUiModule {}
