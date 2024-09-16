import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle } from 'ng-apexcharts';




@Component({
  selector: 'vef-sales-daily-chart',
  templateUrl: './sales-daily-chart.component.html',
  styleUrls: ['./sales-daily-chart.component.scss'],
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class SalesDailyChartComponent implements OnInit {
  chartSeries: ApexNonAxisChartSeries = [];
  chartDetails: ApexChart = {
    type: 'donut',
    toolbar: {
      show: true,
    },
  };

  series!: ApexNonAxisChartSeries;
  labels: string[] = [];

  chartLabels!: string[] | any[];

  chartTitle: ApexTitleSubtitle = {
    text: 'Top Sales Today',
  };

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getFromUrl('/Sales/daily').subscribe({
      next: (res) => {
        this.chartSeries = res.data.map((xData: any) => xData.totalUnitsSold);
        this.chartLabels = res.data.map((xData: any) => xData.bouquet.name);
      },
    });
  }

}
