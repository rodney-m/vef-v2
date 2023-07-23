import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { UiAdminPagesRoutingModule } from './ui-admin-pages.routing.module';
import { ApiService, FileService, NgZorroComponentsModule } from '@vef/core';
import { BouquetsListComponent } from './bouquets/pages/bouquets-list/bouquets-list.component';
import { BouquetsFormComponent } from './bouquets/pages/bouquets-form/bouquets-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ViewBouquetComponent } from './bouquets/pages/view-bouquet/view-bouquet.component';
import { ExtrasListComponent } from './extras/pages/extras-list/extras-list.component';
import { ExtrasFormComponent } from './extras/pages/extras-form/extras-form.component';
import { OccassionsListComponent } from './occasions/pages/occassions-list/occassions-list.component';
import { OccasionFormComponent } from './occasions/pages/occasion-form/occasion-form.component';
import { OrdersListComponent } from './orders/pages/orders-list/orders-list.component';
import { ViewOrderComponent } from './orders/pages/view-order/view-order.component';
import { LocationsListComponent } from './delivery-locations/pages/locations-list/locations-list.component';
import { LocationsFormComponent } from './delivery-locations/components/locations-form/locations-form.component';
import { NgChartsModule } from 'ng2-charts';
import { BarchatBestSellingProductsComponent } from './dashboard/components/barchat-bestSellingProducts/barchat-best-selling-products.component';
import { BouquetImagesComponent } from './bouquets/components/bouquet-images/bouquet-images.component';
import { BouquetsUpdateComponent } from './bouquets/components/bouquets-update/bouquets-update.component';
import { UploadImagesComponent } from './bouquets/components/upload-images/upload-images.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardStatCardComponent } from './dashboard/components/dashboard-stat-card/dashboard-stat-card.component';
import { SalesDailyChartComponent } from './dashboard/components/sales-daily-chart/sales-daily-chart.component';
import { SalesMonthlyChartComponent } from './dashboard/components/sales-monthly-chart/sales-monthly-chart.component';
import { SalesWeeklyChartComponent } from './dashboard/components/sales-weekly-chart/sales-weekly-chart.component';
import { TopSellingCategoriesChartComponent } from './dashboard/components/top-selling-categories-chart/top-selling-categories-chart.component';
import { SalesPageComponent } from './sales/pages/sales-page/sales-page.component';
import { TopSellingProductsOverallComponent } from './sales/components/top-selling-products-overall/top-selling-products-overall.component';
import { TopSellingCategoriesComponent } from './sales/components/top-selling-categories/top-selling-categories.component';

@NgModule({
  imports: [
    CommonModule,
    UiAdminPagesRoutingModule,
    NgZorroComponentsModule,
    NgChartsModule,
    NgApexchartsModule,
  ],
  declarations: [
    DashboardPageComponent,
    BouquetsListComponent,
    BouquetsFormComponent,
    ViewBouquetComponent,
    ExtrasListComponent,
    ExtrasFormComponent,
    OccassionsListComponent,
    OccasionFormComponent,
    OrdersListComponent,
    ViewOrderComponent,
    LocationsListComponent,
    LocationsFormComponent,
    BarchatBestSellingProductsComponent,
    BouquetImagesComponent,
    BouquetsUpdateComponent,
    UploadImagesComponent,
    DashboardStatCardComponent,
    SalesDailyChartComponent,
    SalesMonthlyChartComponent,
    SalesWeeklyChartComponent,
    TopSellingCategoriesChartComponent,
    SalesPageComponent,
    TopSellingProductsOverallComponent,
    TopSellingCategoriesComponent,
  ],
  providers: [ApiService, NzModalService, FileService],
})
export class UiAdminPagesModule {}
