import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ApexChart,
  ApexNonAxisChartSeries,
  ApexTitleSubtitle,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { ApiService } from '@vef/core';

@Component({
  selector: 'vef-sales-monthly-piechart',
  standalone: false,
  templateUrl: './sales-monthly-piechart.component.html',
  styleUrls: ['./sales-monthly-piechart.component.scss'],
})
export class SalesMonthlyPiechartComponent implements OnInit {
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
