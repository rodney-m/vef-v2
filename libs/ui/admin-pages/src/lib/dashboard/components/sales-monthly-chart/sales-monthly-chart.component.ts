import { Component, OnInit } from '@angular/core';
import { ApiService } from '@vef/core';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle } from 'ng-apexcharts';

@Component({
  selector: 'vef-sales-monthly-chart',
  templateUrl: './sales-monthly-chart.component.html',
  styleUrls: ['./sales-monthly-chart.component.scss'],
})
export class SalesMonthlyChartComponent implements OnInit {
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
    text: 'Top Monthly Sales',
  };

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getFromUrl('/Sales/monthly').subscribe({
      next: (res) => {
        this.chartSeries = res.data.map((xData: any) => xData.totalUnitsSold);
        this.chartLabels = res.data.map((xData: any) => xData.bouquet.name);
      },
    });
  }
}
