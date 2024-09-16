import {  Component } from '@angular/core';
import { ApiService } from '@vef/core';
import { ApexNonAxisChartSeries, ApexChart, ApexTitleSubtitle } from 'ng-apexcharts';


@Component({
  selector: 'vef-sales-weekly-chart',
  templateUrl: './sales-weekly-chart.component.html',
  styleUrls: ['./sales-weekly-chart.component.scss'],
})
export class SalesWeeklyChartComponent {
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
    text: 'Top Sales This Week',
  };

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getFromUrl('/Sales/weekly').subscribe({
      next: (res) => {
        this.chartSeries = res.data.map((xData: any) => xData.totalUnitsSold);
        this.chartLabels = res.data.map((xData: any) => xData.bouquet.name);
      },
    });
  }
}
