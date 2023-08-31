import { Component, Input } from '@angular/core';

@Component({
  selector: 'vef-dashboard-stat-card',
  templateUrl: './dashboard-stat-card.component.html',
  styleUrls: ['./dashboard-stat-card.component.scss'],
})
export class DashboardStatCardComponent {
  @Input() status = ''
  @Input() count = 0
}
