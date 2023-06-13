import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { OccassionsListComponent } from './pages/occassions-list/occassions-list.component';
import { OcassionsFormComponent } from './components/ocassions-form/ocassions-form.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '@vef/core';

const routes: Routes = [
  {
    path: '',
    component: OccassionsListComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,

    NzTableModule,
    NzModalModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzButtonModule,
    NzNotificationModule
  ],
  declarations: [OccassionsListComponent, OcassionsFormComponent],
  providers:[NzNotificationService, HttpClientModule, ApiService]
})
export class UiOccassionsModule {}
