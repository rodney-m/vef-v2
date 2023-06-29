import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { BouquetsListComponent } from './bouquets/pages/bouquets-list/bouquets-list.component';
import { BouquetsFormComponent } from './bouquets/pages/bouquets-form/bouquets-form.component';
import { ViewBouquetComponent } from './bouquets/pages/view-bouquet/view-bouquet.component';
import { ExtrasListComponent } from './extras/pages/extras-list/extras-list.component';
import { ExtrasFormComponent } from './extras/pages/extras-form/extras-form.component';
import { OccassionsListComponent } from './occasions/pages/occassions-list/occassions-list.component';


const routes :Route[] =[
  
  {
    path: 'bouquets',
    component: BouquetsListComponent
  }, 
  {
    path: 'bouquets/form',
    component: BouquetsFormComponent
  },
  {
    path: 'bouquets/:id',
    component: ViewBouquetComponent
  },
  {
    path: 'extras',
    component: ExtrasListComponent
  },
  {
    path: 'extras/form',
    component: ExtrasFormComponent
  },
  {
    path: 'occasions',
    component: OccassionsListComponent
  },
  {
    path: '',
    component: DashboardPageComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes), ],
  exports: [RouterModule],
})
export class UiAdminPagesRoutingModule {}
