import { Component, OnInit } from '@angular/core';
import { ROUTES } from './side-nav-routes';

@Component({
  selector: 'vef-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  {
  isCollapsed = false; 

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
