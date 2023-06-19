import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd/i18n';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { PlusCircleOutline } from '@ant-design/icons-angular/icons';

import { IconDefinition } from '@ant-design/icons-angular';
import { FooterComponent } from './shared/footer/footer.component';
import { ApiService, ShopService } from '@vef/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const icons: IconDefinition[] = [PlusCircleOutline];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { initialNavigation: 'enabledBlocking' }),
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NzIconModule.forRoot(icons),
    HttpClientModule,
    NgxSkeletonLoaderModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, ApiService, HttpClientModule, ShopService],
  bootstrap: [AppComponent],

})
export class AppModule {}
