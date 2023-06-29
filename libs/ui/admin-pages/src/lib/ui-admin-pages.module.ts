import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { UiAdminPagesRoutingModule } from './ui-admin-pages.routing.module';
import { ApiService, FileService, NgZorroComponentsModule } from '@vef/core';
import { BouquetsListComponent } from './bouquets/pages/bouquets-list/bouquets-list.component';
import { BouquetsFormComponent } from './bouquets/pages/bouquets-form/bouquets-form.component';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { ViewBouquetComponent } from './bouquets/pages/view-bouquet/view-bouquet.component';
import { ExtrasListComponent } from './extras/pages/extras-list/extras-list.component';
import { ExtrasFormComponent } from './extras/pages/extras-form/extras-form.component';
import { OccassionsListComponent } from './occasions/pages/occassions-list/occassions-list.component';

@NgModule({
  imports: [CommonModule, UiAdminPagesRoutingModule, NgZorroComponentsModule],
  declarations: [
    DashboardPageComponent,
    BouquetsListComponent,
    BouquetsFormComponent,
    ViewBouquetComponent,
    ExtrasListComponent,
    ExtrasFormComponent,
    OccassionsListComponent,
  ],
  providers: [ApiService, NzModalService, FileService],
})
export class UiAdminPagesModule {}
