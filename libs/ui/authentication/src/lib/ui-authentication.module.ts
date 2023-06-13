import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './components/container/container.component';
import { LoginComponent } from './components/login/login.component';
import { UiAuthenticationRoutingModule } from './ui-authentication.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiService, AuthService } from '@vef/core';
import { HttpClientModule } from '@angular/common/http';

import { NzNotificationModule, NzNotificationService } from 'ng-zorro-antd/notification';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  imports: [
    CommonModule, 
    UiAuthenticationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,


    NzNotificationModule,
    NzIconModule
  ],
  declarations: [ContainerComponent, LoginComponent],
  providers: [ApiService, HttpClientModule, NzNotificationService, AuthService]
})
export class UiAuthenticationModule {}
