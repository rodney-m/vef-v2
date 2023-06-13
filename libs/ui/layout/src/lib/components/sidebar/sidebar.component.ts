import { Component } from '@angular/core';

@Component({
  selector: 'vef-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  collapseShow = "hidden";
  
  toggleCollapseShow(classes : any) {
    this.collapseShow = classes;
  }
}
