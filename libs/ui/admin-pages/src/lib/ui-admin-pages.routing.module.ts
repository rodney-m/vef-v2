import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './dashboard/pages/dashboard-page/dashboard-page.component';
import { BouquetsListComponent } from './bouquets/pages/bouquets-list/bouquets-list.component';
import { BouquetsFormComponent } from './bouquets/pages/bouquets-form/bouquets-form.component';
import { ViewBouquetComponent } from './bouquets/pages/view-bouquet/view-bouquet.component';
import { ExtrasListComponent } from './extras/pages/extras-list/extras-list.component';
import { ExtrasFormComponent } from './extras/pages/extras-form/extras-form.component';
import { OccassionsListComponent } from './occasions/pages/occassions-list/occassions-list.component';
import { OccasionFormComponent } from './occasions/pages/occasion-form/occasion-form.component';
import { OrdersListComponent } from './orders/pages/orders-list/orders-list.component';
import { ViewOrderComponent } from './orders/pages/view-order/view-order.component';
import { LocationsListComponent } from './delivery-locations/pages/locations-list/locations-list.component';
import { LocationsFormComponent } from './delivery-locations/components/locations-form/locations-form.component';
import { SalesPageComponent } from './sales/pages/sales-page/sales-page.component';
import { ExpensesBouquetsListComponent } from './expenses/expenses-bouquets-list/expenses-bouquets-list.component';
import { ExpensesFormComponent } from './expenses/expenses-form/expenses-form.component';
import { ExpensesOverviewComponent } from './expenses/expenses-overview/expenses-overview.component';
import { TestimonialsListComponent } from './testimonials/pages/testimonials-list/testimonials-list.component';
import { TestimonialsFormComponent } from './testimonials/pages/testimonials-form/testimonials-form.component';

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
    path: 'occasions/form',
    component: OccasionFormComponent
  },
  {
    path: 'occasions/:id',
    component: OccasionFormComponent
  },
  {
    path: 'orders',
    component: OrdersListComponent
  },
  {
    path: 'orders/:id',
    component: ViewOrderComponent
  },
  {
    path: 'locations',
    component: LocationsListComponent
  },
  {
    path: 'locations/form',
    component: LocationsFormComponent
  },
  {
    path: 'locations/form/:id',
    component: LocationsFormComponent
  },
  {
    path: 'sales',
    component: SalesPageComponent
  },
  {
    path: 'expenses',
    component: ExpensesBouquetsListComponent
  },
  {
    path: 'expenses/overview',
    component: ExpensesOverviewComponent
  },
  {
    path: 'expenses/form/:id',
    component: ExpensesFormComponent
  },
  {
    path: 'testimonials',
    component: TestimonialsListComponent
  },
  {
    path: 'testimonials/form',
    component: TestimonialsFormComponent
  },
  {
    path: 'testimonials/form/:id',
    component: TestimonialsFormComponent
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
