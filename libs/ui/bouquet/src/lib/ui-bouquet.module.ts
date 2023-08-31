import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BouquetListComponent } from './pages/bouquet-list/bouquet-list.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzUploadModule } from 'ng-zorro-antd/upload';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, FileService } from '@vef/core';
import { HttpClientModule } from '@angular/common/http';
import { BouquetFormComponent } from './components/bouquet-form/bouquet-form.component';
import { AddOrEditBouquetPageComponent } from './pages/AddOrEditBouquetPage/add-or-edit-bouquet-page.component';

const routes: Routes = [
  {
    path: '',
    component: BouquetListComponent,
  },
  {
    path: 'form',
    component: AddOrEditBouquetPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    NzTableModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzNotificationModule,
    NzTagModule,
    NzUploadModule,
  ],
  declarations: [
    BouquetListComponent,
    BouquetFormComponent,
    AddOrEditBouquetPageComponent,
  ],
  providers: [NzNotificationService, HttpClientModule, ApiService, FileService],
})
export class UiBouquetModule {}
