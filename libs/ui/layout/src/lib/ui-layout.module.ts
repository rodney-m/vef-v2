import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './pages/container/container.component';
import { TopNavComponent } from './components/top-nav/top-nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterAdminComponent } from './components/footer-admin/footer-admin.component';
import { HeaderStatsComponent } from './components/header-stats/header-stats.component';
import { RouterModule } from '@angular/router';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { NotificationDropdownComponent } from './components/notification-dropdown/notification-dropdown.component';
import { CardStatsComponent } from './components/card-stats/card-stats.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [
    ContainerComponent,
    TopNavComponent,
    SidebarComponent,
    FooterAdminComponent,
    HeaderStatsComponent,
    UserDropdownComponent,
    NotificationDropdownComponent,
    CardStatsComponent,
    
  ],
  exports: [ContainerComponent],
})
export class UiLayoutModule {}
