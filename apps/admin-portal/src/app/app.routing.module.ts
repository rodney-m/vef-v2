import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, JwtInterceptor } from '@vef/core';
import { ContainerComponent } from '@vef/ui/layout';

const routes : Routes  = [
  {
    path : 'auth',
    loadChildren: () => import('@vef/ui/authentication').then(m => m.UiAuthenticationModule)
  },  
  {
    path: '',
    component: ContainerComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('@vef/ui/admin-pages').then(m => m.UiAdminPagesModule)
      },
      // {
      //   path: 'occassions',
      //   loadChildren: () => import('@vef/ui/occassions').then(m => m.UiOccassionsModule)
      // },
      // {
      //   path: 'bouquets',
      //   loadChildren: () => import('@vef/ui/bouquet').then(m => m.UiBouquetModule)
      // },
      // {
      //   path: 'add-ons',
      //   loadChildren: () => import('@vef/ui/add-on').then(m => m.UiAddOnModule)
      // },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}

  ]
})
export class AppRoutingModule {}
