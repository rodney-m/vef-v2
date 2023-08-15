import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzRadioModule } from 'ng-zorro-antd/radio';


@NgModule({
  imports: [
    NzPaginationModule,
    NzNotificationModule,
    NzLayoutModule,
    CommonModule,
    NzDropDownModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzDividerModule,
    NzButtonModule,
    NzDatePickerModule,
    NzModalModule,
    NzSkeletonModule,
    NzTabsModule,
    NzIconModule,
    NzTagModule,
    NzToolTipModule,
    NzAvatarModule,
    NzListModule,
    NzBadgeModule,
    NzUploadModule,
    NzAlertModule,
    NzPopconfirmModule,
    NzStepsModule,
    NzSwitchModule,
    NzMessageModule,
    NzImageModule,
    NzResultModule,
    NzCardModule,
    NzBreadCrumbModule,
    NzRateModule,
    NzRadioModule
  ],
  exports: [
    NzPaginationModule,
    NzNotificationModule,
    NzLayoutModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NzDividerModule,
    NzButtonModule,
    NzDatePickerModule,
    NzModalModule,
    NzSkeletonModule,
    NzTabsModule,
    NzDropDownModule,
    NzIconModule,
    NzTagModule,
    NzToolTipModule,
    NzAvatarModule,
    NzListModule,
    NzBadgeModule,
    NzUploadModule,
    NzAlertModule,
    NzPopconfirmModule,
    NzStepsModule,
    NzSwitchModule,
    NzMessageModule,
    NzImageModule,
    NzResultModule,
    NzCardModule,
    NzBreadCrumbModule,
    NzRateModule,
    NzRadioModule
  ],
  providers: [NzMessageService]
})
export class NgZorroComponentsModule {}
