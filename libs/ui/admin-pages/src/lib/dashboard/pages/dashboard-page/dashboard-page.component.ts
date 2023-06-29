import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {

  constructor(private service : ApiService){}
  ordersList :any[] = [] 

  ngOnInit(): void {

      this.service.getFromUrl('/Order').subscribe({
        next: (res) => {
          this.ordersList = res.data
        }
      })
  }
}
