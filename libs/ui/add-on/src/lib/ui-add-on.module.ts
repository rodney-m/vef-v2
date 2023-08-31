import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AddOnListComponent } from './pages/add-on-list/add-on-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {
  NzNotificationModule,
  NzNotificationService,
} from 'ng-zorro-antd/notification';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ApiService, FileService } from '@vef/core';
import { AddOnFormComponent } from './components/add-on-form/add-on-form.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const routes: Routes = [
  {
    path: '',
    component: AddOnListComponent,
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
    NzNotificationModule,
    NzSwitchModule,
    NzUploadModule
  ],
  declarations: [AddOnListComponent, AddOnFormComponent],
  providers: [NzNotificationService, HttpClientModule, ApiService, FileService],
})
export class UiAddOnModule {}
