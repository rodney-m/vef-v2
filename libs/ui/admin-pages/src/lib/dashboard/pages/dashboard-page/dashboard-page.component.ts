import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { ApexOptions, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'vef-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  chartSales: ApexOptions | any = {};
  salesChartOptions!: ApexOptions | any;
  
  constructor(private service : ApiService, private cdr : ChangeDetectorRef){}
  ordersList :any[] = [] 
  sales :any [] = [];
  salesGraphsData :{labels: any[], data: any[]} = {labels: [], data: []};
  statusesStats! :any;
  
  ngOnInit(): void {
    this.getSales();
    this.getStatusesStats()
    
    this.service.getFromUrl('/Order').subscribe({
        next: (res) => {
          this.ordersList = res.data
        }
      })

      this.salesChartOptions = {
        series: [
          {
            name: "Sales",
            data: this.salesGraphsData.data 
          }
        ],
        
        chart: {
          height: 350,
          type: "bar"
        },
        title: {
          text: "Sales per product Chart"
        },
        xaxis: {
          categories: this.salesGraphsData.labels
        }
      };


  }

  getStatusesStats(){
    this.service.getFromUrl(`/Order/status/stats`).subscribe({
      next: (res) => {
        this.statusesStats = res.data;
      }
    })
  }



    getSales(){
      this.service.getFromUrl('/Sales').subscribe({
        next: (res) => {
          this.sales = res.data;
          this.sales.map((sale) => {
            this.salesGraphsData.data.push(sale.totalUnitsSold)
            this.salesGraphsData.labels.push(sale.product.name);
          });
          this.salesChartOptions.series.data = this.salesGraphsData.data
          this.salesChartOptions.xaxis.categories = this.salesGraphsData.data
          this.cdr.markForCheck()

          console.log(this.salesGraphsData);
        }
      })
    }
}
